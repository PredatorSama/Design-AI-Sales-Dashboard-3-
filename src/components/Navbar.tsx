import { Search, Bell, Moon, Sun, Globe, ChevronDown, User, Plus, Upload, Zap } from 'lucide-react';
import { useState } from 'react';
import { t } from '../store/translations';
import { useApp } from '../store/AppContext';
import { toast } from 'sonner';

interface NavbarProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  language: string;
  setLanguage: (lang: string) => void;
  onLogout?: () => void;
  currentPage?: string;
  onNewCampaign?: () => void;
  onImportLeads?: () => void;
  onNavigate?: (page: string) => void;
}

export function Navbar({ theme, setTheme, language, setLanguage, onLogout, currentPage = 'Dashboard', onNewCampaign, onImportLeads, onNavigate }: NavbarProps) {
  const { campaigns, updateCampaign, addActivity } = useApp();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunchSequence = async () => {
    // Check if campaign exists
    const activeCampaigns = campaigns.filter(c => c.status !== 'active');
    
    if (activeCampaigns.length === 0) {
      toast.error('No campaigns available to launch. Create a new campaign first.');
      return;
    }

    setIsLaunching(true);
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Launch the first inactive campaign
      const campaignToLaunch = activeCampaigns[0];
      
      // Update campaign status to "Active"
      updateCampaign(campaignToLaunch.id, { status: 'active' });
      
      // Add activity entry
      addActivity({
        id: Date.now().toString(),
        type: 'campaign_launch',
        title: `Campaign "${campaignToLaunch.name}" launched`,
        description: `Launched to ${campaignToLaunch.contacts} contacts`,
        timestamp: new Date().toISOString()
      });
      
      // Show success toast
      toast.success(`🚀 Campaign "${campaignToLaunch.name}" launched successfully!`);
    } catch (error) {
      toast.error('Failed to launch campaign');
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <header className={`h-16 flex items-center justify-between px-6 sticky top-0 z-10 ${
      theme === 'dark'
        ? 'bg-[#020617] border-b border-[#1e293b]'
        : 'bg-white border-b border-[#e2e8f0]'
    }`}>
      {/* Left - Current Page Title */}
      <div className="flex items-center gap-4">
        <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'}`}>{currentPage}</h1>
      </div>
      
      {/* Right - Search, Notifications, Theme, Language, Profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-[#475569]' : 'text-[#94a3b8]'}`} />
          <input
            type="text"
            placeholder={t('action.search', language)}
            className={`w-64 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none transition-colors ${
              theme === 'dark'
                ? 'bg-[#0f172a] border border-[#334155] text-[#E5E7EB] placeholder:text-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
                : 'bg-[#f1f5f9] border border-[#cbd5e1] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50'
            }`}
          />
        </div>
        
        {/* Notifications */}
        <button className={`relative p-2 rounded-lg transition-all ${theme === 'dark' ? 'text-[#cbd5e1] hover:text-[#E5E7EB] hover:bg-[#1e293b]' : 'text-[#64748b] hover:text-[#1e293b] hover:bg-[#e2e8f0]'}`} aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full animate-pulse"></span>
        </button>
        
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-2 rounded-lg transition-all ${
            theme === 'dark'
              ? 'text-[#2563EB] bg-[#2563EB]/10'
              : 'text-[#2563EB] bg-[#2563EB]/10'
          }`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        
        {/* Action Buttons (Import, Launch, Campaign) */}
        <button
          onClick={onImportLeads}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all border ${
            theme === 'dark'
              ? 'bg-[#1e293b] text-[#cbd5e1] border-[#334155] hover:bg-[#334155] hover:text-[#E5E7EB] hover:border-[#475569]'
              : 'bg-[#f1f5f9] text-[#1e293b] border-[#cbd5e1] hover:bg-[#e2e8f0] hover:text-[#0f172a] hover:border-[#94a3b8]'
          }`}
          aria-label="Import Leads"
          title={t('action.import', language)}
        >
          <Upload className="w-4 h-4" />
          {t('action.import', language)}
        </button>
        
        <button
          onClick={handleLaunchSequence}
          disabled={isLaunching}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all border ${
            isLaunching
              ? theme === 'dark'
                ? 'bg-[#334155] text-[#cbd5e1] border-[#475569] opacity-70 cursor-not-allowed'
                : 'bg-[#cbd5e1] text-[#64748b] border-[#cbd5e1] opacity-70 cursor-not-allowed'
              : theme === 'dark'
              ? 'bg-[#1e293b] text-[#cbd5e1] border-[#334155] hover:bg-[#334155] hover:text-[#E5E7EB] hover:border-[#475569]'
              : 'bg-[#f1f5f9] text-[#1e293b] border-[#cbd5e1] hover:bg-[#e2e8f0] hover:text-[#0f172a] hover:border-[#94a3b8]'
          }`}
          aria-label="Launch Sequence"
          title={t('action.launch', language)}
        >
          <Zap className="w-4 h-4" />
          {isLaunching ? 'Launching...' : t('action.launch', language)}
        </button>
        
        <button
          onClick={onNewCampaign}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 transition-all shadow-lg shadow-[#2563EB]/30 hover:shadow-xl hover:shadow-[#2563EB]/40"
          aria-label="Create New Campaign"
          title={t('action.new_campaign', language)}
        >
          <Plus className="w-4 h-4" />
          {t('action.new_campaign', language)}
        </button>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium ${
              showLanguageMenu
                ? theme === 'dark'
                  ? 'bg-[#1e293b] text-[#E5E7EB]'
                  : 'bg-[#e2e8f0] text-[#0f172a]'
                : theme === 'dark'
                ? 'text-[#cbd5e1] hover:text-[#E5E7EB] hover:bg-[#1e293b]'
                : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0]'
            }`}
            aria-label="Select language"
            aria-expanded={showLanguageMenu}
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm">{language}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showLanguageMenu && (
            <div className={`absolute right-0 mt-2 w-32 rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-2 duration-200 border ${
              theme === 'dark'
                ? 'bg-[#0f172a] border-[#1e293b]'
                : 'bg-white border-[#e2e8f0]'
            }`}>
              {['EN', 'ES', 'FR', 'HI'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors font-medium ${
                    language === lang
                      ? theme === 'dark'
                        ? 'bg-[#2563EB]/20 text-[#60a5fa]'
                        : 'bg-[#2563EB]/10 text-[#2563EB]'
                      : theme === 'dark'
                      ? 'text-[#cbd5e1] hover:bg-[#1e293b] hover:text-[#E5E7EB]'
                      : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              showProfileMenu
                ? theme === 'dark'
                  ? 'bg-[#1e293b]'
                  : 'bg-[#e2e8f0]'
                : theme === 'dark'
                ? 'hover:bg-[#1e293b]'
                : 'hover:bg-[#e2e8f0]'
            }`}
            aria-label="User profile menu"
            aria-expanded={showProfileMenu}
          >
            <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'} transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-2 duration-200 border ${
              theme === 'dark'
                ? 'bg-[#0f172a] border-[#334155]'
                : 'bg-white border-[#e2e8f0]'
            }`}>
              <div className={`px-4 py-2 ${theme === 'dark' ? 'border-b border-[#334155]' : 'border-b border-[#e2e8f0]'}`}>
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'}`}>Sarah Anderson</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>sarah@company.com</div>
              </div>
              <button 
                onClick={() => {
                  onNavigate?.('Profile');
                  setShowProfileMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-[#cbd5e1] hover:bg-[#1e293b] hover:text-[#E5E7EB]'
                    : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                }`}
              >
                {t('nav.profile', language)}
              </button>
              <button 
                onClick={() => {
                  onNavigate?.('Settings');
                  setShowProfileMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-[#cbd5e1] hover:bg-[#1e293b] hover:text-[#E5E7EB]'
                    : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                }`}
              >
                {t('nav.settings', language)}
              </button>
              <button 
                onClick={() => {
                  onLogout?.();
                  setShowProfileMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-[#ef4444] hover:bg-[#ef4444]/10'
                    : 'text-[#dc2626] hover:bg-[#fecaca]'
                }`}
              >
                {t('general.logout', language)}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}