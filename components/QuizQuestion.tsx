'use client';

import { getModuleLabel } from '@/lib/finalExamContent';
import { Question } from '@/lib/types';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
}: QuizQuestionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
        <span>
          คำถามที่ {questionNumber} จาก {totalQuestions}
        </span>
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
          {getModuleLabel(question.moduleKey)}
        </span>
      </div>

      <h2 className="text-lg font-medium text-gray-900 mb-6">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedAnswer === index
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 mr-3 text-sm font-medium ${
                  selectedAnswer === index
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-gray-700">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
