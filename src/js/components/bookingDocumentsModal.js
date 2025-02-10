import { initAllDates } from './customDate'
import { initAllMasks } from './inputMask'
import { initFileUploading } from './fileUpload'

window.addEventListener('DOMContentLoaded', () => {
  const bookingDocumentModal = document.querySelector('.booking-document-modal')

  if (bookingDocumentModal) {
    const switchButtons = bookingDocumentModal.querySelectorAll('.switch-btn')
    const submitButton = bookingDocumentModal.querySelector('.main-btn')
    const formContainer = bookingDocumentModal.querySelector(
      '.form-container-template',
    )

    const createDocumentTmpl =
      bookingDocumentModal.querySelector('#create-document')?.content
    const uploadDocumentTmpl =
      bookingDocumentModal.querySelector('#upload-document')?.content

    for (let i = 0; i < switchButtons.length; i++) {
      switchButtons[i].addEventListener('click', () => {
        switchButtons.forEach((button) => {
          button.classList.remove('_active')
        })

        switchButtons[i].classList.add('_active')

        if (switchButtons[i].classList.contains('create-document-btn')) {
          formContainer.innerHTML = ''
          formContainer.append(createDocumentTmpl.cloneNode(true))
          submitButton.textContent = 'Создать документ'
          submitButton.setAttribute('form', createDocumentTmpl.childNodes[1].id)
        } else if (switchButtons[i].classList.contains('upload-document-btn')) {
          formContainer.innerHTML = ''
          formContainer.append(uploadDocumentTmpl.cloneNode(true))
          submitButton.textContent = 'Загрузить документ'
          submitButton.setAttribute('form', uploadDocumentTmpl.childNodes[1].id)
        }

        initAllDates()
        initAllMasks()
        initFileUploading()
        updateSelect()
      })
    }

    const updateSelect = () => {
      const selectDocument = bookingDocumentModal.querySelector(
        '.type-document-select',
      )
      const numberDocument = bookingDocumentModal.querySelector(
        '.number-document-mask',
      )
      if (selectDocument) {
        selectDocument.addEventListener('change', () => {
          switch (selectDocument.value) {
            case '0': {
              numberDocument.className =
                'main-input number-document-mask _contract'
              numberDocument.setAttribute('value', 'ДОГ-######')
              break
            }
            case '1': {
              numberDocument.className = 'main-input number-document-mask _act'
              numberDocument.setAttribute('value', 'АКТ-######')
              break
            }
            case '2': {
              numberDocument.className = 'main-input number-document-mask _bill'
              numberDocument.setAttribute('value', 'СЧТ-######')
              break
            }
            case '3': {
              numberDocument.className = 'main-input number-document-mask _live'
              numberDocument.setAttribute('value', 'СПР-######')
              break
            }
            default:
              break
          }
          initAllMasks()
        })
      }
    }
    updateSelect()
  }
})
