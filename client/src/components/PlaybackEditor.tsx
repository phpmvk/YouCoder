import Editor from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import ReactSlider from 'react-slider';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import Terminal from './TerminalOutput';
import { loadYCRFile } from '../utils/ycrUtils';
import { CodeToExecute } from '../types/Console';
import consoleApi from '../services/consoleApi';
import { formatTime, getLanguageId, formatLanguage } from '../utils/editorUtils';
import { Recording } from '../types/Creator';
import Button from '@mui/material/Button';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import {
  RecorderActions,
  ChangeRange,
  EditorAction,
  Language,
} from '../types/Editor';


export function PlaybackEditor({
  recordingData,
}: {
  recordingData: Recording;
}) {
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

  useEffect(() => {
    handleFirebaseURL(recordingData.recording_link);
  }, []);

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

  async function handleFirebaseURL(firebaseURL: string) {
    if (firebaseURL) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, firebaseURL);

        getDownloadURL(storageRef)
          .then(async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();

            const file = new File([blob], 'filename.ycr', { type: blob.type });

            const { recorderActions, recordedAudioURL } = await loadYCRFile(
              file
            );
            setImportedActions(recorderActions);

            // Decode audio data and set audio duration
            const audioContext = new AudioContext();
            const responseAudio = await fetch(recordedAudioURL);
            const arrayBuffer = await responseAudio.arrayBuffer();
            const decodedData = await audioContext.decodeAudioData(arrayBuffer);
            setAudioDuration(decodedData.duration * 1000);

            // Set the audio source
            setAudioSource(recordedAudioURL);
          })
          .catch((error) => {
            console.error('Error loading .ycr file:', error);
          });
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
    console.log('judge0 before sending', judge0);
    consoleApi.getOutput(judge0)!.then((response) => {
      const output = window.atob(response.data.output);
      console.log('output in judge0', output);
      setStudentConsoleOutput(output);
    });
  }

  return (
    
    <div className="border-2 border-red-600">
      <audio
        ref={(audio) => {
          setAudioElement(audio);
        }}
      ></audio>
      
      <h1 className={`ml-10 bg-bg-pri w-[20ch] text-center rounded-t-full mt-2 pt-1 ${editorLanguage ? 'text-gray-200' : 'text-transparent'}`}>
    {editorLanguage ? formatLanguage(editorLanguage) : '·'}
</h1>
      <div className="">
      <div className="bg-bg-gptdark flex w-full h-[400px] px-10  ">
        <Allotment>
          <Allotment.Pane minSize={600}>
            <Editor
            className=" border-bg-pri border-8 border-r-6 "
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
          <Allotment.Pane minSize={200} preferredSize={400}>
            <div className=" w-full h-[50%] border-r-8 border-t-8 border-l-2 border-bg-pri ">
              <Terminal
                terminalName="output"
                output={TeacherConsoleOutput}
              />
            </div>
            <div className="relative w-full h-[50%] border-t-6 border-l-2 border-r-8 border-bg-pri">
              <div className='flex justify-center items-center'>

              <button 
              
              className="font-extralight absolute bottom-2 right-2 w-fit items-center px-2 py-1 text-sm text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-gray-200 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-gray-200 dark:border-white dark:text-gray-200 dark:hover:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 uppercase" onClick={handleJudge0}>
                compile & execute
              </button>
              <button 
              
              className="absolute top-0 right-2 w-fit items-center px-1 text-sm font-light text-gray-900 bg-transparent border border-gray-900 rounded-md hover:bg-gray-900 hover:text-gray-200 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-gray-200 dark:border-white dark:text-gray-200 dark:hover:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 uppercase" onClick={() => setStudentConsoleOutput('')}>
                clear
              </button>






              </div>
              <Terminal 
              terminalName="your output"
              output={StudentConsoleOutput} />


              
            </div>


          </Allotment.Pane>
          
        </Allotment>
      </div>
      <br></br>
      <br></br>
      <div className='w-auto flex items-center justify-evenly space-x-16 -mt-12 bg-bg-pri mx-10 px-2 md:pax-auto'>
      {/* <input className="mx-4" type="file" onChange={handleFileInput} /> */}

      {playbackState.status === 'stopped' && (
        <Button
          variant="outlined"
          className="!rounded-full !bg-bg-alt !text-bg-pri"
          onClick={handleStartPlayback}
        >
          <PlayArrowIcon/>
        </Button>
      )}
      {playbackState.status === 'playing' && (
        <Button 
        variant="outlined"
        className="!rounded-full !bg-bg-alt !text-bg-pri" onClick={handlePausePlayback}>
          <PauseIcon/>
        </Button>
      )}
      {playbackState.status === 'paused' && (
        <Button 
        variant="outlined"
        className="!rounded-full !bg-bg-alt !text-bg-pri" onClick={handleResumePlayback}>
          <PlayArrowIcon/>
        </Button>
      )}

<div className="text-gray-200 mx-4 whitespace-nowrap">
  <button className="mr-8"><VolumeUpIcon/></button>
        {formatTime(sliderValue)} / {formatTime(audioDuration)}


      </div>


<ReactSlider
        className="w-10/12 max-w-[800px] h-5 bg-bg-gptdark rounded-full mx-auto border-white border flex items-center pr-2"
        thumbClassName="w-5 h-5 bg-white rounded-full cursor-pointer focus:outline-none active:h-7 active:w-7 transition"
        value={sliderValue}
        step={0.001}
        max={audioDuration}
        onChange={(value) => handleScrubberChange(value)}
      />
      </div>
      

   <br></br>   
      
</div>
    </div>
    
  );
}
