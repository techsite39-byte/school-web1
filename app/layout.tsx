import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { schoolBrand } from "@/data/site";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${schoolBrand.name} | Premium CBSE Education in Madurai`,
  description: `${schoolBrand.about} ${schoolBrand.location}`,
  metadataBase: new URL("https://samcbse.org"),
  openGraph: {
    title: schoolBrand.name,
    description: schoolBrand.tagline,
    url: "https://samcbse.org",
    siteName: schoolBrand.name,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f4f1ea] text-slate-900">
        <div className="relative isolate min-h-screen">
          <Navbar />
          {children}
          <footer className="border-t border-slate-200 bg-[#0d1b2a] text-slate-100">
            <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
              <div>
                <div className="mb-4 inline-flex items-center">
                  <img src="/logo.svg" alt="Sri Aurobindo Mira Universal School logo" className="h-14 w-auto" />
                </div>
                <p className="max-w-xs text-sm leading-7 text-slate-300">{schoolBrand.about}</p>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Quick links</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li><Link href="/about">About us</Link></li>
                  <li><Link href="/academics">Academics</Link></li>
                  <li><Link href="/facilities">Facilities</Link></li>
                  <li><Link href="/gallery">Gallery</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Contact</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li>{schoolBrand.phone}</li>
                  <li>{schoolBrand.email}</li>
                  <li>{schoolBrand.location}</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Affiliation</h3>
                <p className="text-sm leading-7 text-slate-300">{schoolBrand.affiliation}</p>
              </div>
            </div>
            <div className="border-t border-white/10">
              <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-5 text-sm text-slate-300 md:px-8">
                <span>© 2024 {schoolBrand.name}</span>
                <span>World-class education, rooted in values.</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
