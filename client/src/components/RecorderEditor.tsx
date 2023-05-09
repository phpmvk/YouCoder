import Editor from '@monaco-editor/react';
import React, { useState, useRef } from 'react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import RecordRTC from 'recordrtc';

export function RecorderEditor() {
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco | null>(
    null
  );

  //audio states
  const [audioRecorder, setAudioRecorder] = useState<RecordRTC | null>(null);

  const recorderActions = useRef<RecorderActions>({
    start: 0,
    end: 0,
    pauseArray: [],
    resumeArray: [],
    pauseLengthArray: [],
    editorActions: [],
  });

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof import('monaco-editor')
  ) => {
    setEditorInstance(editor);
    setMonacoInstance(monaco);
  };

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
  }

  //recording handlers
  function handleStartRecording() {
    recorderActions.current.editorActions = [];
    editorInstance!.setValue('');
    recorderActions.current.start = Date.now();

    // Start audio recording
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const options = { mimeType: 'audio/webm' as 'audio/webm' };
      const recordRTC = new RecordRTC(stream, options);
      setAudioRecorder(recordRTC);
      recordRTC.startRecording();
    });
  }

  function handlePauseRecording() {
    let timestamp = Date.now();
    recorderActions.current.pauseArray.push({ timestamp });
    if (audioRecorder) {
      audioRecorder.pauseRecording();
    }
  }
  function handleResumeRecording() {
    let timestamp = Date.now();
    recorderActions.current.resumeArray.push({ timestamp });
    if (audioRecorder) {
      audioRecorder.resumeRecording();
    }
  }
  function handleEndRecording() {
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
    }

    // Calculate playbackTimestamp for each action
    recorderActions.current.editorActions =
      recorderActions.current.editorActions.map((action: EditorAction) => {
        let totalPauseTime = 0;
        for (let i = 0; i < recorderActions.current.pauseArray.length; i++) {
          const pauseTimestamp =
            recorderActions.current.pauseArray[i].timestamp;
          const resumeTimestamp = recorderActions.current.resumeArray[i]
            ? recorderActions.current.resumeArray[i].timestamp
            : timestamp;

          if (action.actionCreationTimestamp < pauseTimestamp) {
            break;
          }

          if (action.actionCreationTimestamp > resumeTimestamp) {
            totalPauseTime += resumeTimestamp - pauseTimestamp;
          } else {
            totalPauseTime += action.actionCreationTimestamp - pauseTimestamp;
          }
        }

        const adjustedTimestamp =
          action.actionCreationTimestamp -
          recorderActions.current.start -
          totalPauseTime;
        return { ...action, playbackTimestamp: adjustedTimestamp };
      });

    //Get current editor language
    const model = editorInstance!.getModel();
    const language = model!.getLanguageId();
    console.log('current ', language);

    // if (window.confirm('Would you like to save or discard your recording?')) {
    //   //save recording logic
    // } else {
    //   //discard recording logic
    // }
    if (audioRecorder) {
      audioRecorder.stopRecording(() => {
        const fileName = 'recordedAudio.webm';
        const blob = audioRecorder.getBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    const fileName = 'recorderActions.json';
    const json = JSON.stringify(recorderActions.current);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue=""
        theme="vs-dark"
        options={{
          wordWrap: 'on',
        }}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
      />
      <button className="p-2" onClick={handleStartRecording}>
        Start Recording
      </button>
      <button className="p-2" onClick={handlePauseRecording}>
        Pause Recording
      </button>
      <button className="p-2" onClick={handleResumeRecording}>
        Resume Recording
      </button>
      <button className="p-2" onClick={handleEndRecording}>
        End Recording
      </button>
    </>
  );
}
