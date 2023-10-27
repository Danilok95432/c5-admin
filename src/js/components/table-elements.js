import { sendData, showInfoModal } from '../_functions'

const tableElements = document.querySelector('.table-elements')

if (tableElements) {
  const resizeElements = tableElements.querySelectorAll(
    'form, .main-table__cell',
  )
  resizeElements.forEach((el) => {
    if (el.dataset.width) {
      el.style.maxWidth = `${el.dataset.width}%`
    }
  })

  const inputCountForm = tableElements?.querySelectorAll(
    '.table-elements__form-count',
  )

  inputCountForm?.forEach((el) => {
    el.addEventListener('input', async (e) => {
      const dataScript = e.currentTarget.dataset.script
      const data = {
        elements_count: e.target.value,
      }
      const jsonData = JSON.stringify(data)
      try {
        const response = await sendData(jsonData, dataScript)
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
