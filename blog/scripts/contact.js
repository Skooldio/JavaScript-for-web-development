document
  .getElementById('contactForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    // รับข้อมูลจาก form 3 field
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const email = document.getElementById('email').value

    // เช็ค name ว่าตัวอักษรเท่านั้น
    const nameRegex = /^[a-zA-Z]+$/
    // เช็ค email ว่าตรงตามรูปแบบอีเมล์หรือไม่
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    // เพิ่ม validation เพื่อให้ข้อมูลตรงตามรูปแบบที่กำหนด
    if (!nameRegex.test(firstname)) {
      alert('กรุณากรอกชื่อให้ถูกต้อง')
      return
    }

    if (!nameRegex.test(lastname)) {
      alert('กรุณากรอกนามสกุลให้ถูกต้อง')
      return
    }

    if (!emailRegex.test(email)) {
      alert('กรุณากรอกอีเมลให้ถูกต้อง')
      return
    }

    const formData = {
      firstname,
      lastname,
      email,
    }

    try {
      const response = await axios.post(
        'https://656469caceac41c0761e22d5.mockapi.io/users',
        formData
      )
      console.log(response)
      alert('ทำการบันทึกเรียบร้อย')
    } catch (error) {
      console.error(error)
      alert('มีปัญหาขณะบันทึกข้อมูล')
    }
  })
