const ENGLISH_DATA = window.ENGLISH_DATA || {};
const lessons = [
  {
    id: 'english-fnb',
    category: 'English',
    level: 'Vocabulary',
    type: 'english-pack',
    title: 'English: F&B',
    summary: 'รวมคำศัพท์ภาษาอังกฤษสาย F&B ไว้ในหัวข้อเดียว มี 5 หมวดใหญ่: ร้านอาหาร, ผัก, ผลไม้, รับออเดอร์ และทักทาย/พูดคุย พร้อมคำอ่านไทย คำแปลไทย และปุ่มฟังเสียง'
  },
  {
    id: 'hygiene-restaurant',
    category: 'Hygiene',
    level: 'Core',
    title: 'Hygiene สำหรับร้านอาหาร',
    summary: 'แนวทางสุขอนามัยสำหรับพนักงานร้านอาหาร อ่านง่าย เป็นขั้นตอน และใช้ได้จริงทั้งหน้าบ้านและหลังบ้าน',
    sections: [
      {
        title: '1. ความสำคัญของสุขอนามัยอาหาร',
        items: [
          'สุขอนามัยที่ดีช่วยป้องกัน Foodborne illness หรืออาหารเป็นพิษ',
          'ช่วยสร้างความเชื่อมั่นให้ลูกค้าและทำให้ร้านดูเป็นมืออาชีพ',
          'ลดความเสี่ยงด้านกฎหมาย ชื่อเสียงร้าน และข้อร้องเรียนจากลูกค้า'
        ]
      },
      {
        title: '2. สุขอนามัยส่วนบุคคล — สิ่งที่ต้องทำ',
        items: [
          'ล้างมืออย่างถูกวิธีก่อนและหลังสัมผัสอาหาร',
          'ตัดเล็บสั้น สะอาด และไม่ทาสีเล็บ',
          'สวมหมวกหรือเน็ตคลุมผมให้เรียบร้อย',
          'ใส่ยูนิฟอร์มสะอาด พร้อมเปลี่ยนทันทีเมื่อสกปรก',
          'หากมีแผลต้องปิดด้วยพลาสเตอร์กันน้ำและสวมอุปกรณ์ป้องกันเพิ่มเติมตามความเหมาะสม'
        ]
      },
      {
        title: '3. สุขอนามัยส่วนบุคคล — สิ่งที่ห้ามทำ',
        items: [
          'ไม่ใส่เครื่องประดับ เช่น แหวน สร้อย หรือกำไล ระหว่างทำงานกับอาหาร',
          'ห้ามไอ จาม หรือสัมผัสใบหน้าแล้วกลับไปจับอาหารทันที',
          'ห้ามทำงานเมื่อป่วย โดยเฉพาะอาการท้องเสีย ไข้ อาเจียน หรือโรคติดต่อทางอาหาร'
        ]
      },
      {
        title: '4. การล้างมือที่ถูกต้อง (Hand Washing)',
        items: [
          'ใช้เวลาอย่างน้อย 20 วินาที: เปียกมือ ใส่สบู่ ถูฝ่ามือ หลังมือ ซอกนิ้ว รอบเล็บ และล้างออกให้สะอาด',
          'เช็ดมือด้วยกระดาษหรืออุปกรณ์ที่สะอาดก่อนกลับไปจับอาหาร',
          'ต้องล้างมือก่อนทำอาหาร หลังเข้าห้องน้ำ และหลังจับเงิน ขยะ หรือวัตถุดิบดิบ'
        ]
      },
      {
        title: '5. การป้องกันการปนเปื้อน (Cross Contamination)',
        items: [
          'แยกของดิบ ของสุก และอาหารพร้อมรับประทานออกจากกันตลอดเวลา',
          'ใช้เขียงแยกสีและอุปกรณ์แยกตามประเภทอาหาร',
          'ไม่ใช้มีด ถาด หรือภาชนะร่วมกันระหว่างของดิบกับอาหารที่พร้อมเสิร์ฟ',
          'ตัวอย่างสำคัญ: ไก่ดิบห้ามใช้เขียงเดียวกับผักสดหรือผลไม้ที่ไม่ผ่านความร้อน'
        ]
      },
      {
        title: '6. การจัดเก็บอาหาร (Food Storage)',
        items: [
          'อาหารร้อนควรเก็บมากกว่า 60°C และอาหารเย็นควรเก็บต่ำกว่า 5°C',
          'ใช้หลัก FIFO: First In First Out เพื่อหมุนเวียนสต็อกอย่างถูกต้อง',
          'ติดฉลากวันผลิต วันเปิดใช้ หรือวันหมดอายุให้ชัดเจน',
          'เก็บอาหารในภาชนะปิดสนิทและแยกชั้นวางของดิบออกจากของพร้อมรับประทาน'
        ]
      },
      {
        title: '7. การทำความสะอาด (Cleaning & Sanitizing)',
        items: [
          'Cleaning คือการล้างคราบสกปรกออกจากพื้นผิวหรืออุปกรณ์',
          'Sanitizing คือการฆ่าเชื้อเพื่อลดจำนวนจุลินทรีย์ให้อยู่ในระดับปลอดภัย',
          'ล้างอุปกรณ์ทุกครั้งหลังใช้งานและทำความสะอาดพื้นที่ครัวเป็นประจำทุกวัน',
          'ใช้น้ำยาทำความสะอาดและน้ำยาฆ่าเชื้อตามมาตรฐานของร้านอย่างถูกวิธี'
        ]
      },
      {
        title: '8. การควบคุมแมลงและสัตว์พาหะ',
        items: [
          'ปิดฝาถังขยะให้เรียบร้อยและนำขยะออกตามรอบ',
          'ไม่ทิ้งเศษอาหารค้างคืนบนโต๊ะ เตา หรือพื้นครัว',
          'ตรวจสอบร่องรอยหนู แมลง และแจ้งหัวหน้าทันทีเมื่อพบความผิดปกติ'
        ]
      },
      {
        title: '9. พฤติกรรมต้องห้ามในครัว',
        items: [
          'ห้ามใช้มือถือระหว่างทำอาหารหรือจัดจาน',
          'ห้ามชิมอาหารด้วยช้อนเดิมแล้วกลับไปใช้ต่อ',
          'ห้ามวางวัตถุดิบ อุปกรณ์ หรือภาชนะบนพื้น',
          'ห้ามใช้ผ้าเช็ดมือที่สกปรกเช็ดอุปกรณ์ที่ต้องสัมผัสอาหารโดยตรง'
        ]
      },
      {
        title: '10. สรุปแนวปฏิบัติสำหรับหน้างาน',
        items: [
          'ยึดหลัก สะอาด แยกเก็บ ถูกอุณหภูมิ และไม่ปนเปื้อน',
          'ถ้าไม่แน่ใจเรื่องสุขอนามัย ให้หยุดก่อนแล้วถามหัวหน้าทันที',
          'สุขอนามัยเป็นความรับผิดชอบของทุกคนในทีม ไม่ใช่เฉพาะแผนกครัว'
        ]
      }
    ],
    tips: [
      'ก่อนเริ่มกะ ให้เช็กตัวเองก่อนเสมอว่า มือสะอาด ยูนิฟอร์มพร้อม และอุปกรณ์ป้องกันครบ',
      'ระหว่างงาน ให้คิดเสมอว่า สิ่งที่จับอยู่สะอาดพอสำหรับอาหารหรือยัง',
      'เมื่อเห็นความเสี่ยงเรื่อง hygiene ให้รีบแก้หรือแจ้งหัวหน้าทันที อย่าปล่อยผ่าน'
    ]
  },
  {
    id: 'food-allergy',
    category: 'Safety',
    level: 'Core',
    title: 'Food Allergy สำหรับร้านอาหาร',
    summary: 'แนวทางจัดการ Food Allergy สำหรับพนักงานร้านอาหาร ตั้งแต่การรับออเดอร์ การป้องกันการปนเปื้อน ไปจนถึงการรับมือเหตุฉุกเฉิน',
    sections: [
      {
        title: '1. ความสำคัญของ Food Allergy ในร้านอาหาร',
        items: [
          'Food Allergy อาจรุนแรงถึงชีวิตได้ หากร้านอาหารจัดการไม่ถูกต้อง',
          'การสื่อสารผิดพลาดและการปนเปื้อนข้าม คือสาเหตุหลักที่ทำให้ลูกค้าได้รับอันตราย',
          'ลูกค้าคาดหวังความปลอดภัยสูงสุดจากร้านอาหารทุกครั้งที่แจ้งเรื่องการแพ้',
          'การจัดการที่ดีช่วยลดความเสี่ยงด้านกฎหมาย ชื่อเสียงร้าน และความเสียหายต่อความเชื่อมั่นของลูกค้า'
        ]
      },
      {
        title: '2. สารก่อภูมิแพ้ที่พบบ่อย (Common Allergens)',
        items: [
          'กลุ่มที่พบได้บ่อย ได้แก่ นม ไข่ ถั่วลิสง ถั่วเปลือกแข็ง ปลา อาหารทะเลเปลือกแข็ง ถั่วเหลือง และข้าวสาลี',
          'บางประเทศนับงา (Sesame) เป็นสารก่อภูมิแพ้สำคัญด้วย',
          'พนักงานไม่ควรคาดเดาว่าเมนูปลอดภัย ต้องตรวจสอบส่วนผสมจริงทุกครั้ง',
          'ซอส น้ำสต็อก น้ำสลัด ของตกแต่งจาน และของทอดร่วมกัน มักเป็นจุดเสี่ยงที่ถูกมองข้าม'
        ]
      },
      {
        title: '3. อาการของการแพ้อาหารที่พนักงานต้องสังเกต',
        items: [
          'อาการทั่วไป ได้แก่ ผื่น คัน ลมพิษ หรืออาการบวมที่หน้า ริมฝีปาก หรือลิ้น',
          'อาจมีคลื่นไส้ อาเจียน ปวดท้อง ไอ หรือหายใจลำบาก',
          'บางรายอาจเวียนหัว หน้ามืด หรือหมดสติ',
          'หากสงสัยอาการรุนแรงแบบ Anaphylaxis ต้องถือเป็นเหตุฉุกเฉินทันที'
        ]
      },
      {
        title: '4. Cross-contact หรือการปนเปื้อนของสารก่อภูมิแพ้',
        items: [
          'คือการที่สารก่อภูมิแพ้ปนไปสู่อาหารอื่น แม้มีเพียงเล็กน้อยก็อาจอันตรายได้',
          'ตัวอย่างที่พบบ่อย เช่น ใช้เขียงหรือมีดร่วมกัน ใช้น้ำมันทอดเดียวกัน หรือใช้จานและอุปกรณ์ปนกัน',
          'มือหรือถุงมือที่ไม่สะอาดก็สามารถทำให้เกิดการปนเปื้อนได้',
          'ตัวอย่างสำคัญ: ไก่ดิบหรืออาหารที่มี allergen ห้ามใช้เขียงเดียวกับผักสดหรืออาหารพร้อมเสิร์ฟ'
        ]
      },
      {
        title: '5. แนวทางป้องกันในครัว (Back of House)',
        items: [
          'ล้างมือและเปลี่ยนถุงมือทุกครั้งก่อนเตรียมอาหารสำหรับลูกค้าที่แพ้อาหาร',
          'ใช้อุปกรณ์แยกเฉพาะ เช่น มีด เขียง ถ้วย และภาชนะ',
          'ทำความสะอาดพื้นที่ทำงานก่อนเริ่มปรุง และใช้วัตถุดิบที่ตรวจสอบแล้วเท่านั้น',
          'ถ้าเป็นไปได้ควรแยกพื้นที่ปรุงอาหาร และหลีกเลี่ยงการใช้ fryer หรือ grill ร่วมกัน'
        ]
      },
      {
        title: '6. แนวทางสำหรับพนักงานบริการ (Front of House)',
        items: [
          'ถามลูกค้าอย่างสุภาพทุกครั้งว่ามีอาหารที่แพ้หรือไม่ โดยเฉพาะเมื่อลูกค้าสอบถามส่วนผสม',
          'บันทึกข้อมูลการแพ้ให้ชัดเจนบนออเดอร์ และแจ้งครัวทันที',
          'ทวนข้อมูลกับลูกค้าอีกครั้งเพื่อให้แน่ใจว่าเข้าใจตรงกัน',
          'ก่อนเสิร์ฟต้องตรวจสอบว่าจานนั้นเป็นอาหารสำหรับลูกค้าคนที่แจ้งแพ้อาหารจริง'
        ]
      },
      {
        title: '7. การสื่อสารคือหัวใจของความปลอดภัย',
        items: [
          'พนักงานเสิร์ฟต้องสื่อสารกับครัวให้ครบถ้วน ไม่พูดสั้นหรือคลุมเครือ',
          'หากไม่แน่ใจ ต้องถามผู้จัดการหรือหัวหน้าครัวทันที',
          'กับลูกค้า ควรใช้คำพูดที่ชัดเจน เช่น จะตรวจสอบกับครัวให้ก่อน ไม่ควรรับปากทันทีโดยไม่มีข้อมูล',
          'ความผิดพลาดส่วนใหญ่มาจากการส่งต่อข้อมูลไม่ครบหรือไม่ได้ยืนยันซ้ำ'
        ]
      },
      {
        title: '8. ขั้นตอนเมื่อเกิดเหตุฉุกเฉิน',
        items: [
          'แจ้งผู้จัดการทันทีและโทรเรียกหน่วยฉุกเฉินโดยไม่รอให้อาการหนักขึ้น',
          'อยู่กับลูกค้าและสังเกตอาการอย่างใกล้ชิด',
          'สอบถามว่าลูกค้ามียาประจำตัวหรือ Epinephrine หรือไม่',
          'เตรียมข้อมูลอาหารที่ลูกค้ารับประทานและเวลาที่เริ่มมีอาการ เพื่อส่งต่อทีมแพทย์'
        ]
      },
      {
        title: '9. ข้อเข้าใจผิดที่พนักงานต้องหลีกเลี่ยง',
        items: [
          'ความร้อนไม่ได้ทำลายสารก่อภูมิแพ้เสมอไป จึงห้ามคิดว่าอาหารที่ผ่านการปรุงสุกแล้วปลอดภัยแน่นอน',
          'การแพ้เล็กน้อยก็อาจพัฒนาเป็นอาการรุนแรงได้ จึงห้ามมองว่าไม่เป็นไร',
          'ใส่ถุงมือแล้วไม่ได้แปลว่าไม่ต้องล้างมือ เพราะถุงมือสกปรกและพาสารก่อภูมิแพ้ไปยังอาหารอื่นได้',
          'ห้ามพูดกับลูกค้าว่า ปลอดภัย 100% หากยังไม่ได้ตรวจสอบข้อมูลจริงกับครัว'
        ]
      },
      {
        title: '10. สรุปแนวปฏิบัติสำหรับหน้างาน',
        items: [
          'Food Allergy คือเรื่องของชีวิตและความปลอดภัย ไม่ใช่เพียงความชอบอาหาร',
          'ทุกคนในทีมต้องได้รับการฝึกเรื่อง allergen และ cross-contact อย่างต่อเนื่อง',
          'ต้องสื่อสารให้ชัดเจนทุกขั้นตอน ตั้งแต่รับออเดอร์ เตรียมอาหาร จนถึงเสิร์ฟ',
          'ร้านควรมีแผนรับมือเหตุฉุกเฉินที่พนักงานทุกคนเข้าใจตรงกัน'
        ]
      }
    ],
    tips: [
      'เมื่อได้ยินคำว่าแพ้อาหาร ให้ชะลอการรับออเดอร์และตรวจสอบข้อมูลก่อนเสมอ',
      'ห้ามเดาส่วนผสม ห้ามรับปากแทนครัว และห้ามมองข้ามความเสี่ยงจาก cross-contact',
      'ถ้าสงสัยว่าไม่ปลอดภัย ให้หยุดและแจ้งหัวหน้าหรือผู้จัดการทันที'
    ]
  },
  {
    id: 'safety-temp',
    category: 'Safety',
    level: 'Core',
    title: 'Temperature Control สำหรับร้านอาหาร',
    summary: 'แนวทางควบคุมอุณหภูมิอาหารสำหรับร้านอาหาร อ่านง่าย ใช้ได้จริง และช่วยลดความเสี่ยงเรื่องอาหารไม่ปลอดภัย',
    sections: [
      {
        title: '1. ความสำคัญของ Temperature Control',
        items: [
          'การควบคุมอุณหภูมิที่ถูกต้องช่วยลดการเจริญเติบโตของเชื้อโรคในอาหาร',
          'เป็นพื้นฐานสำคัญของความปลอดภัยอาหาร ทั้งในครัว บุฟเฟต์ และการเสิร์ฟ',
          'หากควบคุมอุณหภูมิไม่ดี อาหารอาจเสียเร็ว เกิดข้อร้องเรียน และเพิ่มความเสี่ยงต่ออาหารเป็นพิษ'
        ]
      },
      {
        title: '2. ช่วงอุณหภูมิที่ต้องรู้',
        items: [
          'อาหารร้อนควรรักษาให้มากกว่า 60°C',
          'อาหารเย็นควรรักษาให้ต่ำกว่า 5°C',
          'ช่วงอุณหภูมิ 5°C ถึง 60°C คือช่วงเสี่ยง หรือ Danger Zone ที่เชื้อโรคเติบโตได้ดี',
          'พนักงานควรจำตัวเลขหลักนี้ให้ได้ เพราะใช้ตัดสินใจหน้างานทุกวัน'
        ]
      },
      {
        title: '3. การรับของและการจัดเก็บ',
        items: [
          'ตรวจสอบอุณหภูมิของวัตถุดิบตั้งแต่ตอนรับของ โดยเฉพาะของสด ของแช่เย็น และของแช่แข็ง',
          'นำวัตถุดิบเข้าตู้เย็นหรือตู้แช่ทันที ไม่ปล่อยค้างไว้ที่อุณหภูมิห้องนานเกินจำเป็น',
          'จัดเก็บอาหารดิบและอาหารพร้อมรับประทานแยกกันอย่างชัดเจน',
          'ติดฉลากวันรับเข้า วันเปิดใช้ และใช้หลัก FIFO เพื่อหมุนเวียนสต็อกอย่างถูกต้อง'
        ]
      },
      {
        title: '4. การเตรียมอาหารและการละลายวัตถุดิบ',
        items: [
          'ไม่ควรละลายอาหารแช่แข็งไว้ที่อุณหภูมิห้องเป็นเวลานาน',
          'ควรละลายในตู้เย็น ใต้น้ำไหลที่สะอาด หรือใช้วิธีที่ร้านกำหนดอย่างปลอดภัย',
          'ระหว่างเตรียมอาหาร ต้องลดเวลาที่อาหารอยู่ใน Danger Zone ให้น้อยที่สุด',
          'วัตถุดิบที่ถูกนำออกมาจากความเย็นแล้ว ควรรีบเตรียมและรีบปรุงอย่างต่อเนื่อง'
        ]
      },
      {
        title: '5. การเก็บรักษาระหว่างบริการ',
        items: [
          'อาหารบนไลน์บุฟเฟต์หรือไลน์เสิร์ฟต้องเช็กอุณหภูมิเป็นรอบ',
          'อาหารร้อนต้องอยู่ในภาชนะอุ่นร้อนที่ทำงานได้จริง ไม่ใช่แค่วางไว้เฉย ๆ',
          'อาหารเย็น เช่น สลัด ของหวาน หรือ cold cut ต้องมีระบบรักษาความเย็นที่เพียงพอ',
          'หากอาหารอยู่ในช่วงเสี่ยงนานเกินกำหนด ต้องเปลี่ยนใหม่หรือหยุดเสิร์ฟทันที'
        ]
      },
      {
        title: '6. การอุ่นซ้ำและการทำให้เย็นลง',
        items: [
          'อาหารที่อุ่นซ้ำต้องร้อนอย่างทั่วถึง ไม่ใช่ร้อนเฉพาะด้านนอก',
          'ไม่ควรอุ่นซ้ำหลายครั้ง เพราะเพิ่มความเสี่ยงทั้งด้านคุณภาพและความปลอดภัย',
          'อาหารที่ต้องทำให้เย็นลงควรแบ่งใส่ภาชนะตื้น ลดปริมาณต่อภาชนะ และรีบนำเข้าความเย็น',
          'หลีกเลี่ยงการปล่อยอาหารหม้อใหญ่ไว้ให้เย็นเองบนเคาน์เตอร์เป็นเวลานาน'
        ]
      },
      {
        title: '7. เครื่องมือและการตรวจสอบ',
        items: [
          'ควรใช้เทอร์โมมิเตอร์ที่ใช้งานได้จริงและตรวจสอบความพร้อมสม่ำเสมอ',
          'ทำความสะอาดหัววัดก่อนและหลังใช้งานทุกครั้ง',
          'บันทึกอุณหภูมิในจุดสำคัญ เช่น ตู้เย็น ตู้แช่ ไลน์บุฟเฟต์ และอาหารที่มีความเสี่ยงสูง',
          'หากอุปกรณ์ควบคุมอุณหภูมิผิดปกติ ต้องแจ้งหัวหน้าทันที ไม่ควรรอให้เกิดปัญหาก่อน'
        ]
      },
      {
        title: '8. สิ่งที่พนักงานบริการต้องรู้',
        items: [
          'พนักงานเสิร์ฟควรสังเกตว่าอาหารร้อนยังร้อนพอ และอาหารเย็นยังเย็นพอหรือไม่',
          'หากพบว่าอาหารบนไลน์ไม่ร้อนหรือเย็นไม่พอ ต้องแจ้งครัวหรือหัวหน้าทันที',
          'อย่าวางจานอาหารรอเสิร์ฟไว้นานโดยไม่ควบคุมอุณหภูมิ',
          'การเสิร์ฟรวดเร็วและสื่อสารกับครัวดี จะช่วยรักษาคุณภาพอาหารได้มาก'
        ]
      },
      {
        title: '9. ข้อผิดพลาดที่พบบ่อย',
        items: [
          'คิดว่าอาหารดูปกติดีจึงปลอดภัย ทั้งที่อาจอยู่ในช่วงเสี่ยงมานานแล้ว',
          'เปิดตู้เย็นบ่อยเกินไปหรืออัดของแน่นเกินจนความเย็นหมุนเวียนไม่ดี',
          'ไม่ตรวจอุณหภูมิจริง ใช้การเดาแทนการวัด',
          'ปล่อยอาหารรอเสิร์ฟบนเคาน์เตอร์นานเกินไป โดยไม่มีการควบคุมอุณหภูมิ'
        ]
      },
      {
        title: '10. สรุปแนวปฏิบัติสำหรับหน้างาน',
        items: [
          'จำให้ขึ้นใจว่า ร้อนต้องร้อน เย็นต้องเย็น และหลีกเลี่ยง Danger Zone ให้มากที่สุด',
          'ใช้เครื่องมือวัดจริง ไม่เดาอุณหภูมิด้วยสายตา',
          'เมื่อพบความผิดปกติเรื่องอุณหภูมิ ให้หยุดเสิร์ฟหรือแจ้งหัวหน้าทันที',
          'Temperature Control ที่ดีช่วยทั้งเรื่องความปลอดภัย คุณภาพ และความพึงพอใจของลูกค้า'
        ]
      }
    ],
    tips: [
      'ก่อนเริ่มกะ ให้เช็กตู้เย็น ตู้ร้อน และอุปกรณ์วัดอุณหภูมิว่าใช้งานได้ปกติ',
      'ระหว่างบริการ ให้หมั่นดูไลน์อาหาร อย่ารอจนลูกค้าร้องเรียนว่าอาหารเย็นหรือเสียคุณภาพ',
      'ถ้าไม่มั่นใจว่าอาหารยังปลอดภัยหรือไม่ ให้หยุดใช้ก่อนแล้วถามหัวหน้าทันที'
    ]
  },
  {
    id: 'service-greeting',
    category: 'Service',
    level: 'Core',
    title: 'Greeting Guest สำหรับพนักงานห้องอาหาร',
    summary: 'แนวทางต้อนรับแขกอย่างมืออาชีพตั้งแต่วินาทีแรก ช่วยสร้างความประทับใจและทำให้บริการลื่นไหลมากขึ้น',
    sections: [
      {
        title: '1. ความสำคัญของการต้อนรับแขก',
        items: [
          'การทักทายคือ First Impression ของร้านอาหาร และมีผลต่อความรู้สึกของลูกค้าทั้งมื้อ',
          'แขกจะรู้ทันทีว่าร้านใส่ใจและเป็นมืออาชีพหรือไม่ จากการต้อนรับในช่วงแรก',
          'การต้อนรับที่ดีช่วยลดความกังวลของลูกค้า ทำให้การบริการขั้นต่อไปง่ายขึ้น'
        ]
      },
      {
        title: '2. การเตรียมตัวก่อนแขกมาถึง',
        items: [
          'พนักงานควรแต่งกายเรียบร้อย ยืนในตำแหน่งที่พร้อมมองเห็นแขกที่เข้ามา',
          'ใบหน้า สีหน้า และภาษากายต้องดูพร้อมให้บริการ ไม่ดูรีบหรือไม่สนใจ',
          'ต้องรู้สถานะโต๊ะ จองโต๊ะ และจำนวนที่นั่งว่างก่อนเริ่มกะ',
          'หากร้านมีโปรโมชัน เมนูแนะนำ หรือข้อจำกัดบางอย่าง พนักงานควรรู้ข้อมูลไว้ล่วงหน้า'
        ]
      },
      {
        title: '3. ขั้นตอนการต้อนรับใน 10 วินาทีแรก',
        items: [
          'ทักทายแขกทันทีเมื่อมาถึงด้วยรอยยิ้มและน้ำเสียงสุภาพ',
          'สบตาอย่างเหมาะสม และใช้คำทักทายที่ชัดเจน เช่น สวัสดีค่ะ ยินดีต้อนรับ',
          'หากติดงานอยู่ ให้ส่งสัญญาณว่ามองเห็นแขกแล้ว และเข้าหาโดยเร็วที่สุด',
          'อย่าปล่อยให้แขกรอนานโดยไม่มีใครรับรู้หรือทักทาย'
        ]
      },
      {
        title: '4. การสอบถามการจองและจำนวนแขก',
        items: [
          'ถามอย่างสุภาพว่าได้จองโต๊ะไว้หรือไม่ และมากี่ท่าน',
          'ตรวจสอบชื่อการจอง เวลา และความต้องการพิเศษ เช่น เด็กเล็ก ผู้สูงอายุ หรือเก้าอี้เด็ก',
          'หากเป็น Walk-in ให้เช็กโต๊ะว่างก่อนพาไปนั่ง',
          'หากต้องรอคิว ควรแจ้งเวลารอโดยประมาณอย่างตรงไปตรงมาและสุภาพ'
        ]
      },
      {
        title: '5. การพาแขกไปที่โต๊ะ',
        items: [
          'เดินนำแขกด้วยความเร็วพอดี และหันกลับมาดูเป็นระยะว่าแขกตามมาทัน',
          'จัดโต๊ะให้พร้อมก่อนแขกนั่ง เช่น เก้าอี้ เมนู เซ็ตอุปกรณ์พื้นฐาน',
          'เชิญแขกนั่งอย่างสุภาพ และส่งมอบโต๊ะให้พนักงานที่รับช่วงต่ออย่างชัดเจน',
          'หากเป็นแขก VIP หรือมีความต้องการพิเศษ ควรแจ้งทีมที่เกี่ยวข้องทันที'
        ]
      },
      {
        title: '6. ภาษากาย น้ำเสียง และคำพูดที่เหมาะสม',
        items: [
          'ใช้น้ำเสียงสุภาพ ชัดเจน และอบอุ่น ไม่แข็งหรือห้วน',
          'ยืนตัวตรง ท่าทางเปิด พร้อมให้ความช่วยเหลือ',
          'หลีกเลี่ยงการชี้นิ้ว การกอดอก การคุยกันเอง หรือการแสดงสีหน้าเหนื่อยล้า',
          'หากต้องอธิบายหรือปฏิเสธบางอย่าง ควรใช้คำพูดที่สุภาพและเน้นการช่วยหาทางเลือกให้แขก'
        ]
      },
      {
        title: '7. การต้อนรับแขกในสถานการณ์พิเศษ',
        items: [
          'แขกต่างชาติควรได้รับการทักทายชัดเจนและใช้ภาษาอังกฤษพื้นฐานอย่างมั่นใจ',
          'แขกที่มากับเด็ก ผู้สูงอายุ หรือรถเข็น ต้องได้รับการดูแลเรื่องพื้นที่และความสะดวกเป็นพิเศษ',
          'แขกที่มาฉลองโอกาสพิเศษ เช่น วันเกิด หรือ Anniversary ควรถูกบันทึกและสื่อสารให้ทีมทราบ',
          'หากแขกมาด้วยอารมณ์ไม่ดี ควรต้อนรับอย่างสงบ สุภาพ และไม่ตอบโต้ด้วยอารมณ์'
        ]
      },
      {
        title: '8. การจัดการเมื่อร้านเต็มหรือแขกต้องรอ',
        items: [
          'แจ้งสถานการณ์ตามจริงอย่างสุภาพ พร้อมบอกเวลารอโดยประมาณ',
          'หากมีพื้นที่รอ ควรเชิญแขกไปนั่งรออย่างเหมาะสม',
          'หากมีตัวเลือกอื่น เช่น โต๊ะอีกโซนหรือเวลาที่พร้อมกว่า ควรเสนออย่างชัดเจน',
          'แม้ร้านจะยุ่ง ก็ไม่ควรปล่อยให้แขกรอโดยไม่มีการอัปเดต'
        ]
      },
      {
        title: '9. ข้อผิดพลาดที่พบบ่อย',
        items: [
          'มัวแต่ทำงานอื่นจนไม่ทักทายแขกที่เข้ามา',
          'ใช้คำพูดสั้นเกินไปจนฟังดูไม่เป็นมิตร',
          'ไม่ตรวจสอบการจองหรือจำนวนแขกให้ชัดก่อนพาไปนั่ง',
          'ไม่สื่อสารต่อกับทีม ทำให้แขกนั่งแล้วไม่มีคนรับช่วงบริการ'
        ]
      },
      {
        title: '10. สรุปแนวปฏิบัติสำหรับหน้างาน',
        items: [
          'ทักทายเร็ว สุภาพ และมั่นใจ คือหัวใจของการต้อนรับที่ดี',
          'การต้อนรับไม่ได้จบแค่พาแขกนั่ง แต่ต้องส่งต่อข้อมูลให้ทีมอย่างครบถ้วน',
          'ทุกครั้งที่แขกเดินเข้าร้าน ให้คิดว่าช่วงเวลานั้นคือโอกาสสร้างความประทับใจ',
          'ถ้าไม่แน่ใจเรื่องโต๊ะ การจอง หรือขั้นตอน ให้ถามหัวหน้าทันทีเพื่อไม่ให้แขกเสียประสบการณ์'
        ]
      }
    ],
    tips: [
      'ให้ความสำคัญกับ 10 วินาทีแรกเสมอ เพราะเป็นช่วงที่แขกตัดสินใจความรู้สึกต่อร้านได้เร็วมาก',
      'ถ้าร้านยุ่ง ให้ทักทายก่อนเสมอ แม้ยังพาไปนั่งไม่ได้ในทันที',
      'รอยยิ้ม น้ำเสียง และการสื่อสารที่ชัดเจน สำคัญพอ ๆ กับขั้นตอนบริการอื่น ๆ'
    ]
  },
  {
    id: 'wine-basic',
    category: 'Beverage',
    level: 'Core',
    title: 'Wine Basic Service สำหรับพนักงานห้องอาหาร',
    summary: 'พื้นฐานการเสิร์ฟไวน์แบบอ่านง่าย ใช้ได้จริง ตั้งแต่การเตรียมอุปกรณ์ การนำเสนอขวด ไปจนถึงการรินและดูแลแขกระหว่างมื้อ',
    sections: [
      {
        title: '1. ความสำคัญของการเสิร์ฟไวน์อย่างถูกต้อง',
        items: [
          'ไวน์เป็นสินค้าที่มีทั้งภาพลักษณ์ ราคา และประสบการณ์ของแขกเข้ามาเกี่ยวข้อง',
          'การเสิร์ฟที่ถูกต้องช่วยเพิ่มความมั่นใจให้ลูกค้าและสะท้อนมาตรฐานของร้าน',
          'พนักงานไม่จำเป็นต้องเป็นผู้เชี่ยวชาญระดับสูง แต่ต้องเข้าใจขั้นตอนพื้นฐานและสื่อสารได้ดี'
        ]
      },
      {
        title: '2. การเตรียมตัวก่อนเสิร์ฟไวน์',
        items: [
          'ตรวจสอบว่าไวน์เป็นขวดที่ถูกต้องตามออเดอร์ ทั้งชื่อฉลาก ประเภท และวินเทจถ้ามี',
          'เตรียมอุปกรณ์ให้พร้อม เช่น ที่เปิดไวน์ ผ้าเช็ดปาก ถังแช่ไวน์ หรือไวน์บักเก็ต',
          'เลือกแก้วให้เหมาะกับสไตล์ไวน์และเช็กว่าแก้วสะอาด ไม่มีคราบหรือกลิ่น',
          'ตรวจสอบอุณหภูมิไวน์เบื้องต้น โดยเฉพาะไวน์ขาว สปาร์กลิง และโรเซ่ที่ควรเย็นพอเหมาะ'
        ]
      },
      {
        title: '3. การนำเสนอขวดไวน์',
        items: [
          'นำขวดไปแสดงให้เจ้าภาพหรือผู้สั่งไวน์ตรวจสอบก่อนเปิดเสมอ',
          'โชว์ฉลากให้เห็นชัด พร้อมกล่าวชื่อไวน์และวินเทจอย่างสุภาพถ้าจำเป็น',
          'อย่าเปิดขวดก่อนที่แขกจะยืนยันว่าเป็นไวน์ที่ถูกต้อง',
          'หากแขกมีคำถาม ควรตอบตามข้อมูลที่มั่นใจ และถ้าไม่แน่ใจให้ตรวจสอบก่อนตอบ'
        ]
      },
      {
        title: '4. การเปิดขวดอย่างมืออาชีพ',
        items: [
          'เปิดขวดอย่างมั่นคง สะอาด และเงียบที่สุดเท่าที่ทำได้',
          'เช็ดบริเวณปากขวดหลังเปิด โดยเฉพาะไวน์แดงหรือขวดที่มีฝุ่นเก็บ',
          'สำหรับไวน์คอร์ก ควรเปิดอย่างระมัดระวังและตรวจดูว่าคอร์กไม่แตกหรือมีสิ่งผิดปกติ',
          'สำหรับสปาร์กลิงไวน์ ควรเปิดอย่างควบคุม ไม่ให้จุกพุ่งหรือเกิดเสียงดังเกินความเหมาะสม'
        ]
      },
      {
        title: '5. การให้เจ้าภาพชิมไวน์',
        items: [
          'รินปริมาณเล็กน้อยให้เจ้าภาพชิมก่อน เพื่อยืนยันว่าไวน์พร้อมเสิร์ฟ',
          'ช่วงนี้ไม่ใช่การชิมว่าแขกชอบหรือไม่ แต่เป็นการตรวจสอบสภาพไวน์เบื้องต้น',
          'รอให้เจ้าภาพอนุมัติก่อนรินให้แขกคนอื่น',
          'หากแขกมีข้อสงสัยหรือคิดว่าไวน์มีปัญหา ให้แจ้งหัวหน้าหรือผู้รับผิดชอบทันที'
        ]
      },
      {
        title: '6. การรินไวน์ให้แขก',
        items: [
          'เริ่มรินจากแขกสุภาพสตรีก่อน แล้วจึงแขกสุภาพบุรุษ และรินให้เจ้าภาพเป็นคนสุดท้ายตามธรรมเนียมทั่วไป',
          'ไม่ควรรินเต็มแก้ว ควรเว้นพื้นที่ให้แขกได้ดมกลิ่นและหมุนไวน์',
          'ระหว่างรินควบคุมขวดให้มั่นคง และใช้ผ้าช่วยเช็ดหยดไวน์ที่ปากขวดเมื่อยกขึ้น',
          'คอยสังเกตระดับไวน์ในแก้ว และเสนอเติมอย่างเหมาะสมโดยไม่รบกวนแขกมากเกินไป'
        ]
      },
      {
        title: '7. แก้วไวน์และอุณหภูมิการเสิร์ฟ',
        items: [
          'ไวน์แต่ละประเภทควรใช้แก้วที่เหมาะสมเพื่อช่วยเรื่องกลิ่นและประสบการณ์การดื่ม',
          'ไวน์ขาว โรเซ่ และสปาร์กลิงควรเสิร์ฟเย็นกว่าไวน์แดง',
          'หากใช้ไวน์บักเก็ต ต้องคอยดูระดับน้ำแข็งและสภาพขวดระหว่างมื้อ',
          'อย่าจับปากแก้วหรือบริเวณที่แขกใช้ดื่ม ควรจับที่ก้านหรือฐานแก้วอย่างเหมาะสม'
        ]
      },
      {
        title: '8. การสื่อสารกับแขกเรื่องไวน์',
        items: [
          'ใช้คำพูดสุภาพและเรียบง่าย ไม่จำเป็นต้องใช้ศัพท์เทคนิคมากเกินไป',
          'หากแขกขอคำแนะนำ ควรแนะนำตามเมนูที่สั่ง งบประมาณ และรสชาติที่แขกชอบ',
          'หากไม่มั่นใจเรื่องไวน์ ควรขอเวลาตรวจสอบหรือเรียกผู้ที่รับผิดชอบมาช่วย',
          'ความมั่นใจที่สุภาพและซื่อสัตย์ สำคัญกว่าการพยายามตอบทุกอย่างโดยไม่แน่ใจ'
        ]
      },
      {
        title: '9. ข้อผิดพลาดที่พบบ่อย',
        items: [
          'เปิดขวดก่อนให้แขกตรวจสอบฉลาก',
          'ใช้แก้วไม่สะอาดหรือมีคราบ ทำให้เสียประสบการณ์ทันที',
          'รินมากเกินไปหรือถือขวดไม่มั่นคงจนหยดเลอะโต๊ะ',
          'พูดข้อมูลไวน์ผิดหรือเดาแทนการตรวจสอบ'
        ]
      },
      {
        title: '10. สรุปแนวปฏิบัติสำหรับหน้างาน',
        items: [
          'ตรวจขวดให้ถูก เตรียมอุปกรณ์ให้พร้อม และนำเสนอฉลากก่อนเปิดเสมอ',
          'รินอย่างสุภาพ สะอาด และเป็นจังหวะ ไม่รีบจนดูไม่เรียบร้อย',
          'คอยดูแลแก้วและขวดระหว่างมื้อเพื่อให้ประสบการณ์ของแขกต่อเนื่อง',
          'หากไม่แน่ใจเรื่องไวน์ ให้ถามผู้ที่รับผิดชอบทันที ดีกว่าตอบผิดต่อหน้าลูกค้า'
        ]
      }
    ],
    tips: [
      'สิ่งสำคัญที่สุดของ Wine Service คือ ความถูกต้อง ความสะอาด และความมั่นใจที่สุภาพ',
      'การแสดงฉลากก่อนเปิดและการให้เจ้าภาพชิมก่อน คือสองขั้นตอนที่ไม่ควรข้าม',
      'ถ้าไม่แน่ใจเรื่องไวน์ อย่าคาดเดา ให้ตรวจสอบก่อนเสมอ'
    ]
  }

];

