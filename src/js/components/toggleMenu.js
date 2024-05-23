const toggleMenus = document.querySelectorAll('.toggle-menu')

if (toggleMenus) {
  toggleMenus.forEach((menu) => {
    menu.addEventListener('click', (e) => {
      const target = e.target
      const parentNode = target.closest('.toggle-menu__item')

      const toggleMenusItems = menu.querySelectorAll('.toggle-menu__item')

      toggleMenusItems.forEach((item) => item.classList.remove('_active'))
      parentNode.classList.add('_active')
    })
  })
}
