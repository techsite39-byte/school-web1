import { PageHero } from "@/components/PageHero";
import { facilities } from "@/data/site";

export default function FacilitiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Facilities"
        title="Infrastructure that supports innovation, wellness, and performance."
        description="From digital learning spaces to sports and science facilities, the campus is designed to create rich experiences for students."
        image="https://samcbse.org/images/sportsplex/sport4.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {facilities.map((facility) => (
            <article key={facility.name} className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
              <img src={facility.image} alt={facility.name} className="h-72 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-sky-700">Campus feature</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{facility.name}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{facility.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