const ENGLISH_CANDIDATE_ORDER = [
  ['restaurant'],
  ['vegetables'],
  ['fruits'],
  ['orders', 'takingOrders'],
  ['greeting', 'conversation']
];
function pickEnglishKey(candidates) {
  return candidates.find(key => ENGLISH_DATA[key]) || candidates[0];
}
const ENGLISH_ORDER = ENGLISH_CANDIDATE_ORDER.map(pickEnglishKey);
const DEFAULT_ENGLISH_SUBCATEGORY = ENGLISH_ORDER[0];
function getEnglishMeta(key) {
  return ENGLISH_DATA[key] || { title: key, items: [] };
}

const EMBEDDED_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAaiMSOeGDahZuVDqWhgeuSHBf129wXv6g",
  authDomain: "laya-training.firebaseapp.com",
  projectId: "laya-training",
  storageBucket: "laya-training.firebasestorage.app",
  messagingSenderId: "843807988908",
  appId: "1:843807988908:web:cda1a814a2bcb41c4a9309",
  measurementId: "G-QB481YNZCJ"
};

const DEFAULT_USER_DATA = { completed: [], favorites: [], notes: {}, profile: {} };

const state = {
  authMode: 'login',
  category: 'All',
  search: '',
  currentLessonId: null,
  session: null,
  userData: structuredClone(DEFAULT_USER_DATA),
  firebaseConfig: EMBEDDED_FIREBASE_CONFIG,
  firebaseReady: false,
  syncing: false,
  englishPack: { subcategory: DEFAULT_ENGLISH_SUBCATEGORY, query: '' }
};

