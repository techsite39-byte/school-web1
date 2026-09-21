"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Building2, Compass, DoorOpen } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const featureCards = [
  {
    eyebrow: "01 / Begin here",
    title: "Prospectus",
    description: "Discover our curriculum, facilities and school journey.",
    href: "https://samcbse.org/",
    action: "View Prospectus",
    icon: BookOpen,
    objectClass: "feature-book",
    accent: "from-[#e8d09a]/55 to-[#fffaf0]/10",
    tone: "ivory",
  },
  {
    eyebrow: "02 / Join us",
    title: "Admissions",
    description: "Everything you need to know about joining our school.",
    href: "/admissions",
    action: "Explore Admissions",
    icon: DoorOpen,
    objectClass: "feature-door",
    accent: "from-[#efc0a5]/55 to-[#fff7f0]/10",
    tone: "peach",
  },
  {
    eyebrow: "03 / See more",
    title: "Campus Tour",
    description: "Take a closer look at our learning spaces and campus.",
    href: "/facilities",
    action: "Take a Tour",
    icon: Building2,
    objectClass: "feature-campus",
    accent: "from-[#bdcdb5]/55 to-[#fbf8ef]/10",
    tone: "sage",
  },
  {
    eyebrow: "04 / Stay curious",
    title: "Magazine",
    description: "Explore school stories, activities, achievements and highlights.",
    href: "/gallery",
    action: "Read Magazine",
    icon: Compass,
    objectClass: "feature-magazine",
    accent: "from-[#d8cee0]/55 to-[#fffaf5]/10",
    tone: "lavender",
  },
];

