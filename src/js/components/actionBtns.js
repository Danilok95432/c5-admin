const actionBtns = document.querySelectorAll('button[data-action]')

if (actionBtns) {
  actionBtns.forEach((btn) => {
    const actionScript = btn.dataset.action
    const actionForm = btn.closest('form')
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      if (actionForm.checkValidity()) {
        actionForm.action = actionScript
        actionForm.submit()
      } else {
        const invalidElements = actionForm.querySelectorAll(':invalid')
        invalidElements[0].reportValidity()
      }
    })
  })
}
