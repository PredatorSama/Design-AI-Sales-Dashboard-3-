import { useState } from 'react';
import { Plus, Search, Play, Pause, Trash2, BarChart3, Users, Mail, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../../store/AppContext';

interface CampaignsProps {
  onNewCampaign?: () => void;
}

export function Campaigns({ onNewCampaign }: CampaignsProps) {
  const { campaigns, updateCampaign, deleteCampaign } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      const newStatus = campaign.status === 'active' ? 'paused' : 'active';
      updateCampaign(id, { status: newStatus });
      toast.success(`Campaign ${newStatus}`);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      deleteCampaign(id);
      toast.success('Campaign deleted');
    }
  };

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#E5E7EB] mb-1 font-semibold">Campaigns</h2>
          <p className="text-[#94a3b8] font-medium">Manage and monitor your outreach campaigns</p>
        </div>
        <button
          onClick={onNewCampaign}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563EB]/20"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
        <input
          type="text"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50 transition-all"
        />
      </div>

      {/* Campaigns List */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12 bg-[#0f172a] border border-[#334155] rounded-lg">
          <p className="text-[#94a3b8] mb-4 font-medium">No campaigns found</p>
          <button
            onClick={onNewCampaign}
            className="text-[#60a5fa] hover:text-[#93c5fd] font-medium"
          >
            Create your first campaign
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCampaigns.map(campaign => (
            <div
              key={campaign.id}
              className="bg-[#0f172a] border border-[#334155] rounded-lg p-6 hover:border-[#475569] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E7EB] mb-1">{campaign.name}</h3>
                  <p className="text-sm text-[#64748b]">{campaign.type} • {campaign.createdAt}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  campaign.status === 'active' 
                    ? 'bg-green-500/20 text-green-400'
                    : campaign.status === 'paused'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {campaign.status}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="bg-[#1e293b] rounded p-3">
                  <div className="text-[#64748b] text-xs mb-1">Contacts</div>
                  <div className="text-[#E5E7EB] font-bold text-lg">{campaign.contacts}</div>
                </div>
                <div className="bg-[#1e293b] rounded p-3">
                  <div className="text-[#64748b] text-xs mb-1">Opens</div>
                  <div className="text-[#E5E7EB] font-bold text-lg">{campaign.opens}</div>
                </div>
                <div className="bg-[#1e293b] rounded p-3">
                  <div className="text-[#64748b] text-xs mb-1">Clicks</div>
                  <div className="text-[#E5E7EB] font-bold text-lg">{campaign.clicks}</div>
                </div>
                <div className="bg-[#1e293b] rounded p-3">
                  <div className="text-[#64748b] text-xs mb-1">Replies</div>
                  <div className="text-[#E5E7EB] font-bold text-lg">{campaign.replies}</div>
                </div>
                <div className="bg-[#1e293b] rounded p-3">
                  <div className="text-[#64748b] text-xs mb-1">Rate</div>
                  <div className="text-[#E5E7EB] font-bold text-lg">{campaign.contacts > 0 ? ((campaign.replies / campaign.contacts) * 100).toFixed(1) : 0}%</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(campaign.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-semibold ${
                    campaign.status === 'active'
                      ? 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30'
                      : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                  }`}
                >
                  {campaign.status === 'active' ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Resume
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(campaign.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all text-sm font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Old mockData (archived)

