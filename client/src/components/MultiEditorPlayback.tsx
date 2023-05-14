import Editor from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import ReactSlider from 'react-slider';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { loadYCRFile } from '../utils/ycrUtils';
import { formatTime } from '../utils/editorUtils';
import { Recording } from '../types/Creator';
import Button from '@mui/material/Button';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import {
  RecorderActions,
  ChangeRange,
  EditorAction,
} from '../types/MultiEditor';

import Tooltip from './Tooltip';

export function MultiEditorPlayback({
  recordingData,
}: {
  recordingData: Recording;
}) {
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco | null>(
    null
  );

  const [htmlEditorInstance, setHtmlEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [cssEditorInstance, setCssEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [jsEditorInstance, setJsEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);

  const [htmlOutput, setHtmlOutput] = useState<string>('');

  const [fontSize, setFontSize] = useState(14);

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
  const outputTimeoutIdsRef = useRef<number[]>([]);

  //scrubber states
  const [sliderValue, setSliderValue] = useState<number>(0);
  const sliderIntervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const [previousPlaybackState, setPreviousPlaybackState] = useState<
    'playing' | 'paused' | 'stopped'
  >('paused');

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

  useEffect(() => {
    const defaultFontSize = getDefaultFontSize();
    setFontSize(defaultFontSize);

    // Listen to resize event
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
    if (htmlEditorInstance && cssEditorInstance && jsEditorInstance) {
      htmlEditorInstance!.updateOptions({ fontSize });
      cssEditorInstance!.updateOptions({ fontSize });
      jsEditorInstance!.updateOptions({ fontSize });
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

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof import('monaco-editor'),
    fileType: 'html' | 'css' | 'javascript'
  ) => {
    switch (fileType) {
      case 'html':
        setHtmlEditorInstance(editor);
        break;
      case 'css':
        setCssEditorInstance(editor);
        break;
      case 'javascript':
        setJsEditorInstance(editor);
        break;
    }
    setMonacoInstance(monaco);
  };

  function applyChangeToFileEditor(
    range: ChangeRange,
    text: string,
    fileType: 'html' | 'css' | 'javascript'
  ) {
    let editorInstance;
    switch (fileType) {
      case 'html':
        editorInstance = htmlEditorInstance!;
        break;
      case 'css':
        editorInstance = cssEditorInstance!;
        break;
      case 'javascript':
        editorInstance = jsEditorInstance!;
        break;
    }
    const model = editorInstance!.getModel();
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
    scrubberPosition?: number
  ) {
    let baseTimestamp: number;
    if (scrubberPosition) {
      baseTimestamp = scrubberPosition;
    } else {
      baseTimestamp = sliderValue;
    }
    // Filter out actions that have already been executed based on the scrubber position
    const actionsToExecute = editorActions.filter(
      (action) => action.playbackTimestamp >= baseTimestamp
    );

    const outputsToExecute = importedActions!.htmlOutputArray.filter(
      (output) => output.playbackTimestamp >= baseTimestamp
    );

    if (audioElement && sliderValue === 0) {
      audioElement.play();
    }

    // Clear existing timeouts if any
    actionTimeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    actionTimeoutIdsRef.current = [];
    outputTimeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    outputTimeoutIdsRef.current = [];

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
      applyChangeToFileEditor(
        action,
        action.text,
        action.fileType as 'javascript' | 'html' | 'css'
      );
    });

    const outputsToApplyInstantly = importedActions!.htmlOutputArray.filter(
      (output) => output.playbackTimestamp < baseTimestamp
    );

    outputsToApplyInstantly.forEach((output) => {
      setHtmlOutput(output.output);
    });

    actionsToExecute.forEach((action: EditorAction) => {
      const timeoutId = window.setTimeout(() => {
        if (playbackStateRef.current.status === 'playing') {
          applyChangeToFileEditor(
            action,
            action.text,
            action.fileType as 'javascript' | 'html' | 'css'
          );
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
    outputsToExecute.forEach((output) => {
      const timeoutId = window.setTimeout(() => {
        if (playbackStateRef.current.status === 'playing') {
          setHtmlOutput(output.output);
        }
      }, output.playbackTimestamp - baseTimestamp);
      outputTimeoutIdsRef.current.push(timeoutId);
    });

    sliderIntervalIdRef.current = startSliderInterval();
  }

  //playback handlers
  function handleStartPlayback() {
    if (importedActions) {
      htmlEditorInstance!.setValue('');
      cssEditorInstance!.setValue('');
      jsEditorInstance!.setValue('');
      setHtmlOutput('');
      startPlayback(importedActions.editorActions);
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
      htmlEditorInstance!.setValue('');
      cssEditorInstance!.setValue('');
      jsEditorInstance!.setValue('');
      startPlayback(importedActions.editorActions);
    }
    clearInterval(sliderIntervalIdRef.current!);
    sliderIntervalIdRef.current = startSliderInterval();
  }

  function handleScrubberChange(scrubberPosition: number) {
    updateAudioCurrentTime(scrubberPosition);
    if (previousPlaybackState === 'playing') {
      audioElement!.play();

      clearInterval(sliderIntervalIdRef.current!);
      setSliderValue(scrubberPosition);

      setPlaybackState((prevState) => ({
        ...prevState,
        currentPosition: scrubberPosition,
      }));

      // Clear existing timeouts if any
      actionTimeoutIdsRef.current.forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
      actionTimeoutIdsRef.current = [];
      outputTimeoutIdsRef.current.forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
      outputTimeoutIdsRef.current = [];

      htmlEditorInstance!.setValue('');
      cssEditorInstance!.setValue('');
      jsEditorInstance!.setValue('');

      startPlayback(importedActions!.editorActions, scrubberPosition);
      setSliderValue(scrubberPosition);
      if (importedActions!.htmlOutputArray[0]) {
        if (
          scrubberPosition <
          importedActions!.htmlOutputArray[0].playbackTimestamp
        ) {
          setHtmlOutput('');
        }
      }
    }
    if (importedActions!.htmlOutputArray[0]) {
      if (
        scrubberPosition < importedActions!.htmlOutputArray[0].playbackTimestamp
      ) {
        setHtmlOutput('');
      }
    }
  }

  function applyChangesUntilScrubber(scrubberPosition: number) {
    htmlEditorInstance!.setValue('');
    cssEditorInstance!.setValue('');
    jsEditorInstance!.setValue('');
    // Apply all changes up to the scrubber position instantly
    const actionsToApplyInstantly = importedActions!.editorActions.filter(
      (action) => action.playbackTimestamp < scrubberPosition
    );

    actionsToApplyInstantly.forEach((action: EditorAction) => {
      applyChangeToFileEditor(
        action,
        action.text,
        action.fileType as 'javascript' | 'html' | 'css'
      );
    });

    const outputsToApplyInstantly = importedActions!.htmlOutputArray.filter(
      (output) => output.playbackTimestamp < scrubberPosition
    );

    outputsToApplyInstantly.forEach((output) => {
      setHtmlOutput(output.output);
    });

    if (importedActions!.htmlOutputArray[0]) {
      if (
        scrubberPosition < importedActions!.htmlOutputArray[0].playbackTimestamp
      ) {
        setHtmlOutput('');
      }
    }
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
              currentPosition: 0,
            });
            return 0; // Set sliderValue to audioDuration
          }
          return prevSliderValue + 100;
        });
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return intervalId;
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

  function handleRenderOutput() {
    const html = htmlEditorInstance?.getValue() ?? '<h1>hello</h1>';
    const css = cssEditorInstance?.getValue() ?? '';
    const js = jsEditorInstance?.getValue() ?? '';
    const output = `<html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>${js}</script>
    </body>
  </html>`;

    setHtmlOutput(output);
  }

  return (
    <div>
      <audio
        ref={(audio) => {
          setAudioElement(audio);
        }}
      ></audio>

      <div className=''>
        <div className='bg-bg-pri flex w-full h-[400px] px-4 mb-2 '>
          <Allotment>
            <Allotment.Pane minSize={600}>
              <Editor
                className=' border-bg-pri border-8 border-r-6 '
                height='500px'
                defaultLanguage='html'
                defaultValue=''
                theme='vs-dark'
                options={{
                  wordWrap: 'on',
                  readOnly: ignoreUserInputs,
                  fontSize: fontSize,
                }}
                onMount={(editor, monaco) =>
                  handleEditorDidMount(editor, monaco, 'html')
                }
              />
            </Allotment.Pane>
          </Allotment>
          <Allotment>
            <Allotment.Pane minSize={600}>
              <Editor
                className=' border-bg-pri border-8 border-r-6 '
                height='500px'
                defaultLanguage='css'
                defaultValue=''
                theme='vs-dark'
                options={{
                  wordWrap: 'on',
                  readOnly: ignoreUserInputs,
                  fontSize: fontSize,
                }}
                onMount={(editor, monaco) =>
                  handleEditorDidMount(editor, monaco, 'css')
                }
              />
            </Allotment.Pane>
          </Allotment>
          <Allotment>
            <Allotment.Pane minSize={600}>
              <Editor
                className=' border-bg-pri border-8 border-r-6 '
                height='500px'
                defaultLanguage='javascript'
                defaultValue=''
                theme='vs-dark'
                options={{
                  wordWrap: 'on',
                  readOnly: ignoreUserInputs,
                  fontSize: fontSize,
                }}
                onMount={(editor, monaco) =>
                  handleEditorDidMount(editor, monaco, 'javascript')
                }
              />
            </Allotment.Pane>
          </Allotment>
        </div>
        <br></br>
        <br></br>
        <div className='w-auto flex items-center justify-start space-x-10 -mt-12 bg-bg-pri mx-6 px-1 md:pax-auto'>
          {playbackState.status === 'stopped' && (
            <Button
              variant='outlined'
              className='!rounded-full !bg-bg-alt !text-bg-pri'
              onClick={handleStartPlayback}
            >
              <PlayArrowIcon />
            </Button>
          )}
          {playbackState.status === 'playing' && (
            <Button
              variant='outlined'
              className='!rounded-full !bg-bg-alt !text-bg-pri'
              onClick={handlePausePlayback}
            >
              <PauseIcon />
            </Button>
          )}
          {playbackState.status === 'paused' && (
            <Button
              variant='outlined'
              className='!rounded-full !bg-bg-alt !text-bg-pri'
              onClick={handleResumePlayback}
            >
              <PlayArrowIcon />
            </Button>
          )}

          <div className='text-gray-200 mx-4 whitespace-nowrap'>
            <button className='mr-8'>
              <VolumeUpIcon />
            </button>
            {formatTime(sliderValue)} / {formatTime(audioDuration)}
          </div>
          <ReactSlider
            className='w-10/12 max-w-[800px] h-5 bg-bg-gptdark rounded-full mx-auto border-white border flex items-center pr-2'
            thumbClassName='w-5 h-5 bg-white rounded-full cursor-pointer focus:outline-none active:h-7 active:w-7 transition'
            value={sliderValue}
            step={0.001}
            max={audioDuration}
            onBeforeChange={() => {
              setPreviousPlaybackState(playbackStateRef.current.status);
              audioElement!.muted = true;
            }}
            onChange={(value) => {
              setSliderValue(value);
              applyChangesUntilScrubber(value);
            }}
            onAfterChange={(value) => {
              handleScrubberChange(value);
              audioElement!.muted = false;
            }}
          />
          <Tooltip />
          <button className='p-2 text-white' onClick={handleRenderOutput}>
            Render HTML
          </button>
        </div>
        <br></br>
      </div>
      <iframe
        srcDoc={htmlOutput}
        title='Output'
        sandbox='allow-scripts'
      ></iframe>
    </div>
  );
}
