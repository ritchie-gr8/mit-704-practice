import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_CONTEXT = `คุณเป็นผู้ช่วยสอนวิชา MIT-704 Information Technology Infrastructure
คุณช่วยตอบคำถามเกี่ยวกับ:
- Module 1: Networking Today (ประเภทการเชื่อมต่ออินเทอร์เน็ต, ISP, ความเร็ว/เวลาแฝง)
- Module 3: Protocols and Models (OSI Model, TCP/IP Model, โปรโตคอลต่างๆ)
- Module 4: Physical Layer (ประเภทสายเคเบิล, EMI, Crosstalk, Bandwidth vs Throughput vs Goodput)
- Module 5: Number Systems/IP (CIDR notation, Subnet, Host ranges)
- Module 7: Ethernet Switching (Ethernet frames, MAC vs IP addresses, Switch operation)

ตอบเป็นภาษาไทย อธิบายให้เข้าใจง่าย และยกตัวอย่างประกอบเมื่อเหมาะสม`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const historyText = history
      .map((m: { role: string; content: string }) =>
        `${m.role === 'user' ? 'ผู้ใช้' : 'AI'}: ${m.content}`
      )
      .join('\n');

    const inputText = `${SYSTEM_CONTEXT}\n\nประวัติการสนทนา:\n${historyText}\n\nผู้ใช้: ${message}`;

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
