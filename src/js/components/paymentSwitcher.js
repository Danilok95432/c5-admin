const buttons = document.querySelectorAll('.payment-switch-mode button')
const hiddenInput = document.querySelector(
  '.payment-switch-mode input[type="hidden"]',
)
const paymentDesc = document.querySelector('.payment-desc')

if (buttons && hiddenInput && paymentDesc) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('_active'))
      button.classList.add('_active')
      if (button.textContent.includes('Тестовый')) {
        hiddenInput.value = '0'
        paymentDesc.innerHTML = `Сейчас включен тестовый режим, и Вы <span> не можете </span>принимать платежи от реальных клиентов`
      } else {
        hiddenInput.value = '1'
        paymentDesc.innerHTML = `Сейчас включен коммерческий режим, и <span class="afford">Вы можете</span> принимать платежи от реальных клиентов`
      }
    })
  })
}
