"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SchoolHero.module.css";

const slides = [
  { eyebrow: "OUR SCHOOL", title: "SCHOOL", description: "A vibrant learning community built around purpose, character and meaningful discovery.", image: "/school.png" },
  { eyebrow: "MAIN CAMPUS", title: "MAIN CAMPUS", description: "A welcoming environment where students are inspired to learn, lead and grow with confidence.", image: "/building1.png" },
  { eyebrow: "SCIENCE", title: "DISCOVERY LAB", description: "Hands-on inquiry helps students explore ideas, test theories and connect concepts to real life.", image: "/science.png" },
  { eyebrow: "SPORTS", title: "ACTIVE MINDS", description: "Space to build teamwork, discipline and confidence through movement, play and shared achievement.", image: "/sports.png" },
] as const;

const TOTAL_STAGES = 25;
type Phase = "landing" | "hero" | "carousel" | "front" | "frontHold" | "returnWithText" | "textHold" | "frontAgain" | "frontAgainHold" | "advance" | "complete" | "explore";

export function SchoolHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);
  const lockedRef = useRef(false);
  const completedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const nextIndexRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("landing");
  const [isLocked, setIsLocked] = useState(false);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const isHeroActive = () => {
      const bounds = node.getBoundingClientRect();
      return bounds.top <= 12 && bounds.bottom >= window.innerHeight - 12;
    };

    const runAutomaticCycle = () => {
      setPhase("front");
      timersRef.current.push(window.setTimeout(() => setPhase("frontHold"), 1200));
      timersRef.current.push(window.setTimeout(() => setPhase("returnWithText"), 3200));
      timersRef.current.push(window.setTimeout(() => setPhase("textHold"), 4400));
      timersRef.current.push(window.setTimeout(() => setPhase("frontAgain"), 5400));
      timersRef.current.push(window.setTimeout(() => setPhase("frontAgainHold"), 6600));
      timersRef.current.push(window.setTimeout(() => {
        if (activeIndexRef.current === slides.length - 1) {
          completedRef.current = true;
          lockedRef.current = false;
          setIsLocked(false);
          return;
        }

        nextIndexRef.current = activeIndexRef.current + 1;
        setPhase("advance");
        timersRef.current.push(window.setTimeout(() => {
          const nextIndex = nextIndexRef.current;
          if (nextIndex === null) return;
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
          nextIndexRef.current = null;
          setPhase("carousel");
          timersRef.current.push(window.setTimeout(runAutomaticCycle, 1000));
        }, 1200));
      }, 8600));
    };

    const startAutomaticSequence = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      lockedRef.current = true;
      setIsLocked(true);
      clearTimers();
      setPhase("carousel");
      timersRef.current.push(window.setTimeout(runAutomaticCycle, 1000));
    };

    const onWheel = (event: WheelEvent) => {
      if (!isHeroActive() || event.deltaY <= 8) return;
      if (completedRef.current) return;
      event.preventDefault();
      startAutomaticSequence();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStartRef.current;
      const end = event.changedTouches[0]?.clientY;
      touchStartRef.current = null;
      if (start === null || end === undefined || start - end < 36 || !isHeroActive()) return;
      if (completedRef.current) return;
      event.preventDefault();
      startAutomaticSequence();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      clearTimers();
    };
  }, []);

  const renderedIndex = activeIndex;
  const previousIndex = (renderedIndex - 1 + slides.length) % slides.length;
  const nextIndex = (renderedIndex + 1) % slides.length;
  const activeSlide = slides[renderedIndex];
  const previousSlide = slides[previousIndex];
  const nextSlide = slides[nextIndex];
  const displayedPhase = phase;
  const textVisible = phase === "returnWithText" || phase === "textHold";
  const fullImage = phase === "front" || phase === "frontHold" || phase === "frontAgain" || phase === "frontAgainHold";

  return (
    <section ref={heroRef} className={`${styles.heroSequence} ${styles[`phase-${displayedPhase}`]}`} style={{ "--hero-stages": TOTAL_STAGES } as React.CSSProperties} aria-label="School highlights">
      <div className={styles.heroViewport}>
        <div className={styles.landingHero} aria-hidden={phase !== "landing"}>
          <img className={styles.landingImage} src="/school2.png" alt="Sri Aurobindo Mira Universal School campus" />
          <div className={styles.landingOverlay} />
          <div className={styles.landingContent}>
            <img className={styles.landingLogo} src="/logo.svg" alt="Sri Aurobindo Mira Universal School logo" />
            <p className={styles.landingEyebrow}>SRI AUROBINDO MIRA</p>
            <h1>UNIVERSAL SCHOOL</h1>
          </div>
        </div>
        <div className={styles.heroAtmosphere} aria-hidden="true" />
        <div className={`${styles.heroCopy} ${textVisible ? styles.showCopy : styles.hideCopy}`}>
          <span className={styles.eyebrow}>{activeSlide.eyebrow}</span>
          <h1>{activeSlide.title}</h1>
          <p>{activeSlide.description}</p>
          <button
            type="button"
            className={styles.storyButton}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setPhase("explore");
            }}
          >
            Explore campus
          </button>
        </div>
        <div className={`${styles.carousel} ${fullImage ? styles.carouselFull : ""}`} aria-live="polite">
          <figure className={`${styles.imageCard} ${styles.previousCard}`}><img src={previousSlide.image} alt="" /></figure>
          <figure className={`${styles.imageCard} ${styles.activeCard}`}><img src={activeSlide.image} alt={activeSlide.title} /></figure>
          <figure className={`${styles.imageCard} ${styles.nextCard}`}><img src={nextSlide.image} alt="" /></figure>
        </div>
        <div className={styles.heroMeta}>
          <span className={styles.counter}>{String(renderedIndex + 1).padStart(2, "0")} <i>/</i> {String(slides.length).padStart(2, "0")}</span>
          <span className={styles.progressTrack}><span style={{ width: `${((renderedIndex + (phase === "complete" ? 1 : 0)) / slides.length) * 100}%` }} /></span>
          <span className={styles.scrollHint}>{isLocked ? "Discovering" : "Scroll to explore"}</span>
        </div>
      </div>
    </section>
  );
}