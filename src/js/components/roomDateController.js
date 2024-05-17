import AirDatepicker from 'air-datepicker'
import {
  defineWeekDay,
  getRowsSiblings,
  sendData,
  showInfoModal,
} from '../_functions'
import { lockSvg, pointerSvg } from '../_vars'

const roomDateController = document.querySelector('.room-date-controller')

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
      if (!cell.status) {
        return `<td>
            ${cell}
            ${i === 0 ? pointerSvg : ''}
          </td>`
      }
      if (cell.status === '_green' || cell.status === '_orange') {
        return `<td class="${cell.status}" >
             <a href="${cell.link}" class="booking-track" title="${
               cell.content
             }, ${cell?.price ?? ''}" style="width: ${
               cell.dayCount * 40 - 40
             }px">
                    <p>${cell.content}</p>
                    <h6>${cell.price ?? ''}</h6>
                  </a>
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
    if (nowMonthFormatted !== checkedMonthFormatted) {
      return '_no-current'
    }
    return ''
  }

  const bookingTable = document.querySelector('.room-booking-calendar table')
  const bookingTableTitleRow = bookingTable.querySelector('thead tr')

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
