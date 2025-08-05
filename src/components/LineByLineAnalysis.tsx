import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { LineComplexity } from '../types/analysis';

interface LineByLineAnalysisProps {
  lines: LineComplexity[];
}

const LineByLineAnalysis: React.FC<LineByLineAnalysisProps> = ({ lines }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const filteredLines = filter === 'all' 
    ? lines 
    : lines.filter(line => line.severity === filter);

  const severityCounts = {
    high: lines.filter(l => l.severity === 'high').length,
    medium: lines.filter(l => l.severity === 'medium').length,
    low: lines.filter(l => l.severity === 'low').length
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          Line-by-Line Analysis
        </h2>
        
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Lines ({lines.length})</option>
            <option value="high">High Impact ({severityCounts.high})</option>
            <option value="medium">Medium Impact ({severityCounts.medium})</option>
            <option value="low">Low Impact ({severityCounts.low})</option>
          </select>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{severityCounts.high}</div>
              <div className="text-sm text-red-700">High Impact</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{severityCounts.medium}</div>
              <div className="text-sm text-yellow-700">Medium Impact</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{severityCounts.low}</div>
              <div className="text-sm text-green-700">Low Impact</div>
            </div>
          </div>

          {/* Line Analysis */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredLines.map((line, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getSeverityColor(line.severity)} hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {getSeverityIcon(line.severity)}
                    <span className="text-sm font-mono text-gray-500 min-w-[3rem]">
                      L{line.line}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap overflow-x-auto">
                      {line.code || '(empty line)'}
                    </pre>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm font-medium text-gray-700">
                        {line.complexity}
                      </span>
                      <span className="text-xs text-gray-600">
                        {line.reason}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLines.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Info className="h-8 w-8 mx-auto mb-2" />
                <p>No lines match the current filter.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LineByLineAnalysis;