import Editor from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import ClearIcon from '@mui/icons-material/Clear';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { default as TooltipMUI } from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PauseIcon from '@mui/icons-material/Pause';
import DoneIcon from '@mui/icons-material/Done';
import EjectIcon from '@mui/icons-material/Eject';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import consoleApi from '../services/consoleApi';
import { CodeToExecute } from '../types/Console';
import { SaveRecordingModal } from './HomePageComponents/SaveRecordingModal';
import { saveYCRFile } from '../utils/ycrUtils';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
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
import { MultiEditorRecorder } from './MultiEditorRecorder';
import Modal from './Modal';
import EditDetailsform from './NewDashboardComponents/EditDetailsForm';
import { updateRecording } from '../types/Creator';
import { setLoadingSpinner } from '../redux/spinnerSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function RecorderEditor() {
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco | null>(
    null
  );

  const [fontSize, setFontSize] = useState(14);

  const [recorderState, setRecorderState] = useState<
    'stopped' | 'recording' | 'paused'
  >('stopped');
  const [recorderLoading, setRecorderLoading] = useState(false);

  const [consoleOutput, setConsoleOutput] = useState('');
  const [isConsoleLoading, setIsConsoleLoading] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const [alertVisible, setAlertVisible] = useState(true);

  
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [recordingIntervalId, setRecordingIntervalId] =
    useState<NodeJS.Timeout | null>(null);
  const [pauseAction, setPauseAction] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const recorderActions = useRef<RecorderActions>({
    start: 0,
    end: 0,
    pauseArray: [],
    resumeArray: [],
    pauseLengthArray: [],
    editorActions: [],
    consoleLogOutputs: [],
    htmlOutputArray: [],
  });

  const [details, setDetails] = useState<updateRecording>({
    title: '',
    description: '',
    thumbnail_link: '',
    published: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioRecordingBlobRef = useRef<Blob | null>(null);

  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus',
        });
        //Analyser to check if there's audioinput in the first 10 seconds.
        const audioContext = new window.AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyserRef.current = analyser;

        mediaRecorderRef.current.ondataavailable = function (e) {
          if (e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }

          if (mediaRecorderRef.current!.state === 'inactive') {
            // Check if the recorder is stopped
            audioRecordingBlobRef.current = new Blob(
              recordedChunksRef.current,
              {
                type: 'audio/webm',
              }
            );
            recordedChunksRef.current = [];
          }
        };
      })
      .catch((error) => {
        console.error('Could not get user media', error);
        // Display message to user
        alert(
          'Permission for microphone is required to record. Please enable access and refresh the page.'
        );
      });
  }, []);

  useEffect(() => {
    return () => {
      if (recordingIntervalId) {
        clearInterval(recordingIntervalId);
      }
    };
  }, [recordingIntervalId]);

  useEffect(() => {
    const defaultFontSize = getDefaultFontSize();
    setFontSize(defaultFontSize);

    const handleResize = () => {
      const newDefaultFontSize = getDefaultFontSize();
      if (newDefaultFontSize !== defaultFontSize) {
        setFontSize(newDefaultFontSize);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (editorInstance) {
      editorInstance!.updateOptions({ fontSize });
    }
  }, [fontSize]);

  const getDefaultFontSize = () => {
    let div = document.createElement('div');
    div.style.fontSize = 'initial';
    div = document.body.appendChild(div);
    const defaultFontSize = parseFloat(
      window.getComputedStyle(div, null).fontSize
    );
    document.body.removeChild(div);
    return defaultFontSize;
  };

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
    setSelectedLanguage(event.target.value);
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
    if (!mediaRecorderRef.current) {
      alert(
        'Permission for microphone is required to record. Please enable access and refresh the page.'
      );
      return;
    }
    //audio
    setRecorderLoading(true);
    mediaRecorderRef.current!.start();
    setRecorderLoading(false);

    // Wait for 5 seconds and then check if the microphone is recording data
    setTimeout(() => {
      const bufferLength = analyserRef.current!.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current!.getByteFrequencyData(dataArray);

      const volume = dataArray.reduce((a, b) => a + b) / bufferLength;

      // Check if the volume level is consistently at zero
      if (volume === 0) {
        alert(
          'Microphone is not recording. Please check your microphone. You will not be able to save the recording.'
        );
      }
    }, 10000);
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
    setSelectedLanguage(formatLanguage(language));

    //timer
    setElapsedTime(0);
    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 10);
    }, 10);
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
      setElapsedTime((prevTime) => prevTime + 10);
    }, 10);
    setRecordingIntervalId(intervalId);
    setPauseAction(false);
  }
  function handleEndRecording() {
    if (pauseAction) {
      if (
        !window.confirm(
          'You have unsaved changes from when the recording was paused. These changes will be discarded. Are you sure you want to end the recording?'
        )
      ) {
        //If they press cancel on the prompt, don't run the rest of the handleEndRecording Function
        return;
      }
    }
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

    if (recorderState === 'paused') {
      mediaRecorderRef.current!.resume();
      mediaRecorderRef.current!.onresume = () => {
        setTimeout(() => {
          mediaRecorderRef.current!.stop();
        }, 1000);
      };
    } else {
      mediaRecorderRef.current!.stop();
    }
    setRecorderState('stopped');
    if (recordingIntervalId) {
      clearInterval(recordingIntervalId);
      setRecordingIntervalId(null);
    }
    setSaveModalVisible(true);
  }

  async function handleSave(updatedDetails: updateRecording) {
    try {
      const json = JSON.stringify(recorderActions.current);
      const jsonBlob = new Blob([json], { type: 'application/json' });

      const ycrFileUrl = await saveYCRFile(
        jsonBlob,
        audioRecordingBlobRef.current!,
        user.uid!
      );
      const model = editorInstance!.getModel();
      const language = model!.getLanguageId();

      const Recording: EditorRecording = {
        title: updatedDetails.title!,
        description: updatedDetails.description || '',
        thumbnail_link: updatedDetails.thumbnail_link || '',
        published: updatedDetails.published!,
        language,
        recording_link: ycrFileUrl,
        duration: elapsedTime,
      };

      recordingApi.postRecording(Recording)?.then((response) => {
        toast.success('Recording saved successfully!');
        dispatch(setLoadingSpinner(false));
        navigate('/dashboard');
      });
    } catch (error) {
      console.error('Error saving recording', error);
      toast.error('Error saving recording');
    }
  }

  function handleDiscard() {}

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
        if (response.data.output === null) {
          setConsoleOutput('{Code executed, but nothing to log}');
          handleConsoleLogOutput(
            '{Code executed, but nothing to log}',
            Date.now()
          );
        } else {
          setConsoleOutput(output);
          handleConsoleLogOutput(output, Date.now());
        }
        setIsConsoleLoading(false);
      })
      .catch((error) => {
        console.error('Error getting console output from Judge0', error);
        setIsConsoleLoading(false);
      });
  }

  return selectedLanguage === 'multi' ? (
    
    <MultiEditorRecorder />
   
  ) : (
    <>
    
      {recorderState === 'stopped' && (
        <>
          <div className='flex items-center'>
            <label
              className='block mb-2 text-sm font-medium text-white mr-3 font-console'
              htmlFor='language'
            >
              Choose a language
            </label>
            <select
              id='language'
              onChange={handleLanguageChange}
              className='border text-sm rounded-lg  block w-48 px-2.5 py-1 bg-bg-gptdark border-gray-600 placeholder-gray-400 text-white focus:ring-bg-sec focus:border-bg-sec mb-3 font-console'
            >
              <option defaultValue='javascript'>JavaScript</option>
              {/* <option value='multi'>HTML, CSS & JavaScript</option> */}
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
        <div className='border text-sm rounded-lg w-48 bg-bg-gptdark border-gray-600 text-white focus:ring-bg-sec focus:border-bg-sec mb-3 flex items-center justify-center font-console'>
          {selectedLanguage}
        </div>
      )}
      <div>
        <div className='flex  h-[500px] border border-gray-600 rounded-sm '>
          <Allotment>
            <Allotment.Pane minSize={500}>
              <div className=' bg-bg-console'>
                <Editor
                  height='500px'
                  defaultLanguage='javascript'
                  defaultValue={''}
                  theme='vs-dark'
                  options={{
                    wordWrap: 'on',
                    fontSize: fontSize,
                  }}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                />
              </div>
            </Allotment.Pane>
            <Allotment.Pane
              minSize={180}
              preferredSize={300}
            >
              <div className='border w-full h-full border-[#1e1e1e] text-white relative'>
                {/* <button
                  className='absolute bottom-2 right-2 border-white border rounded-sm p-2 bg-slate-500 hover:bg-slate-500/50 '
                  onClick={handleJudge0}
                  disabled={isConsoleLoading}
                >
                  {isConsoleLoading ? (
                    <svg
                      className='animate-spin h-5 w-5 mr-3'
                      viewBox='0 0 24 24'
                    ></svg>
                  ) : (
                    'Compile & Execute'
                  )}
                </button>
                <button
                  className='absolute top-2 right-2 border-white border text-sm rounded-md px-1 bg-slate-500 hover:bg-slate-500/50'
                  onClick={() => setConsoleOutput('')}
                >
                  clear
                </button> */}
                <TooltipMUI title='Compile & Execute'>
                  <button
                    className=' absolute top-0 right-20 w-fit items-center px-2 text-sm  text-gray-200 rounded !bg-green-900/20 border !border-gray-400 uppercase hover:!bg-green-900/50 active:ring-1 active:ring-bg-alt mt-2'
                    onClick={handleJudge0}
                    disabled={isConsoleLoading}
                  >
                    {isConsoleLoading ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      > 
                        <CircularProgress size={24} />
                      </Box>
                    ) : (
                      <p>run</p>
                    )}
                  </button> 
                </TooltipMUI>
                <TooltipMUI title='Clear Console'>
                  <button
                    className='absolute top-0 right-2 w-fit items-center px-2 text-sm font-light text-gray-200 rounded !bg-red-900/20 border !border-gray-400 uppercase hover:!bg-red-900/50 active:ring-1 active:ring-bg-alt mt-2'
                    onClick={() => setConsoleOutput('')}
                  > <p>clear</p>
                    
                  </button>
                </TooltipMUI>

                <Terminal output={consoleOutput} />
              </div>
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-center border border-gray-600 rounded-full mt-2 w-[490px] min-w-[490px] mb-2">
      {recorderState === 'stopped' && (
      <div className="flex">  
        <button
          className='p-2 text-white bg-red-900 flex rounded-full m-2 '
          onClick={handleStartRecording}
        ><RadioButtonCheckedIcon className="mr-1 !fill-red-500 "/>
          Start Recording
        </button>
        {alertVisible && (
  <Alert 
    onClose={() => setAlertVisible(false)} 
    className="fixed top-96 ml-6 !bg-blue-200 w-60 " 
    severity="info"
  >
    <AlertTitle>Info</AlertTitle>
    Any code typed into the editor before starting the recording will be discarded.
  </Alert>
)}
        </div>
      )}

      {recorderState === 'recording' && (
        <>
          <button
            className='p-2 text-white bg-bg-gptdark rounded-full m-2 flex justify-center items-center w-48'
            onClick={handlePauseRecording}
          > <PauseIcon className="mr-1 !fill-bg-alt" />
            Pause Recording
          </button>
          <button
            className='p-2 text-white bg-bg-gptdark rounded-full m-2'
            onClick={handleEndRecording}
          ><DoneIcon className="mr-1 !fill-bg-sec"/>
            End Recording
          </button>
        </>
      )}

      {recorderState === 'paused' && (
        <>
          <button
            className='p-2 text-white bg-bg-gptdark rounded-full m-2 w-48'
            onClick={handleResumeRecording}
          > <EjectIcon className="mr-1 rotate-90 !fill-red-600"/>
            Resume Recording
          </button>
          <button
            className='p-2 text-white  bg-bg-gptdark rounded-full m-2'
            onClick={handleEndRecording}
          ><DoneIcon className="mr-1 !fill-bg-sec"/>
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
        <div className='flex justify-center items-center space-x-4 text-white text-xl pl-3'>
        <span>{formatTime(elapsedTime)}</span>
        {recorderState === 'recording' && (
          <div className="h-4 w-4 mr-2 bg-red-500 rounded-full animate-[blinking_1s_infinite]"></div>
        )}
      </div>

        
      )}
</div>
      <Modal
        show={saveModalVisible}
        closeModal={() => setSaveModalVisible(false)}
        closeOnOutsideClick={false}
      >
        <EditDetailsform
          detailsToEdit={details}
          setDetailsToEdit={setDetails}
          cancelText='Discard'
          save={handleSave}
          cancel={() => setSaveModalVisible(false)}
          warnBeforeUnpublish={false}
        />
      </Modal>
    
    </>
    
  );
}
