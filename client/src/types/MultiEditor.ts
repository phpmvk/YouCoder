export type RecorderActions = {
  start: number;
  end: number;
  pauseArray: RecorderAction[];
  resumeArray: RecorderAction[];
  pauseLengthArray: number[];
  editorActions: EditorAction[];
  consoleLogOutputs: ConsoleLog[];
  htmlOutputArray: htmlOutput[];
};

export type ChangeRange = {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
};

export type EditorAction = ChangeRange & {
  actionCreationTimestamp: number;
  playbackTimestamp: number;
  text: string;
  fileType?: string;
};

export type RecorderAction = {
  timestamp: number;
};

export type htmlOutput = {
  output: string;
  timestamp: number;
  playbackTimestamp: number;
};

export type Language =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'csharp'
  | 'cpp'
  | 'ruby'
  | 'go';

export type ConsoleLog = {
  text: string;
  timestamp: number;
  playbackTimestamp: number;
};

export type EditorRecording = {
  title: string;
  description?: string;
  thumbnail_link?: string;
  language: string;
  recording_link: string;
  duration: number;
};
