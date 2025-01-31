import AirDatepicker from 'air-datepicker'
import {
  addDaysToDate,
  daysBetweenDates,
  defineWeekDay,
  escapeHtml,
  formatStrToDate,
  getRowsSiblings,
  returnDescHeadBooking,
  sendData,
  showInfoModal,
} from '../_functions'
import { lockSvg, modalOverlay, pointerSvg } from '../_vars'

const roomDateController = document.querySelector('.room-date-controller')

let firstDate,
  lastDate = ''

const searchBookings = () => {
  const searchInput = document.querySelector('[name="booking_search"]')
  const bookingTracks = document.querySelectorAll('.booking-track')
  const countSpan = document.querySelector('.search-info__count span')
  const searchTerm = searchInput.value.trim().toLowerCase()

  let foundCount = 0

  bookingTracks.forEach((track) => {
    const jsonData = track.dataset.json
    const childRow = track.closest('tr.child-row')
    if (!jsonData || searchTerm === '') {
      childRow.classList.remove('_visible')
      track.classList.remove('_searched')
      return
    }

    try {
      const bookingData = JSON.parse(jsonData)

      const customer = bookingData.customer
        ? bookingData.customer.toLowerCase()
        : ''
      const room = bookingData.room ? bookingData.room : ''
      const checkIn = bookingData.checkIn ? bookingData.checkIn : ''
      const checkOut = bookingData.checkOut ? bookingData.checkOut : ''

      if (
        customer.includes(searchTerm) ||
        room.includes(searchTerm) ||
        checkIn.includes(searchTerm) ||
        checkOut.includes(searchTerm)
      ) {
        track.classList.add('_searched')
        childRow.classList.add('_visible')
        foundCount++
      } else {
        track.classList.remove('_searched')
      }
      if (countSpan) {
        countSpan.textContent = String(foundCount)
      }
    } catch (error) {
      track.classList.remove('_searched')
    }
  })
}

const searchInput = document.querySelector('[name="booking_search"]')
if (searchInput) {
  searchInput.addEventListener('change', searchBookings)
}