const el = (id) => document.getElementById(id);
const authView = el('authView');
const mainView = el('mainView');
const listView = el('listView');
const readerView = el('readerView');
const settingsModal = el('settingsModal');
const categoryChips = el('categoryChips');
const template = el('cardTemplate');

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function mergeUserData(base = DEFAULT_USER_DATA, extra = {}) {
  return {
    completed: Array.isArray(extra.completed) ? extra.completed : [...(base.completed || [])],
    favorites: Array.isArray(extra.favorites) ? extra.favorites : [...(base.favorites || [])],
    notes: typeof extra.notes === 'object' && extra.notes ? extra.notes : { ...(base.notes || {}) },
    profile: typeof extra.profile === 'object' && extra.profile ? extra.profile : { ...(base.profile || {}) }
  };
}
function getUserKey() {
  return state.session?.uid ? `laya_v3_user_${state.session.uid}` : 'laya_v3_local_demo';
}
function loadLocalUserData() {
  state.userData = mergeUserData(DEFAULT_USER_DATA, loadJSON(getUserKey(), DEFAULT_USER_DATA));
}
async function saveUserData() {
  saveJSON(getUserKey(), state.userData);
  updateStats();
  await syncUserDataToCloud();
}

async function ensureFirebase() {
  if (window._layaFirebaseReady) return window._layaFirebaseReady;
  window._layaFirebaseReady = (async () => {
    const { initializeApp, getApps, getApp } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
    const authMod = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');
    const storeMod = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js');
    const app = getApps().length ? getApp() : initializeApp(state.firebaseConfig);
    window._layaFirebaseApp = app;
    window._layaFirebaseAuthMod = authMod;
    window._layaFirebaseStoreMod = storeMod;
    window._layaFirebaseAuth = authMod.getAuth(app);
    window._layaFirebaseDB = storeMod.getFirestore(app);
    state.firebaseReady = true;
    return { app, auth: window._layaFirebaseAuth, db: window._layaFirebaseDB, authMod, storeMod };
  })().catch(err => {
    window._layaFirebaseReady = null;
    throw err;
  });
  return window._layaFirebaseReady;
}

