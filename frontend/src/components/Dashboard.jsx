import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Green: { icon: CheckCircle, color: 'text-brand-success', bg: 'bg-brand-success/10 border-brand-success/30', label: 'Fair Deal' },
    Orange: { icon: AlertTriangle, color: 'text-brand-warning', bg: 'bg-brand-warning/10 border-brand-warning/30', label: 'Overpriced/Suspicious' },
    Red: { icon: ShieldAlert, color: 'text-brand-danger', bg: 'bg-brand-danger/10 border-brand-danger/30', label: 'Critical Mismatch/Scam' },
  };

  const config = statusConfig[status] || { icon: AlertCircle, color: 'text-gray-400', bg: 'bg-gray-800 border-gray-700', label: 'Unknown' };
  const Icon = config.icon;

  return (
    <div className={`flex items-center space-x-3 px-6 py-4 rounded-2xl border ${config.bg}`}>
      <Icon className={`w-8 h-8 ${config.color}`} />
      <div>
        <p className="text-sm text-gray-400">Evaluation Status</p>
        <p className={`text-xl font-bold tracking-wide ${config.color}`}>{config.label}</p>
      </div>
    </div>
  );
};

const Dashboard = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 animate-pulse">Analyzing specifications and fetching market data...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-panel p-12 text-center flex flex-col items-center justify-center h-96">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <ShieldAlert className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-2xl font-medium mb-2 text-gray-300">No Data Yet</h3>
        <p className="text-gray-500 max-w-md">
          Enter the laptop details in the sidebar to run an AI-powered scam check and market price evaluation.
        </p>
      </div>
    );
  }

  const { parsed_specs, scam_status, official_specs_summary, fair_market_price_range, final_verdict } = result;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <StatusBadge status={scam_status} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Claims */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-300 border-b border-white/10 pb-2">User Claimed Specs</h3>
          <ul className="space-y-3">
            <li className="flex justify-between"><span className="text-gray-500">Brand</span> <span className="font-medium">{parsed_specs?.brand || 'N/A'}</span></li>
            <li className="flex justify-between"><span className="text-gray-500">Model</span> <span className="font-medium">{parsed_specs?.model || 'N/A'}</span></li>
            <li className="flex justify-between"><span className="text-gray-500">Processor</span> <span className="font-medium">{parsed_specs?.processor || 'N/A'}</span></li>
            <li className="flex justify-between"><span className="text-gray-500">RAM</span> <span className="font-medium">{parsed_specs?.ram || 'N/A'}</span></li>
            <li className="flex justify-between"><span className="text-gray-500">Storage</span> <span className="font-medium">{parsed_specs?.storage || 'N/A'}</span></li>
            <li className="flex justify-between mt-4 pt-4 border-t border-white/5">
              <span className="text-gray-400">Offered Price</span> 
              <span className="font-bold text-brand-primary">{parsed_specs?.user_price_pkr?.toLocaleString()} PKR</span>
            </li>
          </ul>
        </div>

        {/* Official Analysis */}
        <div className="glass-panel p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-300 border-b border-white/10 pb-2">Official Specs Verification</h3>
          <p className="text-sm text-gray-400 leading-relaxed flex-1">
            {official_specs_summary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price Justification */}
        <div className="glass-panel p-6 md:col-span-1 bg-gradient-to-b from-white/5 to-transparent">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Fair Market Price</h3>
          <p className="text-2xl font-bold gradient-text">{fair_market_price_range}</p>
        </div>

        {/* Final Verdict */}
        <div className="glass-panel p-6 md:col-span-2">
          <h3 className="text-sm font-medium text-gray-400 mb-2">AI Final Verdict</h3>
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
            {final_verdict}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
