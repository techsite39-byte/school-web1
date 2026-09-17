import { schoolBrand } from "@/data/site";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-28 md:px-8">
      <div className="rounded-[2rem] bg-slate-900 p-8 text-white md:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Admin dashboard</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Manage content for {schoolBrand.name}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">A dashboard shell for admissions, messages, events, news, gallery, facilities, and announcements.</p>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Admissions", "0"],
          ["Messages", "0"],
          ["Events", "0"],
          ["Gallery", "0"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-700">{label}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-900">{value}</h2>
          </div>
        ))}
      </section>
    </main>
  );
}
