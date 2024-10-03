const saveDataTabMenu = document.querySelector('.tab-menu._save-data')

if (saveDataTabMenu) {
  const saveDataLinks = saveDataTabMenu.querySelectorAll('a[data-script]')
  const activeLink = saveDataTabMenu.querySelector('a._active')
  const currentScript = activeLink.dataset.script

  saveDataLinks.forEach((linkEl) => {
    linkEl.addEventListener('click', (e) => {
      e.preventDefault()
      if (!linkEl.classList.contains('_active')) {
        const currentForm = document?.querySelector('main form')
        if (currentForm) {
          currentForm.action = currentScript
          currentForm.submit()
        }
      }
    })
  })
}
