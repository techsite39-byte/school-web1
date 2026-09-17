type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = "" }: BrandLogoProps) {
  return (
    <div className={`flex items-center ${compact ? "gap-2.5" : "gap-3"} ${className}`}>
      <div
        className={[
          "relative flex items-center justify-center rounded-full border-4 border-[#f4c95d] bg-[#0b2e4f] shadow-[0_8px_24px_rgba(11,46,79,0.22)]",
          compact ? "h-11 w-11" : "h-14 w-14",
        ].join(" ")}
      >
        <div className="absolute inset-1 rounded-full border-2 border-[#f4d77a]/80" />
        <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_40%),linear-gradient(135deg,#0d3a5c,#0a2340)]" />
        <span
          className={[
            "relative z-10 font-black text-white",
            compact ? "text-[0.7rem] tracking-[-0.09em]" : "text-[0.9rem] tracking-[-0.08em]",
          ].join(" ")}
        >
          SAM
        </span>
      </div>

      <div className="leading-none">
        <div
          className={[
            "font-black uppercase text-slate-700",
            compact ? "text-[7px] tracking-[0.18em]" : "text-[8px] tracking-[0.2em]",
          ].join(" ")}
        >
          Sri Aurobindo Mira
        </div>
        <div
          className={[
            "mt-1 font-black uppercase text-slate-900",
            compact ? "text-[9px] tracking-[0.08em]" : "text-sm tracking-[0.1em]",
          ].join(" ")}
        >
          Universal School
        </div>
      </div>
    </div>
  );
}
