import { modalOverlay } from '../_vars'

export const manageModal = () => {
  const openModalBtns = document.querySelectorAll('button[data-open-modal]')
  const closeModalBtns = document.querySelectorAll('button[data-close-modal]')

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      e.preventDefault()
      e.currentTarget.classList.remove('_active')
      const activeModal = e.currentTarget
        .closest('.site-container')
        .querySelector('.modal._active')
      if (activeModal) {
        activeModal.classList.remove('_active')
      }
    })
  }

  if (closeModalBtns) {
    closeModalBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const targetModal = e.currentTarget.closest('.modal')
        if (targetModal) {
          targetModal.classList.remove('_active')
          modalOverlay.classList.remove('_active')
        }
      })
    })
  }

  if (openModalBtns) {
    openModalBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const targetModal = document.querySelector(
          `#${e.currentTarget.dataset.openModal}`,
        )
        targetModal.classList.add('_active')
        modalOverlay.classList.add('_active')
      })
    })
  }
}

manageModal()
