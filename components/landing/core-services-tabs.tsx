'use client';

import { useState } from 'react';
import { Database, Wrench, FileText, Cloud } from 'lucide-react';

const services = [
  {
    id: 'info',
    name: '信息聚合服务',
    icon: Database,
    items: [
      {
        title: '勘察信息聚合平台',
        description: '整合招投标、技术资讯、设备信息等多维度数据',
        features: ['招投标信息', '技术资讯', '设备信息', '行业动态'],
      },
      {
        title: '行业资讯服务',
        description: '提供最新的行业动态、政策解读和技术趋势',
        features: ['行业动态', '政策解读', '技术趋势', '专家观点'],
      },
    ],
  },
  {
    id: 'equipment',
    name: '设备租赁服务',
    icon: Wrench,
    items: [
      {
        title: '勘察设备租赁',
        description: '2000+台专业设备，覆盖物探、测量、钻探等领域',
        features: ['在线预约', '配送服务', '技术支持', '灵活租期'],
      },
      {
        title: '设备托管服务',
        description: '专业的设备托管、维护保养和安全保障服务',
        features: ['安全存储', '定期维护', '保险保障', '快速调配'],
      },
    ],
  },
  {
    id: 'project',
    name: '项目服务',
    icon: FileText,
    items: [
      {
        title: '项目分发平台',
        description: '智能匹配需求与专业团队，高效完成项目',
        features: ['项目发布', '智能匹配', '进度跟踪', '质量保证'],
      },
      {
        title: '技术咨询服务',
        description: '专业的技术咨询和解决方案设计服务',
        features: ['技术咨询', '方案设计', '问题诊断', '持续支持'],
      },
    ],
  },
  {
    id: 'saas',
    name: 'SaaS应用服务',
    icon: Cloud,
    items: [
      {
        title: '勘察应用SaaS',
        description: '云端数据管理和协同作业平台',
        features: ['数据管理', '云端存储', '协同作业', '移动应用'],
      },
      {
        title: '数据分析SaaS',
        description: '智能数据分析和可视化报表生成',
        features: ['数据分析', '可视化', '报表生成', 'AI辅助'],
      },
    ],
  },
];

export function CoreServicesTabs() {
  const [activeTab, setActiveTab] = useState('info');

  const activeService = services.find((s) => s.id === activeTab);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            核心服务
          </h2>
          <p className="text-lg text-gray-600">
            为地质勘察行业提供全方位的专业服务
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === service.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {service.name}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeService && (
          <div className="grid md:grid-cols-2 gap-8">
            {activeService.items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
