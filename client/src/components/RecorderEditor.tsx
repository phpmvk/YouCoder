import Editor from '@monaco-editor/react';
import React, { useState, useRef } from 'react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import RecordRTC from 'recordrtc';

import http from '../services/consoleApi';
import { CodeToExecute } from '../types/console';

export function RecorderEditor() {
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco | null>(
    null
  );

  const [audioRecorder, setAudioRecorder] = useState<RecordRTC | null>(null);

  const recorderActions = useRef<RecorderActions>({
    start: 0,
    end: 0,
    pauseArray: [],
    resumeArray: [],
    pauseLengthArray: [],
    editorActions: [],
  });

  function getLanguageId(language: Language): string | null {
    const languageMapping: Record<Language, string> = {
      javascript: '93',
      python: '70',
      java: '91',
      csharp: '51',
      cpp: '76',
      ruby: '72',
      go: '95',
    };

    return languageMapping[language];
  }

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const model = editorInstance!.getModel();
    console.log('Selected language', event.target.value);
    monacoInstance!.editor.setModelLanguage(model!, event.target.value);
    const language = model!.getLanguageId();
    console.log('current ', language);

    console.log(monacoInstance!.languages.getLanguages());
  };

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

  function handleJudge0() {
    const model = editorInstance!.getModel();
    const language = model!.getLanguageId() as Language;
    console.log('current ', language);
    const source_code = editorInstance!.getValue();
    const language_id = getLanguageId(language)!;

    const judge0: CodeToExecute = { language_id, source_code };
    console.log(judge0);
    http.getOutput(judge0)!.then((response) => {
      const div = document.getElementById('console');
      div!.innerHTML = response.data.stdout;
      console.log(response);
    });
  }

  return (
    <>
      <select onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="cpp">C++</option>
        <option value="ruby">Ruby</option>
        <option value="go">Go</option>
      </select>
      <div className="flex max-w-full">
        <div className="w-3/4">
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
        </div>
        <div className="w-1/4">
          <button onClick={handleJudge0}>Compile & Execute</button>
          <h1 id="console"></h1>
        </div>
      </div>

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
