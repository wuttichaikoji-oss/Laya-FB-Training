Laya F&B Academy - Employee Code Login + Team Knowledge

ไฟล์นี้ฝังค่า Firebase ของโปรเจกต์ laya-training ไว้แล้ว
จึงสามารถเปิดใช้งานได้ทันทีหลังจากเปิดใช้บริการต่อไปนี้ใน Firebase Console:

1) Authentication > Sign-in method > เปิด Email/Password
2) Firestore Database > Create database
3) แนะนำให้ตั้ง Rules ตามนี้

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return signedIn() && request.auth.uid == userId;
    }

    match /users/{userId} {
      allow read, write: if isOwner(userId);
      match /{document=**} {
        allow read, write: if isOwner(userId);
      }
    }

    // คลังบทเรียนที่ทุกคนในทีมช่วยกันเพิ่มได้
    match /community_lessons/{lessonId} {
      allow read: if signedIn();
      allow create: if signedIn()
        && request.resource.data.ownerUid == request.auth.uid;
      allow update, delete: if signedIn()
        && resource.data.ownerUid == request.auth.uid;
    }
  }
}

ระบบจะบันทึกข้อมูลต่อบัญชีพนักงาน เช่น
- บทที่อ่านจบ
- รายการโปรด
- โน้ตส่วนตัว
- โปรไฟล์เบื้องต้น

และในเวอร์ชันนี้
- ทุกคนที่ล็อกอินแล้วกด “+ เพิ่มบทเรียน” ได้
- บทเรียนที่สร้างจะขึ้นในคลังความรู้ของทีม
- เจ้าของบทเรียนแก้ไขและลบบทเรียนของตัวเองได้

ถ้ายังไม่พร้อมใช้ Firebase สามารถกด Local Demo ได้

ล็อกอินเวอร์ชันนี้ใช้ “รหัสพนักงาน + รหัสผ่าน”
โดยแอปจะสร้างอีเมลภายในระบบให้อัตโนมัติบน Firebase Authentication เช่น
FB001 -> emp.fb001@laya-training.local


Quiz Mode
- พนักงานที่ล็อกอินสามารถกดปุ่ม Quiz เพื่อสุ่มคำถาม 5 / 10 / 15 ข้อ
- คะแนนและประวัติล่าสุดจะบันทึกไว้ใน users/{uid}.quizHistory และ quizSummary


==============================
v3.1 Generate Quiz from Team Knowledge – Smart Analysis Edition
==============================
สิ่งที่เพิ่ม:
- Quiz เลือกแหล่งคำถามได้ 3 แบบ
  1) คลังข้อสอบหลัก
  2) สร้างจากบทเรียนทีม
  3) Smart Mix ทุกความรู้ (บทเรียนหลัก + ทีม + English + Wine)
- เมื่อทำแบบทดสอบเสร็จ จะบันทึกผลลง collection quiz_attempts
- มี admin.html สำหรับดูสรุปจุดแข็ง/จุดพัฒนารายคนจากผลสอบ

Firestore Rules ที่ต้องมีเพิ่ม:
match /quiz_attempts/{attemptId} {
  allow read: if isSupervisorOrAdmin()
    || (signedIn() && resource.data.userUid == request.auth.uid);
  allow create: if signedIn()
    && request.resource.data.userUid == request.auth.uid;
  allow update: if isSupervisorOrAdmin()
    || (signedIn() && resource.data.userUid == request.auth.uid);
  allow delete: if isSupervisorOrAdmin();
}


Quiz Bank Importer:
- เปิดไฟล์ quiz-importer.html
- ล็อกอินด้วยบัญชี admin/supervisor
- เลือกไฟล์ laya_quiz_bank_300.json
- กดตรวจไฟล์ แล้วกดเริ่ม Import


Quiz update:
- ถ้ามี collection quiz_bank ใน Firebase ระบบจะใช้คำถามจาก Firebase ก่อน
- รองรับการเลือกข้อสอบ 10 / 20 / 30 / 50 ข้อ
- ระบบจะสุ่มตัวเลือกใหม่ทุกครั้ง เพื่อไม่ให้คำตอบถูกล็อกอยู่ข้อ A
