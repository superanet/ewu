'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  User,
  LogOut,
  Search,
  ChevronDown,
  Bell,
  Settings,
  MessageCircle,
  UserCircle,
  Phone,
  Shield,
  Building2,
  Wrench,
  FileText,
  Users,
  Briefcase,
  GraduationCap,
  Server,
  Download,
  Package,
  Lightbulb,
  Lock,
  Cloud,
  Brain,
  BarChart,
  FolderKanban,
  Hammer,
  FlaskConical,
  BookOpen,
  MapPin,
  Award,
  TrendingUp,
  Building
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User as UserType } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * 导航菜单项接口
 */
interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  megaMenu?: MegaMenuConfig;
}

/**
 * 大型菜单配置接口
 */
interface MegaMenuConfig {
  leftPanel?: {
    title: string;
    description: string;
    cta?: {
      text: string;
      href: string;
    };
    contact?: string;
  };
  rightPanel: {
    categories: MenuCategory[];
  };
}

/**
 * 菜单分类接口
 */
interface MenuCategory {
  title: string;
  items: MenuItem[];
  color: string;
}

/**
 * 菜单项接口
 */
interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

/**
 * 主导航栏组件
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data: user } = useSWR<UserType>('/api/user', fetcher);
  const router = useRouter();

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.navbar-dropdown')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  // 主导航菜单配置
  const navigationConfig: NavigationItem[] = [
    {
      label: '首页',
      href: '/'
    },
    {
      label: '服务中心',
      href: '/services',
      megaMenu: {
        leftPanel: {
          title: '数智化地质勘察服务体系',
          description: '为地质勘察行业提供全方位的专业服务，涵盖设备服务、软件服务、项目分发、工程施工、科研支持、技术培训等核心服务。',
          cta: {
            text: '了解更多',
            href: '/services'
          },
          contact: '400-123-4567'
        },
        rightPanel: {
          categories: [
            {
              title: '设备服务',
              color: 'orange',
              items: [
                { label: '设备托管', href: '/equipment#hosting', icon: Building2, iconColor: 'text-orange-500' },
                { label: '设备租赁', href: '/equipment#rental', icon: Wrench, iconColor: 'text-orange-500' },
                { label: '设备代理销售', href: '/equipment#sales', icon: Package, iconColor: 'text-orange-500' },
                { label: '设备回收', href: '/equipment#recycling', icon: TrendingUp, iconColor: 'text-orange-500' }
              ]
            },
            {
              title: '软件服务',
              color: 'blue',
              items: [
                { label: '软件开发', href: '/services/software#development', icon: Server, iconColor: 'text-blue-500' },
                { label: '软件下载', href: '/services/software#download', icon: Download, iconColor: 'text-blue-500' },
                { label: '软件代理销售', href: '/services/software#sales', icon: Package, iconColor: 'text-blue-500' }
              ]
            },
            {
              title: '项目分发服务',
              color: 'green',
              items: [
                { label: '项目分发平台', href: '/services/projects#distribution', icon: FolderKanban, iconColor: 'text-green-500' },
                { label: '项目外包', href: '/services/projects#outsourcing', icon: Users, iconColor: 'text-green-500' },
                { label: '项目众包', href: '/services/projects#crowdsourcing', icon: Users, iconColor: 'text-green-500' }
              ]
            }
          ]
        }
      }
    },
    {
      label: '解决方案',
      href: '/solutions',
      megaMenu: {
        leftPanel: {
          title: '专业地质勘察解决方案',
          description: '针对不同行业和技术需求，提供定制化的地质勘察解决方案，助力企业数字化转型和效率提升。',
          cta: {
            text: '查看全部方案',
            href: '/solutions'
          },
          contact: '400-123-4567'
        },
        rightPanel: {
          categories: [
            {
              title: '行业解决方案',
              color: 'blue',
              items: [
                { label: '勘察设计院解决方案', href: '/solutions/design-institute', icon: Building, iconColor: 'text-blue-500' },
                { label: '地质勘察企业解决方案', href: '/solutions/geological-survey', icon: MapPin, iconColor: 'text-blue-500' },
                { label: '工程咨询公司解决方案', href: '/solutions/engineering-consulting', icon: Briefcase, iconColor: 'text-blue-500' }
              ]
            },
            {
              title: '技术解决方案',
              color: 'green',
              items: [
                { label: '数字化勘察解决方案', href: '/solutions/digital-survey', icon: Server, iconColor: 'text-green-500' },
                { label: '智能分析解决方案', href: '/solutions/intelligent-analysis', icon: Brain, iconColor: 'text-green-500' },
                { label: '云端协作解决方案', href: '/solutions/cloud-collaboration', icon: Cloud, iconColor: 'text-green-500' },
                { label: '数据安全解决方案', href: '/solutions/data-security', icon: Lock, iconColor: 'text-green-500' }
              ]
            }
          ]
        }
      }
    },
    {
      label: '客户案例',
      href: '/cases'
    },
    {
      label: '产品下载',
      href: '/downloads'
    },
    {
      label: '关于我们',
      href: '/about'
    }
  ];

  /**
   * 渲染大型菜单
   */
  const renderMegaMenu = (megaMenu: MegaMenuConfig) => {
    return (
      <div className="w-full bg-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[500px]">
            {/* 左侧产品展示区域 */}
            {megaMenu.leftPanel && (
              <div className="w-80 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 m-4 rounded-xl">
                <h3 className="text-lg font-bold mb-3">{megaMenu.leftPanel.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                  {megaMenu.leftPanel.description}
                </p>

                {megaMenu.leftPanel.cta && (
                  <Link
                    href={megaMenu.leftPanel.cta.href}
                    className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors mb-4 shadow-sm"
                  >
                    {megaMenu.leftPanel.cta.text}
                  </Link>
                )}

                {megaMenu.leftPanel.contact && (
                  <div className="flex items-center text-blue-100 text-sm mt-4 pt-4 border-t border-blue-500/30">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-medium">{megaMenu.leftPanel.contact}</span>
                  </div>
                )}
              </div>
            )}

            {/* 右侧功能分类区域 */}
            <div className="flex-1 p-6">
              <div className="space-y-8">
                {megaMenu.rightPanel.categories.map((category, index) => (
                  <div key={index} className="space-y-4">
                    <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
                      <span className={`w-1 h-6 rounded-full mr-3 ${
                        category.color === 'orange' ? 'bg-orange-500' :
                        category.color === 'blue' ? 'bg-blue-500' :
                        category.color === 'green' ? 'bg-green-500' :
                        category.color === 'red' ? 'bg-red-500' :
                        category.color === 'purple' ? 'bg-purple-500' :
                        category.color === 'indigo' ? 'bg-indigo-500' :
                        'bg-gray-500'
                      }`}></span>
                      {category.title}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                      {category.items.map((item, itemIndex) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className="flex items-center px-3 py-2 rounded-lg transition-all duration-300 group transform hover:scale-[1.02] active:scale-[0.98] bg-gray-100 hover:bg-gray-200 hover:shadow-md cursor-pointer"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110 ${
                              category.color === 'orange' ? 'bg-orange-50 group-hover:bg-orange-100' :
                              category.color === 'blue' ? 'bg-blue-50 group-hover:bg-blue-100' :
                              category.color === 'green' ? 'bg-green-50 group-hover:bg-green-100' :
                              category.color === 'red' ? 'bg-red-50 group-hover:bg-red-100' :
                              category.color === 'purple' ? 'bg-purple-50 group-hover:bg-purple-100' :
                              category.color === 'indigo' ? 'bg-indigo-50 group-hover:bg-indigo-100' :
                              'bg-gray-50 group-hover:bg-gray-100'
                            }`}>
                              <Icon className={`h-4 w-4 ${item.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium block truncate transition-colors duration-300">
                                {item.label}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * 渲染桌面端导航项
   */
  const renderDesktopNavItem = (item: NavigationItem) => {
    const hasMegaMenu = item.megaMenu;
    const hasChildren = item.children && item.children.length > 0;

    if (!hasMegaMenu && !hasChildren) {
      return (
        <Link
          key={item.href}
          href={item.href}
          className="text-gray-500 hover:text-gray-900 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors h-full"
          onClick={() => setActiveDropdown(null)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div
        key={item.href}
        className="relative group h-full flex items-center navbar-dropdown"
        onMouseEnter={() => setActiveDropdown(item.label)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <Link
          href={item.href}
          className="text-gray-500 hover:text-gray-900 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors h-full"
          onClick={() => setActiveDropdown(null)}
        >
          {item.label}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Link>

        {/* 大型菜单 */}
        {hasMegaMenu && item.megaMenu && (
          <div className={`fixed left-0 top-16 w-full z-50 transition-all duration-300 ${
            activeDropdown === item.label ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            {renderMegaMenu(item.megaMenu)}
          </div>
        )}

        {/* 传统下拉菜单 */}
        {!hasMegaMenu && hasChildren && (
          <div className={`fixed left-0 top-16 w-full bg-white rounded-md shadow-xl border border-gray-200 py-2 z-50 transition-all duration-200 max-h-[80vh] overflow-y-auto ${
            activeDropdown === item.label ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-md"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo 和主导航 */}
          <div className="flex items-center h-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center h-full">
              <Link href="/" className="text-xl font-bold text-gray-900">
                易物地质勘察
              </Link>
            </div>

            {/* 桌面端主导航 */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-2 h-full">
              {navigationConfig.map((item) => renderDesktopNavItem(item))}
            </div>
          </div>

          {/* 用户操作区域 */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {/* 搜索功能 */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="搜索产品、案例、新闻..."
                    className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {user ? (
              <>
                {/* 消息通知 */}
                <Button variant="ghost" size="sm" className="p-2 relative" asChild>
                  <Link href="/messages">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </Link>
                </Button>

                {/* 用户头像下拉菜单 */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 h-10">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:inline-block text-sm font-medium">
                        {user.name || '用户'}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name || '用户'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email || ''}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center cursor-pointer">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>个人中心</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>账户设置</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                      onClick={() => {
                        if (confirm('确定要退出登录吗？')) {
                          handleSignOut();
                        }
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>退出登录</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">登录</Link>
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" asChild>
                  <Link href="/sign-up">注册</Link>
                </Button>
              </div>
            )}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t max-h-96 overflow-y-auto">
            {/* 移动端搜索 */}
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder="搜索产品、案例、新闻..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 移动端导航菜单 */}
            {navigationConfig.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}

            {/* 移动端用户操作 */}
            <div className="border-t pt-4 mt-4">
              {user ? (
                <div className="space-y-1">
                  {/* 用户信息显示 */}
                  <div className="px-3 py-2 border-b border-gray-100 mb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name || '用户'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email || ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserCircle className="mr-3 h-5 w-5" />
                    个人中心
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    账户设置
                  </Link>

                  <button
                    type="button"
                    className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700"
                    onClick={() => {
                      if (confirm('确定要退出登录吗？')) {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    退出登录
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    href="/sign-in"
                    className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    登录
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    注册
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