export function HeroFeatureSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const subtextRef = useRef<HTMLSpanElement | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const tickerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtext = subtextRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const ticker = tickerRef.current;

    if (!section || !heading || !subtext || !cards.length || !ticker) return;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([heading, subtext, ...cards, ticker], { clearProps: "all" });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set([heading, subtext], { opacity: 0, y: 22 });
      gsap.set(cards, {
        opacity: 0,
        y: 52,
        scale: 0.94,
        rotateX: 10,
        rotateY: -8,
        filter: "blur(7px)",
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      });

      gsap.to([heading, subtext], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "top 45%",
          scrub: 0.8,
        },
      });

      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 56%",
            scrub: 1,
          },
          delay: index * 0.08,
        });
      });

      gsap.to(ticker, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ticker,
          start: "top 95%",
          end: "top 70%",
          scrub: 0.8,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#efe3d2_0%,#fbf8f2_38%,#eee5d8_100%)] px-4 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_16%_18%,rgba(191,148,77,0.15)_0,transparent_22%),radial-gradient(circle_at_84%_10%,rgba(201,126,88,0.12)_0,transparent_18%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex items-end justify-between gap-6 md:mb-14"
        >
          <div ref={headingRef}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9b7441]">Your next chapter</p>
            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[#29251f] md:text-5xl">Find your way into SAM.</h2>
          </div>
          <span ref={subtextRef} className="hidden max-w-[210px] pb-1 text-right text-sm leading-6 text-[#6f665c] md:block">A closer look at the places, people and possibilities waiting on campus.</span>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.a
                key={card.title}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                href={card.href}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: index * 0.12, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.985 }}
                className={`group relative min-h-[330px] overflow-hidden rounded-[1.5rem] border p-5 text-[#302a24] shadow-[0_20px_60px_rgba(86,63,39,0.12)] backdrop-blur-md transition-shadow duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(86,63,39,0.2)] ${card.tone === "ivory" ? "border-[#c5a15e]/35 bg-[#fbf5e8]" : card.tone === "peach" ? "border-[#bf7855]/30 bg-[#f8e7dc]" : card.tone === "sage" ? "border-[#829b7a]/35 bg-[#e8eee2]" : "border-[#a996b5]/35 bg-[#eeeaf2]"}`}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-70 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#766a5d]">{card.eyebrow}</span>
                    <ArrowUpRight className="h-5 w-5 text-[#87765f] transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#493a2b]" />
                  </div>

                  <div className="flex h-36 items-center justify-center [perspective:700px]">
                    <div className={`feature-object ${card.objectClass} transition duration-700 group-hover:[transform:translateZ(24px)_rotateX(-5deg)_rotateY(-12deg)]`}>
                      <div className="feature-object-shadow" />
                      <div className="feature-object-face">
                        <Icon className="h-12 w-12 stroke-[1.35] text-[#5a4631] drop-shadow-[0_4px_10px_rgba(86,63,39,0.2)]" />
                      </div>
                      <div className="feature-object-edge" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-2xl font-medium tracking-[-0.03em]">{card.title}</h3>
                    <p className="mt-2 max-w-[240px] text-sm leading-6 text-[#6f665c]">{card.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#946b36] transition-colors group-hover:text-[#5c3d1c]">
                      {card.action}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.a
          ref={tickerRef}
          href="/admissions"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="group relative mt-5 block min-h-[60px] overflow-hidden rounded-[1.25rem] border border-[#8f603e]/35 bg-[linear-gradient(105deg,#9b6546,#c19a5d_54%,#8d5b3f)] px-5 py-3 text-[#fff9ef] shadow-[0_20px_60px_rgba(111,67,39,0.18)] md:min-h-[68px] md:px-7 md:py-4"
        >
          <div className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 rotate-[18deg] bg-white/20 blur-2xl transition-transform duration-[1600ms] group-hover:translate-x-[500%]" />
          <div className="pointer-events-none absolute right-10 top-3 h-1 w-1 rounded-full bg-[#fff1c7] shadow-[0_0_18px_5px_rgba(255,241,199,0.45)]" />
          <div className="pointer-events-none absolute bottom-3 right-1/3 h-1.5 w-1.5 rounded-full bg-[#f5d7a0] shadow-[0_0_18px_5px_rgba(245,215,160,0.35)]" />
          <div className="relative flex h-full items-center overflow-hidden" aria-label="Admissions Open 2026–2027 — Enquiry Now">
            <div className="admission-marquee flex w-max gap-10 whitespace-nowrap pr-12 text-base font-semibold tracking-[-0.02em] text-[#fff8e8] md:gap-16 md:text-[1.2rem]">
              <span>Admissions Open 2026–2027 — Enquiry Now</span>
              <span aria-hidden="true">Admissions Open 2026–2027 — Enquiry Now</span>
            </div>
          </div>
        </motion.a>
      </div>

      <style jsx global>{`
        .feature-object {
          position: relative;
          display: flex;
          height: 96px;
          width: 112px;
          align-items: center;
          justify-content: center;
          transform: translateZ(0) rotateX(5deg) rotateY(-10deg);
          transform-style: preserve-3d;
          animation: featureFloat 5.5s ease-in-out infinite;
        }
        .feature-object-face {
          position: relative;
          z-index: 2;
          display: flex;
          height: 78px;
          width: 94px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.45);
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(255,252,243,0.92), rgba(215,184,115,0.7));
          box-shadow: 12px 18px 24px rgba(86,63,39,0.18), inset 0 1px rgba(255,255,255,0.65);
          transform: translateZ(12px);
        }
        .feature-object-edge {
          position: absolute;
          z-index: 1;
          height: 78px;
          width: 94px;
          border: 1px solid rgba(133,99,52,0.2);
          border-radius: 14px;
          background: rgba(213,181,111,0.35);
          transform: translate3d(10px, 9px, -2px);
        }
        .feature-object-shadow {
          position: absolute;
          bottom: 0;
          height: 13px;
          width: 86px;
          border-radius: 50%;
          background: rgba(86,63,39,0.28);
          filter: blur(9px);
          transform: rotateX(70deg) translateZ(-26px);
        }
        .feature-door .feature-object-face { border-radius: 10px 10px 5px 5px; background: linear-gradient(145deg, rgba(239,192,165,0.9), rgba(176,91,62,0.65)); }
        .feature-campus .feature-object-face { border-radius: 8px; background: linear-gradient(145deg, rgba(189,205,181,0.9), rgba(91,119,83,0.62)); }
        .feature-magazine .feature-object-face { transform: translateZ(12px) rotateZ(-7deg); background: linear-gradient(145deg, rgba(216,206,224,0.95), rgba(148,126,162,0.62)); }
        .admission-marquee {
          animation: admissionMarquee 16s linear infinite;
          will-change: transform;
        }
        @keyframes admissionMarquee {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes featureFloat {
          0%, 100% { transform: translateY(4px) translateZ(0) rotateX(5deg) rotateY(-10deg); }
          50% { transform: translateY(-7px) translateZ(8px) rotateX(8deg) rotateY(-5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .feature-object, .admission-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}