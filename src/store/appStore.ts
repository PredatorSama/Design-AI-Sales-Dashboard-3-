// Global App State Management using simple Context API + useState pattern
export interface Campaign {
  id: string;
  name: string;
  type: 'ai_powered' | 'standard';
  status: 'draft' | 'active' | 'paused' | 'completed';
  contacts: number;
  opens: number;
  clicks: number;
  replies: number;
  createdAt: string;
  tone?: string;
  goal?: string;
  industry?: string;
  cta?: string;
  templateId?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  timezone?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'interested' | 'qualified' | 'closed';
  source: 'import' | 'manual' | 'api';
}

export interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  createdAt: string;
}

export interface Sequence {
  id: string;
  name: string;
  campaignId: string;
  steps: SequenceStep[];
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
}

export interface SequenceStep {
  id: string;
  type: 'email' | 'wait' | 'condition';
  delay?: number; // in hours
  templateId?: string;
  condition?: string;
}

export interface Activity {
  id: string;
  type: 'campaign_created' | 'leads_imported' | 'sequence_launched' | 'email_sent' | 'reply_received';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface CampaignDraft {
  step: number;
  basics?: {
    name: string;
    type: 'ai_powered' | 'standard';
  };
  aiConfig?: {
    tone: string;
    goal: string;
    industry: string;
    cta: string;
  };
  contacts?: string[];
  templateId?: string;
  variables?: Record<string, string>;
  schedule?: {
    date: string;
    time: string;
    timezone: string;
  };
}

// Mock data
export const MOCK_TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Cold Outreach - Introduction',
    subject: 'Quick thought for {{FIRST_NAME}}',
    body: 'Hi {{FIRST_NAME}},\n\nI came across {{COMPANY}} and thought you might find value in what we do.\n\n{{CTA}}\n\nBest,\nSales Team',
    variables: ['FIRST_NAME', 'COMPANY', 'CTA'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Follow-up Email',
    subject: 'Following up - {{COMPANY}}',
    body: 'Hi {{FIRST_NAME}},\n\nJust wanted to follow up on my previous email. Did you get a chance to review?\n\n{{CTA}}\n\nThanks,\nSales Team',
    variables: ['FIRST_NAME', 'COMPANY', 'CTA'],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Value Proposition',
    subject: 'We helped {{COMPANY}} increase revenue by 40%',
    body: 'Hi {{FIRST_NAME}},\n\nWe recently helped a similar company at {{COMPANY}} achieve significant results.\n\nWould you like to learn more?\n\n{{CTA}}\n\nBest regards,\nSales Team',
    variables: ['FIRST_NAME', 'COMPANY', 'CTA'],
    createdAt: new Date().toISOString()
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'campaign_created',
    title: 'Q1 Sales Push Campaign Created',
    description: 'New campaign with 250 contacts',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    type: 'leads_imported',
    title: '50 Leads Imported',
    description: 'From Q1_prospects.csv',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    type: 'email_sent',
    title: '150 Emails Sent',
    description: 'From Q1 Sales Push campaign',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Sales Push',
    type: 'ai_powered',
    status: 'active',
    contacts: 250,
    opens: 87,
    clicks: 23,
    replies: 5,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    tone: 'professional',
    goal: 'Lead Generation',
    industry: 'SaaS'
  },
  {
    id: '2',
    name: 'Enterprise Outreach',
    type: 'standard',
    status: 'draft',
    contacts: 0,
    opens: 0,
    clicks: 0,
    replies: 0,
    createdAt: new Date().toISOString()
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@techcorp.com',
    company: 'TechCorp Inc',
    phone: '+1-555-0001',
    status: 'contacted',
    source: 'import'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@innovate.io',
    company: 'Innovate.io',
    phone: '+1-555-0002',
    status: 'interested',
    source: 'import'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@growthco.com',
    company: 'Growth Co',
    phone: '+1-555-0003',
    status: 'new',
    source: 'import'
  }
];
