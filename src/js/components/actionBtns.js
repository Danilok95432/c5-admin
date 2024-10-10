const actionBtns = document.querySelectorAll('button[data-action]')

if (actionBtns) {
  actionBtns.forEach((btn) => {
    const actionScript = btn.dataset.action
    const actionForm = btn.closest('form')
    const textEditors = actionForm?.querySelectorAll('.text-editor__wrapper')
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      if (actionForm.checkValidity()) {
        if (textEditors?.length) {
          textEditors.forEach((editorElWrapper) => {
            const editorInput = editorElWrapper.querySelector('input')
            const editorContent = editorElWrapper.querySelector('.ql-editor')
            editorInput.value = editorContent.innerHTML
          })
        }
        actionForm.action = actionScript
        actionForm.submit()
      } else {
        const invalidElements = actionForm.querySelectorAll(':invalid')
        invalidElements[0].reportValidity()
      }
    })
  })
}
