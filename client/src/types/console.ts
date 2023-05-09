export type CodeToExecute = {
  language_id: string;
  source_code: string;
  stdin: string;
};

export type ExecutedCode = {
  stdout: string;
};
