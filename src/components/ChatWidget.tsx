import { useState } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

const initialMessages = [
  {
    role: 'assistant',
    content: 'Hello! I\'m your AI assistant. How can I help you with your sales campaigns today?',
    time: '10:23 AM'
  }
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      role: 'user',
      content: inputValue,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: 'I understand you need help with that. Let me analyze your data and provide insights.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const isSendDisabled = !inputValue.trim();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#2563EB] rounded-full shadow-xl flex items-center justify-center hover:bg-[#1d4ed8] transition-all hover:scale-110 group"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] rounded-full flex items-center justify-center text-xs text-white animate-pulse">
          1
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 bg-[#020617] border border-[#1e293b] rounded-xl shadow-2xl flex flex-col transition-all ${
      isMinimized ? 'h-14' : 'h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center relative">
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10b981] rounded-full border-2 border-[#020617]"></span>
          </div>
          <div>
            <div className="text-sm text-[#E5E7EB]">AI SDR Assistant</div>
            <div className="text-xs text-[#10b981] flex items-center gap-1">
              <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></span>
              Online
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded transition-all"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded transition-all"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 ${
                    message.role === 'user'
                      ? 'bg-[#2563EB] text-white shadow-lg'
                      : 'bg-[#1e293b] text-[#E5E7EB] shadow-md'
                  }`}
                >
                  <div className="text-sm mb-1">{message.content}</div>
                  <div className={`text-xs ${
                    message.role === 'user' ? 'text-blue-200' : 'text-[#64748b]'
                  }`}>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-[#1e293b]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isSendDisabled && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-sm text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isSendDisabled}
                className={`p-2 rounded-lg transition-all ${
                  isSendDisabled
                    ? 'bg-[#1e293b] text-[#64748b] cursor-not-allowed opacity-50'
                    : 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-lg hover:shadow-xl'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <button className="text-xs text-[#64748b] hover:text-[#E5E7EB] transition-colors hover:underline">
                Analyze campaigns
              </button>
              <span className="text-[#64748b]">•</span>
              <button className="text-xs text-[#64748b] hover:text-[#E5E7EB] transition-colors hover:underline">
                Show top leads
              </button>
              <span className="text-[#64748b]">•</span>
              <button className="text-xs text-[#64748b] hover:text-[#E5E7EB] transition-colors hover:underline">
                Generate report
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}