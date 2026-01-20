'use client';

import { CheckCircle, Target, Users, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Target,
    title: '精准匹配',
    description: '基于AI算法的智能匹配系统，快速找到最合适的服务和专家',
  },
  {
    icon: CheckCircle,
    title: '质量保证',
    description: '严格的质量管理体系，确保每个项目都达到行业标准',
  },
  {
    icon: Users,
    title: '专业团队',
    description: '20年行业经验，50+专业团队，1000+成功案例',
  },
  {
    icon: Zap,
    title: '高效便捷',
    description: '一站式服务平台，从需求发布到项目完成全程跟踪',
  },
];

export function SolutionsHighlight() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            为什么选择我们
          </h2>
          <p className="text-lg text-gray-600">
            专业、高效、可靠的地质勘察服务平台
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
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
