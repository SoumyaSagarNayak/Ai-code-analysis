import React from 'react';
import { Code, Zap, BookOpen, Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                AI-Powered Code Complexity Visualizer
              </h1>
              <p className="text-blue-100 text-sm hidden sm:block">
                AI-driven analysis, smart optimization suggestions, and educational insights
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-pink-300" />
                <span>AI Optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-300" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-green-300" />
                <span>Educational Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;