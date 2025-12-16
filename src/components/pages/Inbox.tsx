import { useState } from 'react';
import { Search, Star, Archive, Trash2, Reply, Forward, MoreVertical, Paperclip, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Email {
  id: string;
  from: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  label: string;
}

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'Sarah Johnson',
    email: 'sarah.j@acmecorp.com',
    subject: 'Re: Demo Request - Acme Corporation',
    preview: 'Thanks for reaching out! I\'d love to schedule a demo next week. Are you available on Tuesday?',
    time: '10:30 AM',
    isRead: false,
    isStarred: true,
    hasAttachment: false,
    label: 'hot-lead'
  },
  {
    id: '2',
    from: 'Michael Chen',
    email: 'mchen@techstart.io',
    subject: 'Following up on our conversation',
    preview: 'Hi, just wanted to follow up on our call yesterday. The team is very interested in moving forward...',
    time: '9:15 AM',
    isRead: false,
    isStarred: false,
    hasAttachment: true,
    label: 'follow-up'
  },
  {
    id: '3',
    from: 'Emily Rodriguez',
    email: 'emily.r@innovate.com',
    subject: 'Question about pricing',
    preview: 'I reviewed the proposal and have a few questions about the enterprise tier pricing...',
    time: 'Yesterday',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    label: 'pricing'
  },
  {
    id: '4',
    from: 'David Park',
    email: 'dpark@growthco.com',
    subject: 'Re: Product Demo Feedback',
    preview: 'The demo was impressive! Our team particularly liked the automation features. When can we...',
    time: 'Yesterday',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    label: 'hot-lead'
  }
];

export function Inbox() {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');

  const handleStarEmail = (id: string) => {
    setEmails(prev => prev.map(email =>
      email.id === id ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const handleArchive = (id: string) => {
    toast.success('Email Archived');
    setEmails(prev => prev.filter(email => email.id !== id));
    setSelectedEmail(null);
  };

  const handleDelete = (id: string) => {
    toast.success('Email Deleted');
    setEmails(prev => prev.filter(email => email.id !== id));
    setSelectedEmail(null);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    toast.success('Reply Sent', {
      description: 'Your reply has been sent successfully',
    });
    setReplyText('');
  };

  const filteredEmails = emails.filter(email =>
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const labelColors: Record<string, string> = {
    'hot-lead': '#ef4444',
    'follow-up': '#f59e0b',
    'pricing': '#8b5cf6'
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Email List */}
      <div className="w-96 border-r border-[#334155] flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-[#334155]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0f172a] border border-[#334155] rounded-lg text-sm text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50 transition-all"
            />
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => {
                setSelectedEmail(email);
                setEmails(prev => prev.map(e => e.id === email.id ? { ...e, isRead: true } : e));
              }}
              className={`p-4 border-b border-[#1e293b] cursor-pointer transition-all ${
                selectedEmail?.id === email.id
                  ? 'bg-[#2563EB]/10 border-l-2 border-l-[#2563EB]'
                  : 'hover:bg-[#0f172a]'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStarEmail(email.id);
                  }}
                  className="mt-1"
                >
                  <Star className={`w-4 h-4 ${email.isStarred ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#64748b]'}`} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm truncate ${email.isRead ? 'text-[#94a3b8]' : 'text-[#E5E7EB]'}`}>
                      {email.from}
                    </span>
                    <span className="text-xs text-[#64748b] ml-2">{email.time}</span>
                  </div>
                  <div className={`text-sm mb-1 truncate ${email.isRead ? 'text-[#94a3b8]' : 'text-[#E5E7EB]'}`}>
                    {email.subject}
                  </div>
                  <div className="text-xs text-[#64748b] truncate mb-2">{email.preview}</div>
                  <div className="flex items-center gap-2">
                    {email.hasAttachment && (
                      <Paperclip className="w-3 h-3 text-[#64748b]" />
                    )}
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: `${labelColors[email.label]}20`,
                        color: labelColors[email.label]
                      }}
                    >
                      {email.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Header */}
            <div className="p-6 border-b border-[#1e293b]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl text-[#E5E7EB] mb-2">{selectedEmail.subject}</h2>
                  <div className="flex items-center gap-2 text-sm text-[#64748b]">
                    <span>{selectedEmail.from}</span>
                    <span>•</span>
                    <span>{selectedEmail.email}</span>
                    <span>•</span>
                    <span>{selectedEmail.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleArchive(selectedEmail.id)}
                    className="p-2 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(selectedEmail.id)}
                    className="p-2 text-[#64748b] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl">
                <p className="text-[#E5E7EB] leading-relaxed">
                  {selectedEmail.preview}
                </p>
                <div className="mt-6 p-4 bg-[#0f172a] border border-[#1e293b] rounded-lg">
                  <p className="text-sm text-[#94a3b8]">
                    This is a preview of the email content. In a full implementation, this would show the complete email body with proper formatting, images, and attachments.
                  </p>
                </div>
              </div>
            </div>

            {/* Reply Section */}
            <div className="p-6 border-t border-[#1e293b]">
              <div className="flex items-center gap-2 mb-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all text-sm">
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] text-[#E5E7EB] rounded-lg hover:bg-[#334155] transition-all text-sm">
                  <Forward className="w-4 h-4" />
                  Forward
                </button>
              </div>
              <div className="flex items-end gap-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-lg text-sm text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50 transition-all resize-none"
                  rows={3}
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                    replyText.trim()
                      ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-lg shadow-[#2563EB]/20'
                      : 'bg-[#1e293b] text-[#64748b] cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#64748b]">
            Select an email to read
          </div>
        )}
      </div>
    </div>
  );
}
