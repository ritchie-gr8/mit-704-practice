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
  answerFramework: string[];
  labSections: {
    title: string;
    bullets: string[];
  }[];
  modules: GuideModule[];
}

export default function ReviewClient({
  intro,
  answerFramework,
  labSections,
  modules,
}: ReviewClientProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleModule = (moduleKey: string) => {
    setExpandedIds((prev) =>
      prev.includes(moduleKey)
        ? prev.filter((id) => id !== moduleKey)
        : [...prev, moduleKey]
    );
  };

  const expandAll = () => setExpandedIds(modules.map((module) => module.moduleKey));
  const collapseAll = () => setExpandedIds([]);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-slate-100 bg-gradient-to-br from-white to-[#f7f9ff] p-8 text-slate-800 shadow-inner">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">review guide</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">สรุปเนื้อหาเตรียมสอบ</h1>
        <p className="text-base text-slate-500">อัปเดตจาก canonical final content ชุดเดียวกับทั้งแอป</p>
        <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-5 text-sm text-slate-700 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">answer frame</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">โครงตอบข้อสอบที่ควรฝึก</h2>
        <div className="mt-3 space-y-2">
          {answerFramework.map((item) => (
            <p key={item}>• {item}</p>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-sky-50 px-6 py-5 text-sm text-slate-700 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">lab focus</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">หัวข้อ lab ที่ต้องคล่อง</h2>
          </div>
          <Link
            href="/exam-guide"
            className="text-sm font-medium text-cyan-700 underline underline-offset-2"
          >
            ดูสรุปแนวข้อสอบ →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {labSections.map((section) => (
            <div key={section.title} className="rounded-xl border border-cyan-100 bg-white/80 p-4">
              <h3 className="font-semibold text-slate-900">{section.title}</h3>
              <ul className="mt-2 space-y-1.5">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span>•</span>
                    <span>{renderTextWithLinks(bullet)}</span>
                  </li>
                ))}
              </ul>
            </div>
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
          const isExpanded = expandedIds.includes(module.moduleKey);
          return (
            <div
              key={module.moduleKey}
              className="overflow-hidden rounded-[28px] border border-slate-100 bg-white/90 shadow-[0_25px_55px_rgba(15,23,42,0.08)]"
            >
              <button
                onClick={() => toggleModule(module.moduleKey)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {module.badge}
                  </p>
                  <h2 className="text-xl font-semibold text-slate-900">{module.title}</h2>
                  {module.overview.length > 0 && (
                    <p className="mt-1 text-sm text-slate-500">{module.overview[0]}</p>
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
                  {module.overview.slice(1).map((paragraph) => (
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
