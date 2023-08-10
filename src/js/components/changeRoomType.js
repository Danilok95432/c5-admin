const initialEl = document.querySelector('.apart-list li')

export const initChangeSelects = (elToFind) => {
  const changeTypeSelects = elToFind.querySelectorAll('.type-room-select')

  if (changeTypeSelects) {
    changeTypeSelects.forEach(changeSelect => {
      changeSelect.addEventListener('input', (e) => {
        const currentElement = e.currentTarget.closest('.room-state')
        currentElement.dataset.state = e.target.value
        changeTypeSelects.forEach(changeSelect => changeSelect.value = currentElement.dataset.state)

      })
    })

  }

}

initChangeSelects(initialEl)
