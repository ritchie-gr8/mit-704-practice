import { ModuleInfo, ModuleKey, Question } from './types';

interface GuideModule {
  moduleKey: ModuleKey;
  mustKnow: string[];
  examFocus: string[];
}

interface ReviewModule {
  moduleKey: ModuleKey;
  overview: string[];
  sections: {
    title: string;
    bullets: string[];
  }[];
}

interface SubjectiveRubric {
  moduleKey: ModuleKey;
  goal: string;
  strongAnswer: string[];
  commonMisses: string[];
  sampleAngles: string[];
}

interface LabSection {
  title: string;
  bullets: string[];
}

export const FINAL_MODULE_ORDER: ModuleKey[] = ['11-12', '13', '14', '16', '17'];

const moduleCatalog: Record<ModuleKey, ModuleInfo> = {
  '11-12': {
    moduleKey: '11-12',
    badge: 'Module 11-12',
    title: 'IPv4 vs IPv6 Addressing',
    description:
      'ข้อจำกัดของ IPv4, จุดเด่นของ IPv6, NAT และแนวทาง coexistence ระหว่างช่วง migration',
    questionCount: 6,
    emoji: '🌍',
  },
  '13': {
    moduleKey: '13',
    badge: 'Module 13',
    title: 'ICMP and Cross-Subnet Troubleshooting',
    description:
      'การทำงานของ ping, default gateway, router, routing table และลำดับคิดเวลา ping ไม่ผ่าน',
    questionCount: 6,
    emoji: '📡',
  },
  '14': {
    moduleKey: '14',
    badge: 'Module 14',
    title: 'Transport Layer',
    description:
      'Segmentation, multiplexing, TCP/UDP, congestion และเหตุผลที่ traffic แบบ real-time กระทบง่าย',
    questionCount: 6,
    emoji: '🚚',
  },
  '16': {
    moduleKey: '16',
    badge: 'Module 16',
    title: 'Network Security Fundamentals',
    description:
      'VPN, ASA Firewall, IPS, AAA Server, segmentation และการแยก usage ปกติออกจาก attack',
    questionCount: 6,
    emoji: '🛡️',
  },
  '17': {
    moduleKey: '17',
    badge: 'Module 17',
    title: 'Build a Small Network',
    description:
      'Redundancy, failover และการวิเคราะห์เมื่อ router, link, switch หรือ server ล้มเหลว',
    questionCount: 6,
    emoji: '🔁',
  },
};

export const finalModules = FINAL_MODULE_ORDER.map((moduleKey) => moduleCatalog[moduleKey]);

export const finalExamMetadata = {
  title: 'MIT-704 Final Exam Practice',
  description: 'แอปเตรียมสอบปลายภาค MIT-704 ที่รวมแนวข้อสอบ ทบทวน และแบบฝึกหัดอิง final scope',
  heroEyebrow: 'final prep',
  heroTitle: 'MIT-704 Final Prep Studio',
  heroSubtitle:
    'ฝึกอ่านโจทย์สถานการณ์ วิเคราะห์ปัญหาเครือข่าย และตอบข้อสอบปลายภาคให้ตรงสไตล์อาจารย์',
  examStyle: [
    'ข้อสอบเน้นการอธิบายเหตุผล ไม่ใช่ท่องคำนิยามอย่างเดียว',
    'ต้องอ่าน topology และบอกบทบาทอุปกรณ์ให้ได้ เช่น gateway, firewall, router และ backup path',
    'คำตอบที่ดีต้องมีทั้งหลักการ, การวิเคราะห์สถานการณ์, และขั้นตอนตรวจสอบหรือแก้ไข',
  ],
  reviewIntro: [
    'ข้อสอบปลายภาคครอบคลุม Module 11-12, 13, 14, 16 และ 17 พร้อม lab ที่โยงกับ Packet Tracer เรื่อง threat landscape และการใช้งานเครือข่ายจริง',
    'เวลาทบทวนให้คิดแบบ scenario-based: ถ้า ping ไม่ได้, video call กระตุก, ทราฟฟิกผิดปกติ หรืออุปกรณ์หลักล่ม คุณต้องอธิบายได้ว่าควรเช็กอะไรและเพราะอะไร',
  ],
  answerFramework: [
    'เริ่มจากหลักการ: เทคโนโลยีหรืออุปกรณ์นั้นทำหน้าที่อะไร',
    'โยงเข้ากับสถานการณ์: ปัญหาเกิดตรงไหนและองค์ประกอบใดเกี่ยวข้อง',
    'ปิดท้ายด้วย troubleshooting หรือ mitigation: จะตรวจอะไร แก้อย่างไร หรือควรออกแบบสำรองแบบไหน',
  ],
};

export const guideModules: GuideModule[] = [
  {
    moduleKey: '11-12',
    mustKnow: [
      'เหตุผลที่ IPv4 ไม่เพียงพอสำหรับอุปกรณ์จำนวนมาก และทำไมองค์กรยังต้องพึ่ง NAT',
      'จุดเด่นของ IPv6 เช่น address space ใหญ่กว่า, header เรียบง่ายขึ้น, SLAAC และความเหมาะกับ mobile/IoT',
      'รูปแบบ address ของ IPv4 แบบ decimal 32-bit เทียบกับ IPv6 แบบ hexadecimal 128-bit',
      'แนวทาง migration เช่น dual stack, tunneling และ translation/NAT64',
    ],
    examFocus: [
      'อธิบายว่าทำไมองค์กรหรือมหาวิทยาลัยควรเริ่มย้ายจาก IPv4 ไป IPv6',
      'เสนอวิธีใช้งานร่วมกันเมื่อยังมีระบบ IPv4 เดิมเหลืออยู่บางส่วน',
      'ยกตัวอย่างสถานการณ์จริง เช่น campus ที่มี notebook, phone, IP camera และ IoT จำนวนมาก',
    ],
  },
  {
    moduleKey: '13',
    mustKnow: [
      'ICMP ใช้เพื่อ diagnostic และ error reporting โดย ping ใช้ Echo Request/Echo Reply',
      'ถ้า host อยู่คนละ subnet ต้องส่ง packet ไป default gateway ก่อน',
      'router และ routing table มีบทบาทในการส่ง packet ข้าม network',
      'ลำดับตรวจเมื่อ ping ไม่ผ่าน: IP, subnet mask, gateway, interface status, routing, firewall และ traceroute',
    ],
    examFocus: [
      'วิเคราะห์ว่าทำไมเครื่องคนละ subnet จึงคุยกันตรง ๆ ไม่ได้',
      'อ่าน topology แล้วบอก interface หรือ gateway ที่ packet ต้องผ่าน',
      'เสนออย่างน้อย 3 สาเหตุที่ ping ไม่สำเร็จ พร้อมวิธีตรวจสอบทีละขั้น',
    ],
  },
  {
    moduleKey: '14',
    mustKnow: [
      'Transport Layer ช่วย segmentation, multiplexing, flow control และ error recovery',
      'Port numbers ทำให้หลาย application ใช้เครือข่ายพร้อมกันได้',
      'TCP มักเหมาะกับ traffic ที่ต้องการความเชื่อถือได้ ส่วน UDP มักเหมาะกับ real-time traffic ที่ยอมเสีย packet บางส่วนได้',
      'สาเหตุที่ video/voice มีความไวต่อ latency, jitter และ packet loss มากกว่า traffic ทั่วไป',
    ],
    examFocus: [
      'อธิบาย segmentation และ multiplexing ให้ผูกกับเหตุการณ์จริง เช่น เปิด web, email, chat พร้อมกัน',
      'วิเคราะห์ว่าทำไม video call กระตุก แต่ web ยังพอใช้งานได้',
      'เสนอวิธีแก้ เช่น QoS, จำกัดบางบริการ, แยกทราฟฟิก หรือเช็ก congestion',
    ],
  },
  {
    moduleKey: '16',
    mustKnow: [
      'บทบาทของ VPN, ASA Firewall, IPS และ AAA Server ในการป้องกันและควบคุมการเข้าถึง',
      'แนวคิด defense in depth และ network segmentation เพื่อลด lateral movement',
      'ความต่างระหว่างการป้องกัน, การตรวจจับ และการควบคุมสิทธิ์',
      'การดู baseline, จำนวน session, แหล่งที่มาของคำขอ และลักษณะ log เพื่อแยก usage ปกติกับ attack',
    ],
    examFocus: [
      'ระบุว่าอุปกรณ์ใดใน topology มีหน้าที่ allow/deny, detect/prevent หรือ authenticate',
      'อธิบายว่า compromised hosts ภายในองค์กรจะมีสัญญาณแบบไหน',
      'เสนอการตรวจสอบเหตุผิดปกติด้วย log analysis, traffic pattern และ segmentation impact',
    ],
  },
  {
    moduleKey: '17',
    mustKnow: [
      'ความหมายของ redundancy และการลด single point of failure',
      'รูปแบบ redundancy ของ server, link, switch และ router',
      'หลักการ failover และเหตุผลที่บางบริการอาจยังเข้าได้หลังอุปกรณ์หลักล่ม',
      'แนวทางตรวจเส้นทางสำรอง เช่น physical link, port status, routing update, spanning tree และ server availability',
    ],
    examFocus: [
      'อธิบายว่าระบบสำรองช่วยลดผลกระทบจาก network failure อย่างไร',
      'วิเคราะห์ว่าทำไมบางผู้ใช้ยังได้รับผลกระทบทั้งที่มี backup path แล้ว',
      'เชื่อมโยงปัญหา link failure, router failure, bandwidth limit และ configuration mismatch',
    ],
  },
];

