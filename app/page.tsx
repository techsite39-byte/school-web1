"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen, ChevronRight, Globe, Trophy, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CinematicScrollReveal } from "@/components/CinematicScrollReveal";
import { SchoolStoryCinematic } from "@/components/SchoolStoryCinematic";
import { SectionTitle } from "@/components/SectionTitle";
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

const schoolHeroSlides = [
  {
    id: "campus",
    smallTitle: "OUR CAMPUS",
    eyebrow: "Campus life",
    title: "MAIN CAMPUS",
    description:
      "Discover our beautiful campus, modern classrooms and inspiring learning environment.",
    image: "https://samcbse.org/images/bg/slider22.jpg",
    previous: "SPORTS",
    next: "CLASSROOMS",
  },
  {
    id: "classroom",
    smallTitle: "ADMINISTRATION",
    eyebrow: "Smart learning",
    title: "ADMIN BLOCK",
    description:
      "A welcoming administrative space designed to support students, teachers and parents throughout their school journey.",
    image: "https://samcbse.org/images/gallery/11.jpg",
    previous: "MAIN CAMPUS",
    next: "SCIENCE BLOCK",
  },
  {
    id: "sports",
    smallTitle: "LEARNING",
    eyebrow: "Wellness",
    title: "CLASSROOMS",
    description:
      "Spacious and inspiring classrooms designed to create an interactive and focused learning experience for every student.",
    image: "https://samcbse.org/images/sportsplex/sport4.jpg",
    previous: "ADMIN BLOCK",
    next: "LABORATORY",
  },
  {
    id: "science",
    smallTitle: "PRACTICAL LEARNING",
    eyebrow: "Discovery",
    title: "LABORATORY",
    description:
      "Modern practical learning spaces where students can explore concepts through experiments and hands-on activities.",
    image: "https://samcbse.org/images/gallery/s3.jpg",
    previous: "CLASSROOMS",
    next: "SPORTS",
  },
  {
    id: "culture",
    smallTitle: "STUDENT LIFE",
    eyebrow: "Community",
    title: "SPORTS",
    description:
      "Dedicated sports spaces that encourage teamwork, discipline, confidence and an active student lifestyle.",
    image: "https://samcbse.org/images/gallery/10.jpg",
    previous: "LABORATORY",
    next: "MAIN CAMPUS",
  },
];

function PlanetHeroAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const getWrappedIndex = (index: number) => (index + schoolHeroSlides.length) % schoolHeroSlides.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => getWrappedIndex(prev + 1));
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const prevSlide = schoolHeroSlides[getWrappedIndex(activeIndex - 1)];
  const activeSlide = schoolHeroSlides[activeIndex];
  const nextSlide = schoolHeroSlides[getWrappedIndex(activeIndex + 1)];

  return (
    <section className="school-hero" id="schoolHero">
      <div className="hero-shell">
        <header className="hero-topbar">
          <div className="school-brand-mark" aria-label="Sri Aurobindo Mira Universal School">
            <span className="brand-badge">
              <span className="brand-badge-inner" />
            </span>
            <div className="brand-copy">
              <span className="brand-main">SRI AUROBINDO MIRA</span>
              <span className="brand-sub">UNIVERSAL SCHOOL</span>
            </div>
          </div>

          <div className="hero-top-actions">
            <span className="phone-tag">☎ +91 9047077677</span>
            <button type="button" className="apply-button">Apply Now</button>
            <button type="button" className="menu-button" aria-label="Open navigation">
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <div className="hero-stage">
          <div className="hero-floating-copy">
            <span className="spotlight-hover">Disc</span>
            <span className="cta-pill">EXPLORE CAMPUS</span>
            <span className="spotlight-hover">Home</span>
          </div>

          <div className="campus-orbit" aria-label="Campus carousel">
            <div className="campus-background-circle" />

            <div className="campus-image campus-image-left">
              <img src={prevSlide.image} alt={prevSlide.title} />
            </div>

            <div className="campus-image campus-image-center">
              <img src={activeSlide.image} alt={activeSlide.title} />
            </div>

            <div className="campus-image campus-image-right">
              <img src={nextSlide.image} alt={nextSlide.title} />
            </div>
          </div>
        </div>

        <div className="hero-footer-bar">
          <div className="hero-indicator-wrap">
            <span className="hero-indicator-letter">N</span>
            <span className="hero-indicator-line" />
          </div>

          <div className="hero-index">
            <span className="hero-index-current">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="hero-index-slash">/</span>
            <span className="hero-index-total">{String(schoolHeroSlides.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const storyGalleryItems = [
  {
    image: "/school.png",
    title: "Campus Life",
    description: "A vibrant learning environment shaped around creativity and confidence.",
  },
  {
    image: "/building1.png",
    title: "Spaces That Inspire",
    description: "Purpose-built classrooms and shared spaces that make discovery feel natural.",
  },
  {
    image: "/technology.png",
    title: "New Learning",
    description: "Smart teaching methods that connect curiosity with practical understanding.",
  },
  {
    image: "/creativity.png",
    title: "Creative Growth",
    description: "Students explore ideas, art, and expression in ways that build character.",
  },
  {
    image: "/sports.png",
    title: "Active Futures",
    description: "Wellness, teamwork, and confidence grow through movement and play.",
  },
];

function OceanStoryGallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visibleStep, setVisibleStep] = useState(0);
  const visibleStepRef = useRef(0);
  const galleryCompleteRef = useRef(false);
  const wheelGestureRef = useRef(false);
  const wheelResetRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchHandledRef = useRef(false);

  const hiddenY = "110vh";

  const handleStepChange = (direction: number) => {
    const nextStep = Math.min(storyGalleryItems.length, Math.max(0, visibleStepRef.current + direction));
    if (nextStep === visibleStepRef.current) return false;

    visibleStepRef.current = nextStep;
    setVisibleStep(nextStep);

    if (nextStep === storyGalleryItems.length) {
      window.setTimeout(() => {
        galleryCompleteRef.current = true;
      }, 750);
    }

    return true;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;

    if (!section || !sticky) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === section || trigger.vars.pin === sticky) trigger.kill();
    });

    let galleryTrigger: ScrollTrigger | null = null;
    let galleryInputActive = false;

    const attachGalleryInput = () => {
      if (galleryInputActive || galleryCompleteRef.current) return;
      galleryInputActive = true;
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
    };

    const detachGalleryInput = () => {
      if (!galleryInputActive) return;
      galleryInputActive = false;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };

    const releaseGallery = () => {
      detachGalleryInput();
      if (galleryTrigger) {
        galleryTrigger.kill(true);
        galleryTrigger = null;
      }

      section.style.height = "100vh";
      ScrollTrigger.refresh();
    };

    const onWheel = (event: WheelEvent) => {
      if (galleryCompleteRef.current) {
        releaseGallery();
        return;
      }
      if (event.deltaY < 0 && visibleStepRef.current === 0) {
        detachGalleryInput();
        return;
      }

      event.preventDefault();
      if (wheelResetRef.current !== null) window.clearTimeout(wheelResetRef.current);
      wheelResetRef.current = window.setTimeout(() => {
        wheelGestureRef.current = false;
      }, 180);

      if (wheelGestureRef.current) return;
      wheelGestureRef.current = true;

      if (event.deltaY > 0) {
        handleStepChange(1);
      } else if (event.deltaY < 0) {
        handleStepChange(-1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      touchHandledRef.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      if (galleryCompleteRef.current) {
        releaseGallery();
        return;
      }
      if (touchStartYRef.current === null || touchHandledRef.current) return;

      const movement = touchStartYRef.current - event.touches[0].clientY;
      if (Math.abs(movement) < 24) return;
      if (movement < 0 && visibleStepRef.current === 0) {
        detachGalleryInput();
        return;
      }

      event.preventDefault();
      touchHandledRef.current = true;
      handleStepChange(movement > 0 ? 1 : -1);
    };

    const context = gsap.context(() => {
      galleryTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=2000%",
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: attachGalleryInput,
        onEnterBack: attachGalleryInput,
        onLeave: detachGalleryInput,
        onLeaveBack: detachGalleryInput,
      });
    }, section);

    return () => {
      context.revert();
      detachGalleryInput();
      if (wheelResetRef.current !== null) window.clearTimeout(wheelResetRef.current);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section || trigger.vars.pin === sticky) trigger.kill();
      });
    };
  }, []);

  const galleryPanels = storyGalleryItems.map((item, index) => {
    const isExpanded = expandedIndex === index;
    const isDimmed = expandedIndex !== null && !isExpanded;
    const width = expandedIndex === null ? 160 : isExpanded ? 480 : 92;

    return {
      ...item,
      index,
      isExpanded,
      isDimmed,
      width,
      shouldReveal: index < visibleStep,
    };
  });

  return (
    <section ref={sectionRef} className="ocean-story-section" aria-label="Cinematic gallery section">
      <div ref={stickyRef} className="ocean-story-sticky">
        <div className="ocean-story-surface" aria-hidden="true" />

        <div className="ocean-story-panels" role="list" aria-label="Gallery panels">
          {galleryPanels.map((item, index) => {
            const isExpanded = item.isExpanded;
            const isDimmed = item.isDimmed;
            const width = item.width;
            const panelY = item.shouldReveal ? "0px" : hiddenY;

            return (
              <button
                key={item.title}
                type="button"
                className={`ocean-story-panel ${isExpanded ? "is-expanded" : ""} ${isDimmed ? "is-collapsed" : ""}`}
                style={{
                  width,
                  flexBasis: width,
                  transform: `translate3d(0, ${panelY}, 0)`,
                  transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={() => setExpandedIndex(index)}
                onMouseLeave={() => setExpandedIndex(null)}
                onFocus={() => setExpandedIndex(index)}
                onBlur={() => setExpandedIndex(null)}
                onClick={() => setExpandedIndex((current) => (current === index ? null : index))}
                aria-label={`Expand ${item.title}`}
              >
                <img src={item.image} alt={item.title} />
                <div className="ocean-story-panel-copy" aria-live="polite">
                  <p className="ocean-story-panel-kicker">School story</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="ocean-story-panel-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.2} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const aboutViewportRef = useRef<HTMLDivElement | null>(null);
  const aboutRevealRef = useRef<HTMLDivElement | null>(null);
  const aboutTitleRef = useRef<HTMLDivElement | null>(null);
  const aboutImageWrapRef = useRef<HTMLDivElement | null>(null);
  const aboutTextRef = useRef<HTMLDivElement | null>(null);
  const aboutRevealRefs = useRef<(HTMLElement | null)[]>([]);
  const learningSectionRef = useRef<HTMLElement | null>(null);
  const learningViewportRef = useRef<HTMLDivElement | null>(null);
    const galleryCompleteRef = useRef(false);
  const learningCardRefs = useRef<(HTMLElement | null)[]>([]);
  const learningDetailRefs = useRef<(HTMLElement | null)[]>([]);
  const facilitiesViewportRef = useRef<HTMLDivElement | null>(null);
  const facilitySceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const viewport = facilitiesViewportRef.current;
    const scenes = facilitySceneRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!viewport || scenes.length !== facilities.length) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === viewport || trigger.vars.pin === viewport) trigger.kill();
    });

    const context = gsap.context(() => {
      gsap.set(scenes[0], { yPercent: 0, zIndex: 1 });
      gsap.set(scenes.slice(1), { yPercent: 100 });

      scenes.forEach((scene, index) => {
        scene.style.zIndex = String(index + 1);
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: viewport,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scenes.slice(1).forEach((scene, index) => {
        const transitionStart = index;
        timeline.to(scenes[index], { yPercent: -100, ease: "none" }, transitionStart);
        timeline.to(scene, { yPercent: 0, ease: "none" }, transitionStart);
      });
    }, viewport);

    const images = Array.from(viewport.querySelectorAll("img"));
    const refreshAfterImageLoad = () => ScrollTrigger.refresh();

    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", refreshAfterImageLoad);
        image.addEventListener("error", refreshAfterImageLoad);
      }
    });

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      images.forEach((image) => {
        image.removeEventListener("load", refreshAfterImageLoad);
        image.removeEventListener("error", refreshAfterImageLoad);
      });
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === viewport || trigger.vars.pin === viewport) trigger.kill();
      });
    };
  }, []);

  useEffect(() => {
    const section = aboutSectionRef.current;
    const viewport = aboutViewportRef.current;
    const reveal = aboutRevealRef.current;
    const imageWrap = aboutImageWrapRef.current;
    const title = aboutTitleRef.current;
    const text = aboutTextRef.current;
    const revealBlocks = aboutRevealRefs.current.filter(Boolean) as HTMLElement[];

    if (!section || !viewport || !reveal || !imageWrap || !title || !text || revealBlocks.length === 0) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === section || trigger.vars.pin === viewport) trigger.kill();
    });

    const titleLabel = title.querySelector("p");
    const titleHeading = title.querySelector("h2");
    const titleLines = titleHeading ? Array.from(titleHeading.querySelectorAll("span")) : [];

    const context = gsap.context(() => {
      gsap.set(reveal, {
        yPercent: 90,
        borderRadius: "42px 42px 0 0",
        transformOrigin: "bottom center",
      });

      gsap.to(reveal, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([titleLabel, titleHeading, ...titleLines, imageWrap, ...revealBlocks], { clearProps: "all" });
        gsap.set([titleLabel, titleHeading, ...titleLines], { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(imageWrap, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 });
        gsap.set(revealBlocks, { opacity: 1, x: 0, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set([titleLabel, titleHeading, ...titleLines], { opacity: 1, y: 0, filter: "blur(0px)" });
      gsap.set(revealBlocks, {
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
        willChange: "transform, opacity, filter",
      });
      gsap.set(imageWrap, {
        x: 0,
        y: 0,
        scale: 1.12,
        rotationX: 0,
        rotationY: 0,
        z: 0,
        opacity: 1,
        transformPerspective: 1600,
        transformOrigin: "center center",
      });

      const revealWordSets = revealBlocks.map((block) => {
        const words = block.textContent?.trim().split(/\s+/) ?? [];
        if (!words.length) return [] as HTMLElement[];

        const fragment = document.createDocumentFragment();
        const wordEls: HTMLElement[] = [];

        words.forEach((word, index) => {
          const span = document.createElement("span");
          span.className = "reveal-word inline-block";
          span.textContent = `${word} `;
          span.style.opacity = "0";
          span.style.filter = "blur(8px)";
          span.style.transform = "translate3d(0, 18px, 0)";
          span.style.display = "inline-block";
          wordEls.push(span);
          fragment.appendChild(span);
        });

        block.textContent = "";
        block.appendChild(fragment);
        return wordEls;
      });

      gsap.set(revealWordSets.flat(), {
        opacity: 0,
        y: 18,
        filter: "blur(8px)",
      });

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
          z: 90,
          rotateX: 4,
          rotateY: -8,
          scale: 1.18,
          duration: 0.9,
          ease: "power2.out",
        }, 0)
        .to(imageWrap, {
          x: -26,
          y: -6,
          z: 120,
          rotateX: -4,
          rotateY: 8,
          scale: 0.96,
          duration: 1.2,
          ease: "power2.inOut",
        }, 0.65)
        .to(imageWrap, {
          x: -120,
          y: 8,
          z: -40,
          rotateX: 5,
          rotateY: -10,
          scale: 0.86,
          duration: 1.4,
          ease: "power2.inOut",
        }, 1.5)
        .to(imageWrap, {
          x: -90,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 0.9,
          duration: 1.1,
          ease: "power2.out",
        }, 2.3)
        .to(revealWordSets[0], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.06,
          duration: 0.8,
          ease: "power2.out",
        }, 2.1)
        .to(revealWordSets[1], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.06,
          duration: 0.8,
          ease: "power2.out",
        }, 2.8);

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
    <main className="relative z-10 -mt-12 md:-mt-16">
      <SchoolStoryCinematic />
      <OceanStoryGallerySection />
      <CinematicScrollReveal />

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
        <div ref={facilitiesViewportRef} className="relative h-screen overflow-hidden bg-[#f4f1ea]">
          <div className="absolute inset-x-0 top-0 z-[70]">
            <SectionTitle eyebrow="Facilities" title="A campus designed for discovery and performance." />
          </div>
          <div className="absolute inset-x-0 bottom-0 top-[180px] overflow-hidden">
            {facilities.map((facility, index) => (
              <div
                key={facility.name}
                ref={(element) => { facilitySceneRefs.current[index] = element; }}
                className="absolute inset-0 grid grid-cols-1 items-center md:grid-cols-2 xl:grid-cols-3"
                style={{ zIndex: index + 1 }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-4 z-10 text-5xl font-bold leading-none text-slate-900 md:left-[4%] md:top-1/2 md:-translate-y-1/2 md:text-[clamp(8rem,12vw,10rem)]"
                >
                  {index + 1}.
                </span>
                <article className="group relative z-20 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200 md:col-span-2 md:mx-auto md:w-1/2 xl:col-span-1 xl:col-start-2 xl:w-full">
                  <div className="overflow-hidden">
                    <img src={facility.image} alt={facility.name} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Facility</p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900">{facility.name}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{facility.description}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
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
