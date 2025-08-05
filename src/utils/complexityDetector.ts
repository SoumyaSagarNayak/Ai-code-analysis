import { ComplexityAnalysis, LineComplexity, ComplexityPattern, Suggestion, EducationalContent } from '../types/analysis';
import { AIOptimizer } from './aiOptimizer';

export class ComplexityDetector {
  private language: string;
  private code: string;
  private lines: string[];

  constructor(code: string, language: string) {
    this.code = code;
    this.language = language.toLowerCase();
    this.lines = code.split('\n');
  }

  analyze(): ComplexityAnalysis {
    const lineByLine = this.analyzeLines();
    const patterns = this.detectPatterns();
    const basicSuggestions = this.generateSuggestions(lineByLine, patterns);
    const educational = this.generateEducationalContent(patterns);
    
    const overall = this.calculateOverallComplexity(patterns);

    // Generate AI-powered suggestions
    const preliminaryAnalysis = {
      overall,
      lineByLine,
      patterns,
      suggestions: basicSuggestions,
      educational
    };
    
    const aiOptimizer = new AIOptimizer(this.code, this.language, preliminaryAnalysis);
    const aiSuggestions = aiOptimizer.generateAISuggestions();
    
    // Combine and deduplicate suggestions
    const allSuggestions = [...basicSuggestions, ...aiSuggestions];
    const uniqueSuggestions = this.deduplicateSuggestions(allSuggestions);
    return {
      overall,
      lineByLine,
      patterns,
      suggestions: uniqueSuggestions,
      educational
    };
  }

  private analyzeLines(): LineComplexity[] {
    return this.lines.map((line, index) => {
      const trimmedLine = line.trim();
      const complexity = this.getLineComplexity(trimmedLine);
      
      return {
        line: index + 1,
        code: line,
        complexity: complexity.notation,
        reason: complexity.reason,
        severity: complexity.severity
      };
    });
  }

  private getLineComplexity(line: string): { notation: string; reason: string; severity: 'low' | 'medium' | 'high' } {
    // Nested loops detection
    const nestedLoopDepth = this.getNestedLoopDepth(line);
    if (nestedLoopDepth > 1) {
      return {
        notation: `O(n^${nestedLoopDepth})`,
        reason: `Nested loop with depth ${nestedLoopDepth}`,
        severity: 'high'
      };
    }

    // Loop detection
    if (this.isLoop(line)) {
      return {
        notation: 'O(n)',
        reason: 'Linear loop iteration',
        severity: 'medium'
      };
    }

    // Recursive call detection
    if (this.isRecursiveCall(line)) {
      return {
        notation: 'O(2^n)',
        reason: 'Potential exponential recursion',
        severity: 'high'
      };
    }

    // Array/collection operations
    if (this.isCollectionOperation(line)) {
      return {
        notation: 'O(n)',
        reason: 'Collection iteration or search',
        severity: 'medium'
      };
    }

    // Hash table operations
    if (this.isHashOperation(line)) {
      return {
        notation: 'O(1)',
        reason: 'Hash table lookup/insertion',
        severity: 'low'
      };
    }

    // Simple operations
    return {
      notation: 'O(1)',
      reason: 'Constant time operation',
      severity: 'low'
    };
  }

  private detectPatterns(): ComplexityPattern[] {
    const patterns: ComplexityPattern[] = [];
    let i = 0;

    while (i < this.lines.length) {
      const line = this.lines[i].trim();

      // Detect nested loops
      if (this.isLoop(line)) {
        const nestedPattern = this.analyzeNestedStructure(i);
        if (nestedPattern) {
          patterns.push(nestedPattern);
          i = nestedPattern.endLine;
          continue;
        }
      }

      // Detect recursion patterns
      if (this.isRecursiveCall(line)) {
        patterns.push({
          type: 'recursion',
          startLine: i + 1,
          endLine: i + 1,
          complexity: 'O(2^n)',
          description: 'Recursive function call detected',
          impact: 'high'
        });
      }

      i++;
    }

    return patterns;
  }

  private analyzeNestedStructure(startLine: number): ComplexityPattern | null {
    let depth = 0;
    let maxDepth = 1;
    let currentLine = startLine;
    let braceCount = 0;

    while (currentLine < this.lines.length) {
      const line = this.lines[currentLine].trim();

      if (this.isLoop(line)) {
        depth++;
        maxDepth = Math.max(maxDepth, depth);
      }

      if (line.includes('{')) braceCount++;
      if (line.includes('}')) {
        braceCount--;
        if (depth > 0) depth--;
      }

      if (braceCount === 0 && currentLine > startLine) {
        break;
      }

      currentLine++;
    }

    if (maxDepth > 1) {
      return {
        type: 'nested',
        startLine: startLine + 1,
        endLine: currentLine + 1,
        complexity: `O(n^${maxDepth})`,
        description: `Nested loops with depth ${maxDepth}`,
        impact: maxDepth > 2 ? 'high' : 'medium'
      };
    }

    return null;
  }

