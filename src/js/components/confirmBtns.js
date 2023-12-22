const confirmBtns = document.querySelectorAll('[data-btn="confirm"]')

if (confirmBtns) {
  confirmBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const hrefLink = e.target?.href
      const customConfirmText = e.currentTarget?.dataset.confirm

      let isDelete = confirm(
        customConfirmText ?? 'Вы действительно хотите удалить запись?',
      )
      if (isDelete && hrefLink) {
        location.href = hrefLink
      }
    })
  })
}
