import { CodeLanguage } from '../types/analysis';

export const SUPPORTED_LANGUAGES: CodeLanguage[] = [
  {
    id: 'cpp',
    name: 'C++',
    extensions: ['.cpp', '.cc', '.cxx', '.h', '.hpp'],
    keywords: ['#include', 'using namespace', 'int main', 'std::', 'cout', 'cin', 'vector', 'class'],
    complexityPatterns: [/for\s*\(/, /while\s*\(/, /do\s*{/]
  },
  {
    id: 'java',
    name: 'Java',
    extensions: ['.java'],
    keywords: ['public class', 'private', 'public', 'static', 'void', 'import', 'package', 'System.out'],
    complexityPatterns: [/for\s*\(/, /while\s*\(/, /do\s*{/]
  },
  {
    id: 'python',
    name: 'Python',
    extensions: ['.py'],
    keywords: ['def ', 'import ', 'from ', 'class ', 'if __name__', 'print(', 'range(', 'len('],
    complexityPatterns: [/for\s+\w+\s+in/, /while\s+/, /def\s+\w+/]
  }
];

export function detectLanguage(code: string, filename?: string): string {
  // First try to detect by filename extension
  if (filename) {
    const extension = '.' + filename.split('.').pop()?.toLowerCase();
    const langByExt = SUPPORTED_LANGUAGES.find(lang => 
      lang.extensions.includes(extension)
    );
    if (langByExt) return langByExt.id;
  }

  // Then try to detect by keywords
  let scores: { [key: string]: number } = {};
  
  SUPPORTED_LANGUAGES.forEach(lang => {
    scores[lang.id] = 0;
    lang.keywords.forEach(keyword => {
      const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = code.match(regex);
      if (matches) {
        scores[lang.id] += matches.length;
      }
    });
  });

  // Return the language with the highest score
  const detectedLang = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );

  return scores[detectedLang] > 0 ? detectedLang : 'cpp'; // Default to C++
}

export function getLanguageInfo(languageId: string): CodeLanguage | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.id === languageId);
}