'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

/**
 * 页脚组件
 * 包含联系方式、快速链接、产品服务、解决方案四个主要区域
 */
export function Footer() {
  // 快速链接
  const quickLinks = [
    { href: '/about', label: '关于我们' },
    { href: '/products', label: '产品中心' },
    { href: '/equipment', label: '设备服务' },
    { href: '/projects', label: '项目分发' },
    { href: '/solutions', label: '解决方案' },
    { href: '/articles', label: '行业资讯' },
    { href: '/downloads', label: '下载中心' },
    { href: '/cases', label: '客户案例' },
  ];

  // 产品服务
  const productServices = [
    { href: '/products', label: '勘察信息聚合平台' },
    { href: '/equipment', label: '勘察设备租赁平台' },
    { href: '/projects', label: '项目分发平台' },
    { href: '/services', label: '勘察应用SaaS' },
    { href: '/services', label: '数据分析SaaS' },
    { href: '/services', label: '技术咨询服务' },
  ];

  // 解决方案
  const solutions = [
    { href: '/solutions', label: '建筑工程勘察' },
    { href: '/solutions', label: '基础设施勘察' },
    { href: '/solutions', label: '环境地质调查' },
    { href: '/solutions', label: '地质灾害评估' },
    { href: '/solutions', label: '矿产资源勘查' },
    { href: '/solutions', label: '数字化勘察' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 主要内容区域 */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* 1. 联系方式区域 */}
            <div className="md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-5 text-white">联系我们</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">400-123-4567</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">contact@ewu-geo.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">北京市朝阳区某某大厦12层</span>
                </div>
              </div>
            </div>

            {/* 2. 快速链接区域 */}
            <div>
              <h3 className="text-lg font-semibold mb-5 text-white">快速链接</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. 产品服务区域 */}
            <div>
              <h3 className="text-lg font-semibold mb-5 text-white">产品服务</h3>
              <ul className="space-y-3">
                {productServices.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span>{service.label}</span>
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. 解决方案区域 */}
            <div>
              <h3 className="text-lg font-semibold mb-5 text-white">解决方案</h3>
              <ul className="space-y-3">
                {solutions.map((solution, index) => (
                  <li key={index}>
                    <Link
                      href={solution.href}
                      className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span>{solution.label}</span>
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 版权信息和备案信息 */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-sm text-gray-400 text-center lg:text-left">
              © 2024 易物地质勘察技术服务有限公司. 保留所有权利.
            </div>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                隐私政策
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">
                服务条款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
