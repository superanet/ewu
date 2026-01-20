'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function ExperienceNow() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>立即开始您的地质勘察之旅</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          准备好体验专业的地质勘察服务了吗？
        </h2>

        <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
          加入我们的平台，获取最新的行业资讯、专业的设备租赁服务和优质的项目机会
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 text-lg"
          >
            免费注册
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 text-lg"
          >
            联系我们
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div>
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-blue-200">成功项目</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">300+</div>
            <div className="text-blue-200">合作企业</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-blue-200">客户满意度</div>
          </div>
        </div>
      </div>
    </section>
  );
}
