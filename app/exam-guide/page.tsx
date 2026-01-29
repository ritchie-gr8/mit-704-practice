import { promises as fs } from 'fs';
import Image from 'next/image';
import path from 'path';

interface ExamModule {
  title: string;
  mustKnow: string[];
  examFocus: string[];
}

interface ExamGuideContent {
  heroTitle: string;
  heroSubtitle: string;
  modules: ExamModule[];
  closingNote?: string;
}

function collectBullets(lines: string[], start: number, end: number) {
  const bullets: string[] = [];
  for (let i = start; i < end && i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('*')) {
      bullets.push(line.replace(/^\*\s+/, '').trim());
    }
  }
  return bullets;
}

function parseExamGuide(markdown: string): ExamGuideContent {
  const heroTitle = markdown.match(/^#\s+(.+)/m)?.[1]?.trim() ?? 'แนวข้อสอบ';
  const heroSubtitle =
    markdown.match(/^##\s+(?!🔹)(.+)/m)?.[1]?.trim() ?? 'คู่มือเตรียมพร้อม MIT-704';
  const closingNote = markdown.match(/ขอให้นักศึกษาทุกคน.+/m)?.[0]?.trim();
  const sanitizedMarkdown = closingNote ? markdown.replace(closingNote, '').trim() : markdown;

  const moduleRegex = /##\s+🔹\s+Module[\s\S]*?(?=\n---|$)/g;
  const modules: ExamModule[] = [];
  let match: RegExpExecArray | null;

  while ((match = moduleRegex.exec(sanitizedMarkdown)) !== null) {
    const block = match[0].trim();
    const lines = block
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const titleLine = lines.shift() ?? '';
    const title = titleLine.replace(/^##\s+/, '').trim();
    const mustKnowIndex = lines.findIndex((line) => line.startsWith('ประเด็น'));
    const examFocusIndex = lines.findIndex((line) => line.startsWith('แนวข้อสอบ'));

    const mustKnow =
      mustKnowIndex !== -1
        ? collectBullets(
            lines,
            mustKnowIndex + 1,
            examFocusIndex === -1 ? lines.length : examFocusIndex
          )
        : [];

    const examFocus =
      examFocusIndex !== -1
        ? collectBullets(lines, examFocusIndex + 1, lines.length)
        : [];

    modules.push({ title, mustKnow, examFocus });
  }

  return { heroTitle, heroSubtitle, modules, closingNote };
}

export default async function ExamGuidePage() {
  const guidePath = path.join(process.cwd(), 'exam-guide.md');
  const markdown = await fs.readFile(guidePath, 'utf-8');
  const { heroTitle, heroSubtitle, modules, closingNote } = parseExamGuide(markdown);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-[32px] border border-white/70 bg-gradient-to-r from-[#ffe0f9] via-white to-[#dfe9ff] p-8 text-slate-900 shadow-[0_35px_60px_rgba(15,23,42,0.08)] md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-500">exam guide</p>
          <h1 className="text-3xl font-semibold text-slate-900">{heroTitle}</h1>
          <p className="text-lg text-slate-600">{heroSubtitle}</p>
          <p className="text-sm text-slate-500">
            อัปเดตอิงตามไฟล์ <code className="rounded bg-white/60 px-2 py-0.5">exam-guide.md</code>
          </p>
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

      <div className="space-y-6">
        {modules.map((module) => (
          <article
            key={module.title}
            className="rounded-[28px] border border-slate-100 bg-white/90 p-6 shadow-[0_25px_50px_rgba(15,23,42,0.07)]"
          >
            <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">module</p>
                <h2 className="text-xl font-semibold text-slate-900">{module.title}</h2>
              </div>
              <span className="rounded-full bg-gradient-to-r from-[#ffe6ef] to-[#dfe9ff] px-4 py-1 text-sm font-medium text-slate-700">
                แนวข้อสอบ MIT-704
              </span>
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-pink-50 bg-pink-50/70 p-5">
                <h3 className="text-base font-semibold text-pink-700">ประเด็นที่ต้องรู้</h3>
                <ul className="mt-3 space-y-2 text-sm text-pink-900/80">
                  {module.mustKnow.map((item, idx) => (
                    <li key={`${module.title}-know-${idx}`} className="flex gap-2">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-indigo-50 bg-indigo-50/70 p-5">
                <h3 className="text-base font-semibold text-indigo-700">แนวข้อสอบ</h3>
                <ul className="mt-3 space-y-2 text-sm text-indigo-900/80">
                  {module.examFocus.map((item, idx) => (
                    <li key={`${module.title}-focus-${idx}`} className="flex gap-2">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      {closingNote && (
        <div className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-6 text-center text-emerald-800 shadow-inner">
          {closingNote}
        </div>
      )}
    </div>
  );
}
