"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const leftInfo = [
  {
    title: "ACADEMICS",
    body: "Learn today. Lead tomorrow.",
    className: "left-4 top-[18%] md:left-[7%] md:top-[24%]",
  },
  {
    title: "CREATIVITY",
    body: "Imagine. Create. Inspire.",
    className: "left-6 top-[54%] md:left-[10%] md:top-[56%]",
  },
  {
    title: "TECHNOLOGY",
    body: "Learn. Build. Innovate.",
    className: "left-8 bottom-[16%] md:left-[9%] md:bottom-[16%]",
  },
];

const rightInfo = [
  {
    title: "SPORTS",
    body: "Explore. Express. Excel.",
    className: "right-4 top-[20%] md:right-[7%] md:top-[24%]",
  },
  {
    title: "VALUES",
    body: "Build character. Create impact.",
    className: "right-6 top-[54%] md:right-[10%] md:top-[56%]",
  },
  {
    title: "FUTURE READY",
    body: "Skills for a changing world.",
    className: "right-8 bottom-[16%] md:right-[9%] md:bottom-[16%]",
  },
];

export function SchoolStoryCinematic() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const girlWrapRef = useRef<HTMLDivElement | null>(null);
  const girlImageRef = useRef<HTMLImageElement | null>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const background = backgroundRef.current;
    const girlWrap = girlWrapRef.current;
    const girlImage = girlImageRef.current;
    const leftPanels = leftRefs.current.filter(Boolean) as HTMLDivElement[];
    const rightPanels = rightRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !viewport || !background || !girlWrap || !girlImage || leftPanels.length !== leftInfo.length || rightPanels.length !== rightInfo.length) return;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([background, girlWrap, girlImage, leftPanels, rightPanels], { clearProps: "all" });
        gsap.set(girlWrap, { opacity: 1, scale: 1, rotateY: 0, y: 0, x: 0, filter: "blur(0px)" });
        gsap.set(leftPanels, { opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 });
        gsap.set(rightPanels, { opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 });
        return;
      }

      gsap.set(viewport, { perspective: 1800, transformStyle: "preserve-3d" });
      gsap.set(background, { opacity: 1, scale: 1.04, yPercent: 4, filter: "saturate(0.9) brightness(0.72) contrast(1.05)" });
      gsap.set(girlWrap, {
        opacity: 0,
        scale: 0.62,
        y: 180,
        x: 0,
        rotateY: -18,
        rotateX: 4,
        filter: "blur(12px)",
        transformPerspective: 1800,
        transformStyle: "preserve-3d",
      });
      gsap.set(girlImage, { scale: 1, opacity: 1, filter: "none", transformOrigin: "center center", transformPerspective: 1800 });

      leftPanels.forEach((panel) => {
        gsap.set(panel, { opacity: 0.3, x: -40, y: 18, scale: 0.96, filter: "blur(0px)", force3D: true });
      });

      rightPanels.forEach((panel) => {
        gsap.set(panel, { opacity: 0.3, x: 40, y: 18, scale: 0.96, filter: "blur(0px)", force3D: true });
      });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: viewport,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });

      master
        .to(background, { scale: 1.06, yPercent: 8, duration: 4.0, ease: "none" }, 0)
        .to(background, { scale: 1.06, yPercent: 8, duration: 5.0, ease: "none" }, 4.0)
        .to(girlWrap, { opacity: 1, scale: 0.9, y: 40, rotateY: -10, rotateX: 2, filter: "blur(0px)", duration: 1.8, ease: "power3.out" }, 0.35)
        .to(girlWrap, { scale: 1, y: 0, rotateY: 0, rotateX: 0, duration: 2.0, ease: "power2.out" }, 1.8)
        .to(girlWrap, { scale: 1.08, rotateY: 16, rotateX: 2, duration: 2.2, ease: "power2.inOut" }, 3.3)
        .to(girlWrap, { scale: 1.15, rotateY: 28, rotateX: 3, duration: 2.4, ease: "power2.inOut" }, 5.2)
        .to(girlWrap, { scale: 1.2, rotateY: 42, rotateX: 4, duration: 2.8, ease: "power2.inOut" }, 7.2)
        .to(girlWrap, { opacity: 1, y: -14, scale: 1.24, rotateY: 56, rotateX: 5, duration: 3.0, ease: "power2.inOut" }, 9.5)
        .to(girlWrap, { opacity: 0, y: -30, scale: 1.26, rotateY: 68, rotateX: 5, duration: 2.0, ease: "power2.in" }, 12.1);

      leftPanels.forEach((panel, index) => {
        const start = 0.62 + index * 0.38;
        master
          .to(panel, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }, start)
          .to(panel, { opacity: 1, x: 0, y: 0, scale: 1, duration: 2.2 }, start + 1.2);
      });

      rightPanels.forEach((panel, index) => {
        const start = 0.68 + index * 0.38;
        master
          .to(panel, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }, start)
          .to(panel, { opacity: 1, x: 0, y: 0, scale: 1, duration: 2.2 }, start + 1.2);
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#040b16] text-white">
      <div ref={viewportRef} className="sticky top-0 h-screen w-full overflow-hidden bg-[#040b16]">
        <div ref={backgroundRef} className="absolute inset-0 overflow-hidden">
          <img
            src="/school2.png"
            alt="School building"
            className="h-full w-full object-cover object-center"
            style={{ filter: "saturate(0.9) brightness(0.72) contrast(1.06)" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,64,175,0.12),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.15),rgba(2,6,23,0.82))]" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,5,15,0.18),rgba(2,6,23,0.78))]" />

        <div className="absolute inset-0 z-10 flex items-center justify-center [perspective:1800px]">
          <div ref={girlWrapRef} className="relative flex h-[72vh] w-[clamp(240px,30vw,460px)] items-center justify-center [transform-style:preserve-3d]">
            <div className="absolute inset-6 rounded-[42%] bg-[radial-gradient(circle,_rgba(125,211,252,0.18),transparent_68%)] blur-3xl" />
            <img
              ref={girlImageRef}
              src="/graduate-girl.png"
              alt="Graduate girl"
              className="relative h-full w-full object-contain object-center opacity-100 [transform:translateZ(60px)] drop-shadow-[0_35px_80px_rgba(0,0,0,0.46)]"
              style={{ filter: "none", opacity: 1, visibility: "visible" }}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="absolute inset-y-0 left-0 hidden w-[28%] items-center justify-center md:flex">
            <div className="relative h-full w-full">
              {leftInfo.map((item, index) => (
                <div
                  key={item.title}
                  ref={(element) => {
                    leftRefs.current[index] = element;
                  }}
                  className={`absolute max-w-[260px] rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.3)] backdrop-blur-md ${item.className}`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-sky-100/80">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100 md:text-base">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 hidden w-[28%] items-center justify-center md:flex">
            <div className="relative h-full w-full">
              {rightInfo.map((item, index) => (
                <div
                  key={item.title}
                  ref={(element) => {
                    rightRefs.current[index] = element;
                  }}
                  className={`absolute max-w-[260px] rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.3)] backdrop-blur-md ${item.className}`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-sky-100/80">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100 md:text-base">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-x-4 bottom-8 z-30 flex flex-col gap-3 md:hidden">
            {[...leftInfo, ...rightInfo].map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-2xl border border-white/10 bg-slate-950/30 px-3 py-2 shadow-[0_18px_40px_rgba(2,6,23,0.3)] backdrop-blur-md"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-sky-100/80">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-100">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
