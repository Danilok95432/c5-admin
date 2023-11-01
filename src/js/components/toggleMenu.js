const toggleMenus = document.querySelectorAll('.toggle-menu')

if (toggleMenus) {
  toggleMenus.forEach((menu) => {
    menu.addEventListener('click', (e) => {
      const target = e.target
      const parentNode = target.closest('.toggle-menu__item')
      parentNode.classList.toggle('_active')
    })
  })
}
