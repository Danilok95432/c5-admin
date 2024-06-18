import {
  formatStrToDate,
  formToObj,
  renderOptionsToSelect,
  sendData,
  serializeForm,
  showInfoModal,
} from '../_functions'
import { initRowsVisibleHandler, renderRows } from './roomDateController'

const filterForm = document.querySelector('.price-filter-form')

if (filterForm) {
  const filterFormScript = filterForm.action
  const categoriesInput = filterForm.querySelector(
    '.price-filter-form__categories-input',
  )
  const tariffsInput = filterForm.querySelector(
    '.price-filter-form__tariffs-input',
  )
  const categoriesScript = categoriesInput.dataset.script

  // получение options для селекта с тарифами, в зависимости от категории
  categoriesInput.addEventListener('input', async (e) => {
    const objData = {
      category: e.currentTarget.value,
    }
    const jsonData = JSON.stringify(objData)

    try {
      const response = await sendData(jsonData, categoriesScript)
      const finishedResponse = await response.json()

      const { status, errortext, options } = finishedResponse

      if (status === 'ok') {
        renderOptionsToSelect(tariffsInput, options)
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal('Во время выполнения запроса произошла ошибка')
      console.error(err)
    }
  })

  // перерисовка таблицы цен после отправки формы фильтрации

  filterForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const dateInput = document.querySelector(
      '.room-date-controller__calendar .main-input',
    )

    const data = serializeForm(e.target)
    const objData = formToObj(data)
    const totalData = {
      ...objData,
      date: formatStrToDate(dateInput.value),
    }
    const jsonData = JSON.stringify(totalData)

    try {
      const response = await sendData(jsonData, filterFormScript)
      const finishedResponse = await response.json()

      const { status, errortext, rows } = finishedResponse

      if (status === 'ok') {
        renderRows(rows)
        initRowsVisibleHandler()
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal('Во время выполнения запроса произошла ошибка')
      console.error(err)
    }
  })
}
