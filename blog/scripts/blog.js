document.addEventListener('DOMContentLoaded', async function () {
  // เพิ่ม selector ของ Search, Sort และ Blog Container (ตรงจุดแสดงผล) เข้ามา
  const blogContainer = document.getElementById('blog-container')
  const searchText = document.getElementById('searchText')
  const sortOption = document.getElementById('sortOption')

  // เพิ่มตัวแปรสำหรับเก็บข้อมูลจาก API
  let blogData = []

  // สร้าง ตัวแปร Search และ Sort สำหรับเก็บข้อมูลเป็นค่ากลางไว้
  let searchValue = ''
  let sortValue = ''

  const htmlTemplate = (blog) => {
    return `<div class="flex flex-col md:flex-row gap-6 w-full">
        <img
          src="${blog.imageUrl}"
          alt="feature image 1"
          class="w-full md:w-auto"
        />
        <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
          <h3 class="text-2xl font-semibold">
            ${blog.title}
          </h3>
          <p class="text-xl font-light">
             ${blog.description}
          </p>
          <p>At ${blog.publishedDate}</p>
          <a href="${blog.url}">Read more</a>
        </div>
      </div>`
  }

  try {
    const response = await axios.get(
      'https://65a25d5342ecd7d7f0a771bd.mockapi.io/blogs'
    )
    // เก็บข้อมูลจาก API ในตัวแปร blogData
    blogData = response.data.map((blog) => {
      return {
        ...blog,
        publishedDate: new Date(blog.publishedDate).toLocaleDateString()
      }
    })

    let blogHTML = ''
    blogData.forEach((blog) => {
      let blogTemplate = htmlTemplate(blog)
      blogHTML += blogTemplate
    })

    // แสดงข้อมูลจาก API ที่ได้จากข้อมูลมาในหน้าเว็บ (โดยนำข้อมูลที่ได้จากข้อมูลมาแปลงเป็น html มาแสดงในหน้าเว็บ)
    blogContainer.innerHTML = blogHTML
  } catch (error) {
    console.log('error', error)
  }

  // สร้าง function สำหรับใช้ search และ sort รวมกัน
  const searchAndSort = () => {
    // ทำการ Clone ข้อมูล blogData เข้าไปใน resultBlogData
    let resultBlogData = structuredClone(blogData)

    // เช็คว่ามีค่า sortValue หรือไม่ ถ้ามีก็จะทำการ sort ข้อมูล
    if (sortValue) {
      if (sortValue === 'asc') {
        resultBlogData = resultBlogData.sort((a, b) => {
          return new Date(a.publishedDate) - new Date(b.publishedDate)
        })
      } else if (sortValue === 'desc') {
        resultBlogData = resultBlogData.sort((a, b) => {
          return new Date(b.publishedDate) - new Date(a.publishedDate)
        })
      }
    }

    // เช็คว่ามีค่า searchValue หรือไม่ ถ้ามีก็จะทำการ filter ข้อมูล
    if (searchValue) {
      resultBlogData = resultBlogData.filter((blog) => {
        return blog.title.includes(searchValue)
      })
    }

    return resultBlogData
  }

  // [Search] เพิ่ม Event Listener เพื่อใช้สำหรับดักจับการพิมพ์ input
  let timerSearch = null
  searchText.addEventListener('input', (event) => {
    blogContainer.innerHTML = 'Loading...'

    // ตรวจสอบว่ามีการตั้งค่าตัวแปร timerSearch หรือไม่ ถ้ามีก็จะทำการยกเลิกการตั้งค่านั้น (เพื่อป้องกันการทำงานซ้ำของ setTimeout)
    if (timerSearch) {
      clearTimeout(timerSearch)
    }

    timerSearch = setTimeout(() => {
      const inputValue = event.target.value

      // เก็บค่า inputValue ไว้ในตัวแปรกลาง
      searchValue = inputValue

      // ทำการกรองข้อมูลจาก blogData โดยตรวจสอบว่าข้อมูลที่กรองออกมานั้นมีคำที่ตรงกันหรือไม่
      const filterBlogData = searchAndSort()

      // ทำการแสดงข้อมูลจากการกรองข้อมูลที่ได้จากการกรองข้อมูลของ blogData
      let blogHTML = ''
      filterBlogData.forEach((blog) => {
        let blogTemplate = htmlTemplate(blog)
        blogHTML += blogTemplate
      })

      // ทำการแสดงข้อมูลจากการกรองข้อมูลที่ได้จากการกรองข้อมูลของ blogData
      blogContainer.innerHTML = blogHTML
    }, 2000)
  })

  // [Sort] เพิ่ม Event Listener เพื่อใช้สำหรับดักจับการเลือกตัวเลือกใน Sort
  sortOption.addEventListener('change', (event) => {
    const optionValue = event.target.value

    // เก็บค่า optionValue ไว้ในตัวแปรกลาง
    sortValue = optionValue

    let sortedBlogData = searchAndSort()
    let blogHTML = ''
    sortedBlogData.forEach((blog) => {
      let blogTemplate = htmlTemplate(blog)
      blogHTML += blogTemplate
    })
    blogContainer.innerHTML = blogHTML
  })
})
