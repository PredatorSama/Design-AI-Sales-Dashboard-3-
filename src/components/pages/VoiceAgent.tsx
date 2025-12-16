import { useState, useContext } from 'react';
import { Headphones, Phone, PhoneOff, Play, Pause, Volume2, Clock, CheckCircle, Calendar } from 'lucide-react';
import { AppContext } from '../../store/AppContext';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { toast } from 'sonner';

interface CallRecord {
  id: string;
  prospect: string;
  status: 'completed' | 'scheduled' | 'missed';
  duration: string;
  date: string;
  time: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  transcript?: string;
  recording?: boolean;
  keyPoints?: string[];
}

export function VoiceAgent() {
  const { theme } = useContext(AppContext);
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulatingCall, setSimulatingCall] = useState(false);

  const [callRecords, setCallRecords] = useState<CallRecord[]>([
    {
      id: '1',
      prospect: 'John Smith - Acme Corp',
      status: 'completed',
      duration: '8:42',
      date: 'Today',
      time: '2:30 PM',
      sentiment: 'positive',
      transcript: 'John: Hi, thanks for calling. We\'ve been looking at solutions like yours...\nAI Agent: Great! I understand you\'re in the manufacturing sector. We\'ve helped similar companies increase their outreach efficiency by 40%...',
      keyPoints: ['Interested in demo', 'Budget available Q1', 'Needs 3-person trial', 'Prefers weekly check-ins']
    },
    {
      id: '2',
      prospect: 'Sarah Johnson - Tech Solutions',
      status: 'completed',
      duration: '12:15',
      date: 'Yesterday',
      time: '11:00 AM',
      sentiment: 'positive',
      transcript: 'Sarah: Can you tell me more about the integration options?\nAI Agent: Absolutely! We support integrations with Salesforce, HubSpot, Pipedrive...',
      keyPoints: ['Strong product interest', 'Existing Salesforce customer', 'Wants ROI analysis', 'Next call scheduled']
    },
    {
      id: '3',
      prospect: 'Michael Chen - Growth Inc',
      status: 'completed',
      duration: '5:28',
      date: '2 days ago',
      time: '3:15 PM',
      sentiment: 'neutral',
      transcript: 'Michael: We\'re evaluating a few options right now...\nAI Agent: I understand. What are the top 3 criteria you\'re looking at?',
      keyPoints: ['Early stage evaluation', 'Price sensitive', 'Requested case studies', 'Long sales cycle']
    },
    {
      id: '4',
      prospect: 'Emily Rodriguez - Digital Ventures',
      status: 'scheduled',
      duration: 'Pending',
      date: 'Dec 19',
      time: '10:00 AM',
      sentiment: 'neutral',
    },
    {
      id: '5',
      prospect: 'David Park - Global Ventures',
      status: 'missed',
      duration: 'Not taken',
      date: 'Dec 14',
      time: '4:00 PM',
      sentiment: 'neutral',
    }
  ]);

  const handleSimulateCall = () => {
    setSimulatingCall(true);
    
    setTimeout(() => {
      const newCall: CallRecord = {
        id: String(Math.random()),
        prospect: 'New Prospect Call',
        status: 'completed',
        duration: '6:33',
        date: 'Just now',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sentiment: 'positive',
        transcript: 'AI Agent: Hi! I saw your company just launched in the market. Congratulations!\nProspect: Thanks! We\'re just getting started...',
        keyPoints: ['Strong engagement', 'Scheduled follow-up', 'Interested in pricing', 'Team meeting next week']
      };
      
      setCallRecords([newCall, ...callRecords]);
      setSimulatingCall(false);
      toast.success('☎️ Call simulated successfully! Check the details above.');
    }, 2000);
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return theme === 'dark' ? 'text-green-400' : 'text-green-600';
    if (sentiment === 'neutral') return theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
    return theme === 'dark' ? 'text-red-400' : 'text-red-600';
  };

  const getSentimentBg = (sentiment: string) => {
    if (sentiment === 'positive') return theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100';
    if (sentiment === 'neutral') return theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100';
    return theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100';
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
          Voice & AI
        </h1>
        <p className={`text-[#94a3b8]`}>
          Monitor, analyze, and automate conversations using AI-powered voice and messaging insights
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className={`p-4 ${
              theme === 'dark'
                ? 'bg-[#1a1f2e] border-[#1e293b]'
                : 'bg-white border-[#e2e8f0]'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                    Calls Today
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                  }`}>
                    3
                  </p>
                </div>
                <Phone className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </Card>

            <Card className={`p-4 ${
              theme === 'dark'
                ? 'bg-[#1a1f2e] border-[#1e293b]'
                : 'bg-white border-[#e2e8f0]'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                    Avg Duration
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                  }`}>
                    8:45
                  </p>
                </div>
                <Clock className="w-6 h-6 text-[#8b5cf6]" />
              </div>
            </Card>

            <Card className={`p-4 ${
              theme === 'dark'
                ? 'bg-[#1a1f2e] border-[#1e293b]'
                : 'bg-white border-[#e2e8f0]'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                    Positive Sentiment
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                  }`}>
                    67%
                  </p>
                </div>
                <Volume2 className="w-6 h-6 text-green-500" />
              </div>
            </Card>

            <Card className={`p-4 ${
              theme === 'dark'
                ? 'bg-[#1a1f2e] border-[#1e293b]'
                : 'bg-white border-[#e2e8f0]'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                    Scheduled Calls
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                  }`}>
                    2
                  </p>
                </div>
                <Calendar className="w-6 h-6 text-[#ec4899]" />
              </div>
            </Card>
          </div>

          {/* Simulate Call Button */}
          <div>
            <Button
              onClick={handleSimulateCall}
              disabled={simulatingCall}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-2"
            >
              {simulatingCall ? (
                <>
                  <div className="animate-spin mr-2">
                    <Phone className="w-4 h-4" />
                  </div>
                  Simulating Call...
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 mr-2" />
                  Simulate New Call
                </>
              )}
            </Button>
          </div>

          {/* Call History */}
          <div>
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
            }`}>
              Call History
            </h2>
            <div className="space-y-3">
              {callRecords.map((call) => (
                <Card
                  key={call.id}
                  className={`p-5 cursor-pointer transition-all ${
                    selectedCall === call.id ? 'ring-2 ring-[#2563EB]' : ''
                  } ${
                    theme === 'dark'
                      ? 'bg-[#1a1f2e] border-[#1e293b] hover:bg-[#222838]'
                      : 'bg-white border-[#e2e8f0] hover:bg-[#f1f5f9]'
                  }`}
                  onClick={() => setSelectedCall(call.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${
                          theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                        }`}>
                          {call.prospect}
                        </h3>
                        {call.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className={`${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                          {call.date} at {call.time}
                        </span>
                        <span className={`${theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                          Duration: {call.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSentimentBg(call.sentiment)} ${getSentimentColor(call.sentiment)}`}>
                        {call.sentiment.charAt(0).toUpperCase() + call.sentiment.slice(1)}
                      </div>
                      <div className={`px-3 py-1 rounded text-xs font-medium ${
                        call.status === 'completed'
                          ? theme === 'dark'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-green-100 text-green-700'
                          : call.status === 'scheduled'
                          ? theme === 'dark'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-blue-100 text-blue-700'
                          : theme === 'dark'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  {selectedCall === call.id && (
                    <div className={`mt-4 pt-4 border-t ${
                      theme === 'dark' ? 'border-[#1e293b]' : 'border-[#e2e8f0]'
                    }`}>
                      {call.transcript && (
                        <div className="mb-4">
                          <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
                            theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                          }`}>
                            <Volume2 className="w-4 h-4" />
                            Call Transcript
                          </h4>
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`mb-2 px-3 py-1 rounded text-sm font-medium flex items-center gap-2 ${
                              theme === 'dark'
                                ? 'bg-[#2563EB]/20 text-[#60a5fa] hover:bg-[#2563EB]/30'
                                : 'bg-[#2563EB]/10 text-[#2563EB] hover:bg-[#2563EB]/20'
                            }`}
                          >
                            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            {isPlaying ? 'Pause' : 'Play'}
                          </button>
                          <p className={`text-sm whitespace-pre-wrap ${
                            theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#475569]'
                          }`}>
                            {call.transcript}
                          </p>
                        </div>
                      )}
                      
                      {call.keyPoints && (
                        <div>
                          <h4 className={`text-sm font-semibold mb-2 ${
                            theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
                          }`}>
                            Key Points
                          </h4>
                          <ul className="space-y-1">
                            {call.keyPoints.map((point, idx) => (
                              <li key={idx} className={`text-sm flex items-start gap-2 ${
                                theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#475569]'
                              }`}>
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
