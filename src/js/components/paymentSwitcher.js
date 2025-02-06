const buttons = document.querySelectorAll('.payment-switch-mode button')
const hiddenInput = document.querySelector(
  '.payment-switch-mode input[type="hidden"]',
)
const paymentDesc = document.querySelectorAll('.payment-desc')

if (buttons && hiddenInput && paymentDesc) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('_active')) {
        return
      }

      buttons.forEach((b) => b.classList.remove('_active'))
      button.classList.add('_active')

      if (button.textContent.includes('Тестовый')) {
        hiddenInput.value = '0'
        paymentDesc.forEach((desc) =>
          desc.classList.toggle('_active', desc === paymentDesc[0]),
        )
      } else {
        hiddenInput.value = '1'
        paymentDesc.forEach((desc) =>
          desc.classList.toggle('_active', desc === paymentDesc[1]),
        )
      }
    })
  })
}
