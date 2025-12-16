import { useState } from 'react';
import { Search, Filter, Download, Upload, Plus, Mail, Phone, Building2, MapPin, Calendar, MoreVertical, Star, Tag, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  location: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  score: number;
  tags: string[];
  lastContact: string;
  starred: boolean;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@acmecorp.com',
    company: 'Acme Corporation',
    position: 'VP of Sales',
    location: 'San Francisco, CA',
    status: 'qualified',
    score: 85,
    tags: ['Enterprise', 'Hot Lead'],
    lastContact: '2 hours ago',
    starred: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@techstart.io',
    company: 'TechStart Inc',
    position: 'CTO',
    location: 'Austin, TX',
    status: 'contacted',
    score: 72,
    tags: ['Mid-Market', 'Tech'],
    lastContact: '1 day ago',
    starred: false
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@innovate.com',
    company: 'Innovate Solutions',
    position: 'Director of Operations',
    location: 'New York, NY',
    status: 'new',
    score: 68,
    tags: ['Enterprise', 'Finance'],
    lastContact: 'Never',
    starred: true
  },
  {
    id: '4',
    name: 'David Park',
    email: 'dpark@growthco.com',
    company: 'GrowthCo',
    position: 'Head of Marketing',
    location: 'Seattle, WA',
    status: 'contacted',
    score: 79,
    tags: ['SMB', 'Marketing'],
    lastContact: '3 days ago',
    starred: false
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'l.anderson@globalent.com',
    company: 'Global Enterprises',
    position: 'CEO',
    location: 'Boston, MA',
    status: 'qualified',
    score: 92,
    tags: ['Enterprise', 'Hot Lead', 'Executive'],
    lastContact: '5 hours ago',
    starred: true
  }
];

const statusColors = {
  new: { bg: '#3b82f6', text: 'New' },
  contacted: { bg: '#f59e0b', text: 'Contacted' },
  qualified: { bg: '#10b981', text: 'Qualified' },
  unqualified: { bg: '#64748b', text: 'Unqualified' }
};

export function Leads() {
  const [leads, setLeads] = useState(mockLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleSelectLead = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  };

  const handleStarLead = (id: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, starred: !lead.starred } : lead
    ));
  };

  const handleDeleteLeads = () => {
    toast.success('Leads Deleted', {
      description: `${selectedLeads.length} lead(s) deleted successfully`,
    });
    setLeads(prev => prev.filter(lead => !selectedLeads.includes(lead.id)));
    setSelectedLeads([]);
  };

  const handleImportLeads = () => {
    toast.success('Import Leads', {
      description: 'Opening import wizard...',
    });
  };

  const handleExportLeads = () => {
    toast.success('Export Started', {
      description: 'Downloading leads as CSV...',
    });
  };

  const handleAddLead = () => {
    toast.success('Add Lead', {
      description: 'Opening lead creation form...',
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E5E7EB] mb-2">Leads</h1>
        <p className="text-[#94a3b8]">Manage and track your sales leads</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0f172a] border border-[#334155] rounded-lg text-sm text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50 transition-all"
            />
          </div>

          {/* Filter by Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-[#0f172a] border border-[#334155] rounded-lg text-sm text-[#cbd5e1] font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50 transition-all"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="unqualified">Unqualified</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1e293b] text-[#cbd5e1] rounded-lg hover:bg-[#334155] hover:text-[#E5E7EB] border border-[#334155] font-medium transition-all">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>

        <div className="flex items-center gap-3">
          {selectedLeads.length > 0 && (
            <button 
              onClick={handleDeleteLeads}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#ef4444]/10 text-[#ef4444] rounded-lg hover:bg-[#ef4444]/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedLeads.length})
            </button>
          )}
          <button 
            onClick={handleExportLeads}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1e293b] text-[#E5E7EB] rounded-lg hover:bg-[#334155] transition-all"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={handleImportLeads}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1e293b] text-[#E5E7EB] rounded-lg hover:bg-[#334155] transition-all"
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button 
            onClick={handleAddLead}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563EB]/20"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Leads', value: leads.length, color: '#2563EB' },
          { label: 'New', value: leads.filter(l => l.status === 'new').length, color: '#3b82f6' },
          { label: 'Contacted', value: leads.filter(l => l.status === 'contacted').length, color: '#f59e0b' },
          { label: 'Qualified', value: leads.filter(l => l.status === 'qualified').length, color: '#10b981' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#020617] border border-[#1e293b] rounded-xl p-4">
            <div className="text-sm text-[#64748b] mb-1">{stat.label}</div>
            <div className="text-2xl text-[#E5E7EB]" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-[#020617] border border-[#1e293b] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f172a] border-b border-[#1e293b]">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === leads.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-[#1e293b] bg-[#020617] text-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#64748b] uppercase tracking-wider">Lead</th>
                <th className="px-4 py-3 text-left text-xs text-[#64748b] uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs text-[#64748b] uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs text-[#64748b] uppercase tracking-wider">Score</th>
                <th className="px-4 py-3 text-left text-xs text-[#64748b] uppercase tracking-wider">Tags</th>
                <th className="px-4 py-3 text-left text-xs text-[#64748b] uppercase tracking-wider">Last Contact</th>
                <th className="px-4 py-3 text-left text-xs text-[#64748b] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#0f172a] transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="w-4 h-4 rounded border-[#1e293b] bg-[#020617] text-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleStarLead(lead.id)}>
                        <Star className={`w-4 h-4 ${lead.starred ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#64748b]'}`} />
                      </button>
                      <div>
                        <div className="text-sm text-[#E5E7EB]">{lead.name}</div>
                        <div className="text-xs text-[#64748b] flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#E5E7EB]">{lead.company}</div>
                    <div className="text-xs text-[#64748b]">{lead.position}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: `${statusColors[lead.status].bg}20`,
                        color: statusColors[lead.status].bg
                      }}
                    >
                      {statusColors[lead.status].text}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#1e293b] rounded-full overflow-hidden max-w-[80px]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${lead.score}%`,
                            backgroundColor: lead.score >= 80 ? '#10b981' : lead.score >= 60 ? '#f59e0b' : '#64748b'
                          }}
                        />
                      </div>
                      <span className="text-sm text-[#E5E7EB] min-w-[2.5rem]">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#1e293b] text-[#94a3b8]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#64748b]">{lead.lastContact}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
