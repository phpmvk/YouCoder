type RecorderActions = {
  start: number;
  end: number;
  pauseArray: RecorderAction[];
  resumeArray: RecorderAction[];
  pauseLengthArray: number[];
  editorActions: EditorAction[];
};

type ChangeRange = {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
};

type EditorAction = ChangeRange & {
  actionCreationTimestamp: number;
  playbackTimestamp: number;
  text: string;
};

type RecorderAction = {
  timestamp: number;
};
