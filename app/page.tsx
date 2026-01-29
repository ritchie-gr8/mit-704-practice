'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopicCard from '@/components/TopicCard';
import { modules } from '@/lib/questions';
import { storage } from '@/lib/storage';

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
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          MIT-704 Midterm Practice
        </h1>
        <p className="text-gray-600">
          เลือกหัวข้อที่ต้องการฝึกทำข้อสอบ
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          เลือกแล้ว {selectedModules.length} หัวข้อ ({totalQuestions} คำถาม)
        </div>
        <div className="space-x-2">
          <button
            onClick={selectAll}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            เลือกทั้งหมด
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={clearSelection}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ล้างการเลือก
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {modules.map((module) => (
          <TopicCard
            key={module.id}
            module={module}
            selected={selectedModules.includes(module.id)}
            onToggle={() => toggleModule(module.id)}
          />
        ))}
      </div>

      <button
        onClick={startQuiz}
        disabled={selectedModules.length === 0}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {selectedModules.length === 0
          ? 'กรุณาเลือกหัวข้อ'
          : `เริ่มทำแบบทดสอบ (${totalQuestions} ข้อ)`}
      </button>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">วิธีใช้งาน</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>1. เลือกหัวข้อที่ต้องการฝึก (เลือกได้หลายหัวข้อ)</li>
          <li>2. กดปุ่มเริ่มทำแบบทดสอบ</li>
          <li>3. ตอบคำถามทีละข้อ และกดส่งเมื่อเสร็จ</li>
          <li>4. ดูผลคะแนนและคำอธิบายสำหรับข้อที่ตอบผิด</li>
          <li>5. ใช้ฟีเจอร์ AI Chat เพื่อถามคำถามเพิ่มเติม</li>
        </ul>
      </div>
    </div>
  );
}
