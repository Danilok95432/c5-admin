import { sendData, showInfoModal } from '../_functions'

const calcFetchAmount = (fetchAmountElements) => {
  if (fetchAmountElements) {
    Array.from(fetchAmountElements).forEach((el, i) => {
      const amount = el.querySelector('.fetch-amount')
      if (amount) {
        amount.textContent = i + 1
      }
    })
  }
}

const handleFetchListsSubmit = async ({ script, add, valueInput, wrapper }) => {
  if (!valueInput?.value) {
    return
  }

  const allData = {
    value: valueInput.value,
    add: add ?? '',
  }
  const jsonData = JSON.stringify(allData)

  try {
    const response = await sendData(jsonData, script)
    const finishedResponse = await response.json()

    const { status, errortext, html } = finishedResponse
    if (status === 'ok') {
      wrapper.insertAdjacentHTML('beforeend', html)
      valueInput.value = ''
      calcFetchAmount(wrapper.children)
      showInfoModal(errortext)
    }
  } catch (err) {
    showInfoModal('Во время выполнения запроса произошла ошибка')
    console.error(err)
  }
}
const handleRemoveFetchElement = async (e) => {
  const currentElement = e.currentTarget.closest('li')
  const fetchListAnchor = e.currentTarget.dataset.fetchRemove
  const data = {
    id: e.currentTarget.dataset.id,
  }
  const jsonData = JSON.stringify(data)

  try {
    const response = await sendData(jsonData, e.currentTarget.dataset.script)
    const finishedResponse = await response.json()

    const { status, errortext } = finishedResponse
    if (status === 'ok') {
      currentElement.remove()
      const wrapperList = document.querySelector(
        `[data-fetch-list="${fetchListAnchor}"]`,
      )
      calcFetchAmount(wrapperList.children)
      showInfoModal(errortext)
    }
  } catch (err) {
    showInfoModal('Во время выполнения запроса произошла ошибка')
    console.error(err)
  }
}
const initFetchRemove = (list) => {
  const removeBtns = list.querySelectorAll('[data-fetch-remove]')
  if (removeBtns) {
    removeBtns.forEach((btn) => {
      btn.addEventListener('click', handleRemoveFetchElement)
    })
  }
}

const fetchListsWrappers = document.querySelectorAll('.fetch-list')

if (fetchListsWrappers) {
  fetchListsWrappers.forEach((fetchList) => {
    initFetchRemove(fetchList)

    const listInfo = fetchList.dataset.fetchList
    const addBtn = document.querySelector(
      `button[data-fetch-add="${listInfo}"]`,
    )
    const dataInput = document.querySelector(`[data-fetch-input="${listInfo}"]`)

    const listsOptions = {
      script: addBtn.dataset.script,
      add: addBtn.dataset.add,
      valueInput: dataInput,
      wrapper: fetchList,
    }

    addBtn?.addEventListener('click', () =>
      handleFetchListsSubmit(listsOptions).then(() =>
        initFetchRemove(fetchList),
      ),
    )
  })
}
