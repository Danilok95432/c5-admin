const confirmBtns = document.querySelectorAll('[data-btn="confirm"]')

if (confirmBtns) {
  confirmBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const hrefLink = e.target?.href

      let isDelete = confirm('Вы действительно хотите удалить запись?')
      if (isDelete && hrefLink) {
        location.href = hrefLink
      }
    })
  })
}
