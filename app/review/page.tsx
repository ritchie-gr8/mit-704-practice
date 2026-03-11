import ReviewClient from './ReviewClient';
import { finalExamMetadata, getModuleInfo, labChecklist, reviewModules } from '@/lib/finalExamContent';

export default function ReviewPage() {
  const modules = reviewModules.map((module) => {
    const info = getModuleInfo(module.moduleKey);
    return {
      moduleKey: module.moduleKey,
      badge: info.badge,
      title: info.title,
      overview: module.overview,
      sections: module.sections,
    };
  });

  return (
    <ReviewClient
      intro={finalExamMetadata.reviewIntro}
      answerFramework={finalExamMetadata.answerFramework}
      labSections={labChecklist}
      modules={modules}
    />
  );
}
