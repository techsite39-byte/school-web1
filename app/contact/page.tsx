import { PageHero } from "@/components/PageHero";
import { schoolBrand } from "@/data/site";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you."
        description="Reach out for admissions, campus information, and general school enquiries."
        image="https://samcbse.org/images/bg/slider22.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-slate-900 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-sky-300">School contact</p>
            <div className="mt-8 space-y-6 text-slate-200">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Address</p>
                <p className="mt-2 text-lg leading-8">{schoolBrand.location}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Phone</p>
                <p className="mt-2 text-lg">{schoolBrand.phone}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Email</p>
                <p className="mt-2 text-lg">{schoolBrand.email}</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">Send a message</h2>
            <form className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">Name<input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
                <label className="block text-sm font-medium text-slate-700">Phone<input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              </div>
              <label className="block text-sm font-medium text-slate-700">Email<input type="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              <label className="block text-sm font-medium text-slate-700">Message<textarea rows={5} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              <button type="submit" className="rounded-full bg-[#0c3b59] px-5 py-3 text-sm font-medium text-white">Submit enquiry</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
