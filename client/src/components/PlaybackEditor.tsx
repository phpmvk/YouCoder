import Editor from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import ReactSlider from 'react-slider';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Terminal from './TerminalOutput';

export function PlaybackEditor() {
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco | null>(
    null
  );

  //editor playback states
  const [importedActions, setImportedActions] =
    useState<RecorderActions | null>(null);
  const [playbackState, setPlaybackState] = useState<{
    status: 'stopped' | 'playing' | 'paused';
    currentPosition: number;
  }>({ status: 'stopped', currentPosition: 0 });
  const [ignoreUserInputs, setIgnoreUserInputs] = useState<boolean>(false);
  const playbackStateRef = useRef(playbackState);
  const timeoutIdsRef = useRef<number[]>([]);

  //scrubber states
  const [sliderValue, setSliderValue] = useState<number>(0);
  const sliderIntervalIdRef = useRef<NodeJS.Timeout | null>(null);

  //audio states
  const [audioSource, setAudioSource] = useState<string>('');
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [audioDuration, setAudioDuration] = useState<number>(0);

  useEffect(() => {
    playbackStateRef.current = playbackState;
  }, [playbackState]);

  useEffect(() => {
    if (audioElement) {
      audioElement.src = audioSource;
    }
  }, [audioSource, audioElement]);

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof import('monaco-editor')
  ) => {
    setEditorInstance(editor);
    setMonacoInstance(monaco);
  };

  // Set current theme based on if darkmode is on or not

  // const toggleTheme = () => {
  //   if (darkMode) {
  //     monacoInstance!.editor.setTheme('vs-dark');
  //   } else {
  //     monacoInstance!.editor.setTheme('vs-light');
  //   }
  // };

  function applyChange(
    range: ChangeRange,
    editor: editor.IStandaloneCodeEditor,
    text: string
  ) {
    const model = editor.getModel();
    const rangeInstance = new monacoInstance!.Range(
      range.startLineNumber,
      range.startColumn,
      range.endLineNumber,
      range.endColumn
    );
    model!.pushEditOperations(
      [],
      [
        {
          range: rangeInstance,
          text: text,
          forceMoveMarkers: true,
        },
      ],
      () => null
    );
  }

  function startPlayback(
    editorActions: EditorAction[],
    editor: editor.IStandaloneCodeEditor
  ) {
    const baseTimestamp = sliderValue;

    // Filter out actions that have already been executed based on the scrubber position
    const actionsToExecute = editorActions.filter(
      (action) => action.playbackTimestamp >= baseTimestamp
    );

    if (audioElement && sliderValue === 0) {
      audioElement.play();
    }

    // Clear existing timeouts if any
    timeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutIdsRef.current = [];

    setPlaybackState({
      status: 'playing',
      currentPosition: baseTimestamp,
    });

    setIgnoreUserInputs(true);

    // Apply all changes up to the scrubber position instantly
    const actionsToApplyInstantly = editorActions.filter(
      (action) => action.playbackTimestamp < baseTimestamp
    );

    actionsToApplyInstantly.forEach((action: EditorAction) => {
      applyChange(action, editor, action.text);
    });

    actionsToExecute.forEach((action: EditorAction) => {
      const timeoutId = window.setTimeout(() => {
        if (playbackStateRef.current.status === 'playing') {
          applyChange(action, editor, action.text);
          setPlaybackState((prevState) => ({
            status: 'playing',
            currentPosition: prevState.currentPosition + 100,
          }));
        }
        if (action === actionsToExecute[actionsToExecute.length - 1]) {
          setIgnoreUserInputs(false);
        }
      }, action.playbackTimestamp - baseTimestamp);
      timeoutIdsRef.current.push(timeoutId);
    });

    sliderIntervalIdRef.current = startSliderInterval();
  }

  //playback handlers
  function handleStartPlayback() {
    if (importedActions) {
      editorInstance!.setValue('');
      startPlayback(importedActions.editorActions, editorInstance!);
    }
  }

  function handlePausePlayback() {
    audioElement?.pause();
    setPlaybackState((prevState) => ({
      status: 'paused',
      currentPosition: prevState.currentPosition,
    }));
    setIgnoreUserInputs(false);
    clearInterval(sliderIntervalIdRef.current!);
  }

  function handleResumePlayback() {
    audioElement?.play();
    if (importedActions) {
      editorInstance!.setValue('');
      startPlayback(importedActions.editorActions, editorInstance!);
    }
    clearInterval(sliderIntervalIdRef.current!);
    sliderIntervalIdRef.current = startSliderInterval();
  }

  function handleScrubberChange(scrubberPosition: number) {
    updateAudioCurrentTime(scrubberPosition);
    audioElement?.play();

    clearInterval(sliderIntervalIdRef.current!);
    setSliderValue(scrubberPosition);
    setPlaybackState((prevState) => ({
      ...prevState,
      currentPosition: scrubberPosition,
    }));

    // Clear existing timeouts if any
    timeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutIdsRef.current = [];
    editorInstance!.setValue('');

    startPlayback(importedActions!.editorActions, editorInstance!);
    setSliderValue(scrubberPosition);
  }

  function startSliderInterval() {
    const intervalId = setInterval(() => {
      if (playbackStateRef.current.status === 'playing') {
        setSliderValue((prevSliderValue) => prevSliderValue + 100);
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return intervalId;
  }

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileContents = e.target!.result as string;
        const importedRecorderActions = JSON.parse(fileContents);

        setImportedActions(importedRecorderActions);

        editorInstance!.setValue('');
        // startPlayback(importedRecorderActions.editorActions, editorInstance!);
      };
      reader.readAsText(file);
    }
  }

  function handleAudioFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const audioContext = new AudioContext();
        audioContext.decodeAudioData(arrayBuffer).then((decodedData) => {
          setAudioDuration(decodedData.duration * 1000);
        });
      };
      fileReader.readAsArrayBuffer(file);
      const url = URL.createObjectURL(file);
      setAudioSource(url);
    }
  }

  function updateAudioCurrentTime(scrubberPosition: number) {
    if (audioElement) {
      audioElement.currentTime = scrubberPosition / 1000;
    }
  }

  return (
    <>
      <audio
        ref={(audio) => {
          setAudioElement(audio);
        }}
      ></audio>
      <div className="flex max-w-[80vw] h-[500px] px-40">
        <Allotment>
          <Allotment.Pane minSize={600}>
            <Editor
              height="500px"
              defaultLanguage="javascript"
              defaultValue=""
              theme="vs-dark"
              options={{
                wordWrap: 'on',
                readOnly: ignoreUserInputs,
              }}
              onMount={handleEditorDidMount}
            />
          </Allotment.Pane>
          <Allotment.Pane minSize={100} preferredSize={300}>
            <div className="border w-full h-full border-[#1e1e1e]">
              <Terminal output={'test'} />
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>

      <br></br>
      <br></br>
      <input className="mx-4" type="file" onChange={handleFileInput} />
      {playbackState.status === 'stopped' && (
        <button
          className="p-2 bg-slate-500 rounded-sm"
          onClick={handleStartPlayback}
        >
          Start Playback
        </button>
      )}

      {playbackState.status === 'playing' && (
        <button className="p-2 bg-slate-500 mx-4" onClick={handlePausePlayback}>
          Pause Playback
        </button>
      )}

      {playbackState.status === 'paused' && (
        <button className="p-2 bg-slate-500" onClick={handleResumePlayback}>
          Resume Playback
        </button>
      )}

      <input className="mx-4" type="file" onChange={handleAudioFileInput} />
      <br />
      <br />
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="slider-thumb"
        value={sliderValue}
        step={0.001}
        max={audioDuration}
        onChange={(value) => handleScrubberChange(value)}
      />
    </>
  );
}
