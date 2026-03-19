Laya F&B Academy - Firebase Edition

สิ่งที่ต้องทำก่อนใช้งานจริง
1) สร้าง Firebase Project
2) เปิด Authentication > Sign-in method > Email/Password
3) สร้าง Firestore Database
4) เปิดไฟล์ index.html หรืออัปขึ้น GitHub Pages
5) กดปุ่ม "ตั้งค่า Firebase" แล้ววางค่า config JSON ของโปรเจกต์
6) สมัครผู้ใช้พนักงานแต่ละคนด้วย email/password

โครงสร้างข้อมูล
- users/{uid}
  - email
  - profile
  - progress
  - updatedAt

Firestore Rules ตัวอย่าง
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