async function loadCloudUserData(uid) {
  const { db, storeMod } = await ensureFirebase();
  const ref = storeMod.doc(db, 'users', uid);
  const snap = await storeMod.getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() || {};
  return mergeUserData(DEFAULT_USER_DATA, data);
}

async function syncUserDataToCloud() {
  if (!state.session?.uid || state.session.uid === 'local-demo' || state.syncing === true) return;
  try {
    state.syncing = true;
    const { db, storeMod } = await ensureFirebase();
    const ref = storeMod.doc(db, 'users', state.session.uid);
    const payload = {
      ...state.userData,
      profile: {
        ...state.userData.profile,
        email: state.session.email || state.userData.profile.email || ''
      },
      updatedAt: new Date().toISOString()
    };
    await storeMod.setDoc(ref, payload, { merge: true });
  } catch (err) {
    console.error('Cloud sync failed:', err);
  } finally {
    state.syncing = false;
  }
}

function setAuthMode(mode) {
  state.authMode = mode;
  document.querySelectorAll('.pill').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
  el('displayNameWrap').classList.toggle('hidden', mode !== 'register');
  el('authSubmit').textContent = mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครผู้ใช้ใหม่';
}
document.querySelectorAll('.pill').forEach(btn => btn.addEventListener('click', () => setAuthMode(btn.dataset.mode)));

