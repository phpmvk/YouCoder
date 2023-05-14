import * as monaco from 'monaco-editor';
import { Language, RecorderActions } from '../types/Editor';

export function formatLanguage(language: string) {
  switch (language) {
    case 'javascript':
      return 'JavaScript';
    case 'typescript':
      return 'TypeScript';
    case 'python':
      return 'Python';
    case 'java':
      return 'Java';
    case 'csharp':
      return 'C#';
    case 'cpp':
      return 'C++';
    case 'ruby':
      return 'Ruby';
    case 'go':
      return 'Go';
    default:
      return language.charAt(0).toUpperCase() + language.slice(1);
  }
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  const displaySeconds = totalSeconds % 60;
  const displayMinutes = totalMinutes % 60;
  const displayHours = totalHours;

  const displaySecondsString =
    displaySeconds < 10 ? `0${displaySeconds}` : `${displaySeconds}`;
  const displayMinutesString =
    displayMinutes < 10 ? `0${displayMinutes}` : `${displayMinutes}`;
  const displayHoursString =
    displayHours < 10 ? `0${displayHours}` : `${displayHours}`;

  return displayHours > 0
    ? `${displayHoursString}:${displayMinutesString}:${displaySecondsString}`
    : `${displayMinutesString}:${displaySecondsString}`;
}

export function getLanguageId(language: Language): string | null {
  const languageMapping: Record<Language, string> = {
    javascript: '63',
    python: '70',
    java: '62',
    csharp: '51',
    cpp: '76',
    ruby: '72',
    go: '60',
  };

  return languageMapping[language];
}

export function calculateTotalPauseTime(
  actionTimestamp: number,
  endTimestamp: number,
  recorderActions: RecorderActions
) {
  let totalPauseTime = 0;
  for (let i = 0; i < recorderActions.pauseArray.length; i++) {
    const pauseTimestamp = recorderActions.pauseArray[i].timestamp;
    const resumeTimestamp = recorderActions.resumeArray[i]
      ? recorderActions.resumeArray[i].timestamp
      : endTimestamp;

    if (actionTimestamp < pauseTimestamp) {
      break;
    }

    if (actionTimestamp > resumeTimestamp) {
      totalPauseTime += resumeTimestamp - pauseTimestamp;
    } else {
      totalPauseTime += actionTimestamp - pauseTimestamp;
    }
  }
  return totalPauseTime;
}

// Set current theme based on if darkmode is on or not
export const toggleTheme = (
  darkMode: string,
  monacoInstance: typeof monaco
) => {
  if (darkMode) {
    monacoInstance.editor.setTheme('vs-dark');
  } else {
    monacoInstance.editor.setTheme('vs-light');
  }
};
