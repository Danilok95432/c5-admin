const customModals = document.querySelectorAll('.custom-modal')

if (customModals) {
  const customModalBtns = document.querySelectorAll('button[data-custom-modal]')

  if (customModalBtns) {
    customModalBtns.forEach((modalBtn) => {
      modalBtn.addEventListener('click', (e) => {
        const targetModal = e.currentTarget.dataset.customModal
        const targetModalNode = document.querySelector(`#${targetModal}`)
        targetModalNode.classList.add('_active')
      })
    })
  }

  customModals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === e.currentTarget || e.target.dataset.customClose) {
        modal.classList.remove('_active')
      }
    })
  })
}
