import { newAdultGuest, newChildGuest, newRoom } from '../_vars'
import { initAllDates } from './customDate'
import { sendData, showInfoModal } from '../_functions'
import { initAllMasks } from './inputMask'

const editBookingPage = document.querySelector('.edit-booking-page')

if (editBookingPage) {
  const roomsWrapper = editBookingPage.querySelector('.rooms-category')
  const roomsList = editBookingPage.querySelector('.rooms-list')
  const editBookingForm = editBookingPage.querySelector(
    '.edit-booking-page__form',
  )

  const searchRoomsBtn = editBookingPage.querySelector(
    '.rooms-search .main-btn',
  )
  const freeRoomsList = editBookingPage.querySelector('.rooms-params__list')
  const roomsCategoriesSelect = editBookingPage.querySelector(
    '.input-column-wrapper__categories-select select',
  )
  const roomsTariffsSelect = editBookingPage.querySelector(
    '.input-column-wrapper__tariff-select select',
  )

  const roomsSaveBtn = editBookingPage.querySelector(
    '.rooms-params__btn-wrapper',
  )

  // Логика добавления номеров и гостей с нумерацией имен инпутов

  let observer = new MutationObserver(() => {
    ;[...roomsList.children].forEach((room, roomIdx) => {
      const roomAmount = room.querySelector('h4 .changeable-amount')
      const roomOrderInput = room.querySelector('.room-order-input')
      const initialName = roomOrderInput.name.split('[')[0]
      roomOrderInput.name = `${initialName}[${roomIdx + 1}]`
      roomAmount.textContent = roomIdx + 1
      const guestsList = room.querySelector('.guests-list')
      ;[...guestsList.children].forEach((guest, guestIdx) => {
        const guestAmount = guest.querySelector('h5 .changeable-amount')
        guestAmount.textContent = guestIdx + 1
        const guestInputs = guest.querySelectorAll('.main-input')
        guestInputs.forEach((input) => {
          const initialName = input.name.split('[')[0]
          input.name = `${initialName}[${roomIdx + 1}][${guestIdx + 1}]`
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
    if (e.target.dataset.btn === 'delete') {
      e.target.closest('li').remove()
    }

    if (e.target.dataset.template === 'new-room') {
      roomsList.insertAdjacentHTML('beforeend', newRoom)
      initAllDates()
      initAllMasks()
    }

    if (
      e.target.dataset.template === 'new-adult' ||
      e.target.dataset.template === 'new-child'
    ) {
      const guestsList = e.target.parentElement.querySelector('.guests-list')

      if (e.target.dataset.template === 'new-adult') {
        guestsList.insertAdjacentHTML('beforeend', newAdultGuest)
      }
      if (e.target.dataset.template === 'new-child') {
        guestsList.insertAdjacentHTML('beforeend', newChildGuest)
      }
      initAllDates()
      initAllMasks()
    }
  })

  // Логика поиска подходящих номеров

  let globalRoomsData = []
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

  roomsCategoriesSelect.addEventListener('input', (e) => {
    const currentSelectValue = e.target.value
    const currentCategory = globalRoomsData.find(
      (category) => currentSelectValue === category.categoryValue,
    )
    initTariffsSelect(currentCategory.tariffs)
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
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      console.error(err)
      showInfoModal('Во время выполнения запроса произошла ошибка')
    }
  })

  initBlockedInputs()
}
