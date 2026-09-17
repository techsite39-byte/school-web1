import { PageHero } from "@/components/PageHero";
import { schoolBrand } from "@/data/site";
import { ArrowRight, Compass, HeartHandshake, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About SAM"
        title="A school built on values, vision, and world-class learning."
        description="Sri Aurobindo Mira Universal School brings together personal attention, academic rigor, and a vibrant campus environment designed to shape confident learners."
        image="https://samcbse.org/images/about/1.png"
      />

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">School story</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-900 md:text-5xl">Where learning is deeply personal.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">{schoolBrand.about}</p>
            <p className="mt-5 text-lg leading-8 text-slate-700">{schoolBrand.mission}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[2rem] bg-[#dfeaf2] p-6">
              <Compass className="h-8 w-8 text-sky-700" />
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">Vision</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">{schoolBrand.vision}</p>
            </div>
            <div className="rounded-[2rem] bg-[#f6f0e9] p-6">
              <HeartHandshake className="h-8 w-8 text-amber-600" />
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">Values</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">Discipline, empathy, integrity, creativity, and responsibility guide every learner.</p>
            </div>
            <div className="rounded-[2rem] bg-slate-900 p-6 text-white md:col-span-2">
              <Sparkles className="h-8 w-8 text-sky-300" />
              <h3 className="mt-4 text-2xl font-semibold">Learner outcomes</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">Students leave with confidence, intellectual strength, leadership potential, and a commitment to lifelong learning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#101a28] text-white">
        <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Academic environment</p>
              <h3 className="mt-4 text-2xl font-semibold">Friendly, structured, inspiring.</h3>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Student focus</p>
              <h3 className="mt-4 text-2xl font-semibold">Personalized guidance and growth.</h3>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Future readiness</p>
              <h3 className="mt-4 text-2xl font-semibold">Leadership, confidence, and capability.</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
