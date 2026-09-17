import { PageHero } from "@/components/PageHero";
import { galleryItems } from "@/data/site";

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="A visual story of campus life, learning, and achievement."
        description="The school’s gallery captures important moments across classrooms, events, sports, and culture."
        image="https://samcbse.org/images/gallery/s10.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <div key={item.title} className={`group relative overflow-hidden rounded-[2rem] ${index % 2 === 0 ? "md:row-span-2" : ""}`}>
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/0 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-200">Gallery</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
