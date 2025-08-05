import React from 'react';
import { TrendingUp, Clock, HardDrive, Target } from 'lucide-react';
import { ComplexityAnalysis } from '../types/analysis';

interface ComplexityVisualizationProps {
  analysis: ComplexityAnalysis;
}

const ComplexityVisualization: React.FC<ComplexityVisualizationProps> = ({ analysis }) => {
  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('2^n') || complexity.includes('n!')) return 'text-red-600 bg-red-50';
    if (complexity.includes('n^') && !complexity.includes('n^1')) return 'text-orange-600 bg-orange-50';
    if (complexity.includes('n log n')) return 'text-yellow-600 bg-yellow-50';
    if (complexity === 'O(n)') return 'text-blue-600 bg-blue-50';
    return 'text-green-600 bg-green-50';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    if (score >= 40) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const complexityLevels = [
    { notation: 'O(1)', name: 'Constant', description: 'Excellent - Always fast' },
    { notation: 'O(log n)', name: 'Logarithmic', description: 'Very Good - Scales well' },
    { notation: 'O(n)', name: 'Linear', description: 'Good - Proportional growth' },
    { notation: 'O(n log n)', name: 'Linearithmic', description: 'Fair - Common in sorting' },
    { notation: 'O(n²)', name: 'Quadratic', description: 'Poor - Avoid for large inputs' },
    { notation: 'O(2^n)', name: 'Exponential', description: 'Very Poor - Optimize immediately' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-purple-600" />
        Complexity Analysis
      </h2>

      {/* Overall Complexity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Time Complexity</p>
              <p className={`text-lg font-bold ${getComplexityColor(analysis.overall.time)}`}>
                {analysis.overall.time}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
              <HardDrive className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-teal-700 font-medium">Space Complexity</p>
              <p className={`text-lg font-bold ${getComplexityColor(analysis.overall.space)}`}>
                {analysis.overall.space}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Efficiency Score</p>
              <p className={`text-lg font-bold ${getScoreColor(analysis.overall.score)}`}>
                {analysis.overall.score}/100
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complexity Reference Guide */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Complexity Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {complexityLevels.map((level, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-2 ${
                analysis.overall.time === level.notation
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm font-bold">{level.notation}</span>
                {analysis.overall.time === level.notation && (
                  <span className="text-blue-600 text-xs font-medium">CURRENT</span>
                )}
              </div>
              <p className="text-xs text-gray-600 font-medium">{level.name}</p>
              <p className="text-xs text-gray-500">{level.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Complexity Patterns */}
      {analysis.patterns.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Detected Patterns</h3>
          <div className="space-y-3">
            {analysis.patterns.map((pattern, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  pattern.impact === 'high'
                    ? 'border-red-500 bg-red-50'
                    : pattern.impact === 'medium'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-green-500 bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-800">
                      {pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)} Pattern
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{pattern.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Lines {pattern.startLine}-{pattern.endLine}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono text-sm font-bold ${getComplexityColor(pattern.complexity)}`}>
                      {pattern.complexity}
                    </span>
                    <p className={`text-xs mt-1 ${
                      pattern.impact === 'high' ? 'text-red-600' :
                      pattern.impact === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {pattern.impact.toUpperCase()} IMPACT
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplexityVisualization;