"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const orbitPhotos = [
  "https://samcbse.org/images/about/1.png",
  "https://samcbse.org/images/gallery/s1.jpg",
  "https://samcbse.org/images/gallery/s2.jpg",
  "https://samcbse.org/images/gallery/s3.jpg",
  "https://samcbse.org/images/gallery/s11.jpg",
];

const photoDetails = [
  {
    title: "Our Campus",
    description: "Discover the spaces where learning, creativity and growth come together.",
    href: "/facilities",
  },
  {
    title: "Learning Spaces",
    description: "Modern classrooms and inspiring environments designed for students.",
    href: "/academics",
  },
  {
    title: "School Life",
    description: "A vibrant learning community filled with activities and experiences.",
    href: "/about",
  },
  {
    title: "Sports & Activities",
    description: "Explore our sports facilities and opportunities beyond academics.",
    href: "/facilities",
  },
  {
    title: "Our School",
    description: "A welcoming environment built around learning and holistic development.",
    href: "/about",
  },
];

const starField = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 29) % 100}%`,
  size: 2 + (index % 4),
  delay: index * 0.5,
}));

export function SchoolOrbitAnimation({ hero = false }: { hero?: boolean }) {
  const [time, setTime] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const focusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedPhotoRef = useRef<number | null>(null);

  useEffect(() => {
    selectedPhotoRef.current = selectedPhoto;
  }, [selectedPhoto]);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      if (selectedPhotoRef.current === null) setTime(elapsed);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (focusTimer.current) {
      clearTimeout(focusTimer.current);
      focusTimer.current = null;
    }

    if (selectedPhoto !== null) {
      focusTimer.current = setTimeout(() => setSelectedPhoto(null), 20000);
    }

    return () => {
      if (focusTimer.current) clearTimeout(focusTimer.current);
    };
  }, [selectedPhoto]);

  useEffect(() => () => {
    if (focusTimer.current) clearTimeout(focusTimer.current);
  }, []);

  const focusPhoto = (index: number) => {
    setSelectedPhoto((current) => (current === index ? null : index));
  };

  const orbitItems = useMemo(
    () =>
      orbitPhotos.map((src, index) => ({
        src,
        alt: `School campus photo ${index + 1}`,
        angle: (index * Math.PI * 2) / orbitPhotos.length,
      })),
    [],
  );

  return (
    <div
      className={hero ? "relative h-[100vh] w-full overflow-hidden bg-[#020b15]" : "relative h-[480px] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-[#020b15] shadow-[0_30px_80px_rgba(2,8,23,0.45)] md:h-[560px]"}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        setPointer({ x, y });
      }}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,64,175,0.32),transparent_32%),radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_44%),linear-gradient(180deg,#040b16_0%,#061625_55%,#040b16_100%)]" />

      <div className="absolute inset-0 opacity-70">
        {starField.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white/80"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: "0 0 12px rgba(255,255,255,0.5)",
              animation: `twinkle ${3 + (star.id % 5)}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.075),transparent_60%)]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-sky-400/20 [transform:translate(-50%,-50%)_rotateX(64deg)] md:h-[320px] md:w-[1120px] lg:h-[390px] lg:w-[1400px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10 [transform:translate(-50%,-50%)_rotateX(64deg)] md:h-[230px] md:w-[930px] lg:h-[280px] lg:w-[1160px]" />

      <div className="relative h-full w-full [perspective:1800px]">
        <motion.div
          className="absolute inset-0"
          animate={{
            x: pointer.x * -18,
            y: pointer.y * -12,
          }}
          transition={{ type: "spring", stiffness: 25, damping: 18, mass: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {orbitItems.map((item, index) => {
            const angle = time * 0.24 + item.angle;
            const orbitX = 560;
            const orbitZ = 360;
            const x = Math.cos(angle) * orbitX;
            const z = Math.sin(angle) * orbitZ;
            const y = Math.sin(angle) * 38;
            const frontStrength = (Math.sin(angle) + 1) / 2;
            const scale = 0.58 + frontStrength * 0.55;
            const opacity = 0.28 + frontStrength * 0.72;
            const width = 172 + frontStrength * 76;
            const height = 114 + frontStrength * 50;
            const tilt = Math.cos(angle) * -7;
            const isFocused = selectedPhoto === index;
            const isOtherFocused = selectedPhoto !== null && !isFocused;
            const photoIndex = index;
            const focusX = isMobile ? 0 : -250;
            const focusY = isMobile ? -105 : 0;
            const focusWidth = isMobile ? 310 : 520;
            const focusHeight = isMobile ? 207 : 339;

            return (
              <motion.div
                key={item.src}
                className="absolute left-1/2 top-1/2"
                role="button"
                tabIndex={0}
                aria-label={`${isFocused ? "Close details for" : "View details for"} ${photoDetails[photoIndex].title}`}
                onClick={() => focusPhoto(photoIndex)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    focusPhoto(photoIndex);
                  }
                }}
                animate={{
                  x: isFocused ? focusX : x,
                  y: isFocused ? focusY : y,
                  z: isFocused ? 470 : z,
                  rotateZ: isFocused ? 0 : tilt,
                  opacity: isFocused ? 1 : isOtherFocused ? 0 : opacity,
                  scale: isFocused ? 1 : isOtherFocused ? 0.8 : scale,
                  filter: isFocused ? "brightness(1.35) saturate(1.1)" : `brightness(${0.55 + frontStrength}) saturate(${0.85 + frontStrength})`,
                }}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] as const }}
                style={{
                  zIndex: isFocused ? 1000 : Math.round(500 + z),
                  pointerEvents: isOtherFocused ? "none" : "auto",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className={`overflow-hidden rounded-[1.5rem] border bg-slate-900/50 ${isFocused ? "border-sky-200/80 shadow-[0_0_60px_rgba(125,211,252,0.55)]" : "border-white/35 shadow-[0_25px_70px_rgba(14,116,144,0.35)]"}`}
                    animate={{
                      width: isFocused ? focusWidth : width,
                      height: isFocused ? focusHeight : height,
                    }}
                    transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] as const }}
                  >
                    <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="eager" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            className="absolute left-1/2 top-1/2"
            animate={{
              y: [0, -14, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <div
                className="overflow-hidden rounded-[2.2rem] border border-sky-200/30 bg-white/5 shadow-[0_0_80px_rgba(14,116,144,0.32)]"
                style={{
                  width: 460,
                  height: 300,
                  transform: "translateZ(160px)",
                }}
              >
                <img
                  src="https://samcbse.org/images/about/1.png"
                  alt="Sri Aurobindo Mira Universal School main building"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 md:h-[500px] md:w-[500px]" />

          <AnimatePresence>
            {selectedPhoto !== null ? (
              <motion.aside
                key={selectedPhoto}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="pointer-events-auto absolute bottom-5 right-4 z-[1100] flex min-h-[207px] w-[min(310px,calc(100%-2rem))] flex-col justify-center rounded-2xl border border-white/20 bg-slate-950/60 p-6 text-white shadow-[0_20px_70px_rgba(2,8,23,0.45)] backdrop-blur-xl md:bottom-auto md:right-10 md:top-1/2 md:min-h-[339px] md:w-[520px] md:-translate-y-1/2 md:p-10"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-200/75">Featured view</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{photoDetails[selectedPhoto].title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 md:text-base md:leading-7">{photoDetails[selectedPhoto].description}</p>
                <a href={photoDetails[selectedPhoto].href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-white">
                  Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </motion.aside>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 text-center md:bottom-12">
        <div className="mx-auto inline-flex rounded-full border border-white/15 bg-slate-950/25 px-4 py-2 backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-sky-100/80 md:text-[11px]">
            SRI AUROBINDO MIRA UNIVERSAL SCHOOL
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
