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
  - `wine_catalog/{wineId}` สำหรับเก็บรายการขวดไวน์อ้างอิงทั้งชุด
  - `wine_reference/{wineId}` สำหรับเก็บข้อมูลไวน์ที่ทีมช่วยกันเติม

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

    match /wine_catalog/{wineId} {
      allow read, write: if request.auth != null;
    }

    match /wine_reference/{wineId} {
      allow read, write: if request.auth != null;
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
- อัปโหลดรูปจากเครื่องขึ้น Firebase Storage
- อัปโหลดวิดีโอจากเครื่องขึ้น Firebase Storage
- มี preview รูปและวิดีโอก่อนบันทึก


## Firebase Storage ที่เพิ่มใน v3.0.6
เวอร์ชันนี้รองรับการอัปโหลดรูปจากเครื่องเข้าสู่ Firebase Storage แล้ว โดยจะเก็บไฟล์ไว้ใต้โฟลเดอร์:
- `team_lesson_uploads/{uid}/...`

### Storage Rules ที่แนะนำ
```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /team_lesson_uploads/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### วิธีใช้ Full Media Upload
1. ล็อกอินด้วยบัญชี Firebase
2. กด `+ เพิ่มบทเรียน`
3. ในหัวข้อย่อยแต่ละกล่อง สามารถ
   - อัปโหลดรูปจากเครื่อง
   - อัปโหลดวิดีโอจากเครื่อง
   - วางลิงก์ YouTube / MP4 / รูปภาพ
4. ระบบจะอัปโหลดไฟล์ขึ้น Firebase Storage และเติม URL ลงในช่องที่เกี่ยวข้องให้อัตโนมัติ
5. มี preview รูปและวิดีโอให้ดูก่อนกดบันทึก
6. กดบันทึกบทเรียนตามปกติ

> โหมด Demo จะเก็บไฟล์เป็น data URL ในเครื่องนั้นแทนเพื่อให้ทดลองใช้งานได้ทันที แต่ไฟล์วิดีโอขนาดใหญ่อาจทำให้เบราว์เซอร์หน่วงได้ ควรใช้ไฟล์สั้นหรือบีบอัดก่อน


## การแก้ไขข้อมูลไวน์
เวอร์ชันนี้มีปุ่ม **แก้ไขข้อมูลไวน์** ในหัวข้อ Wine Basic Service แล้ว
- ข้อมูลที่กรอกเพิ่มจะถูกบันทึกไว้ใน `wine_reference/{wineId}`
- ผู้ใช้ที่ล็อกอินทุกคนสามารถช่วยกันเติมข้อมูลไวน์ที่ยังไม่ครบได้
- ถ้าใช้ Demo Mode ระบบจะบันทึกข้อมูลเพิ่มไว้ในเครื่องนี้แทน


## Wine editor
- รูปขวดใช้จากคลังกลางของระบบและไม่ต้องแก้ลิงก์รูปในหน้าแก้ไข
- ปุ่ม `คืนค่าช่องที่กำลังแก้` จะโหลดค่าปัจจุบันกลับเข้าฟอร์ม
- ปุ่ม `ลบข้อมูลที่แก้เพิ่ม` จะลบ override ใน Firebase/Demo และกลับไปใช้ข้อมูลเดิมของระบบ


## Wine Reference ใน Firebase
- เมื่อผู้ใช้ล็อกอินแล้วและเปิดหัวข้อ Wine Basic Service ระบบจะพยายามเพิ่มรายการขวดทั้งหมดเข้า `wine_catalog` ให้อัตโนมัติถ้ายังไม่มี
- ถ้าต้องการกดเอง สามารถใช้ปุ่ม `เพิ่มรายการส่วนนี้เข้า Firebase` ในหน้า Wine Basic Service ได้
- ข้อมูลที่ทีมช่วยกันเติม เช่น คำอ่าน รสชาติ การจับคู่อาหาร และวิธีพูดกับแขก จะถูกเก็บใน `wine_reference/{wineId}`


ล็อกอินเวอร์ชันนี้ใช้ “รหัสพนักงาน + รหัสผ่าน” โดยแอปจะสร้างอีเมลภายในระบบให้อัตโนมัติบน Firebase Authentication เช่น FB001 -> emp.fb001@laya-training.local


## Team Knowledge

- ทุกคนที่ล็อกอินแล้วกด “+ เพิ่มบทเรียน” ได้
- บทเรียนใหม่จะถูกบันทึกใน `community_lessons`
- เจ้าของบทเรียนแก้ไขและลบของตัวเองได้


## Quiz Mode
- ปุ่ม **Quiz** ที่หน้าแอปใช้สุ่มคำถามจากคลังความรู้ในระบบ
- ระบบบันทึกประวัติการทำแบบทดสอบและคะแนนสูงสุดลงใน Firestore ของผู้ใช้แต่ละคน
