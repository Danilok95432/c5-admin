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
    const initialId = currentInput.id.split('[')[0]
    currentInput.id = `${initialId}[${changeableId}]`
  }
  if (inputLabel?.getAttribute('for')) {
    const attrValue = inputLabel.getAttribute('for')
    const initialLabel = attrValue.split('[')[0]
    inputLabel.setAttribute('for', `${initialLabel}[${changeableId}]`)
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
export async function sendData(data, url, header) {
  return await fetch(url, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': header ?? 'multipart/form-data' },
  })
}
// Фунцкия отправки fetch запросов с автоматическим определением headers
export async function sendDataDefault(data, url) {
  return await fetch(url, {
    method: 'POST',
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
  modalOverlay.classList.add('_active')
  modalOverlay.addEventListener('click', () => {
    modalOverlay.classList.remove('_active')
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

// Ищет пересечения дат
export const intersectionDates = (dateRanges) => {
  if (!Array.isArray(dateRanges) || dateRanges.length === 0) {
    return 'Не передано ни одного диапазона дат'
  }

  const validRanges = dateRanges
    .map((range) => {
      if (!Array.isArray(range) || range.length !== 2) {
        return null // Невалидный диапазон
      }

      const [start, end] = range

      const [dayStart, monthStart, yearStart] = start.split('.').map(Number)
      const [dayEnd, monthEnd, yearEnd] = end.split('.').map(Number)

      if (
        isNaN(dayStart) ||
        isNaN(monthStart) ||
        isNaN(yearStart) ||
        isNaN(dayEnd) ||
        isNaN(monthEnd) ||
        isNaN(yearEnd) ||
        monthStart < 1 ||
        monthStart > 12 ||
        monthEnd < 1 ||
        monthEnd > 12 ||
        dayStart < 1 ||
        dayStart > 31 ||
        dayEnd < 1 ||
        dayEnd > 31
      ) {
        return null // Невалидная дата
      }

      const startDate = new Date(yearStart, monthStart - 1, dayStart)
      const endDate = new Date(yearEnd, monthEnd - 1, dayEnd)

      if (
        startDate.toString() === 'Invalid Date' ||
        endDate.toString() === 'Invalid Date' ||
        startDate > endDate
      ) {
        return null // Невалидная дата или startDate > endDate
      }

      return { start: startDate, end: endDate }
    })
    .filter((range) => range !== null)

  if (validRanges.length === 0) {
    return 'Нет ни одного корректного диапазона дат'
  }

  let intersectionStart = validRanges[0].start
  let intersectionEnd = validRanges[0].end

  for (let i = 1; i < validRanges.length; i++) {
    const currentRange = validRanges[i]

    intersectionStart = new Date(
      Math.max(intersectionStart, currentRange.start),
    )
    intersectionEnd = new Date(Math.min(intersectionEnd, currentRange.end))

    if (intersectionStart > intersectionEnd) {
      return 'Нет пересечения'
    }
  }

  const formattedIntersectionStart = `${String(
    intersectionStart.getDate(),
  ).padStart(2, '0')}.${String(intersectionStart.getMonth() + 1).padStart(
    2,
    '0',
  )}.${intersectionStart.getFullYear()}`
  const formattedIntersectionEnd = `${String(
    intersectionEnd.getDate(),
  ).padStart(2, '0')}.${String(intersectionEnd.getMonth() + 1).padStart(
    2,
    '0',
  )}.${intersectionEnd.getFullYear()}`

  return `с ${formattedIntersectionStart} по ${formattedIntersectionEnd}`
}

export const areDateRangesIntersecting = (dateRanges) => {
  if (!Array.isArray(dateRanges) || dateRanges.length === 0) {
    return true
  }

  if (dateRanges.length === 1) {
    return true
  }

  // Функция для преобразования строки даты в объект Date
  function parseDateString(dateString) {
    const [day, month, year] = dateString.split('.').map(Number)
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return null // Невалидная дата
    }
    return new Date(year, month - 1, day)
  }

  // Функция для проверки валидности диапазона (start <= end)
  function isValidRange(start, end) {
    return start && end && start <= end
  }

  // Вычисление пересечения для двух диапазонов
  function rangesIntersect(range1, range2) {
    const [checkIn1Str, checkOut1Str] = range1
    const [checkIn2Str, checkOut2Str] = range2

    const checkIn1 = parseDateString(checkIn1Str)
    const checkOut1 = parseDateString(checkOut1Str)
    const checkIn2 = parseDateString(checkIn2Str)
    const checkOut2 = parseDateString(checkOut2Str)

    if (
      !isValidRange(checkIn1, checkOut1) ||
      !isValidRange(checkIn2, checkOut2)
    ) {
      return false
    }

    return checkIn1 <= checkOut2 && checkOut1 >= checkIn2
  }

  // Проверяем попарно все диапазоны на пересечение
  for (let i = 0; i < dateRanges.length; i++) {
    for (let j = i + 1; j < dateRanges.length; j++) {
      if (!rangesIntersect(dateRanges[i], dateRanges[j])) {
        return false
      }
    }
  }

  return true
}

// Поиск поля клиент рядом с кнопкой "Утвердить заявку"

export const findNearestClient = (button) => {
  let bookingRequestElement = button.closest('.booking-request')
  if (!bookingRequestElement) {
    return null
  }
  let clientElement = bookingRequestElement.querySelector(
    '.booking-conflict-modal__client',
  )
  return clientElement.innerHTML
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

// Удаление пробелов при передаче json в data-атрибут

export const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// рендер option в select, option в формате [{label: 'текст', value: 'значение'}]

export const renderOptionsToSelect = (targetSelect, optionsArr) => {
  if (!targetSelect || optionsArr?.length < 1) return
  targetSelect.innerHTML = optionsArr
    ?.map((opt) => {
      return `
      <option value="${opt.value}">${opt.label}</option>
    `
    })
    .join('')
}

// форматировать строку формата "18.06.2024" к объекту Date

export const formatStrToDate = (str) => {
  if (!str) return
  const strArr = str.split('.')
  const formattedDateString = `${strArr[2]}-${strArr[1]}-${strArr[0]}`
  return new Date(formattedDateString)
}

// добавляет к объекту Date количество дней

export const addDaysToDate = (date, daysToAdd) => {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() + daysToAdd)
  return newDate
}

// проверка, если меньше или равно нулю, то возврат нуля, иначе возврат исходного элемента

export const returnMoreZero = (checkEl) => {
  if (Number(checkEl) <= 0) return '0'
  return checkEl
}

// возвращает разницу между датами

export const daysBetweenDates = (date1, date2) => {
  const oneDay = 1000 * 60 * 60 * 24
  const date1Ms = date1.getTime()
  const date2Ms = date2.getTime()

  const diffMs = Math.abs(date1Ms - date2Ms)

  return Math.round(diffMs / oneDay)
}

// возвращает верхний заголовок наведения в карточке бронирования на календаре

export const returnDescHeadBooking = (stat) => {
  switch (stat) {
    case 'green': {
      return `
      <h4 style="color: ${stat}">Номер заселен</h4>
      <svg
          width="15"
          height="18"
          viewBox="0 0 13 16"
          fill="none"
          class="descSvg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71859 11.7617C5.71859 11.6705 5.71404 11.5792 5.71859 11.4879C5.72769 11.2369 5.70494 11.0316 5.50478 10.8171C5.13628 10.4292 5.22727 9.80858 5.64125 9.46176C6.04614 9.11951 6.6603 9.1697 7.00604 9.57128C7.35634 9.97287 7.32904 10.5798 6.93325 10.9403C6.84682 11.0225 6.81042 11.0955 6.81042 11.2141C6.81952 11.5883 6.81497 11.9671 6.81497 12.3413C6.81497 12.6744 6.58296 12.9208 6.27816 12.93C5.9688 12.9345 5.72769 12.6835 5.72314 12.3413C5.71859 12.1496 5.71859 11.9534 5.71859 11.7617Z"
            fill="#0E8128"
          />
          <path
            d="M12.3412 7.52768C12.3412 7.38165 12.3412 7.23106 12.3139 7.08503C12.1365 6.0902 11.395 5.38743 10.4169 5.26422V4.63903C10.4169 2.35732 8.56532 0.5 6.29068 0.5H6.22244C3.94779 0.5 2.09623 2.35732 2.09623 4.63903V5.25966C2.04618 5.26422 2.00069 5.27335 1.9552 5.28248C0.890664 5.48783 0.180974 6.36857 0.176424 7.47749C0.171875 9.40325 0.171875 11.3336 0.171875 13.2594C0.171875 13.3963 0.176424 13.5332 0.199171 13.6701C0.39934 14.7699 1.2819 15.5 2.40103 15.5C4.95318 15.5 7.50534 15.5 10.062 15.5C11.4041 15.5 12.3412 14.5691 12.3412 13.2228C12.3458 11.3245 12.3458 9.42607 12.3412 7.52768ZM3.23355 4.63903C3.23355 2.98707 4.57559 1.64086 6.22244 1.64086H6.29523C7.94207 1.64086 9.28411 2.98707 9.28411 4.63903V5.02692H3.23355V4.63903ZM11.2494 13.2411C11.2494 13.953 10.7899 14.4048 10.0848 14.4093C8.80644 14.4093 7.52353 14.4093 6.24518 14.4093C4.97593 14.4093 3.70668 14.4093 2.44197 14.4093C1.71409 14.4093 1.26371 13.9576 1.26371 13.2228C1.26371 11.3245 1.26371 9.42151 1.26371 7.52312C1.26371 6.79297 1.71864 6.33663 2.44652 6.33663C4.98958 6.33663 7.53263 6.33663 10.0711 6.33663C10.7899 6.33663 11.2494 6.78841 11.2494 7.50487C11.254 9.41695 11.254 11.329 11.2494 13.2411Z"
            fill="#0E8128"
          />
        </svg>
      `
    }
    case 'purple': {
      return `
      <h4 style="color: ${stat}">Бронирование не подтверждено</h4>
      <svg
          width="15"
          height="18"
          viewBox="0 0 13 16"
          fill="none"
          class="descSvg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71859 11.7617C5.71859 11.6705 5.71404 11.5792 5.71859 11.4879C5.72769 11.2369 5.70494 11.0316 5.50478 10.8171C5.13628 10.4292 5.22727 9.80858 5.64125 9.46176C6.04614 9.11951 6.6603 9.1697 7.00604 9.57128C7.35634 9.97287 7.32904 10.5798 6.93325 10.9403C6.84682 11.0225 6.81042 11.0955 6.81042 11.2141C6.81952 11.5883 6.81497 11.9671 6.81497 12.3413C6.81497 12.6744 6.58296 12.9208 6.27816 12.93C5.9688 12.9345 5.72769 12.6835 5.72314 12.3413C5.71859 12.1496 5.71859 11.9534 5.71859 11.7617Z"
            fill="#7200A3"
          />
          <path
            d="M12.3412 7.52768C12.3412 7.38165 12.3412 7.23106 12.3139 7.08503C12.1365 6.0902 11.395 5.38743 10.4169 5.26422V4.63903C10.4169 2.35732 8.56532 0.5 6.29068 0.5H6.22244C3.94779 0.5 2.09623 2.35732 2.09623 4.63903V5.25966C2.04618 5.26422 2.00069 5.27335 1.9552 5.28248C0.890664 5.48783 0.180974 6.36857 0.176424 7.47749C0.171875 9.40325 0.171875 11.3336 0.171875 13.2594C0.171875 13.3963 0.176424 13.5332 0.199171 13.6701C0.39934 14.7699 1.2819 15.5 2.40103 15.5C4.95318 15.5 7.50534 15.5 10.062 15.5C11.4041 15.5 12.3412 14.5691 12.3412 13.2228C12.3458 11.3245 12.3458 9.42607 12.3412 7.52768ZM3.23355 4.63903C3.23355 2.98707 4.57559 1.64086 6.22244 1.64086H6.29523C7.94207 1.64086 9.28411 2.98707 9.28411 4.63903V5.02692H3.23355V4.63903ZM11.2494 13.2411C11.2494 13.953 10.7899 14.4048 10.0848 14.4093C8.80644 14.4093 7.52353 14.4093 6.24518 14.4093C4.97593 14.4093 3.70668 14.4093 2.44197 14.4093C1.71409 14.4093 1.26371 13.9576 1.26371 13.2228C1.26371 11.3245 1.26371 9.42151 1.26371 7.52312C1.26371 6.79297 1.71864 6.33663 2.44652 6.33663C4.98958 6.33663 7.53263 6.33663 10.0711 6.33663C10.7899 6.33663 11.2494 6.78841 11.2494 7.50487C11.254 9.41695 11.254 11.329 11.2494 13.2411Z"
            fill="#7200A3"
          />
        </svg>
      `
    }
    case 'orange': {
      return `
      <h4 style="color: ${stat}">Бронирование подтверждено, номер не заселен</h4>
      <svg
          width="15"
          height="18"
          viewBox="0 0 13 16"
          fill="none"
          class="descSvg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71859 11.7617C5.71859 11.6705 5.71404 11.5792 5.71859 11.4879C5.72769 11.2369 5.70494 11.0316 5.50478 10.8171C5.13628 10.4292 5.22727 9.80858 5.64125 9.46176C6.04614 9.11951 6.6603 9.1697 7.00604 9.57128C7.35634 9.97287 7.32904 10.5798 6.93325 10.9403C6.84682 11.0225 6.81042 11.0955 6.81042 11.2141C6.81952 11.5883 6.81497 11.9671 6.81497 12.3413C6.81497 12.6744 6.58296 12.9208 6.27816 12.93C5.9688 12.9345 5.72769 12.6835 5.72314 12.3413C5.71859 12.1496 5.71859 11.9534 5.71859 11.7617Z"
            fill="#D53E07"
          />
          <path
            d="M12.3412 7.52768C12.3412 7.38165 12.3412 7.23106 12.3139 7.08503C12.1365 6.0902 11.395 5.38743 10.4169 5.26422V4.63903C10.4169 2.35732 8.56532 0.5 6.29068 0.5H6.22244C3.94779 0.5 2.09623 2.35732 2.09623 4.63903V5.25966C2.04618 5.26422 2.00069 5.27335 1.9552 5.28248C0.890664 5.48783 0.180974 6.36857 0.176424 7.47749C0.171875 9.40325 0.171875 11.3336 0.171875 13.2594C0.171875 13.3963 0.176424 13.5332 0.199171 13.6701C0.39934 14.7699 1.2819 15.5 2.40103 15.5C4.95318 15.5 7.50534 15.5 10.062 15.5C11.4041 15.5 12.3412 14.5691 12.3412 13.2228C12.3458 11.3245 12.3458 9.42607 12.3412 7.52768ZM3.23355 4.63903C3.23355 2.98707 4.57559 1.64086 6.22244 1.64086H6.29523C7.94207 1.64086 9.28411 2.98707 9.28411 4.63903V5.02692H3.23355V4.63903ZM11.2494 13.2411C11.2494 13.953 10.7899 14.4048 10.0848 14.4093C8.80644 14.4093 7.52353 14.4093 6.24518 14.4093C4.97593 14.4093 3.70668 14.4093 2.44197 14.4093C1.71409 14.4093 1.26371 13.9576 1.26371 13.2228C1.26371 11.3245 1.26371 9.42151 1.26371 7.52312C1.26371 6.79297 1.71864 6.33663 2.44652 6.33663C4.98958 6.33663 7.53263 6.33663 10.0711 6.33663C10.7899 6.33663 11.2494 6.78841 11.2494 7.50487C11.254 9.41695 11.254 11.329 11.2494 13.2411Z"
            fill="#D53E07"
          />
        </svg>
      `
    }
    case 'blue': {
      return `
      <h4 style="color: ${stat}">Номер выселен</h4>
      <svg
          width="15"
          height="18"
          viewBox="0 0 13 16"
          fill="none"
          class="descSvg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71859 11.7617C5.71859 11.6705 5.71404 11.5792 5.71859 11.4879C5.72769 11.2369 5.70494 11.0316 5.50478 10.8171C5.13628 10.4292 5.22727 9.80858 5.64125 9.46176C6.04614 9.11951 6.6603 9.1697 7.00604 9.57128C7.35634 9.97287 7.32904 10.5798 6.93325 10.9403C6.84682 11.0225 6.81042 11.0955 6.81042 11.2141C6.81952 11.5883 6.81497 11.9671 6.81497 12.3413C6.81497 12.6744 6.58296 12.9208 6.27816 12.93C5.9688 12.9345 5.72769 12.6835 5.72314 12.3413C5.71859 12.1496 5.71859 11.9534 5.71859 11.7617Z"
            fill="#064AB1"
          />
          <path
            d="M12.3412 7.52768C12.3412 7.38165 12.3412 7.23106 12.3139 7.08503C12.1365 6.0902 11.395 5.38743 10.4169 5.26422V4.63903C10.4169 2.35732 8.56532 0.5 6.29068 0.5H6.22244C3.94779 0.5 2.09623 2.35732 2.09623 4.63903V5.25966C2.04618 5.26422 2.00069 5.27335 1.9552 5.28248C0.890664 5.48783 0.180974 6.36857 0.176424 7.47749C0.171875 9.40325 0.171875 11.3336 0.171875 13.2594C0.171875 13.3963 0.176424 13.5332 0.199171 13.6701C0.39934 14.7699 1.2819 15.5 2.40103 15.5C4.95318 15.5 7.50534 15.5 10.062 15.5C11.4041 15.5 12.3412 14.5691 12.3412 13.2228C12.3458 11.3245 12.3458 9.42607 12.3412 7.52768ZM3.23355 4.63903C3.23355 2.98707 4.57559 1.64086 6.22244 1.64086H6.29523C7.94207 1.64086 9.28411 2.98707 9.28411 4.63903V5.02692H3.23355V4.63903ZM11.2494 13.2411C11.2494 13.953 10.7899 14.4048 10.0848 14.4093C8.80644 14.4093 7.52353 14.4093 6.24518 14.4093C4.97593 14.4093 3.70668 14.4093 2.44197 14.4093C1.71409 14.4093 1.26371 13.9576 1.26371 13.2228C1.26371 11.3245 1.26371 9.42151 1.26371 7.52312C1.26371 6.79297 1.71864 6.33663 2.44652 6.33663C4.98958 6.33663 7.53263 6.33663 10.0711 6.33663C10.7899 6.33663 11.2494 6.78841 11.2494 7.50487C11.254 9.41695 11.254 11.329 11.2494 13.2411Z"
            fill="#064AB1"
          />
        </svg>
      `
    }
    case 'yellow': {
      return ``
    }
    case 'red': {
      return `
      <h4 style="color: ${stat}">Овербукинг</h4>
      <svg
          width="15"
          height="18"
          viewBox="0 0 13 16"
          fill="none"
          class="descSvg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71859 11.7617C5.71859 11.6705 5.71404 11.5792 5.71859 11.4879C5.72769 11.2369 5.70494 11.0316 5.50478 10.8171C5.13628 10.4292 5.22727 9.80858 5.64125 9.46176C6.04614 9.11951 6.6603 9.1697 7.00604 9.57128C7.35634 9.97287 7.32904 10.5798 6.93325 10.9403C6.84682 11.0225 6.81042 11.0955 6.81042 11.2141C6.81952 11.5883 6.81497 11.9671 6.81497 12.3413C6.81497 12.6744 6.58296 12.9208 6.27816 12.93C5.9688 12.9345 5.72769 12.6835 5.72314 12.3413C5.71859 12.1496 5.71859 11.9534 5.71859 11.7617Z"
            fill="#920303"
          />
          <path
            d="M12.3412 7.52768C12.3412 7.38165 12.3412 7.23106 12.3139 7.08503C12.1365 6.0902 11.395 5.38743 10.4169 5.26422V4.63903C10.4169 2.35732 8.56532 0.5 6.29068 0.5H6.22244C3.94779 0.5 2.09623 2.35732 2.09623 4.63903V5.25966C2.04618 5.26422 2.00069 5.27335 1.9552 5.28248C0.890664 5.48783 0.180974 6.36857 0.176424 7.47749C0.171875 9.40325 0.171875 11.3336 0.171875 13.2594C0.171875 13.3963 0.176424 13.5332 0.199171 13.6701C0.39934 14.7699 1.2819 15.5 2.40103 15.5C4.95318 15.5 7.50534 15.5 10.062 15.5C11.4041 15.5 12.3412 14.5691 12.3412 13.2228C12.3458 11.3245 12.3458 9.42607 12.3412 7.52768ZM3.23355 4.63903C3.23355 2.98707 4.57559 1.64086 6.22244 1.64086H6.29523C7.94207 1.64086 9.28411 2.98707 9.28411 4.63903V5.02692H3.23355V4.63903ZM11.2494 13.2411C11.2494 13.953 10.7899 14.4048 10.0848 14.4093C8.80644 14.4093 7.52353 14.4093 6.24518 14.4093C4.97593 14.4093 3.70668 14.4093 2.44197 14.4093C1.71409 14.4093 1.26371 13.9576 1.26371 13.2228C1.26371 11.3245 1.26371 9.42151 1.26371 7.52312C1.26371 6.79297 1.71864 6.33663 2.44652 6.33663C4.98958 6.33663 7.53263 6.33663 10.0711 6.33663C10.7899 6.33663 11.2494 6.78841 11.2494 7.50487C11.254 9.41695 11.254 11.329 11.2494 13.2411Z"
            fill="#920303"
          />
        </svg>
      `
    }
    case 'gray': {
      return `
      <h4 style="color: ${stat}">Запрет бронирования</h4>
      <svg
          width="15"
          height="18"
          viewBox="0 0 13 16"
          fill="none"
          class="descSvg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71859 11.7578C5.71859 11.6666 5.71404 11.5753 5.71859 11.484C5.72769 11.233 5.70494 11.0277 5.50478 10.8132C5.13628 10.4253 5.22727 9.80468 5.64125 9.45786C6.04614 9.1156 6.6603 9.1658 7.00604 9.56738C7.35634 9.96896 7.32904 10.5759 6.93325 10.9364C6.84682 11.0185 6.81042 11.0916 6.81042 11.2102C6.81952 11.5844 6.81497 11.9632 6.81497 12.3374C6.81497 12.6705 6.58296 12.9169 6.27816 12.9261C5.9688 12.9306 5.72769 12.6796 5.72314 12.3374C5.71859 12.1457 5.71859 11.9495 5.71859 11.7578Z"
            fill="#1F1E1E"
          />
          <path
            d="M12.3388 7.52768C12.3388 7.38165 12.3388 7.23106 12.3115 7.08503C12.1341 6.0902 11.3925 5.38743 10.4144 5.26422V4.63903C10.4144 2.35732 8.56288 0.5 6.28823 0.5H6.22C3.94535 0.5 2.09379 2.35732 2.09379 4.63903V5.25966C2.04374 5.26422 1.99825 5.27335 1.95276 5.28248C0.888222 5.48783 0.178532 6.36857 0.173983 7.47749C0.169434 9.40325 0.169434 11.3336 0.169434 13.2594C0.169434 13.3963 0.173983 13.5332 0.196729 13.6701C0.396898 14.7699 1.27946 15.5 2.39859 15.5C4.95074 15.5 7.5029 15.5 10.0596 15.5C11.4016 15.5 12.3388 14.5691 12.3388 13.2228C12.3433 11.3245 12.3433 9.42607 12.3388 7.52768ZM3.23111 4.63903C3.23111 2.98707 4.57315 1.64086 6.22 1.64086H6.29278C7.93963 1.64086 9.28167 2.98707 9.28167 4.63903V5.02692H3.23111V4.63903ZM11.247 13.2411C11.247 13.953 10.7875 14.4048 10.0823 14.4093C8.80399 14.4093 7.52109 14.4093 6.24274 14.4093C4.97349 14.4093 3.70424 14.4093 2.43953 14.4093C1.71164 14.4093 1.26126 13.9576 1.26126 13.2228C1.26126 11.3245 1.26126 9.42151 1.26126 7.52312C1.26126 6.79297 1.71619 6.33663 2.44408 6.33663C4.98714 6.33663 7.53019 6.33663 10.0687 6.33663C10.7875 6.33663 11.247 6.78841 11.247 7.50487C11.2515 9.41695 11.2515 11.329 11.247 13.2411Z"
            fill="#1F1E1E"
          />
        </svg>
      `
    }
  }
}
