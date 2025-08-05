import { ComplexityAnalysis, Suggestion, ComplexityPattern } from '../types/analysis';

export class AIOptimizer {
  private code: string;
  private language: string;
  private analysis: ComplexityAnalysis;

  constructor(code: string, language: string, analysis: ComplexityAnalysis) {
    this.code = code;
    this.language = language.toLowerCase();
    this.analysis = analysis;
  }

  generateAISuggestions(): Suggestion[] {
    const suggestions: Suggestion[] = [];
    const lines = this.code.split('\n');

    // Analyze patterns and generate AI suggestions
    suggestions.push(...this.analyzeNestedLoops(lines));
    suggestions.push(...this.analyzeRecursionPatterns(lines));
    suggestions.push(...this.analyzeDataStructureUsage(lines));
    suggestions.push(...this.analyzeSearchPatterns(lines));
    suggestions.push(...this.analyzeSortingPatterns(lines));
    suggestions.push(...this.analyzeStringOperations(lines));
    suggestions.push(...this.analyzeMemoryOptimizations(lines));

    return suggestions.filter(s => s !== null);
  }

  private analyzeNestedLoops(lines: string[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect nested loops for array searching
      if (this.isLoop(line) && this.hasNestedLoop(lines, i)) {
        const context = this.getLoopContext(lines, i);
        
        if (context.isSearching) {
          suggestions.push({
            line: i + 1,
            type: 'optimization',
            title: 'Replace nested loop search with hash map',
            description: 'Convert O(n²) nested loop search to O(n) using a hash map for constant-time lookups.',
            example: this.getHashMapExample(),
            priority: 'high'
          });
        }
        
        if (context.isMatrixOperation) {
          suggestions.push({
            line: i + 1,
            type: 'algorithm',
            title: 'Optimize matrix operations',
            description: 'Consider cache-friendly iteration patterns or specialized matrix algorithms.',
            example: this.getMatrixOptimizationExample(),
            priority: 'medium'
          });
        }
      }
    }
    
    return suggestions;
  }

  private analyzeRecursionPatterns(lines: string[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (this.isRecursiveFunction(line)) {
        const functionName = this.extractFunctionName(line);
        
        // Check for fibonacci-like patterns
        if (this.isFibonacciPattern(lines, i)) {
          suggestions.push({
            line: i + 1,
            type: 'algorithm',
            title: 'Implement memoization for recursive function',
            description: 'Add memoization to avoid redundant calculations and reduce time complexity from O(2^n) to O(n).',
            example: this.getMemoizationExample(functionName),
            priority: 'high'
          });
        }
        
        // Check for tail recursion opportunities
        if (this.canOptimizeToTailRecursion(lines, i)) {
          suggestions.push({
            line: i + 1,
            type: 'optimization',
            title: 'Convert to tail recursion or iterative approach',
            description: 'Optimize stack usage by converting to tail recursion or an iterative solution.',
            example: this.getTailRecursionExample(functionName),
            priority: 'medium'
          });
        }
      }
    }
    
    return suggestions;
  }

  private analyzeDataStructureUsage(lines: string[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect inefficient array operations
      if (this.hasArrayInsertionAtBeginning(line)) {
        suggestions.push({
          line: i + 1,
          type: 'optimization',
          title: 'Use deque for efficient front insertions',
          description: 'Array insertions at the beginning are O(n). Consider using a deque or linked list for O(1) front insertions.',
          example: this.getDequeExample(),
          priority: 'medium'
        });
      }
      
      // Detect frequent lookups in arrays
      if (this.hasFrequentArrayLookups(lines, i)) {
        suggestions.push({
          line: i + 1,
          type: 'optimization',
          title: 'Replace array with hash map for faster lookups',
          description: 'Convert O(n) array searches to O(1) hash map lookups for better performance.',
          example: this.getHashMapLookupExample(),
          priority: 'high'
        });
      }
      
      // Detect set operations on arrays
      if (this.hasSetOperationsOnArray(line)) {
        suggestions.push({
          line: i + 1,
          type: 'optimization',
          title: 'Use Set data structure for unique elements',
          description: 'Set operations on arrays are inefficient. Use a Set data structure for O(1) add/remove/contains operations.',
          example: this.getSetOperationExample(),
          priority: 'medium'
        });
      }
    }
    
    return suggestions;
  }

