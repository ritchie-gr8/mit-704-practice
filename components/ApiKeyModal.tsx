'use client';

import { useState } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey?: string | null;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  onSave,
  currentKey,
}: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState(currentKey || '');

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ตั้งค่า API Key
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          กรุณาใส่ Google Gemini API Key ของคุณเพื่อใช้งานฟีเจอร์ AI Chat
          คุณสามารถขอ API Key ได้ฟรีที่{' '}
          <a
            href="https://makersuite.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Google AI Studio
          </a>
        </p>

        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="ใส่ API Key ของคุณ"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
