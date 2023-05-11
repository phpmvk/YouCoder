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
