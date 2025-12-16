import { createContext, useContext, useState, ReactNode } from 'react';
import {
  Campaign,
  Lead,
  Template,
  Sequence,
  Activity,
  CampaignDraft,
  MOCK_CAMPAIGNS,
  MOCK_LEADS,
  MOCK_TEMPLATES,
  MOCK_ACTIVITIES
} from './appStore';

interface AppContextType {
  // Campaigns
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  
  // Leads
  leads: Lead[];
  addLeads: (leads: Lead[]) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  
  // Templates
  templates: Template[];
  addTemplate: (template: Template) => void;
  
  // Sequences
  sequences: Sequence[];
  addSequence: (sequence: Sequence) => void;
  
  // Activities
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  
  // Campaign Draft
  campaignDraft: CampaignDraft;
  updateCampaignDraft: (updates: Partial<CampaignDraft>) => void;
  resetCampaignDraft: () => void;
  
  // UI State
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  language: string;
  setLanguage: (lang: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export { AppContext };

const initialDraft: CampaignDraft = {
  step: 1,
  basics: { name: '', type: 'standard' },
  aiConfig: { tone: '', goal: '', industry: '', cta: '' },
  contacts: [],
  variables: {}
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [campaignDraft, setCampaignDraft] = useState<CampaignDraft>(initialDraft);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('EN');
  const [loading, setLoading] = useState(false);

  const addCampaign = (campaign: Campaign) => {
    setCampaigns([...campaigns, campaign]);
    addActivity({
      id: Date.now().toString(),
      type: 'campaign_created',
      title: `Campaign "${campaign.name}" Created`,
      description: `Campaign with ${campaign.contacts} contacts`,
      timestamp: new Date().toISOString()
    });
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const addLeads = (newLeads: Lead[]) => {
    setLeads([...leads, ...newLeads]);
    addActivity({
      id: Date.now().toString(),
      type: 'leads_imported',
      title: `${newLeads.length} Leads Imported`,
      description: `Successfully imported from CSV`,
      timestamp: new Date().toISOString()
    });
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(leads.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const addTemplate = (template: Template) => {
    setTemplates([...templates, template]);
  };

  const addSequence = (sequence: Sequence) => {
    setSequences([...sequences, sequence]);
    addActivity({
      id: Date.now().toString(),
      type: 'sequence_launched',
      title: `Sequence "${sequence.name}" Launched`,
      description: `Campaign: ${sequence.campaignId}`,
      timestamp: new Date().toISOString()
    });
  };

  const addActivity = (activity: Activity) => {
    setActivities([activity, ...activities]);
  };

  const updateCampaignDraft = (updates: Partial<CampaignDraft>) => {
    setCampaignDraft({ ...campaignDraft, ...updates });
  };

  const resetCampaignDraft = () => {
    setCampaignDraft(initialDraft);
  };

  return (
    <AppContext.Provider
      value={{
        campaigns,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        leads,
        addLeads,
        updateLead,
        deleteLead,
        templates,
        addTemplate,
        sequences,
        addSequence,
        activities,
        addActivity,
        campaignDraft,
        updateCampaignDraft,
        resetCampaignDraft,
        theme,
        setTheme,
        language,
        setLanguage,
        loading,
        setLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
