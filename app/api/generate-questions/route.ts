import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import {
  FINAL_MODULE_ORDER,
  finalModules,
  subjectiveRubricText,
} from '@/lib/finalExamContent';

export async function POST() {
  try {
    const apiKey =
      process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const moduleList = finalModules
      .map((module) => `- ${module.badge}: ${module.title}`)
      .join('\n');

    const prompt = `คุณเป็นอาจารย์ออกข้อสอบปลายภาควิชา MIT-704 Information Technology Infrastructure

ขอบเขตที่ออกได้มีเท่านี้:
${moduleList}

Rubric และแนวทางของแต่ละหัวข้อ:
${subjectiveRubricText}

งานของคุณ:
1. สร้างคำถามอัตนัยภาษาไทย 5 ข้อ
2. ต้องออกอย่างละ 1 ข้อสำหรับ moduleKey ตามลำดับนี้เท่านั้น: ${FINAL_MODULE_ORDER.join(', ')}
3. แต่ละข้อต้องเป็น scenario-based หรือ troubleshooting-based
4. ห้ามออกนอกขอบเขต final และห้ามย้อนกลับไปถามหัวข้อ midterm เดิม เช่น OSI, CIDR drill หรือ Ethernet switching
5. แต่ละข้อควรต้องการคำตอบยาวประมาณ 3-6 ประโยค
6. หลีกเลี่ยงคำถามท่องจำตรง ๆ ให้ถามเชิงเหตุผล, การเปรียบเทียบ หรือขั้นตอนตรวจสอบ

ตอบเป็น JSON array เท่านั้น โดยใช้รูปแบบนี้:
[
  {"id": 1, "moduleKey": "11-12", "question": "..." },
  {"id": 2, "moduleKey": "13", "question": "..." },
  {"id": 3, "moduleKey": "14", "question": "..." },
  {"id": 4, "moduleKey": "16", "question": "..." },
  {"id": 5, "moduleKey": "17", "question": "..." }
]`;

    const response = await openai.responses.create({
      model: 'gpt-5-mini',
      input: prompt,
      text: {
        format: {
          type: 'text',
        },
        verbosity: 'medium',
      },
      reasoning: {
        effort: 'medium',
      },
      tools: [],
      store: true,
    });

    const responseText = response.output_text || '';
    let questions;

    try {
      questions = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) {
          questions = JSON.parse(codeBlockMatch[1].trim());
        } else {
          throw new Error('Invalid response format');
        }
      }
    }

    if (!Array.isArray(questions)) {
      throw new Error('Response is not an array');
    }

    const sanitizedQuestions = FINAL_MODULE_ORDER.map((moduleKey, index) => {
      const matched = questions.find(
        (question) => question?.moduleKey === moduleKey && typeof question?.question === 'string'
      );
      return {
        id: index + 1,
        moduleKey,
        question:
          matched?.question?.trim() ||
          `อธิบายหัวข้อ ${moduleKey} ในรูปแบบสถานการณ์ พร้อมยกเหตุผลและขั้นตอนตรวจสอบที่เกี่ยวข้อง`,
      };
    });

    return NextResponse.json({ questions: sanitizedQuestions });
  } catch (error) {
    console.error('Generate questions error:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
}
