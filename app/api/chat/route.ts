import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { chatSystemContext } from '@/lib/finalExamContent';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    const apiKey =
      process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    const historyText = history
      .map((m: { role: string; content: string }) =>
        `${m.role === 'user' ? 'ผู้ใช้' : 'AI'}: ${m.content}`
      )
      .join('\n');

    const inputText = `${chatSystemContext}\n\nประวัติการสนทนา:\n${historyText}\n\nผู้ใช้: ${message}`;

    const response = await openai.responses.create({
      model: 'gpt-5-mini',
      input: inputText,
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

    const fullResponse = response.output_text || '';

    return NextResponse.json({ response: fullResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
