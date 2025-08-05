import React, { useState } from 'react';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import ComplexityVisualization from './components/ComplexityVisualization';
import LineByLineAnalysis from './components/LineByLineAnalysis';
import ImprovementSuggestions from './components/ImprovementSuggestions';
import EducationalPanel from './components/EducationalPanel';
import { ComplexityDetector } from './utils/complexityDetector';
import { ComplexityAnalysis } from './types/analysis';

function App() {
  const [analysis, setAnalysis] = useState<ComplexityAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (code: string, language: string) => {
    setIsAnalyzing(true);
    
    // Simulate analysis time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const detector = new ComplexityDetector(code, language);
    const result = detector.analyze();
    
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          {!analysis && !isAnalyzing && (
            <div className="text-center py-12">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  AI-Powered Code Complexity Analysis
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Get intelligent insights into your code's performance with AI-powered optimization suggestions, 
                  real-time complexity analysis, and educational guidance for writing efficient algorithms.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Analysis</h3>
                    <p className="text-gray-600 text-sm">Smart pattern recognition and intelligent optimization suggestions</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Real-time Complexity</h3>
                    <p className="text-gray-600 text-sm">Instant Big O analysis with line-by-line breakdown</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Educational Insights</h3>
                    <p className="text-gray-600 text-sm">Learn algorithmic concepts with interactive examples</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code Input */}
          <CodeInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

          {/* Loading State */}
          {isAnalyzing && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Your Code...</h3>
                <p className="text-gray-600">
                  AI is analyzing complexity patterns, calculating Big O notation, and generating intelligent optimization suggestions.
                </p>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && !isAnalyzing && (
            <div className="space-y-8">
              {/* Main Analysis */}
              <ComplexityVisualization analysis={analysis} />
              
              {/* Detailed Analysis Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <LineByLineAnalysis lines={analysis.lineByLine} />
                </div>
                <div className="space-y-8">
                  <ImprovementSuggestions suggestions={analysis.suggestions} />
                  <EducationalPanel content={analysis.educational} />
                </div>
              </div>
              
              {/* Action Bar */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Ready to optimize your code?</h3>
                    <p className="text-sm text-gray-600">Apply the AI suggestions and analyze again to see performance improvements.</p>
                  </div>
                  <button
                    onClick={() => setAnalysis(null)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
                  >
                    Analyze New Code
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Built with ❤️ and AI to help developers write more efficient code
            </p>
            <p className="text-sm">
              Supports C++, Java, and Python • AI-powered suggestions • Real-time analysis • Educational insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;