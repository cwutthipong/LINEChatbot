โดยลำดับในการพัฒนาจะมีดังนี้

สร้าง Webhook ด้วย Firebase Cloud Functions

- สร้าง Project ใน Firebase console https://console.firebase.google.com/
- เปิดใช้งาน Cloud functions โดย Upgrade project จาก Spark Plan เป็น Blaze Plan
- ติดตั้ง Firebase command line tools โดยใช้คำสั่ง npm install -g firebase-tools
- สร้าง Project สำหรับพัฒนา โดยใช้คำสั่ง firebase init เลือกติดตั้ง Functions และ Functions Emulator

เริ่มเขียนโค้ดเพื่อสร้าง Webhook

- เข้าไปที่ Directory functions
- แก้ไขไฟล์ package.json ใช้ node version 20
- สร้าง file: .env สำหรับเก็บ Channel Access Token, Channel ID, Channel Secret
- สร้าง folder: api และสร้าง file: line.js
- ติดตั้ง axios โดยใช้คำสั่ง npm install axios
- สร้าง folder: msg และสร้าง file: text.js และ sticker.js
- แก้ไขไฟล์ index.js
- ทดสอบการใช้งานโดยใช้คำสั่ง firebase emulators:start
- ใช้ ngrok เพื่อสร้าง tunnel สำหรับการเรียกใช้งานจากภายนอก
- นำ url webhook ที่ได้ ไปใส่ใน LINE Developer Console
- ทดสอบแล้วสามารถใช้คำสั่ง firebase deploy เพื่อ deploy functions แล้วนำ webhook ที่ได้ ไปใส่ใน LINE Developer Console

รายละเอียดให้ลองทำตามวิดีโอนี้ได้
Video: https://youtu.be/OSmf5q8K1eY
