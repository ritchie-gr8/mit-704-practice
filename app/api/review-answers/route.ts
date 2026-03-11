import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import {
  getModuleLabel,
  getModuleTitle,
  reviewReferenceText,
  subjectiveRubricText,
} from '@/lib/finalExamContent';
import { ModuleKey } from '@/lib/types';

interface QuestionAnswer {
  id: number;
  question: string;
  moduleKey: ModuleKey;
  answer: string;
}

export async function POST(request: NextRequest) {
  try {
    const { answers } = (await request.json()) as { answers: QuestionAnswer[] };
    const apiKey =
      process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const answersText = answers
      .map((answer) => {
        const label = getModuleLabel(answer.moduleKey);
        const title = getModuleTitle(answer.moduleKey);
        return `${label}: ${title}\nคำถาม: ${answer.question}\nคำตอบนักศึกษา: ${
          answer.answer || '(ไม่ได้ตอบ)'
        }`;
      })
      .join('\n\n');

    const prompt = `คุณเป็นอาจารย์ตรวจข้อสอบปลายภาควิชา MIT-704 Information Technology Infrastructure

Reference scope:
${reviewReferenceText}

Rubric:
${subjectiveRubricText}

คำถามและคำตอบของนักศึกษา:
${answersText}

หลักเกณฑ์การให้คะแนน:
1. ให้คะแนนแต่ละข้อ 0-10
2. ประเมินจากความถูกต้องของหลักการ, เหตุผล, keyword สำคัญ และลำดับ troubleshooting/mitigation
3. ถ้าคำตอบไม่ครบ ให้บอกสิ่งที่ขาดและคำตอบที่ควรมี
4. feedback ต้องเป็นภาษาไทย กระชับ แต่ actionable
5. ห้ามให้คะแนนจากการใช้ถ้อยคำสวยงามอย่างเดียว ถ้า logic ผิดให้หักชัดเจน

ตอบเป็น JSON เท่านั้น:
{
  "reviews": [
    {
      "id": 1,
      "score": 8,
      "feedback": "คำอธิบายการตรวจ",
      "correctAnswer": "คำตอบที่ควรมี",
      "suggestion": "คำแนะนำเพิ่มเติม"
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

    const responseText = response.output_text || '';
    let review;

    try {
      review = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        review = JSON.parse(jsonMatch[0]);
      } else {
        const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) {
          review = JSON.parse(codeBlockMatch[1].trim());
        } else {
          throw new Error('Invalid response format');
        }
      }
    }

    if (!Array.isArray(review.reviews)) {
      throw new Error('Missing review array');
    }

    const sanitizedReviews = answers.map((answer) => {
      const matched = review.reviews.find((item: { id: number }) => item.id === answer.id);
      return {
        id: answer.id,
        score:
          typeof matched?.score === 'number'
            ? Math.max(0, Math.min(10, Math.round(matched.score)))
            : 0,
        feedback: matched?.feedback || 'ยังไม่สามารถประเมินรายละเอียดได้ครบ ให้กลับไปทบทวนแนวคิดหลักของหัวข้อนี้',
        correctAnswer: matched?.correctAnswer || undefined,
        suggestion: matched?.suggestion || undefined,
      };
    });

    const totalScore = sanitizedReviews.reduce((sum, item) => sum + item.score, 0);

    return NextResponse.json({
      reviews: sanitizedReviews,
      totalScore,
      maxScore: answers.length * 10,
      overallFeedback:
        review.overallFeedback ||
        'ให้กลับไปทบทวนจุดที่คะแนนต่ำ โดยเน้นการอธิบายเหตุผลและลำดับ troubleshooting ให้ชัดกว่านี้',
    });
  } catch (error) {
    console.error('Review answers error:', error);
    return NextResponse.json(
      { error: 'Failed to review answers' },
      { status: 500 }
    );
  }
}
