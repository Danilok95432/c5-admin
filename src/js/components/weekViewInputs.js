import AirDatepicker from 'air-datepicker'

const weekViewWrappers = document.querySelectorAll('.week-view-input')
if (weekViewWrappers) {
  weekViewWrappers.forEach((wrapper) => {
    const viewInput = wrapper.querySelector('input')
    const weekInfoContent = wrapper.querySelector('.week-view-input__info span')
    const customDate = new AirDatepicker(viewInput, {
      container: '.date-custom-container',
      onSelect: ({ date }) => {
        const options = { weekday: 'long' }
        weekInfoContent.textContent = date.toLocaleString('ru', options)
      },
    })

    viewInput.addEventListener('blur', (e) => {
      const featuredDate = e.currentTarget.value.split('.').reverse().join('-')
      if (featuredDate) {
        customDate.selectDate(featuredDate)
        customDate.setViewDate(featuredDate)
      }
    })
  })
}