async function enterApp(session) {
  state.session = session;
  loadLocalUserData();
  if (session?.uid && session.uid !== 'local-demo') {
    try {
      const cloudData = await loadCloudUserData(session.uid);
      if (cloudData) {
        state.userData = cloudData;
        saveJSON(getUserKey(), state.userData);
      } else {
        state.userData.profile = {
          ...state.userData.profile,
          displayName: session.displayName || state.userData.profile.displayName || '',
          email: session.email || state.userData.profile.email || ''
        };
        await syncUserDataToCloud();
      }
    } catch (err) {
      console.error('Load cloud data failed:', err);
    }
  }
  authView.classList.add('hidden');
  mainView.classList.remove('hidden');
  el('welcomeName').textContent = state.userData.profile.displayName || session.displayName || session.email || 'พนักงาน';
  renderCategories();
  renderList();
  updateStats();
}

async function logout() {
  if (state.session?.uid && state.session.uid !== 'local-demo') {
    try {
      const { auth, authMod } = await ensureFirebase();
      await authMod.signOut(auth);
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  }
  state.session = null;
  mainView.classList.add('hidden');
  authView.classList.remove('hidden');
  readerView.classList.add('hidden');
  listView.classList.remove('hidden');
}

function renderCategories() {
  const categories = ['All', ...new Set(lessons.map(l => l.category))];
  categoryChips.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `chip ${state.category === cat ? 'active' : ''}`;
    btn.textContent = cat;
    btn.onclick = () => {
      state.category = cat;
      renderCategories();
      renderList();
    };
    categoryChips.appendChild(btn);
  });
}

