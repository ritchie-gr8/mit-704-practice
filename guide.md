---

### 🔹 Module 1: Networking Today (เจาะลึกการเชื่อมต่อ)

ถ้าโจทย์ให้สถานการณ์มา คุณต้องเปรียบเทียบเชิงเทคนิคได้ชัดเจนขึ้นครับ:

1.  **เปรียบเทียบเทคโนโลยีการเชื่อมต่อ (Internet Connections):**
    *   **Cable:** ใช้สาย Coaxial (สายทีวี) ให้ bandwidth สูง เป็นแบบ always-on แต่มักจะเป็นการแชร์ bandwidth กันในละแวกบ้าน (Shared bandwidth)
    *   **DSL (Digital Subscriber Line):** ใช้สายโทรศัพท์ copper คู่เดิมที่มีอยู่ วิ่งบนความถี่คนละย่านกับเสียงโทรศัพท์ เป็นแบบ always-on เช่นกัน แต่ความเร็วอาจลดลงตามระยะทางจากชุมสาย
    *   **Cellular:** ใช้เครือข่ายมือถือ เหมาะกับผู้ที่ต้องเคลื่อนที่ (Mobility) แต่อาจมีข้อจำกัดเรื่องความครอบคลุมของสัญญาณและ Performance ที่แกว่งได้ง่ายกว่าแบบสาย
    *   **Satellite:** เหมาะสำหรับพื้นที่ห่างไกลที่สายเข้าไม่ถึง (Rural areas) แต่มีข้อเสียเรื่อง **Latency (ความหน่วง)** สูง เพราะต้องส่งสัญญาณขึ้น-ลงอวกาศ
    *   **Fiber Optic:** (มักอยู่ในกลุ่ม Business หรือเน็ตบ้านสมัยใหม่) เป็น Backbone ของเครือข่าย ให้ bandwidth สูงที่สุด และส่งได้ระยะไกล

2.  **สำหรับธุรกิจ (Business Class):**
    *   หากเป็นสำนักงาน ควรเลือก **Metro Ethernet** หรือ **Dedicated Leased Line** เพราะเป็นวงจรเช่าส่วนตัว (Reserved circuits) ไม่แชร์กับใคร มีความเสถียรสูงกว่าเน็ตบ้าน

3.  **บทบาทของ ISP (Internet Service Provider):**
    *   **ISP คืออะไร:** ผู้ให้บริการอินเทอร์เน็ต เป็นตัวกลางเชื่อมต่อเครือข่ายภายในบ้าน/องค์กร เข้าสู่อินเทอร์เน็ตสาธารณะ
    *   **หน้าที่หลักของ ISP:**
        *   ให้บริการ IP Address (Public IP)
        *   ให้บริการ DNS Server
        *   เชื่อมต่อไปยัง ISP อื่นๆ และ Internet Backbone
        *   ให้บริการ Email, Web Hosting (บาง ISP)
    *   **ถ้าไม่มี ISP:** เครือข่ายภายในจะไม่สามารถเชื่อมต่อออกสู่อินเทอร์เน็ตได้ เพราะไม่มีทางออก (Gateway) ไปยังเครือข่ายภายนอก

---

### 🔹 Module 3: Protocols and Models (เจาะลึกโครงสร้าง)

ทำไมต้องแยก Layer? และแต่ละ Layer ทำอะไร? (ใช้ตอบข้อ 2):

1.  **ประโยชน์ของการแบ่ง Layer (Layered Model Benefits):**
    *   **Protocol Design:** ช่วยให้ออกแบบโปรโตคอลได้ง่ายขึ้น เพราะแต่ละชั้นมีหน้าที่เฉพาะเจาะจง
    *   **Competition & Interoperability:** กระตุ้นให้เกิดการแข่งขัน ผลิตภัณฑ์ต่างยี่ห้อทำงานร่วมกันได้ (เช่น การ์ดแลนยี่ห้อ A คุยกับ Router ยี่ห้อ B ได้)
    *   **Independence:** การเปลี่ยนแปลงเทคโนโลยีในชั้นหนึ่ง (เช่น เปลี่ยนสายแลนเป็นไร้สายที่ Physical Layer) ไม่กระทบกับชั้นอื่น (เช่น Web Browser ที่ Application Layer ยังทำงานได้เหมือนเดิม)

