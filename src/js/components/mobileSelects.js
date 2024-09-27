const mobileSelects = document.querySelectorAll('.mobile-select')

if (mobileSelects?.length) {
  mobileSelects.forEach((el) => {
    const currentSelect = el.querySelector('select')
    currentSelect.addEventListener('click', (e) => {
      const optionsArray = Array.from(e.currentTarget.options).map(
        (option) => ({
          text: option.text,
          value: option.value,
          selected: option.selected, // Это поле будет true, если option выбран
        }),
      )
      console.log(optionsArray)
    })
  })
}