  private analyzeSearchPatterns(lines: string[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect linear search in sorted arrays
      if (this.isLinearSearchInSortedArray(lines, i)) {
        suggestions.push({
          line: i + 1,
          type: 'algorithm',
          title: 'Use binary search for sorted arrays',
          description: 'Replace O(n) linear search with O(log n) binary search for sorted data.',
          example: this.getBinarySearchExample(),
          priority: 'high'
        });
      }
      
      // Detect substring search patterns
      if (this.hasSubstringSearch(line)) {
        suggestions.push({
          line: i + 1,
          type: 'algorithm',
          title: 'Consider KMP algorithm for string matching',
          description: 'For repeated string searches, KMP algorithm provides O(n+m) complexity instead of O(n*m).',
          example: this.getKMPExample(),
          priority: 'medium'
        });
      }
    }
    
    return suggestions;
  }

  private analyzeSortingPatterns(lines: string[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect bubble sort pattern
      if (this.isBubbleSort(lines, i)) {
        suggestions.push({
          line: i + 1,
          type: 'algorithm',
          title: 'Replace bubble sort with efficient sorting algorithm',
          description: 'Bubble sort has O(n²) complexity. Use quicksort, mergesort, or built-in sort functions for O(n log n) performance.',
          example: this.getEfficientSortExample(),
          priority: 'high'
        });
      }
      
      // Detect selection sort pattern
      if (this.isSelectionSort(lines, i)) {
        suggestions.push({
          line: i + 1,
          type: 'algorithm',
          title: 'Upgrade from selection sort to merge sort',
          description: 'Selection sort is O(n²). Consider merge sort or heap sort for guaranteed O(n log n) performance.',
          example: this.getMergeSortExample(),
          priority: 'high'
        });
      }
    }
    
    return suggestions;
  }

  private analyzeStringOperations(lines: string[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect string concatenation in loops
      if (this.hasStringConcatenationInLoop(lines, i)) {
        suggestions.push({
          line: i + 1,
          type: 'optimization',
          title: 'Use StringBuilder for string concatenation in loops',
          description: 'String concatenation in loops creates O(n²) complexity. Use StringBuilder or string arrays for O(n) performance.',
          example: this.getStringBuilderExample(),
          priority: 'high'
        });
      }
      
      // Detect character-by-character string building
      if (this.hasCharacterByCharacterBuilding(line)) {
        suggestions.push({
          line: i + 1,
          type: 'optimization',
          title: 'Optimize character-by-character string operations',
          description: 'Consider using character arrays or StringBuilder for efficient string manipulation.',
          example: this.getCharArrayExample(),
          priority: 'medium'
        });
      }
    }
    
    return suggestions;
  }

  private analyzeMemoryOptimizations(lines: string[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect unnecessary array copies
      if (this.hasUnnecessaryArrayCopy(line)) {
        suggestions.push({
          line: i + 1,
          type: 'optimization',
          title: 'Avoid unnecessary array copying',
          description: 'Array copying is O(n) operation. Consider using array slicing or in-place operations when possible.',
          example: this.getInPlaceOperationExample(),
          priority: 'medium'
        });
      }
      
      // Detect space-inefficient algorithms
      if (this.hasSpaceInefficiency(lines, i)) {
        suggestions.push({
          line: i + 1,
          type: 'optimization',
          title: 'Optimize space complexity',
          description: 'Consider space-time trade-offs. Sometimes using O(1) extra space instead of O(n) can be beneficial.',
          example: this.getSpaceOptimizationExample(),
          priority: 'low'
        });
      }
    }
    
    return suggestions;
  }

