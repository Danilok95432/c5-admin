const authPanel = document.querySelector('.auth-panel')

if (authPanel) {
  const settingsMenu = authPanel.querySelector('.settings-menu')
  const settingsBtn = authPanel.querySelector('.auth-panel__settings')

  authPanel?.addEventListener('click', (e) => {
    if (e.target.classList.contains('settings-menu__overlay')) {
      settingsMenu.classList.remove('_active')
    }
  })

  settingsBtn?.addEventListener('click', () => {
    settingsMenu.classList.toggle('_active')
  })
}
