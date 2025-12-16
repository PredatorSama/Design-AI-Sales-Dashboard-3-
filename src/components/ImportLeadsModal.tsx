import { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../store/AppContext';

export function ImportLeadsModal({ onClose }: { onClose: () => void }) {
  const { addLeads } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string;
        const lines = csv.split('\n');

        if (lines.length < 2) {
          toast.error('CSV file is empty');
          setIsLoading(false);
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const leads = [];

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === '') continue;

          const values = lines[i].split(',').map(v => v.trim());
          const nameIdx = headers.findIndex(h => h.includes('name'));
          const emailIdx = headers.findIndex(h => h.includes('email'));
          const companyIdx = headers.findIndex(h => h.includes('company'));
          const phoneIdx = headers.findIndex(h => h.includes('phone'));

          const email = emailIdx >= 0 ? values[emailIdx] : '';
          if (!email) continue;

          leads.push({
            id: `lead_${Date.now()}_${Math.random()}`,
            name: nameIdx >= 0 ? values[nameIdx] : `Lead ${i}`,
            email,
            company: companyIdx >= 0 ? values[companyIdx] : '',
            phone: phoneIdx >= 0 ? values[phoneIdx] : '',
            status: 'new' as const,
            source: 'import' as const
          });
        }

        if (leads.length === 0) {
          toast.error('No valid leads found in CSV');
          setIsLoading(false);
          return;
        }

        // Simulate processing delay
        setTimeout(() => {
          addLeads(leads);
          toast.success(`✅ ${leads.length} leads imported successfully!`);
          setIsLoading(false);
          onClose();
        }, 1000);
      } catch (error) {
        toast.error('Error parsing CSV file');
        setIsLoading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1e293b]">
          <h2 className="text-2xl font-bold text-[#E5E7EB]">Import Leads</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#1e293b] rounded-lg transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#E5E7EB]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-[#2563EB] bg-[#2563EB]/10'
                : 'border-[#334155] hover:border-[#475569]'
            } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Upload className="w-10 h-10 mx-auto mb-4 text-[#94a3b8]" />
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-[#E5E7EB] mb-2">Drag and drop your CSV file</p>
                <p className="text-sm text-[#64748b]">or click below to browse</p>
              </div>
              
              <div className="pt-2">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileInput}
                  className="hidden"
                  id="csvInput"
                  disabled={isLoading}
                />
                <label
                  htmlFor="csvInput"
                  className="inline-block px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold cursor-pointer hover:bg-[#1d4ed8] transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Select File'}
                </label>
              </div>
            </div>
          </div>

          {/* CSV Format Example */}
          <div className="bg-[#1e293b] border border-[#334155] rounded-lg p-4">
            <p className="text-sm font-semibold text-[#E5E7EB] mb-3">📋 CSV Format</p>
            <code className="text-xs text-[#94a3b8] block font-mono break-words">
              name,email,company,phone
              <br />
              John Smith,john@techcorp.com,TechCorp Inc,+1-555-0001
              <br />
              Sarah Johnson,sarah@innovate.io,Innovate.io,+1-555-0002
            </code>
          </div>

          {/* Tips */}
          <div className="bg-[#1e293b] rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-[#E5E7EB] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#10b981]" />
              Requirements
            </p>
            <ul className="text-xs text-[#94a3b8] space-y-1 ml-6">
              <li>• CSV file format only</li>
              <li>• Email column is required</li>
              <li>• First row should be headers</li>
              <li>• Max 10,000 leads per import</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-[#1e293b]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#1e293b] text-[#E5E7EB] rounded-lg hover:bg-[#334155] transition-all font-semibold"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
