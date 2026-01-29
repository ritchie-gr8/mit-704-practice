'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'หน้าหลัก', icon: '🏠' },
    { href: '/review', label: 'ทบทวน', icon: '📖' },
    { href: '/cidr-guide', label: 'CIDR', icon: '🔢' },
    { href: '/quiz', label: 'ปรนัย', icon: '✅' },
    { href: '/subjective-test', label: 'อัตนัย', icon: '📝' },
    { href: '/chat', label: 'ถาม AI', icon: '💬' },
  ];

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            MIT-704 Midterm
          </Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-indigo-700 text-white'
                    : 'text-indigo-100 hover:bg-indigo-500'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
