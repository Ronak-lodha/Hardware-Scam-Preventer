import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEvaluate = async (text) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/evaluate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error((errorData && errorData.error) ? errorData.error : 'Network response was not ok');
      }
      const data = await response.json();
      setEvaluationResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-brand-dark text-brand-light">
      <Sidebar onEvaluate={handleEvaluate} isLoading={isLoading} />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Tech Scam Preventer</h1>
              <p className="text-gray-400">AI-driven laptop specification and price evaluator.</p>
            </div>
          </header>
          
          {error && (
            <div className="p-4 mb-6 rounded-lg bg-brand-danger/20 border border-brand-danger/50 text-brand-danger">
              Error: {error}
            </div>
          )}

          <Dashboard result={evaluationResult} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}

export default App;
