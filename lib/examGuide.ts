import { finalExamMetadata, getModuleInfo, guideModules, labChecklist } from './finalExamContent';

export const examGuideContent = [
  '# แนวเตรียมสอบปลายภาค',
  `## วิชา ${finalExamMetadata.title}`,
  '',
  '## ภาพรวมข้อสอบ',
  ...finalExamMetadata.examStyle.map((item) => `* ${item}`),
  '',
  ...guideModules.flatMap((module) => {
    const info = getModuleInfo(module.moduleKey);
    return [
      `## ${info.badge}: ${info.title}`,
      'ประเด็นที่ต้องรู้',
      ...module.mustKnow.map((item) => `* ${item}`),
      'แนวข้อสอบ',
      ...module.examFocus.map((item) => `* ${item}`),
      '',
    ];
  }),
  '## Lab Checklist',
  ...labChecklist.flatMap((section) => [
    `### ${section.title}`,
    ...section.bullets.map((item) => `* ${item}`),
  ]),
].join('\n');
