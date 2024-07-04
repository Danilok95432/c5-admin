import {
  formToObj,
  sendData,
  serializeForm,
  showInfoModal,
} from '../_functions'
import { modalOverlay } from '../_vars'
import { initContextSelects } from './contextSelect'
import { initAllMasks } from './inputMask'
import { initAllDates } from './customDate'

const initCalcCost = (serviceFormNode) => {
  if (serviceFormNode) {
    // Логика рассчета стоимости услуги
    const calcCostInput = serviceFormNode.querySelector(
      '.calc-cost-row .main-input',
    )
    const calcCostBtn = serviceFormNode.querySelector(
      '.calc-cost-row .main-btn',
    )
    const calcCostScript = calcCostBtn.dataset.script

    calcCostBtn.addEventListener('click', async (e) => {
      e.preventDefault()
      const data = serializeForm(serviceFormNode)
      const objData = formToObj(data)

      const jsonData = JSON.stringify(objData)

      try {
        const response = await sendData(jsonData, calcCostScript)
        const finishedResponse = await response.json()

        const { status, errortext, cost } = finishedResponse

        if (status === 'ok') {
          calcCostInput.value = cost
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        showInfoModal('Во время выполнения запроса произошла ошибка')
        console.error(err)
      }
    })
  }
}
const addServiceForm = document.querySelector('.add-service-modal-form')

initCalcCost(addServiceForm)

// логика редактирования услуги

const editServiceBtns = document.querySelectorAll(
  '.booking-services-page__edit-service-btn',
)

if (editServiceBtns) {
  const editServiceModal = document.querySelector('.edit-service-modal')
  const editServiceForm = editServiceModal.querySelector(
    '.add-service-modal-form',
  )
  editServiceBtns.forEach((editBtn) => {
    const editScript = editBtn.dataset.script
    const serviceId = editBtn.dataset.id
    editBtn.addEventListener('click', async (e) => {
      e.preventDefault()
      const data = {
        id: serviceId,
      }

      const jsonData = JSON.stringify(data)

      try {
        const response = await sendData(jsonData, editScript)
        const finishedResponse = await response.json()

        const { status, errortext, html } = finishedResponse

        if (status === 'ok') {
          editServiceForm.innerHTML = html
          editServiceModal.classList.add('_active')
          modalOverlay.classList.add('_active')
          initCalcCost(editServiceForm)
          initContextSelects(editServiceForm)
          initAllMasks()
          initAllDates()
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        showInfoModal('Во время выполнения запроса произошла ошибка')
        console.error(err)
      }
    })
  })
}
