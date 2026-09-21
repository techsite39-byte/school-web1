"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    number: "01",
    title: "ACADEMICS",
    description: "Building strong foundations through meaningful learning.",
    image: "/academics.png",
    alt: "Students learning in a classroom",
  },
  {
    number: "02",
    title: "SPORTS",
    description: "Energy, teamwork and the spirit to go further.",
    image: "/sports.png",
    alt: "Students playing basketball in a sports hall",
  },
  {
    number: "03",
    title: "CREATIVITY",
    description: "Imagine boldly. Create freely.",
    image: "/creativity.png",
    alt: "Students expressing creativity",
  },
  {
    number: "04",
    title: "TECHNOLOGY",
    description: "Preparing young minds for a changing world.",
    image: "/technology.png",
    alt: "Students learning with technology",
  },
];

export function CinematicLearningJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const intro = introRef.current;
    const background = backgroundRef.current;
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !stage || !intro || !background || panels.length !== scenes.length) return;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(intro, { opacity: 1, y: 0 });
        gsap.set(background, { scale: 1, y: 0, filter: "saturate(1) brightness(1)" });
        gsap.set(panels, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, rotationY: 0, rotationX: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set(stage, { perspective: 1800, transformStyle: "preserve-3d" });
      gsap.set(background, {
        scale: 1.12,
        yPercent: 4,
        filter: "saturate(0.9) brightness(0.68)",
        transformOrigin: "center center",
      });
      gsap.set(intro, { opacity: 1, y: 0 });

      panels.forEach((panel, index) => {
        const startOffset = (index - 1.5) * 18;
        gsap.set(panel, {
          opacity: 0,
          x: startOffset,
          y: 150 + index * 26,
          scale: 0.72,
          rotation: startOffset * 0.2,
          rotationY: 18 - index * 5,
          rotationX: 8,
          filter: "blur(8px)",
          zIndex: 10 + index,
          transformPerspective: 1800,
          transformStyle: "preserve-3d",
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: stage,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(intro, { opacity: 0.15, y: -24, duration: 0.7, ease: "power2.inOut" }, 0.2);
      timeline.to(background, { scale: 1.05, yPercent: 2, duration: 2.4, ease: "none" }, 0);

      panels.forEach((panel, index) => {
        const start = 0.25 + index * 0.9;

        timeline
          .to(panel, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            rotationY: 0,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power3.out",
          }, start)
          .to(panel, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: "power1.out",
          }, start + 0.7)
          .to(panel, {
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "power2.out",
          }, start + 0.95);
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[260vh] overflow-hidden bg-[#050b14] text-white">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden bg-[#050b14]">
        <img
          ref={backgroundRef}
          src="/school2.png"
          alt="School building background"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ filter: "saturate(0.92) brightness(0.72) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,15,24,0.18),rgba(3,7,15,0.68)_72%,rgba(3,7,15,0.86))]" />

        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
          <div ref={introRef}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-cyan-100/80">A cinematic journey through school life</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-white md:text-7xl">BEYOND THE CLASSROOM</h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-200">Learning, discovering, creating and growing.</p>
          </div>
        </div>

        <div className="absolute inset-0 z-30 flex items-center justify-center px-4 md:px-8">
          <div className="flex w-full max-w-[1280px] items-center justify-center gap-3 md:gap-5 xl:gap-6">
            {scenes.map((scene, index) => (
              <div
                key={scene.title}
                ref={(element) => {
                  panelRefs.current[index] = element;
                }}
                className="group relative h-[68vh] w-[22%] min-w-[180px] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-[2px]"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.38)",
                }}
              >
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-[#020b14]/75 via-[#020b14]/15 to-transparent" />
                <img
                  src={scene.image}
                  alt={scene.alt}
                  className="h-full w-full object-cover"
                  style={{ filter: "contrast(1.04) saturate(0.95) brightness(0.98)" }}
                />
                <div className="absolute inset-x-0 bottom-0 rounded-b-[28px] bg-gradient-to-t from-[#020b14]/90 via-[#020b14]/45 to-transparent p-4 md:p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-cyan-100/80">{scene.number}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.05em] text-white md:text-2xl">{scene.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200/90 md:text-base">{scene.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
