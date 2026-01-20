'use client';

import { Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Enterprise() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Building2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                企业级服务
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                为大型企业提供定制化的地质勘察解决方案，包括专属客户经理、优先技术支持和定制化服务
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  <span>专属客户经理</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  <span>优先技术支持</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  <span>定制化解决方案</span>
                </li>
              </ul>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                了解企业服务
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="hidden md:block h-full bg-gradient-to-br from-blue-500/20 to-blue-700/20">
              <div className="h-full flex items-center justify-center p-12">
                <div className="text-white/80 text-center">
                  <div className="text-6xl font-bold mb-2">300+</div>
                  <div className="text-xl">企业客户</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
