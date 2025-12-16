import { BarChart3, TrendingUp, TrendingDown, Users, Mail, Calendar, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { month: 'Jul', sent: 1200, opened: 840, replied: 240 },
  { month: 'Aug', sent: 1450, opened: 1015, replied: 290 },
  { month: 'Sep', sent: 1680, opened: 1260, replied: 378 },
  { month: 'Oct', sent: 1890, opened: 1512, replied: 453 },
  { month: 'Nov', sent: 2100, opened: 1680, replied: 546 },
  { month: 'Dec', sent: 2340, opened: 1872, replied: 608 }
];

const conversionData = [
  { stage: 'Prospects', value: 2500, color: '#2563EB' },
  { stage: 'Contacted', value: 1800, color: '#3b82f6' },
  { stage: 'Qualified', value: 980, color: '#60a5fa' },
  { stage: 'Meetings', value: 340, color: '#93c5fd' },
  { stage: 'Closed', value: 125, color: '#10b981' }
];

const channelData = [
  { name: 'Email', value: 45, color: '#2563EB' },
  { name: 'LinkedIn', value: 28, color: '#8b5cf6' },
  { name: 'Phone', value: 18, color: '#f59e0b' },
  { name: 'Direct', value: 9, color: '#10b981' }
];

const revenueData = [
  { month: 'Jul', revenue: 125000 },
  { month: 'Aug', revenue: 148000 },
  { month: 'Sep', revenue: 172000 },
  { month: 'Oct', revenue: 195000 },
  { month: 'Nov', revenue: 218000 },
  { month: 'Dec', revenue: 245000 }
];

export function Analytics() {
  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl text-[#E5E7EB] mb-1 font-semibold">Analytics</h2>
        <p className="text-[#94a3b8] font-medium">Track your sales performance and metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            label: 'Total Revenue',
            value: '$1.1M',
            change: '+18.2%',
            isPositive: true,
            icon: DollarSign,
            color: '#10b981'
          },
          {
            label: 'Meetings Booked',
            value: '342',
            change: '+12.5%',
            isPositive: true,
            icon: Calendar,
            color: '#2563EB'
          },
          {
            label: 'Response Rate',
            value: '26.8%',
            change: '+3.4%',
            isPositive: true,
            icon: Mail,
            color: '#8b5cf6'
          },
          {
            label: 'Active Leads',
            value: '2,847',
            change: '-2.1%',
            isPositive: false,
            icon: Users,
            color: '#f59e0b'
          }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-[#020617] border border-[#334155] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-[#1e293b] rounded-lg">
                <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
              </div>
              <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded font-medium ${
                kpi.isPositive ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-[#ef4444]/10 text-[#ef4444]'
              }`}>
                {kpi.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </div>
            </div>
            <div className="text-2xl text-[#E5E7EB] mb-1 font-semibold" style={{ color: kpi.color }}>{kpi.value}</div>
            <div className="text-xs text-[#94a3b8] font-medium">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Email Performance */}
        <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-[#E5E7EB]">Email Performance</h3>
            <select className="px-3 py-1.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none">
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>This month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#E5E7EB'
                }}
              />
              <Line type="monotone" dataKey="sent" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} />
              <Line type="monotone" dataKey="opened" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
              <Line type="monotone" dataKey="replied" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#2563EB] rounded-full"></div>
              <span className="text-sm text-[#94a3b8]">Sent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
              <span className="text-sm text-[#94a3b8]">Opened</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#f59e0b] rounded-full"></div>
              <span className="text-sm text-[#94a3b8]">Replied</span>
            </div>
          </div>
        </div>

        {/* Revenue Growth */}
        <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-[#E5E7EB]">Revenue Growth</h3>
            <select className="px-3 py-1.5 bg-[#0f172a] border border-[#1e293b] rounded-lg text-sm text-[#E5E7EB] focus:outline-none">
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>This month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#E5E7EB'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6">
          <h3 className="text-lg text-[#E5E7EB] mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            {conversionData.map((stage, idx) => {
              const percentage = idx > 0 ? Math.round((stage.value / conversionData[0].value) * 100) : 100;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#E5E7EB]">{stage.stage}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#64748b]">{percentage}%</span>
                      <span className="text-sm text-[#E5E7EB]">{stage.value}</span>
                    </div>
                  </div>
                  <div className="h-8 bg-[#1e293b] rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all flex items-center justify-end pr-3"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: stage.color
                      }}
                    >
                      <span className="text-xs text-white font-medium">{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6">
          <h3 className="text-lg text-[#E5E7EB] mb-4">Lead Sources</h3>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    color: '#E5E7EB'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {channelData.map((channel, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }}></div>
                    <span className="text-sm text-[#E5E7EB]">{channel.name}</span>
                  </div>
                  <span className="text-sm text-[#E5E7EB]">{channel.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
