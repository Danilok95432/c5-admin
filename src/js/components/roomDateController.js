import AirDatepicker from 'air-datepicker'
import {
  addDaysToDate,
  areDateRangesIntersecting,
  defineWeekDay,
  escapeHtml,
  findNearestClient,
  formatStrToDate,
  getNoun,
  getRowsSiblings,
  intersectionDates,
  returnDescHeadBooking,
  sendData,
  showInfoModal,
} from '../_functions'
import { lockSvg, modalOverlay, pointerSvg } from '../_vars'

const roomDateController = document.querySelector('.room-date-controller')

let firstDate,
  lastDate = ''
let redTracks = []
const countSpan = document.querySelector('.search-info__count span')
if (countSpan) {
  countSpan.textContent = '0'
}

const searchBookings = () => {
  const searchInput = document.querySelector('[name="booking_search"]')
  const bookingTracks = document.querySelectorAll('.booking-track')
  const countSpan = document.querySelector('.search-info__count span')
  const searchTerm = searchInput.value.trim().toLowerCase()

  let foundCount = 0
  if (countSpan) {
    countSpan.textContent = String(foundCount)
  }

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

const updateCommentPosition = (current, first, last, cellBtn, commentBlock) => {
  const rect = cellBtn.getBoundingClientRect()
  if (current > first && current < last) {
    commentBlock.style.left = `${rect.left - window.scrollX}px`
    commentBlock.style.top = `${rect.top + 50}px`
  } else if (current > last) {
    commentBlock.style.left = `${rect.left - window.scrollX - 395}px`
    commentBlock.style.top = `${rect.top + 50}px`
  } else if (current < first) {
    commentBlock.style.left = `${rect.left - window.scrollX}px`
    commentBlock.style.top = `${rect.top + 50}px`
  }
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

    const conflictModal = document.querySelector('.booking-conflict-modal')
    const acceptRequestModal = document.querySelector(
      '.accept-booking-message-modal',
    )
    const clientRequestField = acceptRequestModal.querySelector(
      '.client-request-field',
    )
    const closeModalBtn = conflictModal.querySelector('.modal-close-btn')
    const categoryConflictField = conflictModal.querySelector(
      '.booking-conflict-modal__category',
    )
    const roomConflictField = conflictModal.querySelector(
      '.booking-conflict-modal__room',
    )
    const datesConflictField = conflictModal.querySelector(
      '.booking-conflict-modal__dates',
    )

    const overBookingRequests = conflictModal.querySelector(
      '.over-booking-requests',
    )
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        redTracks = []
        overBookingRequests.innerHTML = ``
      })
    }

    const triggerRows = document.querySelectorAll('tr.trigger-row')
    const bookingTracks = document.querySelectorAll('.booking-track')
    infoCells.forEach((cellBtn) => {
      const dataObj = JSON.parse(cellBtn.dataset.json)
      cellBtn?.addEventListener('click', () => {
        if (dataObj?.status != '_red') {
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
        } else {
          conflictModal.classList.add('_active')
          modalOverlay.classList.add('_active')
          categoryConflictField.textContent = dataObj?.category
          roomConflictField.textContent = dataObj?.room
          let datesRange = []
          datesRange.push([
            dataObj?.checkIn.split(' ')[0],
            dataObj?.checkOut.split(' ')[0],
          ])
          bookingTracks.forEach((track) => {
            const jsonData = track.dataset.json
            try {
              const bookingData = JSON.parse(jsonData)
              if (bookingData.status == '_red') {
                datesRange.push([
                  bookingData.checkIn.split(' ')[0],
                  bookingData.checkOut.split(' ')[0],
                ])
                if (areDateRangesIntersecting(datesRange)) {
                  redTracks.push(bookingData)
                }
                datesRange.pop()
              }
            } catch (error) {
              console.log('error', error)
            }
          })
          datesRange = []
          redTracks.forEach((track) => {
            datesRange.push([
              track.checkIn.split(' ')[0],
              track.checkOut.split(' ')[0],
            ])
          })
          datesConflictField.textContent = intersectionDates(datesRange)
          redTracks.forEach((track) => {
            const requestDiv = document.createElement('div')
            requestDiv.classList.add('booking-request')
            requestDiv.innerHTML = `
              <div class="header">
                <h2>Заявка #241112-161-603100 (Овербукинг-8990)</h2>
                <button class="accept-request-btn">Утвердить заявку</button>
              </div>
              <div class="info">
                <div class="fix-row">
                  <p class="fix-row__title">Клиент:</p>
                  <p class="fix-row__desc booking-conflict-modal__client">${
                    track.customer
                  }</p>
                </div>
                <div class="fix-row">
                  <p class="fix-row__title">Гости:</p>
                  <p class="fix-row__desc booking-conflict-modal__guests">${
                    track.guests
                  }</p>
                </div>
                <div class="fix-row">
                  <p class="fix-row__title">Даты:</p>
                  <p class="fix-row__desc booking-conflict-modal__dates">${
                    track.checkIn.split(' ')[0]
                  } - ${track.checkOut.split(' ')[0]}(${
                    track.dayCount - 1
                  } ${getNoun(track.dayCount - 1, 'ночь', 'ночи', 'ночей')})</p>
                </div>
                <div class="fix-row">
                  <p class="fix-row__title">Вся цена:</p>
                  <p class="fix-row__desc booking-conflict-modal__price">${
                    track.price
                  }</p>
                </div>
                <div class="fix-row">
                  <p class="fix-row__title">Предоплата:</p>
                  <p class="fix-row__desc booking-conflict-modal__paid">${
                    track.paid
                  }</p>
                </div>
              </div>
            `
            overBookingRequests.appendChild(requestDiv)
          })
          const acceptBtns = document.querySelectorAll('.accept-request-btn')
          acceptBtns.forEach((btn) => {
            const client = findNearestClient(btn)
            btn.addEventListener('click', () => {
              acceptRequestModal.classList.add('_active')
              clientRequestField.innerHTML = client
              conflictModal.classList.remove('_active')
              const accept = acceptRequestModal.querySelector('.accept-request')
              const reject = acceptRequestModal.querySelector('.reject-request')
              if (accept && reject) {
                accept.addEventListener('click', () => {
                  acceptRequestModal.classList.remove('_active')
                  modalOverlay.classList.remove('_active')
                  bookingTracks.forEach((track) => {
                    const jsonData = track.dataset.json
                    try {
                      const bookingData = JSON.parse(jsonData)
                      if (
                        bookingData.status == '_red' &&
                        bookingData.customer == clientRequestField.textContent
                      ) {
                        bookingData.status = '_orange'
                        const presentDay = new Date()
                        getCellsContent(presentDay, bookingData).then(() =>
                          initRowsVisibleHandler(),
                        )
                      }
                    } catch (error) {
                      console.log('error', error)
                    }
                  })
                  redTracks = []
                  overBookingRequests.innerHTML = ``
                })
                reject.addEventListener('click', () => {
                  conflictModal.classList.add('_active')
                  acceptRequestModal.classList.remove('_active')
                })
              }
            })
          })
        }
      })

      if (dataObj) {
        if (triggerRows) {
          triggerRows.forEach((rowEl) => {
            const triggerCell = rowEl.querySelector('td:first-child')
            const triggerCellPointerIcon = triggerCell.querySelector('svg')
            if (!triggerCellPointerIcon.classList.contains('_rotate')) {
              const allSiblings = getRowsSiblings(rowEl, 'trigger-row')
              const el = allSiblings.filter((child) =>
                child.querySelector('.booking-track'),
              )
              if (el.length > 0) {
                triggerCellPointerIcon.classList.toggle('_rotate')
                allSiblings.forEach((el) => el.classList.toggle('_visible'))
              }
            }
          })
        }
        let current = formatStrToDate(dataObj?.checkIn.split(' ')[0])
        let first = addDaysToDate(formatStrToDate(firstDate), 7)
        let last = addDaysToDate(formatStrToDate(lastDate), -7)

        cellBtn.parentElement.insertAdjacentHTML(
          'beforeend',
          `<div class="booking-track__comment">
            <div class="desc-head">
              ${returnDescHeadBooking(dataObj?.status.slice(1))}
            </div>
            <div class="description-list">
              <div class="description-list__row">
                <span>Количество ночей:</span>
                <span class="leftInfo">${dataObj?.dayCount - 1}</span>
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

        let commentBlock = cellBtn.parentElement.querySelector(
          '.booking-track__comment',
        )

        updateCommentPosition(current, first, last, cellBtn, commentBlock)
        const roomBookingCalendar = document.querySelector(
          '.room-booking-calendar',
        )
        window.addEventListener('scroll', () =>
          updateCommentPosition(current, first, last, cellBtn, commentBlock),
        )
        roomBookingCalendar.addEventListener('scroll', () =>
          updateCommentPosition(current, first, last, cellBtn, commentBlock),
        )
        window.addEventListener('resize', () =>
          updateCommentPosition(current, first, last, cellBtn, commentBlock),
        )

        cellBtn?.addEventListener('mouseover', () => {
          commentBlock.classList.add('_active')
        })
        cellBtn?.addEventListener('mouseout', () => {
          commentBlock.classList.remove('_active')
        })
      }
    })
  } else {
    const triggerRows = document.querySelectorAll('tr.trigger-row')
    if (triggerRows) {
      triggerRows.forEach((rowEl) => {
        const triggerCell = rowEl.querySelector('td:first-child')
        const triggerCellPointerIcon = triggerCell.querySelector('svg')
        if (!triggerCellPointerIcon.classList.contains('_rotate')) {
          const allSiblings = getRowsSiblings(rowEl, 'trigger-row')
          const el = allSiblings.filter((child) =>
            child.getElementsByTagName('p'),
          )
          if (el.length > 0) {
            triggerCellPointerIcon.classList.toggle('_rotate')
            allSiblings.forEach((el) => el.classList.toggle('_visible'))
          }
        }
      })
    }
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
const getCellsContent = async (dateInfo, changedTrack = null) => {
  const bookingTableWrapper = document.querySelector('.room-booking-calendar')
  const dataScript = bookingTableWrapper.dataset.script

  const objData = {
    date: String(dateInfo),
  }
  const jsonData = JSON.stringify(objData)

  try {
    const response = await sendData(jsonData, dataScript)

    if (changedTrack !== null) {
      response.rows.map((row) => {
        row.childRows.map((elem) => {
          elem.cells.map((item) => {
            if (
              item.customer === changedTrack.customer &&
              item.category === changedTrack.category &&
              item.room === changedTrack.room
            ) {
              item.status = '_orange'
            }
          })
        })
      })
    }

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

  const getCalendarDates = (startDate) => {
    const dates = []
    let currentDate = new Date(startDate)

    while (currentDate.getMonth() === startDate.getMonth()) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    let nextMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      1,
    )
    for (let i = 0; i < 2; i++) {
      while (nextMonth.getMonth() === (startDate.getMonth() + 1 + i) % 12) {
        dates.push(new Date(nextMonth))
        nextMonth.setDate(nextMonth.getDate() + 1)
      }
      nextMonth = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 2 + i,
        1,
      )
    }

    return dates
  }

  const startDate = new Date(presentDay)
  startDate.setDate(presentDay.getDate() - 16)

  const calendarDates = getCalendarDates(startDate)

  const customRoomCalendar = new AirDatepicker(calendarInput, {
    onSelect: ({ date }) => {
      datePreview.textContent = customRoomCalendar.formatDate(date, 'MMMM yyyy')
      const newStartDate = new Date(date)
      newStartDate.setDate(date.getDate() - 16)
      const newCalendarDates = getCalendarDates(newStartDate)
      const newMonthHeaders = getMonthHeaders(
        newCalendarDates,
        customRoomCalendar,
      )
      renderDateRow(newCalendarDates, newMonthHeaders)
      getCellsContent(date).then(() => initRowsVisibleHandler())
    },
    selectedDates: [presentDay],
  })

  const getMonthHeaders = (dates, calendar) => {
    const monthHeaders = []
    let currentMonth = null

    dates.forEach((date) => {
      const month = calendar.formatDate(date, 'MMMM yyyy')
      if (month !== currentMonth) {
        monthHeaders.push({ date: date, header: month })
        currentMonth = month
      }
    })
    return monthHeaders
  }

  getMonthHeaders(calendarDates, customRoomCalendar)

  const currentDayBtn = roomDateController.querySelector(
    '.room-date-controller__current-day-btn',
  )
  currentDayBtn.addEventListener('click', () => {
    customRoomCalendar.selectDate(presentDay)
    customRoomCalendar.setViewDate(presentDay)
  })

  calendarInput.addEventListener('paste', (e) => e.preventDefault())
  calendarInput.addEventListener('keydown', (e) => e.preventDefault())

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
    if (nowDateFormatted === checkedDateFormatted) {
      return '_active-day'
    }
    return ''
  }

  const bookingTable = document.querySelector('.room-booking-calendar table')
  const bookingTableTitleRow = bookingTable.querySelector(
    'thead tr.room-booking-calendar__dates-row',
  )

  const calculateMonthHeaderPosition = (date) => {
    const firstDayCell = bookingTableTitleRow.querySelector(`.day-cell`)

    if (!firstDayCell) {
      return 0
    }

    const calendarRect = bookingTable.getBoundingClientRect()

    let firstDayIndex = calendarDates.findIndex(
      (d) =>
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear(),
    )

    if (firstDayIndex === -1) return 0

    const dayCells = bookingTableTitleRow.querySelectorAll(`.day-cell`)
    const relevantDayCell = dayCells[firstDayIndex]

    if (!relevantDayCell) return 0

    const cellRect = relevantDayCell.getBoundingClientRect()

    return cellRect.left - calendarRect.left
  }

  const renderDateRow = (cellArr, headers) => {
    let html = ''

    cellArr.forEach((dateEl) => {
      html += `<th class="day-cell ${setDateTypeClass(dateEl)}">
            <span>${customRoomCalendar.formatDate(dateEl, 'dd')}</span>
            <span>${defineWeekDay(dateEl)}</span>
        </th>`
    })

    bookingTableTitleRow.innerHTML = `<th>Номера</th>${html}`

    const roomDateControllerEl = document.querySelector('.room-date-controller')
    const existingElements = roomDateControllerEl.querySelectorAll(
      '.room-date-controller__month-header, .room-date-controller__line',
    )
    existingElements.forEach((el) => el.remove())

    headers.forEach((header, index) => {
      if (index > 0) {
        const lineEl = document.createElement('th')
        lineEl.classList.add('room-date-controller__line')
        lineEl.style.position = 'absolute'
        lineEl.style.top = '0'

        const headerPosition = calculateMonthHeaderPosition(header.date)
        lineEl.style.left = `${headerPosition}px`
        lineEl.style.width = `1px`
        lineEl.style.height = `10000px`
        roomDateControllerEl.appendChild(lineEl)
      }

      const monthHeaderEl = document.createElement('th')
      monthHeaderEl.classList.add('room-date-controller__month-header')
      monthHeaderEl.style.position = 'absolute'
      monthHeaderEl.style.top = '20px'
      monthHeaderEl.style.left = `${calculateMonthHeaderPosition(
        header.date,
      )}px`
      monthHeaderEl.textContent = header.header
      roomDateControllerEl.appendChild(monthHeaderEl)
    })
  }

  const hiddenRowTr = document.createElement('tr')
  hiddenRowTr.classList.add('hidden-row-tr')
  hiddenRowTr.style.display = 'none'

  bookingTableTitleRow.parentNode.insertBefore(
    hiddenRowTr,
    bookingTableTitleRow,
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          bookingTableTitleRow.classList.add(
            'room-booking-calendar__dates-row--fixed',
          )
          updateFixedHeaderPosition()
          hiddenRowTr.style.display = 'table-row'
          hiddenRowTr.innerHTML = bookingTableTitleRow.innerHTML
        } else {
          bookingTableTitleRow.classList.remove(
            'room-booking-calendar__dates-row--fixed',
          )
          bookingTableTitleRow.style.top = ''
          hiddenRowTr.style.display = 'none'
        }
      })
    },
    {
      threshold: 0,
      rootMargin: '0px 0px 0px 0px',
    },
  )

  observer.observe(roomDateController)

  const updateFixedHeaderPosition = () => {
    const scrollY = window.scrollY - 340
    const initialTop = 67
    const newTop = scrollY + initialTop

    bookingTableTitleRow.style.top = `${newTop}px`
  }

  window.addEventListener('scroll', () => {
    if (
      bookingTableTitleRow.classList.contains(
        'room-booking-calendar__dates-row--fixed',
      )
    ) {
      updateFixedHeaderPosition()
    }
  })

  const init = () => {
    const initialMonthHeaders = getMonthHeaders(
      calendarDates,
      customRoomCalendar,
    )
    renderDateRow(calendarDates, initialMonthHeaders)
    getCellsContent(presentDay).then(() => initRowsVisibleHandler())
  }

  init()
}
