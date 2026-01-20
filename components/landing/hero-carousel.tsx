'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    title: '专业地质勘察服务',
    subtitle: '20年行业经验，值得信赖的技术伙伴',
    description: '提供全方位的地质勘察、工程测量、环境监测等专业服务',
    image: '/images/hero-1.jpg',
    cta: '了解更多',
    ctaLink: '/about',
  },
  {
    id: 2,
    title: '智能设备租赁平台',
    subtitle: '高端设备，灵活租期，专业服务',
    description: '2000+台专业设备，覆盖物探、测量、钻探等多个领域',
    image: '/images/hero-2.jpg',
    cta: '查看设备',
    ctaLink: '/equipment',
  },
  {
    id: 3,
    title: '项目分发与协作',
    subtitle: '连接需求与专业，高效完成项目',
    description: '智能匹配系统，1000+成功案例，92%项目成功率',
    image: '/images/hero-3.jpg',
    cta: '发布项目',
    ctaLink: '/projects',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl text-white">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-2">
                {slide.subtitle}
              </h2>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                {slide.description}
              </p>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                {slide.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
