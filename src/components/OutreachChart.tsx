import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan 1', outreach: 120, replies: 45 },
  { date: 'Jan 8', outreach: 180, replies: 68 },
  { date: 'Jan 15', outreach: 250, replies: 92 },
  { date: 'Jan 22', outreach: 320, replies: 125 },
  { date: 'Jan 29', outreach: 280, replies: 110 },
  { date: 'Feb 5', outreach: 380, replies: 152 },
  { date: 'Feb 12', outreach: 450, replies: 185 },
  { date: 'Feb 19', outreach: 420, replies: 168 },
  { date: 'Feb 26', outreach: 520, replies: 215 },
  { date: 'Mar 5', outreach: 580, replies: 240 },
  { date: 'Mar 12', outreach: 620, replies: 265 },
  { date: 'Mar 19', outreach: 680, replies: 295 },
];

export function OutreachChart() {
  return (
    <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg text-[#E5E7EB] mb-1">Outreach vs Replies Over Time</h3>
        <p className="text-sm text-[#64748b]">Track your outbound activity and response rates</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
              tickLine={{ stroke: '#1e293b' }}
            />
            <YAxis 
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
              tickLine={{ stroke: '#1e293b' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#E5E7EB'
              }}
            />
            <Legend 
              wrapperStyle={{ color: '#E5E7EB' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="outreach" 
              stroke="#2563EB" 
              strokeWidth={2}
              dot={{ fill: '#2563EB', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="replies" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}