  // Helper methods for pattern detection
  private isLoop(line: string): boolean {
    const loopPatterns = {
      cpp: /\b(for|while)\s*\(/,
      java: /\b(for|while)\s*\(/,
      python: /\b(for|while)\b.*:/
    };
    const pattern = loopPatterns[this.language as keyof typeof loopPatterns];
    return pattern ? pattern.test(line) : false;
  }

  private hasNestedLoop(lines: string[], startIndex: number): boolean {
    let braceCount = 0;
    let foundNested = false;
    
    for (let i = startIndex; i < Math.min(startIndex + 20, lines.length); i++) {
      const line = lines[i].trim();
      if (line.includes('{')) braceCount++;
      if (line.includes('}')) braceCount--;
      if (braceCount > 0 && this.isLoop(line) && i > startIndex) {
        foundNested = true;
        break;
      }
      if (braceCount === 0 && i > startIndex) break;
    }
    
    return foundNested;
  }

  private getLoopContext(lines: string[], startIndex: number): { isSearching: boolean; isMatrixOperation: boolean } {
    const context = { isSearching: false, isMatrixOperation: false };
    
    for (let i = startIndex; i < Math.min(startIndex + 10, lines.length); i++) {
      const line = lines[i].toLowerCase();
      if (line.includes('==') || line.includes('find') || line.includes('search')) {
        context.isSearching = true;
      }
      if (line.includes('[i][j]') || line.includes('matrix') || line.includes('grid')) {
        context.isMatrixOperation = true;
      }
    }
    
    return context;
  }

  private isRecursiveFunction(line: string): boolean {
    return line.includes('def ') || line.includes('function ') || 
           (line.includes('(') && line.includes(')') && line.includes('{'));
  }

  private extractFunctionName(line: string): string {
    const match = line.match(/(?:def|function)\s+(\w+)|(\w+)\s*\(/);
    return match ? (match[1] || match[2] || 'function') : 'function';
  }

  private isFibonacciPattern(lines: string[], startIndex: number): boolean {
    const functionBody = lines.slice(startIndex, Math.min(startIndex + 10, lines.length)).join(' ');
    return functionBody.includes('fibonacci') || 
           (functionBody.includes('n-1') && functionBody.includes('n-2'));
  }

  private canOptimizeToTailRecursion(lines: string[], startIndex: number): boolean {
    // Simplified check for tail recursion optimization opportunities
    const functionBody = lines.slice(startIndex, Math.min(startIndex + 15, lines.length));
    return functionBody.some(line => 
      line.includes('return') && line.includes('(') && !line.includes('+') && !line.includes('*')
    );
  }

  // Example generation methods
  private getHashMapExample(): string {
    return `// Instead of nested loops:
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        if (arr1[i] == arr2[j]) { /* found */ }
    }
}

// Use hash map:
unordered_set<int> hashSet(arr2, arr2 + m);
for (int i = 0; i < n; i++) {
    if (hashSet.find(arr1[i]) != hashSet.end()) {
        /* found in O(1) */
    }
}`;
  }

  private getMemoizationExample(functionName: string): string {
    return `// Add memoization:
unordered_map<int, int> memo;

int ${functionName}(int n) {
    if (memo.find(n) != memo.end()) {
        return memo[n];
    }
    if (n <= 1) return n;
    memo[n] = ${functionName}(n-1) + ${functionName}(n-2);
    return memo[n];
}`;
  }

  private getBinarySearchExample(): string {
    return `// Replace linear search:
for (int i = 0; i < n; i++) {
    if (arr[i] == target) return i;
}

// With binary search:
int left = 0, right = n - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}`;
  }

  private getStringBuilderExample(): string {
    return `// Instead of string concatenation:
string result = "";
for (int i = 0; i < n; i++) {
    result += arr[i]; // O(n²) complexity
}

// Use StringBuilder or vector:
vector<string> parts;
for (int i = 0; i < n; i++) {
    parts.push_back(arr[i]);
}
string result = join(parts); // O(n) complexity`;
  }

  // Additional helper methods for pattern detection
  private hasArrayInsertionAtBeginning(line: string): boolean {
    return line.includes('.insert(0') || line.includes('.unshift(') || 
           line.includes('insert(arr.begin()');
  }

  private hasFrequentArrayLookups(lines: string[], index: number): boolean {
    const context = lines.slice(Math.max(0, index - 3), Math.min(lines.length, index + 3));
    const lookupCount = context.filter(line => 
      line.includes('.find(') || line.includes('.indexOf(') || line.includes('in ')
    ).length;
    return lookupCount >= 2;
  }

  private hasSetOperationsOnArray(line: string): boolean {
    return (line.includes('unique') || line.includes('distinct')) && 
           (line.includes('array') || line.includes('list') || line.includes('vector'));
  }

  private isLinearSearchInSortedArray(lines: string[], index: number): boolean {
    const context = lines.slice(Math.max(0, index - 5), Math.min(lines.length, index + 5));
    const hasSortedComment = context.some(line => 
      line.toLowerCase().includes('sorted') || line.toLowerCase().includes('ascending')
    );
    const hasLinearSearch = lines[index].includes('==') && this.isLoop(lines[index]);
    return hasSortedComment && hasLinearSearch;
  }

  private hasSubstringSearch(line: string): boolean {
    return line.includes('.find(') || line.includes('.indexOf(') || 
           line.includes('substring') || line.includes('strstr');
  }

  private isBubbleSort(lines: string[], index: number): boolean {
    const context = lines.slice(index, Math.min(index + 8, lines.length)).join(' ');
    return context.includes('bubble') || 
           (context.includes('swap') && context.includes('j+1') && this.hasNestedLoop(lines, index));
  }

  private isSelectionSort(lines: string[], index: number): boolean {
    const context = lines.slice(index, Math.min(index + 10, lines.length)).join(' ');
    return context.includes('selection') || 
           (context.includes('min') && context.includes('swap') && this.hasNestedLoop(lines, index));
  }

  private hasStringConcatenationInLoop(lines: string[], index: number): boolean {
    return this.isLoop(lines[index]) && 
           lines.slice(index, Math.min(index + 5, lines.length))
                .some(line => line.includes('+=') && (line.includes('"') || line.includes("'")));
  }

  private hasCharacterByCharacterBuilding(line: string): boolean {
    return line.includes('charAt') || line.includes('[i]') && line.includes('string');
  }

  private hasUnnecessaryArrayCopy(line: string): boolean {
    return line.includes('.copy()') || line.includes('.clone()') || 
           line.includes('Arrays.copyOf') || line.includes('memcpy');
  }

  private hasSpaceInefficiency(lines: string[], index: number): boolean {
    const context = lines.slice(index, Math.min(index + 5, lines.length));
    return context.some(line => 
      line.includes('new ') && (line.includes('[n]') || line.includes('vector<'))
    );
  }

  // Additional example methods
  private getMatrixOptimizationExample(): string {
    return `// Cache-friendly matrix traversal:
// Instead of column-major order:
for (int j = 0; j < cols; j++) {
    for (int i = 0; i < rows; i++) {
        process(matrix[i][j]);
    }
}

// Use row-major order:
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        process(matrix[i][j]);
    }
}`;
  }

  private getDequeExample(): string {
    return `// Instead of array front insertion:
vector<int> arr;
arr.insert(arr.begin(), value); // O(n)

// Use deque:
deque<int> dq;
dq.push_front(value); // O(1)`;
  }

  private getHashMapLookupExample(): string {
    return `// Replace array lookup:
bool found = false;
for (int x : arr) {
    if (x == target) { found = true; break; }
}

// With hash map:
unordered_set<int> hashSet(arr.begin(), arr.end());
bool found = hashSet.count(target) > 0;`;
  }

  private getSetOperationExample(): string {
    return `// Instead of array for unique elements:
vector<int> unique_arr;
for (int x : arr) {
    if (find(unique_arr.begin(), unique_arr.end(), x) == unique_arr.end()) {
        unique_arr.push_back(x);
    }
}

// Use set:
set<int> unique_set(arr.begin(), arr.end());`;
  }

  private getKMPExample(): string {
    return `// For repeated string matching, use KMP:
vector<int> computeLPS(string pattern) {
    int m = pattern.length();
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            lps[i++] = ++len;
        } else if (len) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}`;
  }

  private getEfficientSortExample(): string {
    return `// Instead of bubble sort O(n²):
for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
        if (arr[j] > arr[j+1]) {
            swap(arr[j], arr[j+1]);
        }
    }
}

// Use built-in sort O(n log n):
sort(arr.begin(), arr.end());`;
  }

  private getMergeSortExample(): string {
    return `// Implement merge sort O(n log n):
void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`;
  }

  private getTailRecursionExample(functionName: string): string {
    return `// Convert to tail recursion:
int ${functionName}Helper(int n, int acc) {
    if (n <= 1) return acc;
    return ${functionName}Helper(n - 1, acc * n);
}

int ${functionName}(int n) {
    return ${functionName}Helper(n, 1);
}`;
  }

  private getCharArrayExample(): string {
    return `// Instead of string concatenation:
string result = "";
for (char c : chars) {
    result += c; // O(n²)
}

// Use character array:
vector<char> result;
for (char c : chars) {
    result.push_back(c); // O(n)
}
string final_result(result.begin(), result.end());`;
  }

  private getInPlaceOperationExample(): string {
    return `// Instead of creating new array:
vector<int> doubled;
for (int x : arr) {
    doubled.push_back(x * 2);
}

// Modify in-place:
for (int& x : arr) {
    x *= 2;
}`;
  }

  private getSpaceOptimizationExample(): string {
    return `// Space-optimized approach:
// Instead of O(n) extra space:
vector<int> temp(n);

// Use O(1) space with two pointers:
int left = 0, right = n - 1;
while (left < right) {
    // Process without extra space
    left++;
    right--;
}`;
  }
}