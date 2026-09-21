"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Trophy, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CinematicLearningJourney } from "@/components/CinematicLearningJourney";
import { HeroFeatureSection } from "@/components/HeroFeatureSection";
import { SchoolStoryCinematic } from "@/components/SchoolStoryCinematic";
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

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const aboutViewportRef = useRef<HTMLDivElement | null>(null);
  const aboutTitleRef = useRef<HTMLDivElement | null>(null);
  const aboutImageWrapRef = useRef<HTMLDivElement | null>(null);
  const aboutTextRef = useRef<HTMLDivElement | null>(null);
  const aboutRevealRefs = useRef<(HTMLElement | null)[]>([]);
  const learningSectionRef = useRef<HTMLElement | null>(null);
  const learningViewportRef = useRef<HTMLDivElement | null>(null);
  const learningCardRefs = useRef<(HTMLElement | null)[]>([]);
  const learningDetailRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = aboutSectionRef.current;
    const viewport = aboutViewportRef.current;
    const imageWrap = aboutImageWrapRef.current;
    const title = aboutTitleRef.current;
    const text = aboutTextRef.current;
    const revealBlocks = aboutRevealRefs.current.filter(Boolean) as HTMLElement[];

    if (!section || !viewport || !imageWrap || !title || !text || revealBlocks.length === 0) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === section || trigger.vars.pin === viewport) trigger.kill();
    });

    const titleLabel = title.querySelector("p");
    const titleHeading = title.querySelector("h2");
    const titleLines = titleHeading ? Array.from(titleHeading.querySelectorAll("span")) : [];

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([titleLabel, titleHeading, ...titleLines, imageWrap, ...revealBlocks], { clearProps: "all" });
        gsap.set([titleLabel, titleHeading, ...titleLines], { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(imageWrap, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 });
        gsap.set(revealBlocks, { opacity: 1, x: 0, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set([titleLabel, titleHeading, ...titleLines], { opacity: 0, y: 18, filter: "blur(8px)" });
      gsap.set(revealBlocks, {
        opacity: 0,
        y: 22,
        x: 10,
        filter: "blur(8px)",
        willChange: "transform, opacity, filter",
      });
      gsap.set(imageWrap, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        transformOrigin: "center center",
      });

      const finalImageX = window.innerWidth < 768 ? -110 : -220;

      const aboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          scrub: 1.2,
          pin: viewport,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      aboutTimeline
        .to(imageWrap, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power2.out",
        }, 0)
        .to(imageWrap, {
          x: 0,
          y: 0,
          scale: 0.9,
          rotation: 0,
          duration: 0.9,
          ease: "power2.inOut",
        }, 0.25)
        .to(imageWrap, {
          x: finalImageX,
          y: 0,
          scale: 0.78,
          rotation: 0,
          duration: 1.0,
          ease: "power2.inOut",
        }, 0.65)
        .to(titleLabel, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out",
        }, 1.0)
        .to(titleLines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
        }, 1.25)
        .to(revealBlocks[0], {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power2.out",
        }, 2.0)
        .to(revealBlocks[1], {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power2.out",
        }, 2.5);

      ScrollTrigger.refresh();
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const section = learningSectionRef.current;
    const viewport = learningViewportRef.current;
    const cards = learningCardRefs.current.filter(Boolean) as HTMLElement[];
    const detailBlocks = learningDetailRefs.current.filter(Boolean) as HTMLElement[];

    if (!section || !viewport || cards.length !== academicStages.length || detailBlocks.length !== academicStages.length) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === section || trigger.vars.pin === viewport) trigger.kill();
    });

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(cards, {
          x: 0,
          y: 0,
          z: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          transformPerspective: 1600,
          transformStyle: "preserve-3d",
          clearProps: "transform, filter, opacity",
        });
        gsap.set(detailBlocks, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
        return;
      }

      gsap.set(cards, {
        x: 0,
        y: 22,
        z: -80,
        rotateY: 16,
        scale: 0.82,
        opacity: 0.6,
        transformPerspective: 1600,
        transformStyle: "preserve-3d",
        filter: "blur(0px)",
        willChange: "transform, opacity, filter",
      });

      gsap.set(detailBlocks, {
        opacity: 0,
        y: 22,
        filter: "blur(8px)",
      });

      gsap.set(cards[0], { x: -90, y: 18, z: 80, rotateY: -10, scale: 1.04, opacity: 1, zIndex: 4 });
      gsap.set(cards[1], { x: 90, y: 36, z: -40, rotateY: 14, scale: 0.9, opacity: 0.82, zIndex: 3 });
      gsap.set(cards[2], { x: -110, y: 52, z: -170, rotateY: 18, scale: 0.78, opacity: 0.68, zIndex: 2 });
      gsap.set(cards[3], { x: 120, y: 64, z: -260, rotateY: 20, scale: 0.72, opacity: 0.58, zIndex: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2600",
          scrub: 1.2,
          pin: viewport,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(cards[0], { x: 0, y: 0, z: 160, rotateY: 0, scale: 1.08, opacity: 1, ease: "power2.out" }, 0)
        .to(cards[1], { x: 140, y: 30, z: 40, rotateY: -20, scale: 0.9, opacity: 0.78, ease: "power2.out" }, 0)
        .to(cards[2], { x: -150, y: 48, z: -120, rotateY: 22, scale: 0.8, opacity: 0.7, ease: "power2.out" }, 0)
        .to(cards[3], { x: 0, y: 68, z: -280, rotateY: 24, scale: 0.72, opacity: 0.52, ease: "power2.out" }, 0)
        .fromTo(detailBlocks[0], { opacity: 0, y: 24, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" }, 0.18)
        .to(detailBlocks[0], { opacity: 0, y: -18, filter: "blur(10px)", ease: "power2.in" }, 0.58)

        .to(cards[0], { x: -190, y: 48, z: -140, rotateY: 22, scale: 0.82, opacity: 0.62, ease: "power2.inOut" }, 0.58)
        .to(cards[1], { x: 0, y: 0, z: 170, rotateY: 0, scale: 1.08, opacity: 1, ease: "power2.out" }, 0.58)
        .to(cards[2], { x: 150, y: 30, z: 30, rotateY: -18, scale: 0.9, opacity: 0.76, ease: "power2.out" }, 0.58)
        .to(cards[3], { x: -150, y: 46, z: -180, rotateY: 18, scale: 0.8, opacity: 0.64, ease: "power2.out" }, 0.58)
        .fromTo(detailBlocks[1], { opacity: 0, y: 24, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" }, 0.7)
        .to(detailBlocks[1], { opacity: 0, y: -18, filter: "blur(10px)", ease: "power2.in" }, 1.08)

        .to(cards[0], { x: -240, y: 64, z: -260, rotateY: 24, scale: 0.72, opacity: 0.5, ease: "power2.inOut" }, 1.08)
        .to(cards[1], { x: -180, y: 46, z: -140, rotateY: 20, scale: 0.82, opacity: 0.64, ease: "power2.inOut" }, 1.08)
        .to(cards[2], { x: 0, y: 0, z: 170, rotateY: 0, scale: 1.08, opacity: 1, ease: "power2.out" }, 1.08)
        .to(cards[3], { x: 150, y: 30, z: 26, rotateY: -18, scale: 0.9, opacity: 0.76, ease: "power2.out" }, 1.08)
        .fromTo(detailBlocks[2], { opacity: 0, y: 24, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" }, 1.2)
        .to(detailBlocks[2], { opacity: 0, y: -18, filter: "blur(10px)", ease: "power2.in" }, 1.58)

        .to(cards[0], { x: -260, y: 72, z: -300, rotateY: 26, scale: 0.7, opacity: 0.42, ease: "power2.inOut" }, 1.58)
        .to(cards[1], { x: -210, y: 52, z: -220, rotateY: 22, scale: 0.74, opacity: 0.52, ease: "power2.inOut" }, 1.58)
        .to(cards[2], { x: -170, y: 48, z: -120, rotateY: 20, scale: 0.82, opacity: 0.62, ease: "power2.inOut" }, 1.58)
        .to(cards[3], { x: 0, y: 0, z: 170, rotateY: 0, scale: 1.08, opacity: 1, ease: "power2.out" }, 1.58)
        .fromTo(detailBlocks[3], { opacity: 0, y: 24, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" }, 1.7)
        .to(detailBlocks[3], { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" }, 2.3);

      ScrollTrigger.refresh();
    }, section);

    return () => context.revert();
  }, []);
  return (
    <main className="pt-0">
      <section className="relative isolate overflow-hidden">
        <SchoolOrbitAnimation hero />
      </section>

      <SchoolStoryCinematic />

      <CinematicLearningJourney />

      <HeroFeatureSection />

      <section ref={aboutSectionRef} className="relative z-30 h-[220vh] px-4 md:px-8">
        <div ref={aboutViewportRef} className="sticky top-0 z-40 flex h-screen items-center overflow-hidden bg-[#f5f2eb]">
          <div className="mx-auto grid w-full max-w-[1600px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative flex h-full w-full items-center justify-center">
              <div ref={aboutImageWrapRef} className="relative h-[420px] w-full max-w-[540px] overflow-hidden rounded-[2rem] bg-slate-900 shadow-[0_40px_80px_rgba(15,23,42,0.16)] md:h-[500px]">
                <img src="https://samcbse.org/images/about/text.png" alt="SAM school introduction" className="h-full w-full object-cover object-center" style={{ transform: "rotate(0deg)" }} />
              </div>
            </div>

            <div ref={aboutTextRef} className="relative z-10 flex flex-col justify-center text-slate-700">
              <div ref={aboutTitleRef} className="max-w-xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">About the school</p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900 md:text-5xl">
                  <span className="mb-1 block">A campus built for</span>
                  <span className="mb-1 block">curiosity, confidence, and</span>
                  <span className="block">character.</span>
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">SAM CBSE blends rigorous academics, meaningful co-curricular experiences, and a nurturing environment to help students thrive in every dimension of life.</p>
              </div>

              <div className="mt-8 space-y-6 text-lg leading-8">
                <p ref={(element) => { aboutRevealRefs.current[0] = element; }}>{schoolBrand.about}</p>
                <p ref={(element) => { aboutRevealRefs.current[1] = element; }}>{schoolBrand.mission}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-0 border-y border-slate-200 bg-[#f6f3ef]">
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

      <section ref={learningSectionRef} className="relative z-10 h-[260vh] overflow-hidden bg-[#101a28] text-white">
        <div ref={learningViewportRef} className="sticky top-0 mx-auto flex h-screen max-w-[1600px] items-center justify-center px-4 md:px-8">
          <div className="w-full">
            <div className="mb-10 text-center">
              <SectionTitle eyebrow="Academics" title="Academic stages built for every learner." description="A progressive learner journey guided by care, enquiry, and achievement." align="center" />
            </div>

            <div className="relative mx-auto h-[680px] w-full max-w-[1100px] [perspective:1600px] sm:h-[620px] md:h-[540px]">
              {academicStages.map((stage, index) => (
                <article
                  key={stage.title}
                  ref={(element) => { learningCardRefs.current[index] = element; }}
                  className="absolute left-1/2 top-1/2 w-[min(88vw,700px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] border border-white/15 bg-white/5 shadow-[0_32px_90px_rgba(3,7,18,0.55)] backdrop-blur-sm will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative h-[360px] w-full overflow-hidden sm:h-[380px] md:h-[420px]">
                    <img src={stage.image} alt={stage.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091321]/85 via-[#091321]/20 to-transparent" />
                  </div>

                  <div
                    ref={(element) => { learningDetailRefs.current[index] = element; }}
                    className="p-6 sm:p-7 md:p-8"
                    style={{ opacity: 0, transform: "translateY(22px)", filter: "blur(8px)" }}
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="mt-3 text-2xl font-semibold text-white sm:text-[2rem]">{stage.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-300">{stage.description}</p>
                    <Link href="/academics" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-300">Learn more <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </article>
              ))}
            </div>
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
