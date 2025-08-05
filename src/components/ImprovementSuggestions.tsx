import React from 'react';
import { Lightbulb, ArrowRight, Star, AlertCircle, Brain, Zap } from 'lucide-react';
import { Suggestion } from '../types/analysis';

interface ImprovementSuggestionsProps {
  suggestions: Suggestion[];
}

const ImprovementSuggestions: React.FC<ImprovementSuggestionsProps> = ({ suggestions }) => {
  const getPriorityIcon = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <Lightbulb className="h-4 w-4 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-green-500 bg-green-50';
    }
  };

  const sortedSuggestions = suggestions.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const aiSuggestions = sortedSuggestions.filter(s => 
    s.title.includes('hash map') || s.title.includes('memoization') || 
    s.title.includes('binary search') || s.title.includes('StringBuilder') ||
    s.title.includes('deque') || s.title.includes('Set data structure')
  );
  
  const basicSuggestions = sortedSuggestions.filter(s => !aiSuggestions.includes(s));

  if (suggestions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-green-600" />
          Optimization Suggestions
        </h2>
        <div className="text-center py-8">
          <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Star className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Great Job!</h3>
          <p className="text-gray-600">
            Your code looks well-optimized. No immediate improvements suggested.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI-Powered Optimization Suggestions
        </h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* AI Suggestions Section */}
      {aiSuggestions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">AI-Generated Optimizations</h3>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
              SMART
            </span>
          </div>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={`ai-${index}`}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(suggestion.priority)} hover:shadow-md transition-shadow relative`}
              >
                <div className="absolute top-2 right-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    AI
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getPriorityIcon(suggestion.priority)}
                  </div>
                  
                  <div className="flex-1 pr-12">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800">{suggestion.title}</h3>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        Line {suggestion.line}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        suggestion.priority === 'high' ? 'bg-red-200 text-red-800' :
                        suggestion.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {suggestion.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{suggestion.description}</p>
                    
                    {suggestion.example && (
                      <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowRight className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-medium text-gray-700">AI-Generated Solution:</span>
                        </div>
                        <pre className="text-sm text-gray-800 font-mono overflow-x-auto whitespace-pre-wrap">
                          {suggestion.example}
                        </pre>
                      </div>
                    )}
                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Optimization Type:</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        suggestion.type === 'optimization' ? 'bg-blue-100 text-blue-700' :
                        suggestion.type === 'algorithm' ? 'bg-purple-100 text-purple-700' :
                        'bg-teal-100 text-teal-700'
                      }`}>
                        {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Basic Suggestions Section */}
      {basicSuggestions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            <h3 className="font-semibold text-gray-800">General Optimizations</h3>
          </div>
          <div className="space-y-4">
            {basicSuggestions.map((suggestion, index) => (
              <div
                key={`basic-${index}`}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(suggestion.priority)} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getPriorityIcon(suggestion.priority)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800">{suggestion.title}</h3>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        Line {suggestion.line}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        suggestion.priority === 'high' ? 'bg-red-200 text-red-800' :
                        suggestion.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {suggestion.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{suggestion.description}</p>
                    
                    {suggestion.example && (
                      <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-700">Example Solution:</span>
                        </div>
                        <pre className="text-sm text-gray-800 font-mono overflow-x-auto whitespace-pre-wrap">
                          {suggestion.example}
                        </pre>
                      </div>
                    )}
                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Optimization Type:</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        suggestion.type === 'optimization' ? 'bg-blue-100 text-blue-700' :
                        suggestion.type === 'algorithm' ? 'bg-purple-100 text-purple-700' :
                        'bg-teal-100 text-teal-700'
                      }`}>
                        {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Optimization Tips:
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• AI suggestions are based on modern algorithmic patterns and best practices</li>
          <li>• Focus on high-priority AI suggestions first for maximum performance gains</li>
          <li>• Test your code after each optimization to ensure correctness</li>
          <li>• AI recommendations consider both time and space complexity trade-offs</li>
          <li>• Validate AI suggestions with profiling on real data sets</li>
        </ul>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;