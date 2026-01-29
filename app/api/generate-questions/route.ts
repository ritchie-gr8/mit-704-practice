import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

let cachedExamGuide: string | null = null;

async function getExamGuideContent() {
  if (cachedExamGuide) {
    return cachedExamGuide;
  }

  const examGuidePath = path.join(process.cwd(), 'exam-guide.md');
  cachedExamGuide = await fs.readFile(examGuidePath, 'utf-8');
  return cachedExamGuide;
}

export async function POST() {
  try {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const examGuideContent = await getExamGuideContent();

    const prompt = `คุณเป็นอาจารย์ออกข้อสอบวิชา MIT-704 Information Technology Infrastructure

จากแนวข้อสอบต่อไปนี้:
${examGuideContent}

กรุณาสร้างคำถามอัตนัย 5 ข้อ โดยเลือกจากแนวข้อสอบที่ระบุไว้ในแต่ละ Module ดังนี้:

1. Module 1 (1 ข้อ): ให้สถานการณ์ เช่น "พนักงาน Teleworker ทำงานจากบ้านในเขตชานเมือง ต้องการอินเทอร์เน็ตที่เสถียรสำหรับ Video Conference" แล้วถามว่าควรเลือกการเชื่อมต่อแบบใด พร้อมอธิบายเหตุผล

2. Module 3 (1 ข้อ): ถามเปรียบเทียบ OSI Model กับ TCP/IP Model หรือถามเกี่ยวกับประโยชน์ของ Layered Model

3. Module 4 (1 ข้อ): ให้สถานการณ์ปัญหาสัญญาณรบกวน (EMI/Crosstalk) แล้วถามวิธีแก้ไข หรือถามอธิบายความแตกต่างระหว่าง Bandwidth, Throughput, Goodput

4. Module 5 (1 ข้อ): ให้โจทย์คำนวณ เช่น IP 192.168.10.50/26 แล้วถามหา Network Address, Broadcast Address หรือจำนวน Host ที่ใช้ได้

5. Module 7 (1 ข้อ): ถามเกี่ยวกับหลักการทำงานของ Switch (Learning/Forwarding) หรือถามว่าทำไม MAC Address เปลี่ยนในแต่ละ Hop แต่ IP คงเดิม

ข้อกำหนด:
- คำถามต้องเป็นภาษาไทย
- คำถามต้องเป็นแบบอัตนัย ต้องการคำอธิบาย 2-4 ประโยค
- ห้ามถามนอกเหนือจากเนื้อหาที่ระบุ

ตอบในรูปแบบ JSON array เท่านั้น:
[
  {"id": 1, "question": "คำถาม Module 1", "module": 1},
  {"id": 2, "question": "คำถาม Module 3", "module": 3},
  {"id": 3, "question": "คำถาม Module 4", "module": 4},
  {"id": 4, "question": "คำถาม Module 5", "module": 5},
  {"id": 5, "question": "คำถาม Module 7", "module": 7}
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

    console.log('OpenAI Response:', JSON.stringify(response, null, 2));

    const responseText = response.output_text || '';
    console.log('Response text:', responseText);

    // Try to extract JSON array from response
    let questions;

    // First try direct parse
    try {
      questions = JSON.parse(responseText);
    } catch {
      // Try to find JSON array in text
      const jsonMatch = responseText.match(/\[[\s\S]*?\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        // Try to find in code block
        const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) {
          questions = JSON.parse(codeBlockMatch[1].trim());
        } else {
          console.error('Could not parse response:', responseText);
          throw new Error('Invalid response format');
        }
      }
    }

    // Ensure it's an array
    if (!Array.isArray(questions)) {
      if (questions.questions && Array.isArray(questions.questions)) {
        questions = questions.questions;
      } else {
        throw new Error('Response is not an array');
      }
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Generate questions error:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
}
