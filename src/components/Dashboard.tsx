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
      {/* Header - Action buttons are in Navbar to avoid duplication */}
      <div className="mb-6">
        <h2 className="text-2xl text-[#E5E7EB] mb-1 font-semibold">Dashboard</h2>
        <p className="text-[#94a3b8] font-medium">Here's what's happening with your sales pipeline today</p>
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