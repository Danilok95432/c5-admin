export const initContextSelects = () => {
  const contextSelectWrappers = document.querySelectorAll(
    '.context-select__wrapper',
  )

  if (contextSelectWrappers) {
    contextSelectWrappers.forEach((wrapper) => {
      const contextSelect = wrapper.querySelector('.context-select')
      const contextElements = wrapper.querySelectorAll('[data-context]')
      contextSelect.addEventListener('input', (e) => {
        contextElements.forEach((el) => {
          if (el.dataset.context === e.target.value) {
            el.classList.add('_active')
          } else {
            el.classList.remove('_active')
          }
        })
      })
    })
  }
}

initContextSelects()
