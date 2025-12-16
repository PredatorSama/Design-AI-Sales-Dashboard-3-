import { KPICards } from './KPICards';
import { OutreachChart } from './OutreachChart';
import { FunnelChart } from './FunnelChart';
import { ActivityPanel } from './ActivityPanel';

interface DashboardProps {
  onNewCampaign?: () => void;
  onImportLeads?: () => void;
}

export function Dashboard({ onNewCampaign, onImportLeads }: DashboardProps) {
  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E5E7EB] mb-2">Dashboard</h1>
        <p className="text-[#94a3b8]">Here's what's happening with your sales pipeline today</p>
      </div>
      
      {/* KPI Cards */}
      <KPICards />
      
      {/* Charts and Activity Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left: Charts (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <OutreachChart />
          <FunnelChart />
        </div>
        
        {/* Right: Activity Panel (1/3 width) */}
        <div className="lg:col-span-1">
          <ActivityPanel />
        </div>
      </div>
    </div>
  );
}