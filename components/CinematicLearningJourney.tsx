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
    title: "SCIENCE",
    description: "Question. Experiment. Discover.",
    image: "/science.png",
    alt: "Student exploring science in a laboratory",
  },
  {
    number: "03",
    title: "SPORTS",
    description: "Energy, teamwork and the spirit to go further.",
    image: "/sports.png",
    alt: "Students playing basketball in a sports hall",
  },
  {
    number: "04",
    title: "CREATIVITY",
    description: "Imagine boldly. Create freely.",
    image: "/creativity.png",
    alt: "Students expressing creativity",
  },
  {
    number: "05",
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
  const finalRef = useRef<HTMLDivElement | null>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const intro = introRef.current;
    const finalMessage = finalRef.current;
    const sceneElements = sceneRefs.current.filter(Boolean) as HTMLDivElement[];
    const copyElements = copyRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !stage || !intro || !finalMessage || sceneElements.length !== scenes.length || copyElements.length !== scenes.length) return;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(intro, { opacity: 1 });
        gsap.set(sceneElements, { opacity: 0 });
        gsap.set(sceneElements[0], { opacity: 1, clearProps: "transform,filter" });
        gsap.set(copyElements, { opacity: 0 });
        gsap.set(copyElements[0], { opacity: 1, clearProps: "transform" });
        gsap.set(finalMessage, { opacity: 0 });
        return;
      }

      gsap.set(stage, { transformPerspective: 1400 });
      gsap.set(intro, { opacity: 1, y: 0 });
      gsap.set(finalMessage, { opacity: 0, y: 30 });

      sceneElements.forEach((scene, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        gsap.set(scene, {
          opacity: index === 0 ? 0.9 : 0.24,
          scale: index === 0 ? 0.78 : 0.58,
          xPercent: direction * 8,
          yPercent: index === 3 ? 4 : -3,
          rotation: direction * -3,
          filter: index === 0 ? "blur(3px)" : "blur(8px)",
          transformOrigin: "center center",
          force3D: true,
        });
        gsap.set(copyElements[index], { opacity: 0, y: 34, filter: "blur(8px)" });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          pin: stage,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(intro, { opacity: 0, y: -30, duration: 0.55, ease: "power2.inOut" }, 0.1);

      scenes.forEach((scene, index) => {
        const image = sceneElements[index];
        const copy = copyElements[index];
        const start = 0.1 + index * 1.15;
        const direction = index % 2 === 0 ? -1 : 1;

        timeline.to(image, {
          opacity: 1,
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
        }, start);
        timeline.to(copy, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        }, start + 0.48);
        timeline.to(image, {
          yPercent: index === 3 ? -2 : 2,
          rotation: direction * 1,
          duration: 0.45,
          ease: "sine.inOut",
        }, start + 1.05);

        if (index < scenes.length - 1) {
          timeline.to(image, {
            opacity: 0.3,
            scale: 0.58,
            xPercent: direction * -18,
            yPercent: 5,
            rotation: direction * 2,
            filter: "blur(8px)",
            duration: 0.72,
            ease: "power2.inOut",
          }, start + 0.95);
          timeline.to(copy, {
            opacity: 0,
            y: -26,
            filter: "blur(7px)",
            duration: 0.5,
            ease: "power2.inOut",
          }, start + 1.05);
        }
      });

      timeline.to(finalMessage, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 5.75);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[460vh] overflow-x-clip bg-[#050b14] text-white">
      <div ref={stageRef} className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(44,83,113,0.35),transparent_34%),linear-gradient(180deg,#050b14_0%,#071522_52%,#03070d_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(155,190,210,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(155,190,210,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(1,5,11,0.7)_82%)]" />

        <div ref={introRef} className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-cyan-200/75">A cinematic journey through school life</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-white md:text-7xl">BEYOND THE CLASSROOM</h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-300">Learning, discovering, creating and growing.</p>
          </div>
        </div>

        {scenes.map((scene, index) => (
          <div key={scene.title} ref={(element) => { sceneRefs.current[index] = element; }} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
            <img src={scene.image} alt={scene.alt} loading={index === 0 ? "eager" : "lazy"} className="h-full w-full object-cover shadow-[0_35px_100px_rgba(0,0,0,0.42)] [will-change:transform,filter,opacity]" />
          </div>
        ))}

        {scenes.map((scene, index) => (
          <div key={`${scene.title}-copy`} ref={(element) => { copyRefs.current[index] = element; }} className="pointer-events-none absolute inset-x-0 bottom-[10vh] z-30 px-6 text-center md:bottom-[12vh]">
            <p className="text-xs font-semibold tracking-[0.35em] text-cyan-200/80">{scene.number}</p>
            <h3 className="mt-3 text-4xl font-semibold tracking-[-0.05em] md:text-7xl">{scene.title}</h3>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 md:text-lg">{scene.description}</p>
          </div>
        ))}

        <div ref={finalRef} className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-cyan-200/80">Our promise</p>
            <h3 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-8xl">LEARNING TODAY.<br />LEADING TOMORROW.</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
