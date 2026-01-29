export interface ReviewSection {
  id: number;
  title: string;
  subtitle: string;
  content: ReviewTopic[];
}

export interface ReviewTopic {
  heading: string;
  points: string[];
}

export const reviewSections: ReviewSection[] = [
  {
    id: 1,
    title: 'Module 1: Networking Today',
    subtitle: 'การเลือกการเชื่อมต่ออินเทอร์เน็ตและบทบาท ISP',
    content: [
      {
        heading: '1. ประเภทการเชื่อมต่ออินเทอร์เน็ต (Internet Connections)',
        points: [
          'DSL (Digital Subscriber Line): ใช้สายโทรศัพท์ที่มีอยู่เดิม มี bandwidth สูง และเป็นแบบ "always-on"',
          'Cable: ใช้สายเคเบิลทีวี (Coaxial) มี bandwidth สูง และเป็นแบบ always-on',
          'Cellular: เชื่อมต่อผ่านเครือข่ายโทรศัพท์มือถือ',
          'Satellite (ดาวเทียม): เหมาะสำหรับพื้นที่ชนบทที่ไม่มีการเชื่อมต่อแบบสายเข้าถึง',
          'Dial-up Telephone: ราคาถูกแต่ Bandwidth ต่ำมาก ใช้โมเด็มหมุนโทรศัพท์',
          'Fiber Optic: รองรับ bandwidth สูงสุดและระยะทางไกล',
          'สำหรับองค์กรธุรกิจ: ใช้ Dedicated Leased Line, Metro Ethernet หรือ Business DSL',
        ],
      },
      {
        heading: '2. การวิเคราะห์สถานการณ์ (Teleworker / SOHO)',
        points: [
          'Small Office/Home Office (SOHO): เครือข่ายขนาดเล็กที่เชื่อมคอมพิวเตอร์ไม่กี่เครื่องเข้าด้วยกันและออกสู่อินเทอร์เน็ต',
          'Teleworker ทำงานจากบ้าน: เลือก Cable หรือ DSL เนื่องจากมีความเร็วสูงและเสถียร',
          'พื้นที่ห่างไกล: เลือก Satellite',
        ],
      },
      {
        heading: '3. บทบาทของ ISP (Internet Service Provider)',
        points: [
          'ISP คือผู้ให้บริการที่เชื่อมต่อผู้ใช้งานเข้าสู่เครือข่ายอินเทอร์เน็ต',
          'หากไม่มี ISP อุปกรณ์ใน LAN จะไม่สามารถสื่อสารออกไปยัง World Wide Web ได้',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Module 3: Protocols and Models',
    subtitle: 'โมเดลเครือข่าย (OSI vs TCP/IP)',
    content: [
      {
        heading: '1. ความหมายและเหตุผลที่ต้องใช้ Networking Model',
        points: [
          'โมเดลช่วยอธิบายการทำงานของเครือข่ายที่ซับซ้อนโดยแบ่งเป็นชั้น (Layered model)',
          'ช่วยในการออกแบบโปรโตคอล (Protocol design)',
          'กระตุ้นให้เกิดการแข่งขัน - ผลิตภัณฑ์จากต่างยี่ห้อทำงานร่วมกันได้',
          'ป้องกันไม่ให้การเปลี่ยนแปลงเทคโนโลยีในชั้นหนึ่งส่งผลกระทบต่อชั้นอื่น',
          'สร้างภาษากลางในการอธิบายฟังก์ชันเครือข่าย',
        ],
      },
      {
        heading: '2. TCP/IP Model (4 Layers)',
        points: [
          'Application: ข้อมูลผู้ใช้, การเข้ารหัส (เทียบเท่า 3 ชั้นบนของ OSI)',
          'Transport: การสื่อสารระหว่างอุปกรณ์ (TCP, UDP)',
          'Internet: การหาเส้นทางที่ดีที่สุด (IP)',
          'Network Access: ควบคุมฮาร์ดแวร์และสื่อนำสัญญาณ',
        ],
      },
      {
        heading: '3. OSI Model (7 Layers)',
        points: [
          'Layer 7 - Application: การสื่อสาร process-to-process',
          'Layer 6 - Presentation: รูปแบบข้อมูล (Representation)',
          'Layer 5 - Session: การจัดการการแลกเปลี่ยนข้อมูล',
          'Layer 4 - Transport: การแบ่งส่วนข้อมูล (Segmentation)',
          'Layer 3 - Network: การ Routing ข้ามเครือข่าย',
          'Layer 2 - Data Link: การแลกเปลี่ยนเฟรมบนสื่อ',
          'Layer 1 - Physical: การส่งสัญญาณทางไฟฟ้า/แสง (Bits)',
        ],
      },
      {
        heading: '4. ข้อแตกต่างสำคัญ',
        points: [
          'OSI แยก Layer ล่างสุดเป็น Data Link และ Physical / TCP/IP รวมเป็น Network Access',
          'OSI แยก Layer บนเป็น Application, Presentation, Session / TCP/IP รวมเป็น Application',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Module 4: Physical Layer',
    subtitle: 'สื่อนำสัญญาณและ Bandwidth',
    content: [
      {
        heading: '1. สายสัญญาณ (Cabling)',
        points: [
          'UTP (Unshielded Twisted Pair): สายทองแดงเกลียวคู่ ไม่มีฉนวนหุ้ม ราคาถูก ติดตั้งง่าย นิยมใช้มากที่สุด',
          'UTP ป้องกัน Crosstalk ด้วยการบิดเกลียวสาย (Twisting)',
          'STP (Shielded Twisted Pair): มีฟอยล์หุ้มป้องกัน EMI/RFI ได้ดีกว่า แต่แพงและติดตั้งยากกว่า',
          'Fiber Optic: ทำจากแก้ว ใช้แสงส่งข้อมูล ส่งได้ไกล Bandwidth สูง ป้องกัน EMI/RFI ได้สมบูรณ์',
        ],
      },
      {
        heading: '2. สัญญาณรบกวน',
        points: [
          'EMI/RFI: การรบกวนจากคลื่นแม่เหล็กไฟฟ้า (จากมอเตอร์หรือคลื่นวิทยุ)',
          'Crosstalk: สัญญาณรบกวนข้ามคู่สาย',
          'แก้ไข: ใช้ STP กัน EMI, ใช้ Fiber Optic ตัดปัญหา EMI, การบิดเกลียวช่วยลด Crosstalk',
        ],
      },
      {
        heading: '3. Bandwidth, Throughput, Goodput',
        points: [
          'Bandwidth: ความจุสูงสุดที่สื่อสามารถนำส่งข้อมูลได้',
          'Throughput: ความเร็วที่วัดได้จริง (มักต่ำกว่า Bandwidth)',
          'Goodput: ข้อมูลที่ใช้งานได้จริง = Throughput - Traffic Overhead',
          'หน่วยวัด: bps, Kbps (10³), Mbps (10⁶), Gbps (10⁹)',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Module 5: Number Systems (IP Address & Subnetting)',
    subtitle: 'การคำนวณ Host และ Prefix',
    content: [
      {
        heading: '1. Binary & Decimal (ฐาน 2 และ ฐาน 10)',
        points: [
          'การแปลงเลขฐานสำคัญในการคำนวณ IP Address',
          'ค่าประจำหลัก (Positional Value): 128, 64, 32, 16, 8, 4, 2, 1',
        ],
      },
      {
        heading: '2. การคำนวณจำนวน Host และ Prefix',
        points: [
          'IP Address มี 32 bits แบ่งเป็นส่วน Network และส่วน Host',
          'สูตร: ถ้ามี h bits สำหรับ Host → จำนวน Host = 2^h - 2',
          'ลบ 2 เพราะต้องหัก Network Address และ Broadcast Address',
        ],
      },
      {
        heading: '3. ตัวอย่างการคำนวณ',
        points: [
          'โจทย์: ต้องการรองรับ 500 Hosts',
          'ต้องหา 2^h ที่มากกว่า 502 (500 + 2)',
          '2^8 = 256 (ไม่พอ)',
          '2^9 = 512 (พอดี)',
          'ดังนั้น Host bits = 9, Prefix = 32 - 9 = /23',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Module 7: Ethernet Switching',
    subtitle: 'Frame, MAC, IP และ Switch',
    content: [
      {
        heading: '1. โครงสร้าง Ethernet Frame',
        points: [
          'ฟิลด์สำคัญ: Destination MAC, Source MAC, Type/Length, Data, FCS',
          'FCS (Frame Check Sequence): ตรวจสอบความถูกต้องของข้อมูล',
          'ขนาดเฟรม: ต่ำสุด 64 bytes, สูงสุด 1518 bytes',
        ],
      },
      {
        heading: '2. IP Address vs MAC Address',
        points: [
          'MAC Address (Layer 2): สื่อสารทางกายภาพระหว่างอุปกรณ์ในเครือข่ายเดียวกัน',
          'IP Address (Layer 3): ระบุเส้นทางทางตรรกะ End-to-End ข้ามเครือข่าย',
          'เมื่อส่งข้อมูลข้ามเครือข่าย: IP Address คงเดิม แต่ MAC Address เปลี่ยนในแต่ละ Hop',
        ],
      },
      {
        heading: '3. หลักการทำงานของ Switch (Layer 2)',
        points: [
          'Learning: ดู Source MAC เพื่อบันทึกลง MAC Address Table คู่กับ Port',
          'Forwarding: ดู Destination MAC เพื่อตัดสินใจส่งออก',
          'ถ้ามีในตาราง: ส่งออกเฉพาะ Port นั้น (Unicast)',
          'ถ้าไม่มีในตาราง (Unknown Unicast): Flood ออกทุก Port ยกเว้น Port ต้นทาง',
        ],
      },
    ],
  },
];

export const reviewContentText = `
สรุปเตรียมสอบกลางภาค (วิชา MIT-704)

Module 1: Networking Today
- ประเภทการเชื่อมต่ออินเทอร์เน็ต: DSL, Cable, Cellular, Satellite, Dial-up, Fiber Optic
- SOHO (Small Office/Home Office): เครือข่ายขนาดเล็ก
- ISP เชื่อมต่อผู้ใช้เข้าสู่อินเทอร์เน็ต

Module 3: Protocols and Models
- TCP/IP Model มี 4 Layers: Application, Transport, Internet, Network Access
- OSI Model มี 7 Layers: Application, Presentation, Session, Transport, Network, Data Link, Physical
- OSI แยกละเอียดกว่า TCP/IP

Module 4: Physical Layer
- UTP: สายทองแดงเกลียวคู่ ราคาถูก นิยมใช้มาก
- STP: มีฟอยล์หุ้มป้องกัน EMI
- Fiber Optic: ใช้แสง ส่งได้ไกล ป้องกัน EMI ได้สมบูรณ์
- Bandwidth = ความจุสูงสุด, Throughput = ความเร็วจริง, Goodput = ข้อมูลที่ใช้ได้จริง

Module 5: Number Systems (IP Address & Subnetting)
- IP Address มี 32 bits แบ่งเป็น Network และ Host
- จำนวน Host = 2^h - 2 (h = host bits)
- ตัวอย่าง: ต้องการ 500 hosts → ใช้ 9 host bits → Prefix /23

Module 7: Ethernet Switching
- Ethernet Frame: Destination MAC, Source MAC, Type, Data, FCS
- MAC Address (Layer 2) ใช้ในเครือข่ายเดียวกัน, IP Address (Layer 3) ใช้ข้ามเครือข่าย
- Switch Learning: บันทึก Source MAC ลงตาราง
- Switch Forwarding: ส่งตาม Destination MAC หรือ Flood ถ้าไม่รู้จัก
`;
