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
