"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, BookText, GraduationCap, NotebookTabs, Presentation } from "lucide-react";
import { useEffect, useRef } from "react";

const programmeCards = [
  {
    title: "Early Years",
    description: "A warm start that builds curiosity, confidence, and joy in learning.",
    Icon: BookOpen,
    color: "#e58a28",
    position: "left-[4%] top-[34%] max-md:left-[7%] max-md:top-[14%]",
  },
  {
    title: "Primary Years",
    description: "Young learners grow through care, active participation, and discovery.",
    Icon: NotebookTabs,
    color: "#c7d92b",
    position: "right-[4%] top-[64%] max-md:left-[7%] max-md:right-auto max-md:top-[66%]",
  },
  {
    title: "Middle Years",
    description: "Interdisciplinary learning develops critical thinking and global awareness.",
    Icon: Presentation,
    color: "#9b4ca3",
    position: "left-1/2 top-[25%] -ml-[139px] max-md:left-[7%] max-md:top-[14%] max-md:ml-0",
  },
  {
    title: "iCBSE Programme",
    description: "A future-ready path blending strong academics with practical skills.",
    Icon: BookText,
    color: "#d74747",
    position: "left-[7%] top-[64%] max-md:left-[7%] max-md:top-[66%]",
  },
  {
    title: "Diploma Programme",
    description: "A focused senior pathway supporting subject depth and independence.",
    Icon: GraduationCap,
    color: "#398bd0",
    position: "right-[7%] top-[36%] max-md:left-[7%] max-md:right-auto max-md:top-[14%]",
  },
];

export function CinematicScrollReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !viewport || cards.length !== programmeCards.length) return;

    const cardDuration = 1.2;
    const cardStagger = 0.8;
    const totalDuration = cardStagger * (cards.length - 1) + cardDuration;

    const updateCards = () => {
      const sectionTop = section.getBoundingClientRect().top;
      const scrollRange = Math.max(1, section.offsetHeight - viewport.offsetHeight);
      const progress = Math.min(1, Math.max(0, -sectionTop / scrollRange));
      const timelinePosition = progress * totalDuration;

      cards.forEach((card, index) => {
        const localProgress = Math.min(1, Math.max(0, (timelinePosition - index * cardStagger) / cardDuration));
        const travel = viewport.offsetHeight * 0.9;
        const y = travel * (1 - localProgress * 2);
        const opacity = timelinePosition < index * cardStagger
          ? 0
          : localProgress < 0.15
            ? localProgress / 0.15
            : localProgress > 0.87
              ? (1 - localProgress) / 0.13
              : 1;

        card.style.transform = `translate3d(0, ${y}px, 0)`;
        card.style.opacity = String(Math.min(1, Math.max(0, opacity)));
      });
    };

    updateCards();
    window.addEventListener("scroll", updateCards, { passive: true });
    window.addEventListener("resize", updateCards);

    return () => {
      window.removeEventListener("scroll", updateCards);
      window.removeEventListener("resize", updateCards);
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="Our approach to learning" className="relative h-[540vh]">
      <div
        ref={viewportRef}
        className="sticky top-0 isolate flex h-[100svh] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#d3f7ff_0%,#f5f7e7_48%,#fff0cf_100%)] px-6"
      >
        <h2 className="relative z-10 mx-auto max-w-[760px] text-center text-[30px] font-normal leading-[1.32] text-[#285b7f] md:text-[34px]">
          <span className="block">We provide an environment</span>
          <span className="block">where we teach students how to</span>
          <span className="block">think rather than what to think</span>
        </h2>

        {programmeCards.map(({ title, description, Icon, color, position }, index) => (
          <div
            key={title}
            ref={(element) => { cardRefs.current[index] = element; }}
            className={`absolute z-20 flex min-h-[304px] w-[278px] max-w-[86vw] flex-col items-center rounded-[18px] bg-white px-6 pb-6 pt-9 text-center shadow-[0_18px_48px_rgba(36,67,82,0.11)] ${position}`}
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            <Icon className="mb-7 h-[68px] w-[68px] shrink-0" color={color} strokeWidth={1.45} aria-hidden="true" />
            <h3 className="text-[18px] font-medium leading-6 text-[#282828]">{title}</h3>
            <p className="mt-3 text-[14px] leading-[1.4] text-[#77716e]">{description}</p>
            <Link
              href="/academics"
              className="absolute -bottom-[22px] inline-flex h-11 min-w-[144px] items-center justify-between gap-4 rounded-full px-5 text-[14px] font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              Learn more
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white" style={{ color }}>
                <ArrowRight size={16} strokeWidth={2.3} />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
