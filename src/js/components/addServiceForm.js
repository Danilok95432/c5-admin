import {
  formToObj,
  sendData,
  serializeForm,
  showInfoModal,
} from '../_functions'

const addServiceForm = document.querySelector('.add-service-modal-form')

if (addServiceForm) {
  // Логика рассчета стоимости услуги

  const calcCostInput = addServiceForm.querySelector(
    '.calc-cost-row .main-input',
  )
  const calcCostBtn = addServiceForm.querySelector('.calc-cost-row .main-btn')
  const calcCostScript = calcCostBtn.dataset.script

  calcCostBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const data = serializeForm(addServiceForm)
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
