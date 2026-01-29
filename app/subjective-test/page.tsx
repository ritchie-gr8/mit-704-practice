'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  module: number;
}

interface ReviewItem {
  id: number;
  score: number;
  feedback: string;
  correctAnswer?: string;
  suggestion?: string;
}

interface ReviewResult {
  reviews: ReviewItem[];
  totalScore: number;
  maxScore: number;
  overallFeedback: string;
}

type TestState = 'idle' | 'generating' | 'answering' | 'reviewing' | 'results';

export default function SubjectiveTestPage() {
  const [state, setState] = useState<TestState>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async () => {
    setState('generating');
    setError(null);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setAnswers({});
      setState('answering');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
      setState('idle');
    }
  };

  const submitAnswers = async () => {
    setState('reviewing');
    setError(null);

    try {
      const answersArray = questions.map((q) => ({
        id: q.id,
        question: q.question,
        module: q.module,
        answer: answers[q.id] || '',
      }));

      const response = await fetch('/api/review-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: answersArray }),
      });

      if (!response.ok) {
        throw new Error('Failed to review answers');
      }

      const data = await response.json();
      setReview(data);
      setState('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
      setState('answering');
    }
  };

  const resetTest = () => {
    setState('idle');
    setQuestions([]);
    setAnswers({});
    setReview(null);
    setError(null);
  };

  const getScoreColor = (score: number, max: number = 10) => {
    const pct = (score / max) * 100;
    if (pct >= 80) return 'text-green-600';
    if (pct >= 60) return 'text-blue-600';
    if (pct >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ข้อสอบอัตนัย
        </h1>
        <p className="text-gray-600">
          ทดสอบความเข้าใจด้วยคำถามอัตนัย 5 ข้อ ตรวจโดย AI
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Idle State */}
      {state === 'idle' && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            พร้อมทดสอบหรือยัง?
          </h2>
          <p className="text-gray-600 mb-6">
            AI จะสร้างคำถามอัตนัย 5 ข้อ จากเนื้อหาวิชา MIT-704<br />
            คุณต้องตอบคำถามแต่ละข้อด้วยตัวเอง แล้ว AI จะตรวจและให้คะแนน
          </p>
          <button
            onClick={generateQuestions}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            เริ่มทำข้อสอบ
          </button>

          <div className="mt-6 text-sm text-gray-500">
            <Link href="/review" className="text-indigo-600 hover:underline">
              ทบทวนเนื้อหาก่อน →
            </Link>
          </div>
        </div>
      )}

      {/* Generating State */}
      {state === 'generating' && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin text-4xl mb-4">⚙️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            กำลังสร้างคำถาม...
          </h2>
          <p className="text-gray-600">
            AI กำลังสร้างคำถามอัตนัยจากเนื้อหาวิชา
          </p>
        </div>
      )}

      {/* Answering State */}
      {state === 'answering' && (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm text-gray-500">
                  ข้อที่ {index + 1}
                </span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                  Module {q.module}
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {q.question}
              </h3>
              <textarea
                value={answers[q.id] || ''}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
                placeholder="พิมพ์คำตอบของคุณที่นี่..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
          ))}

          <div className="flex gap-3">
            <button
              onClick={resetTest}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={submitAnswers}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              ส่งคำตอบ
            </button>
          </div>
        </div>
      )}

      {/* Reviewing State */}
      {state === 'reviewing' && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-pulse text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            กำลังตรวจคำตอบ...
          </h2>
          <p className="text-gray-600">
            AI กำลังวิเคราะห์และให้คะแนนคำตอบของคุณ
          </p>
        </div>
      )}

      {/* Results State */}
      {state === 'results' && review && (
        <div className="space-y-6">
          {/* Score Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className={`text-5xl font-bold mb-2 ${getScoreColor(review.totalScore, review.maxScore)}`}>
              {review.totalScore}/{review.maxScore}
            </div>
            <div className="text-gray-600 mb-4">
              คะแนนรวม ({Math.round((review.totalScore / review.maxScore) * 100)}%)
            </div>
            <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
              {review.overallFeedback}
            </p>
          </div>

          {/* Individual Reviews */}
          {review.reviews.map((r, index) => {
            const question = questions.find((q) => q.id === r.id);
            return (
              <div key={r.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm text-gray-500">
                    ข้อที่ {index + 1}
                  </span>
                  <span className={`text-lg font-bold ${getScoreColor(r.score)}`}>
                    {r.score}/10
                  </span>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {question?.question}
                </h3>

                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="text-xs text-gray-500 mb-1">คำตอบของคุณ:</div>
                  <p className="text-gray-700">
                    {answers[r.id] || '(ไม่ได้ตอบ)'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      การตรวจ:
                    </div>
                    <p className="text-gray-600 text-sm">{r.feedback}</p>
                  </div>

                  {r.correctAnswer && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-sm font-medium text-green-800 mb-1">
                        คำตอบที่ถูกต้อง:
                      </div>
                      <p className="text-green-700 text-sm">{r.correctAnswer}</p>
                    </div>
                  )}

                  {r.suggestion && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="text-sm font-medium text-blue-800 mb-1">
                        คำแนะนำ:
                      </div>
                      <p className="text-blue-700 text-sm">{r.suggestion}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={resetTest}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              ทำข้อสอบใหม่
            </button>
            <Link
              href="/review"
              className="flex-1 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors text-center"
            >
              ทบทวนเนื้อหา
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
