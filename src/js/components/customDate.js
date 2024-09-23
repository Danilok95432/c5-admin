import AirDatepicker from 'air-datepicker'

const initAllDates = () => {
  const allDateInputs = document.querySelectorAll('input[data-date-start]')

  if (allDateInputs) {
    allDateInputs.forEach((el) => {
      const isNow = el.dataset.dateStart === 'now'
      const isSubmitDate = el.dataset.dateSubmit === 'true'

      let previosDate

      const customDate = new AirDatepicker(el, {
        container: '.date-custom-container',
        selectedDates: [isNow ? new Date() : el.dataset.dateStart],
        onSelect({ formattedDate }) {
          if (previosDate !== formattedDate) {
            if (isSubmitDate) {
              el.closest('form')?.submit()
            }
          }
        },
      })

      el.addEventListener('click', (e) => {
        const featuredDate = e.currentTarget.value
          .split('.')
          .reverse()
          .join('-')
        if (featuredDate) {
          previosDate = featuredDate.split('-').reverse().join('.')
          customDate.selectDate(featuredDate)
          customDate.setViewDate(featuredDate)
        }
      })
    })
  }
}

initAllDates()

export { initAllDates }
