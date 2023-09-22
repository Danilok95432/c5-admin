import {
  limitationChangeableElements,
  updateChangeableListId,
} from '../_functions'
import { initChangeSelects } from './changeRoomType'
import { initGenerateSelect } from './generateSelect'
import { initContextSelects } from './contextSelect'

const changeableLists = document.querySelectorAll('ul[data-list="changeable"]')

if (changeableLists) {
  // Удаление элементов в изменяемых списках
  changeableLists.forEach((list) => {
    list.addEventListener('click', (e) => {
      if (e.target.dataset.btn === 'delete') {
        e.target.closest('li').remove()
        const addBtn = list.parentElement.querySelector(
          'button[data-btn="add"]',
        )
        updateChangeableListId(list)
        limitationChangeableElements(list, addBtn)
      }
    })
  })
}

// Добавление элементов в изменяемых списках

const addToListBtns = document.querySelectorAll('button[data-btn="add"]')

if (addToListBtns) {
  addToListBtns.forEach((addBtn) => {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const templateId = e.currentTarget.dataset.template
      let templateFragment = document.querySelector(`#${templateId}`)?.content
      let templateElement = templateFragment.firstElementChild.cloneNode(true)
      const targetChangeableList = e.currentTarget.parentElement.querySelector(
        'ul[data-list="changeable"]',
      )
      targetChangeableList.appendChild(templateElement)
      limitationChangeableElements(targetChangeableList, addBtn)
      initContextSelects(templateElement)
      updateChangeableListId(targetChangeableList)
      initChangeSelects([templateElement])
      initGenerateSelect()
    })
  })
}
