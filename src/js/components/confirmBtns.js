const confirmBtns = document.querySelectorAll('[data-btn="confirm"]')

if (confirmBtns) {
  confirmBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()

      let isDelete = confirm('Вы действительно хотите удалить запись?')
      alert(isDelete)
    })
  })
}
