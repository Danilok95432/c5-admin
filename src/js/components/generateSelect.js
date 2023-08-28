import {updateChangeableListId, updateInputsId} from "../_functions";

export const initGenerateSelect = () => {
  const generateSelectWrappers = document.querySelectorAll('.generate-select')

  if (generateSelectWrappers) {
    generateSelectWrappers.forEach(selectWrapper => {
      const templateId = selectWrapper.dataset.template
      const templateFragment = document.querySelector(`#${templateId}`)?.content
      const templateElement = templateFragment.firstElementChild.cloneNode(true)
      const genSelect = selectWrapper.querySelector('select')
      const genList = selectWrapper.parentElement.querySelector('.generate-select__list')

      genSelect.addEventListener('input', (e) => {
        genList.innerHTML = ''
        const elCount = e.target.value
        let fragment = new DocumentFragment();
        for (let i = 1; i <= elCount; i++) {
          let newEl = templateElement.cloneNode(true)
          let newELCounter = newEl.querySelector('.generate-select__count')
          if (newELCounter) {
            newELCounter.textContent = i
          }
          fragment.append(newEl);
        }
        genList.append(fragment)
        const changeableElements = genList.querySelectorAll('.changeable-input')
        changeableElements.forEach((el, i) => updateInputsId(el, i))
      })
    })
  }
}


initGenerateSelect()