export const reviewModules: ReviewModule[] = [
  {
    moduleKey: '11-12',
    overview: [
      'แกนของข้อสอบส่วนนี้คือเหตุผลในการเปลี่ยนผ่านจาก IPv4 ไป IPv6 และการออกแบบช่วงที่สองระบบต้องอยู่ร่วมกัน',
      'คำตอบที่ดีควรเริ่มจากปัญหา address exhaustion ของ IPv4 แล้วค่อยโยงไปยัง NAT, coexistence และตัวอย่าง deployment จริงในองค์กร',
    ],
    sections: [
      {
        title: '1. ทำไม IPv4 ไม่พอ',
        bullets: [
          'IPv4 มีขนาด 32-bit จึงมี address จำกัด เมื่อเทียบกับจำนวน device ยุค smartphone, camera และ IoT',
          'NAT ช่วยประหยัด public IPv4 แต่ไม่ได้แก้ปัญหาจำนวน address อย่างถาวร และทำให้ end-to-end connectivity ซับซ้อนขึ้น',
          'ถ้าโจทย์ถามเชิงองค์กร ให้เชื่อมกับ campus หรือบริษัทที่มีอุปกรณ์จำนวนมากในหลาย network segment',
        ],
      },
      {
        title: '2. จุดเด่นของ IPv6',
        bullets: [
          'IPv6 ใช้ 128-bit address ทำให้มี address space ใหญ่มาก',
          'รองรับ SLAAC, ใช้ header structure ที่เรียบง่ายขึ้น และเหมาะกับสภาพแวดล้อมที่มี mobile หรือ IoT จำนวนมาก',
          'ข้อสอบมักต้องการให้ตอบว่า IPv6 ไม่ได้มีดีแค่ address เยอะขึ้น แต่ช่วยให้การออกแบบเครือข่ายในระยะยาวยืดหยุ่นขึ้น',
        ],
      },
      {
        title: '3. การเขียน address และ coexistence',
        bullets: [
          'IPv4 เขียนแบบ decimal 4 octets ส่วน IPv6 เขียนแบบ hexadecimal และย่อศูนย์ได้ตามหลักของ IPv6 notation',
          'Dual stack คือแนวทางที่ปลอดภัยที่สุดเมื่อมีทั้งระบบใหม่และระบบเดิมต้องอยู่ร่วมกัน',
          'Tunneling เหมาะเมื่อมี traffic IPv6 ต้องวิ่งผ่าน infrastructure IPv4 เดิม',
          'Translation เช่น NAT64 ใช้เชื่อม client ฝั่ง IPv6 กับ service ฝั่ง IPv4',
        ],
      },
      {
        title: '4. วิธีตอบเชิงสถานการณ์',
        bullets: [
          'เริ่มจากบอกข้อจำกัดของ IPv4 ในบริบทโจทย์',
          'ชี้ว่าองค์กรมักต้องใช้ dual stack ช่วง migration ถ้ายังมี printer, server หรือ application บางตัวรองรับแค่ IPv4',
          'ปิดท้ายด้วยตัวอย่างว่าจะค่อย ๆ ย้าย service ใดไป IPv6 ก่อน เช่น client network, IoT segment หรือ web-facing systems',
        ],
      },
    ],
  },
  {
    moduleKey: '13',
    overview: [
      'Module 13 ไม่ได้ถามแค่ความหมายของ ICMP แต่ถามว่า packet เดินอย่างไรเมื่อข้าม subnet และคุณจะไล่เช็กปัญหาอย่างไร',
      'อย่าตอบแค่ว่า ping ไม่ได้เพราะ network มีปัญหา แต่ต้องเรียงลำดับเช็กให้เห็นภาพการส่ง packet',
    ],
    sections: [
      {
        title: '1. ICMP และ ping',
        bullets: [
          'ICMP ใช้สำหรับ diagnostic และ error reporting เช่น Echo Request/Echo Reply, destination unreachable และ time exceeded',
          'ping จึงเป็นเครื่องมือพื้นฐานในการทดสอบ reachability ที่ layer 3',
          'traceroute หรือ tracert ช่วยมองเส้นทางเป็น hop เพื่อดูว่าปัญหาเกิดก่อนถึง router ตัวไหน',
        ],
      },
      {
        title: '2. การส่ง packet ข้าม subnet',
        bullets: [
          'ถ้าปลายทางอยู่คนละ subnet host จะส่ง packet ไปยัง default gateway ก่อน ไม่ได้ส่งตรงถึง remote host',
          'router ใช้ routing table เลือก next hop และ interface ออกที่เหมาะสม',
          'เวลาอ่าน topology ต้องระบุให้ได้ว่า interface ไหนเชื่อมกับ subnet ไหน และ router ใดทำหน้าที่เป็น gateway ของฝั่งต้นทาง',
        ],
      },
      {
        title: '3. Troubleshooting flow ที่ควรตอบ',
        bullets: [
          'เริ่มจาก ping loopback เพื่อตรวจ local TCP/IP stack',
          'เช็ก IP address, subnet mask และ default gateway ว่าตรงกับวงของตัวเอง',
          'ping gateway เพื่อตรวจ local link และ router interface ฝั่งตนเอง',
          'ถ้า ping gateway ได้แต่ remote host ไม่ได้ ให้ดู routing, firewall/ACL, interface status และสภาพของ host ปลายทาง',
          'ใช้ traceroute เมื่ออยากรู้ว่า packet หายที่ hop ไหน',
        ],
      },
      {
        title: '4. คำตอบที่อาจารย์มักชอบ',
        bullets: [
          'บอกสาเหตุได้หลายข้อ เช่น mask ผิด, gateway ผิด, route หาย, firewall block ICMP, interface down',
          'เสนอวิธีตรวจแบบมีลำดับ ไม่กระโดดข้ามขั้น',
          'ใช้ศัพท์ gateway, next hop, routing table, interface status ให้ถูกบริบท',
        ],
      },
    ],
  },
  {
    moduleKey: '14',
    overview: [
      'โจทย์ของ Module 14 เน้นเชื่อมหน้าที่ของ Transport Layer เข้ากับการใช้งานหลาย application พร้อมกันในโลกจริง',
      'ให้ตอบแบบเห็นภาพว่า segmentation และ multiplexing ช่วยให้ระบบรองรับหลาย service ได้อย่างไร และทำไม traffic real-time จึงเปราะบางกว่า',
    ],
    sections: [
      {
        title: '1. หน้าที่หลักของ Transport Layer',
        bullets: [
          'Segmentation แบ่งข้อมูลขนาดใหญ่เป็นหน่วยเล็กลงเพื่อจัดส่งได้ง่ายขึ้น',
          'Multiplexing ใช้ port numbers แยก traffic ของ application หลายตัวบน host เดียวกัน',
          'Flow control และ error recovery มีผลต่อประสบการณ์ใช้งานในเครือข่ายที่หนาแน่น',
        ],
      },
      {
        title: '2. TCP กับ UDP แบบที่ไม่ตอบเกินจริง',
        bullets: [
          'TCP มักใช้กับ traffic ที่ต้องการความครบถ้วน เช่น web, email และ file transfer เพราะมี acknowledgement และ retransmission',
          'UDP มักใช้กับ traffic ที่เน้นความต่อเนื่องและ latency ต่ำ เช่น voice หรือ video call โดยยอมเสีย packet บางส่วนได้',
          'อย่าตอบแบบฟันธงว่าทุก web ใช้แต่ TCP ทุกสถานการณ์หรือทุก streaming ใช้แต่ UDP เสมอ ให้ใช้คำว่า โดยทั่วไป หรือ มัก',
        ],
      },
      {
        title: '3. ทำไม video call กระตุกแต่ web ยังไปต่อได้',
        bullets: [
          'traffic แบบ real-time ไวต่อ latency, jitter และ packet loss มากกว่า',
          'เมื่อเกิด congestion packet ที่หลุดของ traffic แบบ real-time อาจไม่ทันเวลาแม้มีการกู้คืนบางส่วน',
          'web traffic ยังพอใช้งานต่อได้เพราะผู้ใช้ยอมรับการรอโหลดเพิ่มขึ้นได้มากกว่า',
        ],
      },
      {
        title: '4. แนวทางแก้ปัญหาที่ควรพูดถึง',
        bullets: [
          'QoS เพื่อให้ voice/video ได้ priority สูงกว่า background traffic',
          'จำกัดหรือแยก traffic บางประเภทเมื่อเกิด congestion',
          'ตรวจ bandwidth usage, latency และจุดคอขวดแทนการโทษสื่อหรือสายทันที',
        ],
      },
    ],
  },
  {
    moduleKey: '16',
    overview: [
      'ข้อสอบส่วน security จะให้สถานการณ์ที่มี traffic ผิดปกติหรือมีอุปกรณ์หลายตัวใน topology แล้วถามว่าตัวไหนทำหน้าที่อะไร',
      'จุดสำคัญคือแยก role ของ VPN, ASA Firewall, IPS และ AAA Server ให้ชัด รวมทั้งอธิบายได้ว่าการแบ่งเครือข่ายช่วยลดความเสียหายอย่างไร',
    ],
    sections: [
      {
        title: '1. บทบาทของอุปกรณ์หลัก',
        bullets: [
          'VPN สร้าง secure remote connection ให้ผู้ใช้เชื่อมเข้ามาจากภายนอก',
          'ASA Firewall ทำหน้าที่ allow/deny traffic และ enforce security policy ระหว่าง network zone',
          'IPS ตรวจจับและป้องกันพฤติกรรมโจมตีในระดับ network traffic แบบ near real-time',
          'AAA Server ควบคุม Authentication, Authorization และ Accounting',
        ],
      },
      {
        title: '2. Segmentation และ defense in depth',
        bullets: [
          'Segmentation เช่น VLAN หรือ zone-based design ช่วยจำกัดการกระจายของ attack',
          'ถ้ามีเครื่องภายในถูก compromise การแบ่งเครือข่ายช่วยลด lateral movement ไปยัง server สำคัญ',
          'Defense in depth คือใช้หลายชั้นร่วมกัน ไม่หวังพึ่ง firewall ตัวเดียว',
        ],
      },
      {
        title: '3. แยก usage ปกติกับ attack',
        bullets: [
          'usage ปกติมักสัมพันธ์กับเวลาใช้งานและมี pattern กระจายตัวตามประเภทผู้ใช้',
          'attack หรือ compromised hosts มักมี session จำนวนมากผิดปกติ, แหล่งที่มาซ้ำ ๆ หรือการพุ่งหา service เดียว',
          'การดู baseline, log source, destination และจำนวน session ช่วยแยกสองกรณีนี้ได้ดี',
        ],
      },
      {
        title: '4. วิธีตอบเวลาอ่าน topology',
        bullets: [
          'ระบุ zone ให้ได้ว่าอะไรคือ inside, outside, server segment หรือ remote access',
          'ตอบว่าถ้าต้อง block/allow ใช้ firewall, ถ้าต้อง detect/prevent ใช้ IPS, ถ้าต้องพิสูจน์ตัวตนหรือบันทึกบัญชีใช้งานให้โยง AAA',
          'ถ้าโจทย์พูดถึงผู้ใช้ remote ให้โยง VPN ก่อนอุปกรณ์อื่นเสมอ',
        ],
      },
    ],
  },
  {
    moduleKey: '17',
    overview: [
      'Module 17 เน้นการคิดเชิง design และ troubleshooting ว่าทำอย่างไรให้เครือข่ายไม่มี single point of failure',
      'โจทย์มักถามว่าทำไมบางบริการยังอยู่ แต่บางผู้ใช้ยังล่ม หรือควรตรวจอะไรเมื่อ backup path ทำงานไม่สมบูรณ์',
    ],
    sections: [
      {
        title: '1. ประเภท redundancy',
        bullets: [
          'Server redundancy คือมี server สำรองหรือ service replica',
          'Link redundancy คือมีเส้นทางสื่อสารสำรองเมื่อสายหลักมีปัญหา',
          'Switch redundancy และ router redundancy ช่วยลดผลกระทบจากอุปกรณ์ตัวหลักล้มเหลว',
        ],
      },
      {
        title: '2. Failover ที่ควรเข้าใจ',
        bullets: [
          'เมื่ออุปกรณ์หลักล้มเหลว ระบบควรสลับไปใช้ backup path หรือ backup device',
          'บางบริการอาจยังเข้าได้เพราะมี route สำรองหรือ service อยู่คนละ segment ที่ยังรอด',
          'แต่ผู้ใช้บางกลุ่มอาจยังใช้งานไม่ได้เพราะ policy, route update, spanning tree convergence หรือ config mismatch',
        ],
      },
      {
        title: '3. Troubleshooting หลัง failover',
        bullets: [
          'ตรวจ physical link และ port status ก่อนเสมอ',
          'เช็กว่า routing/failover protocol อัปเดตแล้วหรือยัง',
          'ดู spanning tree state ถ้า path ผ่าน switch redundancy',
          'เช็ก server availability และ bandwidth ของ backup link ด้วย',
        ],
      },
      {
        title: '4. รูปแบบคำตอบที่ดี',
        bullets: [
          'อธิบายให้เห็นว่า redundancy ไม่ได้แปลว่าประสิทธิภาพเท่าเดิมทุกกรณี',
          'บอกได้ว่าทำไมบาง service survive แต่บาง user impact',
          'เชื่อมโยง root cause กับองค์ประกอบจริง เช่น route ยังไม่ converge, backup link เล็กกว่า, ACL บน path สำรองไม่เหมือนเดิม',
        ],
      },
    ],
  },
];

