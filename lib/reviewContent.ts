import { getModuleInfo, reviewModules, reviewReferenceText } from './finalExamContent';

export const reviewSections = reviewModules.map((module) => {
  const info = getModuleInfo(module.moduleKey);
  return {
    moduleKey: module.moduleKey,
    title: `${info.badge}: ${info.title}`,
    subtitle: module.overview[0] || info.description,
    content: module.sections.map((section) => ({
      heading: section.title,
      points: section.bullets,
    })),
  };
});

export const reviewContentText = reviewReferenceText;
