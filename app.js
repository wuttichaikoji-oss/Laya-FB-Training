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
    title: 'Temperature Control',
    summary: 'แนวคิดพื้นฐานเรื่องอุณหภูมิอาหารเพื่อความปลอดภัย',
    vocab: [
      ['Hot holding', 'การเก็บอาหารร้อน'],
      ['Cold holding', 'การเก็บอาหารเย็น'],
      ['Danger zone', 'ช่วงอุณหภูมิเสี่ยง'],
      ['Reheat', 'อุ่นซ้ำ'],
      ['Thermometer', 'เทอร์โมมิเตอร์']
    ],
    sentences: [
      ['Keep hot food hot and cold food cold.', 'เก็บอาหารร้อนให้ร้อน และอาหารเย็นให้เย็น'],
      ['Check the temperature regularly.', 'ตรวจสอบอุณหภูมิอย่างสม่ำเสมอ']
    ],
    tips: [
      'อย่าวางอาหารทิ้งไว้ในอุณหภูมิห้องนานเกินจำเป็น',
      'บุฟเฟต์ต้องมีการเช็กอุณหภูมิเป็นรอบ',
      'ถ้าไม่มั่นใจในความปลอดภัย ให้หยุดเสิร์ฟและถามหัวหน้าทันที'
    ]
  },
  {
    id: 'service-greeting',
    category: 'Service',
    level: 'Core',
    title: 'Greeting Guest',
    summary: 'วิธีต้อนรับแขกอย่างมืออาชีพตั้งแต่วินาทีแรก',
    vocab: [
      ['Greeting', 'การทักทาย'],
      ['Reservation', 'การจองโต๊ะ'],
      ['Escort', 'พาไปที่โต๊ะ'],
      ['Menu presentation', 'การยื่นเมนู'],
      ['Warm welcome', 'การต้อนรับอย่างอบอุ่น']
    ],
    sentences: [
      ['Good evening and welcome.', 'สวัสดีตอนเย็น ยินดีต้อนรับค่ะ'],
      ['Do you have a reservation?', 'ได้จองโต๊ะไว้ไหมคะ'],
      ['Please follow me.', 'เชิญทางนี้ค่ะ']
    ],
    tips: [
      'ภายใน 10 วินาทีแรก แขกควรได้รับการทักทาย',
      'เดินนำแขกด้วยความเร็วเหมาะสม',
      'ยื่นเมนูอย่างเรียบร้อยและแนะนำชื่อพนักงานถ้าเหมาะสม'
    ]
  },
  {
    id: 'wine-basic',
    category: 'Beverage',
    level: 'Core',
    title: 'Wine Basic Service',
    summary: 'พื้นฐานการเสิร์ฟไวน์สำหรับพนักงานห้องอาหาร',
    vocab: [
      ['Vintage', 'ปีที่ผลิต'],
      ['Bottle', 'ขวด'],
      ['Pour', 'ริน'],
      ['Taste', 'ให้ชิม'],
      ['Glassware', 'แก้วที่ใช้เสิร์ฟ']
    ],
    sentences: [
      ['May I present the wine?', 'ขออนุญาตนำเสนอไวน์นะคะ'],
      ['Please check the label and vintage.', 'กรุณาตรวจสอบฉลากและวินเทจค่ะ'],
      ['May I pour for you?', 'ขออนุญาตรินให้ค่ะ']
    ],
    tips: [
      'แสดงฉลากให้แขกเห็นก่อนเปิดเสมอ',
      'รินให้เจ้าภาพชิมก่อน',
      'เช็ดปากขวดหลังรินเพื่อลดหยดเลอะ'
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
