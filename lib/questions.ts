import { finalModules, objectiveQuestionBank } from './finalExamContent';
import { ModuleKey, Question } from './types';

export const modules = finalModules;
export const questions = objectiveQuestionBank;

export const getQuestionsByModules = (moduleKeys: ModuleKey[]): Question[] => {
  return questions.filter((question) => moduleKeys.includes(question.moduleKey));
};

export const shuffleQuestions = (questionSet: Question[]): Question[] => {
  const shuffled = [...questionSet];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
