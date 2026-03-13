import Image from 'next/image';
import Link from 'next/link';
import {
  finalExamMetadata,
  getModuleInfo,
  guideModules,
  labChecklist,
} from '@/lib/finalExamContent';

function AnnotatedList({
  title,
  accentLabel,
  accentClassName,
  detailLabel,
  items,
}: {
  title: string;
  accentLabel: string;
  accentClassName: string;
  detailLabel: string;
  items: { heading: string; detail: string }[];
}) {
  return (
    <section className={`rounded-[26px] border p-5 shadow-sm ${accentClassName}`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold">{title}</h3>
        <span className="rounded-full bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
          {accentLabel}
        </span>
      </div>
      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div
            key={item.heading}
            className={`${index !== items.length - 1 ? 'border-b border-current/10 pb-4' : ''}`}
          >
            <div className="flex gap-2 text-sm font-medium leading-relaxed">
              <span className="mt-0.5">•</span>
              <p>{item.heading}</p>
            </div>
            <div className="mt-2 ml-5 rounded-2xl bg-white/65 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
              <span className="font-semibold text-slate-900">{detailLabel}:</span>{' '}
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ExamGuidePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-[32px] border border-white/70 bg-gradient-to-r from-[#ffe0f9] via-white to-[#dfe9ff] p-8 text-slate-900 shadow-[0_35px_60px_rgba(15,23,42,0.08)] md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-500">exam guide</p>
          <h1 className="text-3xl font-semibold text-slate-900">แนวข้อสอบปลายภาค MIT-704</h1>
          <p className="text-lg text-slate-600">
            ใช้เป็น blueprint สำหรับ final scope: scenario-based, troubleshooting-based
            และต้องอ่าน topology ให้ออก
          </p>
          <div className="space-y-2 text-sm text-slate-600">
            {finalExamMetadata.examStyle.map((item) => (
              <p key={item}>• {item}</p>
            ))}
          </div>
        </div>
        <div className="relative h-52 w-full">
          <Image
            src="/job_teacher_man.png"
            alt="อาจารย์กำลังติวให้นักศึกษา"
            fill
            priority
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </section>

      <section className="rounded-[28px] border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-amber-900">รูปแบบที่ควรเตรียม</h2>
            <p className="mt-1 text-sm text-amber-800/80">
              ข้อสอบรอบนี้ไม่ถามทุกอย่างเท่ากัน แต่จะบีบให้ตอบแบบมีเหตุผลและยกขั้นตอนตรวจสอบได้
            </p>
          </div>
          <Link
            href="/subjective-test"
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
          >
            ซ้อมอัตนัย →
          </Link>
        </div>
      </section>

      <div className="space-y-6">
        {guideModules.map((module) => {
          const info = getModuleInfo(module.moduleKey);
          return (
            <article
              key={module.moduleKey}
              className="rounded-[28px] border border-slate-100 bg-white/90 p-6 shadow-[0_25px_50px_rgba(15,23,42,0.07)]"
            >
              <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{info.badge}</p>
                  <h2 className="text-xl font-semibold text-slate-900">{info.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{info.description}</p>
                </div>
                <span className="rounded-full bg-gradient-to-r from-[#ffe6ef] to-[#dfe9ff] px-4 py-1 text-sm font-medium text-slate-700">
                  final exam focus
                </span>
              </div>
              <div className="mt-5 space-y-5">
                <AnnotatedList
                  title="ประเด็นที่ต้องรู้"
                  accentLabel="know"
                  detailLabel="คำอธิบาย"
                  accentClassName="border-pink-100 bg-gradient-to-br from-pink-50/95 via-rose-50/90 to-white text-pink-950"
                  items={module.mustKnow.map((item) => ({
                    heading: item.point,
                    detail: item.explanation,
                  }))}
                />
                <AnnotatedList
                  title="แนวข้อสอบ"
                  accentLabel="answer"
                  detailLabel="คำตอบ"
                  accentClassName="border-indigo-100 bg-gradient-to-br from-indigo-50/95 via-sky-50/85 to-white text-indigo-950"
                  items={module.examFocus.map((item) => ({
                    heading: item.prompt,
                    detail: item.answer,
                  }))}
                />
              </div>
            </article>
          );
        })}
      </div>

      <section className="rounded-[28px] border border-cyan-100 bg-gradient-to-r from-cyan-50 to-sky-50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-cyan-900">Lab Checklist</h2>
        <p className="mt-1 text-sm text-cyan-900/70">
          รวบ lab focus ไว้ในหน้านี้แทนการแยกหน้าใหม่ เพื่อให้ scope final อยู่ที่เดียว
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {labChecklist.map((section) => (
            <div key={section.title} className="rounded-xl border border-cyan-100 bg-white/80 p-5 shadow-sm">
              <h3 className="font-semibold text-cyan-800">{section.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-cyan-900/80">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span>•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