2.  **OSI Model (7 Layers):**

    | Layer | ชื่อ | หน้าที่หลัก | ตัวอย่าง Protocol/อุปกรณ์ |
    |-------|------|-------------|---------------------------|
    | 7 | **Application** | Interface กับผู้ใช้/แอป | HTTP, FTP, SMTP, DNS |
    | 6 | **Presentation** | แปลงรูปแบบข้อมูล, เข้ารหัส | SSL/TLS, JPEG, ASCII |
    | 5 | **Session** | จัดการ Session การสื่อสาร | NetBIOS, RPC |
    | 4 | **Transport** | End-to-end delivery, Error recovery | TCP, UDP |
    | 3 | **Network** | Logical addressing, Routing | IP, ICMP, Router |
    | 2 | **Data Link** | Physical addressing, Frame | Ethernet, MAC, Switch |
    | 1 | **Physical** | สัญญาณไฟฟ้า/แสง, สายสัญญาณ | Hub, Cable, NIC |

    **วิธีจำ (บนลงล่าง):** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing

3.  **TCP/IP Model (4 Layers):**

    | Layer | ชื่อ | เทียบเท่า OSI | หน้าที่หลัก |
    |-------|------|---------------|-------------|
    | 4 | **Application** | OSI 5-6-7 | รวม Session, Presentation, Application |
    | 3 | **Transport** | OSI 4 | TCP/UDP - การส่งข้อมูลแบบ Reliable/Unreliable |
    | 2 | **Internet** | OSI 3 | IP Addressing, Routing |
    | 1 | **Network Access** | OSI 1-2 | รวม Physical และ Data Link |

4.  **เทียบ TCP/IP vs OSI แบบละเอียด:**
    *   **OSI Layer 1-2 (Physical & Data Link) = TCP/IP Network Access:** OSI แยกละเอียดเพื่อระบุขั้นตอนการเข้าถึงสื่อ (Media Access) และการแปลงสัญญาณกายภาพ (Physical)
    *   **OSI Layer 5-7 (Session, Presentation, Application) = TCP/IP Application:** TCP/IP รวบยอดหน้าที่การจัดการ Session, การเข้ารหัสข้อมูล (Presentation), และ Interface กับผู้ใช้ (Application) ไว้ในชั้นเดียวเพื่อให้กระชับ

---

### 🔹 Module 4: Physical Layer (เจาะลึกฮาร์ดแวร์และศัพท์เทคนิค)

ใช้ตอบข้อ 3 เรื่องสัญญาณรบกวนและสมรรถนะ:

1.  **รายละเอียดสายสัญญาณ:**
    *   **UTP (Unshielded Twisted Pair):** ใช้หลักการ **Cancellation** โดยการตีเกลียวคู่สาย (Twisting) เพื่อให้สนามแม่เหล็กหักล้างกันเอง ช่วยลด Crosstalk (สัญญาณกวนข้ามคู่สาย) แต่ไม่มีฉนวนกัน EMI ภายนอก
    *   **STP (Shielded Twisted Pair):** เพิ่ม **Metal Shield/Foil** หุ้มสายเพื่อป้องกัน EMI/RFI จากภายนอก (เช่น คลื่นวิทยุ, มอเตอร์ไฟ) เหมาะกับโรงงานหรือที่ที่มีคลื่นรบกวนสูง
    *   **Fiber Optic:** ใช้แสงแทนไฟฟ้า จึง **Immune (มีภูมิคุ้มกัน)** ต่อ EMI/RFI อย่างสมบูรณ์ 100% เหมาะกับระยะทางไกล (Long distance) และ Bandwidth สูงมาก
        *   *Single-mode:* แกนเล็ก ใช้เลเซอร์ ส่งไกลมาก
        *   *Multimode:* แกนใหญ่กว่า ใช้ LED ราคาถูกกว่า ส่งระยะสั้นกว่า

