import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { stage: 'Prospects', value: 1250, rate: '100%' },
  { stage: 'Opened', value: 875, rate: '70%' },
  { stage: 'Replied', value: 520, rate: '41.6%' },
  { stage: 'Meetings', value: 185, rate: '14.8%' },
];

const colors = ['#2563EB', '#3b82f6', '#60a5fa', '#93c5fd'];

export function FunnelChart() {
  return (
    <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg text-[#E5E7EB] mb-1">Conversion Funnel</h3>
        <p className="text-sm text-[#64748b]">From prospect to meeting booked</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              type="number"
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
              tickLine={{ stroke: '#1e293b' }}
            />
            <YAxis 
              type="category"
              dataKey="stage" 
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
              tickLine={{ stroke: '#1e293b' }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#E5E7EB'
              }}
              formatter={(value, name, props) => [
                `${value} (${props.payload.rate})`,
                'Count'
              ]}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Conversion Rate Summary */}
      <div className="mt-6 grid grid-cols-4 gap-4 pt-4 border-t border-[#1e293b]">
        {data.map((item, idx) => (
          <div key={idx} className="text-center">
            <div className="text-xs text-[#64748b] mb-1">{item.stage}</div>
            <div className="text-sm text-[#E5E7EB]">{item.rate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}