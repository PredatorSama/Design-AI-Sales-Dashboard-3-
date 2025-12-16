import { useState, useContext } from 'react';
import { Brain, Send, Zap, MessageSquare, Target, RefreshCw, CheckCircle } from 'lucide-react';
import { AppContext } from '../../store/AppContext';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { toast } from 'sonner';

interface AIAction {
  id: string;
  type: 'message' | 'analysis' | 'followup';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'scheduled' | 'in-progress';
  result?: string;
}

export function AISalesAgent() {
  const { theme } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [actions, setActions] = useState<AIAction[]>([
    {
      id: '1',
      type: 'message',
      title: 'Generate Outreach Message',
      description: 'Create personalized email for Sarah Johnson',
      timestamp: '2 hours ago',
      status: 'completed',
      result: 'Hi Sarah, I noticed your company just expanded to the EU market. Our platform helps teams like yours streamline their outreach process...'
    },
    {
      id: '2',
      type: 'analysis',
      title: 'Prospect Analysis',
      description: 'Analyzed 5 prospects from Tech Solutions Inc',
      timestamp: '4 hours ago',
      status: 'completed',
      result: 'High-intent prospects identified: 3/5. Average engagement score: 7.8/10. Recommended follow-up: LinkedIn connection first.'
    },
    {
      id: '3',
      type: 'followup',
      title: 'Suggest Follow-up Strategy',
      description: 'For Alex Chen - No response to initial email',
      timestamp: '1 day ago',
      status: 'completed',
      result: 'Suggested 2-day wait, then LinkedIn InMail. Personalized message template generated.'
    }
  ]);

  const handleGenerateMessage = async () => {
    setLoading(true);
    setSelectedAction('new-message');
    
    setTimeout(() => {
      const newAction: AIAction = {
        id: String(Math.random()),
        type: 'message',
        title: 'Generate Outreach Message',
        description: 'Create personalized email for new prospect',
        timestamp: 'just now',
        status: 'completed',
        result: 'Subject: Quick question about your recent funding round\n\nHi there, I saw your company just raised Series A funding. Congrats! I thought it might be useful to connect since we help growth teams...'
      };
      
      setActions([newAction, ...actions]);
      setLoading(false);
      toast.success('✨ Outreach message generated successfully!');
      setTimeout(() => setSelectedAction(null), 3000);
    }, 1500);
  };

  const handleAnalyzeProspect = async () => {
    setLoading(true);
    setSelectedAction('new-analysis');
    
    setTimeout(() => {
      const newAction: AIAction = {
        id: String(Math.random()),
        type: 'analysis',
        title: 'Prospect Analysis',
        description: 'Quick analysis of top 3 prospects',
        timestamp: 'just now',
        status: 'completed',
        result: 'Prospect 1 (Lisa): High intent, VP Sales role - READY TO CONTACT\nProspect 2 (Mike): Medium intent, recent job change - NURTURE\nProspect 3 (Jane): High intent, relevant background - PRIORITIZE'
      };
      
      setActions([newAction, ...actions]);
      setLoading(false);
      toast.success('📊 Prospect analysis completed!');
      setTimeout(() => setSelectedAction(null), 3000);
    }, 1500);
  };

  const handleSuggestFollowup = async () => {
    setLoading(true);
    setSelectedAction('new-followup');
    
    setTimeout(() => {
      const newAction: AIAction = {
        id: String(Math.random()),
        type: 'followup',
        title: 'Suggest Follow-up Strategy',
        description: 'Multi-channel follow-up recommendation',
        timestamp: 'just now',
        status: 'completed',
        result: 'Recommended sequence:\n1. Wait 3 days\n2. LinkedIn message with company research\n3. 2 days later: Phone call\n4. If no response: LinkedIn InMail with value prop'
      };
      
      setActions([newAction, ...actions]);
      setLoading(false);
      toast.success('🔄 Follow-up strategy generated!');
      setTimeout(() => setSelectedAction(null), 3000);
    }, 1500);
  };

  return (
    <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-[#020617]' : 'bg-[#f8fafc]'}`}>
      {/* Page Header */}
      <div className={`px-8 py-6 border-b ${
        theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e2e8f0]'
      }`}>
        <h1 className={`text-3xl font-bold mb-1 ${
          theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
        }`}>
          AI Sales Agent
        </h1>
        <p className={`text-[#94a3b8]`}>
          Automate your sales workflow with AI-powered actions and intelligent insights
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 space-y-6">
          {/* Quick Actions */}
          <div>
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
            }`}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Generate Message Card */}
              <Card className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                theme === 'dark'
                  ? 'bg-[#1a1f2e] border-[#1e293b] hover:bg-[#222838]'
                  : 'bg-white border-[#e2e8f0] hover:bg-[#f1f5f9]'
              }`}
              onClick={handleGenerateMessage}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#3b82f6]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-[#3b82f6]" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                    }`}>
                      Generate Outreach Message
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'
                    }`}>
                      Create personalized emails instantly
                    </p>
                  </div>
                  <Send className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
                </div>
              </Card>

              {/* Analyze Prospect Card */}
              <Card className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                theme === 'dark'
                  ? 'bg-[#1a1f2e] border-[#1e293b] hover:bg-[#222838]'
                  : 'bg-white border-[#e2e8f0] hover:bg-[#f1f5f9]'
              }`}
              onClick={handleAnalyzeProspect}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-[#8b5cf6]" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                    }`}>
                      Analyze Prospect
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'
                    }`}>
                      Get insights and readiness score
                    </p>
                  </div>
                  <Zap className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
                </div>
              </Card>

              {/* Suggest Follow-up Card */}
              <Card className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                theme === 'dark'
                  ? 'bg-[#1a1f2e] border-[#1e293b] hover:bg-[#222838]'
                  : 'bg-white border-[#e2e8f0] hover:bg-[#f1f5f9]'
              }`}
              onClick={handleSuggestFollowup}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ec4899]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-6 h-6 text-[#ec4899]" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                    }`}>
                      Suggest Follow-up
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'
                    }`}>
                      Get next best action recommendations
                    </p>
                  </div>
                  <RefreshCw className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Actions */}
          <div>
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
            }`}>
              Recent Actions
            </h2>
            <div className="space-y-3">
              {actions.map((action) => (
                <Card
                  key={action.id}
                  className={`p-5 cursor-pointer transition-all ${
                    selectedAction === action.id || (selectedAction === 'new-message' && action.type === 'message' && !actions.find(a => a.id === selectedAction)) ? 'ring-2 ring-[#2563EB]' : ''
                  } ${
                    theme === 'dark'
                      ? 'bg-[#1a1f2e] border-[#1e293b] hover:bg-[#222838]'
                      : 'bg-white border-[#e2e8f0] hover:bg-[#f1f5f9]'
                  }`}
                  onClick={() => setSelectedAction(action.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold ${
                          theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                        }`}>
                          {action.title}
                        </h3>
                        {action.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className={`text-sm mb-3 ${
                        theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'
                      }`}>
                        {action.description}
                      </p>
                      {selectedAction === action.id && action.result && (
                        <div className={`p-4 rounded-lg mt-3 ${
                          theme === 'dark'
                            ? 'bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#93c5fd]'
                            : 'bg-[#2563EB]/5 border border-[#2563EB]/20 text-[#1e40af]'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{action.result}</p>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-[#64748b]' : 'text-[#94a3b8]'
                      }`}>
                        {action.timestamp}
                      </p>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${
                        action.status === 'completed'
                          ? theme === 'dark'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-green-100 text-green-700'
                          : theme === 'dark'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {action.status === 'completed' ? 'Done' : 'Scheduled'}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
