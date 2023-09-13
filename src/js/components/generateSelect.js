import { initAllDates } from './customDate'

// вычисление номера элемента глобально
const calcGlobalCount = (genArr) => {
  if (!genArr) {
    return
  }
  genArr.forEach((genEl, i) => {
    const elCounter = genEl.querySelector('.gen-global-count')
    elCounter.textContent = i + 1
  })
}

// форматирование имен ген. инпутов
const formatGenerate = (nameSelect, number, i) => {
  const nameArr = nameSelect.split('[')
  nameArr[1] = `${number - 1}]`
  nameArr[2] = `${i - 1}]`
  return nameArr.join('[')
}

// сохранение предыдущих данных ген. инпутов в массив
const saveInputsData = (fragmentsList) => {
  if (!fragmentsList) {
    return
  }
  const dataArr = []
  Array.from(fragmentsList.children).forEach((fragment) => {
    const inputsDataArr = []
    const fragmentInputs = fragment.querySelectorAll('input, textarea, select')
    fragmentInputs?.forEach((input) => inputsDataArr.push(input.value))
    dataArr.push(inputsDataArr)
  })
  return dataArr
}

// установка предыдущих данных в инпуты
const setInputsData = (dataArr, genArr) => {
  if (!genArr) {
    return
  }
  dataArr.forEach((dataEl, i) => {
    const fragmentInputs = genArr[i]?.querySelectorAll(
      'input, textarea, select',
    )
    fragmentInputs?.forEach((input, j) => (input.value = dataEl[j]))
  })
}

export const initGenerateSelect = () => {
  const generateSelectWrappers = document.querySelectorAll('.generate-select')

  if (generateSelectWrappers) {
    const genSelectWrapper = document.querySelector('.generate-select-wrapper')
    let prevInputsData = []
    generateSelectWrappers.forEach((selectWrapper) => {
      const templateId = selectWrapper.dataset.template
      const templateFragment = document.querySelector(`#${templateId}`)?.content
      const templateElement = templateFragment.firstElementChild.cloneNode(true)
      const genSelect = selectWrapper.querySelector('select')
      const genList =
        selectWrapper.closest('li')?.querySelector('.generate-select__list') ??
        genSelectWrapper.querySelector(
          `.generate-select__list[data-generate-list="${templateId}"]`,
        )

      const currentNumber = genSelect.name.match(/\d/g)?.join('') ?? '1'
      genSelect.addEventListener('input', (e) => {
        prevInputsData = saveInputsData(genList)
        genList.innerHTML = ''
        const elCount = e.target.value
        let fragment = new DocumentFragment()
        for (let i = 1; i <= elCount; i++) {
          let newEl = templateElement.cloneNode(true)
          let newELCounter = newEl.querySelector('.generate-select__count')
          let newELInputs = newEl.querySelectorAll('select, input, textarea')
          if (newELCounter) {
            newELCounter.textContent = i
          }
          newELInputs.forEach((inputEl) => {
            inputEl.name = formatGenerate(inputEl.name, currentNumber, i)
          })
          fragment.append(newEl)
        }
        genList.append(fragment)
        initAllDates()
        const allGenElements =
          genSelectWrapper?.querySelectorAll('.template-item')
        const currentGenElements = genList?.querySelectorAll('.template-item')
        calcGlobalCount(allGenElements)
        setInputsData(prevInputsData, currentGenElements)
      })
    })
  }
}

initGenerateSelect()
