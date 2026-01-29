'use client';

import { useState } from 'react';

interface PracticeQuestion {
  id: number;
  ip: string;
  cidr: number;
  magicNumber: number;
  networkIP: string;
  broadcastIP: string;
  firstUsable: string;
  lastUsable: string;
  totalHosts: number;
}

interface UserAnswer {
  networkIP: string;
  firstUsable: string;
  lastUsable: string;
  broadcastIP: string;
  totalHosts: string;
}

const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    ip: '10.0.5.100',
    cidr: 28,
    magicNumber: 16,
    networkIP: '10.0.5.96',
    broadcastIP: '10.0.5.111',
    firstUsable: '10.0.5.97',
    lastUsable: '10.0.5.110',
    totalHosts: 14,
  },
  {
    id: 2,
    ip: '172.16.35.200',
    cidr: 27,
    magicNumber: 32,
    networkIP: '172.16.35.192',
    broadcastIP: '172.16.35.223',
    firstUsable: '172.16.35.193',
    lastUsable: '172.16.35.222',
    totalHosts: 30,
  },
  {
    id: 3,
    ip: '192.168.1.150',
    cidr: 25,
    magicNumber: 128,
    networkIP: '192.168.1.128',
    broadcastIP: '192.168.1.255',
    firstUsable: '192.168.1.129',
    lastUsable: '192.168.1.254',
    totalHosts: 126,
  },
  {
    id: 4,
    ip: '10.50.100.67',
    cidr: 29,
    magicNumber: 8,
    networkIP: '10.50.100.64',
    broadcastIP: '10.50.100.71',
    firstUsable: '10.50.100.65',
    lastUsable: '10.50.100.70',
    totalHosts: 6,
  },
  {
    id: 5,
    ip: '172.20.45.220',
    cidr: 26,
    magicNumber: 64,
    networkIP: '172.20.45.192',
    broadcastIP: '172.20.45.255',
    firstUsable: '172.20.45.193',
    lastUsable: '172.20.45.254',
    totalHosts: 62,
  },
];

const cidrTable = [
  { cidr: '/24', mask: '.0', formula: '(ไม่บวก)', block: 256, hosts: 254 },
  { cidr: '/25', mask: '.128', formula: '128', block: 128, hosts: 126 },
  { cidr: '/26', mask: '.192', formula: '128+64', block: 64, hosts: 62 },
  { cidr: '/27', mask: '.224', formula: '128+64+32', block: 32, hosts: 30 },
  { cidr: '/28', mask: '.240', formula: '..+16', block: 16, hosts: 14 },
  { cidr: '/29', mask: '.248', formula: '..+8', block: 8, hosts: 6 },
  { cidr: '/30', mask: '.252', formula: '..+4', block: 4, hosts: 2 },
  { cidr: '/32', mask: '.255', formula: '..+1', block: 1, hosts: 1 },
];

