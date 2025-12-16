import { useState, useContext } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { AppContext } from '../store/AppContext';

interface AdvancedSearchProps {
  theme: 'dark' | 'light';
  isOpen: boolean;
  onClose: () => void;
}

export function AdvancedSearch({ theme, isOpen, onClose }: AdvancedSearchProps) {
  const [searchLead, setSearchLead] = useState('');
  const [searchCampaign, setSearchCampaign] = useState('');
  const [searchMessages, setSearchMessages] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleReset = () => {
    setSearchLead('');
    setSearchCampaign('');
    setSearchMessages('');
    setDateFrom('');
    setDateTo('');
  };

  const handleSearch = () => {
    // Mock search implementation
    console.log('Advanced search:', {
      lead: searchLead,
      campaign: searchCampaign,
      messages: searchMessages,
      dateRange: { from: dateFrom, to: dateTo }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`fixed top-20 right-6 w-96 rounded-lg shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 border ${
        theme === 'dark'
          ? 'bg-[#0f172a] border-[#334155]'
          : 'bg-white border-[#e2e8f0]'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          theme === 'dark'
            ? 'border-[#334155]'
            : 'border-[#e2e8f0]'
        }`}>
          <div className="flex items-center gap-2">
            <Filter className={`w-5 h-5 ${theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#2563EB]'}`} />
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'}`}>
              Advanced Search
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded transition-all ${
              theme === 'dark'
                ? 'text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#E5E7EB]'
                : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1e293b]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4 max-h-[500px] overflow-y-auto">
          {/* Search by Lead */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#475569]'
            }`}>
              Search by Lead
            </label>
            <input
              type="text"
              placeholder="Lead name..."
              value={searchLead}
              onChange={(e) => setSearchLead(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-colors ${
                theme === 'dark'
                  ? 'bg-[#1e293b] border border-[#334155] text-[#E5E7EB] placeholder:text-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
                  : 'bg-[#f1f5f9] border border-[#cbd5e1] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
              }`}
            />
          </div>

          {/* Search by Campaign */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#475569]'
            }`}>
              Search by Campaign
            </label>
            <input
              type="text"
              placeholder="Campaign name..."
              value={searchCampaign}
              onChange={(e) => setSearchCampaign(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-colors ${
                theme === 'dark'
                  ? 'bg-[#1e293b] border border-[#334155] text-[#E5E7EB] placeholder:text-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
                  : 'bg-[#f1f5f9] border border-[#cbd5e1] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
              }`}
            />
          </div>

          {/* Search by Messages */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#475569]'
            }`}>
              Search by Messages
            </label>
            <input
              type="text"
              placeholder="Message keywords..."
              value={searchMessages}
              onChange={(e) => setSearchMessages(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-colors ${
                theme === 'dark'
                  ? 'bg-[#1e293b] border border-[#334155] text-[#E5E7EB] placeholder:text-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
                  : 'bg-[#f1f5f9] border border-[#cbd5e1] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
              }`}
            />
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#475569]'
            }`}>
              Date Range
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-[#1e293b] border border-[#334155] text-[#E5E7EB] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
                    : 'bg-[#f1f5f9] border border-[#cbd5e1] text-[#1e293b] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
                }`}
              />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-[#1e293b] border border-[#334155] text-[#E5E7EB] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
                    : 'bg-[#f1f5f9] border border-[#cbd5e1] text-[#1e293b] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex gap-3 px-6 py-4 border-t ${
          theme === 'dark'
            ? 'border-[#334155]'
            : 'border-[#e2e8f0]'
        }`}>
          <button
            onClick={handleReset}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              theme === 'dark'
                ? 'bg-[#1e293b] text-[#cbd5e1] border-[#334155] hover:bg-[#334155] hover:text-[#E5E7EB]'
                : 'bg-[#f1f5f9] text-[#475569] border-[#cbd5e1] hover:bg-[#e2e8f0] hover:text-[#1e293b]'
            }`}
          >
            Reset
          </button>
          <button
            onClick={handleSearch}
            className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 transition-all"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
