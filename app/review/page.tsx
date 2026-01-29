'use client';

import { useState } from 'react';
import { reviewSections, ReviewSection } from '@/lib/reviewContent';

function ModuleCard({ section, isExpanded, onToggle }: {
  section: ReviewSection;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div>
          <h2 className="text-lg font-semibold text-indigo-700">{section.title}</h2>
          <p className="text-sm text-gray-600">{section.subtitle}</p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          {section.content.map((topic, idx) => (
            <div key={idx} className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">{topic.heading}</h3>
              <ul className="space-y-1">
                {topic.points.map((point, pIdx) => (
                  <li key={pIdx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-indigo-500 mr-2 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReviewPage() {
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const toggleModule = (id: number) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedModules(reviewSections.map((s) => s.id));
  };

  const collapseAll = () => {
    setExpandedModules([]);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          สรุปเนื้อหาเตรียมสอบ
        </h1>
        <p className="text-gray-600">
          ทบทวนเนื้อหาสำคัญจากแต่ละ Module
        </p>
      </div>

      <div className="flex justify-end mb-4 space-x-2">
        <button
          onClick={expandAll}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          เปิดทั้งหมด
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={collapseAll}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          ปิดทั้งหมด
        </button>
      </div>

      <div className="space-y-4">
        {reviewSections.map((section) => (
          <ModuleCard
            key={section.id}
            section={section}
            isExpanded={expandedModules.includes(section.id)}
            onToggle={() => toggleModule(section.id)}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-medium text-green-900 mb-2">เคล็ดลับการสอบ</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• จำความแตกต่างระหว่าง OSI (7 layers) และ TCP/IP (4 layers)</li>
          <li>• เข้าใจสูตรคำนวณ Host: 2^h - 2</li>
          <li>• จำหลักการ Switch: Learning (Source MAC) และ Forwarding (Destination MAC)</li>
          <li>• Bandwidth = ความจุ, Throughput = ความเร็วจริง, Goodput = ข้อมูลใช้ได้จริง</li>
        </ul>
      </div>
    </div>
  );
}
