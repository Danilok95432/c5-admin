import { body } from '../_vars'

const mobileSelects = document.querySelectorAll('.mobile-select')

if (mobileSelects?.length) {
  const openedMenu = document.querySelector('.opened-select-menu')

  openedMenu.addEventListener('click', (e) => {
    const currentId = openedMenu.dataset.id
    if (e.target.classList.contains('opened-select-menu__close-btn')) {
      openedMenu.classList.remove('_active')
      body.classList.remove('_lock')
    }
    if (e.target.dataset.value) {
      const currentSelect = document.querySelector(
        `.mobile-select[data-select-id=${currentId}] select`,
      )
      currentSelect.value = e.target.dataset.value
      openedMenu.classList.remove('_active')
      body.classList.remove('_lock')
      if (currentSelect.closest('.auto-submit-form')) {
        const parentForm = currentSelect.closest('.auto-submit-form')
        parentForm.submit()
      }
    }
  })

  const renderMobileSelect = (selectsArr, labelText, openedMenu, selectId) => {
    openedMenu.innerHTML = ''
    const selectElements = selectsArr
      .map(
        ({ text, value, selected }) => `
      <li data-value="${value}" data-selected="${selected}"><p>${text}</p></li>
    `,
      )
      .join('')
    const resultMarkup = `
      <button class="opened-select-menu__close-btn" type="button">
      </button>
      <h6>${labelText}</h6>
      <ul>${selectElements}</ul>
    `
    openedMenu.insertAdjacentHTML('beforeend', resultMarkup)
    openedMenu.dataset.id = selectId
    openedMenu.classList.add('_active')
  }

  mobileSelects.forEach((el) => {
    const selectLabelText = el.querySelector('label').textContent
    const currentSelect = el.querySelector('select')
    const selectId = el.dataset.selectId

    currentSelect.addEventListener('click', (e) => {
      e.preventDefault()
      const selectArr = Array.from(e.currentTarget.options).map((option) => ({
        text: option.text,
        value: option.value,
        selected: option.selected,
      }))
      body.classList.add('_lock')
      renderMobileSelect(selectArr, selectLabelText, openedMenu, selectId)
    })
    currentSelect.addEventListener('mousedown', (e) => e.preventDefault())
  })
}
