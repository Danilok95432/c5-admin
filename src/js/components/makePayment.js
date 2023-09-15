import { sendData, showInfoModal } from '../_functions'

const makePaymentBtn = document.querySelector(
  '.edit-booking-page__make-payment-btn',
)

if (makePaymentBtn) {
  const dataScript = makePaymentBtn.dataset.script
  const dataAdd = makePaymentBtn.dataset.add

  const handleMakePayment = async (e) => {
    e.preventDefault()
    const inputPayment = document.querySelector(
      '.edit-booking-page__make-payment-input',
    )
    const data = {
      value: inputPayment.value,
      add: dataAdd,
    }
    const jsonData = JSON.stringify(data)

    try {
      const response = await sendData(jsonData, dataScript)
      const finishedResponse = await response.json()

      const { status, errortext } = finishedResponse
      if (status === 'ok') {
        inputPayment.value = ''
        console.log('оплата зачтена')
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal('Во время выполнения запроса произошла ошибка')
      console.error(err)
    }
  }

  makePaymentBtn.addEventListener('click', handleMakePayment)
}
