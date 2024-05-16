//Сортировка на сервере

const serverSelects = document.querySelectorAll('.server-sort')

if (serverSelects) {
  serverSelects.forEach((select) => {
    select.addEventListener('input', (e) => {
      let linkUrl = e.target.selectedOptions[0].dataset.url
      if (linkUrl) {
        window.location.href = linkUrl
      }
    })
  })
}
