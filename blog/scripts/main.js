document.addEventListener('DOMContentLoaded', async function () {
  const blogContainer = document.getElementById('blog-container')

  // 1. ดึงข้อมูลจาก API Blog ออกมาที่ javascript
  try {
    const response = await axios.get(
      'https://65a25d5342ecd7d7f0a771bd.mockapi.io/blogs'
    )
    const blogData = response.data
    // 2. นำข้อมูลมาแปลงเป็น html

    let blogHTML = ''
    blogData.forEach((blog) => {
      let blogTemplate = `<div class="flex flex-col md:flex-row gap-6 w-full">
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

      blogHTML += blogTemplate
    })

    blogContainer.innerHTML = blogHTML
  } catch (error) {
    console.log('error', error)
  }
})
