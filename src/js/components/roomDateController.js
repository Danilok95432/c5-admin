import AirDatepicker from "air-datepicker";
import moment from "moment";

const roomDateController = document.querySelector('.room-date-controller')

if (roomDateController) {
  const calendarInput = roomDateController.querySelector('.date-mask')

  const prevCalendarBtn = roomDateController.querySelector('.room-date-controller__switcher-btn.prev-btn')
  const nextCalendarBtn = roomDateController.querySelector('.room-date-controller__switcher-btn.next-btn')

  const customRoomCalendar = new AirDatepicker(calendarInput)

  let dateCount = 0

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
    let nextDate = moment(getInputDate(calendarInput)).add(dateCount, 'days')._d;
    dateCount++

    customRoomCalendar.selectDate(nextDate)
  })
  prevCalendarBtn.addEventListener('click', () => {
    dateCount--
    let currentDate = customRoomCalendar.selectedDates[0]
    let nextDate = moment(currentDate).add(dateCount, 'days')._d;
    customRoomCalendar.selectDate(nextDate)
  })
}
