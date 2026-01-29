'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { GuideModule } from './types';

function renderTextWithLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, linkText, href] = match;
    parts.push(
      <Link
        key={match.index}
        href={href}
        className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
      >
        {linkText}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

interface ReviewClientProps {
  intro: string[];
  modules: GuideModule[];
}

export default function ReviewClient({ intro, modules }: ReviewClientProps) {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleModule = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((moduleId) => moduleId !== id) : [...prev, id]
    );
  };

  const expandAll = () => setExpandedIds(modules.map((module) => module.id));
  const collapseAll = () => setExpandedIds([]);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-slate-100 bg-gradient-to-br from-white to-[#f7f9ff] p-8 text-slate-800 shadow-inner">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">review guide</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">สรุปเนื้อหาเตรียมสอบ</h1>
        <p className="text-base text-slate-500">อัปเดตจาก guide.md เวอร์ชันล่าสุด</p>
        <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white/80 px-5 py-3 text-sm text-slate-600 shadow-sm">
        <p>แตะการ์ดเพื่อเปิดรายละเอียดเพิ่มเติมของแต่ละ Module</p>
        <div className="space-x-3">
          <button
            onClick={expandAll}
            className="font-medium text-slate-900 underline-offset-2 transition hover:text-slate-500"
          >
            เปิดทั้งหมด
          </button>
          <button
            onClick={collapseAll}
            className="font-medium text-slate-500 underline-offset-2 transition hover:text-slate-900"
          >
            ปิดทั้งหมด
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {modules.map((module) => {
          const isExpanded = expandedIds.includes(module.id);
          return (
            <div
              key={module.id}
              className="overflow-hidden rounded-[28px] border border-slate-100 bg-white/90 shadow-[0_25px_55px_rgba(15,23,42,0.08)]"
            >
              <button
                onClick={() => toggleModule(module.id)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    module {module.id}
                  </p>
                  <h2 className="text-xl font-semibold text-slate-900">{module.title}</h2>
                  {module.intro.length > 0 && (
                    <p className="mt-1 text-sm text-slate-500">{module.intro[0]}</p>
                  )}
                </div>
                <span
                  className={`ml-4 flex h-9 w-9 items-center justify-center rounded-full border transition ${
                    isExpanded
                      ? 'border-transparent bg-gradient-to-r from-[#ffd6e8] to-[#cfd8ff] text-slate-900 shadow-sm'
                      : 'border-pink-100 bg-pink-50/70 text-pink-400'
                  }`}
                >
                  {isExpanded ? '–' : '+'}
                </span>
              </button>
              {isExpanded && (
                <div className="border-t border-slate-100 px-6 py-6 text-sm text-slate-700">
                  {module.intro.slice(1).map((paragraph) => (
                    <p key={paragraph} className="mb-4 leading-relaxed">
                      {renderTextWithLinks(paragraph)}
                    </p>
                  ))}
                  <div className="space-y-6">
                    {module.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
                        <ul className="mt-2 space-y-1.5 text-slate-600">
                          {section.bullets.map((bullet, idx) => (
                            <li key={`${section.title}-${idx}`} className="flex gap-3 leading-relaxed">
                              <span className="text-slate-400">•</span>
                              <span>{renderTextWithLinks(bullet)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
