"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { schoolBrand } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const studentImage = "/sschool-boy.png";
const schoolImage = "/school.png";
const schoolAlternateImage = "/school2.png";

export function SchoolOrbitAnimation({ hero = false }: { hero?: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const studentRef = useRef<HTMLDivElement | null>(null);
  const studentImageRef = useRef<HTMLImageElement | null>(null);
  const schoolRef = useRef<HTMLDivElement | null>(null);
  const schoolAlternateRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      lerp: 0.08,
    });

    let rafId = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const student = studentRef.current;
    const studentImage = studentImageRef.current;
    const school = schoolRef.current;
    const schoolAlt = schoolAlternateRef.current;
    const text = textRef.current;
    const orbit = orbitRef.current;

    if (!section || !student || !studentImage || !school || !schoolAlt || !text || !orbit) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set([student, school, orbit], { clearProps: "all" });
      gsap.set(text, { opacity: 1 });
      gsap.set(student, { scale: 1.08 });
      gsap.set(school, { opacity: 1, scale: 1.02 });
      return;
    }

    const words = text.querySelectorAll(".hero-word");
    const actions = text.querySelectorAll(".hero-cta");
    const altCopy = text.querySelectorAll(".hero-alt-copy");
    const eyeFocus = { x: 0.62, y: 0.23 };
    const camera = { progress: 0, scale: 1, x: 0, y: 0 };

    const updateEyeCamera = () => {
      const viewportCenterX = window.innerWidth * 0.5;
      const viewportCenterY = window.innerHeight * 0.5;
      const scale = 1 + camera.progress * 8.6;

      const eyeScreenX = window.innerWidth * eyeFocus.x;
      const eyeScreenY = window.innerHeight * eyeFocus.y;
      const x = (viewportCenterX - eyeScreenX) * (scale - 1);
      const y = (viewportCenterY - eyeScreenY) * (scale - 1);

      camera.scale = scale;
      camera.x = x;
      camera.y = y;

      gsap.set(studentImage, {
        scale,
        x,
        y,
        force3D: true,
        transformOrigin: "center center",
      });
    };

    gsap.set(student, {
      opacity: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0% round 0%)",
    });

    gsap.set(studentImage, {
      scale: 1,
      x: 0,
      y: 0,
      transformOrigin: "center center",
    });

    gsap.set(school, {
      opacity: 0,
      scale: 1.18,
      x: 0,
      y: 0,
      filter: "blur(18px)",
      clipPath: "inset(18% 18% 18% 18% round 6%)",
    });

    gsap.set(schoolAlt, {
      opacity: 0,
      scale: 1.12,
      filter: "blur(18px)",
      clipPath: "inset(8% 8% 8% 8% round 0%)",
    });

    gsap.set(orbit, { opacity: 0, scale: 0.9 });
    gsap.set(words, { opacity: 0, y: 42, filter: "blur(10px)" });
    gsap.set(altCopy, { opacity: 0, y: 20, filter: "blur(10px)" });
    gsap.set(actions, { opacity: 0, y: 28, filter: "blur(10px)" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    timeline
      .to(camera, {
        progress: 1.25,
        ease: "none",
        duration: 2.4,
        onUpdate: updateEyeCamera,
      }, 0)
      .to(student, {
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.55,
        ease: "power2.inOut",
      }, 2.05)
      .to(school, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        clipPath: "inset(0% 0% 0% 0% round 0%)",
        duration: 0.9,
        ease: "power2.inOut",
      }, 2.05)
      .to(schoolAlt, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        clipPath: "inset(0% 0% 0% 0% round 0%)",
        duration: 1.3,
        ease: "power2.inOut",
      }, 3.05)
      .to(text, {
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
      }, 3.35)
      .to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.12,
        duration: 0.9,
        ease: "power2.out",
      }, 3.5)
      .to(altCopy, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out",
      }, 3.95)
      .to(actions, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.12,
        duration: 0.9,
        ease: "power2.out",
      }, 4.1)
      .to(orbit, {
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: "power2.out",
      }, 4.55)
      .to(text, {
        boxShadow: "0 0 80px rgba(255,255,255,0.1)",
        duration: 0.7,
      }, 4.9)
      .to(student, {
        opacity: 0,
        duration: 0.4,
      }, 5.1)
      .to(words, {
        opacity: 0,
        y: -18,
        filter: "blur(12px)",
        stagger: 0.04,
        duration: 0.7,
        ease: "power2.in",
      }, 5.3)
      .to(altCopy, {
        opacity: 0,
        y: -14,
        filter: "blur(12px)",
        duration: 0.7,
        ease: "power2.in",
      }, 5.38)
      .to(actions, {
        opacity: 0,
        y: -12,
        filter: "blur(12px)",
        stagger: 0.04,
        duration: 0.7,
        ease: "power2.in",
      }, 5.46)
      .to(schoolAlt, {
        opacity: 0,
        filter: "blur(18px)",
        scale: 1.08,
        duration: 0.8,
        ease: "power2.in",
      }, 5.55)
      .to(school, {
        opacity: 0,
        filter: "blur(18px)",
        scale: 1.08,
        duration: 0.8,
        ease: "power2.in",
      }, 5.7)
      .call(() => {
        gsap.set(text, { opacity: 0, visibility: "hidden" });
        gsap.set([words, altCopy, actions], { opacity: 0, y: 0, filter: "blur(0px)" });
      }, undefined, 5.9);

    window.addEventListener("resize", updateEyeCamera);

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      window.removeEventListener("resize", updateEyeCamera);
    };
  }, [hero]);

  return (
    <section
      ref={sectionRef}
      className={hero ? "relative h-[180vh] w-full overflow-hidden bg-[#040b16]" : "relative h-[540px] w-full overflow-hidden bg-[#040b16]"}
      aria-label="Cinematic school hero"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#040b16]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(95,124,167,0.28),transparent_30%),linear-gradient(180deg,rgba(5,10,18,0.15),rgba(5,10,18,0.6))]" />

        <div className="absolute inset-0 overflow-hidden">
          <div ref={studentRef} className="absolute inset-0 z-10 flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(112,142,191,0.32),rgba(10,15,24,0.9)_62%)]">
            <img
              ref={studentImageRef}
              src={studentImage}
              alt="Student portrait"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                const parent = event.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = "radial-gradient(circle at center, rgba(32,52,72,0.72), rgba(5,10,16,1))";
                }
              }}
              className="h-full w-full object-cover"
              style={{
                objectPosition: "58% 27%",
                filter: "saturate(0.9) contrast(1.06) brightness(0.9)",
              }}
            />
          </div>

          <div ref={schoolRef} className="absolute inset-0 z-0">
            <img
              src={schoolImage}
              alt="School campus"
              className="h-full w-full object-cover object-center"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                const parent = event.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = "radial-gradient(circle at center, rgba(10,20,36,0.75), rgba(2,6,18,1))";
                }
              }}
              style={{
                filter: "contrast(1.08) saturate(0.92) brightness(0.9)",
                transformOrigin: "center center",
              }}
            />
          </div>

          <div ref={schoolAlternateRef} className="absolute inset-0 z-0 opacity-0">
            <img
              src={schoolAlternateImage}
              alt="School campus second view"
              className="h-full w-full object-cover object-center"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                const parent = event.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = "radial-gradient(circle at center, rgba(10,20,36,0.75), rgba(2,6,18,1))";
                }
              }}
              style={{
                filter: "contrast(1.08) saturate(0.92) brightness(0.9)",
                transformOrigin: "center center",
              }}
            />
          </div>

          <div ref={orbitRef} className="absolute inset-0 opacity-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(11,18,33,0.34),transparent_42%)]" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,18,0.2),rgba(2,6,18,0.66))]" />

        <div ref={textRef} className="relative z-20 flex h-full items-center justify-center px-5 text-center text-white md:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="hero-badge mb-6 inline-flex rounded-full border border-white/18 bg-white/7 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.38em] text-sky-100/90 backdrop-blur-sm">
              {schoolBrand.name}
            </div>

            <h1 className="text-4xl font-semibold leading-[0.9] tracking-[-0.06em] md:text-6xl lg:text-7xl">
              <span className="hero-word inline-block">World-class</span>{" "}
              <span className="hero-word inline-block">education</span>{" "}
              <span className="hero-word inline-block">rooted in</span>{" "}
              <span className="hero-word inline-block">values</span>
            </h1>

            <p className="hero-summary mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
              {schoolBrand.tagline}
            </p>

            <p className="hero-alt-copy mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-100 md:text-base">
              A vibrant campus where curiosity grows and futures begin.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/admissions" className="hero-cta inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition duration-300 hover:bg-sky-100">
                Apply now
              </a>
              <a href="/about" className="hero-cta inline-flex items-center justify-center rounded-full border border-white/20 bg-slate-950/25 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-slate-950/40">
                Explore campus
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