2.  **ศัพท์เรื่องความเร็ว (ต้องแม่นนิยาม):**
    *   **Bandwidth:** ความจุสูงสุดทางทฤษฎีของสื่อ
    *   **Throughput:** อัตราการส่งข้อมูล "จริง" ณ เวลานั้น (มักน้อยกว่า Bandwidth เพราะมีคอขวดหรือ Latency)
    *   **Goodput:** ข้อมูลที่ใช้ได้จริง (Usable Data) = Throughput ลบด้วย Traffic Overhead (เช่น Header ของโปรโตคอลต่างๆ การส่งซ้ำ)

3.  **หน่วยวัด Bandwidth:**

    | หน่วย | ค่า | ตัวอย่างการใช้งาน |
    |-------|-----|-------------------|
    | **bps** (bits per second) | 1 bit/s | หน่วยพื้นฐาน |
    | **Kbps** (Kilobits per second) | 1,000 bps | Dial-up modem |
    | **Mbps** (Megabits per second) | 1,000,000 bps | เน็ตบ้านทั่วไป (100 Mbps) |
    | **Gbps** (Gigabits per second) | 1,000,000,000 bps | Fiber, Data Center |

    **หมายเหตุ:**
    *   **b** ตัวเล็ก = bits (ใช้วัด Bandwidth)
    *   **B** ตัวใหญ่ = Bytes (ใช้วัดขนาดไฟล์)
    *   **1 Byte = 8 bits** (ดังนั้น 100 Mbps = 12.5 MB/s)

---

### 🔹 Module 5: Number Systems (เจาะลึกวิธีคิดคำนวณ)

ใช้เตรียมสอบข้อ 4 (คำนวณ Host):

1.  **หลักการ Binary Positional Notation:** การคำนวณคอมพิวเตอร์ดูจากค่าประจำหลัก $128, 64, 32, 16, 8, 4, 2, 1$

2.  **CIDR Notation และ Subnet Mask:**

    | Prefix | Subnet Mask | จำนวน Host (2^n - 2) |
    |--------|-------------|----------------------|
    | /24 | 255.255.255.0 | 254 |
    | /25 | 255.255.255.128 | 126 |
    | /26 | 255.255.255.192 | 62 |
    | /27 | 255.255.255.224 | 30 |
    | /28 | 255.255.255.240 | 14 |
    | /23 | 255.255.254.0 | 510 |
    | /22 | 255.255.252.0 | 1022 |

3.  **Logic การหา Prefix:**
    *   ถ้าโจทย์ต้องการ 500 Hosts คุณต้องหา $2^n$ ที่ครอบคลุม
    *   $2^8 = 256$ (ไม่พอ)
    *   $2^9 = 512$ (พอดี และเหลือใช้จริง $512 - 2 = 510$ เครื่อง)
    *   ดังนั้น ต้องใช้ Host bits = 9 bits
    *   Network bits (Prefix) จะเหลือ = $32 - 9 = /23$

4.  **ทำไมต้อง -2?**:
    1.  **Network Address:** เบอร์แรกของวง (Host เป็น 0 หมด) เอาไว้เรียกชื่อเครือข่าย
    2.  **Broadcast Address:** เบอร์สุดท้ายของวง (Host เป็น 1 หมด) เอาไว้ส่งข้อมูลหาทุกเครื่องพร้อมกัน

---

### 🔹 Module 7: Ethernet Switching (เจาะลึกกระบวนการ Switch)

ใช้ตอบข้อ 5 (การทำงานของ Switch และ MAC/IP):

1.  **โครงสร้าง Ethernet Frame (ต้องจำ):**

    | Field | ขนาด | หน้าที่ |
    |-------|------|---------|
    | **Preamble** | 7 bytes | Synchronization - บอกให้อุปกรณ์เตรียมรับข้อมูล |
    | **SFD** (Start Frame Delimiter) | 1 byte | บอกจุดเริ่มต้นของ Frame |
    | **Destination MAC** | 6 bytes | MAC Address ปลายทาง |
    | **Source MAC** | 6 bytes | MAC Address ต้นทาง |
    | **Type/Length** | 2 bytes | ระบุ Protocol ชั้นบน (เช่น 0x0800 = IPv4) |
    | **Data** | 46-1500 bytes | ข้อมูลจริง (Payload) |
    | **FCS** (Frame Check Sequence) | 4 bytes | ตรวจสอบความถูกต้อง (CRC) |

    **ขนาด Frame:** Min 64 bytes, Max 1518 bytes (ไม่รวม Preamble/SFD)

