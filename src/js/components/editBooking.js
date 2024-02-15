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
    '.rooms-params__search-btn',
  )
  const freeRoomsList = editBookingPage.querySelector('.rooms-params__list')
  const roomsCategoriesSelectWrapper = editBookingPage.querySelector(
    '.input-column-wrapper__categories-select',
  )
  const roomsTariffsSelectWrapper = editBookingPage.querySelector(
    '.input-column-wrapper__tariff-select',
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

      const { status, errortext, htmlRooms, htmlCategories, htmlTariffs } =
        finishedResponse
      if (status === 'ok') {
        roomsSaveBtn.classList.remove('_blocked')
        freeRoomsList.innerHTML = htmlRooms
        roomsCategoriesSelectWrapper.innerHTML = htmlCategories
        roomsTariffsSelectWrapper.innerHTML = htmlTariffs
        initBlockedInputs()
        initRoomsCategories()
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      console.error(err)
      showInfoModal('Во время выполнения запроса произошла ошибка')
    }
  })

  const initRoomsCategories = () => {
    const roomsCategoriesScript = roomsCategoriesSelectWrapper.dataset.script

    const roomsCategoriesSelect =
      roomsCategoriesSelectWrapper.querySelector('.main-input')

    roomsCategoriesSelect.addEventListener('input', async (e) => {
      const data = {
        room_category: e.currentTarget.value,
      }

      const jsonData = JSON.stringify(data)

      try {
        const response = await sendData(jsonData, roomsCategoriesScript)
        const finishedResponse = await response.json()

        const { status, errortext, htmlRooms, htmlTariffs } = finishedResponse
        if (status === 'ok') {
          freeRoomsList.innerHTML = htmlRooms
          roomsTariffsSelectWrapper.innerHTML = htmlTariffs
          initBlockedInputs()
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        console.error(err)
        showInfoModal('Во время выполнения запроса произошла ошибка')
      }
    })
  }

  initRoomsCategories()
  initBlockedInputs()
}
