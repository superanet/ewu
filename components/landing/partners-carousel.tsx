'use client';

import { useEffect, useRef } from 'react';

const partners = [
  { id: 1, name: '中国石油', logo: '/logos/cnpc.png' },
  { id: 2, name: '中国建筑', logo: '/logos/cscec.png' },
  { id: 3, name: '中国中铁', logo: '/logos/crec.png' },
  { id: 4, name: '中国电建', logo: '/logos/powerchina.png' },
  { id: 5, name: '中国交建', logo: '/logos/cccc.png' },
  { id: 6, name: '华为技术', logo: '/logos/huawei.png' },
  { id: 7, name: '中煤地质', logo: '/logos/cmg.png' },
  { id: 8, name: '中国地质', logo: '/logos/cgs.png' },
];

export function PartnersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = 30;

    const scroll = () => {
      scrollAmount += scrollStep;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const interval = setInterval(scroll, scrollInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          合作伙伴
        </h2>
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-12 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              >
                <div className="text-gray-400 font-bold text-lg">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
