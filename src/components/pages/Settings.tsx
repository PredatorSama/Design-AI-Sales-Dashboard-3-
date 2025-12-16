import { useState } from 'react';
import { User, Mail, Bell, Lock, CreditCard, Users as UsersIcon, HelpCircle, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [contactFormState, setContactFormState] = useState({ subject: '', message: '', email: 'john@demo1.com' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team', icon: UsersIcon },
    { id: 'support', label: 'Contact Us', icon: HelpCircle }
  ];

  const handleSave = () => {
    toast.success('Settings Saved', {
      description: 'Your changes have been saved successfully',
    });
  };

  const handleContactSubmit = () => {
    if (!contactFormState.subject.trim() || !contactFormState.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setContactSubmitted(true);
    toast.success('Support Request Sent!', {
      description: 'Our team will respond within 24 hours',
    });
    setTimeout(() => {
      setContactFormState({ subject: '', message: '', email: 'john@demo1.com' });
      setContactSubmitted(false);
    }, 3000);
  };

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl text-[#E5E7EB] mb-1 font-semibold">Settings</h2>
        <p className="text-[#94a3b8] font-medium">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="bg-[#020617] border border-[#334155] rounded-xl p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#E5E7EB]'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="col-span-3 bg-[#020617] border border-[#1e293b] rounded-xl p-6">
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-lg text-[#E5E7EB] mb-6">Profile Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#E5E7EB] mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#E5E7EB] mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Smith"
                      className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#E5E7EB] mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john@demo1.com"
                    className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#E5E7EB] mb-2">Job Title</label>
                  <input
                    type="text"
                    defaultValue="Sales Manager"
                    className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#E5E7EB] mb-2">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Experienced sales professional focused on enterprise B2B solutions."
                    className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-lg text-[#E5E7EB] mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0f172a] border border-[#1e293b] rounded-lg">
                  <div>
                    <div className="text-sm text-[#E5E7EB] mb-1">Email Notifications</div>
                    <div className="text-xs text-[#64748b]">Receive email updates about your campaigns</div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      emailNotifications ? 'bg-[#2563EB]' : 'bg-[#1e293b]'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        emailNotifications ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0f172a] border border-[#1e293b] rounded-lg">
                  <div>
                    <div className="text-sm text-[#E5E7EB] mb-1">Push Notifications</div>
                    <div className="text-xs text-[#64748b]">Get real-time notifications on your device</div>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      pushNotifications ? 'bg-[#2563EB]' : 'bg-[#1e293b]'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        pushNotifications ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0f172a] border border-[#1e293b] rounded-lg">
                  <div>
                    <div className="text-sm text-[#E5E7EB] mb-1">Weekly Reports</div>
                    <div className="text-xs text-[#64748b]">Receive weekly performance summaries</div>
                  </div>
                  <button
                    onClick={() => setWeeklyReports(!weeklyReports)}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      weeklyReports ? 'bg-[#2563EB]' : 'bg-[#1e293b]'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        weeklyReports ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 className="text-lg text-[#E5E7EB] mb-6">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#E5E7EB] mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#E5E7EB] mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#E5E7EB] mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'account' || activeTab === 'billing' || activeTab === 'team') && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center mx-auto mb-3">
                {activeTab === 'account' && <Mail className="w-8 h-8 text-[#64748b]" />}
                {activeTab === 'billing' && <CreditCard className="w-8 h-8 text-[#64748b]" />}
                {activeTab === 'team' && <UsersIcon className="w-8 h-8 text-[#64748b]" />}
              </div>
              <h3 className="text-lg text-[#E5E7EB] mb-2">{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
              <p className="text-sm text-[#64748b]">This section is under development</p>
            </div>
          )}

          {activeTab === 'support' && (
            <div>
              <h3 className="text-lg text-[#E5E7EB] mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Contact Support Team
              </h3>
              <p className="text-sm text-[#94a3b8] mb-6">Have a question or need help? Get in touch with our support team.</p>

              {contactSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 bg-[#0f172a] border border-[#1e293b] rounded-lg">
                  <div className="w-16 h-16 bg-[#10b981]/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#E5E7EB] mb-2">Request Received!</h4>
                  <p className="text-sm text-[#94a3b8] text-center">Thank you for reaching out. Our support team will respond within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#E5E7EB] mb-2">Email Address</label>
                    <input
                      type="email"
                      value={contactFormState.email}
                      onChange={(e) => setContactFormState({...contactFormState, email: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#E5E7EB] mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="What can we help you with?"
                      value={contactFormState.subject}
                      onChange={(e) => setContactFormState({...contactFormState, subject: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#E5E7EB] mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Please describe your issue or question in detail..."
                      value={contactFormState.message}
                      onChange={(e) => setContactFormState({...contactFormState, message: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleContactSubmit}
                    className="w-full py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-[#2563EB]/20"
                  >
                    <Send className="w-4 h-4" />
                    Send Support Request
                  </button>
                </div>
              )}

              {/* FAQ Section */}
              <div className="mt-8 pt-8 border-t border-[#1e293b]">
                <h4 className="text-sm font-semibold text-[#E5E7EB] mb-4">Quick Help</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href="#" className="p-3 bg-[#0f172a] border border-[#1e293b] rounded-lg hover:border-[#334155] transition-all group">
                    <p className="text-sm text-[#E5E7EB] group-hover:text-[#2563EB] font-medium transition-colors">📖 Documentation</p>
                    <p className="text-xs text-[#64748b]">View our knowledge base</p>
                  </a>
                  <a href="#" className="p-3 bg-[#0f172a] border border-[#1e293b] rounded-lg hover:border-[#334155] transition-all group">
                    <p className="text-sm text-[#E5E7EB] group-hover:text-[#2563EB] font-medium transition-colors">🎥 Video Tutorials</p>
                    <p className="text-xs text-[#64748b]">Learn by watching tutorials</p>
                  </a>
                  <a href="#" className="p-3 bg-[#0f172a] border border-[#1e293b] rounded-lg hover:border-[#334155] transition-all group">
                    <p className="text-sm text-[#E5E7EB] group-hover:text-[#2563EB] font-medium transition-colors">💬 Community</p>
                    <p className="text-xs text-[#64748b]">Ask the community</p>
                  </a>
                  <a href="#" className="p-3 bg-[#0f172a] border border-[#1e293b] rounded-lg hover:border-[#334155] transition-all group">
                    <p className="text-sm text-[#E5E7EB] group-hover:text-[#2563EB] font-medium transition-colors">⚙️ Status Page</p>
                    <p className="text-xs text-[#64748b]">Check system status</p>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 pt-6 border-t border-[#1e293b]">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563EB]/20"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
