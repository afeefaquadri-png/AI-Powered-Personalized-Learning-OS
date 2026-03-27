import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export default function StatCard({ value, label, icon, color }: StatCardProps) {
  return (
    <div className="bg-[#0d1424] border border-white/[0.07] rounded-2xl p-5 flex items-center gap-4">
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", color)}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white leading-none">{value}</p>
        <p className="text-xs text-white/40 mt-1 font-medium">{label}</p>
      </div>
    </div>
  );
}
