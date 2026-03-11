# 📘 MIT-704 Information Technology Infrastructure

## Final Exam Study Notes

---

# Module 11–12: IPv4 vs IPv6 Addressing

## 1. ปัญหาของ IPv4

IPv4 ใช้ **Address ขนาด 32-bit** ทำให้มีจำนวน IP Address ประมาณ

```
≈ 4.3 billion addresses
```

ปัจจุบันจำนวนอุปกรณ์บนอินเทอร์เน็ตเพิ่มขึ้นอย่างรวดเร็ว เช่น

- คอมพิวเตอร์

- สมาร์ตโฟน

- IoT devices

- IP cameras

- Smart home devices


จึงทำให้เกิดปัญหา **IPv4 address exhaustion** (IP ไม่พอใช้)

องค์กรจึงต้องใช้เทคนิคอย่าง **NAT** เพื่อประหยัด Public IP

---

## 2. IPv6 แก้ปัญหาอย่างไร

IPv6 ใช้ **Address ขนาด 128-bit**

ทำให้มีจำนวน Address มหาศาล

ข้อดีของ IPv6 เช่น

- address space ใหญ่มาก

- ไม่จำเป็นต้องใช้ NAT

- header structure ง่ายกว่า

- รองรับ mobile และ IoT ได้ดี

- รองรับ auto configuration (SLAAC)


---

## 3. รูปแบบ Address

IPv4

```
32-bit
เขียนแบบ Decimal
เช่น 192.168.1.10
```

IPv6

```
128-bit
เขียนแบบ Hexadecimal
เช่น 2001:0db8:85a3::8a2e:0370:7334
```

---

## 4. NAT (Network Address Translation)

NAT ใช้แปล

```
Private IPv4 → Public IPv4
```

มักตั้งอยู่ที่ **Edge Router**

ตัวอย่าง

```
192.168.1.10 → 203.0.113.5
```

ประโยชน์

- ประหยัด Public IP

- ซ่อนโครงสร้างเครือข่ายภายใน


---

## 5. การเปลี่ยนผ่านจาก IPv4 ไป IPv6

การเปลี่ยนผ่านต้องใช้เวลา จึงมีเทคนิคให้สองระบบทำงานร่วมกัน

### Dual Stack

อุปกรณ์รองรับทั้ง

```
IPv4 + IPv6
```

พร้อมกัน

---

### Tunneling

ห่อหุ้ม packet IPv6

```
IPv6 inside IPv4
```

เพื่อส่งผ่านเครือข่าย IPv4

---

### Translation (NAT64)

แปล Address ระหว่าง

```
IPv6 ↔ IPv4
```

เพื่อให้สองระบบสื่อสารกันได้

---

# Module 13: ICMP (Internet Control Message Protocol)

ICMP เป็นโปรโตคอลที่ใช้สำหรับ

```
diagnostic และ error reporting
```

ตัวอย่างการใช้งาน

```
ping
traceroute
```

---

## การทำงานของ Ping

Ping ใช้

```
ICMP Echo Request
ICMP Echo Reply
```

เพื่อตรวจสอบว่า host ปลายทาง reachable หรือไม่

---

## การสื่อสารข้าม Subnet

ถ้าเครื่องอยู่ **คนละ subnet**

เครื่องจะไม่สามารถส่ง packet ตรงไปยังปลายทางได้

packet ต้องถูกส่งไปยัง

```
Default Gateway
```

ก่อน

จากนั้น Router จะใช้ **Routing Table** เพื่อส่ง packet ไปยัง network ปลายทาง

---

## ขั้นตอน Troubleshooting เมื่อ Ping ไม่ได้

### 1. Ping Loopback

```
ping 127.0.0.1
```

ตรวจสอบว่า TCP/IP stack ในเครื่องทำงานปกติ

---

### 2. Ping Default Gateway

ตรวจสอบว่า

- Local network ทำงานปกติ

- Router interface ฝั่งเรา reachable


---

### 3. Ping Remote Host

ถ้า

```
ping gateway ได้
แต่ ping ปลายทางไม่ได้
```

อาจเกิดจาก

- firewall block ICMP

- routing problem

- host ปลายทาง offline


---

### 4. ใช้ Traceroute

```
tracert
```

เพื่อดูว่า packet หายที่ router หรือ hop ใด

---

# Module 14: Transport Layer

Transport Layer มีหน้าที่หลักคือ

- Segmentation

- Multiplexing

- Flow Control

- Error Recovery


---

## Segmentation

การแบ่งข้อมูลขนาดใหญ่เป็นส่วนเล็ก ๆ

```
data → segments
```

เพื่อให้ส่งผ่านเครือข่ายได้ง่าย

---

## Multiplexing

ทำให้หลาย application ใช้เครือข่ายพร้อมกันได้

โดยใช้

```
Port numbers
```

ตัวอย่าง

|Application|Port|
|---|---|
|HTTP|80|
|HTTPS|443|
|DNS|53|
|SMTP|25|

---

## TCP vs UDP

### TCP

คุณสมบัติ

- reliable

- acknowledgement

- retransmission

- flow control


ตัวอย่างการใช้งาน

```
HTTP
HTTPS
Email
File transfer
```

