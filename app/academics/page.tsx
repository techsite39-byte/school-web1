import { PageHero } from "@/components/PageHero";
import { academicStages } from "@/data/site";
import { ArrowRight } from "lucide-react";

export default function AcademicsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Academics"
        title="Progressive learning from early years to senior levels."
        description="The school’s academic journey is designed to build strong fundamentals, confidence, and excellence across every developmental stage."
        image="https://samcbse.org/images/gallery/s1.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {academicStages.map((stage) => (
            <article key={stage.title} className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
              <img src={stage.image} alt={stage.title} className="h-64 w-full object-cover" />
              <div className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Academic stage</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-900">{stage.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{stage.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-900">Explore program <ArrowRight className="h-4 w-4" /></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
