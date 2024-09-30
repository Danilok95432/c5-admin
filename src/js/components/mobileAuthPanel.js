const mobileAuthPanel = document.querySelector('.mobile-auth-panel')

if (mobileAuthPanel) {
  const removeOpenClass = (...elementsArr) => {
    elementsArr.forEach((el) => {
      if (el.classList.contains('_open')) {
        el.classList.remove('_open')
      }
    })
  }

  // Логика бургер меню
  const burgerBtn = mobileAuthPanel.querySelector(
    '.mobile-auth-panel__burger-btn',
  )
  const mobileMenu = mobileAuthPanel.querySelector('.mobile-auth-menu')

  burgerBtn?.addEventListener('click', () => {
    removeOpenClass(settingsBtn, settingsMenu, noticeBtn, noticeMenu)
    burgerBtn.classList.toggle('_open')
    mobileMenu.classList.toggle('_open')
  })
  // Логика меню настроек
  const settingsBtn = mobileAuthPanel.querySelector(
    '.mobile-auth-panel__settings',
  )
  const settingsMenu = mobileAuthPanel.querySelector('.settings-auth-menu')

  settingsBtn?.addEventListener('click', () => {
    removeOpenClass(burgerBtn, mobileMenu, noticeBtn, noticeMenu)
    settingsBtn.classList.toggle('_open')
    settingsMenu.classList.toggle('_open')
  })

  // Логика меню оповещений
  const noticeBtn = mobileAuthPanel.querySelector('.mobile-auth-panel__notice')
  const noticeMenu = mobileAuthPanel.querySelector('.mobile-notice-menu')

  noticeBtn?.addEventListener('click', () => {
    removeOpenClass(burgerBtn, mobileMenu, settingsBtn, settingsMenu)
    noticeBtn.classList.toggle('_open')
    noticeMenu.classList.toggle('_open')
  })
}
