const actionBtns = document.querySelectorAll('button[data-action]')

if (actionBtns) {
  actionBtns.forEach((btn) => {
    const actionScript = btn.dataset.action
    const actionForm = btn.closest('form')
    btn.addEventListener('click', (e) => {
      actionForm.action = actionScript

      if (actionForm.checkValidity()) {
        actionForm.submit()
      } else {
        console.log('форма не прошла валидацию')
      }
    })
  })
}
