import { sendData, showInfoModal } from '../_functions'

const submitBtns = document.querySelectorAll('button[data-submit]')

if (submitBtns?.length) {
  submitBtns.forEach((btnEl) => {
    const submitScript = btnEl.dataset.submit
    const submitId = btnEl.dataset.id
    btnEl.addEventListener('click', async (e) => {
      e.preventDefault()
      const data = {
        id: submitId,
      }
      const jsonData = JSON.stringify(data)

      try {
        const response = await sendData(jsonData, submitScript)
        const finishedResponse = await response.json()

        const { status, errortext } = finishedResponse
        if (status === 'ok') {
          location.reload()
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        showInfoModal('Во время выполнения запроса произошла ошибка')
        console.error(err)
      }
    })
  })
}