2.  **กระบวนการตัดสินใจของ Switch (Forwarding Decision):**
    *   **Step 1 Learn (เรียนรู้):** Switch ดูที่ **Source MAC** ของเฟรมที่วิ่งเข้ามา ถ้ายังไม่มีในตาราง (MAC Address Table) จะบันทึก MAC คู่กับ Port นั้น ถ้ามีแล้วจะอัปเดต Timer (ปกติเก็บ 5 นาที)
    *   **Step 2 Forward (ส่งต่อ):** Switch ดูที่ **Destination MAC**
        *   ถ้าเจอในตาราง: ส่งออกเฉพาะ Port ปลายทาง (**Unicast**)
        *   ถ้าไม่เจอในตาราง (Unknown Unicast): ส่งออกทุก Port ยกเว้น Port ที่รับเข้ามา (**Flooding**)
        *   ถ้าเป็น Broadcast (FF-FF-FF-FF-FF-FF): ส่งออกทุก Port เช่นกัน

3.  **เปรียบเทียบ IP vs MAC ในการเดินทางของข้อมูล:**
    *   **IP Address (Layer 3):** เปรียบเหมือน "ที่อยู่ไปรษณีย์ปลายทาง" (End-to-End) จะ **ไม่เปลี่ยนแปลง** ตั้งแต่ต้นทางยันปลายทาง (ยกเว้นโดน NAT)
    *   **MAC Address (Layer 2):** เปรียบเหมือน "ตั๋วเดินทางทีละต่อ" (Hop-to-Hop) จะ **เปลี่ยนแปลง** ทุกครั้งที่ผ่าน Router ข้ามไปยังเครือข่ายใหม่
        *   *Source MAC:* จะเป็นของอุปกรณ์ที่ส่งออกจาก Link นั้น
        *   *Dest MAC:* จะเป็นของอุปกรณ์ตัวถัดไปใน Link นั้น (เช่น Router ขาเข้า)

4.  **ทำไม IP และ MAC ต้องอยู่ในเฟรมเดียวกัน?**
    *   **MAC Address:** ใช้สำหรับการส่งข้อมูลภายใน Local Network (Layer 2) - Switch ใช้ MAC ในการ Forward
    *   **IP Address:** ใช้สำหรับการ Routing ข้าม Network (Layer 3) - Router ใช้ IP ในการตัดสินใจเส้นทาง
    *   ทั้งสองทำงานร่วมกัน: MAC พาข้อมูลไปถึง Router, Router ดู IP แล้วเปลี่ยน MAC ใหม่ส่งต่อไป

5.  **วิธีการส่งต่อเฟรม (Forwarding Methods) (เผื่อออกสอบ):**
    *   **Store-and-forward:** รับเฟรมมาครบทั้งก้อน ตรวจสอบความถูกต้อง (FCS/CRC) ก่อนส่งต่อ (ช้ากว่าแต่ชัวร์ ไม่มี Error)
    *   **Cut-through:** อ่านแค่ Destination MAC แล้วส่งต่อเลย (เร็วกว่า Latency ต่ำ แต่ไม่มีการเช็ค Error)

---

### 🔹 สรุป Quick Reference

**OSI 7 Layers (บนลงล่าง):** Application > Presentation > Session > Transport > Network > Data Link > Physical

**TCP/IP 4 Layers (บนลงล่าง):** Application > Transport > Internet > Network Access

**Bandwidth Units:** 1 Gbps = 1,000 Mbps = 1,000,000 Kbps = 1,000,000,000 bps

**Host Calculation:** จำนวน Host = $2^{(32-prefix)} - 2$

ข้อมูลเหล่านี้จะช่วยให้คุณเขียนคำตอบได้ลึกซึ้ง มี keyword สำคัญ และตรงตามหลักการที่อาจารย์ต้องการครับ
