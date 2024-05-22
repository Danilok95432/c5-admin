import AirDatepicker from 'air-datepicker'
import {
  defineWeekDay,
  escapeHtml,
  getRowsSiblings,
  sendData,
  showInfoModal,
} from '../_functions'
import { lockSvg, modalOverlay, pointerSvg } from '../_vars'

const roomDateController = document.querySelector('.room-date-controller')

const setInfoModalsHandlers = () => {
  const infoCells = document.querySelectorAll(
    '.room-booking-calendar td .booking-track[data-json]',
  )
  if (infoCells) {
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

      cellBtn?.addEventListener('click', (e) => {
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

      if (dataObj.comment) {
        cellBtn.parentElement.insertAdjacentHTML(
          'beforeend',
          `<div class="booking-track__comment">
                       <h5>Комментарий к бронированию:</h5>
                       <p>${dataObj.comment}</p>
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

const initRowsVisibleHandler = () => {
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
        return `<td class="${cell.status}" >
             <a href="${cell.link}" class="booking-track" title="${
               cell.content
             }" style="width: ${cell.dayCount * 40 - 40}px">
                    <p>${cell.content}</p>
                  </a>
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
      if (cell.status === '_red-lock') {
        return `<td class="${cell.status}">
            <a href="${cell.link}" class="booking-track" title="${
              cell.content
            }" style="width: ${cell.dayCount * 40}px">
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
const renderRows = (rows) => {
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
  const calendarInput = roomDateController.querySelector('.date-mask')
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
    onSelect: ({ date, formattedDate }) => {
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

  calendarInput.addEventListener('click', (e) => {
    const featuredDate = e.currentTarget.value.split('.').reverse().join('-')
    if (featuredDate) {
      customRoomCalendar.selectDate(featuredDate)
      customRoomCalendar.setViewDate(featuredDate)
    }
  })

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
    const nowMonthFormatted = customRoomCalendar.formatDate(nowDate, 'MM')
    const checkedMonthFormatted = customRoomCalendar.formatDate(
      checkedDate,
      'MM',
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
