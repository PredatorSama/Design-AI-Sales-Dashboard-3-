import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../store/AppContext';

interface StepProps {
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function BasicsStep({ onNext, onBack, isFirst }: StepProps) {
  const { campaignDraft, updateCampaignDraft } = useApp();
  
  const handleNext = () => {
    if (!campaignDraft.basics?.name.trim()) {
      toast.error('Please enter a campaign name');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Campaign Name *</label>
        <input
          type="text"
          value={campaignDraft.basics?.name || ''}
          onChange={(e) => updateCampaignDraft({
            basics: { ...campaignDraft.basics, name: e.target.value }
          })}
          placeholder="e.g., Q1 2025 Sales Push"
          className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-4 py-2 text-[#E5E7EB] placeholder:text-[#475569] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#E5E7EB] mb-4">Campaign Type *</label>
        <div className="flex gap-4 items-center justify-between">
          {[
            { value: 'ai_powered', label: '🤖 AI Powered', desc: 'Auto-personalized with AI' },
            { value: 'standard', label: '📧 Standard', desc: 'Manual template-based' }
          ].map(type => (
            <button
              key={type.value}
              onClick={() => updateCampaignDraft({
                basics: { ...campaignDraft.basics, type: type.value as any }
              })}
              className={`flex-1 p-5 rounded-lg border-2 transition-all text-left cursor-pointer ${
                campaignDraft.basics?.type === type.value
                  ? 'border-[#2563EB] bg-[#2563EB]/15 shadow-lg shadow-[#2563EB]/20'
                  : 'border-[#334155] bg-[#1e293b] hover:border-[#475569] hover:bg-[#1a2332]'
              }`}
            >
              <p className={`font-semibold mb-1 ${
                campaignDraft.basics?.type === type.value
                  ? 'text-[#2563EB]'
                  : 'text-[#E5E7EB]'
              }`}>{type.label}</p>
              <p className="text-sm text-[#64748b]">{type.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-between pt-6">
        <button
          onClick={() => onNext()}
          className="flex items-center gap-2 px-6 py-2 text-[#94a3b8] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all text-sm"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function AIConfigStep({ onNext, onBack }: StepProps) {
  const { campaignDraft, updateCampaignDraft } = useApp();

  const handleNext = () => {
    if (!campaignDraft.aiConfig?.tone || !campaignDraft.aiConfig?.goal) {
      toast.error('Please fill all AI configuration fields');
      return;
    }
    onNext();
  };

  const handleSkip = () => {
    // Set sensible defaults when skipping
    updateCampaignDraft({
      aiConfig: {
        tone: campaignDraft.aiConfig?.tone || 'professional',
        goal: campaignDraft.aiConfig?.goal || 'lead_gen',
        industry: campaignDraft.aiConfig?.industry || 'saas',
        cta: campaignDraft.aiConfig?.cta || 'Let\'s connect'
      }
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Tone *</label>
        <select
          value={campaignDraft.aiConfig?.tone || ''}
          onChange={(e) => updateCampaignDraft({
            aiConfig: { ...campaignDraft.aiConfig, tone: e.target.value }
          })}
          className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-4 py-2 text-[#E5E7EB] focus:border-[#2563EB] focus:outline-none"
        >
          <option value="">Select tone...</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual & Friendly</option>
          <option value="urgent">Urgent & Direct</option>
          <option value="consultative">Consultative</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Goal *</label>
        <select
          value={campaignDraft.aiConfig?.goal || ''}
          onChange={(e) => updateCampaignDraft({
            aiConfig: { ...campaignDraft.aiConfig, goal: e.target.value }
          })}
          className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-4 py-2 text-[#E5E7EB] focus:border-[#2563EB] focus:outline-none"
        >
          <option value="">Select goal...</option>
          <option value="lead_gen">Lead Generation</option>
          <option value="demo_booking">Demo Booking</option>
          <option value="engagement">Engagement</option>
          <option value="follow_up">Follow-up</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Industry</label>
        <select
          value={campaignDraft.aiConfig?.industry || ''}
          onChange={(e) => updateCampaignDraft({
            aiConfig: { ...campaignDraft.aiConfig, industry: e.target.value }
          })}
          className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-4 py-2 text-[#E5E7EB] focus:border-[#2563EB] focus:outline-none"
        >
          <option value="">Select industry...</option>
          <option value="saas">SaaS</option>
          <option value="tech">Tech</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
          <option value="retail">Retail</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Call-To-Action</label>
        <input
          type="text"
          value={campaignDraft.aiConfig?.cta || ''}
          onChange={(e) => updateCampaignDraft({
            aiConfig: { ...campaignDraft.aiConfig, cta: e.target.value }
          })}
          placeholder="e.g., Let's schedule a 15-min call"
          className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-4 py-2 text-[#E5E7EB] placeholder:text-[#475569] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50"
        />
      </div>

      <div className="flex gap-3 justify-between pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2 bg-[#1e293b] text-[#E5E7EB] rounded-lg hover:bg-[#334155] transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-6 py-2 text-[#94a3b8] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all text-sm"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ContactsStep({ onNext, onBack }: StepProps) {
  const { leads, campaignDraft, updateCampaignDraft } = useApp();
  const [selectedLeads, setSelectedLeads] = useState<string[]>(campaignDraft.contacts || []);

  const handleNext = () => {
    if (selectedLeads.length === 0) {
      toast.error('Please select at least one contact');
      return;
    }
    updateCampaignDraft({ contacts: selectedLeads });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e293b] border border-[#334155] rounded-lg p-4">
        <p className="text-sm font-semibold text-[#E5E7EB]">
          Selected: {selectedLeads.length} / {leads.length} contacts
        </p>
        <div className="w-full bg-[#0f172a] rounded mt-2 h-2">
          <div
            className="bg-[#2563EB] h-full rounded transition-all"
            style={{ width: `${(selectedLeads.length / leads.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {leads.map(lead => (
          <label
            key={lead.id}
            className="flex items-center gap-3 p-3 bg-[#1e293b] border border-[#334155] rounded-lg cursor-pointer hover:border-[#475569] transition-all"
          >
            <input
              type="checkbox"
              checked={selectedLeads.includes(lead.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedLeads([...selectedLeads, lead.id]);
                } else {
                  setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                }
              }}
              className="w-4 h-4"
            />
            <div className="flex-1">
              <p className="font-semibold text-[#E5E7EB]">{lead.name}</p>
              <p className="text-sm text-[#64748b]">{lead.email}</p>
            </div>
            {lead.company && <span className="text-xs text-[#94a3b8]">{lead.company}</span>}
          </label>
        ))}
      </div>

      <div className="flex gap-3 justify-between pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2 bg-[#1e293b] text-[#E5E7EB] rounded-lg hover:bg-[#334155] transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={() => {
            // Skip: select all leads by default
            updateCampaignDraft({ contacts: leads.map(l => l.id) });
            onNext();
          }}
          className="flex items-center gap-2 px-6 py-2 text-[#94a3b8] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all text-sm"
        >
          Skip (Select All)
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ReviewStep({ onClose }: { onClose: () => void }) {
  const { campaignDraft, leads, addCampaign, resetCampaignDraft } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedContacts = leads.filter(l => campaignDraft.contacts?.includes(l.id));

  const handleLaunch = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const campaign = {
        id: Date.now().toString(),
        name: campaignDraft.basics?.name || 'Untitled Campaign',
        type: campaignDraft.basics?.type || 'standard',
        status: 'active' as const,
        contacts: selectedContacts.length,
        opens: 0,
        clicks: 0,
        replies: 0,
        createdAt: new Date().toISOString(),
        tone: campaignDraft.aiConfig?.tone,
        goal: campaignDraft.aiConfig?.goal,
        industry: campaignDraft.aiConfig?.industry,
        cta: campaignDraft.aiConfig?.cta
      };

      addCampaign(campaign);
      resetCampaignDraft();
      toast.success('🚀 Campaign launched successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to launch campaign');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e293b] border border-[#334155] rounded-lg p-6 space-y-4">
        <div>
          <p className="text-sm text-[#94a3b8] mb-1">Campaign Name</p>
          <p className="text-lg font-semibold text-[#E5E7EB]">{campaignDraft.basics?.name}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#94a3b8] mb-1">Type</p>
            <p className="font-semibold text-[#E5E7EB]">{campaignDraft.basics?.type}</p>
          </div>
          <div>
            <p className="text-sm text-[#94a3b8] mb-1">Total Contacts</p>
            <p className="font-semibold text-[#E5E7EB]">{selectedContacts.length}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#94a3b8] mb-1">Tone</p>
            <p className="font-semibold text-[#E5E7EB]">{campaignDraft.aiConfig?.tone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-[#94a3b8] mb-1">Goal</p>
            <p className="font-semibold text-[#E5E7EB]">{campaignDraft.aiConfig?.goal || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto">
        <p className="text-sm font-semibold text-[#E5E7EB] mb-3">Selected Contacts</p>
        <div className="space-y-2">
          {selectedContacts.map(contact => (
            <div key={contact.id} className="flex items-center justify-between p-2 bg-[#1e293b] rounded">
              <div>
                <p className="font-semibold text-[#E5E7EB]">{contact.name}</p>
                <p className="text-xs text-[#64748b]">{contact.email}</p>
              </div>
              <CheckCircle className="w-4 h-4 text-[#2563EB]" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-between pt-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-2 bg-[#1e293b] text-[#E5E7EB] rounded-lg hover:bg-[#334155] transition-all"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          onClick={handleLaunch}
          className="flex items-center gap-2 px-6 py-2 bg-[#10b981] text-white rounded-lg hover:bg-[#059669] transition-all disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Launching...' : '🚀 Launch Campaign'}
        </button>
      </div>
    </div>
  );
}

export function CampaignWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const { campaignDraft, updateCampaignDraft } = useApp();

  const steps = [
    { number: 1, title: 'Campaign Basics' },
    { number: 2, title: 'AI Configuration' },
    { number: 3, title: 'Select Contacts' },
    { number: 4, title: 'Review & Launch' }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      updateCampaignDraft({ step: step + 1 });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      updateCampaignDraft({ step: step - 1 });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0f172a] border-b border-[#1e293b] p-6">
          <h2 className="text-2xl font-bold text-[#E5E7EB] mb-4">Create New Campaign</h2>
          
          {/* Progress Steps */}
          <div className="flex gap-2">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step >= s.number
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#1e293b] text-[#64748b]'
                  }`}
                >
                  {step > s.number ? '✓' : s.number}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-all ${
                      step > s.number ? 'bg-[#2563EB]' : 'bg-[#1e293b]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <p className="text-[#64748b] text-sm mt-4">{steps[step - 1].title}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <BasicsStep onNext={handleNext} onBack={handleBack} isFirst isLast={false} />
          )}
          {step === 2 && (
            <AIConfigStep onNext={handleNext} onBack={handleBack} isFirst={false} isLast={false} />
          )}
          {step === 3 && (
            <ContactsStep onNext={handleNext} onBack={handleBack} isFirst={false} isLast={false} />
          )}
          {step === 4 && (
            <ReviewStep onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
