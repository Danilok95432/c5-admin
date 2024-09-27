import { sendData, showInfoModal } from '../_functions'

const bookingControl = document.querySelector('.booking-script-control')

if (bookingControl) {
  const handleSendId = async (e, msg) => {
    let currentBtn = e.currentTarget

    if (currentBtn.classList.contains('_delete-booking')) {
      let isConfirm = confirm(msg)
      if (!isConfirm) return
    }
    const dataScript = currentBtn.dataset.script
    const dataId = currentBtn.dataset.id
    const objData = {
      id: dataId,
    }
    const jsonData = JSON.stringify(objData)

    try {
      const response = await sendData(jsonData, dataScript)
      const finishedResponse = await response.json()

      const { status, errortext } = finishedResponse

      if (status === 'ok') {
        if (currentBtn.classList.contains('_confirm-booking')) {
          alert(msg)
        }
        location.reload()
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal('Во время выполнения запроса произошла ошибка')
      console.error(err)
    }
  }

  const deleteBookingBtn = bookingControl.querySelector(
    '.main-btn._delete-booking',
  )
  const confirmBookingBtn = bookingControl.querySelector(
    '.main-btn._confirm-booking',
  )

  deleteBookingBtn.addEventListener('click', (e) => {
    handleSendId(e, 'Вы действительно хотите удалить бронирование?')
  })

  confirmBookingBtn.addEventListener('click', (e) => {
    handleSendId(e, 'Бронирование подтверждено!')
  })
}
