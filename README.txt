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
