import { HeroCarousel } from '@/components/landing/hero-carousel';
import { PartnersCarousel } from '@/components/landing/partners-carousel';
import { CoreServicesTabs } from '@/components/landing/core-services-tabs';
import { SolutionsHighlight } from '@/components/landing/solutions-highlight';
import { Enterprise } from '@/components/landing/enterprise';
import { ServiceGuarantee } from '@/components/landing/service-guarantee';
import { ExperienceNow } from '@/components/landing/experience-now';

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <PartnersCarousel />
      <CoreServicesTabs />
      <SolutionsHighlight />
      <Enterprise />
      <ServiceGuarantee />
      <ExperienceNow />
    </main>
  );
}
