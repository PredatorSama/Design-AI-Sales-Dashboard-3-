import { useState } from 'react';
import { BookMarked, CheckCircle2, Lock, Zap, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Playbook {
  id: string;
  name: string;
  description: string;
  progress: number;
  steps: number;
  icon: string;
  color: string;
  locked: boolean;
}

export function Playbooks() {
  const [playbooks] = useState<Playbook[]>([
    {
      id: '1',
      name: 'Cold Email Playbook',
      description: 'Master the art of cold outreach with proven email sequences and templates',
      progress: 65,
      steps: 8,
      icon: '📧',
      color: 'from-[#3b82f6] to-[#2563eb]',
      locked: false
    },
    {
      id: '2',
      name: 'LinkedIn Outreach',
      description: 'Build genuine connections and convert prospects on LinkedIn',
      progress: 42,
      steps: 6,
      icon: '🔗',
      color: 'from-[#0a66c2] to-[#0855ac]',
      locked: false
    },
    {
      id: '3',
      name: 'Follow-Up Strategy',
      description: 'Develop effective follow-up sequences that increase response rates',
      progress: 28,
      steps: 5,
      icon: '↩️',
      color: 'from-[#10b981] to-[#059669]',
      locked: false
    },
    {
      id: '4',
      name: 'Account-Based Marketing',
      description: 'Implement ABM strategies for enterprise deals',
      progress: 0,
      steps: 10,
      icon: '🎯',
      color: 'from-[#f59e0b] to-[#d97706]',
      locked: true
    },
    {
      id: '5',
      name: 'Sales Qualification',
      description: 'Master BANT, MEDDIC, and other qualifying frameworks',
      progress: 0,
      steps: 7,
      icon: '✅',
      color: 'from-[#8b5cf6] to-[#7c3aed]',
      locked: true
    },
    {
      id: '6',
      name: 'Deal Closing Tactics',
      description: 'Advanced techniques to close deals and maximize deal value',
      progress: 0,
      steps: 9,
      icon: '🏆',
      color: 'from-[#ec4899] to-[#db2777]',
      locked: true
    }
  ]);

  const handlePlaybookClick = (playbook: Playbook) => {
    if (playbook.locked) {
      toast.error('This playbook is coming soon! Stay tuned for premium features.');
      return;
    }
    toast.success(`Opened "${playbook.name}" - ${playbook.progress}% complete`);
  };

  const totalProgress = playbooks.filter(p => !p.locked).reduce((sum: number, p: Playbook) => sum + p.progress, 0) / 
                       playbooks.filter(p => !p.locked).length;

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-8 animate-slideInDown">
        <h2 className="text-3xl font-bold text-[#E5E7EB] mb-2 flex items-center gap-3">
          <BookMarked className="w-8 h-8 text-[#2563EB]" />
          Playbooks
        </h2>
        <p className="text-[#94a3b8] font-medium">Step-by-step sales strategies to master every stage of the sales cycle</p>
      </div>

      {/* Overall Progress Card */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-[#334155] rounded-2xl p-6 mb-8 animate-slideInUp">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#94a3b8] mb-2">Overall Progress</p>
            <h3 className="text-4xl font-bold text-[#E5E7EB]">{Math.round(totalProgress)}%</h3>
            <p className="text-[#64748b] mt-2 text-sm">{playbooks.filter(p => !p.locked).filter(p => p.progress > 0).length} of {playbooks.filter(p => !p.locked).length} playbooks started</p>
          </div>
          <div className="w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#334155" strokeWidth="8" />
              <circle 
                cx="60" cy="60" r="50" 
                fill="none" 
                stroke="#2563EB" 
                strokeWidth="8"
                strokeDasharray={`${(totalProgress / 100) * 314} 314`}
                strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dasharray 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
              <text x="60" y="65" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#E5E7EB" className="pointer-events-none">
                {Math.round(totalProgress)}%
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Playbooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playbooks.map((playbook, idx) => (
          <button
            key={playbook.id}
            onClick={() => handlePlaybookClick(playbook)}
            disabled={playbook.locked}
            className={`group relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
              playbook.locked
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:shadow-2xl hover:shadow-[#2563EB]/20 cursor-pointer'
            }`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${playbook.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            
            {/* Card Content */}
            <div className="relative border border-[#334155] bg-[#0f172a]/80 backdrop-blur-sm p-6 h-full flex flex-col">
              {/* Lock Overlay */}
              {playbook.locked && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent flex items-center justify-center z-10">
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-[#64748b] mx-auto mb-2" />
                    <p className="text-[#94a3b8] text-sm font-semibold">Coming Soon</p>
                  </div>
                </div>
              )}

              {/* Icon & Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{playbook.icon}</div>
                {playbook.progress === 100 && !playbook.locked && (
                  <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-[#E5E7EB] mb-2 text-left line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                {playbook.name}
              </h3>
              <p className="text-[#94a3b8] text-sm mb-6 text-left line-clamp-2 flex-1">
                {playbook.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2 text-[#64748b]">
                  <Zap className="w-4 h-4 text-[#f59e0b]" />
                  <span>{playbook.steps} steps</span>
                </div>
                {playbook.progress > 0 && (
                  <div className="text-[#10b981] font-semibold">{playbook.progress}% done</div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-[#1e293b] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#2563EB] to-[#60a5fa] h-full rounded-full transition-all duration-500"
                    style={{ width: `${playbook.progress}%` }}
                  />
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-[#2563EB] font-semibold group-hover:gap-3 transition-all">
                <span>{playbook.progress === 100 ? 'Review' : playbook.progress > 0 ? 'Continue' : 'Start'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Feature Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 animate-slideInUp hover:shadow-elevation" style={{ animationDelay: '200ms' }}>
          <div className="text-3xl mb-3">📚</div>
          <h4 className="text-lg font-bold text-[#E5E7EB] mb-2">Structured Learning</h4>
          <p className="text-[#94a3b8] text-sm">Each playbook breaks down complex sales strategies into actionable steps</p>
        </div>
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 animate-slideInUp hover:shadow-elevation" style={{ animationDelay: '250ms' }}>
          <div className="text-3xl mb-3">📊</div>
          <h4 className="text-lg font-bold text-[#E5E7EB] mb-2">Track Progress</h4>
          <p className="text-[#94a3b8] text-sm">Monitor your completion status and identify which strategies work best for you</p>
        </div>
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 animate-slideInUp hover:shadow-elevation" style={{ animationDelay: '300ms' }}>
          <div className="text-3xl mb-3">🚀</div>
          <h4 className="text-lg font-bold text-[#E5E7EB] mb-2">Proven Results</h4>
          <p className="text-[#94a3b8] text-sm">Implement battle-tested sales techniques that have driven revenue growth</p>
        </div>
      </div>
    </div>
  );
}
