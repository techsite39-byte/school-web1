import { PageHero } from "@/components/PageHero";
import { admissionSteps, schoolBrand } from "@/data/site";

export default function AdmissionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Admissions"
        title="A clear and encouraging admissions experience."
        description="The admissions journey at SAM CBSE is designed to welcome families with clarity, care, and confidence from the first enquiry to confirmation."
        image="https://samcbse.org/images/bg/slider22.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-slate-900 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Help center</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Start with an enquiry</h2>
            <p className="mt-5 text-base leading-7 text-slate-300">Families are invited to connect with the school and take the next step in their child’s educational journey.</p>
            <div className="mt-8 space-y-3 text-slate-200">
              <p>{schoolBrand.phone}</p>
              <p>{schoolBrand.email}</p>
              <p>{schoolBrand.location}</p>
            </div>
          </div>
          <div className="space-y-5">
            {admissionSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0c3b59] text-base font-semibold text-white">{index + 1}</div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-700">Step {index + 1}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{step}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f3ef]">
        <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">Admission enquiry form</h2>
            <form className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">Parent name<input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              <label className="block text-sm font-medium text-slate-700">Student name<input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              <label className="block text-sm font-medium text-slate-700">Phone<input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              <label className="block text-sm font-medium text-slate-700">Email<input type="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              <label className="block text-sm font-medium text-slate-700 md:col-span-2">Message<textarea rows={5} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" /></label>
              <button type="submit" className="rounded-full bg-[#0c3b59] px-5 py-3 text-sm font-medium text-white md:col-span-2">Submit enquiry</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
