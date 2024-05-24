const changeIconSelects = document.querySelectorAll('.change-icon-select')

if (changeIconSelects) {
  changeIconSelects.forEach((changeIconSelectWrapper) => {
    const iconSelect = changeIconSelectWrapper.querySelector(
      '.change-icon-select__select',
    )
    const iconImg = changeIconSelectWrapper.querySelector(
      '.change-icon-select__icon',
    )
    iconSelect.addEventListener('input', (e) => {
      const selectedOption =
        e.currentTarget.options[e.currentTarget.selectedIndex]
      iconImg.src = selectedOption.dataset.icon
    })
  })
}
