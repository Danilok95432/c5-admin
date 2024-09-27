const mobileAuthPanel = document.querySelector('.mobile-auth-panel')

if (mobileAuthPanel) {
  // Логика бургер меню
  const burgerBtn = mobileAuthPanel.querySelector(
    '.mobile-auth-panel__burger-btn',
  )
  const mobileMenu = mobileAuthPanel.querySelector('.mobile-auth-menu')

  burgerBtn?.addEventListener('click', () => {
    burgerBtn.classList.toggle('_open')
    mobileMenu.classList.toggle('_open')
  })
  // Логика меню настроек
  const settingsBtn = mobileAuthPanel.querySelector(
    '.mobile-auth-panel__settings',
  )
  const settingsMenu = mobileAuthPanel.querySelector('.settings-auth-menu')

  settingsBtn?.addEventListener('click', () => {
    settingsBtn.classList.toggle('_open')
    settingsMenu.classList.toggle('_open')
  })
}
