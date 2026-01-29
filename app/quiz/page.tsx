'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizQuestion from '@/components/QuizQuestion';
import { getQuestionsByModules, shuffleQuestions } from '@/lib/questions';
import { storage } from '@/lib/storage';
import { Question, QuizResult } from '@/lib/types';

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const state = storage.getQuizState();
    if (!state || state.selectedModules.length === 0) {
      router.push('/');
      return;
    }

    const moduleQuestions = getQuestionsByModules(state.selectedModules);
    const shuffled = shuffleQuestions(moduleQuestions);
    setQuestions(shuffled);
    setCurrentIndex(state.currentQuestion);
    setAnswers(state.answers);
    setIsLoading(false);
  }, [router]);

  const handleSelectAnswer = (answerIndex: number) => {
    const questionId = questions[currentIndex].id;
    const newAnswers = { ...answers, [questionId]: answerIndex };
    setAnswers(newAnswers);

    const state = storage.getQuizState();
    if (state) {
      storage.saveQuizState({
        ...state,
        answers: newAnswers,
        currentQuestion: currentIndex,
      });
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    const state = storage.getQuizState();
    if (state) {
      storage.saveQuizState({
        ...state,
        currentQuestion: index,
      });
    }
  };

  const handleSubmit = () => {
    const state = storage.getQuizState();
    if (!state) return;

    let score = 0;
    const wrongAnswers: { question: Question; userAnswer: number }[] = [];
    const moduleBreakdown: Record<number, { correct: number; total: number }> = {};

    questions.forEach((q) => {
      if (!moduleBreakdown[q.module]) {
        moduleBreakdown[q.module] = { correct: 0, total: 0 };
      }
      moduleBreakdown[q.module].total++;

      const userAnswer = answers[q.id];
      if (userAnswer === q.correctAnswer) {
        score++;
        moduleBreakdown[q.module].correct++;
      } else {
        wrongAnswers.push({ question: q, userAnswer: userAnswer ?? -1 });
      }
    });

    const result: QuizResult = {
      date: new Date().toISOString(),
      score,
      total: questions.length,
      moduleBreakdown,
      wrongAnswers,
    };

    storage.saveQuizResult(result);
    storage.clearQuizState();

    // Store in sessionStorage for results page
    sessionStorage.setItem('lastQuizResult', JSON.stringify(result));
    router.push('/results');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">กำลังโหลด...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">ไม่พบคำถาม</p>
        <button
          onClick={() => router.push('/')}
          className="text-indigo-600 hover:text-indigo-800"
        >
          กลับหน้าหลัก
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div>
      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={answers[currentQuestion.id] ?? null}
        onSelectAnswer={handleSelectAnswer}
      />

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => goToQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-indigo-600 hover:text-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          ← ข้อก่อนหน้า
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => goToQuestion(currentIndex + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            ข้อถัดไป →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            ส่งคำตอบ
          </button>
        )}
      </div>

      {/* Question Navigation */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">
            ตอบแล้ว {answeredCount}/{questions.length} ข้อ
          </span>
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length}
            className="text-sm text-green-600 hover:text-green-800 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            ส่งคำตอบทั้งหมด
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => goToQuestion(index)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                index === currentIndex
                  ? 'bg-indigo-600 text-white'
                  : answers[q.id] !== undefined
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
