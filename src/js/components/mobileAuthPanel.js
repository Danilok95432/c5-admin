const mobileAuthPanel = document.querySelector('.mobile-auth-panel')

if (mobileAuthPanel) {
  // Логика бургер меню
  const burgerBtn = mobileAuthPanel.querySelector(
    '.mobile-auth-panel__burger-btn',
  )

  burgerBtn?.addEventListener('click', () => {
    burgerBtn.classList.toggle('_open')
  })
}
