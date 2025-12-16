import { LucideIcon } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl text-[#E5E7EB] mb-1">{title}</h2>
        <p className="text-[#64748b]">{description}</p>
      </div>

      <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-12">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon className="w-12 h-12 text-[#2563EB]" />
          </div>
          <h3 className="text-xl text-[#E5E7EB] mb-3">{title} Coming Soon</h3>
          <p className="text-[#64748b] mb-6">
            This feature is currently under development. Check back soon for updates!
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563EB]/20">
              Get Notified
            </button>
            <button className="px-6 py-2.5 bg-[#1e293b] text-[#E5E7EB] rounded-lg hover:bg-[#334155] transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Feature Preview Cards */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#020617] border border-[#1e293b] rounded-xl p-6">
            <div className="w-12 h-12 bg-[#1e293b] rounded-lg mb-4"></div>
            <div className="h-4 bg-[#1e293b] rounded mb-3 w-3/4"></div>
            <div className="h-3 bg-[#1e293b] rounded mb-2"></div>
            <div className="h-3 bg-[#1e293b] rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
