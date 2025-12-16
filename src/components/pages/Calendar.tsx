import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Video, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Event {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'demo';
  time: string;
  duration: string;
  attendees: string[];
  location: string;
  color: string;
}

const mockEvents: Record<number, Event[]> = {
  5: [
    {
      id: '1',
      title: 'Product Demo - Acme Corp',
      type: 'demo',
      time: '10:00 AM',
      duration: '1 hour',
      attendees: ['Sarah Johnson', 'Mike Smith'],
      location: 'Zoom Meeting',
      color: '#2563EB'
    },
    {
      id: '2',
      title: 'Follow-up Call',
      type: 'call',
      time: '2:30 PM',
      duration: '30 min',
      attendees: ['Emily Rodriguez'],
      location: 'Phone',
      color: '#10b981'
    }
  ],
  12: [
    {
      id: '3',
      title: 'Q4 Strategy Meeting',
      type: 'meeting',
      time: '9:00 AM',
      duration: '2 hours',
      attendees: ['Team'],
      location: 'Conference Room A',
      color: '#8b5cf6'
    }
  ],
  18: [
    {
      id: '4',
      title: 'Enterprise Demo',
      type: 'demo',
      time: '11:00 AM',
      duration: '1 hour',
      attendees: ['David Park', 'Lisa Chen'],
      location: 'Google Meet',
      color: '#2563EB'
    },
    {
      id: '5',
      title: 'Discovery Call',
      type: 'call',
      time: '3:00 PM',
      duration: '45 min',
      attendees: ['John Doe'],
      location: 'Zoom',
      color: '#10b981'
    }
  ]
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024
  const [selectedDate, setSelectedDate] = useState(5);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

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

  const handleNewEvent = () => {
    toast.success('New Event', {
      description: 'Opening event creation form...',
    });
  };

  const selectedEvents = mockEvents[selectedDate] || [];

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#E5E7EB] mb-1 font-semibold">Calendar</h2>
          <p className="text-[#94a3b8] font-medium">Manage your meetings and appointments</p>
        </div>
        <button 
          onClick={handleNewEvent}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563EB]/40 font-medium focus:ring-2 focus:ring-[#2563EB]/50"
        >
          <Plus className="w-4 h-4" />
          New Event
        </button>
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
              const hasEvents = day && mockEvents[day];
              const isSelected = day === selectedDate;
              const isToday = day === 14;

              return (
                <button
                  key={idx}
                  onClick={() => day && setSelectedDate(day)}
                  className={`aspect-square rounded-lg p-2 transition-all relative ${
                    !day
                      ? 'cursor-default'
                      : isSelected
                      ? 'bg-[#2563EB] text-white'
                      : isToday
                      ? 'bg-[#2563EB]/20 text-[#2563EB] border-2 border-[#2563EB]'
                      : 'bg-[#0f172a] text-[#E5E7EB] hover:bg-[#1e293b]'
                  }`}
                >
                  {day && (
                    <>
                      <span className="text-sm">{day}</span>
                      {hasEvents && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                          {mockEvents[day].map((_, i) => (
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
          {Object.entries(mockEvents).slice(0, 3).map(([day, events]) => (
            <div key={day} className="p-4 bg-[#0f172a] border border-[#1e293b] rounded-lg">
              <div className="text-sm text-[#64748b] mb-2">
                {months[currentDate.getMonth()]} {day}
              </div>
              {events.map((event) => (
                <div key={event.id} className="mb-2 last:mb-0">
                  <div className="text-sm text-[#E5E7EB]">{event.title}</div>
                  <div className="text-xs text-[#64748b]">{event.time}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
