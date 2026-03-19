# Laya F&B Academy — GitHub Ready + Team Knowledge

ไฟล์ชุดนี้เป็น static website สำหรับอัปขึ้น GitHub Pages ได้ทันที และเชื่อม Firebase ที่ฝังไว้แล้ว

## วิธีอัปขึ้น GitHub Pages
1. สร้าง repository ใหม่บน GitHub
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้นไปที่ root ของ repo
3. ไปที่ Settings > Pages
4. เลือก Deploy from a branch และเลือก branch หลัก / root
5. เปิดลิงก์ Pages ที่ GitHub สร้างให้

## Firebase ที่ฝังไว้แล้ว
- Project ID: `laya-training`
- Auth: Email/Password
- Firestore:
  - `users/{uid}` สำหรับเก็บ progress / favorite / note
  - `community_lessons/{lessonId}` สำหรับคลังความรู้ที่ผู้ใช้ในทีมช่วยกันเพิ่ม

## Firestore Rules ที่แนะนำ
ใช้กฎนี้เพื่อให้
- ผู้ใช้เห็นข้อมูลตัวเองใน `users/{uid}`
- ผู้ใช้ทุกคนที่ล็อกอินอ่าน `community_lessons` ได้
- ผู้ใช้แก้ไขหรือลบบทเรียนของตัวเองได้เท่านั้น

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /community_lessons/{lessonId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.resource.data.authorId == request.auth.uid;
      allow update, delete: if request.auth != null
        && resource.data.authorId == request.auth.uid;
    }
  }
}
```

## ถ้าล็อกอินบน GitHub Pages ไม่ได้
เพิ่มโดเมน GitHub Pages ของคุณใน Firebase Console:
Authentication > Settings > Authorized domains
ตัวอย่างเช่น `yourname.github.io`

## เนื้อหาในระบบ
- English: F&B (รวม 5 หมวด)
- Hygiene สำหรับร้านอาหาร
- Food Allergy สำหรับร้านอาหาร
- Temperature Control สำหรับร้านอาหาร
- Greeting Guest สำหรับพนักงานห้องอาหาร
- Wine Basic Service สำหรับพนักงานห้องอาหาร
- Team Knowledge: ผู้ใช้หลายคนช่วยกันเพิ่มบทเรียนได้

## วิธีใช้ฟีเจอร์เพิ่มบทเรียน
1. ล็อกอินด้วย Firebase
2. กดปุ่ม `+ เพิ่มบทเรียน`
3. ใส่ชื่อบทเรียน หมวดหมู่ สรุป และหัวข้อย่อย
4. ในแต่ละหัวข้อสามารถพิมพ์แบบอิสระได้ทั้งย่อหน้าและ bullet
5. วางลิงก์รูปภาพได้หลายรูป และลิงก์วิดีโอ YouTube/MP4 ได้หลายลิงก์ (1 บรรทัด = 1 ลิงก์)
6. กดบันทึก
7. บทเรียนจะขึ้นในคลังความรู้ของทีมให้ทุกคนที่ล็อกอินเห็น

## หมายเหตุ
- โหมด Demo จะบันทึกบทเรียนทีมไว้ในเครื่องนั้นเท่านั้น
- ถ้าต้องการให้แชร์กันได้จริง ให้ใช้การล็อกอิน Firebase

## สื่อที่รองรับในบทเรียนทีม
- รูปภาพผ่าน URL เช่น `https://.../image.jpg`
- วิดีโอ YouTube เช่น `https://youtu.be/...` หรือ `https://www.youtube.com/watch?v=...`
- วิดีโอ MP4 ผ่าน URL ตรง
- เวอร์ชันนี้ยังไม่อัปโหลดไฟล์รูปจากเครื่องขึ้น Firebase Storage อัตโนมัติ
