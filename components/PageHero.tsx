type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,120,180,0.2),transparent_45%),linear-gradient(135deg,#edf4fa_0%,#f8f7f3_50%,#efe6da_100%)]" />
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${image})` }} />
      <div className="relative mx-auto grid max-w-[1600px] gap-10 px-4 pb-20 pt-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">{eyebrow}</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-slate-900 md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">{description}</p>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-3 shadow-[0_30px_80px_rgba(12,59,89,0.14)] backdrop-blur-md">
          <img src={image} alt={title} className="h-[440px] w-full rounded-[1.5rem] object-cover" />
        </div>
      </div>
    </section>
  );
}