const setInfoModalsHandlers = () => {
  const infoCells = document.querySelectorAll(
    '.room-booking-calendar td .booking-track[data-json]',
  )
  if (infoCells && infoCells?.length) {
    const trackModal = document.querySelector('.track-info-modal')
    const idField = trackModal.querySelector('.track-info-modal__title span')
    const customerField = trackModal.querySelector(
      '.track-info-modal__customer',
    )
    const phoneField = trackModal.querySelector('.track-info-modal__phone')
    const guestsField = trackModal.querySelector('.track-info-modal__guests')
    const checkInField = trackModal.querySelector('.track-info-modal__check-in')
    const checkOutField = trackModal.querySelector(
      '.track-info-modal__check-out',
    )
    const foodField = trackModal.querySelector('.track-info-modal__food')
    const sourceField = trackModal.querySelector('.track-info-modal__source')
    const categoryField = trackModal.querySelector(
      '.track-info-modal__category',
    )
    const tariffField = trackModal.querySelector('.track-info-modal__tariff')
    const roomField = trackModal.querySelector('.track-info-modal__room')
    const priceField = trackModal.querySelector('.track-info-modal__price')
    const paidField = trackModal.querySelector('.track-info-modal__paid')
    const openBookingLink = trackModal.querySelector(
      '.track-info-modal__open-booking',
    )

    infoCells.forEach((cellBtn) => {
      const dataObj = JSON.parse(cellBtn.dataset.json)

      cellBtn?.addEventListener('click', () => {
        trackModal.classList.add('_active')
        modalOverlay.classList.add('_active')
        idField.textContent = dataObj?.id
        customerField.textContent = dataObj?.customer
        phoneField.textContent = dataObj?.phone
        guestsField.textContent = dataObj?.guests
        checkInField.textContent = dataObj?.checkIn
        checkOutField.textContent = dataObj?.checkOut
        foodField.textContent = dataObj?.food
        sourceField.textContent = dataObj?.source
        categoryField.textContent = dataObj?.category
        tariffField.textContent = dataObj?.tariff
        roomField.textContent = dataObj?.room
        priceField.textContent = dataObj?.price
        paidField.textContent = dataObj?.paid
        openBookingLink.href = dataObj?.link
      })

      if (dataObj) {
        let current = formatStrToDate(dataObj?.checkIn.split(' ')[0])
        let first = addDaysToDate(formatStrToDate(firstDate), 7)
        let last = addDaysToDate(formatStrToDate(lastDate), -7)
        let styleOption = ''
        if (current > first && current < last) {
          styleOption = `style="left: ${
            daysBetweenDates(formatStrToDate(firstDate), current) * 20
          }px"`
        } else if (current > last) {
          styleOption = `style="right: ${
            daysBetweenDates(formatStrToDate(lastDate), current) * 20
          }px"`
        } else if (current < first) {
          styleOption = `style="left: ${
            daysBetweenDates(formatStrToDate(firstDate), current) * 20
          }px"`
        }
        cellBtn.parentElement.insertAdjacentHTML(
          'beforeend',
          `<div class="booking-track__comment" ${styleOption}>
            <div class="desc-head">
              ${returnDescHeadBooking(dataObj?.status.slice(1))}
            </div>
            <div class="description-list">
              <div class="description-list__row">
                <span>Сроки проживания:</span>
                <span class="leftInfo">${dataObj?.dayCount}</span>
              </div>
              <div class="description-list__row">
                <span>Всего гостей:</span>
                <span>${dataObj?.guests}</span>
              </div>
              <div class="description-list__row">
                <span>Стоимость:</span>
                <span>${dataObj?.price}</span>
              </div>
              <div class="description-list__row">
                <span>Оплачено:</span>
                <span>${dataObj?.paid}</span>
              </div>
            </div>
            <h5>Комментарий к бронированию:</h5>
            <p>${dataObj?.comment}</p>
          </div>`,
        )
        const commentBlock = cellBtn.parentElement.querySelector(
          '.booking-track__comment',
        )

        cellBtn?.addEventListener('mouseover', () => {
          commentBlock.classList.add('_active')
        })
        cellBtn?.addEventListener('mouseout', () => {
          commentBlock.classList.remove('_active')
        })
      }
    })
  }
}