export const labChecklist: LabSection[] = [
  {
    title: 'Lab Context',
    bullets: [
      'อิงจาก Packet Tracer 1.3.14: Investigate a Threat Landscape',
      'สภาพแวดล้อมหลักมีทั้ง Home Network และ Cafe/Branch Office',
      'Lab ไม่ใช่แค่จำขั้นตอน แต่ต้องอธิบายความเสี่ยงและแนวทางป้องกันได้ด้วย',
    ],
  },
  {
    title: 'Network Basics',
    bullets: [
      'การตั้งค่า DHCP, IP address และ subnet ให้ตรงกับวง',
      'การใช้คำสั่ง ping เพื่อตรวจ layer 3 connectivity',
      'การใช้ arp -a เพื่อดูการจับคู่ IP address กับ MAC address',
    ],
  },
  {
    title: 'Wireless',
    bullets: [
      'การตั้งค่า SSID และ security ของ Wi-Fi',
      'ความต่างของ 2.4 GHz กับ 5 GHz ทั้งเรื่อง range, interference และ throughput',
      'การระวัง rogue AP หรือ access point ที่ตั้งค่าเลียนแบบเครือข่ายจริง',
    ],
  },
  {
    title: 'Cybersecurity Threats',
    bullets: [
      'Phishing email และ social engineering ว่าโจมตีผู้ใช้อย่างไร',
      'Fake AP / Evil Twin ใช้หลอกให้เหยื่อเชื่อมต่อ Wi-Fi ปลอม',
      'DNS spoofing หรือ DNS hijacking ทำให้ domain ชี้ไปยัง server ปลอม',
      'แนวทางป้องกัน เช่น ใช้ VPN, ตรวจ certificate, ใช้ HTTPS และหลีกเลี่ยง Wi-Fi ที่ไม่น่าเชื่อถือ',
    ],
  },
];

