//Сбор данных форм

import { bigImgModal, infoModal, modalOverlay } from './_vars'

export const serializeForm = (formNode) => {
  return new FormData(formNode)
}

// Преобразование formData в объект
export const formToObj = (formData) => {
  return Array.from(formData.entries()).reduce(
    (memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }),
    {},
  )
}

const formatChangeableInputName = (name, id) => {
  const initialName = name.split('[')[0]
  return `${initialName}[${id}]`
}

const formatChangeableSelects = (name, id) => {
  const initialName = name.split('[')
  initialName[1] = `${id - 1}]`
  return initialName.join('[')
}
export const updateInputsId = (input, changeableId) => {
  const currentInput = input.querySelector('input, select, textarea') ?? input
  const inputLabel = input.querySelector('label')
  currentInput.name = formatChangeableInputName(currentInput.name, changeableId)
  if (currentInput.id) {
    currentInput.id = currentInput.id + changeableId
  }
  if (inputLabel?.getAttribute('for')) {
    const attrValue = inputLabel.getAttribute('for')
    inputLabel.setAttribute('for', attrValue + changeableId)
  }
}

// Обновление id в изменяемых списках
export const updateChangeableListId = (changeableList) => {
  if (changeableList && changeableList.dataset.changeableId) {
    const changeableElements = Array.from(changeableList.children)
    changeableElements.forEach((el, i) => {
      const changeableId = i + 1

      const changeableAmount = el.querySelector('.changeable-amount')
      const changeableInputs = el.querySelectorAll('.changeable-input')
      const changeableSelects = el.querySelectorAll(
        '.generate-select__list select',
      )
      const inputIdInfo = el.querySelector('.changeable-input-id')

      if (changeableAmount) {
        changeableAmount.textContent = changeableId
      }
      if (inputIdInfo) {
        inputIdInfo.value = changeableId
      }

      if (changeableInputs) {
        changeableInputs.forEach((inputEl) =>
          updateInputsId(inputEl, changeableId),
        )
      }

      if (changeableSelects) {
        changeableSelects.forEach((selectEl) => {
          selectEl.name = formatChangeableSelects(selectEl.name, changeableId)
        })
      }
    })
  }
}

// Блокировка/разблокировка добавления/удаления элементов в изменяемых списках при ограничении максимального количества

export const limitationChangeableElements = (changeableList, addBtn) => {
  if (changeableList && addBtn && changeableList.dataset.maxElements) {
    const countMaxElements = +changeableList.dataset.maxElements

    if (changeableList.children.length >= countMaxElements) {
      addBtn.classList.add('hidden')
    } else {
      addBtn.classList.remove('hidden')
    }
  }
}

// Фунцкия отправки fetch запросов
export async function sendData(data, url) {
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: data,
  })
}

export const getNoun = (number, one, two, five) => {
  let n = Math.abs(number)
  n %= 100
  if (n >= 5 && n <= 20) {
    return five
  }
  n %= 10
  if (n === 1) {
    return one
  }
  if (n >= 2 && n <= 4) {
    return two
  }
  return five
}

export const showInfoModal = (responseText) => {
  infoModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('info-modal')) {
      infoModal.classList.add('hidden')
    }
  })
  const modalText = infoModal.querySelector('.info-modal__content-text')
  modalText.textContent = responseText
  infoModal.classList.remove('hidden')
}

export const showBigImgModal = (path) => {
  bigImgModal.classList.add('big-img-modal_active')
  bigImgModal.querySelector('img').src = path
  modalOverlay.classList.add('modal-overlay_active')
  modalOverlay.addEventListener('click', () => {
    modalOverlay.classList.remove('modal-overlay_active')
    bigImgModal.classList.remove('big-img-modal_active')
  })
}

// функция определения дня недели по дате

export const defineWeekDay = (date) => {
  const datesWeekArr = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  const currentDate = new Date(date)
  return datesWeekArr[currentDate.getDay()]
}

// Форматирование даты в формат дд.мм.гггг
export const formatDate = (date) => {
  return date.split('.').reverse().join('.')
}

// Получение всех соседних элементов

export const getRowsSiblings = (elem, limitElClass) => {
  let siblings = []
  let sibling = elem
  while (
    !sibling.nextElementSibling?.classList.contains(limitElClass) &&
    sibling.nextElementSibling
  ) {
    sibling = sibling.nextElementSibling
    siblings.push(sibling)
  }

  return siblings
}

// функция установки определенных option в контекстные селекты
export const setContextOptions = (value, contentSelect, stateOptions) => {
  const filteredOptions = stateOptions.filter(
    (optEl) => optEl.dataset.context === value,
  )
  contentSelect.innerHTML = ''
  filteredOptions?.forEach((filEl) => {
    contentSelect.append(filEl)
  })
}
