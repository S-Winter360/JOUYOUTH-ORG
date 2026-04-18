import { useState } from "react";
import { Copy, Check, Heart, Smartphone, Building2 } from "lucide-react";

export default function Donate() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl min-h-[70vh]">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] mb-6 shadow-lg">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-[56px] font-extrabold mb-4 tracking-tight">Support Our <span className="text-[#6366f1]">Mission</span></h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Your contribution helps us provide training, resources, and opportunities 
          for youth empowerment. Every donation counts.
        </p>

        {/* Progress bar placeholder */}
        <div className="max-w-xl mx-auto mt-10 text-left">
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-[#6366f1]">Amount Raised: $12k</span>
            <span className="text-text-muted">Goal: $50k</span>
          </div>
          <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden border border-glass-border relative">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] w-[24%]" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Mobile Money */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-glass-border pb-4">
            <Smartphone className="text-[#a855f7]" /> Mobile Money
          </h3>
          
          <div className="space-y-6">
            <div className="bg-[rgba(255,255,255,0.02)] p-5 rounded-2xl border border-[rgba(255,255,255,0.05)]">
              <div className="text-xs uppercase tracking-widest text-text-muted mb-1">MTN MoMo</div>
              <div className="flex justify-between items-center">
                <span className="text-[20px] font-bold tracking-wider">0598 286 081</span>
                <button 
                  onClick={() => handleCopy("0598286081", "momo")}
                  className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors border border-[rgba(255,255,255,0.05)]"
                >
                  {copied === "momo" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-text-muted" />}
                </button>
              </div>
              <div className="text-xs text-[#818cf8] mt-2 font-medium tracking-wide">Name: Akanzagisi Norbert</div>
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] p-5 rounded-2xl border border-[rgba(255,255,255,0.05)]">
              <div className="text-xs uppercase tracking-widest text-text-muted mb-1">Vodafone Cash</div>
              <div className="flex justify-between items-center">
                <span className="text-[20px] font-bold tracking-wider">0201 234 567</span>
                <button 
                  onClick={() => handleCopy("0201234567", "voda")}
                  className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors border border-[rgba(255,255,255,0.05)]"
                >
                  {copied === "voda" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-text-muted" />}
                </button>
              </div>
              <div className="text-xs text-[#818cf8] mt-2 font-medium tracking-wide">Name: Joyouth Org</div>
            </div>
          </div>
        </div>

        {/* Bank Transfer */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-glass-border pb-4">
            <Building2 className="text-[#6366f1]" /> Bank Transfer
          </h3>
          
          <div className="space-y-4 text-gray-300">
            <div className="bg-[rgba(255,255,255,0.02)] p-5 rounded-2xl border border-[rgba(255,255,255,0.05)]">
              <div className="grid grid-cols-3 gap-2 mb-3 items-center">
                <span className="text-xs tracking-widest uppercase text-text-muted">Bank Name</span>
                <span className="col-span-2 font-bold text-white tracking-wide">Ecobank Ghana</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3 items-center">
                <span className="text-xs tracking-widest uppercase text-text-muted">Account Name</span>
                <span className="col-span-2 font-bold text-white tracking-wide">Joyouth Organization</span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-xs tracking-widest uppercase text-text-muted shrink-0">Account No.</span>
                <div className="col-span-2 flex justify-between items-center">
                  <span className="font-bold tracking-wider text-white text-[16px]">1234567890123</span>
                  <button 
                    onClick={() => handleCopy("1234567890123", "bank")}
                    className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors border border-[rgba(255,255,255,0.05)]"
                  >
                    {copied === "bank" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-text-muted" />}
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-text-muted italic text-center mt-6">
              For international transfers or specific sponsorship packages, please contact us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
