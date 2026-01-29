import { promises as fs } from 'fs';
import path from 'path';
import ReviewClient from './ReviewClient';
import type { GuideModule } from './types';

function stripFormatting(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseGuideModules(markdown: string): GuideModule[] {
  const modules: GuideModule[] = [];
  const moduleRegex = /###\s+(.+?)\n([\s\S]*?)(?=\n---\n|\n###\s+|$)/g;
  let match;
  while ((match = moduleRegex.exec(markdown)) !== null) {
    const [, heading, body] = match;
    const idMatch = heading.match(/Module\s+(\d+)/i);
    const id = idMatch ? Number(idMatch[1]) : modules.length + 1;
    const lines = body.split('\n').map((line) => line.replace(/\r/g, ''));

    const intro: string[] = [];
    const sections: GuideModule['sections'] = [];
    let currentSection: { title: string; bullets: string[] } | null = null;

    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) {
        return;
      }

      const leadingSpaces = rawLine.match(/^(\s*)/)?.[1].length ?? 0;

      const sectionMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (sectionMatch) {
        if (leadingSpaces <= 2) {
          const title = stripFormatting(sectionMatch[2]);
          currentSection = { title, bullets: [] };
          sections.push(currentSection);
        } else if (currentSection) {
          currentSection.bullets.push(
            `${sectionMatch[1]}. ${stripFormatting(sectionMatch[2])}`
          );
        }
        return;
      }

      const bulletMatch = line.match(/^\*\s+(.*)/);
      if (bulletMatch) {
        const bulletText = stripFormatting(bulletMatch[1]);
        if (leadingSpaces <= 2) {
          const colonIndex = bulletText.indexOf(':');
          const sectionTitle =
            colonIndex !== -1 ? bulletText.slice(0, colonIndex).trim() : bulletText;
          const description = colonIndex !== -1 ? bulletText.slice(colonIndex + 1).trim() : '';
          currentSection = { title: sectionTitle, bullets: [] };
          if (description) {
            currentSection.bullets.push(description);
          }
          sections.push(currentSection);
        } else if (currentSection) {
          currentSection.bullets.push(bulletText);
        }
        return;
      }

      if (!currentSection) {
        intro.push(stripFormatting(line));
      } else {
        currentSection.bullets.push(stripFormatting(line));
      }
    });

    modules.push({
      id,
      title: stripFormatting(heading),
      intro,
      sections,
    });
  }

  return modules;
}

function extractIntro(markdown: string) {
  const [introPart] = markdown.split('---');
  return introPart
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

export default async function ReviewPage() {
  const guidePath = path.join(process.cwd(), 'guide.md');
  const guideMarkdown = await fs.readFile(guidePath, 'utf-8');

  const introParagraphs = extractIntro(guideMarkdown);
  const modules = parseGuideModules(guideMarkdown);

  return <ReviewClient intro={introParagraphs} modules={modules} />;
}