function filteredLessons() {
  const q = state.search.trim().toLowerCase();
  return lessons.filter(l => {
    const matchCat = state.category === 'All' || l.category === state.category;
    const raw = `${l.title} ${l.summary} ${l.category} ${l.level}`.toLowerCase();
    return matchCat && (!q || raw.includes(q));
  });
}

function renderList() {
  listView.innerHTML = '';
  const items = filteredLessons();
  items.forEach(lesson => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector('.title').textContent = lesson.title;
    node.querySelector('.summary').textContent = lesson.summary;
    const tags = node.querySelector('.tags');
    [lesson.category, lesson.level].forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      tags.appendChild(span);
    });
    const favBtn = node.querySelector('.fav-btn');
    favBtn.textContent = state.userData.favorites.includes(lesson.id) ? '★' : '☆';
    favBtn.onclick = () => toggleFavorite(lesson.id);
    const openBtn = node.querySelector('.open-btn');
    openBtn.dataset.lessonId = lesson.id;
    openBtn.onclick = () => openLesson(lesson.id);
    listView.appendChild(node);
  });
  listView.classList.remove('hidden');
  readerView.classList.add('hidden');
}

function renderCustomSections(lesson) {
  if (!Array.isArray(lesson.sections) || !lesson.sections.length) return '';
  return lesson.sections.map(section => `
    <div class="section-block">
      <h5>${section.title}</h5>
      <div class="bullet-list">
        ${section.items.map(item => `<div class="bullet-item">${item}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderDefaultSections(lesson) {
  return `
    <div class="section-block">
      <h5>คำศัพท์สำคัญ</h5>
      <div class="kv-list">
        ${lesson.vocab.map(([en, th]) => `<div class="kv-item"><strong>${en}</strong><span>${th}</span></div>`).join('')}
      </div>
    </div>
    <div class="section-block">
      <h5>ประโยคที่ใช้จริง</h5>
      <div class="sentence-list">
        ${lesson.sentences.map(([en, th]) => `<div class="sentence-item"><strong>${en}</strong><span>${th}</span></div>`).join('')}
      </div>
    </div>
    <div class="section-block">
      <h5>เคล็ดลับหน้างาน</h5>
      <div class="tip-list">
        ${lesson.tips.map(t => `<div class="tip-item">${t}</div>`).join('')}
      </div>
    </div>
  `;
}

function getEnglishItems() {
  const category = state.englishPack.subcategory;
  const query = state.englishPack.query.trim().toLowerCase();
  const safeCategory = ENGLISH_DATA[category] ? category : DEFAULT_ENGLISH_SUBCATEGORY;
  const source = ENGLISH_DATA[safeCategory]?.items || [];
  return source.filter(item => {
    const hay = `${item.term} ${item.reading} ${item.meaning}`.toLowerCase();
    return !query || hay.includes(query);
  });
}

function speakText(text) {
  if (!('speechSynthesis' in window)) {
    alert('เบราว์เซอร์นี้ยังไม่รองรับการอ่านเสียง');
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => /en-US|en_GB|English/i.test(v.lang + ' ' + v.name)) || voices.find(v => /^en/i.test(v.lang));
  if (preferred) u.voice = preferred;
  u.lang = preferred?.lang || 'en-US';
  u.rate = 0.9;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}

function renderEnglishPack() {
  const currentKey = ENGLISH_DATA[state.englishPack.subcategory] ? state.englishPack.subcategory : DEFAULT_ENGLISH_SUBCATEGORY;
  state.englishPack.subcategory = currentKey;
  const currentMeta = getEnglishMeta(currentKey);
  const items = getEnglishItems();
  const total = ENGLISH_ORDER.reduce((sum, key) => sum + (ENGLISH_DATA[key]?.items?.length || 0), 0);
  if (!total) {
    return `
      <div class="section-block">
        <h5>English: F&B</h5>
        <div class="empty-state">ไม่พบไฟล์คำศัพท์ภาษาอังกฤษ กรุณาใช้ไฟล์เวอร์ชันแก้ไขนี้แทนเวอร์ชันเดิม</div>
      </div>
    `;
  }
  return `
    <div class="section-block">
      <div class="english-pack-head">
        <div>
          <h5>หมวดคำศัพท์ภาษาอังกฤษ</h5>
          <p class="reader-summary">รวม 5 หมวดไว้ในหัวข้อเรียนเดียว: ร้านอาหาร, ผัก, ผลไม้, รับออเดอร์ และพูดคุย/ทักทาย</p>
        </div>
        <div class="muted-badge">รวมทั้งหมด ${total.toLocaleString()} คำ</div>
      </div>

      <div class="subtabs">
        ${ENGLISH_ORDER.map(key => `<button class="subtab ${key === currentKey ? 'active' : ''}" data-subcat="${key}">${getEnglishMeta(key).title}</button>`).join('')}
      </div>

      <div class="vocab-toolbar">
        <input id="englishSearchInput" type="search" placeholder="ค้นหาคำศัพท์ในหมวดนี้" value="${state.englishPack.query.replace(/"/g, '&quot;')}">
        <div class="muted-badge">${currentMeta.title} • ${items.length.toLocaleString()} คำ</div>
      </div>

      <div class="vocab-list">
        ${items.map(item => `
          <div class="vocab-row">
            <div class="vocab-main">
              <strong>${item.term}</strong>
              <div class="vocab-meta">คำอ่าน: ${item.reading}</div>
              <div class="vocab-meta">คำแปล: ${item.meaning}</div>
            </div>
            <button class="speak-mini" data-speak="${item.term.replace(/"/g, '&quot;')}">🔊 ฟังเสียง</button>
          </div>
        `).join('') || '<div class="empty-state">ไม่พบคำศัพท์ที่ค้นหา</div>'}
      </div>
    </div>

    <div class="section-block">
      <h5>วิธีใช้กับพนักงาน</h5>
      <div class="tip-list">
        <div class="tip-item">เริ่มจากหมวด 1 คำศัพท์ในร้านอาหาร เพื่อใช้หน้างานพื้นฐานก่อน</div>
        <div class="tip-item">หมวด 4 คำศัพท์รับออเดอร์ เหมาะสำหรับฝึกพูดก่อนเข้ากะ</div>
        <div class="tip-item">กดฟังเสียงทีละคำได้ทันที เพื่อฝึกการออกเสียงง่าย ๆ บนมือถือ</div>
      </div>
    </div>
  `;
}

