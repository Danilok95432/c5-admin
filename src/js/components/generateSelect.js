const formatGenerate = (nameSelect, roomNumber, i) => {
  const nameArr = nameSelect.split('[')
  nameArr[1] = `${roomNumber - 1}]`
  nameArr[2] = `${i - 1}]`
  return nameArr.join('[')
}

export const initGenerateSelect = () => {
  const generateSelectWrappers = document.querySelectorAll('.generate-select')

  if (generateSelectWrappers) {
    generateSelectWrappers.forEach(selectWrapper => {
      const templateId = selectWrapper.dataset.template
      const templateFragment = document.querySelector(`#${templateId}`)?.content
      const templateElement = templateFragment.firstElementChild.cloneNode(true)
      const genSelect = selectWrapper.querySelector('select')
      const genList = selectWrapper.parentElement.querySelector('.generate-select__list')
      const currentRoomNumber = genSelect.name.match(/\d/g)?.join('')
      genSelect.addEventListener('input', (e) => {
        genList.innerHTML = ''
        const elCount = e.target.value
        let fragment = new DocumentFragment();
        for (let i = 1; i <= elCount; i++) {
          let newEl = templateElement.cloneNode(true)
          let newELCounter = newEl.querySelector('.generate-select__count')
          let newELSelect = newEl.querySelector('select')
          if (newELCounter) {
            newELCounter.textContent = i
          }
          newELSelect.name = formatGenerate(newELSelect.name, currentRoomNumber, i)
          fragment.append(newEl);
        }
        genList.append(fragment)
      })
    })
  }
}


initGenerateSelect()