export const subjectiveRubrics: SubjectiveRubric[] = [
  {
    moduleKey: '11-12',
    goal: 'อธิบายเหตุผลของการเปลี่ยนจาก IPv4 ไป IPv6 พร้อม migration approach',
    strongAnswer: [
      'เริ่มจากปัญหา address exhaustion ของ IPv4 และบทบาทของ NAT',
      'บอกข้อดีของ IPv6 มากกว่าแค่จำนวน address เช่น SLAAC, เหมาะกับ IoT/mobile, โครงสร้างระยะยาวที่ยืดหยุ่นกว่า',
      'เสนอ coexistence เช่น dual stack, tunneling หรือ NAT64 ให้ตรงบริบทโจทย์',
    ],
    commonMisses: [
      'พูดว่า IPv6 ดีกว่าเพราะใหม่กว่าแต่ไม่อธิบายปัญหาที่กำลังแก้',
      'ไม่พูดถึงวิธีอยู่ร่วมกับระบบ IPv4 เดิม',
    ],
    sampleAngles: [
      'มหาวิทยาลัยมี phone, notebook, IP camera และ IoT จำนวนมาก',
      'องค์กรยังมีระบบเก่าหรือ printer ที่รองรับเฉพาะ IPv4',
    ],
  },
  {
    moduleKey: '13',
    goal: 'อธิบายลำดับคิดเมื่อ ping ข้าม subnet ไม่สำเร็จ',
    strongAnswer: [
      'อธิบายว่า host คนละ subnet ต้องส่งผ่าน default gateway',
      'เช็ก IP, subnet mask, gateway, interface status, routing และ firewall ตามลำดับ',
      'ใช้ศัพท์ next hop, router interface และ routing table อย่างถูกบริบท',
    ],
    commonMisses: [
      'ตอบกว้างเกินไปว่า network มีปัญหา',
      'ข้ามบทบาทของ gateway หรือไม่แยก local problem กับ remote problem',
    ],
    sampleAngles: [
      'เครื่อง A ping เครื่อง B ไม่ได้',
      'อ่าน topology แล้วบอก packet ต้องวิ่งผ่าน interface ใดก่อน',
    ],
  },
  {
    moduleKey: '14',
    goal: 'เชื่อม Transport Layer เข้ากับพฤติกรรมของ application หลายประเภท',
    strongAnswer: [
      'อธิบาย segmentation และ multiplexing ด้วยตัวอย่างการใช้งานพร้อมกันของหลายแอป',
      'อธิบายว่า traffic แบบ real-time มักไวต่อ latency, jitter และ packet loss',
      'เสนอการแก้ปัญหาเช่น QoS, traffic shaping หรือการตรวจ congestion',
    ],
    commonMisses: [
      'ท่อง TCP/UDP แบบไม่เชื่อมกับสถานการณ์',
      'ฟันธงการใช้งานของ protocol โดยไม่ใส่คำว่า โดยทั่วไป หรือ มัก',
    ],
    sampleAngles: [
      'video call กระตุกแต่ web ยังเปิดได้',
      'เครือข่ายหนาแน่นทั้งที่สายและอุปกรณ์ยังปกติ',
    ],
  },
  {
    moduleKey: '16',
    goal: 'วิเคราะห์สถานการณ์ security และบทบาทอุปกรณ์ให้ถูกตัว',
    strongAnswer: [
      'แยก role ของ VPN, ASA Firewall, IPS และ AAA ได้ชัด',
      'อธิบายการใช้ segmentation และ defense in depth เพื่อลดความเสียหาย',
      'ใช้ baseline, log pattern และ session count เพื่อแยก usage ปกติกับ attack',
    ],
    commonMisses: [
      'ใช้คำว่า firewall ตรวจจับทุกอย่างโดยไม่แยกกับ IPS',
      'ไม่เชื่อมโจทย์ remote user กับ VPN หรือ ignore AAA entirely',
    ],
    sampleAngles: [
      'ทราฟฟิกผิดปกติจากหลายเครื่องภายใน',
      'มีผู้ใช้ remote access แล้ว web server ถูกยิง request จำนวนมาก',
    ],
  },
  {
    moduleKey: '17',
    goal: 'อธิบาย redundancy และวิเคราะห์ปัญหาเมื่อ failover ทำงานไม่สมบูรณ์',
    strongAnswer: [
      'อธิบายชนิด redundancy ที่เกี่ยวข้องกับเหตุการณ์',
      'บอกได้ว่าทำไมบาง service ยังอยู่แต่บางกลุ่มผู้ใช้ยังได้รับผลกระทบ',
      'เสนอการตรวจ physical link, port status, routing/failover, spanning tree และ server availability',
    ],
    commonMisses: [
      'ตอบว่ามี backup จึงไม่ควรมีปัญหาเลย',
      'ไม่ชี้จุดว่าปัญหาอาจอยู่ที่ policy, convergence หรือ bandwidth บน path สำรอง',
    ],
    sampleAngles: [
      'router หลักล่มแต่บางบริการยังเข้าได้',
      'มี link redundancy แล้วแต่ผู้ใช้บาง VLAN ยังใช้งานไม่ได้',
    ],
  },
];

