'use client';

import { useState } from 'react';
import ChatBox from '@/components/ChatBox';
import { ChatMessage } from '@/lib/types';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (userMessage: string) => {
    const newUserMessage: ChatMessage = { role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API Error');
      }

      const data = await response.json();
      const aiResponse = data.response || 'ขออภัย ไม่สามารถตอบได้ในขณะนี้';

      const newAiMessage: ChatMessage = {
        role: 'assistant',
        content: aiResponse,
      };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'เกิดข้อผิดพลาด กรุณาลองใหม่';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ถาม AI</h1>
          <p className="text-gray-600">
            ถามคำถามเกี่ยวกับหัวข้อในการสอบ MIT-704
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="text-sm text-red-600 hover:text-red-800"
          >
            ล้างการสนทนา
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <ChatBox
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />

      <div className="mt-4 text-sm text-gray-500">
        AI ตอบช้า แต่ตอบนะ (ถ้าไม่ตอบคือ credit หมดแล้ว บอกเจ้าของเติมด้วย)
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">ตัวอย่างคำถาม</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• OSI Model มีกี่เลเยอร์ และแต่ละเลเยอร์ทำหน้าที่อะไร?</li>
          <li>• วิธีคำนวณจำนวน Host ใน Subnet /24</li>
          <li>• ความแตกต่างระหว่าง TCP และ UDP</li>
          <li>• Switch ทำงานอย่างไร และต่างจาก Hub อย่างไร?</li>
        </ul>
      </div>
    </div>
  );
}
