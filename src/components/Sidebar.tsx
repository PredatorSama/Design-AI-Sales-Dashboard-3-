import { Eye, Users, Target, Zap, Mail, Headphones, Brain, BookOpen, TrendingUp, Clock, Settings, User, Moon, Globe, Sun, BookMarked, Sparkles } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../store/AppContext';
import { t } from '../store/translations';

interface SidebarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Sidebar({ currentPage = 'Dashboard', onNavigate }: SidebarProps) {
  const { theme, setTheme, language } = useContext(AppContext);
  const navigationSections = [
    {
      title: 'Platform',
      items: [
        { icon: Eye, label: t('nav.dashboard', language), key: 'Dashboard', active: currentPage === 'Dashboard' },
        { icon: Users, label: t('nav.leads', language), key: 'Leads', active: currentPage === 'Leads' },
        { icon: Target, label: t('nav.campaigns', language), key: 'Campaigns', active: currentPage === 'Campaigns' },
        { icon: Zap, label: t('nav.sequences', language), key: 'Sequences', active: currentPage === 'Sequences' },
      ]
    },
    {
      title: 'Communication',
      items: [
        { icon: Mail, label: t('nav.inbox', language), key: 'Inbox', active: currentPage === 'Inbox' },
        { icon: Headphones, label: t('nav.calls', language), key: 'Calls & AI Assistant', active: currentPage === 'Calls & AI Assistant' },
      ]
    },
    {
      title: 'Intelligence',
      items: [
        { icon: Brain, label: t('nav.aiagent', language), key: 'AI', active: currentPage === 'AI' },
      ]
    },
    {
      title: 'Resources',
      items: [
        { icon: BookOpen, label: t('nav.templates', language), key: 'Templates', active: currentPage === 'Templates' },
        { icon: TrendingUp, label: t('nav.analytics', language), key: 'Analytics', active: currentPage === 'Analytics' },
        { icon: Clock, label: t('nav.calendar', language), key: 'Calendar', active: currentPage === 'Calendar' },
      ]
    },
    {
      title: 'Strategy',
      items: [
        { icon: BookMarked, label: t('nav.playbooks', language), key: 'Playbooks', active: currentPage === 'Playbooks' },
      ]
    }
  ];

  const handleNavigation = (pageKey: string) => {
    if (onNavigate) {
      onNavigate(pageKey);
    }
  };

  return (
    <aside className={`w-64 flex flex-col border-r ${
      theme === 'dark'
        ? 'bg-[#020617] border-[#1e293b]'
        : 'bg-[#f8fafc] border-[#e2e8f0]'
    }`}>
      {/* Logo */}
      <div className={`h-16 flex items-center gap-3 px-6 border-b ${
        theme === 'dark'
          ? 'border-[#1e293b]'
          : 'border-[#e2e8f0]'
      }`}>
        <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className={`text-sm ${theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'}`}>{t('general.demo', language)}</div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        {navigationSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <div className={`px-3 mb-2 text-xs uppercase tracking-wider font-medium ${
              theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#94a3b8]'
            }`}>
              {section.title}
            </div>
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={() => handleNavigation(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium ${
                    item.active
                      ? theme === 'dark'
                        ? 'bg-[#2563EB]/20 text-[#60a5fa] border-l-2 border-[#2563EB] pl-2.5'
                        : 'bg-[#2563EB]/10 text-[#2563EB] border-l-2 border-[#2563EB] pl-2.5'
                      : theme === 'dark'
                      ? 'text-[#cbd5e1] hover:bg-[#1e293b] hover:text-[#E5E7EB]'
                      : 'text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#1e293b]'
                  }`}
                  aria-current={item.active ? 'page' : undefined}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
      
      {/* Bottom User Section */}
      <div className={`border-t p-3 ${
        theme === 'dark'
          ? 'border-[#1e293b]'
          : 'border-[#e2e8f0]'
      }`}>
        <div className={`flex items-center gap-3 px-3 py-2 mb-2 rounded-lg transition-all cursor-pointer ${
          theme === 'dark'
            ? 'hover:bg-[#1e293b]'
            : 'hover:bg-[#e2e8f0]'
        }`}>
          <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center relative">
            <User className="w-4 h-4 text-white" />
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10b981] rounded-full border-2 ${
              theme === 'dark'
                ? 'border-[#020617]'
                : 'border-[#f8fafc]'
            }`}></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-sm truncate font-medium ${theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'}`}>John Smith</div>
            <div className={`text-xs ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>{t('general.admin', language)}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-2">
          <button 
            className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#E5E7EB]'
                : 'text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#1e293b]'
            }`}
            aria-label="Settings"
            onClick={() => handleNavigation('Settings')}
          >
            <Settings className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex-1 flex items-center justify-center p-2 rounded-lg text-[#2563EB] bg-[#2563EB]/10 hover:bg-[#2563EB]/20 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button 
            className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#E5E7EB]'
                : 'text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#1e293b]'
            }`}
            aria-label="Select language"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}