export const objectiveQuestionBank: Question[] = [
  {
    id: 'm11-12-q1',
    moduleKey: '11-12',
    question:
      'มหาวิทยาลัยแห่งหนึ่งมี notebook, smartphone, กล้อง IP และ IoT sensor เพิ่มขึ้นทุกปี ปัจจัยใดอธิบายได้ดีที่สุดว่าทำไมจึงควรวางแผนใช้ IPv6',
    options: [
      'เพราะ IPv6 ทำให้ไม่ต้องใช้ router อีกต่อไป',
      'เพราะ IPv6 แก้ข้อจำกัดเรื่องจำนวน address ของ IPv4 ในระยะยาว',
      'เพราะ IPv6 ทำให้ทุก application เร็วขึ้นโดยอัตโนมัติ',
      'เพราะ IPv6 บังคับให้องค์กรเลิกใช้ private address ทันที',
    ],
    correctAnswer: 1,
    explanation:
      'หัวใจของโจทย์คือ IPv4 address exhaustion เมื่อจำนวนอุปกรณ์เพิ่มขึ้นมาก IPv6 จึงช่วยขยาย address space และเหมาะกับการเติบโตระยะยาวของ campus network',
  },
  {
    id: 'm11-12-q2',
    moduleKey: '11-12',
    question:
      'ข้อใดอธิบายความต่างระหว่างการเขียน address ของ IPv4 และ IPv6 ได้ถูกต้องที่สุด',
    options: [
      'IPv4 ใช้เลขฐานสิบ 32-bit ส่วน IPv6 ใช้เลขฐานสิบหก 128-bit',
      'IPv4 ใช้เลขฐานสิบหก 32-bit ส่วน IPv6 ใช้เลขฐานสิบ 128-bit',
      'ทั้ง IPv4 และ IPv6 ใช้รูปแบบ decimal 4 ชุดเหมือนกัน',
      'IPv6 ใช้ 64-bit จึงยาวกว่า IPv4 เพียงเล็กน้อย',
    ],
    correctAnswer: 0,
    explanation:
      'IPv4 เขียนเป็น decimal 4 octets ในขณะที่ IPv6 ใช้ hexadecimal และมีความยาว 128-bit จึงรองรับ address ได้มากกว่ามาก',
  },
  {
    id: 'm11-12-q3',
    moduleKey: '11-12',
    question:
      'องค์กรยังมี printer และ application เดิมที่รองรับเฉพาะ IPv4 แต่ต้องเริ่มเปิดบริการใหม่บน IPv6 แนวทางใดเหมาะที่สุดในช่วงเปลี่ยนผ่าน',
    options: [
      'ปิด IPv4 ทั้งองค์กรทันทีแล้วบังคับทุกเครื่องใช้ IPv6',
      'ใช้ dual stack เพื่อให้ระบบเดิมกับระบบใหม่ทำงานคู่กันได้ชั่วคราว',
      'ใช้ hub แทน switch เพื่อให้ packet เดินได้ทั้งสองแบบ',
      'เลิกใช้ private IPv4 แล้วทุกอย่างจะกลายเป็น IPv6 อัตโนมัติ',
    ],
    correctAnswer: 1,
    explanation:
      'Dual stack เป็นแนวทาง coexistence ที่ตรงที่สุดเมื่อองค์กรยังต้องรองรับทั้งระบบเก่าและระบบใหม่ในช่วง migration',
  },
  {
    id: 'm11-12-q4',
    moduleKey: '11-12',
    question:
      'คำอธิบายใดถูกต้องที่สุดเกี่ยวกับ NAT ในบริบท IPv4',
    options: [
      'NAT ใช้แปล private IPv4 เป็น public IPv4 เพื่อช่วยประหยัด public address',
      'NAT ใช้แปล MAC address เป็น IP address ในทุก hop',
      'NAT เป็นวิธีเดียวที่ทำให้ IPv6 ทำงานได้',
      'NAT ทำหน้าที่แทน AAA Server ในการพิสูจน์ตัวตนผู้ใช้',
    ],
    correctAnswer: 0,
    explanation:
      'NAT ช่วยให้อุปกรณ์ private IPv4 จำนวนมากแชร์ public IPv4 ได้ แต่ไม่ได้แก้ปัญหาจำนวน address แบบถาวร',
  },
  {
    id: 'm11-12-q5',
    moduleKey: '11-12',
    question:
      'สาขาหนึ่งมี traffic IPv6 แต่ backbone ระหว่างสาขายังเป็น IPv4 ทั้งหมด แนวคิดใดตรงกับโจทย์นี้มากที่สุด',
    options: [
      'Segmentation',
      'Tunneling',
      'QoS',
      'ARP cache',
    ],
    correctAnswer: 1,
    explanation:
      'Tunneling คือการห่อหุ้ม traffic IPv6 ให้วิ่งผ่านเครือข่าย IPv4 เดิมได้ จึงเหมาะกับสถานการณ์ที่ backbone ยังไม่รองรับ IPv6 เต็มตัว',
  },
  {
    id: 'm11-12-q6',
    moduleKey: '11-12',
    question:
      'ถ้า client ฝั่ง IPv6-only ต้องเข้าถึง service ฝั่ง IPv4-only กลไกใดเกี่ยวข้องโดยตรงมากที่สุด',
    options: [
      'NAT64 หรือ translation ระหว่าง IPv6 กับ IPv4',
      'Spanning Tree',
      'AAA',
      'MAC learning',
    ],
    correctAnswer: 0,
    explanation:
      'โจทย์นี้ต้องมีการ translation ระหว่างสองโลกของ address โดย NAT64 เป็นตัวอย่างกลไกที่ใช้เชื่อม client IPv6 กับ service IPv4',
  },
  {
    id: 'm13-q1',
    moduleKey: '13',
    question:
      'เครื่อง A ต้อง ping เครื่อง B ที่อยู่อีก subnet หนึ่ง ขั้นตอนแรกของเครื่อง A คืออะไร',
    options: [
      'ส่ง packet ตรงไปยัง MAC ของเครื่อง B เสมอ',
      'ส่ง packet ไปยัง default gateway ก่อน',
      'เปลี่ยน IP ของตัวเองให้เป็น subnet เดียวกับเครื่อง B',
      'รอให้ AAA Server อนุมัติก่อนเสมอ',
    ],
    correctAnswer: 1,
    explanation:
      'เมื่อปลายทางอยู่อีก subnet host จะส่ง packet ไปยัง default gateway เพื่อให้ router ตัดสินใจส่งต่อข้าม network',
  },
  {
    id: 'm13-q2',
    moduleKey: '13',
    question:
      'ข้อใดอธิบายหน้าที่หลักของ ICMP ได้เหมาะสมที่สุด',
    options: [
      'ใช้เข้ารหัสข้อมูลสำหรับ VPN',
      'ใช้ส่ง web page ไปยัง browser',
      'ใช้สำหรับ diagnostic และ error reporting บนเครือข่าย IP',
      'ใช้เก็บ username/password ของผู้ใช้',
    ],
    correctAnswer: 2,
    explanation:
      'ICMP ไม่ได้ใช้บรรทุกข้อมูลของผู้ใช้โดยตรง แต่ใช้เพื่อ diagnostic และส่งข้อความ error/reporting เช่น Echo Request/Reply และ destination unreachable',
  },
  {
    id: 'm13-q3',
    moduleKey: '13',
    question:
      'ถ้า ping default gateway ได้ แต่ ping remote host ไม่ได้ สาเหตุใดมีความเป็นไปได้มากที่สุด',
    options: [
      'สายของเครื่องตัวเองขาดแน่นอน',
      'local NIC เสียแน่นอน',
      'routing ฝั่งกลางทางผิด, firewall block ICMP หรือ host ปลายทาง offline',
      'TCP port 443 ปิดอยู่',
    ],
    correctAnswer: 2,
    explanation:
      'เมื่อ ping gateway ได้ แปลว่า local link มีโอกาสปกติแล้ว จึงควรหันไปดู route, firewall/ACL หรือสภาพของ remote host ต่อ',
  },
  {
    id: 'm13-q4',
    moduleKey: '13',
    question:
      'ผู้ดูแลต้องการรู้ว่า packet หายที่ router หรือ hop ใดระหว่างทาง ควรใช้เครื่องมือใดเพิ่มเติมจาก ping',
    options: [
      'arp -a',
      'traceroute หรือ tracert',
      'NAT64',
      'SLAAC',
    ],
    correctAnswer: 1,
    explanation:
      'traceroute/tracert แสดงเส้นทางเป็น hop จึงช่วยระบุได้ว่าปัญหาเกิดก่อนถึง router ตัวไหน',
  },
  {
    id: 'm13-q5',
    moduleKey: '13',
    question:
      'ถ้าเครื่องหนึ่งตั้ง subnet mask ผิด ผลกระทบที่เป็นไปได้คืออะไร',
    options: [
      'เครื่องอาจตัดสินใจผิดว่าปลายทางอยู่ subnet เดียวกันหรือไม่',
      'switch จะหยุดเรียนรู้ MAC address ทันที',
      'AAA Server จะใช้งานไม่ได้ทั้งหมด',
      'router ทุกตัวจะล้มเหลวพร้อมกัน',
    ],
    correctAnswer: 0,
    explanation:
      'subnet mask มีผลโดยตรงต่อการตัดสินใจว่า destination เป็น local หรือ remote ถ้าตั้งผิด host อาจส่ง packet ผิดทางตั้งแต่ต้น',
  },
  {
    id: 'm13-q6',
    moduleKey: '13',
    question:
      'ข้อใดเป็นลำดับ troubleshooting ที่เหมาะสมกว่าสำหรับกรณี ping ไม่ผ่าน',
    options: [
      'โทษ ISP ก่อน แล้วค่อยดู IP',
      'เช็ก IP/mask/gateway, เช็ก interface และ gateway, จากนั้นดู routing กับ firewall',
      'เปลี่ยนสายทุกเส้นทันที',
      'รีเซ็ต router ทั้งเครือข่ายโดยไม่ตรวจอะไร',
    ],
    correctAnswer: 1,
    explanation:
      'การแก้ปัญหาควรเริ่มจากค่าพื้นฐานใกล้ตัวก่อน แล้วค่อยไล่ไปยัง gateway, routing และ firewall เพื่อแยก local problem กับ network problem',
  },
  {
    id: 'm14-q1',
    moduleKey: '14',
    question:
      'ข้อใดอธิบาย segmentation ของ Transport Layer ได้ดีที่สุด',
    options: [
      'การแบ่งข้อมูลขนาดใหญ่เป็นหน่วยย่อยเพื่อส่งผ่านเครือข่ายได้ง่ายขึ้น',
      'การแบ่งเครือข่ายเป็น VLAN',
      'การแบ่งผู้ใช้ตามสิทธิ์ AAA',
      'การแยก public IP กับ private IP',
    ],
    correctAnswer: 0,
    explanation:
      'Segmentation คือการแบ่งข้อมูลออกเป็นส่วนย่อยในชั้น Transport ไม่ใช่การแบ่งเครือข่ายแบบ VLAN',
  },
  {
    id: 'm14-q2',
    moduleKey: '14',
    question:
      'ทำไม host เดียวจึงเปิด web browser, chat และ email พร้อมกันได้โดยไม่ปะปนกัน',
    options: [
      'เพราะใช้ port numbers สำหรับ multiplexing',
      'เพราะทุก application ใช้ MAC address คนละชุด',
      'เพราะ ICMP แยก packet ให้เอง',
      'เพราะ default gateway จำเนื้อหาแต่ละแอปได้',
    ],
    correctAnswer: 0,
    explanation:
      'Multiplexing ใช้ port numbers ช่วยแยก traffic ของแต่ละ application บน host เดียวกัน ทำให้หลายแอปใช้งานพร้อมกันได้',
  },
  {
    id: 'm14-q3',
    moduleKey: '14',
    question:
      'ในช่วงที่เครือข่ายหนาแน่น video call กระตุกชัดเจน แต่หน้า web ยังพอโหลดได้ ข้อใดอธิบายเหตุผลได้เหมาะสมที่สุด',
    options: [
      'traffic แบบ real-time มักไวต่อ latency, jitter และ packet loss มากกว่า',
      'web ไม่ได้ใช้ Transport Layer',
      'video call ใช้ router คนละตัวกับ web เสมอ',
      'video call ไม่ต้องอาศัย bandwidth เลย',
    ],
    correctAnswer: 0,
    explanation:
      'traffic แบบ real-time รับผลจาก latency, jitter และ packet loss ชัดกว่าจึงเสียประสบการณ์เร็วกว่า ในขณะที่ web ยังพอยอมให้ช้าลงได้',
  },
  {
    id: 'm14-q4',
    moduleKey: '14',
    question:
      'ถ้าต้องการเพิ่มโอกาสให้ voice และ video ผ่านได้ลื่นขึ้นในช่วง congestion ควรเน้นแนวทางใด',
    options: [
      'QoS เพื่อให้ traffic แบบ real-time ได้ priority สูงขึ้น',
      'ปิด routing table ทั้งหมด',
      'เปลี่ยน default gateway เป็น AAA Server',
      'ใช้เฉพาะ IPv4 แล้วปัญหาจะหายเอง',
    ],
    correctAnswer: 0,
    explanation:
      'QoS เป็นแนวทางมาตรฐานในการให้ priority กับ traffic ที่ไวต่อ delay เช่น voice และ video ในช่วง congestion',
  },
  {
    id: 'm14-q5',
    moduleKey: '14',
    question:
      'งานใดมักเหมาะกับ protocol แบบ reliable มากกว่าเมื่อเทียบกับ voice call',
    options: [
      'file transfer',
      'live gaming audio',
      'interactive voice chat',
      'video conference ที่ต้องการ latency ต่ำ',
    ],
    correctAnswer: 0,
    explanation:
      'งานอย่าง file transfer ให้ความสำคัญกับความครบถ้วนของข้อมูล จึงมักเหมาะกับแนวทางแบบ reliable มากกว่า traffic real-time',
  },
  {
    id: 'm14-q6',
    moduleKey: '14',
    question:
      'ถ้าระบบสายและอุปกรณ์ยังปกติแต่ผู้ใช้บ่นว่าเครือข่ายช้า สิ่งใดควรสงสัยเป็นพิเศษตามมุมมองของ Module 14',
    options: [
      'ARP cache เต็ม',
      'congestion จากหลาย application แย่งใช้ bandwidth พร้อมกัน',
      'IPv6 หมดอายุ',
      'MAC address ของทุกเครื่องซ้ำกันทั้งหมด',
    ],
    correctAnswer: 1,
    explanation:
      'Module 14 เน้นให้คิดเรื่อง congestion และการแย่งใช้ bandwidth/queue ของหลาย application ไม่ใช่โทษสื่อทางกายภาพทันที',
  },
  {
    id: 'm16-q1',
    moduleKey: '16',
    question:
      'พนักงานทำงานจากนอกบริษัทและต้องเชื่อมเข้าระบบภายในอย่างปลอดภัย องค์ประกอบใดเกี่ยวข้องโดยตรงที่สุด',
    options: [
      'VPN',
      'ARP cache',
      'Spanning Tree',
      'Tunneling IPv6 เท่านั้น',
    ],
    correctAnswer: 0,
    explanation:
      'VPN ใช้สร้าง secure remote connection ให้ผู้ใช้งานภายนอกเข้าถึงทรัพยากรภายในองค์กรได้อย่างปลอดภัย',
  },
  {
    id: 'm16-q2',
    moduleKey: '16',
    question:
      'ถ้าโจทย์ถามว่าอุปกรณ์ใดมีหน้าที่ allow/deny traffic ตาม policy ระหว่าง inside กับ outside zone คำตอบที่เหมาะสุดคืออะไร',
    options: [
      'ASA Firewall',
      'AAA Server',
      'DHCP Server',
      'ARP table',
    ],
    correctAnswer: 0,
    explanation:
      'ASA Firewall ใช้บังคับ policy การอนุญาตหรือปฏิเสธ traffic ระหว่าง zone ต่าง ๆ จึงตรงกับโจทย์มากที่สุด',
  },
  {
    id: 'm16-q3',
    moduleKey: '16',
    question:
      'ถ้าต้องการตรวจจับและหยุดพฤติกรรมโจมตีบน network traffic แบบ near real-time ควรพึ่งอุปกรณ์ใด',
    options: [
      'IPS',
      'AAA Server',
      'NAT64',
      'Hub',
    ],
    correctAnswer: 0,
    explanation:
      'IPS มีหน้าที่ตรวจจับและป้องกันพฤติกรรมโจมตีจาก traffic pattern ไม่ใช่แค่ควบคุมสิทธิ์ผู้ใช้',
  },
  {
    id: 'm16-q4',
    moduleKey: '16',
    question:
      'ข้อใดสะท้อนประโยชน์ของ network segmentation ได้ชัดที่สุด',
    options: [
      'ช่วยให้ทุกคนเข้าถึงทุก server ได้ง่ายขึ้น',
      'ช่วยจำกัดการแพร่กระจายของ attack และลด lateral movement',
      'ทำให้ไม่ต้องมี firewall หรือ IPS อีก',
      'ทำให้ router ไม่ต้องมี routing table',
    ],
    correctAnswer: 1,
    explanation:
      'Segmentation มีเป้าหมายหลักเพื่อแยก zone และลดผลกระทบเมื่อมีเครื่องหนึ่งเครื่องใดถูก compromise',
  },
  {
    id: 'm16-q5',
    moduleKey: '16',
    question:
      'ผู้ดูแลเห็น request ไป web server สูงผิดปกติจากหลายเครื่องภายในพร้อมกัน สิ่งใดควรใช้แยกว่าคือการใช้งานปกติหรือ compromised hosts',
    options: [
      'ดูเฉพาะสีของสาย LAN',
      'ดู baseline, จำนวน session, เวลาใช้งาน และรูปแบบ log',
      'ลบ routing table ก่อน',
      'ปิด server โดยไม่ตรวจอะไร',
    ],
    correctAnswer: 1,
    explanation:
      'การแยก usage ปกติกับ attack ต้องอาศัย baseline และ pattern ของ session/log ไม่ใช่ดูแค่ทราฟฟิกสูงอย่างเดียว',
  },
  {
    id: 'm16-q6',
    moduleKey: '16',
    question:
      'ระบบใดเกี่ยวข้องกับ Authentication, Authorization และ Accounting โดยตรง',
    options: [
      'AAA Server',
      'IPS',
      'Tunneling',
      'Default Gateway',
    ],
    correctAnswer: 0,
    explanation:
      'AAA Server มีบทบาทตรงในการพิสูจน์ตัวตน, ควบคุมสิทธิ์ และบันทึกการใช้งานของผู้ใช้',
  },
  {
    id: 'm17-q1',
    moduleKey: '17',
    question:
      'เหตุผลสำคัญที่สุดของการออกแบบ redundancy ในเครือข่ายคืออะไร',
    options: [
      'เพื่อให้ทุก packet วิ่งผ่านได้สองเส้นพร้อมกันเสมอ',
      'เพื่อลด single point of failure',
      'เพื่อยกเลิกการใช้ routing protocol',
      'เพื่อไม่ต้องตรวจ physical link อีก',
    ],
    correctAnswer: 1,
    explanation:
      'หัวใจของ redundancy คือการลด single point of failure เพื่อไม่ให้ความเสียหายจากจุดเดียวทำให้บริการทั้งหมดล่ม',
  },
  {
    id: 'm17-q2',
    moduleKey: '17',
    question:
      'ถ้า router หลักล่มแต่บางบริการยังเข้าได้ ข้อใดเป็นคำอธิบายที่เป็นไปได้ที่สุด',
    options: [
      'มี failover หรือ backup route รองรับบริการบางส่วนอยู่',
      'ICMP หยุดทำงานทั้งหมด',
      'ทุก VLAN รวมเป็นวงเดียวกันทันที',
      'DHCP เปลี่ยนเป็น firewall อัตโนมัติ',
    ],
    correctAnswer: 0,
    explanation:
      'บริการบางส่วนอาจยังอยู่ได้เพราะมีเส้นทางหรืออุปกรณ์สำรองรองรับ แม้ router หลักจะล้มเหลวไปแล้ว',
  },
  {
    id: 'm17-q3',
    moduleKey: '17',
    question:
      'มี link redundancy แล้วแต่ผู้ใช้บางกลุ่มยังใช้งานไม่ได้หลัง failover สาเหตุใดสมเหตุสมผลที่สุด',
    options: [
      'spanning tree ยัง converge ไม่เสร็จ, route/policy บน path สำรองไม่ตรง หรือ backup link เล็กกว่า',
      'เพราะ redundancy ทำให้ทุกคนต้อง logout',
      'เพราะ MAC address หายไปจากโลกอินเทอร์เน็ต',
      'เพราะ IPv6 ปิดการทำงานของ switch',
    ],
    correctAnswer: 0,
    explanation:
      'failover ไม่ได้แปลว่าทุกอย่างจะกลับมาเหมือนเดิมทันที ปัญหาอาจอยู่ที่ convergence, policy mismatch หรือข้อจำกัดของ backup link',
  },
  {
    id: 'm17-q4',
    moduleKey: '17',
    question:
      'ข้อใดเป็นตัวอย่างของ server redundancy',
    options: [
      'มี web server สำรองหรือ replica รับงานแทนเมื่อเครื่องหลักล่ม',
      'มี default gateway สองค่าในเครื่องเดียว',
      'ตั้ง QoS ให้ video call',
      'ใช้ ping กับ tracert พร้อมกัน',
    ],
    correctAnswer: 0,
    explanation:
      'Server redundancy คือการมี service instance สำรองเพื่อให้บริการยังอยู่ได้เมื่อ server หลักล้มเหลว',
  },
  {
    id: 'm17-q5',
    moduleKey: '17',
    question:
      'หลังเกิด failover ขั้นตอนใดควรอยู่ใน checklist การตรวจสอบเสมอ',
    options: [
      'ตรวจ physical link, port status, routing/failover state และ server availability',
      'เปลี่ยน password ผู้ใช้ทุกคนทันที',
      'ลบ ARP cache ทั้งอินเทอร์เน็ต',
      'ปิด VPN ถาวร',
    ],
    correctAnswer: 0,
    explanation:
      'การตรวจหลัง failover ต้องไล่ทั้งเส้นทาง, สถานะพอร์ต, การ converge ของ route และสถานะของบริการปลายทาง',
  },
  {
    id: 'm17-q6',
    moduleKey: '17',
    question:
      'ถ้าบริการยังไม่ล่มแต่ผู้ใช้รู้สึกช้าลงหลังสลับไปใช้ path สำรอง สาเหตุใดตรงกับแนวคิดใน Module 17 มากที่สุด',
    options: [
      'backup link มี bandwidth ต่ำกว่าลิงก์หลัก',
      'default gateway กลายเป็น IPv6 โดยอัตโนมัติ',
      'MAC learning ถูกยกเลิก',
      'AAA Server ปิดการใช้งานทุกคน',
    ],
    correctAnswer: 0,
    explanation:
      'path สำรองอาจช่วยให้บริการยังไม่ล่ม แต่ถ้า bandwidth ต่ำกว่าหรือ policy ต่างจากเส้นหลัก ประสิทธิภาพจะลดลงได้',
  },
];

