import { TrendingUp, UserPlus, Send, Phone, Clock, Play, Pause } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const recentActivities = [
  {
    icon: UserPlus,
    title: 'New lead added',
    description: 'Sarah Johnson from Acme Corp',
    time: '5m ago',
    color: '#10b981'
  },
  {
    icon: Send,
    title: 'Campaign launched',
    description: 'Q4 Enterprise Outreach started',
    time: '1h ago',
    color: '#2563EB'
  },
  {
    icon: Phone,
    title: 'Call analyzed',
    description: 'Demo call with TechStart Inc.',
    time: '2h ago',
    color: '#f59e0b'
  },
  {
    icon: TrendingUp,
    title: 'Sequence completed',
    description: 'Follow-up sequence finished',
    time: '3h ago',
    color: '#8b5cf6'
  }
];

const activeSequences = [
  {
    name: 'Q4 Enterprise Outreach',
    leads: 156,
    progress: 68,
    status: 'active'
  },
  {
    name: 'Follow-up Campaign',
    leads: 89,
    progress: 42,
    status: 'active'
  },
  {
    name: 'Cold Email Series A',
    leads: 234,
    progress: 91,
    status: 'paused'
  }
];

export function ActivityPanel() {
  const handleViewAll = () => {
    toast.info('View All Activities', {
      description: 'Opening full activity log...',
    });
  };

  const handleManage = () => {
    toast.info('Manage Sequences', {
      description: 'Opening sequence management...',
    });
  };

  const handleSequenceClick = (name: string) => {
    toast.info('Sequence Details', {
      description: `Opening details for "${name}"...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <div className="bg-[#020617] border border-[#334155] rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-[#E5E7EB] font-semibold">Recent Activity</h3>
          <button 
            onClick={handleViewAll}
            className="text-xs text-[#60a5fa] hover:text-[#3b82f6] hover:underline transition-colors font-medium"
          >
            View all
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#0f172a] transition-colors cursor-pointer">
              <div className="p-2 bg-[#1e293b] rounded-lg" style={{ backgroundColor: `${activity.color}20` }}>
                <activity.icon className="w-4 h-4" style={{ color: activity.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[#E5E7EB] mb-0.5 font-medium">{activity.title}</div>
                <div className="text-xs text-[#94a3b8]">{activity.description}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#cbd5e1]">
                <Clock className="w-3 h-3" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Active Sequences */}
      <div className="bg-[#020617] border border-[#334155] rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-[#E5E7EB] font-semibold">Active Sequences</h3>
          <button 
            onClick={handleManage}
            className="text-xs text-[#60a5fa] hover:text-[#3b82f6] hover:underline transition-colors font-medium"
          >
            Manage
          </button>
        </div>
        
        <div className="space-y-4">
          {activeSequences.map((sequence, idx) => (
            <div 
              key={idx} 
              onClick={() => handleSequenceClick(sequence.name)}
              className="p-3 bg-[#0f172a] border border-[#334155] rounded-lg hover:border-[#475569] hover:shadow-lg hover:shadow-[#2563EB]/10 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#E5E7EB] mb-1 font-medium truncate group-hover:text-[#60a5fa] transition-colors">{sequence.name}</div>
                  <div className="text-xs text-[#cbd5e1]">{sequence.leads} leads enrolled</div>
                </div>
                <div className="ml-2">
                  {sequence.status === 'active' ? (
                    <div className="p-1.5 bg-[#10b981]/10 rounded border border-[#10b981]/20">
                      <Play className="w-3 h-3 text-[#10b981]" />
                    </div>
                  ) : (
                    <div className="p-1.5 bg-[#94a3b8]/10 rounded border border-[#94a3b8]/20">
                      <Pause className="w-3 h-3 text-[#cbd5e1]" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full transition-all"
                    style={{ width: `${sequence.progress}%` }}
                  />
                </div>
                <span className="text-xs text-[#cbd5e1] font-medium min-w-[3ch]">{sequence.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}