export const initRowsVisibleHandler = () => {
  const triggerRows = document.querySelectorAll('tr.trigger-row')
  if (triggerRows) {
    triggerRows.forEach((rowEl) => {
      const triggerCell = rowEl.querySelector('td:first-child')
      triggerCell.addEventListener('click', () => {
        const triggerCellPointerIcon = triggerCell.querySelector('svg')
        triggerCellPointerIcon.classList.toggle('_rotate')
        const allSiblings = getRowsSiblings(rowEl, 'trigger-row')
        allSiblings.forEach((el) => el.classList.toggle('_visible'))
      })
    })
  }
}
const renderCells = (cells) => {
  if (cells) {
    const html = cells.map((cell, i) => {
      if (Array.isArray(cell)) {
        return `<td>
              ${cell.map((cellEl) => `<p>${cellEl}</p>`).join('')}
          </td>`
      }

      if (cell.title) {
        return `<td>
          <p>${cell.title}</p>
          ${cell.desc ? cell.desc : ''}
        </td>`
      }

      if (!cell.status) {
        return `<td>
            ${cell}
            ${i === 0 ? pointerSvg : ''}
          </td>`
      }
      if (cell.status === '_green' || cell.status === '_orange') {
        return `<td class="${cell.status}">
             <div class="booking-track" data-json="${escapeHtml(
               JSON.stringify(cell),
             )}" title="${cell.customer ?? ''}, ${
               cell?.price ?? ''
             }" style="width: ${cell.dayCount * 40 - 40}px">
                      <div class="booking-track__short-info">
                         <p>${cell.id ?? ''} ${cell.customer ?? ''}</p>
                         <p>${cell.source ?? ''}</p>
                      </div>
                    <h6>${cell.price ?? ''}</h6>
                  </div>
              </td>`
      }

      if (cell.status === '_red') {
        return `<td class="${cell.status}">
             <div class="booking-track" data-json="${escapeHtml(
               JSON.stringify(cell),
             )}" title="${cell.customer ?? ''}, ${
               cell?.price ?? ''
             }" style="width: ${cell.dayCount * 40 - 40}px">
                      <div class="booking-track__short-info">
                         <p>${cell.id ?? ''} ${cell.customer ?? ''}</p>
                         <p>${cell.source ?? ''}</p>
                      </div>
                    <h6>${cell.price ?? ''}</h6>
                  </div>
              </td>`
      }

      if (cell.status === '_yellow') {
        return `<td class="${cell.status}">
             <div class="booking-track" data-json="${escapeHtml(
               JSON.stringify(cell),
             )}" title="${cell.customer ?? ''}, ${
               cell?.price ?? ''
             }" style="width: ${cell.dayCount * 40 - 40}px">
                      <div class="booking-track__short-info">
                         <p>${cell.id ?? ''} ${cell.customer ?? ''}</p>
                         <p>${cell.source ?? ''}</p>
                      </div>
                    <h6>${cell.price ?? ''}</h6>
                  </div>
              </td>`
      }

      if (cell.status === '_blue') {
        return `<td class="${cell.status}">
             <div class="booking-track" data-json="${escapeHtml(
               JSON.stringify(cell),
             )}" title="${cell.customer ?? ''}, ${
               cell?.price ?? ''
             }" style="width: ${cell.dayCount * 40 - 40}px">
                      <div class="booking-track__short-info">
                         <p>${cell.id ?? ''} ${cell.customer ?? ''}</p>
                         <p>${cell.source ?? ''}</p>
                      </div>
                    <h6>${cell.price ?? ''}</h6>
                  </div>
              </td>`
      }

      if (cell.status === '_gray') {
        return `<td class="${cell.status}">
             <div class="booking-track" data-json="${escapeHtml(
               JSON.stringify(cell),
             )}" title="${cell.customer ?? ''}, ${
               cell?.price ?? ''
             }" style="width: ${cell.dayCount * 40 - 40}px">
                      <div class="booking-track__short-info">
                         <p>${cell.id ?? ''} ${cell.customer ?? ''}</p>
                         <p>${cell.source ?? ''}</p>
                      </div>
                    <h6>${cell.price ?? ''}</h6>
                  </div>
              </td>`
      }

      if (cell.status === '_purple') {
        return `<td class="${cell.status}">
             <div class="booking-track" data-json="${escapeHtml(
               JSON.stringify(cell),
             )}" title="${cell.customer ?? ''}, ${
               cell?.price ?? ''
             }" style="width: ${cell.dayCount * 40 - 40}px">
                      <div class="booking-track__short-info">
                         <p>${cell.id ?? ''} ${cell.customer ?? ''}</p>
                         <p>${cell.source ?? ''}</p>
                      </div>
                    <h6>${cell.price ?? ''}</h6>
                  </div>
              </td>`
      }

      if (cell.status === '_green-lock' || cell.status === '_orange-lock') {
        return `<td class="${cell.status}">
            <a href="${cell.link}" class="booking-track" title="${
              cell.content
            }, ${cell?.price ?? ''}" style="width: ${cell.dayCount * 40}px">
                ${lockSvg}
            </a>
        </td>`
      }

      if (cell.status === '_blue-lock' || cell.status === '_gray-lock') {
        return `<td class="${cell.status}">
            <a href="${cell.link}" class="booking-track" title="${
              cell.content
            }, ${cell?.price ?? ''}" style="width: ${cell.dayCount * 40}px">
                ${lockSvg}
            </a>
        </td>`
      }

      if (cell.status === '_purple-lock') {
        return `<td class="${cell.status}">
            <a href="${cell.link}" class="booking-track" title="${
              cell.content
            }, ${cell?.price ?? ''}" style="width: ${cell.dayCount * 40}px">
                ${lockSvg}
            </a>
        </td>`
      }

      if (cell.status === '_yellow-lock' || cell.status === '_red-lock') {
        return `<td class="${cell.status}">
            <a href="${cell.link}" class="booking-track" title="${
              cell.content
            }, ${cell?.price ?? ''}" style="width: ${cell.dayCount * 40}px">
                ${lockSvg}
            </a>
        </td>`
      }
    })
    return html.join('')
  }
}
const renderChildRows = (childRows) => {
  if (childRows) {
    const html = childRows.map((row) => {
      return `<tr class="child-row">
           ${renderCells(row?.cells)}
        </tr>`
    })
    return html.join('')
  }
}
export const renderRows = (rows) => {
  if (rows) {
    const rowsContainer = document.querySelector('.room-booking-calendar tbody')
    const html = rows.map((row) => {
      return `<tr class="trigger-row">
           ${renderCells(row?.cells)}
        </tr>
        ${renderChildRows(row?.childRows)}`
    })

    rowsContainer.innerHTML = html.join('')
  }
}
const getCellsContent = async (dateInfo) => {
  const bookingTableWrapper = document.querySelector('.room-booking-calendar')
  const dataScript = bookingTableWrapper.dataset.script

  const objData = {
    date: String(dateInfo),
  }
  const jsonData = JSON.stringify(objData)

  try {
    const response = await sendData(jsonData, dataScript)

    const finishedResponse = await response.json()

    firstDate = finishedResponse.first_date
    lastDate = finishedResponse.last_date

    const { status, errortext, rows } = finishedResponse

    if (status === 'ok') {
      renderRows(rows)
      setInfoModalsHandlers()
    } else {
      showInfoModal(errortext)
    }
  } catch (err) {
    showInfoModal('Во время выполнения запроса произошла ошибка')
    console.error(err)
  }
}