export const chatPromptExamples = [
  'อธิบายว่าองค์กรควรใช้ dual stack ตอนไหน และต่างจาก NAT64 อย่างไร',
  'ถ้า ping ข้าม subnet ไม่ผ่าน ควรตรวจอะไรตามลำดับบ้าง',
  'ทำไม video call กระตุกแต่ web ยังพอเปิดได้ในช่วงเครือข่ายหนาแน่น',
  'ASA Firewall, IPS และ AAA Server ต่างกันอย่างไรในโจทย์แบบ topology',
  'มี redundancy แล้วแต่บาง VLAN ยังล่ม ควรไล่เช็กจุดไหนก่อน',
  'Fake AP กับ DNS spoofing ต่างกันอย่างไร และควรป้องกันอย่างไรใน Wi-Fi สาธารณะ',
];

export const reviewReferenceText = [
  'Final Exam Scope:',
  ...finalExamMetadata.reviewIntro,
  '',
  ...guideModules.flatMap((module) => {
    const info = moduleCatalog[module.moduleKey];
    return [
      `${info.badge}: ${info.title}`,
      'Must know:',
      ...module.mustKnow.map((item) => `- ${item}`),
      'Exam focus:',
      ...module.examFocus.map((item) => `- ${item}`),
      '',
    ];
  }),
  'Lab checklist:',
  ...labChecklist.flatMap((section) => [
    `${section.title}:`,
    ...section.bullets.map((item) => `- ${item}`),
  ]),
].join('\n');

