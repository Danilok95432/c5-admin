const buttons = document.querySelectorAll('.payment-switch-mode button')
const hiddenInput = document.querySelector(
  '.payment-switch-mode input[type="hidden"]',
)

if (buttons && hiddenInput) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('_active'))
      button.classList.add('_active')
      if (button.textContent.includes('Тестовый')) {
        hiddenInput.value = '0'
      } else {
        hiddenInput.value = '1'
      }
    })
  })
}
