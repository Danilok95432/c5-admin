const mailSettingsPage = document.querySelector('.mail-settings-page')
if (mailSettingsPage) {
  const showBtn = mailSettingsPage.querySelector('.btn-show-name')
  if (showBtn) {
    showBtn.addEventListener('click', () => {
      showBtn.classList.toggle('_close')
    })
  }
}
