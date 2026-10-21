import { ZoomParallax } from "@/components/ui/zoom-parallax";

export function GrossimotoExperienceSection() {
  return (
    <section aria-label="Dalla consegna all’assistenza" data-call-cta-theme="black" className="relative bg-white">
      <div data-call-cta-theme="white" className="overflow-clip rounded-[32px] bg-[var(--home-experience-surface)] sm:rounded-[40px] lg:rounded-[56px]">
        <ZoomParallax />
      </div>
    </section>
  );
}