---

### UDP

คุณสมบัติ

- fast

- best-effort

- ไม่มี retransmission


ใช้กับ

```
video call
voice call
streaming
gaming
```

---

## ทำไม Video Call กระตุก แต่ Web ยังเปิดได้

Video call ใช้ **UDP**

เมื่อเกิด

- network congestion

- packet loss

- latency


packet ที่หายจะไม่ถูกส่งใหม่

จึงเกิด

```
video lag / jitter
```

---

Web ใช้ **TCP**

TCP มี

- acknowledgement

- retransmission

- flow control


จึงสามารถโหลดต่อได้แม้จะช้าลง

---

## การแก้ปัญหา

ใช้

```
Quality of Service (QoS)
```

เพื่อให้

```
real-time traffic
(video / voice)
```

มี priority สูงกว่า

---

# Module 16: Network Security Fundamentals

แนวคิดสำคัญคือ

```
Defense in Depth
```

ใช้หลายระบบร่วมกันเพื่อป้องกันเครือข่าย

---

## อุปกรณ์ความปลอดภัย

### VPN

ใช้สร้าง

```
secure remote connection
```

ระหว่างผู้ใช้กับองค์กร

---

### Firewall

ทำหน้าที่

```
allow / deny traffic
```

และใช้

```
stateful packet inspection
```

เพื่อตรวจสอบ connection

---

### IPS (Intrusion Prevention System)

ตรวจจับและป้องกัน

```
network attacks
```

แบบ real-time

---

### AAA Server

ประกอบด้วย

```
Authentication
Authorization
Accounting
```

ใช้ควบคุมการเข้าถึงระบบ

---

## Network Segmentation

คือการแบ่งเครือข่ายเป็นส่วน ๆ เช่น

```
VLAN
```

ตัวอย่าง

- student network

- staff network

- server network


ประโยชน์

- ลดการแพร่กระจายของ attack

- จำกัดการเข้าถึงระบบสำคัญ


---

## วิเคราะห์ทราฟฟิกผิดปกติ

### ผู้ใช้งานปกติ

ลักษณะ

- traffic กระจายตัว

- usage ตามช่วงเวลา


---

### การโจมตี (DoS / DDoS)

ลักษณะ

- traffic สูงผิดปกติ

- requests จำนวนมาก

- response time สูง


มักเกิดจาก

```
botnet / compromised hosts
```

การตรวจสอบใช้

```
network baseline
```

เพื่อเปรียบเทียบกับการใช้งานปกติ

---

# Module 17: Build a Small Network

## Redundancy

การออกแบบเครือข่ายให้มี

```
backup components
```

เพื่อป้องกัน

```
single point of failure
```

---

## ประเภท Redundancy

### Server redundancy

มี server สำรอง

---

### Link redundancy

มี network link สำรอง

---

### Switch redundancy

มี switch สำรอง

---

### Router redundancy

มี router backup

---

## Failover

เมื่ออุปกรณ์หลักล้มเหลว

ระบบจะ

```
switch ไปใช้ backup system
```

โดยอัตโนมัติ

---

## วิเคราะห์ปัญหาเมื่อระบบล่ม

หาก

```
router หลักล่ม
```

แต่บางบริการยังใช้งานได้

อาจเป็นเพราะ

- failover ทำงาน

- backup route ถูกใช้


---

หากผู้ใช้บางกลุ่มยังใช้งานไม่ได้

อาจเกิดจาก

- routing update ไม่สมบูรณ์

- spanning tree ยัง converge

- bandwidth ของ backup link ต่ำ

- configuration mismatch


---

# LAB: Network Commands

## ping

ใช้ทดสอบการเชื่อมต่อ

```
Layer 3 connectivity
```

ระหว่าง

```
source → destination
```

---

## arp -a

ใช้ดู

```
ARP cache
```

แสดงการจับคู่ระหว่าง

```
IP address ↔ MAC address
```

ของอุปกรณ์ที่สื่อสารล่าสุด

---

# Wireless & Cybersecurity Threats (LAB)

## Fake AP / Evil Twin

Access point ปลอมที่เลียนแบบ Wi-Fi จริง

เพื่อ

```
ดักข้อมูลผู้ใช้
```

---

## DNS Spoofing

การโจมตีที่ทำให้

```
domain name → ชี้ไปยัง server ปลอม
```

เช่น

```
bank.com → attacker server
```

---

## วิธีป้องกัน

- ใช้ VPN

- ใช้ HTTPS

- ไม่เชื่อมต่อ Wi-Fi ที่ไม่น่าเชื่อถือ

- ตรวจสอบ certificate


---

# เทคนิคการตอบข้อสอบ (สำคัญมาก)

ข้อสอบเน้น

```
analysis + troubleshooting
```

ตัวอย่างการตอบ

ถ้า

```
เครื่อง A ping B ไม่ได้
```

ควรวิเคราะห์เป็นขั้นตอน

1 ตรวจสอบ IP address
2 ตรวจสอบ subnet mask
3 ตรวจสอบ default gateway
4 ตรวจสอบ router interface
5 ตรวจสอบ routing table
6 ตรวจสอบ firewall

---
