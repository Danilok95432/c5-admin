import {
  limitationChangeableElements,
  updateChangeableListId
} from '../_functions'
import {initSelects} from "./customSelect"
import {initChildrenSelects} from "./addChildrenSelect";
import {initCounters} from "./guestsModal";

const changeableLists = document.querySelectorAll('ul[data-list="changeable"]')


if (changeableLists) {
  // Удаление элементов в изменяемых списках
  changeableLists.forEach(list => {
    list.addEventListener('click', (e) => {
      if (e.target.dataset.btn === "delete") {
        e.target.closest('li').remove()
        const addBtn = list.parentElement.querySelector('button[data-btn="add"]')
        updateChangeableListId(list)
        limitationChangeableElements(list, addBtn)
      }
    })
  })
}

// Добавление элементов в изменяемых списках


const addToListBtns = document.querySelectorAll('button[data-btn="add"]')

if (addToListBtns) {
  addToListBtns.forEach(addBtn => {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const templateId = e.currentTarget.dataset.template
      let templateFragment = document.querySelector(`#${templateId}`)?.content
      let templateElement = templateFragment.firstElementChild.cloneNode(true)
      const targetChangeableList = e.currentTarget.parentElement.querySelector('ul[data-list="changeable"]')
      targetChangeableList.appendChild(templateElement)
      limitationChangeableElements(targetChangeableList, addBtn)
      updateChangeableListId(targetChangeableList)
      initSelects()

      const childrenSelects = templateElement.querySelectorAll('.children-select.custom-select__main-children select')

      if (childrenSelects) {
        initChildrenSelects(childrenSelects)
      }

      const initialCounters = templateElement.querySelectorAll('.main-counter')
      if (initialCounters) {
        initCounters(initialCounters)
      }
    })
  })
}

