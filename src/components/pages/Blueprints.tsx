import { useState, useContext } from 'react';
import { BookOpen, Copy, Mail, Linkedin, Phone, Eye, CheckCircle } from 'lucide-react';
import { AppContext } from '../../store/AppContext';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface Blueprint {
  id: string;
  name: string;
  type: 'email' | 'linkedin' | 'call-script';
  icon: any;
  description: string;
  preview: string;
  category: string;
  useCount?: number;
  rating?: number;
}

export function Blueprints() {
  const { theme } = useContext(AppContext);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<string>('all');

  const blueprints: Blueprint[] = [
    {
      id: '1',
      name: 'Cold Email - Initial Outreach',
      type: 'email',
      icon: Mail,
      description: 'Professional initial outreach email for new prospects',
      preview: `Subject: Quick question about your [INDUSTRY] strategy

Hi [PROSPECT_NAME],

I noticed [COMPANY_NAME] recently [ACHIEVEMENT/NEWS]. Congratulations!

We work with similar companies to increase their [KEY_METRIC] by an average of 40%. Since you're [SPECIFIC_ROLE], I thought you might be interested in a quick conversation.

Would you be open to a 15-minute call next week?

Best,
[YOUR_NAME]`,
      category: 'Initial Contact'
    },
    {
      id: '2',
      name: 'Cold Email - Value Proposition',
      type: 'email',
      icon: Mail,
      description: 'Email highlighting specific value proposition',
      preview: `Subject: 40% increase in outreach efficiency

Hi [PROSPECT_NAME],

Most [INDUSTRY] teams spend 20+ hours/week on manual outreach.

We've helped [COMPETITOR/SIMILAR_COMPANY] cut that in half while increasing response rates.

Curious if this is relevant to you?

[YOUR_NAME]`,
      category: 'Value Highlight'
    },
    {
      id: '3',
      name: 'LinkedIn Connection - Tech Industry',
      type: 'linkedin',
      icon: Linkedin,
      description: 'LinkedIn connection message for tech professionals',
      preview: `Hi [PROSPECT_NAME],

I loved your recent post about [TOPIC]. Your perspective on [SPECIFIC_INSIGHT] really resonated.

I'm currently helping [INDUSTRY] teams improve their [SPECIFIC_CHALLENGE]. Given your experience with [RELEVANT_SKILL], I think we could have a great conversation.

Would love to connect!

[YOUR_NAME]`,
      category: 'Social Engagement'
    },
    {
      id: '4',
      name: 'LinkedIn Connection - General',
      type: 'linkedin',
      icon: Linkedin,
      description: 'General LinkedIn connection request template',
      preview: `Hi [PROSPECT_NAME],

I came across your profile and was impressed by your background in [AREA]. I'm currently building [SOLUTION] to help teams like yours [SPECIFIC_BENEFIT].

Would love to chat - I think there could be mutual value here.

[YOUR_NAME]`,
      category: 'Outreach'
    },
    {
      id: '5',
      name: 'Call Script - Discovery Call',
      type: 'call-script',
      icon: Phone,
      description: 'Discovery call script for qualifying prospects',
      preview: `OPENING (30 seconds):
"Hi [NAME], thanks for taking the time. I know you're busy, so I'll keep this brief. I work with [COMPANY_TYPE] to help with [SPECIFIC_PAIN]. Does that resonate?"

DISCOVERY (2-3 minutes):
"Can you tell me about your current [PROCESS/CHALLENGE]?"
"What's the impact if this doesn't get solved?"
"Who else is involved in this decision?"

POSITIONING (1 minute):
"Here's how we've helped similar companies..."

CLOSE (30 seconds):
"Does it make sense to spend 30 more minutes exploring this?"`,
      category: 'Sales Calls'
    },
    {
      id: '6',
      name: 'Call Script - Follow-up Call',
      type: 'call-script',
      icon: Phone,
      description: 'Follow-up call script after initial contact',
      preview: `OPENING (20 seconds):
"Hi [NAME], it's [YOUR_NAME] from [COMPANY]. Following up on my email about [TOPIC]. Do you have 2 minutes?"

BRIDGE:
"Last time we talked, you mentioned [SPECIFIC_POINT]. I've got an idea that directly addresses that."

VALUE DELIVERY:
"Here's what I was thinking..."

CLOSE:
"Interested in a deeper conversation next week?"`,
      category: 'Sales Calls'
    }
  ];

  const filteredBlueprints = filters === 'all' 
    ? blueprints 
    : blueprints.filter(b => b.type === filters);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTypeColor = (type: string) => {
    if (type === 'email') return theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700';
    if (type === 'linkedin') return theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700';
    return theme === 'dark' ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-700';
  };

  return (
    <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-[#020617]' : 'bg-[#f8fafc]'}`}>
      {/* Header */}
      <div className={`px-8 py-6 border-b ${
        theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e2e8f0]'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#2563EB]/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-[#2563EB]" />
          </div>
          <h1 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
          }`}>
            Blueprints
          </h1>
        </div>
        <p className={`text-sm ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
          Pre-built templates for emails, LinkedIn messages, and call scripts
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 space-y-6">
          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilters('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters === 'all'
                  ? 'bg-[#2563EB] text-white'
                  : theme === 'dark'
                  ? 'bg-[#1a1f2e] text-[#cbd5e1] hover:bg-[#222838]'
                  : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-[#f1f5f9]'
              }`}
            >
              All Blueprints
            </button>
            <button
              onClick={() => setFilters('email')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                filters === 'email'
                  ? 'bg-[#2563EB] text-white'
                  : theme === 'dark'
                  ? 'bg-[#1a1f2e] text-[#cbd5e1] hover:bg-[#222838]'
                  : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-[#f1f5f9]'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              onClick={() => setFilters('linkedin')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                filters === 'linkedin'
                  ? 'bg-[#2563EB] text-white'
                  : theme === 'dark'
                  ? 'bg-[#1a1f2e] text-[#cbd5e1] hover:bg-[#222838]'
                  : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-[#f1f5f9]'
              }`}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </button>
            <button
              onClick={() => setFilters('call-script')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                filters === 'call-script'
                  ? 'bg-[#2563EB] text-white'
                  : theme === 'dark'
                  ? 'bg-[#1a1f2e] text-[#cbd5e1] hover:bg-[#222838]'
                  : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-[#f1f5f9]'
              }`}
            >
              <Phone className="w-4 h-4" />
              Call Scripts
            </button>
          </div>

          {/* Blueprints Grid */}
          <div>
            {!selectedBlueprint ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBlueprints.map((blueprint) => (
                  <Card
                    key={blueprint.id}
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      theme === 'dark'
                        ? 'bg-[#1a1f2e] border-[#1e293b] hover:bg-[#222838]'
                        : 'bg-white border-[#e2e8f0] hover:bg-[#f1f5f9]'
                    }`}
                    onClick={() => setSelectedBlueprint(blueprint)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(blueprint.type)}`}>
                        <blueprint.icon className="w-5 h-5" />
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(blueprint.type)}`}>
                        {blueprint.type === 'email' ? 'Email' : blueprint.type === 'linkedin' ? 'LinkedIn' : 'Call Script'}
                      </div>
                    </div>
                    <h3 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                    }`}>
                      {blueprint.name}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'
                    }`}>
                      {blueprint.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${
                        theme === 'dark' ? 'text-[#64748b]' : 'text-[#94a3b8]'
                      }`}>
                        {blueprint.category}
                      </span>
                      <Eye className="w-4 h-4 text-[#2563EB]" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="max-w-4xl">
                <button
                  onClick={() => setSelectedBlueprint(null)}
                  className={`mb-6 px-4 py-2 rounded-lg font-medium ${
                    theme === 'dark'
                      ? 'bg-[#1a1f2e] text-[#cbd5e1] hover:bg-[#222838]'
                      : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-[#f1f5f9]'
                  }`}
                >
                  ← Back to Blueprints
                </button>

                <Card className={`p-8 ${
                  theme === 'dark'
                    ? 'bg-[#1a1f2e] border-[#1e293b]'
                    : 'bg-white border-[#e2e8f0]'
                }`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(selectedBlueprint.type)}`}>
                        <selectedBlueprint.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold mb-2 ${
                          theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                        }`}>
                          {selectedBlueprint.name}
                        </h2>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'
                        }`}>
                          {selectedBlueprint.description}
                        </p>
                      </div>
                    </div>
                    <div className={`text-xs font-medium px-3 py-1 rounded-full ${getTypeColor(selectedBlueprint.type)}`}>
                      {selectedBlueprint.type === 'email' ? 'Email' : selectedBlueprint.type === 'linkedin' ? 'LinkedIn' : 'Call Script'}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className={`p-6 rounded-lg mb-6 ${
                    theme === 'dark'
                      ? 'bg-[#0f1419] border border-[#2563EB]/30'
                      : 'bg-[#f8fafc] border border-[#e2e8f0]'
                  }`}>
                    <h3 className={`text-sm font-semibold mb-3 ${
                      theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                    }`}>
                      Preview
                    </h3>
                    <p className={`text-sm whitespace-pre-wrap font-mono ${
                      theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#475569]'
                    }`}>
                      {selectedBlueprint.preview}
                    </p>
                  </div>

                  {/* Info & Actions */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-[#0f1419]' : 'bg-[#f8fafc]'
                    }`}>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-[#64748b]' : 'text-[#94a3b8]'
                      }`}>
                        Category
                      </p>
                      <p className={`font-semibold mt-1 ${
                        theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                      }`}>
                        {selectedBlueprint.category}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-[#0f1419]' : 'bg-[#f8fafc]'
                    }`}>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-[#64748b]' : 'text-[#94a3b8]'
                      }`}>
                        Type
                      </p>
                      <p className={`font-semibold mt-1 ${
                        theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                      }`}>
                        {selectedBlueprint.type === 'email' ? 'Email' : selectedBlueprint.type === 'linkedin' ? 'LinkedIn' : 'Call Script'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleCopy(selectedBlueprint.preview, selectedBlueprint.id)}
                      className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
                    >
                      {copiedId === selectedBlueprint.id ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Template
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => setSelectedBlueprint(null)}
                      className={`flex-1 ${
                        theme === 'dark'
                          ? 'bg-[#1a1f2e] text-[#cbd5e1] hover:bg-[#222838]'
                          : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-[#f1f5f9]'
                      }`}
                    >
                      Close
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
