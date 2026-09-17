import { PageHero } from "@/components/PageHero";
import { newsItems } from "@/data/site";

export default function EventsPage() {
  return (
    <main>
      <PageHero
        eyebrow="News & events"
        title="Moments that highlight the life of the school."
        description="Celebrations, milestones, and campus stories bring the SAM community together and showcase the school’s vibrant culture."
        image="https://samcbse.org/images/bg/slider 11.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.title} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-700">{item.date}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">{item.summary}</p>
              <a href={item.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-sm font-medium text-slate-900">View details →</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
