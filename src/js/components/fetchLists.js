import { sendData, showInfoModal } from '../_functions'

const fetchListsWrappers = document.querySelectorAll('.fetch-list')

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
      wrapper.append(html)
    } else {
      showInfoModal(errortext)
    }
  } catch (err) {
    showInfoModal('Во время выполнения запроса произошла ошибка')
    console.error(err)
  }
}

if (fetchListsWrappers) {
  fetchListsWrappers.forEach((fetchList) => {
    const listInfo = fetchList.dataset.fetchList
    const addBtn = document.querySelector(
      `button[data-fetch-add="${listInfo}"]`,
    )
    const dataInput = document.querySelector(`[data-fetch-input="${listInfo}"]`)

    console.log(dataInput)
    // const listsOptions = {
    //   script: addBtn.dataset.script,
    //   add: addBtn.dataset.add,
    //   valueInput: dataInput,
    //   wrapper: fetchList,
    // }

    addBtn?.addEventListener('click', () =>
      handleFetchListsSubmit(listsOptions),
    )
  })
}
