import AirDatepicker from 'air-datepicker'

const initAllDates = () => {
  const allDateInputs = document.querySelectorAll('input[data-date-start]')

  if (allDateInputs) {
    allDateInputs.forEach((el) => {
      const isNow = el.dataset.dateStart === 'now'
      const customDate = new AirDatepicker(el, {
        container: '.date-custom-container',
        selectedDates: [isNow ? new Date() : ''],
      })

      el.addEventListener('click', (e) => {
        const featuredDate = e.currentTarget.value
          .split('.')
          .reverse()
          .join('-')
        if (featuredDate) {
          customDate.selectDate(featuredDate)
          customDate.setViewDate(featuredDate)
        }
      })
    })
  }
}

initAllDates()

export { initAllDates }
