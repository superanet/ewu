'use client';

import { Shield, Clock, Award, HeadphonesIcon } from 'lucide-react';

const guarantees = [
  {
    icon: Shield,
    title: '质量保障',
    description: '严格的质量管理体系，确保每个项目都达到行业标准',
  },
  {
    icon: Clock,
    title: '准时交付',
    description: '专业的项目管理团队，保证按时完成每一个项目',
  },
  {
    icon: Award,
    title: '专业认证',
    description: '拥有多项行业资质认证，20年专业经验积累',
  },
  {
    icon: HeadphonesIcon,
    title: '全程服务',
    description: '7×24小时技术支持，随时响应您的需求',
  },
];

export function ServiceGuarantee() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            服务保障
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            我们承诺为每一位客户提供专业、可靠的服务，让您的项目无忧进行
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
