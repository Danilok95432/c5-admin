import { sendData, showInfoModal } from '../_functions'

const dashboardPage = document.querySelector('.dashboard-page')

if (dashboardPage) {
  const checkBtns = dashboardPage.querySelectorAll('button[data-submit]')

  checkBtns.forEach((btnEl) => {
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
          if (btnEl.classList.contains('_success')) {
            btnEl.classList.remove('_success')
            btnEl.textContent = btnEl.classList.contains('_check-in')
              ? 'Заселить'
              : 'Выселить'
          } else {
            btnEl.classList.add('_success')
            btnEl.textContent = btnEl.classList.contains('_check-in')
              ? 'Заселен'
              : 'Выселен'
          }
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
