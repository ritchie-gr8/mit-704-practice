'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'หน้าหลัก', icon: '🏠' },
    { href: '/exam-guide', label: 'แนวข้อสอบ', icon: '🧠' },
    { href: '/review', label: 'ทบทวน', icon: '📖' },
    { href: '/quiz', label: 'ปรนัย', icon: '✅' },
    { href: '/subjective-test', label: 'อัตนัย', icon: '📝' },
    { href: '/chat', label: 'ถาม AI', icon: '💬' },
  ];

  return (
    <nav className="px-4 pt-8">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-[32px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-5 text-slate-700 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="flex flex-col">
              <span className="text-sm uppercase tracking-[0.3em] text-slate-400">
                mit-704
              </span>
              <span className="text-2xl font-semibold text-slate-900">
                Final Prep Studio
              </span>
            </Link>
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'border-transparent bg-gradient-to-r from-[#f7baff] to-[#b8c0ff] text-slate-900 shadow-sm'
                        : 'border-slate-200/80 bg-white/80 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
