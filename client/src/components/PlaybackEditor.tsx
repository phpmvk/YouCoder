import Editor from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import ReactSlider from 'react-slider';

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
  const [pausedContent, setPausedContent] = useState<string>('');

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

  function applyChange(
    range: ChangeRange,
    editor: editor.IStandaloneCodeEditor,
    text: string
  ) {
    if (playbackStateRef.current.status !== 'playing') return;
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
    editor: editor.IStandaloneCodeEditor,
    playbackStartPosition: number = 0
  ) {
    if (audioElement && playbackStartPosition === 0) {
      audioElement.currentTime = playbackStartPosition / 1000;
      audioElement.play();
    }
    // Clear existing timeouts if any
    timeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutIdsRef.current = [];

    if (playbackStateRef.current.status !== 'paused') {
      setPlaybackState({
        status: 'playing',
        currentPosition: playbackStartPosition,
      });
    } else {
      setPlaybackState({
        status: 'playing',
        currentPosition: playbackStateRef.current.currentPosition,
      });
    }

    const baseTimestamp =
      playbackStartPosition > 0
        ? editorActions[playbackStartPosition - 1].playbackTimestamp
        : 0;

    setIgnoreUserInputs(true);

    // When scrubbing, apply all changes up to the scrubber position instantly
    if (playbackStartPosition > 0) {
      editorActions
        .slice(0, playbackStartPosition)
        .forEach((action: EditorAction) => {
          applyChange(action, editor, action.text);
        });
    }

    editorActions
      .slice(playbackStartPosition)
      .forEach((action: EditorAction, index: number) => {
        const timeoutId = window.setTimeout(() => {
          if (playbackStateRef.current.status === 'playing') {
            applyChange(action, editor, action.text);
            setPlaybackState((prevState) => ({
              status: 'playing',
              currentPosition: prevState.currentPosition + 1,
            }));
          }
          if (index === editorActions.length - 1) {
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
    setPausedContent(editorInstance!.getValue());
    setIgnoreUserInputs(false);
    clearInterval(sliderIntervalIdRef.current!);
  }
  function handleResumePlayback() {
    audioElement?.play();
    if (importedActions) {
      editorInstance!.setValue(pausedContent);
      startPlayback(
        importedActions.editorActions,
        editorInstance!,
        playbackState.currentPosition
      );
    }
    sliderIntervalIdRef.current = startSliderInterval();
  }

  function handleScrubberChange(scrubberPosition: number) {
    updateAudioCurrentTime(scrubberPosition);
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

    const editorActions = importedActions!.editorActions;

    // Find the nearest action with the given playback timestamp
    const playbackStartPosition = editorActions.findIndex(
      (action) => action.playbackTimestamp >= scrubberPosition
    );

    startPlayback(editorActions, editorInstance!, playbackStartPosition);
    setSliderValue(scrubberPosition);
    audioElement?.play();
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
        startPlayback(importedRecorderActions.editorActions, editorInstance!);
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
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue=""
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          readOnly: ignoreUserInputs,
        }}
        onMount={handleEditorDidMount}
      />

      <br></br>
      <br></br>
      <input type="file" onChange={handleFileInput} />
      <button className="p-2" onClick={handleStartPlayback}>
        Start Playback
      </button>
      <button className="p-2" onClick={handlePausePlayback}>
        Pause Playback
      </button>
      <button className="p-2" onClick={handleResumePlayback}>
        Resume Playback
      </button>
      <input type="file" onChange={handleAudioFileInput} />
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
