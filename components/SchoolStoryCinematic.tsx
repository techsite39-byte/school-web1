"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

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

const heroSlides = [
  { image: "/school2.png", title: "The #1", subtitle: "School for\nperformers" },
  { image: "/academics.png", title: "The #1", subtitle: "School for\nlearners" },
  { image: "/sports.png", title: "The #1", subtitle: "School for\nathletes" },
  { image: "/science.png", title: "The #1", subtitle: "School for\ninnovators" },
  { image: "/creativity.png", title: "The #1", subtitle: "School for\ncreators" },
];

export function SchoolStoryCinematic() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const girlWrapRef = useRef<HTMLDivElement | null>(null);
  const girlImageRef = useRef<HTMLImageElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

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

  useEffect(() => {
    const imageNodes = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    const copyNode = contentRef.current;
    const badgeNode = badgeRef.current;

    if (imageNodes.length === 0) return;

    const activeImage = imageNodes[activeSlideIndex];

    imageNodes.forEach((node, index) => {
      const isActive = index === activeSlideIndex;
      gsap.set(node, {
        x: isActive ? 140 : index < activeSlideIndex ? -140 : 160,
        y: isActive ? 18 : 28,
        scale: isActive ? 1.12 : 1.18,
        opacity: isActive ? 1 : 0,
        filter: isActive ? "blur(0px)" : "blur(10px)",
        transformOrigin: "center center",
      });
    });

    if (activeImage) {
      gsap.to(activeImage, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.35,
        ease: "power3.inOut",
      });
    }

    imageNodes.forEach((node, index) => {
      if (index === activeSlideIndex) return;
      gsap.to(node, {
        x: index < activeSlideIndex ? -180 : 180,
        y: 32,
        scale: 1.18,
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut",
        filter: "blur(12px)",
      });
    });

    if (copyNode) {
      gsap.fromTo(
        copyNode,
        { x: 34, y: 28, opacity: 0, filter: "blur(10px)" },
        { x: 0, y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.inOut" }
      );
    }

    if (badgeNode) {
      gsap.fromTo(
        badgeNode,
        { x: 18, y: 18, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1.1, ease: "power3.inOut" }
      );
    }
  }, [activeSlideIndex]);

  const scrollToAbout = () => {
    document.getElementById("about-school")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[100vh] w-full overflow-hidden bg-[#040b16] text-white">
      <div ref={viewportRef} className="sticky top-0 h-[100vh] min-h-[100vh] w-full overflow-hidden bg-[#040b16] sm:h-[100svh] sm:min-h-[100svh]">
        <div ref={backgroundRef} className="absolute inset-0 overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.image}
              ref={(element) => {
                slideRefs.current[index] = element;
              }}
              className="absolute inset-0"
              style={{
                opacity: index === activeSlideIndex ? 1 : 0,
                willChange: "transform, opacity, filter",
              }}
            >
              <img
                src={slide.image}
                alt="School background"
                className="h-full w-full object-cover object-center"
                style={{ filter: "none" }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.45))]" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,190,188,0.18),transparent_38%),linear-gradient(180deg,rgba(1,5,15,0.18),rgba(2,6,23,0.68))]" />

        <div ref={contentRef} className="relative z-20 flex h-full w-full items-end justify-start px-4 pb-[7vh] pt-28 md:px-8 lg:px-16" style={{ willChange: "transform, opacity, filter" }}>
          <div className="max-w-[640px] text-white">
            <div ref={badgeRef} className="mb-5 flex items-center gap-3" style={{ willChange: "transform, opacity" }}>
              <div className="flex -space-x-3">
                <img src="/sschool-boy.png" alt="Student" className="h-14 w-14 rounded-full border-2 border-white/70 object-cover shadow-lg md:h-16 md:w-16" />
                <img src="/graduate-girl.png" alt="Student" className="h-14 w-14 rounded-full border-2 border-white/70 object-cover shadow-lg md:h-16 md:w-16" />
              </div>
            </div>

            <h1 className="text-[clamp(3.25rem,6vw,8rem)] font-black leading-[0.82] tracking-[-0.07em] text-white">
              {heroSlides[activeSlideIndex].title.split(" ").map((part, index) => (
                <span key={index} className={part === "#1" ? "text-[#f5b56b]" : ""}>
                  {index > 0 ? " " : ""}
                  {part}
                  {index === 0 ? " " : ""}
                </span>
              ))}
              <br />
              {heroSlides[activeSlideIndex].subtitle.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index < heroSlides[activeSlideIndex].subtitle.split("\n").length - 1 ? <><br /></> : null}
                </span>
              ))}
            </h1>

            <div className="mt-6 flex max-w-[460px] items-center gap-4 rounded-[22px] border border-white/20 bg-white/5 p-3 backdrop-blur-sm shadow-[0_20px_50px_rgba(2,6,23,0.2)] md:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d7b779] bg-[#0d1a2b] shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                <img src="/school.png" alt="Award badge" className="h-full w-full object-cover" />
              </div>
              <p className="text-[0.72rem] font-semibold uppercase leading-[1.5] tracking-[0.18em] text-[#f4f7fb] md:text-[0.78rem]">
                Awarded 5th in school that creates design thinking leaders
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToAbout}
          className="group absolute bottom-[42px] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-white/90 transition-transform duration-300 hover:scale-[1.02]"
          aria-label="Scroll to about section"
        >
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-slate-100/85">SCROLL</span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/8 text-xl shadow-[0_0_24px_rgba(125,211,252,0.45)] backdrop-blur-sm transition-all duration-300 group-hover:bg-white/12 group-hover:shadow-[0_0_32px_rgba(125,211,252,0.65)]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 animate-bounce">
              <path d="M12 4v12m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
