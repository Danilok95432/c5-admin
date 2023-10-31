const toggleMenus = document.querySelectorAll('.toggle-menu')

if (toggleMenus) {
  toggleMenus.forEach((menu) => {
    menu.addEventListener('click', (e) => {
      const target = e.target
      toggleSubInfo(target)
    })
  })
}

function toggleSubInfo(elem) {
  const parentNode = elem.parentNode
  parentNode.classList.toggle('_active')
}