if (roomDateController) {
  const calendarInput = roomDateController.querySelector('.main-input')
  const datePreview = roomDateController.querySelector(
    '.room-date-controller__date-preview',
  )
  const presentDay = new Date()
  getCellsContent(presentDay).then(() => initRowsVisibleHandler())

  const currentDayBtn = roomDateController.querySelector(
    '.room-date-controller__current-day-btn',
  )

  currentDayBtn.addEventListener('click', () => {
    customRoomCalendar.selectDate(presentDay)
    customRoomCalendar.setViewDate(presentDay)
  })

  const customRoomCalendar = new AirDatepicker(calendarInput, {
    onSelect: ({ date }) => {
      datePreview.textContent = customRoomCalendar.formatDate(date, 'MMMM yyyy')

      renderDateRow(customRoomCalendar.getViewDates('days'))
      getCellsContent(date).then(() => initRowsVisibleHandler())
    },
    selectedDates: [presentDay],
  })
  datePreview.textContent = customRoomCalendar.formatDate(
    presentDay,
    'MMMM yyyy',
  )

  calendarInput.addEventListener('paste', (e) => e.preventDefault())
  calendarInput.addEventListener('keydown', (e) => e.preventDefault())
  //отрисовка таблицы с датами бронирования

  const setDateTypeClass = (checkedDate) => {
    const nowDate = customRoomCalendar.selectedDates
    const nowDateFormatted = customRoomCalendar.formatDate(
      nowDate,
      'dd.MM.yyyy',
    )
    const checkedDateFormatted = customRoomCalendar.formatDate(
      checkedDate,
      'dd.MM.yyyy',
    )
    customRoomCalendar.formatDate(nowDate, 'MM')
    customRoomCalendar.formatDate(checkedDate, 'MM')
    if (nowDateFormatted === checkedDateFormatted) {
      return '_active-day'
    }
    return ''
  }

  const bookingTable = document.querySelector('.room-booking-calendar table')
  const bookingTableTitleRow = bookingTable.querySelector(
    'thead tr.room-booking-calendar__dates-row',
  )

  const renderDateRow = (cellArr) => {
    const html = cellArr.map((dateEl) => {
      return `<th class="day-cell ${setDateTypeClass(dateEl)}">
                    <span>${customRoomCalendar.formatDate(dateEl, 'dd')}</span>
                    <span>${defineWeekDay(dateEl)}</span>
                </th>`
    })
    html.unshift('<th>Номера</th>')
    bookingTableTitleRow.innerHTML = html.join('')
  }

  renderDateRow(customRoomCalendar.getViewDates('days'))
}
