"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1600px] px-4 pt-4 transition-all duration-500 md:px-8">
      <div className={`relative flex items-center justify-between rounded-[20px] border border-[#caa866]/35 bg-[#fffdf7]/95 px-4 shadow-[0_12px_35px_rgba(55,39,22,0.1)] backdrop-blur-xl transition-all duration-500 md:px-6 ${isScrolled ? "min-h-[68px] shadow-[0_16px_42px_rgba(55,39,22,0.16)]" : "min-h-[82px]"}`}>
        <Link href="/" className="group flex shrink-0 items-center text-slate-900" aria-label="Sri Aurobindo Mira Universal School home">
          <img src="/logo.svg" alt="Sri Aurobindo Mira Universal School logo" className="h-14 w-auto transition-transform duration-300 group-hover:scale-[1.03]" />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`group relative py-3 text-[13px] font-medium text-[#172a3d] transition-colors duration-300 hover:text-[#8c2930] ${pathname === item.href ? "text-[#8c2930]" : ""}`}>
              <span>{item.label}</span>
              <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-[#bd9550] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+919047077677" className="inline-flex items-center gap-2 text-[13px] font-medium text-[#26384a] transition-colors hover:text-[#8c2930]"><Phone className="h-3.5 w-3.5 text-[#9b7338]" />+91 9047077677</a>
          <Link href="/admissions" className="rounded-[14px] border border-[#c49a52] bg-[#8c2930] px-4 py-2.5 text-[13px] font-semibold text-[#fff9ec] shadow-[0_8px_18px_rgba(140,41,48,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#762229] hover:shadow-[0_12px_24px_rgba(140,41,48,0.28)]">Apply Now</Link>
        </div>
        <button className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#caa866]/45 bg-[#fffaf0] text-[#172a3d] transition hover:border-[#8c2930] hover:text-[#8c2930] lg:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {isMenuOpen ? (
        <div className="mt-3 rounded-[18px] border border-[#caa866]/35 bg-[#fffdf7] p-4 shadow-[0_18px_40px_rgba(55,39,22,0.14)] lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className={`rounded-xl px-4 py-3 text-sm font-medium text-[#172a3d] transition-colors hover:bg-[#f7eddb] hover:text-[#8c2930] ${pathname === item.href ? "bg-[#f7eddb] text-[#8c2930]" : ""}`}>{item.label}</Link>
            ))}
          </nav>
          <div className="mt-3 border-t border-[#d7c29a]/40 pt-3">
            <a href="tel:+919047077677" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#26384a]"><Phone className="h-4 w-4 text-[#9b7338]" />+91 9047077677</a>
            <Link href="/admissions" className="mt-2 block rounded-[14px] bg-[#8c2930] px-4 py-3 text-center text-sm font-semibold text-[#fff9ec]">Apply Now</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}