type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900 md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
