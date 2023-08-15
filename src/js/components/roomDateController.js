import AirDatepicker from "air-datepicker";
import {defineWeekDay, sendData, showInfoModal} from "../_functions";

const roomDateController = document.querySelector('.room-date-controller')
const getCellsContent = async (dateInfo) => {
  const bookingTableWrapper = document.querySelector('.room-booking-calendar')
  const dataScript = bookingTableWrapper.dataset.script

  const objData = {
    date: dateInfo
  }
  const jsonData = JSON.stringify(objData)

  try {
    const response = await sendData(jsonData, dataScript)
    const finishedResponse = await response.json()

    const {status, errortext, rows} = finishedResponse

    if (status === 'ok') {
      console.log(rows)

    } else {
      showInfoModal(errortext)
    }
  } catch (err) {
    showInfoModal("Во время выполнения запроса произошла ошибка")
    console.error(err)
  }
}

if (roomDateController) {
  const calendarInput = roomDateController.querySelector('.date-mask')
  const datePreview = roomDateController.querySelector('.room-date-controller__date-preview')
  const switcherDate = roomDateController.querySelector('.room-date-controller__switcher-date')


  const prevCalendarBtn = roomDateController.querySelector('.room-date-controller__switcher-btn.prev-btn')
  const nextCalendarBtn = roomDateController.querySelector('.room-date-controller__switcher-btn.next-btn')


  const presentDay = new Date()
  getCellsContent(presentDay)
  const customRoomCalendar = new AirDatepicker(calendarInput, {
    onSelect: ({date, formattedDate}) => {
      datePreview.textContent = customRoomCalendar.formatDate(date, 'MMMM yyyy');
      const nowDateFormatted = customRoomCalendar.formatDate(presentDay, 'dd.MM.yyyy');

      if (formattedDate === nowDateFormatted) {
        switcherDate.textContent = 'сегодня'
      } else {
        switcherDate.textContent = formattedDate
      }

      renderDateRow(customRoomCalendar.getViewDates('days'))
      getCellsContent(date)

    },
    selectedDates: [presentDay]
  })

  calendarInput.addEventListener('click', (e) => {
    const featuredDate = e.currentTarget.value.split('.').reverse().join('-')
    if (featuredDate) {
      customRoomCalendar.selectDate(featuredDate)
      customRoomCalendar.setViewDate(featuredDate)
    }
  })

  const getInputDate = (input) => {
    if (input.value) {
      const formatDate = input.value.split(".").reverse().join("-")
      const resDate = new Date(formatDate)
      return resDate
    } else {
      return new Date()
    }
  }

  nextCalendarBtn.addEventListener('click', () => {
    const currentDate = getInputDate(calendarInput)
    let nextDate = currentDate.setDate(currentDate.getDate() + 1)
    customRoomCalendar.selectDate(nextDate)
  })
  prevCalendarBtn.addEventListener('click', () => {
    const currentDate = getInputDate(calendarInput)
    let prevDate = currentDate.setDate(currentDate.getDate() - 1)
    customRoomCalendar.selectDate(prevDate)
  })


  //отрисовка таблицы с датами бронирования


  const setDateTypeClass = (checkedDate) => {
    const nowDate = customRoomCalendar.selectedDates
    const nowDateFormatted = customRoomCalendar.formatDate(nowDate, 'dd.MM.yyyy');
    const checkedDateFormatted = customRoomCalendar.formatDate(checkedDate, 'dd.MM.yyyy');
    const nowMonthFormatted = customRoomCalendar.formatDate(nowDate, 'MM');
    const checkedMonthFormatted = customRoomCalendar.formatDate(checkedDate, 'MM');
    if (nowDateFormatted === checkedDateFormatted) {
      return '_active-day'
    }
    if (nowMonthFormatted !== checkedMonthFormatted) {
      return '_no-current'
    }
    return ''
  }


  const bookingTable = document.querySelector('.room-booking-calendar table')
  const bookingTableTitleRow = bookingTable.querySelector('thead tr')


  const renderDateRow = (cellArr) => {
    const html = cellArr.map(dateEl => {
      return (`<th class="day-cell ${setDateTypeClass(dateEl)}">
<span>${customRoomCalendar.formatDate(dateEl, 'dd')}</span>
<span>${defineWeekDay(dateEl)}</span>
</th>`)
    })
    html.unshift('<th>Номера</th>')
    bookingTableTitleRow.innerHTML = html.join('')
  }

  renderDateRow(customRoomCalendar.getViewDates('days'))


  // Получение контента ячеек от сервер


}
