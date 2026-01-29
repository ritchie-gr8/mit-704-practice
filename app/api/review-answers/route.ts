import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { reviewContentText } from '@/lib/reviewContent';

interface QuestionAnswer {
  id: number;
  question: string;
  module: number;
  answer: string;
}

export async function POST(request: NextRequest) {
  try {
    const { answers } = (await request.json()) as { answers: QuestionAnswer[] };

    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const answersText = answers
      .map(
        (a) =>
          `ข้อ ${a.id} (Module ${a.module}): ${a.question}\nคำตอบ: ${a.answer || '(ไม่ได้ตอบ)'}`
      )
      .join('\n\n');

    const prompt = `คุณเป็นอาจารย์ตรวจข้อสอบวิชา MIT-704 Information Technology Infrastructure

เนื้อหาที่เกี่ยวข้อง:
${reviewContentText}

คำถามและคำตอบของนักศึกษา:
${answersText}

กรุณาตรวจและให้คะแนนแต่ละข้อ โดย:
1. ให้คะแนนแต่ละข้อ 0-10 คะแนน
2. อธิบายว่าคำตอบถูกหรือผิดอย่างไร
3. ให้คำตอบที่ถูกต้องหากนักศึกษาตอบผิดหรือไม่ครบถ้วน
4. ให้คำแนะนำในการปรับปรุง

ตอบในรูปแบบ JSON เท่านั้น:
{
  "reviews": [
    {
      "id": 1,
      "score": 8,
      "feedback": "คำอธิบายการตรวจ",
      "correctAnswer": "คำตอบที่ถูกต้อง (ถ้าตอบผิด)",
      "suggestion": "คำแนะนำ"
    }
  ],
  "totalScore": 40,
  "maxScore": 50,
  "overallFeedback": "ความเห็นโดยรวม"
}`;

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
        effort: 'high',
      },
      tools: [],
      store: true,
    });

    console.log('OpenAI Response:', JSON.stringify(response, null, 2));

    const responseText = response.output_text || '';
    console.log('Response text:', responseText);

    // Try to extract JSON object from response
    let review;

    // First try direct parse
    try {
      review = JSON.parse(responseText);
    } catch {
      // Try to find JSON object in text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        review = JSON.parse(jsonMatch[0]);
      } else {
        // Try to find in code block
        const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) {
          review = JSON.parse(codeBlockMatch[1].trim());
        } else {
          console.error('Could not parse response:', responseText);
          throw new Error('Invalid response format');
        }
      }
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error('Review answers error:', error);
    return NextResponse.json(
      { error: 'Failed to review answers' },
      { status: 500 }
    );
  }
}
