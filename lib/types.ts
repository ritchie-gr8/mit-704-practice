export type ModuleKey = '11-12' | '13' | '14' | '16' | '17';

export interface Question {
  id: string;
  moduleKey: ModuleKey;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizState {
  selectedModules: ModuleKey[];
  currentQuestion: number;
  answers: Record<string, number>;
  startTime: number;
}

export interface QuizResult {
  date: string;
  score: number;
  total: number;
  moduleBreakdown: Partial<Record<ModuleKey, { correct: number; total: number }>>;
  wrongAnswers: { question: Question; userAnswer: number }[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ModuleInfo {
  moduleKey: ModuleKey;
  badge: string;
  title: string;
  description: string;
  questionCount: number;
  emoji: string;
}
