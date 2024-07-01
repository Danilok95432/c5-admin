import {
  bookingConfirmModal,
  modalOverlay,
  newAdultGuest,
  newChildGuest,
  newRoom,
} from '../_vars'
import { initAllDates } from './customDate'
import { sendData, showInfoModal } from '../_functions'
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

  let initialSum = Number(discountSumInput.value) ?? 0

  discountPercentInput.addEventListener('input', (e) => {
    discountSumInput.value = initialSum - initialSum * (+e.target.value / 100)
    totalCostToPay.textContent = String(
      initialSum - initialSum * (+e.target.value / 100),
    )

    if (!e.target.value || e.target.value === '0') {
      discountRubInput.classList.remove('_disabled')
    } else {
      discountRubInput.value = '0'
      discountRubInput.classList.add('_disabled')
    }
  })
  discountRubInput.addEventListener('input', (e) => {
    discountSumInput.value = initialSum - Number(e.target.value)
    totalCostToPay.textContent = String(initialSum - Number(e.target.value))
    if (!e.target.value || e.target.value === '0') {
      discountPercentInput.classList.remove('_disabled')
    } else {
      discountPercentInput.value = '0'
      discountPercentInput.classList.add('_disabled')
    }
  })

  const setDiscountSum = (price) => {
    if (!price) return

    discountPercentInput.classList.remove('_disabled')
    discountRubInput.classList.remove('_disabled')

    const roomsCount =
      editBookingPage.querySelector('.rooms-list').children.length
    const totalPrice = price * roomsCount
    initialSum = totalPrice
    discountSumInput.value = totalPrice
    totalCostToPay.textContent = String(totalPrice)
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
      const {
        status,
        errortext,
        bookingId,
        receiptDate,
        receiptTime,
        adultCount,
        childCount,
        clientName,
        clientPhone,
        checkInDate,
        checkOutDate,
        checkInTime,
        checkOutTime,
        roomCategory,
        tariff,
        bookingSource,
        price,
        bookingRoom,
        totalPrice,
        totalPaid,
      } = finishedResponse
      if (status === 'ok') {
        modalOverlay.classList.add('_active')
        bookingConfirmModal.classList.add('_active')

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__id span',
        ).textContent = bookingId ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__receipt-date',
        ).textContent = receiptDate ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__receipt-time',
        ).textContent = receiptTime ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__adult-count',
        ).textContent = adultCount ?? '0'

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__child-count',
        ).textContent = childCount ?? '0'

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__client-name',
        ).textContent = clientName ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__client-phone',
        ).textContent = clientPhone ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__check-in-date',
        ).textContent = checkInDate ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__check-in-time',
        ).textContent = checkInTime ?? ''
        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__check-out-date',
        ).textContent = checkOutDate ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__check-out-time',
        ).textContent = checkOutTime ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__room-category',
        ).textContent = roomCategory ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__room-tariff',
        ).textContent = tariff ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__booking-source',
        ).textContent = bookingSource ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__price',
        ).textContent = price ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__booking-room',
        ).textContent = bookingRoom ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__total-price',
        ).textContent = totalPrice ?? ''

        bookingConfirmModal.querySelector(
          '.booking-confirm-modal__total-paid',
        ).textContent = totalPaid ?? ''
      } else {
        roomsSaveBtn.classList.add('_blocked')
        showInfoModal(errortext)
      }
    } catch (err) {
      roomsSaveBtn.classList.add('_blocked')
      console.error(err)
      showInfoModal('Во время выполнения запроса произошла ошибка')
    }
  })
}
