import AirDatepicker from "air-datepicker";
import moment from "moment/moment";

const roomDateController = document.querySelector('.room-date-controller')

if (roomDateController) {
  const calendarInput = roomDateController.querySelector('.date-mask')
  const datePreview = roomDateController.querySelector('.room-date-controller__date-preview')
  const switcherDate = roomDateController.querySelector('.room-date-controller__switcher-date')


  const prevCalendarBtn = roomDateController.querySelector('.room-date-controller__switcher-btn.prev-btn')
  const nextCalendarBtn = roomDateController.querySelector('.room-date-controller__switcher-btn.next-btn')

  const customRoomCalendar = new AirDatepicker(calendarInput, {
    onSelect: ({date, formattedDate}) => {
      datePreview.textContent = moment(date).format('MMMM YYYY');
      const nowDate = moment().format('L');


      if (formattedDate === nowDate) {
        switcherDate.textContent = 'сегодня'
      } else {
        switcherDate.textContent = formattedDate
      }

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
    console.log()
  })
  prevCalendarBtn.addEventListener('click', () => {
    const currentDate = getInputDate(calendarInput)
    let prevDate = currentDate.setDate(currentDate.getDate() - 1)
    customRoomCalendar.selectDate(prevDate)
  })

}
