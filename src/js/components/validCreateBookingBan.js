import AirDatepicker from 'air-datepicker'
import { sendData, areDateRangesIntersecting } from '../_functions'
import { showInfoModal } from '../_functions'

const bookingBanPage = document.querySelector('.create-booking-ban-page')
const bookingBanForm = document.querySelector('.create-booking-ban-form')
const checkIn = bookingBanForm.querySelector('.main-input[name="start-date"]')
const checkOut = bookingBanForm.querySelector('.main-input[name="end-date"]')

const getBookingData = async (date) => {
  const dataScript = bookingBanForm.dataset.script
  const objData = {
    date: String(date),
  }
  const jsonData = JSON.stringify(objData)
  const response = await sendData(jsonData, dataScript)
  const finishedResponse = await response.json()
  return finishedResponse
}

let dateInfo = null

const initializeDateInfo = async () => {
  const presentDay = new Date()
  dateInfo = await getBookingData(presentDay)
}

initializeDateInfo()

new AirDatepicker(checkIn, {
  onSelect: async ({ date }) => {
    const newStartDate = new Date(date)
    dateInfo = await getBookingData(newStartDate)
  },
  selectedDates: [new Date()],
})

new AirDatepicker(checkOut, {
  onSelect: async ({ date }) => {
    const newStartDate = new Date(date)
    dateInfo = await getBookingData(newStartDate)
  },
  selectedDates: [new Date()],
})

if (bookingBanPage && bookingBanForm) {
  const sumbitBtns = bookingBanPage.querySelectorAll('.main-btn')
  sumbitBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const roomCategorySelect = bookingBanForm.querySelector(
        'select[name="room_category"]',
      )
      const roomCategory =
        roomCategorySelect.options[roomCategorySelect.selectedIndex].text
      const roomNumberSelect = bookingBanForm.querySelector(
        'select[name="room"]',
      )
      const roomNumber =
        roomNumberSelect.options[roomNumberSelect.selectedIndex].text
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
      let datesRange = []
      datesRange.push([
        checkIn.value + ' в ' + checkInTime + ':00',
        checkOut.value + ' в ' + checkOutTime + ':00',
      ])
      await validateCreateBan(datesRange, roomNumber, roomCategory, dateInfo)
    })
  })
}

const validateCreateBan = async (datesRange, room, category, dataInfo) => {
  let flag = false
  if (dataInfo) {
    for (const row of dataInfo.rows) {
      if (row.cells[0] === category) {
        for (const elem of row.childRows) {
          for (const cell of elem.cells) {
            if (cell.room === room) {
              datesRange.push([cell.checkIn, cell.checkOut])
              flag = areDateRangesIntersecting(datesRange)
              if (flag) {
                datesRange.pop()
                showInfoModal('На выбранные даты нет мест')
                return {
                  status: 'error',
                  errortext: 'На выбранные даты нет мест',
                }
              } else {
                datesRange.pop()
              }
            }
          }
        }
      }
    }
    return { status: 'ok' }
  } else {
    showInfoModal('Нет данных о заказах')
    return {
      status: 'error',
      errortext: 'Нет данных о заказах',
    }
  }
}
