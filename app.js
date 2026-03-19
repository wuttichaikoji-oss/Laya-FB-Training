
const ENGLISH_DATA = {"restaurant": {"title": "1. คำศัพท์ในร้านอาหาร", "items": [{"term": "Menu", "reading": "เมนู", "meaning": "รายการอาหาร"}, {"term": "Order", "reading": "ออเดอร์", "meaning": "คำสั่งอาหาร / การสั่งอาหาร"}, {"term": "Bill", "reading": "บิล", "meaning": "บิลค่าอาหาร"}, {"term": "Check", "reading": "เช็ก", "meaning": "บิล / ใบเรียกเก็บเงิน"}, {"term": "Receipt", "reading": "รีซีต", "meaning": "ใบเสร็จรับเงิน"}, {"term": "Reservation", "reading": "เรเซอร์เวชัน", "meaning": "การจองโต๊ะ"}, {"term": "Booking", "reading": "บุ๊กกิง", "meaning": "การจอง"}, {"term": "Walk-in", "reading": "วอล์กอิน", "meaning": "ลูกค้าที่ไม่ได้จองล่วงหน้า"}, {"term": "Table", "reading": "เทเบิล", "meaning": "โต๊ะ"}, {"term": "Chair", "reading": "แชร์", "meaning": "เก้าอี้"}, {"term": "Guest", "reading": "เกสต์", "meaning": "แขก / ลูกค้า"}, {"term": "Customer", "reading": "คัสตะเมอร์", "meaning": "ลูกค้า"}, {"term": "Diner", "reading": "ไดเนอร์", "meaning": "ผู้มารับประทานอาหาร"}, {"term": "Server", "reading": "เซอร์เวอร์", "meaning": "พนักงานเสิร์ฟ"}, {"term": "Waiter", "reading": "เวทเทอร์", "meaning": "พนักงานเสิร์ฟชาย"}, {"term": "Waitress", "reading": "เวทเทรส", "meaning": "พนักงานเสิร์ฟหญิง"}, {"term": "Host", "reading": "โฮสต์", "meaning": "พนักงานต้อนรับ"}, {"term": "Hostess", "reading": "โฮสเตส", "meaning": "พนักงานต้อนรับหญิง"}, {"term": "Cashier", "reading": "แคชเชียร์", "meaning": "แคชเชียร์ / พนักงานรับเงิน"}, {"term": "Chef", "reading": "เชฟ", "meaning": "เชฟ"}, {"term": "Cook", "reading": "คุก", "meaning": "พ่อครัว / แม่ครัว"}, {"term": "Kitchen", "reading": "คิทเชิน", "meaning": "ครัว"}, {"term": "Dining room", "reading": "ไดนิงรูม", "meaning": "ห้องอาหาร"}, {"term": "Restaurant", "reading": "เรสเตอรองต์", "meaning": "ร้านอาหาร"}, {"term": "Outlet", "reading": "เอาต์เลต", "meaning": "จุดขาย / ห้องอาหารแต่ละส่วน"}, {"term": "Terrace", "reading": "เทอร์เรซ", "meaning": "ระเบียง / โซนนั่งด้านนอก"}, {"term": "Counter", "reading": "เคาน์เตอร์", "meaning": "เคาน์เตอร์"}, {"term": "Bar", "reading": "บาร์", "meaning": "บาร์เครื่องดื่ม"}, {"term": "Buffet", "reading": "บุฟเฟต์", "meaning": "บุฟเฟต์"}, {"term": "Live station", "reading": "ไลฟ์สเตชัน", "meaning": "สถานีปรุงสด"}, {"term": "Service station", "reading": "เซอร์วิสสเตชัน", "meaning": "จุดเตรียมงานบริการ"}, {"term": "Side station", "reading": "ไซด์สเตชัน", "meaning": "จุดวางอุปกรณ์บริการ"}, {"term": "Uniform", "reading": "ยูนิฟอร์ม", "meaning": "เครื่องแบบ"}, {"term": "Name tag", "reading": "เนมแท็ก", "meaning": "ป้ายชื่อ"}, {"term": "Tray", "reading": "เทรย์", "meaning": "ถาด"}, {"term": "Plate", "reading": "เพลต", "meaning": "จาน"}, {"term": "Bowl", "reading": "โบวล์", "meaning": "ชาม"}, {"term": "Cup", "reading": "คัพ", "meaning": "ถ้วย"}, {"term": "Mug", "reading": "มั๊ก", "meaning": "แก้วมีหู"}, {"term": "Glass", "reading": "กลาส", "meaning": "แก้ว"}, {"term": "Wine glass", "reading": "ไวน์กลาส", "meaning": "แก้วไวน์"}, {"term": "Beer glass", "reading": "เบียร์กลาส", "meaning": "แก้วเบียร์"}, {"term": "Water glass", "reading": "วอเทอร์กลาส", "meaning": "แก้วน้ำ"}, {"term": "Fork", "reading": "ฟอร์ก", "meaning": "ส้อม"}, {"term": "Knife", "reading": "ไนฟ์", "meaning": "มีด"}, {"term": "Spoon", "reading": "สปูน", "meaning": "ช้อน"}, {"term": "Teaspoon", "reading": "ทีสปูน", "meaning": "ช้อนชา"}, {"term": "Dessert spoon", "reading": "ดีเสิร์ตสปูน", "meaning": "ช้อนของหวาน"}, {"term": "Chopsticks", "reading": "ชอปสติกส์", "meaning": "ตะเกียบ"}, {"term": "Napkin", "reading": "แนปกิน", "meaning": "ผ้าเช็ดปาก"}, {"term": "Tablecloth", "reading": "เทเบิลคลอธ", "meaning": "ผ้าปูโต๊ะ"}, {"term": "Placemat", "reading": "เพลสแมต", "meaning": "แผ่นรองจาน"}, {"term": "Coaster", "reading": "โคสเตอร์", "meaning": "ที่รองแก้ว"}, {"term": "Menu holder", "reading": "เมนูโฮลเดอร์", "meaning": "ที่ใส่เมนู"}, {"term": "Bill folder", "reading": "บิลโฟลเดอร์", "meaning": "แฟ้มใส่บิล"}, {"term": "Straw", "reading": "สตรอว์", "meaning": "หลอด"}, {"term": "Ice bucket", "reading": "ไอซ์บักเก็ต", "meaning": "ถังน้ำแข็ง"}, {"term": "Bottle opener", "reading": "บอตเทิลโอเพอเนอร์", "meaning": "ที่เปิดขวด"}, {"term": "Corkscrew", "reading": "คอร์กสกรู", "meaning": "ที่เปิดไวน์"}, {"term": "Decanter", "reading": "ดีแคนเตอร์", "meaning": "ภาชนะถ่ายไวน์"}, {"term": "Tongs", "reading": "ท็องส์", "meaning": "คีมคีบอาหาร"}, {"term": "Serving spoon", "reading": "เซอร์วิ่งสปูน", "meaning": "ช้อนเสิร์ฟ"}, {"term": "Soup ladle", "reading": "ซุปเลเดิล", "meaning": "กระบวยซุป"}, {"term": "Set menu", "reading": "เซ็ตเมนู", "meaning": "เมนูชุด"}, {"term": "À la carte", "reading": "อะลาคาร์ต", "meaning": "อาหารจานเดี่ยว"}, {"term": "Signature dish", "reading": "ซิกเนเจอร์ดิช", "meaning": "เมนูเด่นของร้าน"}, {"term": "Appetizer", "reading": "แอพิไทเซอร์", "meaning": "อาหารเรียกน้ำย่อย"}, {"term": "Soup", "reading": "ซุป", "meaning": "ซุป"}, {"term": "Salad", "reading": "สลัด", "meaning": "สลัด"}, {"term": "Main course", "reading": "เมนคอร์ส", "meaning": "อาหารจานหลัก"}, {"term": "Side dish", "reading": "ไซด์ดิช", "meaning": "เครื่องเคียง"}, {"term": "Dessert", "reading": "ดีเสิร์ต", "meaning": "ของหวาน"}, {"term": "Beverage", "reading": "เบฟเวอริจ", "meaning": "เครื่องดื่ม"}, {"term": "Soft drink", "reading": "ซอฟต์ดริงก์", "meaning": "น้ำอัดลม / เครื่องดื่มไม่มีแอลกอฮอล์"}, {"term": "Mocktail", "reading": "ม็อกเทล", "meaning": "เครื่องดื่มไม่มีแอลกอฮอล์"}, {"term": "Cocktail", "reading": "ค็อกเทล", "meaning": "ค็อกเทล"}, {"term": "Wine", "reading": "ไวน์", "meaning": "ไวน์"}, {"term": "Beer", "reading": "เบียร์", "meaning": "เบียร์"}, {"term": "Spirit", "reading": "สปิริต", "meaning": "สุรากลั่น"}, {"term": "Coffee", "reading": "คอฟฟี่", "meaning": "กาแฟ"}, {"term": "Tea", "reading": "ที", "meaning": "ชา"}, {"term": "Juice", "reading": "จูซ", "meaning": "น้ำผลไม้"}, {"term": "Mineral water", "reading": "มิเนอรัลวอเทอร์", "meaning": "น้ำแร่"}, {"term": "Still water", "reading": "สติลวอเทอร์", "meaning": "น้ำเปล่า"}, {"term": "Sparkling water", "reading": "สปาร์กลิงวอเทอร์", "meaning": "น้ำอัดก๊าซ"}, {"term": "Refill", "reading": "รีฟิล", "meaning": "เติมเพิ่ม"}, {"term": "Complimentary", "reading": "คอมพลิเมนทารี", "meaning": "ฟรีจากทางร้าน"}, {"term": "Available", "reading": "อะเวลละเบิล", "meaning": "มีขาย / พร้อมเสิร์ฟ"}, {"term": "Sold out", "reading": "โซลด์เอาต์", "meaning": "หมด"}, {"term": "Recommended", "reading": "เรคคอมเมนดิด", "meaning": "แนะนำ"}, {"term": "Special", "reading": "สเปเชียล", "meaning": "เมนูพิเศษ"}, {"term": "Promotion", "reading": "โปรโมชั่น", "meaning": "โปรโมชั่น"}, {"term": "Service charge", "reading": "เซอร์วิสชาร์จ", "meaning": "ค่าบริการ"}, {"term": "VAT", "reading": "แวต", "meaning": "ภาษีมูลค่าเพิ่ม"}, {"term": "Spicy", "reading": "สไปซี่", "meaning": "เผ็ด"}, {"term": "Sweet", "reading": "สวีต", "meaning": "หวาน"}, {"term": "Sour", "reading": "ซาวร์", "meaning": "เปรี้ยว"}, {"term": "Salty", "reading": "ซอลที", "meaning": "เค็ม"}, {"term": "Bitter", "reading": "บิทเทอร์", "meaning": "ขม"}, {"term": "Crispy", "reading": "คริสปี", "meaning": "กรอบ"}, {"term": "Grilled", "reading": "กริลด์", "meaning": "ย่าง"}, {"term": "Fried", "reading": "ฟรายด์", "meaning": "ทอด"}, {"term": "Steamed", "reading": "สตีมด์", "meaning": "นึ่ง"}, {"term": "Baked", "reading": "เบกด์", "meaning": "อบ"}, {"term": "Roasted", "reading": "โรสเต็ด", "meaning": "ย่างอบ"}, {"term": "Rare", "reading": "แรร์", "meaning": "สุกน้อย"}, {"term": "Medium rare", "reading": "มีเดียมแรร์", "meaning": "กึ่งสุกน้อย"}, {"term": "Medium", "reading": "มีเดียม", "meaning": "สุกปานกลาง"}, {"term": "Medium well", "reading": "มีเดียมเวล", "meaning": "กึ่งสุกมาก"}, {"term": "Well done", "reading": "เวลด้ัน", "meaning": "สุกมาก"}, {"term": "Allergy", "reading": "แอลลอร์จี", "meaning": "อาการแพ้อาหาร"}, {"term": "Ingredient", "reading": "อินกรีเดียนต์", "meaning": "ส่วนผสม"}, {"term": "Portion", "reading": "พอร์ชัน", "meaning": "ขนาดเสิร์ฟ"}, {"term": "Garnish", "reading": "การ์นิช", "meaning": "ของตกแต่งจาน"}, {"term": "Plating", "reading": "เพลตติง", "meaning": "การจัดจาน"}, {"term": "Cutlery", "reading": "คัตเลอรี", "meaning": "ชุดมีดส้อมช้อน"}, {"term": "Glassware", "reading": "กลาสแวร์", "meaning": "เครื่องแก้ว"}, {"term": "Table setup", "reading": "เทเบิลเซ็ตอัป", "meaning": "การจัดโต๊ะ"}, {"term": "Booking list", "reading": "บุ๊กกิงลิสต์", "meaning": "รายการจอง"}, {"term": "No-show", "reading": "โนโชว์", "meaning": "ลูกค้าไม่มาตามจอง"}, {"term": "Cover", "reading": "คัฟเวอร์", "meaning": "จำนวนลูกค้าที่รับบริการ"}]}, "vegetables": {"title": "2. คำศัพท์ผัก", "items": [{"term": "Asparagus", "reading": "แอสพารากัส", "meaning": "หน่อไม้ฝรั่ง"}, {"term": "Artichoke", "reading": "อาร์ติโชก", "meaning": "อาร์ติโชก"}, {"term": "Arugula", "reading": "อะรูกูลา", "meaning": "ผักร็อกเก็ต"}, {"term": "Amaranth", "reading": "อะมารันท์", "meaning": "ผักโขมแดง / ผักโขมไทย"}, {"term": "Bamboo shoot", "reading": "แบมบูชูต", "meaning": "หน่อไม้"}, {"term": "Basil", "reading": "เบซิล", "meaning": "โหระพา"}, {"term": "Bean sprout", "reading": "บีนสเปราต์", "meaning": "ถั่วงอก"}, {"term": "Beetroot", "reading": "บีตรูต", "meaning": "บีตรูต"}, {"term": "Bell pepper", "reading": "เบลล์เปปเปอร์", "meaning": "พริกหวาน"}, {"term": "Bitter gourd", "reading": "บิทเทอร์กอร์ด", "meaning": "มะระ"}, {"term": "Bok choy", "reading": "บ็อกชอย", "meaning": "ผักกวางตุ้งฮ่องเต้"}, {"term": "Broccoli", "reading": "บรอกโคลี", "meaning": "บรอกโคลี"}, {"term": "Brussels sprouts", "reading": "บรัสเซลส์สเปราต์", "meaning": "กะหล่ำดาว"}, {"term": "Cabbage", "reading": "แคบบิจ", "meaning": "กะหล่ำปลี"}, {"term": "Carrot", "reading": "แคร์รอต", "meaning": "แครอท"}, {"term": "Cauliflower", "reading": "คอลลีฟลาวเวอร์", "meaning": "ดอกกะหล่ำ"}, {"term": "Celery", "reading": "เซเลอรี", "meaning": "ขึ้นฉ่ายฝรั่ง"}, {"term": "Celery root", "reading": "เซเลอรีรูต", "meaning": "หัวเซเลอรี"}, {"term": "Chayote", "reading": "ชาโยเต", "meaning": "มะระหวาน / ฟักแม้ว"}, {"term": "Chili", "reading": "ชิลลี", "meaning": "พริก"}, {"term": "Chinese broccoli", "reading": "ไชนีสบรอกโคลี", "meaning": "คะน้า"}, {"term": "Chinese cabbage", "reading": "ไชนีสแคบบิจ", "meaning": "ผักกาดขาว"}, {"term": "Chive", "reading": "ไชฟ์", "meaning": "กุยช่าย"}, {"term": "Cilantro", "reading": "ซิแลนโทร", "meaning": "ผักชี"}, {"term": "Coriander root", "reading": "คอเรียนเดอร์รูต", "meaning": "รากผักชี"}, {"term": "Corn", "reading": "คอร์น", "meaning": "ข้าวโพด"}, {"term": "Baby corn", "reading": "เบบี้คอร์น", "meaning": "ข้าวโพดอ่อน"}, {"term": "Cucumber", "reading": "คิวคัมเบอร์", "meaning": "แตงกวา"}, {"term": "Daikon", "reading": "ไดกอน", "meaning": "หัวไชเท้า"}, {"term": "Dill", "reading": "ดิลล์", "meaning": "ผักชีลาว"}, {"term": "Eggplant", "reading": "เอ้กแพลนต์", "meaning": "มะเขือม่วง"}, {"term": "Thai eggplant", "reading": "ไทยเอ้กแพลนต์", "meaning": "มะเขือเปราะ"}, {"term": "Endive", "reading": "เอนไดฟ์", "meaning": "เอนไดฟ์"}, {"term": "Fennel", "reading": "เฟนเนล", "meaning": "ยี่หร่าฝรั่ง"}, {"term": "Garlic", "reading": "การ์ลิก", "meaning": "กระเทียม"}, {"term": "Ginger", "reading": "จินเจอร์", "meaning": "ขิง"}, {"term": "Galangal", "reading": "กาลังกัล", "meaning": "ข่า"}, {"term": "Green bean", "reading": "กรีนบีน", "meaning": "ถั่วแขก"}, {"term": "Long bean", "reading": "ลองบีน", "meaning": "ถั่วฝักยาว"}, {"term": "Kale", "reading": "เคล", "meaning": "เคล"}, {"term": "Kohlrabi", "reading": "โคห์ลราบี", "meaning": "กะหล่ำหัว"}, {"term": "Leek", "reading": "ลีก", "meaning": "ต้นกระเทียมฝรั่ง"}, {"term": "Lettuce", "reading": "เลตทิซ", "meaning": "ผักกาดหอม"}, {"term": "Romaine", "reading": "โรเมน", "meaning": "ผักกาดโรเมน"}, {"term": "Iceberg lettuce", "reading": "ไอซ์เบิร์กเลตทิซ", "meaning": "ผักกาดแก้ว"}, {"term": "Mint", "reading": "มินต์", "meaning": "สะระแหน่"}, {"term": "Mushroom", "reading": "มัชรูม", "meaning": "เห็ด"}, {"term": "Button mushroom", "reading": "บัตตันมัชรูม", "meaning": "เห็ดแชมปิญอง"}, {"term": "Enoki mushroom", "reading": "เอโนกิมัชรูม", "meaning": "เห็ดเข็มทอง"}, {"term": "Shiitake mushroom", "reading": "ชิอิตาเกะมัชรูม", "meaning": "เห็ดหอม"}, {"term": "Oyster mushroom", "reading": "ออยสเตอร์มัชรูม", "meaning": "เห็ดนางรม"}, {"term": "King oyster mushroom", "reading": "คิงออยสเตอร์มัชรูม", "meaning": "เห็ดออรินจิ"}, {"term": "Straw mushroom", "reading": "สตรอว์มัชรูม", "meaning": "เห็ดฟาง"}, {"term": "Wood ear mushroom", "reading": "วูดเอียร์มัชรูม", "meaning": "เห็ดหูหนู"}, {"term": "Black fungus", "reading": "แบล็กฟังกัส", "meaning": "เห็ดหูหนูดำ"}, {"term": "Napa cabbage", "reading": "นาปาแคบบิจ", "meaning": "ผักกาดขาวปลี"}, {"term": "Mustard green", "reading": "มัสตาร์ดกรีน", "meaning": "ผักกาดเขียว"}, {"term": "Okra", "reading": "โอกรา", "meaning": "กระเจี๊ยบเขียว"}, {"term": "Onion", "reading": "ออเนียน", "meaning": "หัวหอม"}, {"term": "Red onion", "reading": "เรดออเนียน", "meaning": "หอมแดงใหญ่"}, {"term": "Parsley", "reading": "พาร์สลีย์", "meaning": "พาร์สลีย์"}, {"term": "Pea", "reading": "พี", "meaning": "ถั่วลันเตา"}, {"term": "Snow pea", "reading": "สโนว์พี", "meaning": "ถั่วลันเตาหวาน"}, {"term": "Sugar snap pea", "reading": "ชูการ์สแน็ปพี", "meaning": "ถั่วหวาน"}, {"term": "Pea shoot", "reading": "พีชูต", "meaning": "ยอดถั่วลันเตา"}, {"term": "Potato", "reading": "โพเทโท", "meaning": "มันฝรั่ง"}, {"term": "Sweet potato", "reading": "สวีตโพเทโท", "meaning": "มันหวาน"}, {"term": "Pumpkin", "reading": "พัมพ์คิน", "meaning": "ฟักทอง"}, {"term": "Radish", "reading": "แรดิช", "meaning": "หัวไชเท้าแดง"}, {"term": "Red cabbage", "reading": "เรดแคบบิจ", "meaning": "กะหล่ำปลีม่วง"}, {"term": "Rosemary", "reading": "โรสแมรี", "meaning": "โรสแมรี"}, {"term": "Sage", "reading": "เสจ", "meaning": "เสจ"}, {"term": "Oregano", "reading": "ออริกาโน", "meaning": "ออริกาโน"}, {"term": "Shallot", "reading": "แชลลอต", "meaning": "หอมแดง"}, {"term": "Scallion", "reading": "สแกลเลียน", "meaning": "ต้นหอม"}, {"term": "Spring onion", "reading": "สปริงออเนียน", "meaning": "ต้นหอม"}, {"term": "Spinach", "reading": "สปินาช", "meaning": "ผักโขม"}, {"term": "Swiss chard", "reading": "สวิสชาร์ด", "meaning": "สวิสชาร์ด"}, {"term": "Taro", "reading": "ทาโร", "meaning": "เผือก"}, {"term": "Thyme", "reading": "ไทม์", "meaning": "ไทม์"}, {"term": "Tomato", "reading": "โทเมโท", "meaning": "มะเขือเทศ"}, {"term": "Cherry tomato", "reading": "เชอร์รีโทเมโท", "meaning": "มะเขือเทศเชอร์รี"}, {"term": "Turnip", "reading": "เทอร์นิป", "meaning": "หัวผักกาด"}, {"term": "Turnip green", "reading": "เทอร์นิปกรีน", "meaning": "ใบหัวผักกาด"}, {"term": "Water spinach", "reading": "วอเทอร์สปินาช", "meaning": "ผักบุ้ง"}, {"term": "Watercress", "reading": "วอเทอร์เครส", "meaning": "วอเตอร์เครส"}, {"term": "Zucchini", "reading": "ซูกินี", "meaning": "ซูกินี"}, {"term": "Yam bean", "reading": "แยมห์บีน", "meaning": "มันแกว"}, {"term": "Lotus root", "reading": "โลตัสรูต", "meaning": "รากบัว"}, {"term": "Turmeric", "reading": "เทอร์เมอริก", "meaning": "ขมิ้น"}, {"term": "Lemongrass", "reading": "เลมอนกราส", "meaning": "ตะไคร้"}, {"term": "Kaffir lime leaf", "reading": "คัฟเฟอร์ไลม์ลีฟ", "meaning": "ใบมะกรูด"}, {"term": "Horseradish", "reading": "ฮอร์สแรดิช", "meaning": "ฮอร์สแรดิช"}, {"term": "Parsnip", "reading": "พาร์สนิป", "meaning": "พาร์สนิป"}, {"term": "Rutabaga", "reading": "รูตาบากา", "meaning": "หัวผักกาดสวีเดน"}, {"term": "Beet green", "reading": "บีตกรีน", "meaning": "ใบหัวบีต"}, {"term": "Mustard leaf", "reading": "มัสตาร์ดลีฟ", "meaning": "ใบมัสตาร์ด"}, {"term": "Sesame leaf", "reading": "เซซามีลีฟ", "meaning": "ใบงา"}, {"term": "Sorrel", "reading": "ซอร์เรล", "meaning": "ซอร์เรล"}, {"term": "Curry leaf", "reading": "เคอร์รีลีฟ", "meaning": "ใบกะหรี่"}, {"term": "Thai basil", "reading": "ไทยเบซิล", "meaning": "กะเพรา"}, {"term": "Holy basil", "reading": "โฮลีเบซิล", "meaning": "กะเพรา"}, {"term": "Sawtooth coriander", "reading": "ซอว์ทูธคอเรียนเดอร์", "meaning": "ผักชีฝรั่ง"}, {"term": "Morning glory", "reading": "มอร์นิงกลอรี", "meaning": "ผักบุ้งจีน"}, {"term": "Green chili", "reading": "กรีนชิลลี", "meaning": "พริกเขียว"}, {"term": "Red chili", "reading": "เรดชิลลี", "meaning": "พริกแดง"}, {"term": "Yellow pepper", "reading": "เยลโลว์เปปเปอร์", "meaning": "พริกหวานสีเหลือง"}, {"term": "Red pepper", "reading": "เรดเปปเปอร์", "meaning": "พริกหวานสีแดง"}, {"term": "Green pepper", "reading": "กรีนเปปเปอร์", "meaning": "พริกหวานสีเขียว"}, {"term": "Cassava leaf", "reading": "คาสซาวาลีฟ", "meaning": "ใบมันสำปะหลัง"}, {"term": "Winged bean", "reading": "วิงด์บีน", "meaning": "ถั่วพู"}, {"term": "Yardlong bean", "reading": "ยาร์ดลองบีน", "meaning": "ถั่วฝักยาว"}, {"term": "Cassava", "reading": "คาสซาวา", "meaning": "มันสำปะหลัง"}, {"term": "Tapioca leaf", "reading": "ทาปิโอกาลีฟ", "meaning": "ใบมันสำปะหลัง"}, {"term": "Burdock", "reading": "เบอร์ด็อก", "meaning": "โกโบ / รากเจ้าชู้"}]}, "fruits": {"title": "3. คำศัพท์ผลไม้", "items": [{"term": "Apple", "reading": "แอปเปิล", "meaning": "แอปเปิล"}, {"term": "Green apple", "reading": "กรีนแอปเปิล", "meaning": "แอปเปิลเขียว"}, {"term": "Red apple", "reading": "เรดแอปเปิล", "meaning": "แอปเปิลแดง"}, {"term": "Apricot", "reading": "แอปริคอต", "meaning": "แอปริคอต"}, {"term": "Avocado", "reading": "อะโวคาโด", "meaning": "อะโวคาโด"}, {"term": "Banana", "reading": "บานานา", "meaning": "กล้วย"}, {"term": "Baby banana", "reading": "เบบี้บานานา", "meaning": "กล้วยน้ำว้า"}, {"term": "Cavendish banana", "reading": "คาเวนดิชบานานา", "meaning": "กล้วยหอม"}, {"term": "Plantain", "reading": "แพลนเทน", "meaning": "กล้วยสำหรับปรุงอาหาร"}, {"term": "Bilberry", "reading": "บิลเบอร์รี", "meaning": "บิลเบอร์รี"}, {"term": "Blackberry", "reading": "แบล็กเบอร์รี", "meaning": "แบล็กเบอร์รี"}, {"term": "Blackcurrant", "reading": "แบล็กเคอร์แรนต์", "meaning": "แบล็กเคอร์แรนต์"}, {"term": "Blueberry", "reading": "บลูเบอร์รี", "meaning": "บลูเบอร์รี"}, {"term": "Boysenberry", "reading": "บอยเซนเบอร์รี", "meaning": "บอยเซนเบอร์รี"}, {"term": "Breadfruit", "reading": "เบรดฟรุต", "meaning": "สาเก"}, {"term": "Cantaloupe", "reading": "แคนตาลูป", "meaning": "แคนตาลูป"}, {"term": "Carambola", "reading": "คารัมโบลา", "meaning": "มะเฟือง"}, {"term": "Cashew apple", "reading": "แคชชิวแอปเปิล", "meaning": "ผลมะม่วงหิมพานต์"}, {"term": "Cherry", "reading": "เชอร์รี", "meaning": "เชอร์รี"}, {"term": "Clementine", "reading": "เคลเมนไทน์", "meaning": "ส้มเคลเมนไทน์"}, {"term": "Coconut", "reading": "โคโคนัต", "meaning": "มะพร้าว"}, {"term": "Cranberry", "reading": "แครนเบอร์รี", "meaning": "แครนเบอร์รี"}, {"term": "Currant", "reading": "เคอร์แรนต์", "meaning": "เคอร์แรนต์"}, {"term": "Date", "reading": "เดต", "meaning": "อินทผลัม"}, {"term": "Dragon fruit", "reading": "ดรากอนฟรุต", "meaning": "แก้วมังกร"}, {"term": "White dragon fruit", "reading": "ไวต์ดรากอนฟรุต", "meaning": "แก้วมังกรเนื้อขาว"}, {"term": "Red dragon fruit", "reading": "เรดดรากอนฟรุต", "meaning": "แก้วมังกรเนื้อแดง"}, {"term": "Durian", "reading": "ดูเรียน", "meaning": "ทุเรียน"}, {"term": "Elderberry", "reading": "เอลเดอร์เบอร์รี", "meaning": "เอลเดอร์เบอร์รี"}, {"term": "Fig", "reading": "ฟิก", "meaning": "มะเดื่อฝรั่ง"}, {"term": "Gooseberry", "reading": "กูสเบอร์รี", "meaning": "กูสเบอร์รี"}, {"term": "Grape", "reading": "เกรป", "meaning": "องุ่น"}, {"term": "Green grape", "reading": "กรีนเกรป", "meaning": "องุ่นเขียว"}, {"term": "Red grape", "reading": "เรดเกรป", "meaning": "องุ่นแดง"}, {"term": "Black grape", "reading": "แบล็กเกรป", "meaning": "องุ่นดำ"}, {"term": "Grapefruit", "reading": "เกรปฟรุต", "meaning": "เกรปฟรุต"}, {"term": "Guava", "reading": "กวาวา", "meaning": "ฝรั่ง"}, {"term": "Honeydew", "reading": "ฮันนีดิว", "meaning": "เมลอนฮันนีดิว"}, {"term": "Jackfruit", "reading": "แจ็กฟรุต", "meaning": "ขนุน"}, {"term": "Jujube", "reading": "จูจูบ", "meaning": "พุทรา"}, {"term": "Kiwi", "reading": "กีวี", "meaning": "กีวี"}, {"term": "Golden kiwi", "reading": "โกลเดนกีวี", "meaning": "กีวีสีทอง"}, {"term": "Kumquat", "reading": "คัมควอต", "meaning": "ส้มจี๊ดฝรั่ง"}, {"term": "Lemon", "reading": "เลมอน", "meaning": "มะนาวเหลือง"}, {"term": "Lime", "reading": "ไลม์", "meaning": "มะนาว"}, {"term": "Longan", "reading": "ลองแกน", "meaning": "ลำไย"}, {"term": "Loquat", "reading": "โลควอต", "meaning": "บ๊วยญี่ปุ่น"}, {"term": "Lychee", "reading": "ไลชี", "meaning": "ลิ้นจี่"}, {"term": "Mandarin", "reading": "แมนดาริน", "meaning": "ส้มแมนดาริน"}, {"term": "Mango", "reading": "แมงโก", "meaning": "มะม่วง"}, {"term": "Green mango", "reading": "กรีนแมงโก", "meaning": "มะม่วงดิบ"}, {"term": "Ripe mango", "reading": "ไรป์แมงโก", "meaning": "มะม่วงสุก"}, {"term": "Mangosteen", "reading": "แมงโกสทีน", "meaning": "มังคุด"}, {"term": "Mulberry", "reading": "มัลเบอร์รี", "meaning": "หม่อน"}, {"term": "Muskmelon", "reading": "มัสก์เมลอน", "meaning": "เมลอน"}, {"term": "Nectarine", "reading": "เนคทารีน", "meaning": "เนคทารีน"}, {"term": "Olive", "reading": "ออลิฟ", "meaning": "มะกอก"}, {"term": "Orange", "reading": "ออเรนจ์", "meaning": "ส้ม"}, {"term": "Blood orange", "reading": "บลัดออเรนจ์", "meaning": "ส้มเลือด"}, {"term": "Papaya", "reading": "พาเพยา", "meaning": "มะละกอ"}, {"term": "Passion fruit", "reading": "แพชชันฟรุต", "meaning": "เสาวรส"}, {"term": "Peach", "reading": "พีช", "meaning": "ลูกพีช"}, {"term": "Pear", "reading": "แพร์", "meaning": "ลูกแพร์"}, {"term": "Persimmon", "reading": "เพอร์ซิมมอน", "meaning": "ลูกพลับ"}, {"term": "Pineapple", "reading": "ไพน์แอปเปิล", "meaning": "สับปะรด"}, {"term": "Plum", "reading": "พลัม", "meaning": "พลัม"}, {"term": "Pomegranate", "reading": "พอมิกราเนต", "meaning": "ทับทิม"}, {"term": "Pomelo", "reading": "พอเมโล", "meaning": "ส้มโอ"}, {"term": "Quince", "reading": "ควินซ์", "meaning": "ควินซ์"}, {"term": "Rambutan", "reading": "แรมบูแทน", "meaning": "เงาะ"}, {"term": "Raspberry", "reading": "แรสป์เบอร์รี", "meaning": "ราสป์เบอร์รี"}, {"term": "Red currant", "reading": "เรดเคอร์แรนต์", "meaning": "เรดเคอร์แรนต์"}, {"term": "Rose apple", "reading": "โรสแอปเปิล", "meaning": "ชมพู่"}, {"term": "Salak", "reading": "สละก", "meaning": "สละ"}, {"term": "Santol", "reading": "แซนทอล", "meaning": "กระท้อน"}, {"term": "Sapodilla", "reading": "ซาโพดิลลา", "meaning": "ละมุด"}, {"term": "Soursop", "reading": "ซาวร์ซอป", "meaning": "ทุเรียนเทศ"}, {"term": "Starfruit", "reading": "สตาร์ฟรุต", "meaning": "มะเฟือง"}, {"term": "Strawberry", "reading": "สตรอว์เบอร์รี", "meaning": "สตรอว์เบอร์รี"}, {"term": "Sugar apple", "reading": "ชูการ์แอปเปิล", "meaning": "น้อยหน่า"}, {"term": "Tangerine", "reading": "แทนเจอรีน", "meaning": "ส้มเขียวหวาน"}, {"term": "Tamarind", "reading": "แทมมะรินด์", "meaning": "มะขาม"}, {"term": "Tamarillo", "reading": "แทมมารีลโล", "meaning": "มะเขือเทศต้น"}, {"term": "Watermelon", "reading": "วอเทอร์เมลอน", "meaning": "แตงโม"}, {"term": "Yellow watermelon", "reading": "เยลโลว์วอเทอร์เมลอน", "meaning": "แตงโมเหลือง"}, {"term": "White mulberry", "reading": "ไวต์มัลเบอร์รี", "meaning": "หม่อนขาว"}, {"term": "Langsat", "reading": "หลังสาด", "meaning": "ลองกอง / ลางสาด"}, {"term": "Lanzones", "reading": "แลนโซนส์", "meaning": "ลองกอง"}, {"term": "Miracle fruit", "reading": "มิราเคิลฟรุต", "meaning": "ผลมหัศจรรย์"}, {"term": "Canistel", "reading": "แคนนิสเทล", "meaning": "ไข่เน่า"}, {"term": "Cloudberry", "reading": "คลาวด์เบอร์รี", "meaning": "คลาวด์เบอร์รี"}, {"term": "Loganberry", "reading": "โลแกนเบอร์รี", "meaning": "โลแกนเบอร์รี"}, {"term": "Ugli fruit", "reading": "อักลีฟรุต", "meaning": "อักลีฟรุต"}, {"term": "Feijoa", "reading": "เฟโจวา", "meaning": "เฟโจวา"}, {"term": "Goji berry", "reading": "โกจิเบอร์รี", "meaning": "โกจิเบอร์รี"}, {"term": "Cupuacu", "reading": "คูพูอาซู", "meaning": "คูพูอาซู"}, {"term": "Noni", "reading": "โนนิ", "meaning": "ลูกยอ"}, {"term": "Raisin", "reading": "เรซิน", "meaning": "ลูกเกด"}, {"term": "Prune", "reading": "พรูน", "meaning": "ลูกพรุน"}, {"term": "Coconut flesh", "reading": "โคโคนัตเฟลช", "meaning": "เนื้อมะพร้าว"}, {"term": "Young coconut", "reading": "ยังโคโคนัต", "meaning": "มะพร้าวอ่อน"}, {"term": "Jackfruit seed fruit", "reading": "แจ็กฟรุตพอด", "meaning": "ยวงขนุน"}, {"term": "Marian plum", "reading": "แมเรียนพลัม", "meaning": "มะปราง"}, {"term": "Maprang", "reading": "มะปราง", "meaning": "มะปราง"}, {"term": "Maprang waan", "reading": "มะปรางหวาน", "meaning": "มะปรางหวาน"}, {"term": "Ma-praang", "reading": "มะปราง", "meaning": "มะยงชิด"}, {"term": "Mayongchid", "reading": "มะยงชิด", "meaning": "มะยงชิด"}, {"term": "Bael fruit", "reading": "เบลฟรุต", "meaning": "มะตูม"}, {"term": "Java apple", "reading": "ชวาแอปเปิล", "meaning": "ชมพู่"}, {"term": "Taro fruit", "reading": "ทาโรฟรุต", "meaning": "ตาล"}, {"term": "Palmyra fruit", "reading": "ปาล์มไมรา", "meaning": "ลูกตาล"}, {"term": "Snake fruit", "reading": "สเนกฟรุต", "meaning": "สละ"}, {"term": "Mangaba", "reading": "มันกาบา", "meaning": "มังกาบา"}, {"term": "Physalis", "reading": "ฟิซาลิส", "meaning": "โทงเทงฝรั่ง"}, {"term": "Huckleberry", "reading": "ฮักเคิลเบอร์รี", "meaning": "ฮักเคิลเบอร์รี"}, {"term": "Crab apple", "reading": "แครบแอปเปิล", "meaning": "แอปเปิลป่า"}, {"term": "Currant tomato", "reading": "เคอร์แรนต์โทเมโท", "meaning": "มะเขือเทศลูกจิ๋ว"}, {"term": "Ceylon gooseberry", "reading": "ซีลอนกูสเบอร์รี", "meaning": "มะยม"}, {"term": "Indian gooseberry", "reading": "อินเดียนกูสเบอร์รี", "meaning": "มะขามป้อม"}, {"term": "Roselle fruit", "reading": "โรเซลล์ฟรุต", "meaning": "กระเจี๊ยบแดง"}]}, "orders": {"title": "4. คำศัพท์รับออเดอร์", "items": [{"term": "Are you ready to order?", "reading": "อาร์ยูเรดีทูออเดอร์", "meaning": "พร้อมสั่งอาหารหรือยังครับ/คะ"}, {"term": "May I take your order?", "reading": "เมย์ไอเทคยัวร์ออเดอร์", "meaning": "ขอรับออเดอร์ได้ไหมครับ/คะ"}, {"term": "What would you like to start with?", "reading": "ว็อตวูดยูไลก์ทูสตาร์ตวิธ", "meaning": "อยากเริ่มต้นด้วยอะไรดีครับ/คะ"}, {"term": "Would you like something to drink first?", "reading": "วูดยูไลก์ซัมธิงทูดริงก์เฟิร์สต์", "meaning": "รับเครื่องดื่มก่อนดีไหมครับ/คะ"}, {"term": "Still or sparkling water?", "reading": "สติลออร์สปาร์กลิงวอเทอร์", "meaning": "รับน้ำเปล่าหรือน้ำอัดก๊าซครับ/คะ"}, {"term": "Would you like ice?", "reading": "วูดยูไลก์ไอซ์", "meaning": "รับน้ำแข็งไหมครับ/คะ"}, {"term": "How would you like your steak cooked?", "reading": "ฮาววูดยูไลก์ยัวร์สเต๊กคุกด์", "meaning": "ต้องการให้สเต๊กสุกระดับไหนครับ/คะ"}, {"term": "Rare", "reading": "แรร์", "meaning": "สุกน้อย"}, {"term": "Medium rare", "reading": "มีเดียมแรร์", "meaning": "กึ่งสุกน้อย"}, {"term": "Medium", "reading": "มีเดียม", "meaning": "สุกปานกลาง"}, {"term": "Medium well", "reading": "มีเดียมเวล", "meaning": "กึ่งสุกมาก"}, {"term": "Well done", "reading": "เวลด้ัน", "meaning": "สุกมาก"}, {"term": "Do you have any food allergies?", "reading": "ดูยูแฮฟเอนีฟู้ดแอลลอร์จีส์", "meaning": "มีอาการแพ้อาหารอะไรไหมครับ/คะ"}, {"term": "Do you prefer spicy or mild?", "reading": "ดูยูพรีเฟอร์สไปซี่ออร์มายล์ด", "meaning": "ชอบเผ็ดหรือรสอ่อนครับ/คะ"}, {"term": "Would you like it less spicy?", "reading": "วูดยูไลก์อิตเลสสไปซี่", "meaning": "ต้องการให้เผ็ดน้อยลงไหมครับ/คะ"}, {"term": "Would you like extra chili?", "reading": "วูดยูไลก์เอ็กซ์ตราชิลลี", "meaning": "ต้องการพริกเพิ่มไหมครับ/คะ"}, {"term": "Would you like extra sauce?", "reading": "วูดยูไลก์เอ็กซ์ตราซอส", "meaning": "ต้องการซอสเพิ่มไหมครับ/คะ"}, {"term": "Would you like any side dishes?", "reading": "วูดยูไลก์เอนีไซด์ดิชส์", "meaning": "ต้องการเครื่องเคียงเพิ่มไหมครับ/คะ"}, {"term": "Would you like soup or salad?", "reading": "วูดยูไลก์ซุปออร์สลัด", "meaning": "ต้องการซุปหรือสลัดครับ/คะ"}, {"term": "Would you like rice or fries?", "reading": "วูดยูไลก์ไรซ์ออร์ฟรายส์", "meaning": "ต้องการข้าวหรือเฟรนช์ฟรายส์ครับ/คะ"}, {"term": "Would you like white or brown rice?", "reading": "วูดยูไลก์ไวต์ออร์บราวน์ไรซ์", "meaning": "ต้องการข้าวขาวหรือข้าวกล้องครับ/คะ"}, {"term": "Would you like another drink?", "reading": "วูดยูไลก์อะนัธเธอร์ดริงก์", "meaning": "รับเครื่องดื่มเพิ่มไหมครับ/คะ"}, {"term": "Can I recommend our signature dish?", "reading": "แคนไอเรคคอมเมนด์อาวร์ซิกเนเจอร์ดิช", "meaning": "ขอแนะนำเมนูเด่นของร้านได้ไหมครับ/คะ"}, {"term": "Our special today is grilled seabass.", "reading": "อาวร์สเปเชียลทูเดย์อิสกริลด์ซีแบส", "meaning": "เมนูพิเศษวันนี้คือปลากะพงย่างครับ/คะ"}, {"term": "This dish is very popular.", "reading": "ดิสดิชอิสเวรีพอพิวลาร์", "meaning": "เมนูนี้เป็นที่นิยมมากครับ/คะ"}, {"term": "This one is our best seller.", "reading": "ดิสวันอิสอาวร์เบสต์เซลเลอร์", "meaning": "เมนูนี้เป็นเมนูขายดีของร้านครับ/คะ"}, {"term": "This dish contains nuts.", "reading": "ดิสดิชคอนเทนส์นัตส์", "meaning": "เมนูนี้มีถั่วเป็นส่วนผสมครับ/คะ"}, {"term": "This dish contains dairy.", "reading": "ดิสดิชคอนเทนส์แดรี", "meaning": "เมนูนี้มีนมเป็นส่วนผสมครับ/คะ"}, {"term": "This dish contains seafood.", "reading": "ดิสดิชคอนเทนส์ซีฟู้ด", "meaning": "เมนูนี้มีอาหารทะเลเป็นส่วนผสมครับ/คะ"}, {"term": "This dish is vegetarian.", "reading": "ดิสดิชอิสเวจเจเทเรียน", "meaning": "เมนูนี้เป็นมังสวิรัติครับ/คะ"}, {"term": "This dish is vegan.", "reading": "ดิสดิชอิสวีแกน", "meaning": "เมนูนี้เป็นวีแกนครับ/คะ"}, {"term": "This dish is gluten-free.", "reading": "ดิสดิชอิสกลูเทนฟรี", "meaning": "เมนูนี้ไม่มีกลูเตนครับ/คะ"}, {"term": "Would you like no onion?", "reading": "วูดยูไลก์โนออเนียน", "meaning": "ต้องการไม่ใส่หัวหอมไหมครับ/คะ"}, {"term": "Would you like no garlic?", "reading": "วูดยูไลก์โนการ์ลิก", "meaning": "ต้องการไม่ใส่กระเทียมไหมครับ/คะ"}, {"term": "Would you like no pork?", "reading": "วูดยูไลก์โนพอร์ก", "meaning": "ต้องการไม่ใส่หมูไหมครับ/คะ"}, {"term": "Would you like chicken, pork, beef, or seafood?", "reading": "วูดยูไลก์ชิคเกนพอร์กบีฟออร์ซีฟู้ด", "meaning": "ต้องการไก่ หมู เนื้อ หรืออาหารทะเลครับ/คะ"}, {"term": "Would you like it fried, grilled, or steamed?", "reading": "วูดยูไลก์อิตฟรายด์กริลด์ออร์สตีมด์", "meaning": "ต้องการแบบทอด ย่าง หรือ นึ่งครับ/คะ"}, {"term": "One moment, please.", "reading": "วันโมเมนต์พลีส", "meaning": "กรุณารอสักครู่ครับ/คะ"}, {"term": "Let me repeat your order.", "reading": "เลตมีรีพีตยัวร์ออเดอร์", "meaning": "ขอทวนออเดอร์นะครับ/คะ"}, {"term": "You ordered one salad and two soups.", "reading": "ยูออร์เดอร์ดวันสลัดแอนด์ทูซุปส์", "meaning": "คุณสั่งสลัดหนึ่งและซุปสองที่ครับ/คะ"}, {"term": "Anything else?", "reading": "เอนีธิงเอลส์", "meaning": "รับอะไรเพิ่มไหมครับ/คะ"}, {"term": "Would you like dessert later?", "reading": "วูดยูไลก์ดีเสิร์ตเลเทอร์", "meaning": "ต้องการของหวานทีหลังไหมครับ/คะ"}, {"term": "Would you like coffee or tea after your meal?", "reading": "วูดยูไลก์คอฟฟี่ออร์ทีอาฟเทอร์ยัวร์มีล", "meaning": "ต้องการกาแฟหรือชาหลังอาหารไหมครับ/คะ"}, {"term": "Would you like your drink with no sugar?", "reading": "วูดยูไลก์ยัวร์ดริงก์วิธโนชูการ์", "meaning": "ต้องการเครื่องดื่มไม่หวานไหมครับ/คะ"}, {"term": "Would you like your coffee hot or iced?", "reading": "วูดยูไลก์ยัวร์คอฟฟี่ฮอตออร์ไอซ์ด", "meaning": "ต้องการกาแฟร้อนหรือเย็นครับ/คะ"}, {"term": "Would you like lemon with your tea?", "reading": "วูดยูไลก์เลมอนวิธยัวร์ที", "meaning": "ต้องการมะนาวกับชาของคุณไหมครับ/คะ"}, {"term": "Can I get you some bread?", "reading": "แคนไอเก็ตยูซัมเบรด", "meaning": "ขอนำขนมปังมาให้ไหมครับ/คะ"}, {"term": "Would you like butter with that?", "reading": "วูดยูไลก์บัตเทอร์วิธแดต", "meaning": "ต้องการเนยด้วยไหมครับ/คะ"}, {"term": "Would you like extra cheese?", "reading": "วูดยูไลก์เอ็กซ์ตราชีส", "meaning": "ต้องการชีสเพิ่มไหมครับ/คะ"}, {"term": "Would you like to share this dish?", "reading": "วูดยูไลก์ทูแชร์ดิสดิช", "meaning": "ต้องการแบ่งกันทานจานนี้ไหมครับ/คะ"}, {"term": "This portion is good for two people.", "reading": "ดิสพอร์ชันอิสกูดฟอร์ทูพีเพิล", "meaning": "ปริมาณจานนี้เหมาะสำหรับสองท่านครับ/คะ"}, {"term": "This dish takes about fifteen minutes.", "reading": "ดิสดิชเทคส์อะเบาต์ฟิฟทีนมินิตส์", "meaning": "เมนูนี้ใช้เวลาประมาณสิบห้านาทีครับ/คะ"}, {"term": "This item is sold out today.", "reading": "ดิสไอเท็มอิสโซลด์เอาต์ทูเดย์", "meaning": "รายการนี้หมดวันนี้ครับ/คะ"}, {"term": "May I suggest another dish?", "reading": "เมย์ไอซะเจสต์อะนัธเธอร์ดิช", "meaning": "ขอแนะนำเมนูอื่นแทนได้ไหมครับ/คะ"}, {"term": "Would you like the same as yesterday?", "reading": "วูดยูไลก์เดอะเซมแอสเยสเตอร์เดย์", "meaning": "ต้องการเหมือนเมื่อวานไหมครับ/คะ"}, {"term": "Would you like your eggs scrambled, fried, or boiled?", "reading": "วูดยูไลก์ยัวร์เอ้กส์สแครมเบิลด์ฟรายด์ออร์บอยล์ด", "meaning": "ต้องการไข่คน ไข่ดาว หรือไข่ต้มครับ/คะ"}, {"term": "How many eggs would you like?", "reading": "ฮาวเมนีเอ้กส์วูดยูไลก์", "meaning": "ต้องการไข่กี่ฟองครับ/คะ"}, {"term": "Would you like your noodles spicy?", "reading": "วูดยูไลก์ยัวร์นูเดิลส์สไปซี่", "meaning": "ต้องการเส้นจานนี้เผ็ดไหมครับ/คะ"}, {"term": "Would you like soup on the side?", "reading": "วูดยูไลก์ซุปออนเดอะไซด์", "meaning": "ต้องการซุปแยกมาด้านข้างไหมครับ/คะ"}, {"term": "Would you like the dressing on the side?", "reading": "วูดยูไลก์เดอะเดรสซิงออนเดอะไซด์", "meaning": "ต้องการน้ำสลัดแยกไหมครับ/คะ"}, {"term": "Would you like less ice?", "reading": "วูดยูไลก์เลสไอซ์", "meaning": "ต้องการน้ำแข็งน้อยไหมครับ/คะ"}, {"term": "Would you like more ice?", "reading": "วูดยูไลก์มอร์ไอซ์", "meaning": "ต้องการน้ำแข็งเพิ่มไหมครับ/คะ"}, {"term": "Would you like it hot, warm, or cold?", "reading": "วูดยูไลก์อิทฮอตวอร์มออร์โคลด์", "meaning": "ต้องการร้อน อุ่น หรือเย็นครับ/คะ"}, {"term": "Would you like to make it a set?", "reading": "วูดยูไลก์ทูเมคอิตอะเซ็ต", "meaning": "ต้องการเพิ่มเป็นชุดไหมครับ/คะ"}, {"term": "Would you like to add fries?", "reading": "วูดยูไลก์ทูแอดฟรายส์", "meaning": "ต้องการเพิ่มเฟรนช์ฟรายส์ไหมครับ/คะ"}, {"term": "Would you like to add a soup?", "reading": "วูดยูไลก์ทูแอดอะซุป", "meaning": "ต้องการเพิ่มซุปไหมครับ/คะ"}, {"term": "Would you like to add a salad?", "reading": "วูดยูไลก์ทูแอดอะสลัด", "meaning": "ต้องการเพิ่มสลัดไหมครับ/คะ"}, {"term": "Would you like another bottle of water?", "reading": "วูดยูไลก์อะนัธเธอร์บอตเทิลออฟวอเทอร์", "meaning": "ต้องการน้ำอีกหนึ่งขวดไหมครับ/คะ"}, {"term": "Would you like a glass or a bottle?", "reading": "วูดยูไลก์อะกลาสออร์อะบอตเทิล", "meaning": "ต้องการเป็นแก้วหรือขวดครับ/คะ"}, {"term": "Would you like red or white wine?", "reading": "วูดยูไลก์เรดออร์ไวต์ไวน์", "meaning": "ต้องการไวน์แดงหรือไวน์ขาวครับ/คะ"}, {"term": "Dry", "reading": "ดราย", "meaning": "รสไม่หวาน"}, {"term": "Sweet", "reading": "สวีต", "meaning": "หวาน"}, {"term": "Sparkling", "reading": "สปาร์กลิง", "meaning": "มีฟอง"}, {"term": "Still", "reading": "สติล", "meaning": "ไม่มีฟอง"}, {"term": "Large", "reading": "ลาร์จ", "meaning": "ขนาดใหญ่"}, {"term": "Medium size", "reading": "มีเดียมไซซ์", "meaning": "ขนาดกลาง"}, {"term": "Small", "reading": "สมอล", "meaning": "ขนาดเล็ก"}, {"term": "Extra portion", "reading": "เอ็กซ์ตราพอร์ชัน", "meaning": "เพิ่มปริมาณ"}, {"term": "No ice", "reading": "โนไอซ์", "meaning": "ไม่ใส่น้ำแข็ง"}, {"term": "Less sugar", "reading": "เลสชูการ์", "meaning": "หวานน้อย"}, {"term": "No sugar", "reading": "โนชูการ์", "meaning": "ไม่ใส่น้ำตาล"}, {"term": "Extra spicy", "reading": "เอ็กซ์ตราสไปซี่", "meaning": "เผ็ดมาก"}, {"term": "Not spicy", "reading": "น็อตสไปซี่", "meaning": "ไม่เผ็ด"}, {"term": "Mild", "reading": "มายล์ด", "meaning": "รสอ่อน"}, {"term": "Can I confirm your order?", "reading": "แคนไอคอนเฟิร์มยัวร์ออเดอร์", "meaning": "ขอยืนยันออเดอร์ของคุณนะครับ/คะ"}, {"term": "Would you like me to place the order now?", "reading": "วูดยูไลก์มีทูเพลซดิออเดอร์นาว", "meaning": "ให้ดิฉันส่งออเดอร์ตอนนี้เลยไหมครับ/คะ"}, {"term": "Your food will be served shortly.", "reading": "ยัวร์ฟู้ดวิลบีเสิร์ฟด์ชอร์ทลี่", "meaning": "อาหารของคุณจะเสิร์ฟในไม่ช้าครับ/คะ"}, {"term": "Please enjoy your meal.", "reading": "พลีสเอนจอยยัวร์มีล", "meaning": "ขอให้อร่อยกับมื้อนี้ครับ/คะ"}, {"term": "Would you like the bill after your meal?", "reading": "วูดยูไลก์เดอะบิลอาฟเทอร์ยัวร์มีล", "meaning": "ต้องการรับบิลหลังทานเสร็จไหมครับ/คะ"}, {"term": "I will send your order to the kitchen now.", "reading": "ไอวิลเซนด์ยัวร์ออเดอร์ทูเดอะคิทเชินนาว", "meaning": "ฉันจะส่งออเดอร์เข้าครัวตอนนี้ครับ/คะ"}, {"term": "Please let me know if you need anything else.", "reading": "พลีสเลตมีโนว์อิฟยูนีดเอนีธิงเอลส์", "meaning": "หากต้องการอะไรเพิ่ม แจ้งได้เลยครับ/คะ"}, {"term": "Would you like another round of drinks?", "reading": "วูดยูไลก์อะนัธเธอร์ราวนด์ออฟดริงก์ส", "meaning": "ต้องการเครื่องดื่มอีกรอบไหมครับ/คะ"}, {"term": "Can I suggest a dessert?", "reading": "แคนไอซะเจสต์อะดีเสิร์ต", "meaning": "ขอแนะนำของหวานได้ไหมครับ/คะ"}, {"term": "Would you like to order now or later?", "reading": "วูดยูไลก์ทูออเดอร์นาวออร์เลเทอร์", "meaning": "ต้องการสั่งตอนนี้หรือทีหลังครับ/คะ"}, {"term": "Please take your time.", "reading": "พลีสเทคยัวร์ไทม์", "meaning": "เชิญใช้เวลาได้เต็มที่ครับ/คะ"}, {"term": "Would you like separate plates?", "reading": "วูดยูไลก์เซพะเรตเพลตส์", "meaning": "ต้องการจานแยกไหมครับ/คะ"}, {"term": "Would you like extra cutlery?", "reading": "วูดยูไลก์เอ็กซ์ตราคัตเลอรี", "meaning": "ต้องการช้อนส้อมเพิ่มไหมครับ/คะ"}, {"term": "Would you like a spoon and fork?", "reading": "วูดยูไลก์อะสปูนแอนด์ฟอร์ก", "meaning": "ต้องการช้อนและส้อมไหมครับ/คะ"}, {"term": "Would you like chopsticks?", "reading": "วูดยูไลก์ชอปสติกส์", "meaning": "ต้องการตะเกียบไหมครับ/คะ"}, {"term": "Would you like your sauce on the side?", "reading": "วูดยูไลก์ยัวร์ซอสออนเดอะไซด์", "meaning": "ต้องการซอสแยกไหมครับ/คะ"}, {"term": "Would you like this without coriander?", "reading": "วูดยูไลก์ดิสวิธเอาต์คอเรียนเดอร์", "meaning": "ต้องการเมนูนี้ไม่ใส่ผักชีไหมครับ/คะ"}, {"term": "Would you like your burger with cheese?", "reading": "วูดยูไลก์ยัวร์เบอร์เกอร์วิธชีส", "meaning": "ต้องการชีสในเบอร์เกอร์ไหมครับ/คะ"}, {"term": "Would you like your fries crispy?", "reading": "วูดยูไลก์ยัวร์ฟรายส์คริสปี", "meaning": "ต้องการให้เฟรนช์ฟรายส์กรอบไหมครับ/คะ"}, {"term": "Would you like to order a starter?", "reading": "วูดยูไลก์ทูออเดอร์อะสตาร์เตอร์", "meaning": "ต้องการสั่งอาหารเรียกน้ำย่อยไหมครับ/คะ"}, {"term": "Would you like your soup creamy or clear?", "reading": "วูดยูไลก์ยัวร์ซุปครีมมีออร์เคลียร์", "meaning": "ต้องการซุปแบบครีมหรือน้ำใสครับ/คะ"}, {"term": "How spicy would you like it, from one to five?", "reading": "ฮาวสไปซี่วูดยูไลก์อิตฟรอมวันทูไฟว์", "meaning": "ต้องการความเผ็ดระดับไหนจากหนึ่งถึงห้าครับ/คะ"}, {"term": "Can I bring you a high chair for the child?", "reading": "แคนไอบริงยูอะไฮแชร์ฟอร์เดอะไชลด์", "meaning": "ขอนำเก้าอี้เด็กมาให้ไหมครับ/คะ"}, {"term": "Would you like a kids' menu?", "reading": "วูดยูไลก์อะคิดส์เมนู", "meaning": "ต้องการเมนูสำหรับเด็กไหมครับ/คะ"}, {"term": "Shall I place all dishes together or one by one?", "reading": "แชลไอเพลซออลดิชส์ทูเก็ทเธอร์ออร์วันบายวัน", "meaning": "ให้เสิร์ฟพร้อมกันทั้งหมดหรือทีละจานครับ/คะ"}, {"term": "Would you like your appetizer first?", "reading": "วูดยูไลก์ยัวร์แอพิไทเซอร์เฟิร์สต์", "meaning": "ต้องการให้อาหารเรียกน้ำย่อยมาก่อนใช่ไหมครับ/คะ"}]}, "greeting": {"title": "5. คำศัพท์พูดคุย / ทักทาย", "items": [{"term": "Good morning.", "reading": "กู๊ดมอร์นิง", "meaning": "สวัสดีตอนเช้า"}, {"term": "Good afternoon.", "reading": "กู๊ดอาฟเทอร์นูน", "meaning": "สวัสดีตอนบ่าย"}, {"term": "Good evening.", "reading": "กู๊ดอีฟนิง", "meaning": "สวัสดีตอนเย็น"}, {"term": "Hello.", "reading": "เฮลโล", "meaning": "สวัสดี"}, {"term": "Hi.", "reading": "ไฮ", "meaning": "สวัสดี"}, {"term": "Welcome.", "reading": "เวลคัม", "meaning": "ยินดีต้อนรับ"}, {"term": "Welcome to our restaurant.", "reading": "เวลคัมทูอาวร์เรสเตอรองต์", "meaning": "ยินดีต้อนรับสู่ห้องอาหารของเรา"}, {"term": "How are you today?", "reading": "ฮาวอาร์ยูทูเดย์", "meaning": "วันนี้สบายดีไหมครับ/คะ"}, {"term": "Do you have a reservation?", "reading": "ดูยูแฮฟอะเรเซอร์เวชัน", "meaning": "ได้จองโต๊ะไว้ไหมครับ/คะ"}, {"term": "May I have your name, please?", "reading": "เมย์ไอแฮฟยัวร์เนมพลีส", "meaning": "ขอทราบชื่อได้ไหมครับ/คะ"}, {"term": "How many guests?", "reading": "ฮาวเมนีเกสต์ส", "meaning": "มากันกี่ท่านครับ/คะ"}, {"term": "A table for two?", "reading": "อะเทเบิลฟอร์ทู", "meaning": "โต๊ะสำหรับสองท่านใช่ไหมครับ/คะ"}, {"term": "Please follow me.", "reading": "พลีสฟอลโลว์มี", "meaning": "เชิญตามผม/ดิฉันมาได้เลยครับ/ค่ะ"}, {"term": "This way, please.", "reading": "ดิสเวย์พลีส", "meaning": "เชิญทางนี้ครับ/คะ"}, {"term": "Please have a seat.", "reading": "พลีสแฮฟอะซีต", "meaning": "เชิญนั่งได้เลยครับ/คะ"}, {"term": "Here is your table.", "reading": "เฮียร์อิสยัวร์เทเบิล", "meaning": "นี่คือโต๊ะของคุณครับ/คะ"}, {"term": "Is this table okay for you?", "reading": "อิสดิสเทเบิลโอเคฟอร์ยู", "meaning": "โต๊ะนี้สะดวกไหมครับ/คะ"}, {"term": "Would you like to sit inside or outside?", "reading": "วูดยูไลก์ทูซิตอินไซด์ออร์เอาต์ไซด์", "meaning": "ต้องการนั่งด้านในหรือด้านนอกครับ/คะ"}, {"term": "Would you like a window table?", "reading": "วูดยูไลก์อะวินโดว์เทเบิล", "meaning": "ต้องการโต๊ะติดหน้าต่างไหมครับ/คะ"}, {"term": "May I offer you the menu?", "reading": "เมย์ไอออฟเฟอร์ยูเดอะเมนู", "meaning": "ขออนุญาตนำเมนูมาให้ครับ/คะ"}, {"term": "Can I get you some water?", "reading": "แคนไอเก็ตยูซัมวอเทอร์", "meaning": "ขอนำน้ำมาให้ไหมครับ/คะ"}, {"term": "Please let me know if you need any help.", "reading": "พลีสเลตมีโนว์อิฟยูนีดเอนีเฮลป์", "meaning": "หากต้องการความช่วยเหลือ แจ้งได้เลยครับ/คะ"}, {"term": "I will be happy to assist you.", "reading": "ไอวิลบีแฮปปีทูอะซิสต์ยู", "meaning": "ยินดีให้บริการครับ/คะ"}, {"term": "Take your time.", "reading": "เทคยัวร์ไทม์", "meaning": "ค่อยๆ ดูเมนูได้เลยครับ/คะ"}, {"term": "Are you visiting us for the first time?", "reading": "อาร์ยูวิซิติงอัสฟอร์เดอะเฟิร์สต์ไทม์", "meaning": "มาทานที่นี่ครั้งแรกหรือเปล่าครับ/คะ"}, {"term": "Where are you from?", "reading": "แวร์อาร์ยูฟรอม", "meaning": "คุณมาจากที่ไหนครับ/คะ"}, {"term": "I hope you enjoy your time here.", "reading": "ไอโฮปยูเอนจอยยัวร์ไทม์เฮียร์", "meaning": "หวังว่าคุณจะมีช่วงเวลาที่ดีที่นี่ครับ/คะ"}, {"term": "How is everything so far?", "reading": "ฮาวอิสเอฟวรีธิงโซฟาร์", "meaning": "ทุกอย่างเป็นอย่างไรบ้างครับ/คะ"}, {"term": "Is everything okay?", "reading": "อิสเอฟวรีธิงโอเค", "meaning": "ทุกอย่างเรียบร้อยดีไหมครับ/คะ"}, {"term": "How is your meal?", "reading": "ฮาวอิสยัวร์มีล", "meaning": "อาหารเป็นอย่างไรบ้างครับ/คะ"}, {"term": "Do you like the food?", "reading": "ดูยูไลก์เดอะฟู้ด", "meaning": "ชอบอาหารไหมครับ/คะ"}, {"term": "Is the taste okay for you?", "reading": "อิสเดอะเทสต์โอเคฟอร์ยู", "meaning": "รสชาติถูกใจไหมครับ/คะ"}, {"term": "Would you like anything else?", "reading": "วูดยูไลก์เอนีธิงเอลส์", "meaning": "ต้องการอะไรเพิ่มเติมไหมครับ/คะ"}, {"term": "May I clear this plate?", "reading": "เมย์ไอเคลียร์ดิสเพลต", "meaning": "ขออนุญาตเก็บจานนี้ได้ไหมครับ/คะ"}, {"term": "May I take this away?", "reading": "เมย์ไอเทคดิสอะเวย์", "meaning": "ขออนุญาตนำจานนี้ออกไปได้ไหมครับ/คะ"}, {"term": "I will clear the table for you.", "reading": "ไอวิลเคลียร์เดอะเทเบิลฟอร์ยู", "meaning": "เดี๋ยวผม/ฉันเก็บโต๊ะให้นะครับ/คะ"}, {"term": "May I refill your water?", "reading": "เมย์ไอรีฟิลยัวร์วอเทอร์", "meaning": "ขอเติมน้ำให้ไหมครับ/คะ"}, {"term": "Would you like another napkin?", "reading": "วูดยูไลก์อะนัธเธอร์แนปกิน", "meaning": "ต้องการผ้าเช็ดปากเพิ่มไหมครับ/คะ"}, {"term": "May I bring you another plate?", "reading": "เมย์ไอบริงยูอะนัธเธอร์เพลต", "meaning": "ขอนำจานอีกใบมาให้ไหมครับ/คะ"}, {"term": "Would you like a spoon?", "reading": "วูดยูไลก์อะสปูน", "meaning": "ต้องการช้อนไหมครับ/คะ"}, {"term": "Would you like a fork and knife?", "reading": "วูดยูไลก์อะฟอร์กแอนด์ไนฟ์", "meaning": "ต้องการมีดกับส้อมไหมครับ/คะ"}, {"term": "Would you like chopsticks?", "reading": "วูดยูไลก์ชอปสติกส์", "meaning": "ต้องการตะเกียบไหมครับ/คะ"}, {"term": "Excuse me.", "reading": "เอ็กซ์คิวส์มี", "meaning": "ขออนุญาตครับ/คะ"}, {"term": "Certainly.", "reading": "เซอร์เทินลี่", "meaning": "ได้แน่นอนครับ/ค่ะ"}, {"term": "Of course.", "reading": "ออฟคอร์ส", "meaning": "ได้เลยครับ/ค่ะ"}, {"term": "Right away.", "reading": "ไรต์อะเวย์", "meaning": "เดี๋ยวนี้เลยครับ/ค่ะ"}, {"term": "One moment, please.", "reading": "วันโมเมนต์พลีส", "meaning": "รอสักครู่ครับ/ค่ะ"}, {"term": "Thank you.", "reading": "แธงก์ยู", "meaning": "ขอบคุณ"}, {"term": "Thank you very much.", "reading": "แธงก์ยูเวรีมัช", "meaning": "ขอบคุณมาก"}, {"term": "You're welcome.", "reading": "ยัวร์เวลคัม", "meaning": "ยินดีครับ/ค่ะ"}, {"term": "My pleasure.", "reading": "มายเพลเชอร์", "meaning": "ยินดีอย่างยิ่งครับ/ค่ะ"}, {"term": "Please enjoy.", "reading": "พลีสเอนจอย", "meaning": "เชิญทานให้อร่อยครับ/ค่ะ"}, {"term": "Enjoy your meal.", "reading": "เอนจอยยัวร์มีล", "meaning": "ขอให้อร่อยกับมื้อนี้ครับ/ค่ะ"}, {"term": "I am sorry.", "reading": "ไอแอมซอรี", "meaning": "ขออภัยครับ/ค่ะ"}, {"term": "I apologize for the inconvenience.", "reading": "ไออะพอลอะไจซ์ฟอร์ดิอินคอนวีเนียนซ์", "meaning": "ขออภัยในความไม่สะดวกครับ/ค่ะ"}, {"term": "Thank you for waiting.", "reading": "แธงก์ยูฟอร์เวททิง", "meaning": "ขอบคุณที่รอครับ/ค่ะ"}, {"term": "Sorry to keep you waiting.", "reading": "ซอรีทูคีพยูเวททิง", "meaning": "ขออภัยที่ทำให้รอครับ/ค่ะ"}, {"term": "We are preparing it now.", "reading": "วีอาร์พรีแพริงอิตนาว", "meaning": "เรากำลังเตรียมให้อยู่ครับ/ค่ะ"}, {"term": "It will be ready shortly.", "reading": "อิตวิลบีเรดีชอร์ทลี่", "meaning": "จะพร้อมในไม่ช้าครับ/ค่ะ"}, {"term": "I will check for you.", "reading": "ไอวิลเช็กฟอร์ยู", "meaning": "เดี๋ยวผม/ฉันตรวจสอบให้ครับ/ค่ะ"}, {"term": "Let me check with the kitchen.", "reading": "เลตมีเช็กวิธเดอะคิทเชิน", "meaning": "ขอตรวจสอบกับครัวก่อนครับ/ค่ะ"}, {"term": "Please allow me to confirm.", "reading": "พลีสอะเลาฉมีทูคอนเฟิร์ม", "meaning": "ขออนุญาตยืนยันอีกครั้งครับ/ค่ะ"}, {"term": "Thank you for letting us know.", "reading": "แธงก์ยูฟอร์เลตทิงอัสโนว์", "meaning": "ขอบคุณที่แจ้งให้เราทราบครับ/ค่ะ"}, {"term": "We will fix it immediately.", "reading": "วีวิลฟิกซ์อิตอิมีเดียทลี่", "meaning": "เราจะแก้ไขให้ทันทีครับ/ค่ะ"}, {"term": "Would you like us to change it?", "reading": "วูดยูไลก์อัสทูเชนจ์อิต", "meaning": "ต้องการให้เราเปลี่ยนให้ไหมครับ/ค่ะ"}, {"term": "May I replace this for you?", "reading": "เมย์ไอรีเพลซดิสฟอร์ยู", "meaning": "ขออนุญาตเปลี่ยนให้ไหมครับ/ค่ะ"}, {"term": "Would you like a new one?", "reading": "วูดยูไลก์อะนิววัน", "meaning": "ต้องการจานใหม่ไหมครับ/ค่ะ"}, {"term": "We appreciate your feedback.", "reading": "วีอะพรีชีเอตยัวร์ฟีดแบ็ก", "meaning": "ขอบคุณสำหรับคำแนะนำของคุณครับ/ค่ะ"}, {"term": "Thank you for your understanding.", "reading": "แธงก์ยูฟอร์ยัวร์อันเดอร์สแตนดิง", "meaning": "ขอบคุณที่เข้าใจครับ/ค่ะ"}, {"term": "Are you celebrating anything today?", "reading": "อาร์ยู่เซเลเบรททิงเอนีธิงทูเดย์", "meaning": "วันนี้มีโอกาสพิเศษอะไรไหมครับ/ค่ะ"}, {"term": "Happy birthday!", "reading": "แฮปปีเบิร์ธเดย์", "meaning": "สุขสันต์วันเกิด"}, {"term": "Congratulations!", "reading": "คอนแกรชูเลชันส์", "meaning": "ขอแสดงความยินดี"}, {"term": "Would you like me to take a photo for you?", "reading": "วูดยูไลก์มีทูเทคอะโฟโทฟอร์ยู", "meaning": "ให้ช่วยถ่ายรูปให้ไหมครับ/ค่ะ"}, {"term": "Please watch your step.", "reading": "พลีสวอชยัวร์สเต็ป", "meaning": "โปรดระวังก้าวเดินครับ/ค่ะ"}, {"term": "The floor is wet.", "reading": "เดอะฟลอร์อิสเว็ต", "meaning": "พื้นเปียกครับ/ค่ะ"}, {"term": "The restroom is over there.", "reading": "เดอะเรสต์รูมอิสโอเวอร์แดร์", "meaning": "ห้องน้ำอยู่ทางนั้นครับ/ค่ะ"}, {"term": "The bar is on your right.", "reading": "เดอะบาร์อิซออนยัวร์ไรต์", "meaning": "บาร์อยู่ด้านขวาของคุณครับ/ค่ะ"}, {"term": "Breakfast starts at six thirty.", "reading": "เบรกฟาสต์สตาร์ตส์แอทซิกซ์เธอร์ตี", "meaning": "อาหารเช้าเริ่มหกโมงครึ่ง"}, {"term": "Last order is at ten thirty.", "reading": "ลาสต์ออเดอร์อิสแอทเทนเธอร์ตี", "meaning": "รับออเดอร์สุดท้ายเวลา 10:30 น."}, {"term": "We are open until eleven p.m.", "reading": "วีอาร์โอเพินอันทิลอิเลฟเวนพีเอ็ม", "meaning": "เราเปิดถึง 5 ทุ่ม"}, {"term": "We are fully booked tonight.", "reading": "วีอาร์ฟูลลีบุ๊กต์ทูไนต์", "meaning": "คืนนี้โต๊ะเต็มแล้วครับ/ค่ะ"}, {"term": "There will be a short wait.", "reading": "แดร์วิลบีอะชอร์ตเวต", "meaning": "อาจต้องรอสักครู่ครับ/ค่ะ"}, {"term": "Thank you for your patience.", "reading": "แธงก์ยูฟอร์ยัวร์เพเชินซ์", "meaning": "ขอบคุณสำหรับความอดทนครับ/ค่ะ"}, {"term": "Your table is ready.", "reading": "ยัวร์เทเบิลอิสเรดี", "meaning": "โต๊ะของคุณพร้อมแล้วครับ/ค่ะ"}, {"term": "Please come this way.", "reading": "พลีสคัมดิสเวย์", "meaning": "เชิญทางนี้ครับ/ค่ะ"}, {"term": "May I take your coat?", "reading": "เมย์ไอเทคยัวร์โค้ต", "meaning": "ขอรับเสื้อคลุมของคุณได้ไหมครับ/ค่ะ"}, {"term": "May I help you with the chair?", "reading": "เมย์ไอเฮลป์ยูวิธเดอะแชร์", "meaning": "ขอช่วยเลื่อนเก้าอี้ให้ไหมครับ/ค่ะ"}, {"term": "Please mind the step.", "reading": "พลีสมายด์เดอะสเต็ป", "meaning": "โปรดระวังขั้นบันไดครับ/ค่ะ"}, {"term": "Can I get you a baby chair?", "reading": "แคนไอเก็ตยูอะเบบี้แชร์", "meaning": "ขอนำเก้าอี้เด็กมาให้ไหมครับ/ค่ะ"}, {"term": "Would you like a table with air-conditioning?", "reading": "วูดยูไลก์อะเทเบิลวิธแอร์คอนดิชันนิง", "meaning": "ต้องการโต๊ะในห้องแอร์ไหมครับ/ค่ะ"}, {"term": "Would you like to move to another table?", "reading": "วูดยูไลก์ทูมูฟทูอะนัธเธอร์เทเบิล", "meaning": "ต้องการย้ายไปอีกโต๊ะไหมครับ/ค่ะ"}, {"term": "We hope to see you again.", "reading": "วีโฮปทูซียูอะเกน", "meaning": "หวังว่าจะได้ต้อนรับอีกครั้งครับ/ค่ะ"}, {"term": "Have a nice day.", "reading": "แฮฟอะไนซ์เดย์", "meaning": "ขอให้เป็นวันที่ดีครับ/ค่ะ"}, {"term": "Have a nice evening.", "reading": "แฮฟอะไนซ์อีฟนิง", "meaning": "ขอให้เป็นค่ำคืนที่ดีครับ/ค่ะ"}, {"term": "Have a safe trip.", "reading": "แฮฟอะเซฟทริป", "meaning": "เดินทางปลอดภัยครับ/ค่ะ"}, {"term": "Good night.", "reading": "กู๊ดไนต์", "meaning": "ราตรีสวัสดิ์"}, {"term": "See you again.", "reading": "ซียูอะเกน", "meaning": "แล้วพบกันใหม่"}, {"term": "Please come again.", "reading": "พลีสคัมอะเกน", "meaning": "เชิญมาอีกนะครับ/ค่ะ"}, {"term": "Thank you for dining with us.", "reading": "แธงก์ยูฟอร์ไดนิงวิธอัส", "meaning": "ขอบคุณที่มารับประทานอาหารกับเรา"}, {"term": "It was our pleasure to serve you.", "reading": "อิตวอซอาวร์เพลเชอร์ทูเซิร์ฟยู", "meaning": "ยินดีอย่างยิ่งที่ได้ให้บริการครับ/ค่ะ"}, {"term": "May I bring you the bill?", "reading": "เมย์ไอบริงยูเดอะบิล", "meaning": "ขอนำบิลมาให้ไหมครับ/ค่ะ"}, {"term": "Would you like to pay by cash or card?", "reading": "วูดยูไลก์ทูเพย์บายแคชออร์การ์ด", "meaning": "ต้องการชำระด้วยเงินสดหรือบัตรครับ/ค่ะ"}, {"term": "Please sign here.", "reading": "พลีสไซน์เฮียร์", "meaning": "กรุณาเซ็นตรงนี้ครับ/ค่ะ"}, {"term": "Would you like a receipt?", "reading": "วูดยูไลก์อะรีซีต", "meaning": "ต้องการใบเสร็จไหมครับ/ค่ะ"}, {"term": "Thank you and goodbye.", "reading": "แธงก์ยูแอนด์กู๊ดบาย", "meaning": "ขอบคุณและสวัสดีครับ/ค่ะ"}, {"term": "See you tomorrow.", "reading": "ซียูทูมอโร", "meaning": "แล้วพบกันพรุ่งนี้"}, {"term": "Welcome back.", "reading": "เวลคัมแบ็ก", "meaning": "ยินดีต้อนรับกลับมาอีกครั้ง"}, {"term": "Nice to see you again.", "reading": "ไนซ์ทูซียูอะเกน", "meaning": "ยินดีที่ได้พบอีกครั้งครับ/ค่ะ"}, {"term": "Please let us know if you need any assistance.", "reading": "พลีสเลตอัสโนว์อิฟยูนีดเอนีอะซิสแทนซ์", "meaning": "หากต้องการความช่วยเหลือแจ้งเราได้เลยครับ/ค่ะ"}]}};

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
    summary: 'หัวข้อสำคัญเรื่องสุขอนามัยอาหารสำหรับพนักงานร้านอาหาร อ่านง่าย ใช้ได้จริงหน้างาน',
    sections: [
      {
        title: '1. ความสำคัญของสุขอนามัยอาหาร',
        items: [
          'ป้องกันการเกิด Foodborne illness หรืออาหารเป็นพิษ',
          'สร้างความเชื่อมั่นให้ลูกค้า',
          'ลดความเสี่ยงด้านกฎหมายและชื่อเสียงของร้าน'
        ]
      },
      {
        title: '2. สุขอนามัยส่วนบุคคล (Personal Hygiene) — สิ่งที่ต้องทำ',
        items: [
          'ล้างมืออย่างถูกวิธี ก่อนและหลังสัมผัสอาหาร',
          'ตัดเล็บสั้น และไม่ทาสีเล็บ',
          'สวมหมวกหรือเน็ตคลุมผม',
          'ใส่ชุดยูนิฟอร์มสะอาด',
          'ปิดแผลด้วยพลาสเตอร์กันน้ำ'
        ]
      },
      {
        title: '2. สุขอนามัยส่วนบุคคล (Personal Hygiene) — สิ่งที่ห้ามทำ',
        items: [
          'ไม่ใส่เครื่องประดับ เช่น แหวน หรือสร้อย',
          'ห้ามไอหรือจามใส่อาหาร',
          'ห้ามทำงานเมื่อป่วย โดยเฉพาะท้องเสีย ไข้ หรืออาเจียน'
        ]
      },
      {
        title: '3. การล้างมือที่ถูกต้อง (Hand Washing)',
        items: [
          'ขั้นตอนอย่างน้อย 20 วินาที: เปียกมือ → ใส่สบู่ → ถูฝ่ามือ หลังมือ ซอกนิ้ว และเล็บ → ล้างออก → เช็ดด้วยกระดาษ',
          'จุดที่ต้องล้างมือ: ก่อนทำอาหาร',
          'จุดที่ต้องล้างมือ: หลังเข้าห้องน้ำ',
          'จุดที่ต้องล้างมือ: หลังจับเงิน ขยะ หรือของดิบ'
        ]
      },
      {
        title: '4. การป้องกันการปนเปื้อน (Cross Contamination)',
        items: [
          'แยกของดิบและของสุกออกจากกัน',
          'ใช้เขียงแยกสีตามประเภทอาหาร',
          'ไม่ใช้มีดร่วมกันระหว่างของดิบและของพร้อมรับประทาน',
          'เก็บอาหารในภาชนะที่ปิดสนิท',
          'ตัวอย่าง: ไก่ดิบห้ามใช้เขียงเดียวกับผักสด'
        ]
      },
      {
        title: '5. การจัดเก็บอาหาร (Food Storage)',
        items: [
          'อาหารร้อนต้องเก็บมากกว่า 60°C',
          'อาหารเย็นต้องเก็บต่ำกว่า 5°C',
          'ใช้หลัก FIFO: First In First Out',
          'ติดฉลากวันหมดอายุหรือวันเตรียมอาหารให้ชัดเจน'
        ]
      },
      {
        title: '6. การทำความสะอาด (Cleaning & Sanitizing)',
        items: [
          'Cleaning คือการล้างคราบสกปรก',
          'Sanitizing คือการฆ่าเชื้อ',
          'ล้างอุปกรณ์ทุกครั้งหลังใช้งาน',
          'ทำความสะอาดพื้นที่ครัวทุกวัน',
          'ใช้น้ำยาฆ่าเชื้อตามมาตรฐานของร้าน'
        ]
      },
      {
        title: '7. การควบคุมแมลงและสัตว์พาหะ',
        items: [
          'ปิดฝาถังขยะให้เรียบร้อย',
          'ไม่ทิ้งเศษอาหารค้างคืน',
          'ตรวจสอบหนูและแมลงอย่างสม่ำเสมอ'
        ]
      },
      {
        title: '8. พฤติกรรมต้องห้ามในครัว',
        items: [
          'ห้ามใช้มือถือระหว่างทำอาหาร',
          'ห้ามชิมอาหารด้วยช้อนเดิม',
          'ห้ามวางของบนพื้น'
        ]
      }
    ],
    tips: [
      'ถ้าไม่แน่ใจเรื่องสุขอนามัย ให้หยุดก่อนแล้วถามหัวหน้าทันที',
      'ยึดหลัก สะอาด แยกเก็บ ถูกอุณหภูมิ และไม่ปนเปื้อน',
      'พนักงานทุกคนต้องรับผิดชอบเรื่อง hygiene ไม่ใช่เฉพาะในครัวเท่านั้น'
    ]
  },
  {
    id: 'food-allergy',
    category: 'Safety',
    level: 'Core',
    title: 'Food Allergy สำหรับร้านอาหาร',
    summary: 'พื้นฐานที่พนักงานต้องรู้เมื่อลูกค้าแจ้งแพ้อาหาร เพื่อสื่อสารกับครัวและบริการได้อย่างปลอดภัย',
    sections: [
      {
        title: '1. Allergen ที่พบบ่อย',
        items: [
          'ถั่วและถั่วเปลือกแข็ง',
          'นมและผลิตภัณฑ์นม',
          'ไข่',
          'แป้งสาลีและกลูเตน',
          'ปลาและอาหารทะเลมีเปลือก',
          'ถั่วเหลือง'
        ]
      },
      {
        title: '2. สิ่งที่พนักงานต้องทำทันที',
        items: [
          'ถามลูกค้าให้ชัดว่าแพ้อะไร',
          'ทวนคำพูดลูกค้าอีกครั้งเพื่อความแน่ใจ',
          'แจ้งครัวทันที',
          'ห้ามเดาเองเรื่องส่วนผสม'
        ]
      },
      {
        title: '3. การป้องกันความเสี่ยง',
        items: [
          'ระวัง cross contamination',
          'ใช้อุปกรณ์แยกเมื่อจำเป็น',
          'เช็กซอส น้ำสต็อก และ garnish ทุกครั้ง',
          'หากไม่มั่นใจ ให้เสนอเมนูที่ปลอดภัยกว่า'
        ]
      },
      {
        title: '4. ประโยคสำคัญที่ควรรู้',
        items: [
          'Do you have any food allergies? = คุณมีอาการแพ้อาหารอะไรไหมคะ',
          'I will check with the kitchen. = ดิฉันจะเช็กกับครัวให้ค่ะ',
          'This dish may contain nuts. = เมนูนี้อาจมีถั่วเป็นส่วนผสม',
          'We will avoid cross contamination. = เราจะระวังการปนเปื้อนข้ามค่ะ'
        ]
      }
    ],
    tips: [
      'เมื่อลูกค้าแจ้งแพ้อาหาร ต้องให้ความสำคัญระดับสูงเสมอ',
      'ห้ามพูดว่า ไม่มีแน่นอน ถ้ายังไม่ได้ตรวจสอบกับครัว',
      'ถ้าสงสัย ให้ถามเพิ่มและบันทึกให้ชัด'
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

const ENGLISH_ORDER = ['restaurant', 'vegetables', 'fruits', 'takingOrders', 'conversation'];

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
  englishPack: { subcategory: 'restaurant', query: '' }
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
    node.querySelector('.open-btn').onclick = () => openLesson(lesson.id);
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
  const source = ENGLISH_DATA[category]?.items || [];
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
  const currentKey = state.englishPack.subcategory;
  const currentMeta = ENGLISH_DATA[currentKey];
  const items = getEnglishItems();
  const total = ENGLISH_ORDER.reduce((sum, key) => sum + (ENGLISH_DATA[key]?.items?.length || 0), 0);
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
        ${ENGLISH_ORDER.map(key => `<button class="subtab ${key === currentKey ? 'active' : ''}" data-subcat="${key}">${ENGLISH_DATA[key].title}</button>`).join('')}
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
  readerView.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
