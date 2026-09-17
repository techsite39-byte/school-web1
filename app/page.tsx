import Link from "next/link";
import { ArrowRight, Trophy, Users } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { HeroFeatureSection } from "@/components/HeroFeatureSection";
import { SectionTitle } from "@/components/SectionTitle";
import { SchoolOrbitAnimation } from "@/components/SchoolOrbitAnimation";
import {
  academicStages,
  activities,
  admissionSteps,
  facilities,
  galleryItems,
  newsItems,
  schoolBrand,
  schoolJourney,
  stats,
  testimonials,
} from "@/data/site";

export default function HomePage() {
  return (
    <main className="pt-0">
      <section className="relative isolate overflow-hidden">
        <SchoolOrbitAnimation hero />
      </section>

      <HeroFeatureSection />

      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
        <SectionTitle eyebrow="About the school" title="A campus built for curiosity, confidence, and character." description="SAM CBSE blends rigorous academics, meaningful co-curricular experiences, and a nurturing environment to help students thrive in every dimension of life." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] bg-slate-900 p-3 shadow-[0_40px_80px_rgba(15,23,42,0.16)]">
            <img src="https://samcbse.org/images/about/text.png" alt="SAM school introduction" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-700">
            <p>{schoolBrand.about}</p>
            <p>{schoolBrand.mission}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <Users className="mb-3 h-7 w-7 text-sky-700" />
                <h3 className="text-xl font-semibold text-slate-900">Personalized learning</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">An environment designed to support individual strengths, goals, and growth.</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <Trophy className="mb-3 h-7 w-7 text-amber-600" />
                <h3 className="text-xl font-semibold text-slate-900">Holistic excellence</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">Academic achievement is balanced with sports, creativity, and leadership.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f6f3ef]">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
        <SectionTitle eyebrow="Our journey" title="From foundation to future-ready learning." />
        <div className="mt-12 relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-300 md:block" />
          <div className="space-y-10">
            {schoolJourney.map((item, index) => (
              <div key={item.year} className="grid gap-6 md:grid-cols-2 md:items-center">
                <div className={index % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}>
                  <div className="inline-flex items-center gap-3">
                    <span className="hidden h-4 w-4 rounded-full bg-[#0c3b59] md:block" />
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">{item.year}</p>
                  </div>
                </div>
                <div className={index % 2 === 0 ? "md:col-start-2 md:pl-12" : "md:col-start-1 md:pr-12 md:text-right"}>
                  <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <p className="text-lg leading-8 text-slate-700">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101a28] text-white">
        <div className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
          <SectionTitle eyebrow="Academics" title="Academic stages built for every learner." description="A progressive learner journey guided by care, enquiry, and achievement." align="center" />
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {academicStages.map((stage) => (
              <article key={stage.title} className="group overflow-hidden rounded-[2rem] bg-white/5 ring-1 ring-white/10">
                <img src={stage.image} alt={stage.title} className="h-64 w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">{stage.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">{stage.description}</p>
                  <Link href="/academics" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-300">Learn more <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
        <SectionTitle eyebrow="Facilities" title="A campus designed for discovery and performance." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {facilities.map((facility) => (
            <article key={facility.name} className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
              <div className="overflow-hidden">
                <img src={facility.image} alt={facility.name} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Facility</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">{facility.name}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{facility.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f3efe8]">
        <div className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
          <SectionTitle eyebrow="Student life" title="Activities that bring learning to life." />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {activities.map((activity) => (
              <div key={activity.title} className="grid overflow-hidden rounded-[2rem] bg-white md:grid-cols-[1fr_1.1fr]">
                <img src={activity.image} alt={activity.title} className="h-full min-h-[260px] w-full object-cover" />
                <div className="flex flex-col justify-center p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Activity</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">{activity.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
        <SectionTitle eyebrow="News & events" title="Stories from campus life and achievement." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.title} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{item.date}</p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight text-slate-900">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{item.summary}</p>
              <a href={item.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-900">View details <ArrowRight className="h-4 w-4" /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#0d1b2a] text-white">
        <div className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
          <SectionTitle eyebrow="Gallery" title="Moments from campus, culture, and achievement." description="The school’s visual story comes alive through classrooms, students, events, and sporting excellence." align="center" />
          <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3">
            {galleryItems.map((item, index) => (
              <div key={item.title} className={`group relative overflow-hidden rounded-[2rem] ${index % 2 === 0 ? "md:row-span-2" : ""}`}>
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/0 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Gallery</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
        <SectionTitle eyebrow="Testimonials" title="Families trust the SAM experience." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 text-3xl text-sky-700">“</div>
              <p className="text-lg leading-8 text-slate-700">{item.quote}</p>
              <div className="mt-8 border-t border-slate-200 pt-5">
                <div className="font-semibold text-slate-900">{item.name}</div>
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f4f1ea]">
        <div className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
          <div className="grid gap-8 rounded-[2.5rem] bg-[#dfeaf2] p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Admissions</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-900 md:text-5xl">Begin your child’s journey at SAM CBSE.</h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-700">A clear and supported admissions process designed around enquiry, guidance, and confident first steps.</p>
            </div>
            <div className="space-y-4">
              {admissionSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl bg-white/80 p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0c3b59] text-sm font-semibold text-white">{index + 1}</div>
                  <span className="text-base font-medium text-slate-800">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8">
        <SectionTitle eyebrow="Visit us" title="Connect with the school." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 rounded-[2rem] bg-slate-900 p-8 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Address</p>
              <p className="mt-3 text-lg leading-8 text-slate-200">{schoolBrand.location}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Phone</p>
              <p className="mt-3 text-lg text-slate-200">{schoolBrand.phone}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Email</p>
              <p className="mt-3 text-lg text-slate-200">{schoolBrand.email}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 text-sm leading-7 text-slate-300">{schoolBrand.affiliation}</div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">Name<input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
                <label className="block text-sm font-medium text-slate-700">Phone<input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              </div>
              <label className="block text-sm font-medium text-slate-700">Email<input type="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              <label className="block text-sm font-medium text-slate-700">Message<textarea rows={5} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-[#0c3b59] px-5 py-3 text-sm font-medium text-white">Send enquiry <ArrowRight className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
