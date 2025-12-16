import { useState } from 'react';
import { Plus, Search, Play, Pause, Edit, Copy, Trash2, Mail, Clock, Users, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Sequence {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  steps: number;
  enrolled: number;
  completed: number;
  avgResponseTime: string;
  conversionRate: number;
}

const mockSequences: Sequence[] = [
  {
    id: '1',
    name: 'Cold Outreach - Enterprise',
    status: 'active',
    steps: 5,
    enrolled: 156,
    completed: 98,
    avgResponseTime: '2.3 days',
    conversionRate: 24
  },
  {
    id: '2',
    name: 'Follow-up After Demo',
    status: 'active',
    steps: 3,
    enrolled: 89,
    completed: 67,
    avgResponseTime: '1.5 days',
    conversionRate: 45
  },
  {
    id: '3',
    name: 'Re-engagement Campaign',
    status: 'paused',
    steps: 4,
    enrolled: 234,
    completed: 189,
    avgResponseTime: '3.1 days',
    conversionRate: 18
  },
  {
    id: '4',
    name: 'Product Launch Series',
    status: 'draft',
    steps: 6,
    enrolled: 0,
    completed: 0,
    avgResponseTime: '-',
    conversionRate: 0
  }
];

const statusConfig = {
  active: { color: '#10b981', label: 'Active' },
  paused: { color: '#f59e0b', label: 'Paused' },
  draft: { color: '#64748b', label: 'Draft' }
};

export function Sequences() {
  const [sequences, setSequences] = useState(mockSequences);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewSequence = () => {
    toast.success('New Sequence', {
      description: 'Opening sequence builder...',
    });
  };

  const handlePlayPause = (id: string, currentStatus: string) => {
    setSequences(prev => prev.map(seq => 
      seq.id === id 
        ? { ...seq, status: currentStatus === 'active' ? 'paused' as const : 'active' as const }
        : seq
    ));
    toast.success(currentStatus === 'active' ? 'Sequence Paused' : 'Sequence Activated');
  };

  const handleEdit = (id: string, name: string) => {
    toast.info('Edit Sequence', {
      description: `Opening editor for "${name}"...`,
    });
  };

  const handleDuplicate = (id: string) => {
    toast.success('Sequence Duplicated');
  };

  const handleDelete = (id: string) => {
    setSequences(prev => prev.filter(s => s.id !== id));
    toast.success('Sequence Deleted');
  };

  const filteredSequences = sequences.filter(seq =>
    seq.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E5E7EB] mb-2">Sequences</h1>
        <p className="text-[#94a3b8]">Automated email sequences for lead nurturing</p>
      </div>

      {/* Top Actions */}
      <div className="mb-6 flex items-center justify-end gap-4">
        <button 
          onClick={handleNewSequence}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563EB]/40 font-medium focus:ring-2 focus:ring-[#2563EB]/50"
        >
          <Plus className="w-4 h-4" />
          New Sequence
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Sequences', value: sequences.length, icon: Zap, color: '#2563EB' },
          { label: 'Active', value: sequences.filter(s => s.status === 'active').length, icon: Play, color: '#10b981' },
          { label: 'Total Enrolled', value: sequences.reduce((acc, s) => acc + s.enrolled, 0), icon: Users, color: '#8b5cf6' },
          { label: 'Avg Conversion', value: `${Math.round(sequences.reduce((acc, s) => acc + s.conversionRate, 0) / sequences.length)}%`, icon: Mail, color: '#f59e0b' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#020617] border border-[#334155] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              <div className="text-xs text-[#94a3b8] font-medium">{stat.label}</div>
            </div>
            <div className="text-2xl text-[#E5E7EB] font-semibold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
          <input
            type="text"
            placeholder="Search sequences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0f172a] border border-[#334155] rounded-lg text-sm text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50 transition-all"
          />
        </div>
      </div>

      {/* Sequences List */}
      <div className="space-y-4">
        {filteredSequences.map((sequence) => (
          <div
            key={sequence.id}
            className="bg-[#020617] border border-[#1e293b] rounded-xl p-6 hover:border-[#2563EB] hover:shadow-lg hover:shadow-[#2563EB]/10 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg text-[#E5E7EB]">{sequence.name}</h3>
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: `${statusConfig[sequence.status].color}20`,
                      color: statusConfig[sequence.status].color
                    }}
                  >
                    {statusConfig[sequence.status].label}
                  </span>
                </div>
                <div className="text-sm text-[#64748b]">{sequence.steps} steps • {sequence.enrolled} leads enrolled</div>
              </div>
              <div className="flex items-center gap-2">
                {sequence.status !== 'draft' && (
                  <button 
                    onClick={() => handlePlayPause(sequence.id, sequence.status)}
                    className="p-2 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all"
                  >
                    {sequence.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                )}
                <button 
                  onClick={() => handleEdit(sequence.id, sequence.name)}
                  className="p-2 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDuplicate(sequence.id)}
                  className="p-2 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(sequence.id)}
                  className="p-2 text-[#64748b] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sequence Stats */}
            <div className="grid grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#1e293b] rounded-lg">
                  <Users className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <div className="text-xs text-[#64748b]">Completed</div>
                  <div className="text-lg text-[#E5E7EB]">{sequence.completed}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#1e293b] rounded-lg">
                  <Clock className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <div className="text-xs text-[#64748b]">Avg Response Time</div>
                  <div className="text-lg text-[#E5E7EB]">{sequence.avgResponseTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#1e293b] rounded-lg">
                  <Mail className="w-5 h-5 text-[#10b981]" />
                </div>
                <div>
                  <div className="text-xs text-[#64748b]">Conversion Rate</div>
                  <div className="text-lg text-[#E5E7EB]">{sequence.conversionRate}%</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-xs text-[#64748b] mb-2">Progress</div>
                  <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB] rounded-full transition-all"
                      style={{ width: `${sequence.enrolled > 0 ? (sequence.completed / sequence.enrolled) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sequence Steps Preview */}
            <div className="mt-4 pt-4 border-t border-[#1e293b]">
              <div className="flex items-center gap-2">
                {Array.from({ length: sequence.steps }).map((_, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#2563EB]/20 border-2 border-[#2563EB] flex items-center justify-center">
                      <span className="text-xs text-[#2563EB]">{idx + 1}</span>
                    </div>
                    {idx < sequence.steps - 1 && (
                      <div className="w-12 h-0.5 bg-[#1e293b]"></div>
                    )}
                  </div>
                ))}
                <div className="ml-4 text-xs text-[#64748b]">{sequence.steps} email steps</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
