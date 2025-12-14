import React, { useState } from 'react';
import { getPatternExplanation } from '../services/geminiService';
import { Bot, Info } from 'lucide-react';

interface PatternCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const PatternCard: React.FC<PatternCardProps> = ({ title, children, className = '' }) => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async () => {
    if (explanation) {
      setExplanation(null); // Toggle off
      return;
    }
    setLoading(true);
    const text = await getPatternExplanation(title);
    setExplanation(text);
    setLoading(false);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col ${className}`}>
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          {title}
        </h3>
        <button
          onClick={fetchExplanation}
          className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
          disabled={loading}
        >
          <Bot size={14} />
          {loading ? 'Consultando...' : 'Definición AI'}
        </button>
      </div>
      
      {explanation && (
        <div className="bg-indigo-50 px-4 py-3 text-sm text-indigo-900 border-b border-indigo-100 flex items-start gap-2">
            <Info className="shrink-0 mt-0.5" size={16} />
            <p>{explanation}</p>
        </div>
      )}

      <div className="p-4 flex-1">
        {children}
      </div>
    </div>
  );
};