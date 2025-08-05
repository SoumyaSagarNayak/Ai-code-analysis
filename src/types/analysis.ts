export interface ComplexityAnalysis {
  overall: {
    time: string;
    space: string;
    score: number;
  };
  lineByLine: LineComplexity[];
  patterns: ComplexityPattern[];
  suggestions: Suggestion[];
  educational: EducationalContent;
}

export interface LineComplexity {
  line: number;
  code: string;
  complexity: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ComplexityPattern {
  type: 'loop' | 'recursion' | 'nested' | 'algorithm';
  startLine: number;
  endLine: number;
  complexity: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
}

export interface Suggestion {
  line: number;
  type: 'optimization' | 'refactor' | 'algorithm';
  title: string;
  description: string;
  example?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface EducationalContent {
  concepts: string[];
  explanations: { [key: string]: string };
  examples: { [key: string]: string };
}

export interface CodeLanguage {
  id: string;
  name: string;
  extensions: string[];
  keywords: string[];
  complexityPatterns: RegExp[];
}