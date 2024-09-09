# Developing Website with Modern JS

Repository นี้สำหรับเก็บ Source code สำหรับ workshop หัวข้อ "Developing Website with Modern JS" ของ bootcamp โดยจะมีการแยก branch สำหรับ code ของ workshop ไว้ตามนี้

1. `bootcamp/blog-workshop` code คำตอบสำหรับ Workshop Blog section

2. `bootcamp/blog-advance` code คำตอบสำหรับ Assignment ในหัวข้อ Blog

3. `bootcamp/blog-addons-workshop` code คำตอบสำหรับ Advance Feature ของ Blog

4. `bootcamp/blog-addons-advance` code คำตอบสำหรับ Assignment ในหัวข้อ Blog Advance

5. `bootcamp-2/workshop` code คำตอบสำหรับ Assignment ในหัวข้อ Blog (สำหรับ Web Bootcamp 2)

# สำหรับ Folder ใน Repository นี้
Repository นี้ได้มีการแบ่งแยกส่วนต่างๆ ออกเป็นหัวข้อต่างๆ ดังนี้
1. `assignment` สำหรับเก็บโจทย์การทำงานของแต่ละหัวข้อ (โดยจะอ้างอิงตาม Chapter ที่อยู่ใน slide `Developing Website with Modern JS`) โดยจะมี sub folder ที่มีการแบ่งออกเป็น 2 ส่วน คือ 
  - `task` สำหรับเก็บโจทย์การทำงาน
  - `answer` สำหรับเก็บคำตอบของแต่ละโจทย์
- โดยใน sub folder จะมีการเก็บ code ของแต่ละหัวข้อไว้ที่นั่น
2. `blog` สำหรับเก็บ code สำหรับตัวอย่าง Blog Workshop และ Advance Feature ของ Blog

สำหรับการลง blog นั้นให้ดำเนิน ต่อไปนี้ สำหรับ run project ขึ้นมา
- ให้ดำเนินการเปิด folder `blog` ที่ vscode
- เปิด terminal ของ vscode และพิมพ์ command ต่อไปนี้
```shell
# สำหรับลง tailwind และ start tailwind
npm install
npm start
```
- เมื่อ run เสร็จแล้วให้เปิด Live server ขึ้นมาก็จะเห็น style ที่ถูกต้องออกมาได้