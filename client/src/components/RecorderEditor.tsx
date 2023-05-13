import Editor from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import RecordRTC from 'recordrtc';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import consoleApi from '../services/consoleApi';
import { CodeToExecute } from '../types/Console';
import { SaveRecordingModal } from './HomePageComponents/SaveRecordingModal';
import { saveYCRFile } from '../utils/ycrUtils';
import { useAppSelector } from '../redux/hooks';
import Terminal from './TerminalOutput';
import recordingApi from '../services/recordingApi';
import {
  formatLanguage,
  formatTime,
  getLanguageId,
  calculateTotalPauseTime,
} from '../utils/editorUtils';

import {
  RecorderActions,
  EditorAction,
  ConsoleLog,
  EditorRecording,
  Language,
} from '../types/Editor';

export function RecorderEditor() {
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco | null>(
    null
  );

  // const [audioRecorder, setAudioRecorder] = useState<RecordRTC | null>(null);
  const [recorderState, setRecorderState] = useState<
    'stopped' | 'recording' | 'paused'
  >('stopped');
  const [recorderLoading, setRecorderLoading] = useState(false);

  const [consoleOutput, setConsoleOutput] = useState('');
  const [isConsoleLoading, setIsConsoleLoading] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [editorLanguage, setEditorLanguage] = useState('javascript');

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [recordingIntervalId, setRecordingIntervalId] =
    useState<NodeJS.Timeout | null>(null);
  const [pauseAction, setPauseAction] = useState(false);

  const recorderActions = useRef<RecorderActions>({
    start: 0,
    end: 0,
    pauseArray: [],
    resumeArray: [],
    pauseLengthArray: [],
    editorActions: [],
    consoleLogOutputs: [],
  });

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioRecordingBlobRef = useRef<Blob | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      mediaRecorderRef.current.ondataavailable = function (e) {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }

        if (mediaRecorderRef.current!.state === 'inactive') {
          // Check if the recorder is stopped
          audioRecordingBlobRef.current = new Blob(recordedChunksRef.current, {
            type: 'audio/webm',
          });
          recordedChunksRef.current = [];
        }
      };
    });
  }, []);

  useEffect(() => {
    return () => {
      if (recordingIntervalId) {
        clearInterval(recordingIntervalId);
      }
    };
  }, [recordingIntervalId]);

  const user = useAppSelector((state) => state.user);

  function handleConsoleLogOutput(text: string, timestamp: number) {
    if (recorderState !== 'stopped') {
      recorderActions.current.consoleLogOutputs.push({
        text,
        timestamp,
        playbackTimestamp: 0,
      });
    }
  }

  function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const model = editorInstance!.getModel();
    monacoInstance!.editor.setModelLanguage(model!, event.target.value);
  }

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof import('monaco-editor')
  ) {
    setEditorInstance(editor);
    setMonacoInstance(monaco);
  }

  function handleEditorChange(
    value?: string,
    event?: editor.IModelContentChangedEvent
  ) {
    const actionCreationTimestamp = Date.now();
    event!.changes.forEach((change: editor.IModelContentChange) => {
      const range = change.range;
      const text = change.text;
      recorderActions.current.editorActions.push({
        ...range,
        actionCreationTimestamp,
        playbackTimestamp: 0,
        text,
      });
    });
    if (recorderState === 'paused') {
      setPauseAction(true);
    }
  }

  //recording handlers
  function handleStartRecording() {
    //audio
    setRecorderLoading(true);
    setIsRecording(true);
    mediaRecorderRef.current!.start();
    setRecorderLoading(false);
    //actions
    recorderActions.current.editorActions = [];
    recorderActions.current.consoleLogOutputs = [];
    recorderActions.current.pauseArray = [];
    recorderActions.current.pauseLengthArray = [];
    recorderActions.current.resumeArray = [];

    editorInstance!.setValue('');
    recorderActions.current.start = Date.now();
    setRecorderState('recording');
    setConsoleOutput('');

    //language
    const model = editorInstance!.getModel();
    const language = model!.getLanguageId();
    setEditorLanguage(formatLanguage(language));

    //timer
    setElapsedTime(0);
    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1000);
    }, 1000);
    setRecordingIntervalId(intervalId);
  }

  function handlePauseRecording() {
    mediaRecorderRef.current!.requestData();
    mediaRecorderRef.current!.pause();
    let timestamp = Date.now();
    recorderActions.current.pauseArray.push({ timestamp });
    setRecorderState('paused');
    if (recordingIntervalId) {
      clearInterval(recordingIntervalId);
      setRecordingIntervalId(null);
    }
    setPauseAction(false);
  }
  function handleResumeRecording() {
    mediaRecorderRef.current!.resume();
    let timestamp = Date.now();
    recorderActions.current.resumeArray.push({ timestamp });
    setRecorderState('recording');
    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1000);
    }, 1000);
    setRecordingIntervalId(intervalId);
    setPauseAction(false);
  }
  function handleEndRecording() {
    // if (pauseAction) {
    //   if (
    //     !window.confirm(
    //       'You have unsaved changes from when the recording was paused. These changes will be discarded. Are you sure you want to end the recording?'
    //     )
    //   ) {
    //     //If they press cancel on the prompt, don't run the rest of the handleEndRecording Function
    //     return;
    //   }
    // }
    const timestamp = Date.now();
    recorderActions.current.end = timestamp;

    // Filter out actions that occurred during the last pause period (if any)
    if (
      recorderActions.current.pauseArray.length >
      recorderActions.current.resumeArray.length
    ) {
      const lastPauseTimestamp =
        recorderActions.current.pauseArray[
          recorderActions.current.pauseArray.length - 1
        ].timestamp;

      recorderActions.current.editorActions =
        recorderActions.current.editorActions.filter((action: EditorAction) => {
          return action.actionCreationTimestamp < lastPauseTimestamp;
        });

      recorderActions.current.consoleLogOutputs =
        recorderActions.current.consoleLogOutputs.filter(
          (change: ConsoleLog) => {
            return change.timestamp < lastPauseTimestamp;
          }
        );
    }

    // Calculate playbackTimestamp for each editor action
    recorderActions.current.editorActions =
      recorderActions.current.editorActions.map((action: EditorAction) => {
        let totalPauseTime = calculateTotalPauseTime(
          action.actionCreationTimestamp,
          timestamp,
          recorderActions.current
        );

        const adjustedTimestamp =
          action.actionCreationTimestamp -
          recorderActions.current.start -
          totalPauseTime;
        return { ...action, playbackTimestamp: adjustedTimestamp };
      });

    // Calculate playbackTimestamp for each console log change
    recorderActions.current.consoleLogOutputs =
      recorderActions.current.consoleLogOutputs.map((change) => {
        let totalPauseTime = calculateTotalPauseTime(
          change.timestamp,
          timestamp,
          recorderActions.current
        );

        const adjustedTimestamp =
          change.timestamp - recorderActions.current.start - totalPauseTime;
        return { ...change, playbackTimestamp: adjustedTimestamp };
      });

    console.log(recorderState);
    if (recorderState === 'paused') {
      mediaRecorderRef.current!.resume(); // Resume recording
      mediaRecorderRef.current!.onresume = () => {
        setIsRecording(false);
        setTimeout(() => {
          mediaRecorderRef.current!.stop();
        }, 1000);
      };
    } else {
      setIsRecording(false);
      mediaRecorderRef.current!.stop();
    }
    setRecorderState('stopped');
    if (recordingIntervalId) {
      clearInterval(recordingIntervalId);
      setRecordingIntervalId(null);
    }
    setSaveModalVisible(true);
  }

  async function handleSave(
    title: string,
    description: string,
    thumbnail_link: string
  ) {
    try {
      const json = JSON.stringify(recorderActions.current);
      const jsonBlob = new Blob([json], { type: 'application/json' });

      const ycrFileUrl = await saveYCRFile(
        jsonBlob,
        audioRecordingBlobRef.current!,
        user.uid!
      );
      console.log(ycrFileUrl);
      const model = editorInstance!.getModel();
      const language = model!.getLanguageId();

      const Recording: EditorRecording = {
        title,
        description,
        thumbnail_link,
        language,
        recording_link: ycrFileUrl,
      };

      recordingApi.postRecording(Recording);
    } catch (error) {
      console.error('Error saving recording', error);
    }
  }

  function handleDiscard() {
    // Implement the logic to discard the recording
  }

  function handleJudge0() {
    setIsConsoleLoading(true);
    handleConsoleLogOutput('...', Date.now());

    const model = editorInstance!.getModel();
    const language = model!.getLanguageId() as Language;
    const source_code = editorInstance!.getValue();
    const base64SourceCode = window.btoa(source_code);
    const language_id = getLanguageId(language)!;

    const judge0: CodeToExecute = {
      language_id,
      source_code: base64SourceCode,
    };

    consoleApi
      .getOutput(judge0)!
      .then((response) => {
        const output = window.atob(response.data.output);
        setConsoleOutput(output);
        handleConsoleLogOutput(output, Date.now());
        setIsConsoleLoading(false);
      })
      .catch((error) => {
        console.error('Error getting console output from Judge0', error);
        setIsConsoleLoading(false);
      });
  }

  return (
    <>
      {recorderState === 'stopped' && (
        <>
          <div className='flex items-center'>
            <label
              className='block mb-2 text-sm font-medium text-white mr-3'
              htmlFor='language'
            >
              Choose a language to record in:
            </label>
            <select
              id='language'
              onChange={handleLanguageChange}
              className='border text-sm rounded-lg  block w-48 px-2.5 py-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-bg-sec focus:border-bg-sec mb-3'
            >
              <option defaultValue='javascript'>JavaScript</option>
              <option value='typescript'>TypeScript</option>
              <option value='python'>Python</option>
              <option value='java'>Java</option>
              <option value='csharp'>C#</option>
              <option value='cpp'>C++</option>
              <option value='ruby'>Ruby</option>
              <option value='go'>Go</option>
            </select>
          </div>
        </>
      )}
      {recorderState !== 'stopped' && (
        <div className='border text-sm rounded-lg w-48 bg-gray-700 border-gray-600 text-white focus:ring-bg-sec focus:border-bg-sec mb-3 flex items-center justify-center'>
          {editorLanguage}
        </div>
      )}

      <div className='flex w-full h-[500px] border border-white rounded-sm'>
        <Allotment>
          <Allotment.Pane minSize={500}>
            <Editor
              height='500px'
              defaultLanguage='javascript'
              defaultValue=''
              theme='vs-dark'
              options={{
                wordWrap: 'on',
                fontSize: 16,
              }}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
            />
          </Allotment.Pane>
          <Allotment.Pane minSize={180} preferredSize={300}>
            <div className='border w-full h-full border-[#1e1e1e] text-white relative'>
              <button
                className='absolute bottom-2 right-2 border-white border rounded-sm p-2 bg-slate-500 hover:bg-slate-500/50 '
                onClick={handleJudge0}
                disabled={isConsoleLoading}
              >
                {isConsoleLoading ? 'Loading...' : 'Compile & Execute'}
              </button>
              <button
                className='absolute top-2 right-2 border-white border text-sm rounded-md px-1 bg-slate-500 hover:bg-slate-500/50'
                onClick={() => setConsoleOutput('')}
              >
                clear
              </button>

              <Terminal output={consoleOutput} />
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>

      {recorderState === 'stopped' && (
        <button className='p-2 text-white' onClick={handleStartRecording}>
          Start Recording
        </button>
      )}

      {recorderState === 'recording' && (
        <>
          <button className='p-2 text-white' onClick={handlePauseRecording}>
            Pause Recording
          </button>
          <button className='p-2 text-white' onClick={handleEndRecording}>
            End Recording
          </button>
        </>
      )}

      {recorderState === 'paused' && (
        <>
          <button className='p-2 text-white' onClick={handleResumeRecording}>
            Resume Recording
          </button>
          <button className='p-2 text-white' onClick={handleEndRecording}>
            End Recording
          </button>
        </>
      )}
      {recorderLoading && (
        <div className='p-2'>
          <span>Loading...</span>
        </div>
      )}

      {recorderState !== 'stopped' && (
        <p className='p-2 text-white'>{formatTime(elapsedTime)}</p>
      )}

      {saveModalVisible && (
        <SaveRecordingModal
          onSave={handleSave}
          onDiscard={handleDiscard}
          onClose={() => setSaveModalVisible(false)}
        />
      )}
    </>
  );
}
