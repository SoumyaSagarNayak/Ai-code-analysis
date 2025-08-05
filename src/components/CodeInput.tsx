import React, { useState, useCallback } from 'react';
import { Upload, FileText, Play, Trash2 } from 'lucide-react';
import { detectLanguage, SUPPORTED_LANGUAGES } from '../utils/languageDetector';

interface CodeInputProps {
  onAnalyze: (code: string, language: string) => void;
  isAnalyzing: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const detectedLang = detectLanguage(content, file.name);
      setCode(content);
      setSelectedLanguage(detectedLang);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const codeFile = files.find(file => 
      file.type === 'text/plain' || 
      file.name.match(/\.(cpp|java|py|c|h|hpp)$/i)
    );
    
    if (codeFile) {
      handleFileUpload(codeFile);
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleAnalyze = () => {
    if (code.trim()) {
      onAnalyze(code, selectedLanguage);
    }
  };

  const handleClear = () => {
    setCode('');
  };

  const sampleCodes = {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int findMax(vector<int>& arr) {
    int max = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
    java: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}`,
    python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def find_duplicates(arr):
    duplicates = []
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] == arr[j] and arr[i] not in duplicates:
                duplicates.append(arr[i])
    return duplicates`
  };

  const loadSample = (lang: string) => {
    setCode(sampleCodes[lang as keyof typeof sampleCodes]);
    setSelectedLanguage(lang);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          Code Input
        </h2>
        
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
          
          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload File
            <input
              type="file"
              accept=".cpp,.java,.py,.c,.h,.hpp,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Try samples:</span>
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => loadSample(lang.id)}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded transition-colors"
            >
              {lang.name} Example
            </button>
          ))}
        </div>

        <div
          className={`relative ${dragActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here or drag and drop a file..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            style={{ lineHeight: '1.5' }}
          />
          {dragActive && (
            <div className="absolute inset-0 bg-blue-50 bg-opacity-90 flex items-center justify-center rounded-lg">
              <div className="text-blue-600 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2" />
                <p>Drop your code file here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleClear}
          disabled={!code.trim()}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>
        
        <button
          onClick={handleAnalyze}
          disabled={!code.trim() || isAnalyzing}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          <Play className="h-4 w-4" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </div>
    </div>
  );
};

export default CodeInput;