  private generateSuggestions(lineAnalysis: LineComplexity[], patterns: ComplexityPattern[]): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // Suggestions for nested loops
    patterns.forEach(pattern => {
      if (pattern.type === 'nested' && pattern.impact === 'high') {
        suggestions.push({
          line: pattern.startLine,
          type: 'optimization',
          title: 'Reduce nested loop complexity',
          description: 'Consider using hash maps, early termination, or breaking the problem into smaller functions.',
          example: 'Use a hash map for O(1) lookups instead of nested loops for searching.',
          priority: 'high'
        });
      }

      if (pattern.type === 'recursion') {
        suggestions.push({
          line: pattern.startLine,
          type: 'algorithm',
          title: 'Optimize recursion',
          description: 'Consider using memoization, dynamic programming, or iterative approaches.',
          example: 'Add a cache to store previously computed results.',
          priority: 'high'
        });
      }
    });

    // Suggestions for high-complexity lines
    lineAnalysis.forEach(line => {
      if (line.severity === 'high' && !suggestions.some(s => s.line === line.line)) {
        suggestions.push({
          line: line.line,
          type: 'refactor',
          title: 'Simplify complex operation',
          description: 'This line contributes significantly to overall complexity.',
          priority: 'medium'
        });
      }
    });

    return suggestions;
  }

  private deduplicateSuggestions(suggestions: Suggestion[]): Suggestion[] {
    const seen = new Set<string>();
    return suggestions.filter(suggestion => {
      const key = `${suggestion.line}-${suggestion.title}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    }).sort((a, b) => {
      // Sort by priority: high -> medium -> low
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
  private generateEducationalContent(patterns: ComplexityPattern[]): EducationalContent {
    const concepts = new Set<string>();
    const explanations: { [key: string]: string } = {};
    const examples: { [key: string]: string } = {};

    patterns.forEach(pattern => {
      switch (pattern.type) {
        case 'nested':
          concepts.add('Nested Loops');
          explanations['Nested Loops'] = 'Nested loops multiply time complexity. Two nested loops over n elements result in O(n²) complexity.';
          examples['Nested Loops'] = 'for (int i = 0; i < n; i++) {\n  for (int j = 0; j < n; j++) {\n    // O(n²) operation\n  }\n}';
          break;
        case 'recursion':
          concepts.add('Recursion');
          explanations['Recursion'] = 'Recursive functions call themselves. Without optimization, they can have exponential complexity.';
          examples['Recursion'] = 'int fibonacci(int n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2); // O(2^n)\n}';
          break;
      }
    });

    // Always include basic concepts
    concepts.add('Big O Notation');
    explanations['Big O Notation'] = 'Big O describes how algorithm performance scales with input size. O(1) is constant, O(n) is linear, O(n²) is quadratic.';
    examples['Big O Notation'] = 'O(1): array[index]\nO(n): linear search\nO(n²): nested loops\nO(log n): binary search';

    return {
      concepts: Array.from(concepts),
      explanations,
      examples
    };
  }

  private calculateOverallComplexity(patterns: ComplexityPattern[]): { time: string; space: string; score: number } {
    let maxComplexity = 'O(1)';
    let score = 100;

    patterns.forEach(pattern => {
      if (pattern.complexity.includes('n^')) {
        const exponent = parseInt(pattern.complexity.match(/n\^(\d+)/)?.[1] || '2');
        maxComplexity = `O(n^${exponent})`;
        score -= exponent * 20;
      } else if (pattern.complexity === 'O(2^n)') {
        maxComplexity = 'O(2^n)';
        score -= 40;
      } else if (pattern.complexity === 'O(n log n)') {
        maxComplexity = 'O(n log n)';
        score -= 15;
      } else if (pattern.complexity === 'O(n)' && maxComplexity === 'O(1)') {
        maxComplexity = 'O(n)';
        score -= 10;
      }
    });

    return {
      time: maxComplexity,
      space: 'O(1)', // Simplified space analysis
      score: Math.max(0, score)
    };
  }

  private getNestedLoopDepth(line: string): number {
    // This is a simplified version - in practice, you'd need more sophisticated parsing
    return 0; // Placeholder implementation
  }

  private isLoop(line: string): boolean {
    const loopPatterns = {
      cpp: /\b(for|while)\s*\(/,
      java: /\b(for|while)\s*\(/,
      python: /\b(for|while)\b.*:/
    };

    const pattern = loopPatterns[this.language as keyof typeof loopPatterns];
    return pattern ? pattern.test(line) : false;
  }

  private isRecursiveCall(line: string): boolean {
    // Simplified recursive call detection
    return line.includes('function_name(') || line.includes('def ') || 
           line.match(/\w+\s*\([^)]*\w+\s*[-+]\s*\d+[^)]*\)/);
  }

  private isCollectionOperation(line: string): boolean {
    const collectionPatterns = [
      /\.find\(/,
      /\.filter\(/,
      /\.map\(/,
      /\.forEach\(/,
      /in\s+\w+/,
      /\.contains\(/,
      /\.indexOf\(/
    ];

    return collectionPatterns.some(pattern => pattern.test(line));
  }

  private isHashOperation(line: string): boolean {
    const hashPatterns = [
      /\[.*\]\s*=/,
      /\.get\(/,
      /\.put\(/,
      /\[.*\]/
    ];

    return hashPatterns.some(pattern => pattern.test(line));
  }
}