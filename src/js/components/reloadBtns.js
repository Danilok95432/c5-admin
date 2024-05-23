const reloadBtns = document.querySelectorAll('.reload-btn')

if (reloadBtns) {
  reloadBtns.forEach((reloadBtn) => {
    reloadBtn.addEventListener('click', (e) => {
      e.preventDefault()
      location.reload()
    })
  })
}
