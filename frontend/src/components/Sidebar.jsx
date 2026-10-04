import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const Sidebar = ({ onEvaluate, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onEvaluate(text);
    }
  };

  return (
    <aside className="w-80 h-full border-r border-white/10 glass-panel flex flex-col rounded-none relative z-10">
      <div className="p-6 flex items-center space-x-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold tracking-wide">Scam Preventer</h2>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <p className="text-sm text-gray-400 mb-6">
          Paste the laptop description or specs from the seller, including the price in PKR.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <textarea
            className="w-full h-48 bg-black/20 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none placeholder-gray-600"
            placeholder="e.g. HP EliteBook 850 G8, Core i5 11th Gen, 16GB RAM, 512GB SSD. Price: 150000 PKR"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          ></textarea>

          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium hover:shadow-lg hover:shadow-brand-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
          >
            {isLoading ? 'Evaluating...' : 'Submit Deal'}
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
