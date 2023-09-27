const submitInputs = document.querySelectorAll('.submit-input')

if (submitInputs) {
  submitInputs.forEach((subInput) => {
    const parentForm = subInput.closest('form')
    subInput.addEventListener('input', () => parentForm.submit())
  })
}