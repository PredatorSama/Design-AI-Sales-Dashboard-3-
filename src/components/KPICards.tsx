import { Calendar, MessageSquare, DollarSign, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useContext } from 'react';
import { AppContext } from '../store/AppContext';

const sparklineData1 = [
  { value: 20 }, { value: 35 }, { value: 28 }, { value: 45 }, { value: 38 }, { value: 52 }, { value: 48 }
];

const sparklineData2 = [
  { value: 30 }, { value: 28 }, { value: 35 }, { value: 32 }, { value: 38 }, { value: 36 }, { value: 42 }
];

const sparklineData3 = [
  { value: 100 }, { value: 120 }, { value: 110 }, { value: 150 }, { value: 160 }, { value: 145 }, { value: 180 }
];

const sparklineData4 = [
  { value: 10 }, { value: 12 }, { value: 11 }, { value: 14 }, { value: 13 }, { value: 15 }, { value: 14 }
];

const kpis = [
  {
    title: 'Meetings Booked',
    value: '48',
    change: '+12.5%',
    trend: 'up',
    icon: Calendar,
    data: sparklineData1,
    color: '#2563EB'
  },
  {
    title: 'Reply Rate',
    value: '42%',
    change: '+5.2%',
    trend: 'up',
    icon: MessageSquare,
    data: sparklineData2,
    color: '#10b981'
  },
  {
    title: 'Pipeline Value',
    value: '$180K',
    change: '+18.3%',
    trend: 'up',
    icon: DollarSign,
    data: sparklineData3,
    color: '#8b5cf6'
  },
  {
    title: 'Active Campaigns',
    value: '14',
    change: '-2',
    trend: 'down',
    icon: Target,
    data: sparklineData4,
    color: '#f59e0b'
  }
];

export function KPICards() {
  const { theme } = useContext(AppContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, idx) => (
        <div
          key={idx}
          className={`border rounded-xl p-5 transition-all cursor-pointer group shadow-lg ${
            theme === 'dark'
              ? 'bg-[#0f172a] border-[#1e293b] hover:border-[#334155]'
              : 'bg-white border-[#e2e8f0] hover:border-[#cbd5e1]'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'bg-[#1e293b] group-hover:bg-[#334155]'
                  : 'bg-[#f1f5f9] group-hover:bg-[#e2e8f0]'
              }`}>
                <kpi.icon className={`w-5 h-5 transition-all ${
                  theme === 'dark'
                    ? 'text-[#cbd5e1] group-hover:text-[#E5E7EB]'
                    : 'text-[#64748b] group-hover:text-[#1e293b]'
                }`} />
              </div>
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-[#94a3b8]' : 'text-[#64748b]'
              }`}>{kpi.title}</span>
            </div>
          </div>
          
          <div className="mb-3">
            <div className={`text-3xl mb-1 font-semibold ${
              theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#1e293b]'
            }`}>{kpi.value}</div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              kpi.trend === 'up' ? 'text-[#10b981]' : 'text-[#ef4444]'
            }`}>
              {kpi.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{kpi.change} vs last week</span>
            </div>
          </div>
          
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpi.data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={kpi.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}