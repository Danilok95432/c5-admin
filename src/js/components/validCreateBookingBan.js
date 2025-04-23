import AirDatepicker from 'air-datepicker'
import { sendData } from '../_functions'
import { showInfoModal } from '../_functions'

const bookingBanPage = document.querySelector('.create-booking-ban-page')
const bookingBanForm = document.querySelector('.create-booking-ban-form')

const validateBookingBanData = async (
  room,
  startDate,
  startTime,
  endDate,
  endTime,
) => {
  const dataScript = bookingBanForm.dataset.script
  const objData = {
    id_room: room,
    begin_date: String(startDate),
    begin_time: startTime,
    end_date: String(endDate),
    end_time: endTime,
  }
  const jsonData = JSON.stringify(objData)
  const response = await sendData(jsonData, dataScript)
  const finishedResponse = await response.json()
  return finishedResponse
}

if (bookingBanPage && bookingBanForm) {
  const checkIn = bookingBanForm.querySelector('.main-input[name="start-date"]')
  const checkOut = bookingBanForm.querySelector('.main-input[name="end-date"]')
  new AirDatepicker(checkIn, {
    selectedDates: [new Date()],
  })

  new AirDatepicker(checkOut, {
    selectedDates: [new Date()],
  })
  const sumbitBtns = bookingBanPage.querySelectorAll('.main-btn')
  sumbitBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      event.preventDefault()

      const roomNumberSelect = bookingBanForm.querySelector(
        'select[name="room"]',
      )
      const roomNumber = roomNumberSelect.value
      const checkInTimeSelect = bookingBanForm.querySelector(
        'select[name="start-hour"]',
      )
      const checkInTime =
        checkInTimeSelect.options[checkInTimeSelect.selectedIndex].text
      const checkOutTimeSelect = bookingBanForm.querySelector(
        'select[name="end-hour"]',
      )
      const checkOutTime =
        checkOutTimeSelect.options[checkOutTimeSelect.selectedIndex].text

      validateBookingBanData(
        roomNumber,
        checkIn.value,
        checkInTime,
        checkOut.value,
        checkOutTime,
      ).then((res) => {
        if (res.status === 'error') {
          showInfoModal(res.errortext)
        } else if (res.status === 'ok') {
          bookingBanForm.submit()
        }
      })
    })
  })
}
