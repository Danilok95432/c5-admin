const autoSubmitForms = document.querySelectorAll('form.auto-submit-form')

if (autoSubmitForms?.length) {
  autoSubmitForms.forEach((formEl) => {
    const formTriggers = formEl.querySelectorAll('.auto-submit-form__trigger')
    formTriggers.forEach((trigger) =>
      trigger.addEventListener('input', () => formEl.submit()),
    )
  })
}
