import { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ChatWidget } from './components/ChatWidget';
import { Login } from './components/Login';
import { Leads } from './components/pages/Leads';
import { Campaigns } from './components/pages/Campaigns';
import { Sequences } from './components/pages/Sequences';
import { Inbox } from './components/pages/Inbox';
import { Analytics } from './components/pages/Analytics';
import { Calendar } from './components/pages/Calendar';
import { Settings } from './components/pages/Settings';
import { Profile } from './components/pages/Profile';
import { Playbooks } from './components/pages/Playbooks';
import { AISalesAgent } from './components/pages/AISalesAgent';
import { VoiceAgent } from './components/pages/VoiceAgent';
import { Blueprints } from './components/pages/Blueprints';
import { PlaceholderPage } from './components/pages/PlaceholderPage';
import { Headphones, Brain, BookOpen, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import { AppProvider, useApp } from './store/AppContext';
import { CampaignWizard } from './components/CampaignWizard';
import { ImportLeadsModal } from './components/ImportLeadsModal';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [showCampaignWizard, setShowCampaignWizard] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const calendarAddEventRef = useRef<() => void>(() => {});

  const { theme, setTheme, language, setLanguage } = useApp();

  // Handle successful login
  const handleLogin = () => {
    try {
      setIsLoading(true);
      setIsAuthenticated(true);
      setCurrentPage('Dashboard');
      console.log('✅ User logged in successfully');
    } catch (error) {
      console.error('❌ Login error:', error);
      toast.error('Login failed. Please try again.');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    try {
      setIsAuthenticated(false);
      setCurrentPage('Dashboard');
      console.log('✅ User logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Show loading state during auth transitions
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-screen ${
        theme === 'dark' 
          ? 'bg-[#020617]' 
          : 'bg-[#f8fafc]'
      }`}>
        <div className="animate-spin">
          <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  // Render current page with error handling
  const renderPage = () => {
    try {
      switch (currentPage) {
        case 'Dashboard':
          return (
            <Dashboard 
              onNewCampaign={() => setShowCampaignWizard(true)}
              onImportLeads={() => setShowImportModal(true)}
            />
          );
        case 'Leads':
          return (
            <Leads 
              onImportLeads={() => setShowImportModal(true)}
            />
          );
        case 'Campaigns':
          return (
            <Campaigns 
              onNewCampaign={() => setShowCampaignWizard(true)}
            />
          );
        case 'Sequences':
          return <Sequences />;
        case 'Inbox':
          return <Inbox />;
        case 'Calls & AI Assistant':
          return <VoiceAgent />;
        case 'AI':
          return <AISalesAgent />;
        case 'Templates':
          return <Blueprints />;
        case 'Analytics':
          return <Analytics />;
        case 'Calendar':
          return <Calendar onAddEventFromNavbar={(ref) => { calendarAddEventRef.current = ref; }} />;
        case 'Settings':
          return <Settings />;
        case 'Profile':
          return <Profile />;
        case 'Playbooks':
          return <Playbooks />;
        default:
          console.warn(`⚠️ Unknown page: ${currentPage}, redirecting to Dashboard`);
          setCurrentPage('Dashboard');
          return (
            <Dashboard 
              onNewCampaign={() => setShowCampaignWizard(true)}
              onImportLeads={() => setShowImportModal(true)}
            />
          );
      }
    } catch (error) {
      console.error('❌ Error rendering page:', error);
      return (
        <div className="p-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500">
            <h3 className="font-semibold mb-2">Error Loading Page</h3>
            <p className="text-sm">{String(error)}</p>
          </div>
        </div>
      );
    }
  };

  // Show authenticated dashboard
  return (
    <div className={`flex h-screen overflow-hidden ${
      theme === 'dark' 
        ? 'bg-[#020617] text-[#E5E7EB]' 
        : 'bg-[#f8fafc] text-[#1e293b]'
    }`}>
      <Toaster theme={theme} />
      
      {/* Fixed Left Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Top Navbar */}
        <Navbar 
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          onLogout={handleLogout}
          currentPage={currentPage}
          onNewCampaign={() => setShowCampaignWizard(true)}
          onImportLeads={() => setShowImportModal(true)}
          onAddEvent={() => calendarAddEventRef.current()}
          onNavigate={setCurrentPage}
        />
        
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
      
      {/* Campaign Wizard Modal */}
      {showCampaignWizard && (
        <CampaignWizard 
          onClose={() => setShowCampaignWizard(false)}
        />
      )}

      {/* Import Leads Modal */}
      {showImportModal && (
        <ImportLeadsModal 
          onClose={() => setShowImportModal(false)}
        />
      )}
      
      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}