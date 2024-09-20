import {
  bookingConfirmModal,
  modalOverlay,
  newAdultGuest,
  newChildGuest,
  newRoom,
} from '../_vars'
import { initAllDates } from './customDate'
import { returnMoreZero, sendData, showInfoModal } from '../_functions'
import { initAllMasks } from './inputMask'
import AirDatepicker from 'air-datepicker'
import Inputmask from 'inputmask'

const editBookingPage = document.querySelector('.edit-booking-page')

const getInitialName = (fullName) => {
  return fullName.split('[')[0]
}

if (editBookingPage) {
  const roomsWrapper = editBookingPage.querySelector('.rooms-list-section')
  const roomsList = editBookingPage.querySelector('.rooms-list')
  const editBookingForm = editBookingPage.querySelector(
    '.edit-booking-page__form',
  )

  const searchRoomsBtn = editBookingPage.querySelector(
    '.rooms-search-section .main-btn',
  )
  const freeRoomsList = editBookingPage.querySelector(
    '.rooms-choice-section__list',
  )
  const roomsCategoriesSelect = editBookingPage.querySelector(
    '.input-column-wrapper__categories-select select',
  )
  const roomsTariffsSelect = editBookingPage.querySelector(
    '.input-column-wrapper__tariff-select select',
  )

  const roomsSaveBtn = editBookingPage.querySelector(
    '.rooms-choice-section__btn-wrapper',
  )

  let globalRoomsData = []

  // Логика выбора типа клиента

  const clientSelect = editBookingPage.querySelector(
    '.client-section__type-client-select select',
  )
  const typeClientContent = editBookingPage.querySelector(
    '.client-section__type-client',
  )

  const individualTypeTmpl =
    editBookingPage.querySelector('#type-individual')?.content
  const orgTypeTmpl = editBookingPage.querySelector('#type-org')?.content
  const individualTypeClone = individualTypeTmpl
    .querySelector('.edit-booking-page__individual-content')
    .cloneNode(true)
  const orgTypeClone = orgTypeTmpl
    .querySelector('.edit-booking-page__org-content')
    .cloneNode(true)

  Inputmask({
    alias: 'numeric',
    allowMinus: false,
    showMaskOnHover: false,
    showMaskOnFocus: false,
    shortcuts: null,
  }).mask([
    individualTypeClone.querySelector('.number-mask'),
    orgTypeClone.querySelector('.number-mask'),
  ])

  Inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: false,
    shortcuts: null,
  }).mask([
    individualTypeClone.querySelector('.phone-mask'),
    orgTypeClone.querySelector('.phone-mask'),
  ])

  clientSelect.addEventListener('input', (e) => {
    typeClientContent.innerHTML = ''
    if (e.currentTarget.value === '0') {
      typeClientContent.append(individualTypeClone)
    } else {
      typeClientContent.append(orgTypeClone)
    }
  })

  // логика связанная с выбором дат заезда и выезда

  const nightCounter = editBookingPage.querySelector(
    '.dates-section__days-counter span',
  )

  const dateInputs = editBookingPage.querySelectorAll(
    '.check-in-input, .check-out-input',
  )

  let checkInDate
  let checkOutDate

  dateInputs.forEach((el, _, arr) => {
    el.addEventListener('keydown', (e) => e.preventDefault())
    el.addEventListener('paste', (e) => e.preventDefault())

    const customDate = new AirDatepicker(el, {
      container: '.date-custom-container',

      onSelect: ({ date, _, datepicker }) => {
        roomsSaveBtn.classList.add('_blocked')
        if (datepicker.$el.classList.contains('check-in-input') && date) {
          checkInDate = date
        }

        if (datepicker.$el.classList.contains('check-out-input') && date) {
          checkOutDate = date
        }

        if (checkInDate && checkOutDate) {
          const diffInMs = checkOutDate - checkInDate
          const daysDifference = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
          nightCounter.textContent = daysDifference < 1 ? '0' : daysDifference
        }
      },
    })

    el.addEventListener('click', (e) => {
      const featuredDate = e.currentTarget.value.split('.').reverse().join('-')
      if (featuredDate) {
        customDate.selectDate(featuredDate)
        customDate.setViewDate(featuredDate)
      }
    })
  })

  // Логика добавления номеров и гостей с нумерацией имен инпутов при любом измененни списка номеров

  let observer = new MutationObserver(() => {
    ;[...roomsList.children].forEach((room, roomIdx) => {
      const roomAmount = room.querySelector('h3 .changeable-amount')
      const roomOrderInput = room.querySelector('.room-order-input')
      roomOrderInput.name = `${getInitialName(roomOrderInput.name)}[${
        roomIdx + 1
      }]`
      roomAmount.textContent = roomIdx + 1
      const guestsList = room.querySelector('.guests-list')
      ;[...guestsList.children].forEach((guest, guestIdx) => {
        const guestAmount = guest.querySelector('h5 .changeable-amount')
        guestAmount.textContent = guestIdx + 1
        const guestInputs = guest.querySelectorAll('.main-input')
        guestInputs.forEach((input) => {
          input.name = `${getInitialName(input.name)}[${roomIdx + 1}][${
            guestIdx + 1
          }]`
        })
      })
    })
    roomsSaveBtn.classList.add('_blocked')
  })

  observer.observe(roomsList, {
    childList: true,
    subtree: true,
  })

  roomsWrapper.addEventListener('click', (e) => {
    if (e.target.dataset.btn === 'delete-room') {
      if (confirm('Вы действительно хотите удалить номер?')) {
        e.target.closest('.rooms-list__item').remove()
      }
    }

    if (e.target.dataset.btn === 'delete') {
      if (confirm('Вы действительно хотите удалить гостя?')) {
        e.target.closest('li').remove()
      }
    }

    if (e.target.dataset.template === 'new-room') {
      roomsList.insertAdjacentHTML('beforeend', newRoom)
      initAllDates()
      initAllMasks()
    }

    if (e.target.dataset.template === 'new-adult') {
      const currentRoomGuests = e.target
        .closest('.rooms-list__item')
        .querySelector('.guests-list')
      currentRoomGuests.insertAdjacentHTML('beforeend', newAdultGuest)
      initAllDates()
      initAllMasks()
    }
    if (e.target.dataset.template === 'new-child') {
      const currentRoomGuests = e.target
        .closest('.rooms-list__item')
        .querySelector('.guests-list')
      currentRoomGuests.insertAdjacentHTML('beforeend', newChildGuest)
      initAllDates()
      initAllMasks()
    }
  })

  // Логика расчета скидок и внесения сумм

  const discountPercentInput = editBookingPage.querySelector(
    '.main-input__discount-percent',
  )

  const discountRubInput = editBookingPage.querySelector(
    '.main-input__discount-rub',
  )

  const discountSumInput = editBookingPage.querySelector('.result-sum input')

  const totalCostToPay = editBookingPage.querySelector(
    '.total-cost__item._to-pay h3 span',
  )
  const totalCostIntroduces = editBookingPage.querySelector(
    '.total-cost__item._introduced h3 span',
  )

  const clearPriceInput = editBookingPage.querySelector(
    '.edit-booking-page__clear-price-input',
  )

  // Расчет внесенных сумм

  const paymentsList = editBookingPage.querySelector('.payments-list')

  const calcTotalIntroduces = () => {
    const introducedPaymentArr =
      paymentsList.querySelectorAll('._introduced span')

    let totalSum = 0
    introducedPaymentArr.forEach((el) => {
      const num = parseFloat(el.textContent.replace(/\s/g, ''))
      totalSum += num
    })
    totalCostIntroduces.textContent = totalSum
    const resultSum = discountSumInput.value - totalSum
    totalCostToPay.textContent = returnMoreZero(resultSum)
  }
  calcTotalIntroduces()

  const introducedObserver = new MutationObserver(calcTotalIntroduces)
  introducedObserver.observe(paymentsList, { childList: true })

  // Расчет сумм с учетом скидки и суммы к оплате

  let initialSum = Number(clearPriceInput.value) ?? 0

  const calcPercentDiscount = (percentValue) => {
    discountSumInput.value =
      initialSum - initialSum * (Number(percentValue) / 100)
    totalCostToPay.textContent = returnMoreZero(
      discountSumInput.value - totalCostIntroduces.textContent,
    )
    if (!percentValue || percentValue === '0') {
      discountRubInput.classList.remove('_disabled')
    } else {
      discountRubInput.value = '0'
      discountRubInput.classList.add('_disabled')
    }
  }

  const calcSumDiscount = (sumValue) => {
    discountSumInput.value = initialSum - Number(sumValue)
    totalCostToPay.textContent = returnMoreZero(
      discountSumInput.value - totalCostIntroduces.textContent,
    )
    if (!sumValue || sumValue === '0') {
      discountPercentInput.classList.remove('_disabled')
    } else {
      discountPercentInput.value = '0'
      discountPercentInput.classList.add('_disabled')
    }
  }

  discountPercentInput.addEventListener('input', (e) => {
    calcPercentDiscount(e.target.value)
  })
  discountRubInput.addEventListener('input', (e) => {
    calcSumDiscount(e.target.value)
  })

  const setDiscountSum = (price) => {
    if (!price) return

    discountPercentInput.classList.remove('_disabled')
    discountRubInput.classList.remove('_disabled')

    const roomsCount =
      editBookingPage.querySelector('.rooms-list').children.length
    const totalPrice = price * roomsCount
    initialSum = totalPrice
    clearPriceInput.value = totalPrice
    discountSumInput.value = totalPrice
    totalCostToPay.textContent = returnMoreZero(
      discountSumInput.value - totalCostIntroduces.textContent,
    )
    if (discountPercentInput.value && discountPercentInput.value !== '0') {
      calcPercentDiscount(discountPercentInput.value)
    }
    if (discountRubInput.value && discountRubInput.value !== '0') {
      calcSumDiscount(discountRubInput.value)
    }
  }

  // Логика поиска подходящих номеров

  const initBlockedInputs = () => {
    const blockedInputs = editBookingPage.querySelectorAll(
      '._block-search-input',
    )
    blockedInputs.forEach((el) => {
      el.addEventListener('input', () => {
        roomsSaveBtn.classList.add('_blocked')
      })
    })
  }
  const initCategoriesSelect = (categoriesData) => {
    if (!categoriesData) return
    const optionsHtml = categoriesData.map(
      ({ categoryName, categoryValue }) =>
        `<option value="${categoryValue}">${categoryName}</option>`,
    )
    roomsCategoriesSelect.innerHTML = optionsHtml.join('')
  }
  const initTariffsSelect = (tariffsData) => {
    if (!tariffsData) return

    const optionsHtml = tariffsData.map(
      ({ tariffName, tariffValue }) =>
        `<option value="${tariffValue}">${tariffName}</option>`,
    )
    roomsTariffsSelect.innerHTML = optionsHtml.join('')
  }
  const initRooms = (roomsData) => {
    if (!roomsData) return
    const optionsHtml = roomsData
      .map(
        ({ roomName, roomValue }) =>
          `<option value="${roomValue}">${roomName}</option>`,
      )
      .join()

    const roomsCount =
      editBookingPage.querySelector('.rooms-list').children.length
    const roomsHtml = Array(roomsCount)
      .fill('')
      .map(
        (rooms, idx) =>
          `
               <li>
                <div class="input-column-wrapper floor">
                  <label>${idx + 1} номер бронирования</label>
                  <select class="main-input"
                          name="room_number[${idx + 1}]">
                      ${optionsHtml}
                  </select>
                </div>
                <p>${idx + 1} свободный номер, подходящий под
                  заданные параметры. Выберите номер.</p>
              </li>
        `,
      )
    freeRoomsList.innerHTML = roomsHtml.join('')
  }

  roomsCategoriesSelect.addEventListener('input', (e) => {
    const currentSelectValue = e.target.value
    const currentCategory = globalRoomsData.find(
      (category) => currentSelectValue === category.categoryValue,
    )
    initTariffsSelect(currentCategory.tariffs)
    initRooms(currentCategory.rooms)
    setDiscountSum(currentCategory.tariffs[0].tariffPrice ?? 0)
  })

  roomsTariffsSelect.addEventListener('input', (e) => {
    const currentSelectValue = e.target.value
    let currentTariff = {}
    globalRoomsData.forEach((category) => {
      category.tariffs.forEach((tariff) => {
        if (tariff.tariffValue === currentSelectValue) {
          currentTariff = tariff
        }
      })
    })

    setDiscountSum(currentTariff.tariffPrice ?? 0)
  })

  const searchScript = searchRoomsBtn.dataset.script

  searchRoomsBtn.addEventListener('click', async () => {
    if (!editBookingForm.checkValidity()) {
      const invalidElements = editBookingForm.querySelectorAll(':invalid')
      invalidElements[0].reportValidity()
      return
    }

    const formData = new FormData(editBookingForm)
    const data = Object.fromEntries(formData.entries())

    const jsonData = JSON.stringify(data)

    try {
      const response = await sendData(jsonData, searchScript)
      const finishedResponse = await response.json()

      const { status, errortext, categories } = finishedResponse
      if (status === 'ok') {
        roomsSaveBtn.classList.remove('_blocked')
        initBlockedInputs()
        globalRoomsData = [...categories]
        initCategoriesSelect(categories)
        initTariffsSelect(categories[0].tariffs)
        initRooms(categories[0].rooms)
        setDiscountSum(categories[0].tariffs[0].tariffPrice)
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      console.error(err)
      showInfoModal('Во время выполнения запроса произошла ошибка')
    }
  })

  initBlockedInputs()

  // логика быстрого сохранения выбранных номеров

  const roomSaveButtonInner = roomsSaveBtn.querySelector('button')

  const roomSaveScript = roomSaveButtonInner.dataset.script

  roomSaveButtonInner.addEventListener('click', async (e) => {
    e.preventDefault()
    if (!editBookingForm.checkValidity()) {
      const invalidElements = editBookingForm.querySelectorAll(':invalid')
      invalidElements[0].reportValidity()
      return
    }

    const formData = new FormData(editBookingForm)
    const data = Object.fromEntries(formData.entries())

    const jsonData = JSON.stringify(data)
    try {
      const response = await sendData(jsonData, roomSaveScript)
      const finishedResponse = await response.json()
      const { status, errortext, html } = finishedResponse
      if (status === 'ok') {
        modalOverlay.classList.add('_active')
        bookingConfirmModal.classList.add('_active')
        const modalInnerContent = bookingConfirmModal.querySelector(
          '.modal__inner-content',
        )
        modalInnerContent.innerHTML = html
        roomsSaveBtn.classList.add('_blocked')
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      console.error(err)
      showInfoModal('Во время выполнения запроса произошла ошибка')
    }
  })
}
