export interface Question {
  id: string;
  module: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizState {
  selectedModules: number[];
  currentQuestion: number;
  answers: Record<string, number>;
  startTime: number;
}

export interface QuizResult {
  date: string;
  score: number;
  total: number;
  moduleBreakdown: Record<number, { correct: number; total: number }>;
  wrongAnswers: { question: Question; userAnswer: number }[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ModuleInfo {
  id: number;
  title: string;
  description: string;
  questionCount: number;
}
