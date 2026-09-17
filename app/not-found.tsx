import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1200px] items-center justify-center px-4 py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-slate-900">Page not found</h1>
        <p className="mt-4 text-lg text-slate-600">The page you are looking for cannot be found.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#0c3b59] px-5 py-3 text-sm font-medium text-white">Return home</Link>
      </div>
    </main>
  );
}
