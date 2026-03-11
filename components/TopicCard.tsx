'use client';

import { ModuleInfo } from '@/lib/types';

interface TopicCardProps {
  module: ModuleInfo;
  selected: boolean;
  onToggle: () => void;
}

export default function TopicCard({ module, selected, onToggle }: TopicCardProps) {
  const accentColor = selected
    ? 'from-[#ffd6e8] via-[#ffe5c2] to-[#d7d5ff]'
    : 'from-white via-white to-white';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-full overflow-hidden rounded-2xl border bg-gradient-to-r ${accentColor} p-5 text-left transition-all duration-200 ${
        selected
          ? 'border-transparent shadow-[0_15px_40px_rgba(255,182,193,0.35)]'
          : 'border-slate-200 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-inner">
          {module.emoji}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            {module.badge}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {module.title}
          </h3>
          <p className="mt-1.5 text-sm text-slate-600">{module.description}</p>
          <p className="mt-3 inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
            {module.questionCount} คำถาม
          </p>
        </div>
        <span
          className={`ml-auto mt-1 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm ${
            selected
              ? 'border-transparent bg-slate-900 text-white'
              : 'border-slate-200 text-slate-400'
          }`}
        >
          {selected ? '★' : ''}
        </span>
      </div>
    </button>
  );
}
