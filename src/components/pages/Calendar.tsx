import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Video, MapPin, Users, X } from 'lucide-react';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'demo';
  time: string;
  date: string;
  duration: string;
  attendees: string[];
  location: string;
  color: string;
  description: string;
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const initialMockEvents: Record<number, Event[]> = {
  5: [
    {
      id: '1',
      title: 'Product Demo - Acme Corp',
      type: 'demo',
      time: '10:00 AM',
      date: '5',
      duration: '1 hour',
      attendees: ['Sarah Johnson', 'Mike Smith'],
      location: 'Zoom Meeting',
      color: '#2563EB',
      description: 'Quarterly product demo'
    },
    {
      id: '2',
      title: 'Follow-up Call',
      type: 'call',
      time: '2:30 PM',
      date: '5',
      duration: '30 min',
      attendees: ['Emily Rodriguez'],
      location: 'Phone',
      color: '#10b981',
      description: 'Check in on last demo'
    }
  ],
  12: [
    {
      id: '3',
      title: 'Q4 Strategy Meeting',
      type: 'meeting',
      time: '9:00 AM',
      date: '12',
      duration: '2 hours',
      attendees: ['Team'],
      location: 'Conference Room A',
      color: '#8b5cf6',
      description: 'Q4 planning session'
    }
  ],
  18: [
    {
      id: '4',
      title: 'Enterprise Demo',
      type: 'demo',
      time: '11:00 AM',
      date: '18',
      duration: '1 hour',
      attendees: ['David Park', 'Lisa Chen'],
      location: 'Google Meet',
      color: '#2563EB',
      description: 'Enterprise client demo'
    },
    {
      id: '5',
      title: 'Discovery Call',
      type: 'call',
      time: '3:00 PM',
      date: '18',
      duration: '45 min',
      attendees: ['John Doe'],
      location: 'Zoom',
      color: '#10b981',
      description: 'Initial discovery call'
    }
  ]
};

