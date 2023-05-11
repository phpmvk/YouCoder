import Editor from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import ReactSlider from 'react-slider';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import Terminal from './TerminalOutput';
import { loadYCRFile } from '../utils/ycrUtils';
import { CodeToExecute } from '../types/console';
import consoleApi from '../services/consoleApi';
import { formatTime, getLanguageId } from '../utils/editorUtils';
import { RecorderActions, ChangeRange, EditorAction, Language } from '../types/Editor';

export function PlaybackEditor() {
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco | null>(
    null
  );

  const [TeacherConsoleOutput, setTeacherConsoleOutput] = useState('');
  const [StudentConsoleOutput, setStudentConsoleOutput] = useState('');

  const [editorLanguage, setEditorLanguage] = useState('');

  //editor playback states
  const [importedActions, setImportedActions] =
    useState<RecorderActions | null>(null);
  const [playbackState, setPlaybackState] = useState<{
    status: 'stopped' | 'playing' | 'paused';
    currentPosition: number;
  }>({ status: 'stopped', currentPosition: 0 });
  const [ignoreUserInputs, setIgnoreUserInputs] = useState<boolean>(false);
  const playbackStateRef = useRef(playbackState);
  const actionTimeoutIdsRef = useRef<number[]>([]);
  const consoleTimeoutIdsRef = useRef<number[]>([]);

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

    const consoleOutputsToExecute = importedActions!.consoleLogOutputs.filter(
      (output) => output.playbackTimestamp >= baseTimestamp
    );

    if (audioElement && sliderValue === 0) {
      audioElement.play();
    }

    // Clear existing timeouts if any
    actionTimeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    actionTimeoutIdsRef.current = [];
    consoleTimeoutIdsRef.current.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
    consoleTimeoutIdsRef.current = [];

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

    const consoleOutputsToApplyInstantly =
      importedActions!.consoleLogOutputs.filter(
        (output) => output.playbackTimestamp < baseTimestamp
      );

    consoleOutputsToApplyInstantly.forEach((output) => {
      setTeacherConsoleOutput(output.text);
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
      actionTimeoutIdsRef.current.push(timeoutId);
    });
    consoleOutputsToExecute.forEach((output) => {
      const timeoutId = window.setTimeout(() => {
        if (playbackStateRef.current.status === 'playing') {
          setTeacherConsoleOutput(output.text);
        }
      }, output.playbackTimestamp - baseTimestamp);
      consoleTimeoutIdsRef.current.push(timeoutId);
    });

    sliderIntervalIdRef.current = startSliderInterval();
  }

  //playback handlers
  function handleStartPlayback() {
    if (importedActions) {
      getCurrentLanguage();
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
    actionTimeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    actionTimeoutIdsRef.current = [];
    consoleTimeoutIdsRef.current.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
    consoleTimeoutIdsRef.current = [];

    editorInstance!.setValue('');

    startPlayback(importedActions!.editorActions, editorInstance!);
    setSliderValue(scrubberPosition);
  }

  function startSliderInterval() {
    const intervalId = setInterval(() => {
      if (playbackStateRef.current.status === 'playing') {
        setSliderValue((prevSliderValue) => {
          // Check if the value has reached audioDuration
          if (prevSliderValue >= audioDuration) {
            // When the maximum value is reached, stop the interval
            clearInterval(intervalId);
            // Stop audio playback
            audioElement?.pause();
            // Update the playback state
            setPlaybackState({
              status: 'stopped',
              currentPosition: audioDuration,
            });
            return audioDuration; // Set sliderValue to audioDuration
          }
          return prevSliderValue + 100;
        });
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return intervalId;
  }

  async function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    if (file && file.name.endsWith('.ycr')) {
      try {
        const { recorderActions, recordedAudioURL } = await loadYCRFile(file);

        setImportedActions(recorderActions);

        // Decode audio data and set audio duration
        const audioContext = new AudioContext();
        const response = await fetch(recordedAudioURL);
        const arrayBuffer = await response.arrayBuffer();
        const decodedData = await audioContext.decodeAudioData(arrayBuffer);
        setAudioDuration(decodedData.duration * 1000);

        // Set the audio source
        setAudioSource(recordedAudioURL);
      } catch (error) {
        console.error('Error loading .ycr file:', error);
      }
    } else {
      console.error('Please select a valid .ycr file');
    }
  }

  function updateAudioCurrentTime(scrubberPosition: number) {
    if (audioElement) {
      audioElement.currentTime = scrubberPosition / 1000;
    }
  }

  function getCurrentLanguage() {
    const model = editorInstance!.getModel();
    const language = model!.getLanguageId();
    setEditorLanguage(language);
  }

  function handleJudge0() {
    const model = editorInstance!.getModel();
    const language = model!.getLanguageId() as Language;
    const source_code = editorInstance!.getValue();
    const base64SourceCode = window.btoa(source_code);
    const language_id = getLanguageId(language)!;

    const judge0: CodeToExecute = {
      language_id,
      source_code: base64SourceCode,
    };
    consoleApi.getOutput(judge0)!.then((response) => {
      const output = window.atob(response.data.output);

      setStudentConsoleOutput(output);
    });
  }

  return (
    <>
      <audio
        ref={(audio) => {
          setAudioElement(audio);
        }}
      ></audio>
      <h1>{editorLanguage}</h1>
      <div className="flex w-full h-[500px] px-40">
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
            <div className="border w-full h-[50%] border-[#1e1e1e]">
              <Terminal
                terminalName="Teachers output"
                output={TeacherConsoleOutput}
              />
            </div>
            <div className="border w-full h-[50%] border-[#1e1e1e]">
              <button className="text-white" onClick={handleJudge0}>
                Compile & Execute
              </button>
              <Terminal output={StudentConsoleOutput} />
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

      <br />
      <br />
      <div className="text-white">
        {formatTime(sliderValue)} / {formatTime(audioDuration)}
      </div>

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