function bindEnglishPackEvents(id) {
  document.querySelectorAll('[data-subcat]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.englishPack.subcategory = btn.dataset.subcat;
      state.englishPack.query = '';
      openLesson(id);
    });
  });
  const searchEl = el('englishSearchInput');
  if (searchEl) {
    searchEl.addEventListener('input', (e) => {
      state.englishPack.query = e.target.value || '';
      openLesson(id);
    });
  }
  document.querySelectorAll('[data-speak]').forEach(btn => {
    btn.addEventListener('click', () => speakText(btn.dataset.speak));
  });
}

function openLesson(id) {
  state.currentLessonId = id;
  const lesson = lessons.find(l => l.id === id);
  const note = state.userData.notes[id] || '';
  const lessonContent = lesson.type === 'english-pack'
    ? renderEnglishPack()
    : (lesson.sections
        ? renderCustomSections(lesson) + `
          <div class="section-block">
            <h5>สรุปสั้นสำหรับหน้างาน</h5>
            <div class="tip-list">
              ${lesson.tips.map(t => `<div class="tip-item">${t}</div>`).join('')}
            </div>
          </div>
        `
        : renderDefaultSections(lesson));

  readerView.innerHTML = `
    <div class="reader-top">
      <div>
        <div class="tags"><span class="tag">${lesson.category}</span><span class="tag">${lesson.level}</span></div>
        <h3 class="reader-title">${lesson.title}</h3>
        <p class="reader-summary">${lesson.summary}</p>
      </div>
      <button class="ghost-btn" id="backBtn">กลับหน้ารวม</button>
    </div>

    ${lessonContent}

    <div class="section-block">
      <h5>โน้ตส่วนตัว</h5>
      <textarea id="noteInput" rows="5" placeholder="จดสั้น ๆ เฉพาะที่อยากจำ">${note}</textarea>
    </div>

    <div class="reader-actions">
      <button class="primary-btn" id="markDoneBtn">${state.userData.completed.includes(id) ? 'อ่านจบแล้ว ✓' : 'ทำเครื่องหมายว่าอ่านจบ'}</button>
      <button class="ghost-btn" id="favReaderBtn">${state.userData.favorites.includes(id) ? 'เอาออกจากรายการโปรด' : 'บันทึกเป็นรายการโปรด'}</button>
      <button class="ghost-btn" id="saveNoteBtn">บันทึกโน้ต</button>
    </div>
  `;
  listView.classList.add('hidden');
  readerView.classList.remove('hidden');
  el('backBtn').onclick = renderList;
  el('markDoneBtn').onclick = () => toggleDone(id);
  el('favReaderBtn').onclick = () => toggleFavorite(id, true);
  el('saveNoteBtn').onclick = async () => {
    state.userData.notes[id] = el('noteInput').value.trim();
    await saveUserData();
    alert('บันทึกโน้ตแล้ว');
  };
  if (lesson.type === 'english-pack') bindEnglishPackEvents(id);
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    readerView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

async function toggleFavorite(id, rerenderReader = false) {
  const arr = state.userData.favorites;
  const idx = arr.indexOf(id);
  idx >= 0 ? arr.splice(idx, 1) : arr.push(id);
  await saveUserData();
  rerenderReader ? openLesson(id) : renderList();
}
async function toggleDone(id) {
  const arr = state.userData.completed;
  const idx = arr.indexOf(id);
  if (idx >= 0) arr.splice(idx, 1); else arr.push(id);
  await saveUserData();
  openLesson(id);
}
function updateStats() {
  el('doneCount').textContent = state.userData.completed.length;
  el('favCount').textContent = state.userData.favorites.length;
  el('noteCount').textContent = Object.values(state.userData.notes).filter(Boolean).length;
}

el('searchInput').addEventListener('input', e => {
  state.search = e.target.value;
  renderList();
});
el('logoutBtn').addEventListener('click', logout);
el('openSettings').addEventListener('click', () => {
  el('firebaseConfigInput').value = JSON.stringify(state.firebaseConfig, null, 2);
  settingsModal.showModal();
});
el('firebaseSetupBtn').addEventListener('click', () => {
  el('firebaseConfigInput').value = JSON.stringify(state.firebaseConfig, null, 2);
  settingsModal.showModal();
});
document.querySelectorAll('[data-close="settingsModal"]').forEach(btn => btn.addEventListener('click', () => settingsModal.close()));

el('saveFirebaseConfig').addEventListener('click', () => {
  alert('เวอร์ชันนี้ฝังค่า Firebase ไว้เรียบร้อยแล้ว ไม่ต้องวางค่าเพิ่ม');
  settingsModal.close();
});
el('clearFirebaseConfig').addEventListener('click', () => {
  alert('เวอร์ชันนี้ล็อกค่า Firebase ไว้ให้พร้อมใช้งาน จึงไม่แนะนำให้ล้างค่า');
});

el('demoModeBtn').addEventListener('click', () => {
  enterApp({ uid: 'local-demo', displayName: 'Demo User', email: '' });
});

el('authForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = el('email').value.trim();
  const password = el('password').value.trim();
  const displayName = el('displayName').value.trim();

  try {
    const { auth, authMod } = await ensureFirebase();

    if (state.authMode === 'register') {
      const cred = await authMod.createUserWithEmailAndPassword(auth, email, password);
      if (displayName) await authMod.updateProfile(cred.user, { displayName });
      state.userData.profile = { ...state.userData.profile, displayName, email };
      await enterApp({ uid: cred.user.uid, displayName: displayName || cred.user.email, email: cred.user.email });
    } else {
      const cred = await authMod.signInWithEmailAndPassword(auth, email, password);
      await enterApp({ uid: cred.user.uid, displayName: cred.user.displayName || cred.user.email, email: cred.user.email });
    }
  } catch (err) {
    alert(`เข้าสู่ระบบไม่สำเร็จ: ${err.message}`);
  }
});

async function initAuthPersistence() {
  try {
    const { auth, authMod } = await ensureFirebase();
    authMod.onAuthStateChanged(auth, async (user) => {
      if (user) {
        await enterApp({ uid: user.uid, displayName: user.displayName || user.email, email: user.email });
      }
    });
  } catch (err) {
    console.error('Firebase init failed:', err);
  }
}

setAuthMode('login');
initAuthPersistence();