export function Calendar({ onAddEventFromNavbar }: { onAddEventFromNavbar?: (ref: () => void) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024
  const [selectedDate, setSelectedDate] = useState(5);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState<Record<number, Event[]>>(() => {
    const stored = localStorage.getItem('calendarEvents');
    return stored ? JSON.parse(stored) : initialMockEvents;
  });
  
  // Event form state
  const [formData, setFormData] = useState({
    title: '',
    type: 'meeting' as 'meeting' | 'call' | 'demo',
    time: '10:00 AM',
    duration: '1 hour',
    attendees: '',
    location: '',
    description: ''
  });

  const [selectedEventDate, setSelectedEventDate] = useState(5);

  // Persist events to localStorage
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Register callback for Navbar button
  useEffect(() => {
    if (onAddEventFromNavbar) {
      onAddEventFromNavbar(() => handleOpenEventModal());
    }
  }, [onAddEventFromNavbar]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleOpenEventModal = (date?: number) => {
    if (date) {
      setSelectedEventDate(date);
    }
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setFormData({
      title: '',
      type: 'meeting',
      time: '10:00 AM',
      duration: '1 hour',
      attendees: '',
      location: '',
      description: ''
    });
  };

  const handleSubmitEvent = () => {
    if (!formData.title.trim() || !formData.location.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newEvent: Event = {
      id: String(Math.random()),
      title: formData.title,
      type: formData.type,
      time: formData.time,
      date: String(selectedEventDate),
      duration: formData.duration,
      attendees: formData.attendees.split(',').map(a => a.trim()).filter(a => a),
      location: formData.location,
      color: formData.type === 'demo' ? '#2563EB' : formData.type === 'call' ? '#10b981' : '#8b5cf6',
      description: formData.description
    };

    setEvents(prev => ({
      ...prev,
      [selectedEventDate]: [...(prev[selectedEventDate] || []), newEvent]
    }));

    toast.success(`✅ Event "${formData.title}" added to ${months[currentDate.getMonth()]} ${selectedEventDate}!`);
    handleCloseEventModal();
  };

  const selectedEvents = events[selectedDate] || [];

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E5E7EB] mb-2">Calendar</h1>
        <p className="text-[#94a3b8]">Manage your meetings and appointments</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="col-span-2 bg-[#020617] border border-[#1e293b] rounded-xl p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[#E5E7EB]">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#0f172a] rounded-lg p-1">
                <button
                  onClick={() => setView('month')}
                  className={`px-3 py-1.5 text-sm rounded transition-all ${
                    view === 'month' ? 'bg-[#2563EB] text-white' : 'text-[#94a3b8] hover:text-[#E5E7EB]'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-3 py-1.5 text-sm rounded transition-all ${
                    view === 'week' ? 'bg-[#2563EB] text-white' : 'text-[#94a3b8] hover:text-[#E5E7EB]'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setView('day')}
                  className={`px-3 py-1.5 text-sm rounded transition-all ${
                    view === 'day' ? 'bg-[#2563EB] text-white' : 'text-[#94a3b8] hover:text-[#E5E7EB]'
                  }`}
                >
                  Day
                </button>
              </div>
              <button
                onClick={handlePrevMonth}
                className="p-2 text-[#94a3b8] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 text-[#94a3b8] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm text-[#64748b] py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const hasEvents = day && events[day];
              const isSelected = day === selectedDate;
              const isToday = day === 14;

              return (
                <button
                  key={idx}
                  onClick={() => day && setSelectedDate(day)}
                  onDoubleClick={() => day && handleOpenEventModal(day)}
                  className={`aspect-square rounded-lg p-2 transition-all relative ${
                    !day
                      ? 'cursor-default'
                      : isSelected
                      ? 'bg-[#2563EB] text-white'
                      : isToday
                      ? 'bg-[#2563EB]/20 text-[#2563EB] border-2 border-[#2563EB]'
                      : 'bg-[#0f172a] text-[#E5E7EB] hover:bg-[#1e293b]'
                  }`}
                  title={day && !isSelected ? 'Double-click to add event' : ''}
                >
                  {day && (
                    <>
                      <span className="text-sm">{day}</span>
                      {hasEvents && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                          {events[day].map((_, i) => (
                            <div key={i} className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-[#2563EB]'}`}></div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6">
          <h3 className="text-lg text-[#E5E7EB] mb-4">
            Events for {months[currentDate.getMonth()]} {selectedDate}
          </h3>

          {selectedEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-[#0f172a] border border-[#1e293b] rounded-lg hover:border-[#2563EB] transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-1 h-16 rounded-full"
                      style={{ backgroundColor: event.color }}
                    ></div>
                    <div className="flex-1">
                      <h4 className="text-sm text-[#E5E7EB] mb-1">{event.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-[#64748b] mb-2">
                        <Clock className="w-3 h-3" />
                        {event.time} • {event.duration}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#64748b] mb-2">
                        {event.type === 'demo' || event.type === 'meeting' ? (
                          <Video className="w-3 h-3" />
                        ) : (
                          <MapPin className="w-3 h-3" />
                        )}
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#64748b]">
                        <Users className="w-3 h-3" />
                        {event.attendees.join(', ')}
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-2 bg-[#2563EB]/10 text-[#2563EB] rounded text-xs hover:bg-[#2563EB]/20 transition-all"
                  >
                    Join Meeting
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-[#64748b]" />
              </div>
              <p className="text-sm text-[#64748b]">No events scheduled</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 bg-[#020617] border border-[#1e293b] rounded-xl p-6">
        <h3 className="text-lg text-[#E5E7EB] mb-4">Upcoming This Week</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(events).slice(0, 3).map(([day, dayEvents]) => (
            <div key={day} className="p-4 bg-[#0f172a] border border-[#1e293b] rounded-lg">
              <div className="text-sm text-[#64748b] mb-2">
                {months[currentDate.getMonth()]} {day}
              </div>
              {dayEvents.map((event) => (
                <div key={event.id} className="mb-2 last:mb-0">
                  <div className="text-sm text-[#E5E7EB]">{event.title}</div>
                  <div className="text-xs text-[#64748b]">{event.time}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Event Creation Modal */}
      {showEventModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleCloseEventModal}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#020617] border border-[#1e293b] rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#1e293b]">
              <h2 className="text-xl font-bold text-[#E5E7EB]">Add New Event</h2>
              <button
                onClick={handleCloseEventModal}
                className="p-1 text-[#64748b] hover:text-[#E5E7EB] hover:bg-[#1e293b] rounded transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Client Demo, Team Meeting"
                  className="w-full px-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50"
                />
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                  Date
                </label>
                <p className="text-sm text-[#E5E7EB] bg-[#0f172a] px-4 py-2 rounded-lg border border-[#334155]">
                  {months[currentDate.getMonth()]} {selectedEventDate}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Event Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'meeting' | 'call' | 'demo' })}
                    className="w-full px-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="call">Call</option>
                    <option value="demo">Demo</option>
                  </select>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Time
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="10:00 AM"
                    className="w-full px-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50"
                  >
                    <option value="15 min">15 minutes</option>
                    <option value="30 min">30 minutes</option>
                    <option value="45 min">45 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                    <option value="3 hours">3 hours</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Zoom, Conference Room"
                    className="w-full px-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50"
                  />
                </div>
              </div>

              {/* Attendees */}
              <div>
                <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                  Attendees (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  placeholder="John Doe, Sarah Smith"
                  className="w-full px-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add any additional details..."
                  className="w-full px-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-[#E5E7EB] placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/50 resize-none h-24"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-8 py-6 border-t border-[#1e293b]">
              <button
                onClick={handleCloseEventModal}
                className="flex-1 px-4 py-2 bg-[#1a1f2e] text-[#cbd5e1] rounded-lg font-medium hover:bg-[#222838] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitEvent}
                className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 transition-all"
              >
                Create Event
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
