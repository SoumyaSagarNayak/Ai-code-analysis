import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Code, Zap } from 'lucide-react';
import { EducationalContent } from '../types/analysis';

interface EducationalPanelProps {
  content: EducationalContent;
}

const EducationalPanel: React.FC<EducationalPanelProps> = ({ content }) => {
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);

  const toggleConcept = (concept: string) => {
    setExpandedConcept(expandedConcept === concept ? null : concept);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
        <BookOpen className="h-5 w-5 text-indigo-600" />
        Learning Resources
      </h2>

      <div className="space-y-4">
        {content.concepts.map((concept, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleConcept(concept)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
            >
              <span className="font-medium text-gray-800">{concept}</span>
              {expandedConcept === concept ? (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              )}
            </button>
            
            {expandedConcept === concept && (
              <div className="p-4 space-y-4">
                {content.explanations[concept] && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <h4 className="font-medium text-gray-800">Explanation</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {content.explanations[concept]}
                    </p>
                  </div>
                )}
                
                {content.examples[concept] && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-4 w-4 text-green-500" />
                      <h4 className="font-medium text-gray-800">Example</h4>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <pre className="text-sm">
                        <code>{content.examples[concept]}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <h4 className="font-medium text-indigo-800 mb-3">📚 Want to Learn More?</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="space-y-2">
            <h5 className="font-medium text-indigo-700">Time Complexity</h5>
            <ul className="text-indigo-600 space-y-1">
              <li>• Big O notation fundamentals</li>
              <li>• Common algorithm patterns</li>
              <li>• Performance analysis techniques</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-indigo-700">Optimization</h5>
            <ul className="text-indigo-600 space-y-1">
              <li>• Data structure selection</li>
              <li>• Algorithm design patterns</li>
              <li>• Space-time trade-offs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalPanel;