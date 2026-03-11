'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizResult } from '@/lib/types';
import { getModuleInfo } from '@/lib/finalExamContent';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const savedResult = sessionStorage.getItem('lastQuizResult');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">ไม่พบผลการทดสอบ</p>
        <button
          onClick={() => router.push('/')}
          className="text-indigo-600 hover:text-indigo-800"
        >
          กลับหน้าหลัก
        </button>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.total) * 100);
  const getGrade = (pct: number) => {
    if (pct >= 80) return { text: 'ยอดเยี่ยม!', color: 'text-green-600' };
    if (pct >= 60) return { text: 'ดี', color: 'text-blue-600' };
    if (pct >= 40) return { text: 'พอใช้', color: 'text-yellow-600' };
    return { text: 'ต้องฝึกเพิ่มเติม', color: 'text-red-600' };
  };
  const grade = getGrade(percentage);

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ผลการทดสอบ</h1>
        <p className="text-gray-600">
          {new Date(result.date).toLocaleDateString('th-TH', {
            dateStyle: 'long',
          })}
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
        <div className="text-6xl font-bold text-indigo-600 mb-2">
          {result.score}/{result.total}
        </div>
        <div className="text-2xl text-gray-600 mb-2">{percentage}%</div>
        <div className={`text-xl font-medium ${grade.color}`}>{grade.text}</div>
      </div>

      {/* Module Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          คะแนนแยกตามหัวข้อ
        </h2>
        <div className="space-y-3">
          {Object.entries(result.moduleBreakdown).map(([moduleKey, data]) => {
            const module =
              moduleKey === '11-12' ||
              moduleKey === '13' ||
              moduleKey === '14' ||
              moduleKey === '16' ||
              moduleKey === '17'
                ? getModuleInfo(moduleKey)
                : null;
            if (!data) {
              return null;
            }
            const modulePct = Math.round((data.correct / data.total) * 100);
            return (
              <div key={moduleKey}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">
                    {module ? `${module.badge}: ${module.title}` : moduleKey}
                  </span>
                  <span className="text-gray-600">
                    {data.correct}/{data.total} ({modulePct}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      modulePct >= 60 ? 'bg-green-500' : 'bg-red-400'
                    }`}
                    style={{ width: `${modulePct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wrong Answers */}
      {result.wrongAnswers.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            ข้อที่ตอบผิด ({result.wrongAnswers.length} ข้อ)
          </h2>
          <div className="space-y-6">
            {result.wrongAnswers.map(({ question, userAnswer }, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="text-sm text-gray-500 mb-1">
                  {(
                    question.moduleKey === '11-12' ||
                    question.moduleKey === '13' ||
                    question.moduleKey === '14' ||
                    question.moduleKey === '16' ||
                    question.moduleKey === '17'
                      ? getModuleInfo(question.moduleKey).badge
                      : 'หัวข้อเดิม'
                  )}{' '}
                  - ข้อ {index + 1}
                </div>
                <p className="font-medium text-gray-900 mb-3">
                  {question.question}
                </p>

                <div className="space-y-2 mb-3">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-2 rounded text-sm ${
                        optIndex === question.correctAnswer
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : optIndex === userAnswer
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className="font-medium mr-2">
                        {String.fromCharCode(65 + optIndex)}.
                      </span>
                      {option}
                      {optIndex === question.correctAnswer && (
                        <span className="ml-2 text-green-600">✓ คำตอบที่ถูก</span>
                      )}
                      {optIndex === userAnswer && optIndex !== question.correctAnswer && (
                        <span className="ml-2 text-red-600">✗ คำตอบของคุณ</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="text-sm font-medium text-blue-800 mb-1">
                    คำอธิบาย:
                  </div>
                  <p className="text-sm text-blue-700">{question.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => router.push('/')}
          className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
        >
          ทำแบบทดสอบใหม่
        </button>
        <button
          onClick={() => router.push('/chat')}
          className="flex-1 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50"
        >
          ถาม AI เพิ่มเติม
        </button>
      </div>
    </div>
  );
}
