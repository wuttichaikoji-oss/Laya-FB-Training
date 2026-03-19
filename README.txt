Laya F&B Academy v3.0 Lite - Firebase Ready

ไฟล์นี้ฝังค่า Firebase ของโปรเจกต์ laya-training ไว้แล้ว
จึงสามารถเปิดใช้งานได้ทันทีหลังจากเปิดใช้บริการต่อไปนี้ใน Firebase Console:

1) Authentication > Sign-in method > เปิด Email/Password
2) Firestore Database > Create database
3) แนะนำให้ตั้ง Rules ตามนี้

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}

ระบบจะบันทึกข้อมูลต่อบัญชีพนักงาน เช่น
- บทที่อ่านจบ
- รายการโปรด
- โน้ตส่วนตัว
- โปรไฟล์เบื้องต้น

ถ้ายังไม่พร้อมใช้ Firebase สามารถกด Local Demo ได้
