import { newAdultGuest, newChildGuest, newRoom } from '../_vars'
import { initAllDates } from './customDate'

const editBookingPage = document.querySelector('.edit-booking-page')

if (editBookingPage) {
  const roomsWrapper = editBookingPage.querySelector('.rooms-category')
  const roomsList = editBookingPage.querySelector('.rooms-list')

  let observer = new MutationObserver(() => {
    ;[...roomsList.children].forEach((room, roomIdx) => {
      const roomAmount = room.querySelector('h4 .changeable-amount')
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
    }
  })
}
