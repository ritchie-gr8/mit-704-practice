'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopicCard from '@/components/TopicCard';
import { modules } from '@/lib/questions';
import { storage } from '@/lib/storage';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [selectedModules, setSelectedModules] = useState<number[]>([]);

  const toggleModule = (moduleId: number) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const selectAll = () => {
    setSelectedModules(modules.map((m) => m.id));
  };

  const clearSelection = () => {
    setSelectedModules([]);
  };

  const startQuiz = () => {
    if (selectedModules.length === 0) return;

    storage.saveQuizState({
      selectedModules,
      currentQuestion: 0,
      answers: {},
      startTime: Date.now(),
    });

    router.push('/quiz');
  };

  const totalQuestions = modules
    .filter((m) => selectedModules.includes(m.id))
    .reduce((sum, m) => sum + m.questionCount, 0);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#ffcfde] via-[#ffe7c4] to-[#cfd8ff] p-8 text-slate-900 shadow-[0_25px_60px_rgba(255,166,158,0.35)]">
        <div className="relative z-10 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.5em] text-slate-600">
              midterm prep
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src="/school_test_seifuku_girl.png"
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full border border-white/50 bg-white/60 p-1"
              />
              <p className="text-base font-semibold text-slate-900">
                ไม่เน้นเรียนเก่ง แต่เน้นเรียนจบ
              </p>
            </div>
            <p className="mt-4 text-base text-slate-700">
              เลือก Module ที่ชอบ แล้วปล่อยให้เราออกข้อสอบให้อัตโนมัติ ทั้งแบบปรนัย
              และอัตนัย พร้อมรีวิวแบบ AI หลังทำเสร็จ
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-700">
              <span className="text-lg">✨</span>
              แนะนำเลือกอย่างน้อย 2 หัวข้อเพื่อความท้าทาย
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-3xl bg-white/65 p-5 text-center text-sm font-medium text-slate-600">
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                เลือกแล้ว
              </p>
              <p className="mt-1 text-3xl font-semibold text-slate-900">
                {selectedModules.length}
              </p>
              <p>หัวข้อ</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                รวม
              </p>
              <p className="mt-1 text-3xl font-semibold text-slate-900">
                {totalQuestions}
              </p>
              <p>คำถาม</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-dashed border-slate-200/70 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                mission today
              </p>
              <p className="mt-2 text-base text-slate-700">
                เลือก Module ที่อยากฝึก แล้วเริ่มทำข้อสอบได้เลย
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-white/40 blur-3xl"></div>
          <div className="absolute left-5 bottom-5 h-24 w-24 rounded-full bg-white/40 blur-2xl"></div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            เลือกแล้ว {selectedModules.length} หัวข้อ ({totalQuestions} คำถาม)
          </p>
          <p className="text-base font-medium text-slate-800">
            แตะที่การ์ดเพื่อเลือก/ยกเลิกหัวข้อ
          </p>
        </div>
        <div className="mt-4 flex gap-2 text-sm sm:mt-0">
          <button
            onClick={selectAll}
            className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            เลือกทั้งหมด
          </button>
          <button
            onClick={clearSelection}
            className="rounded-full border border-transparent bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
          >
            ล้างการเลือก
          </button>
        </div>
      </section>

      <section className="space-y-4">
        {modules.map((module) => (
          <TopicCard
            key={module.id}
            module={module}
            selected={selectedModules.includes(module.id)}
            onToggle={() => toggleModule(module.id)}
          />
        ))}
      </section>

      <button
        onClick={startQuiz}
        disabled={selectedModules.length === 0}
        className="w-full rounded-2xl bg-slate-900 py-4 text-lg font-semibold text-white shadow-[0_20px_45px_rgba(15,23,42,0.25)] transition hover:translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedModules.length === 0
          ? 'เลือก Module ก่อนเริ่มทำแบบทดสอบ'
          : `เริ่มทำแบบทดสอบ (${totalQuestions} ข้อ)`}
      </button>

      <section className="rounded-[28px] border border-slate-100 bg-gradient-to-br from-white to-[#f7f9ff] p-6 shadow-inner">
        <h3 className="text-lg font-semibold text-slate-900">วิธีใช้งาน</h3>
        <p className="text-sm text-slate-500">
          ใช้เวลาสั้นๆ ก็พร้อมสอบได้แล้ว
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            'เลือก Module ที่อยากฝึก (เลือกได้หลายหัวข้อพร้อมกัน)',
            'กดเริ่มทำ → ระบบจะสร้างข้อสอบใหม่ให้ทันที',
            'ตอบคำถามทีละข้อ แล้วส่งเพื่อดูคะแนนทันที',
            'อ่านคำอธิบายและรีวิวที่ AI สรุปให้แบบเข้าใจง่าย',
            'ใช้หน้า Review หรือ AI Chat เพื่อทบทวนจุดที่ยังไม่มั่นใจ',
          ].map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white/90 px-4 py-3 text-sm text-slate-600"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
