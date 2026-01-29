'use client';

import { ModuleInfo } from '@/lib/types';

interface TopicCardProps {
  module: ModuleInfo;
  selected: boolean;
  onToggle: () => void;
}

export default function TopicCard({ module, selected, onToggle }: TopicCardProps) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
        selected
          ? 'border-indigo-500 bg-indigo-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{module.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{module.description}</p>
          <p className="mt-2 text-xs text-gray-500">
            {module.questionCount} คำถาม
          </p>
        </div>
        <div
          className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
            selected
              ? 'border-indigo-500 bg-indigo-500 text-white'
              : 'border-gray-300'
          }`}
        >
          {selected && (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