export default function CidrGuidePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswer>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(new Set());
  const [showSolutions, setShowSolutions] = useState<Set<number>>(new Set());
  const [showMagicNumber, setShowMagicNumber] = useState<Set<number>>(new Set());

  const initializeAnswer = (id: number): UserAnswer => ({
    networkIP: '',
    firstUsable: '',
    lastUsable: '',
    broadcastIP: '',
    totalHosts: '',
  });

  const updateAnswer = (questionId: number, field: keyof UserAnswer, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || initializeAnswer(questionId)),
        [field]: value,
      },
    }));
    // Remove from checked when user modifies answer
    setCheckedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.delete(questionId);
      return newSet;
    });
  };

  const checkAnswer = (questionId: number) => {
    setCheckedQuestions((prev) => new Set(prev).add(questionId));
  };

  const toggleSolution = (questionId: number) => {
    setShowSolutions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const toggleMagicNumber = (questionId: number) => {
    setShowMagicNumber((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const isCorrect = (questionId: number, field: keyof UserAnswer, correctValue: string | number): boolean => {
    const answer = userAnswers[questionId]?.[field]?.trim() || '';
    return answer === String(correctValue);
  };

  const getFieldStatus = (questionId: number, field: keyof UserAnswer, correctValue: string | number) => {
    if (!checkedQuestions.has(questionId)) return 'neutral';
    return isCorrect(questionId, field, correctValue) ? 'correct' : 'incorrect';
  };

  const getInputClassName = (status: string) => {
    const base = 'w-full px-3 py-2 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2';
    if (status === 'correct') return `${base} border-green-500 bg-green-50 focus:ring-green-500`;
    if (status === 'incorrect') return `${base} border-red-500 bg-red-50 focus:ring-red-500`;
    return `${base} border-gray-300 focus:ring-teal-500`;
  };

  const resetQuestion = (questionId: number) => {
    setUserAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
    setCheckedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.delete(questionId);
      return newSet;
    });
    setShowSolutions((prev) => {
      const newSet = new Set(prev);
      newSet.delete(questionId);
      return newSet;
    });
    setShowMagicNumber((prev) => {
      const newSet = new Set(prev);
      newSet.delete(questionId);
      return newSet;
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          สูตรลัดคำนวณ CIDR
        </h1>
        <p className="text-gray-600">
          เข้าใจง่าย จำได้เร็ว ใช้ได้จริงในห้องสอบ
        </p>
      </div>

      {/* Magic Numbers */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-3">🔑 เครื่องมือที่ต้องจำ (แค่บรรทัดเดียว)</h2>
        <p className="mb-4">จำค่าประจำตำแหน่งของบิต (Bit Values) ทั้ง 8 ตัวนี้ให้ได้:</p>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <code className="text-2xl font-bold tracking-wider">
            128 &nbsp; 64 &nbsp; 32 &nbsp; 16 &nbsp; 8 &nbsp; 4 &nbsp; 2 &nbsp; 1
          </code>
        </div>
      </div>

      {/* Section 1: Prefix to Subnet Mask */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === 'prefix' ? null : 'prefix')}
          className="w-full px-6 py-4 flex items-center justify-between text-left bg-blue-50 hover:bg-blue-100"
        >
          <h2 className="text-lg font-semibold text-blue-800">
            1️⃣ แปลง /Prefix เป็น Subnet Mask
          </h2>
          <span className="text-blue-600">{activeSection === 'prefix' ? '−' : '+'}</span>
        </button>
        {activeSection === 'prefix' && (
          <div className="px-6 py-4 space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-medium text-yellow-800">ตัวอย่าง: /26</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">1</span>
                <div>
                  <p className="font-medium">หาจุดพัก (Checkpoint)</p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>/8 = จบ Octet ที่ 1 → 255.0.0.0</li>
                    <li>/16 = จบ Octet ที่ 2 → 255.255.0.0</li>
                    <li>/24 = จบ Octet ที่ 3 → 255.255.255.0 <span className="text-indigo-600">(เจอบ่อยสุด)</span></li>
                    <li>/32 = จบ Octet ที่ 4</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">2</span>
                <div>
                  <p className="font-medium">หาเศษ (จำนวนบิตที่ยืมมา)</p>
                  <p className="text-gray-600 mt-1">
                    /26 - /24 = <span className="font-bold text-indigo-600">2 บิต</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">3</span>
                <div>
                  <p className="font-medium">บวกเลขตามจำนวนบิต</p>
                  <p className="text-gray-600 mt-1">
                    ยืม 2 บิต → เอา 2 ตัวแรกมาบวก: <span className="font-bold">128 + 64 = 192</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                ✅ <strong>คำตอบ:</strong> Subnet Mask คือ <code className="bg-green-100 px-2 py-1 rounded">255.255.255.192</code>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Subnet Mask to Prefix */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === 'mask' ? null : 'mask')}
          className="w-full px-6 py-4 flex items-center justify-between text-left bg-purple-50 hover:bg-purple-100"
        >
          <h2 className="text-lg font-semibold text-purple-800">
            2️⃣ แปลง Subnet Mask เป็น /Prefix (อาจไม่ออกสอบ)
          </h2>
          <span className="text-purple-600">{activeSection === 'mask' ? '−' : '+'}</span>
        </button>
        {activeSection === 'mask' && (
          <div className="px-6 py-4 space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-medium text-yellow-800">ตัวอย่าง: 255.255.255.240</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-bold">1</span>
                <div>
                  <p className="font-medium">ดูเลขที่ไม่ใช่ 255</p>
                  <p className="text-gray-600 mt-1">
                    เลข <span className="font-bold">240</span> อยู่ใน Octet ที่ 4 → ฐานคือ /24
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-bold">2</span>
                <div>
                  <p className="font-medium">ทอนเงิน (ลบทีละตัว นับจำนวนครั้ง)</p>
                  <ul className="text-sm text-gray-600 mt-1 font-mono space-y-1">
                    <li>240 - 128 = 112 (นับ 1)</li>
                    <li>112 - 64 = 48 (นับ 2)</li>
                    <li>48 - 32 = 16 (นับ 3)</li>
                    <li>16 - 16 = 0 (นับ 4) ✓</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-bold">3</span>
                <div>
                  <p className="font-medium">รวมร่าง</p>
                  <p className="text-gray-600 mt-1">
                    /24 + 4 = <span className="font-bold text-purple-600">/28</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                ✅ <strong>คำตอบ:</strong> CIDR คือ <code className="bg-green-100 px-2 py-1 rounded">/28</code>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Calculate Hosts */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === 'hosts' ? null : 'hosts')}
          className="w-full px-6 py-4 flex items-center justify-between text-left bg-green-50 hover:bg-green-100"
        >
          <h2 className="text-lg font-semibold text-green-800">
            3️⃣ หาจำนวน Host (เครื่องที่ใช้ได้)
          </h2>
          <span className="text-green-600">{activeSection === 'hosts' ? '−' : '+'}</span>
        </button>
        {activeSection === 'hosts' && (
          <div className="px-6 py-4 space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-indigo-800">
                สูตร: 2<sup>(32 - CIDR)</sup> - 2
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                ลบ 2 = Network Address + Broadcast Address
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-medium text-yellow-800">ตัวอย่าง: /26</p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-700">
                2<sup>(32-26)</sup> = 2<sup>6</sup> = <span className="font-bold">64</span> IP ทั้งหมด
              </p>
              <p className="text-gray-700">
                IP ที่ใช้ได้จริง = 64 - 2 = <span className="font-bold text-green-600">62 เครื่อง</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section 4: Full Calculation */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === 'full' ? null : 'full')}
          className="w-full px-6 py-4 flex items-center justify-between text-left bg-orange-50 hover:bg-orange-100"
        >
          <h2 className="text-lg font-semibold text-orange-800">
            4️⃣ หา Network, Broadcast, Host Range (สูตรครบชุด)
          </h2>
          <span className="text-orange-600">{activeSection === 'full' ? '−' : '+'}</span>
        </button>
        {activeSection === 'full' && (
          <div className="px-6 py-4 space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-medium text-yellow-800">ตัวอย่าง: 192.168.10.70/26</p>
            </div>

            {/* Step 0: Magic Number */}
            <div className="border-l-4 border-indigo-400 pl-4">
              <h3 className="font-bold text-indigo-800 mb-2">🔑 ขั้นตอนเตรียม: หา Magic Number</h3>
              <p className="text-gray-700">
                /26 → 2<sup>(32-26)</sup> = 2<sup>6</sup> = <span className="font-bold text-indigo-600">64</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                แปลว่า: ระบบนี้แบ่ง IP เป็นก้อนละ 64 เบอร์ (0, 64, 128, 192...)
              </p>
            </div>

            {/* Network IP */}
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="font-bold text-blue-800 mb-2">1. หา Network IP</h3>
              <p className="text-gray-700 mb-2">
                ท่องสูตรคูณแม่ 64 จนกว่าจะ <strong>ใกล้เคียงที่สุดแต่ไม่เกิน</strong> 70
              </p>
              <ul className="text-sm text-gray-600 font-mono space-y-1">
                <li>64 × 0 = 0</li>
                <li>64 × 1 = 64 ✅ (ใกล้ 70 ที่สุด)</li>
                <li>64 × 2 = 128 (เกิน)</li>
              </ul>
              <p className="mt-2 text-blue-700">
                ✅ Network IP: <code className="bg-blue-100 px-2 py-1 rounded">192.168.10.64</code>
              </p>
            </div>

            {/* Broadcast IP */}
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-purple-800 mb-2">2. หา Broadcast IP</h3>
              <p className="text-gray-700 mb-2">
                สูตร: Network ก้อนถัดไป - 1
              </p>
              <p className="text-sm text-gray-600 font-mono">
                ก้อนถัดไป = 128, Broadcast = 128 - 1 = 127
              </p>
              <p className="mt-2 text-purple-700">
                ✅ Broadcast IP: <code className="bg-purple-100 px-2 py-1 rounded">192.168.10.127</code>
              </p>
            </div>

            {/* Usable Range */}
            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-bold text-green-800 mb-2">3. หา Usable Host Range</h3>
              <ul className="text-gray-700 space-y-1">
                <li>First Usable = Network + 1 = <strong>192.168.10.65</strong></li>
                <li>Last Usable = Broadcast - 1 = <strong>192.168.10.126</strong></li>
              </ul>
            </div>

            {/* Summary Table */}
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h4 className="font-bold text-gray-800 mb-3">📝 สรุปผล 192.168.10.70/26</h4>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2 text-gray-600">Magic Number</td>
                    <td className="py-2 font-mono font-bold">64</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Network IP</td>
                    <td className="py-2 font-mono font-bold">192.168.10.64</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">First Usable</td>
                    <td className="py-2 font-mono font-bold">192.168.10.65</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Last Usable</td>
                    <td className="py-2 font-mono font-bold">192.168.10.126</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Broadcast IP</td>
                    <td className="py-2 font-mono font-bold">192.168.10.127</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Total Hosts</td>
                    <td className="py-2 font-mono font-bold">62</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Section 5: Practice Questions */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === 'practice' ? null : 'practice')}
          className="w-full px-6 py-4 flex items-center justify-between text-left bg-teal-50 hover:bg-teal-100"
        >
          <h2 className="text-lg font-semibold text-teal-800">
            5️⃣ แบบฝึกหัด: หา Network, Broadcast, Host Range (5 ข้อ)
          </h2>
          <span className="text-teal-600">{activeSection === 'practice' ? '−' : '+'}</span>
        </button>
        {activeSection === 'practice' && (
          <div className="px-6 py-4 space-y-6">
            <div className="bg-teal-50 border-l-4 border-teal-400 p-4">
              <p className="text-teal-800">
                <strong>วิธีทำ:</strong> กรอกคำตอบในช่องว่าง แล้วกด &quot;ตรวจคำตอบ&quot; เพื่อเช็คผล
              </p>
            </div>

            {practiceQuestions.map((q) => {
              const answer = userAnswers[q.id] || initializeAnswer(q.id);
              const isChecked = checkedQuestions.has(q.id);
              const allCorrect = isChecked &&
                isCorrect(q.id, 'networkIP', q.networkIP) &&
                isCorrect(q.id, 'firstUsable', q.firstUsable) &&
                isCorrect(q.id, 'lastUsable', q.lastUsable) &&
                isCorrect(q.id, 'broadcastIP', q.broadcastIP) &&
                isCorrect(q.id, 'totalHosts', q.totalHosts);

              return (
                <div key={q.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Question Header */}
                  <div className={`px-4 py-3 flex items-center justify-between ${
                    isChecked ? (allCorrect ? 'bg-green-100' : 'bg-amber-50') : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm font-bold">
                        ข้อ {q.id}
                      </span>
                      <code className="text-lg font-bold text-gray-800">
                        {q.ip}/{q.cidr}
                      </code>
                      {isChecked && (
                        <span className={`text-sm font-medium ${allCorrect ? 'text-green-600' : 'text-amber-600'}`}>
                          {allCorrect ? '✓ ถูกทั้งหมด!' : 'ยังไม่ถูกทั้งหมด'}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleMagicNumber(q.id)}
                      className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                        showMagicNumber.has(q.id)
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {showMagicNumber.has(q.id) ? (
                        <>Magic Number: <span className="font-bold">{q.magicNumber}</span></>
                      ) : (
                        <>ดู Hint</>
                      )}
                    </button>
                  </div>

                  {/* Answer Form */}
                  <div className="px-4 py-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Network IP */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Network IP
                          {isChecked && (
                            <span className={`ml-2 ${isCorrect(q.id, 'networkIP', q.networkIP) ? 'text-green-600' : 'text-red-600'}`}>
                              {isCorrect(q.id, 'networkIP', q.networkIP) ? '✓' : '✗'}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={answer.networkIP}
                          onChange={(e) => updateAnswer(q.id, 'networkIP', e.target.value)}
                          placeholder="เช่น 192.168.1.0"
                          className={getInputClassName(getFieldStatus(q.id, 'networkIP', q.networkIP))}
                        />
                      </div>

                      {/* Broadcast IP */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Broadcast IP
                          {isChecked && (
                            <span className={`ml-2 ${isCorrect(q.id, 'broadcastIP', q.broadcastIP) ? 'text-green-600' : 'text-red-600'}`}>
                              {isCorrect(q.id, 'broadcastIP', q.broadcastIP) ? '✓' : '✗'}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={answer.broadcastIP}
                          onChange={(e) => updateAnswer(q.id, 'broadcastIP', e.target.value)}
                          placeholder="เช่น 192.168.1.255"
                          className={getInputClassName(getFieldStatus(q.id, 'broadcastIP', q.broadcastIP))}
                        />
                      </div>

                      {/* First Usable */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Usable
                          {isChecked && (
                            <span className={`ml-2 ${isCorrect(q.id, 'firstUsable', q.firstUsable) ? 'text-green-600' : 'text-red-600'}`}>
                              {isCorrect(q.id, 'firstUsable', q.firstUsable) ? '✓' : '✗'}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={answer.firstUsable}
                          onChange={(e) => updateAnswer(q.id, 'firstUsable', e.target.value)}
                          placeholder="เช่น 192.168.1.1"
                          className={getInputClassName(getFieldStatus(q.id, 'firstUsable', q.firstUsable))}
                        />
                      </div>

                      {/* Last Usable */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Usable
                          {isChecked && (
                            <span className={`ml-2 ${isCorrect(q.id, 'lastUsable', q.lastUsable) ? 'text-green-600' : 'text-red-600'}`}>
                              {isCorrect(q.id, 'lastUsable', q.lastUsable) ? '✓' : '✗'}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={answer.lastUsable}
                          onChange={(e) => updateAnswer(q.id, 'lastUsable', e.target.value)}
                          placeholder="เช่น 192.168.1.254"
                          className={getInputClassName(getFieldStatus(q.id, 'lastUsable', q.lastUsable))}
                        />
                      </div>

                      {/* Total Hosts */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total Hosts (จำนวน)
                          {isChecked && (
                            <span className={`ml-2 ${isCorrect(q.id, 'totalHosts', q.totalHosts) ? 'text-green-600' : 'text-red-600'}`}>
                              {isCorrect(q.id, 'totalHosts', q.totalHosts) ? '✓' : '✗'}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={answer.totalHosts}
                          onChange={(e) => updateAnswer(q.id, 'totalHosts', e.target.value)}
                          placeholder="เช่น 254"
                          className={getInputClassName(getFieldStatus(q.id, 'totalHosts', q.totalHosts))}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => checkAnswer(q.id)}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                      >
                        ตรวจคำตอบ
                      </button>
                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors"
                      >
                        {showSolutions.has(q.id) ? 'ซ่อนเฉลย' : 'ดูเฉลย'}
                      </button>
                      <button
                        onClick={() => resetQuestion(q.id)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        ล้างคำตอบ
                      </button>
                    </div>

                    {/* Solution */}
                    {showSolutions.has(q.id) && (
                      <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <h4 className="font-bold text-indigo-800 mb-3">เฉลยพร้อมวิธีคิด</h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-indigo-700">
                            <strong>Magic Number:</strong> 2<sup>(32-{q.cidr})</sup> = {q.magicNumber}
                          </p>
                          <p className="text-gray-600">
                            <strong>วิธีคิด:</strong> Octet สุดท้าย = {q.ip.split('.')[3]},
                            หาร {q.magicNumber} = {Math.floor(parseInt(q.ip.split('.')[3]) / q.magicNumber)} ก้อน
                            → Network Octet = {Math.floor(parseInt(q.ip.split('.')[3]) / q.magicNumber)} × {q.magicNumber} = {Math.floor(parseInt(q.ip.split('.')[3]) / q.magicNumber) * q.magicNumber}
                          </p>
                        </div>
                        <table className="w-full text-sm mt-3">
                          <tbody className="divide-y divide-indigo-200">
                            <tr>
                              <td className="py-2 text-gray-600 w-1/3">Network IP</td>
                              <td className="py-2 font-mono font-bold text-indigo-700">{q.networkIP}</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-600">First Usable</td>
                              <td className="py-2 font-mono font-bold">{q.firstUsable}</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-600">Last Usable</td>
                              <td className="py-2 font-mono font-bold">{q.lastUsable}</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-600">Broadcast IP</td>
                              <td className="py-2 font-mono font-bold text-purple-700">{q.broadcastIP}</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-600">Total Hosts</td>
                              <td className="py-2 font-mono font-bold text-green-700">{q.totalHosts}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reference Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📊 ตารางสรุป (เซฟเก็บไว้ดูได้เลย)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 text-left">CIDR</th>
                <th className="px-3 py-2 text-left">Subnet Mask</th>
                <th className="px-3 py-2 text-left">สูตรบวก</th>
                <th className="px-3 py-2 text-right">Block Size</th>
                <th className="px-3 py-2 text-right">Hosts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cidrTable.map((row) => (
                <tr key={row.cidr} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono font-bold text-indigo-600">{row.cidr}</td>
                  <td className="px-3 py-2 font-mono">255.255.255{row.mask}</td>
                  <td className="px-3 py-2 text-gray-600">{row.formula}</td>
                  <td className="px-3 py-2 text-right font-mono">{row.block}</td>
                  <td className="px-3 py-2 text-right font-mono font-bold">{row.hosts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-bold text-amber-800 mb-2">💡 เคล็ดลับจำง่าย</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• /24 = 256 IP (254 hosts) → จำเป็นฐาน</li>
          <li>• ทุกครั้งที่ +1 ใน CIDR → หาร 2 จำนวน hosts</li>
          <li>• /25 = 128, /26 = 64, /27 = 32... (หารครึ่งไปเรื่อยๆ)</li>
          <li>• Magic Number = Block Size = จำนวน IP ในแต่ละก้อน</li>
        </ul>
      </div>
    </div>
  );
}