export const subjectiveRubricText = subjectiveRubrics
  .map((rubric) => {
    const info = moduleCatalog[rubric.moduleKey];
    return [
      `${info.badge}: ${info.title}`,
      `Goal: ${rubric.goal}`,
      'Strong answer should include:',
      ...rubric.strongAnswer.map((item) => `- ${item}`),
      'Common misses:',
      ...rubric.commonMisses.map((item) => `- ${item}`),
      'Sample angles:',
      ...rubric.sampleAngles.map((item) => `- ${item}`),
    ].join('\n');
  })
  .join('\n\n');

export const chatSystemContext = [
  'คุณเป็นผู้ช่วยติวสอบปลายภาควิชา MIT-704 Information Technology Infrastructure',
  'ขอบเขต final ที่ตอบได้มีเฉพาะ Module 11-12, 13, 14, 16, 17 และหัวข้อ lab เรื่อง DHCP/IP/Subnet, ping, arp -a, SSID, 2.4 GHz vs 5 GHz, phishing, social engineering, Fake AP/Evil Twin, DNS spoofing และการป้องกัน',
  'ถ้าผู้ใช้ถามหัวข้อเก่าจาก midterm ที่อยู่นอก final scope เช่น OSI model, CIDR drill, Ethernet switching detail หรือ Module 1-7 ให้ตอบสั้น ๆ ว่าอยู่นอกขอบเขต final รอบนี้ แล้ว redirect กลับมาหัวข้อ final ที่ใกล้ที่สุด',
  'ตอบเป็นภาษาไทย กระชับ ชัดเจน และเชื่อมกับสถานการณ์จริง',
  'เมื่อเป็นคำถามเชิง troubleshooting ให้ตอบเป็นลำดับขั้นตอน',
  'เมื่อเป็นคำถามเชิงเปรียบเทียบ ให้สรุปความต่างก่อน แล้วค่อยโยงกับบริบทใช้งาน',
].join('\n');

export function getModuleInfo(moduleKey: ModuleKey) {
  return moduleCatalog[moduleKey];
}

export function getModuleLabel(moduleKey: ModuleKey) {
  return moduleCatalog[moduleKey].badge;
}

export function getModuleTitle(moduleKey: ModuleKey) {
  return moduleCatalog[moduleKey].title;
}
