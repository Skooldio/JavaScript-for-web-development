document.addEventListener('DOMContentLoaded', async function () {
  const blogContainer = document.getElementById('blog-container')
  const searchText = document.getElementById('searchText')
  const sortOption = document.getElementById('sortOption')
  // 1. เพิ่ม selector ของ Search, Sort เข้ามา

  let blogData = []

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
    blogData = response.data

    let blogHTML = ''
    blogData.forEach((blog) => {
      let blogTemplate = htmlTemplate(blog)
      blogHTML += blogTemplate
    })

    blogContainer.innerHTML = blogHTML
  } catch (error) {
    console.log('error', error)
  }

  // 2. เพิ่ม add Event Listener เพื่อใช้สำหรับดักจับ input และ sort

  let timerSearch = null
  searchText.addEventListener('input', (event) => {
    blogContainer.innerHTML = 'Loading...'

    if (timerSearch) {
      clearTimeout(timerSearch)
    }

    timerSearch = setTimeout(() => {
      const inputValue = event.target.value
      // ทำ something เพื่อนำกลับไป update ที่ blogContainer
      const filterBlogData = blogData.filter((blog) => {
        return blog.title.includes(inputValue)
      })

      let blogHTML = ''
      filterBlogData.forEach((blog) => {
        let blogTemplate = htmlTemplate(blog)
        blogHTML += blogTemplate
      })
      blogContainer.innerHTML = blogHTML
    }, 2000)
  })

  // 3. เพิ่ม การ search และ sort และนำค่ากลับไปไว้ตำแหน่งเดิมได้
  sortOption.addEventListener('change', (event) => {
    const sortValue = event.target.value
    let sortedBlogData = []
    if (sortValue === 'asc') {
      sortedBlogData = blogData.sort((a, b) => {
        return new Date(a.publishedDate) - new Date(b.publishedDate)
      })
    } else if (sortValue === 'desc') {
      sortedBlogData = blogData.sort((a, b) => {
        return new Date(b.publishedDate) - new Date(a.publishedDate)
      })
    }
    let blogHTML = ''
    sortedBlogData.forEach((blog) => {
      let blogTemplate = htmlTemplate(blog)
      blogHTML += blogTemplate
    })
    blogContainer.innerHTML = blogHTML
  })
})
