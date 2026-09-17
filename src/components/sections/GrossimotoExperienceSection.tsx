import { ZoomParallax } from "@/components/ui/zoom-parallax";

export function GrossimotoExperienceSection() {
  return (
    <section className="relative bg-white pt-10 sm:pt-14 lg:pt-24">
      <div className="overflow-clip rounded-[32px] bg-[var(--home-experience-surface)] sm:rounded-[40px] lg:rounded-[56px]">
        <ZoomParallax />
      </div>
    </section>
  );
}
