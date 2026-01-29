import { QuizState, QuizResult } from './types';

const QUIZ_STATE_KEY = 'mit704_quiz_state';
const QUIZ_RESULTS_KEY = 'mit704_quiz_results';
const API_KEY_KEY = 'mit704_gemini_api_key';

export const storage = {
  // Quiz State
  saveQuizState: (state: QuizState): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
    }
  },

  getQuizState: (): QuizState | null => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(QUIZ_STATE_KEY);
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  },

  clearQuizState: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(QUIZ_STATE_KEY);
    }
  },

  // Quiz Results
  saveQuizResult: (result: QuizResult): void => {
    if (typeof window !== 'undefined') {
      const results = storage.getQuizResults();
      results.push(result);
      localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
    }
  },

  getQuizResults: (): QuizResult[] => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(QUIZ_RESULTS_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  },

  clearQuizResults: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(QUIZ_RESULTS_KEY);
    }
  },

  // API Key
  saveApiKey: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(API_KEY_KEY, key);
    }
  },

  getApiKey: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(API_KEY_KEY);
    }
    return null;
  },

  clearApiKey: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(API_KEY_KEY);
    }
  },
};
