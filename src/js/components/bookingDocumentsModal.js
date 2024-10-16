import { initAllDates } from './customDate'
import { initAllMasks } from './inputMask'
import { initFileUploading } from './fileUpload'

const bookingDocumentModal = document.querySelector('.booking-document-modal')

if (bookingDocumentModal) {
  const createBtn = bookingDocumentModal.querySelector('.create-document-btn')
  const uploadBtn = bookingDocumentModal.querySelector('.upload-document-btn')
  const formContainer = bookingDocumentModal.querySelector(
    '.form-container-template',
  )

  const createDocumentTmpl =
    bookingDocumentModal.querySelector('#create-document')?.content
  const uploadDocumentTmpl =
    bookingDocumentModal.querySelector('#upload-document')?.content

  createBtn.addEventListener('click', () => {
    formContainer.innerHTML = ''
    createBtn.classList.add('_active')
    uploadBtn.classList.remove('_active')
    formContainer.append(createDocumentTmpl.cloneNode(true))
    initAllDates()
    initAllMasks()
    initFileUploading()
    updateSelect()
  })

  uploadBtn.addEventListener('click', () => {
    formContainer.innerHTML = ''
    createBtn.classList.remove('_active')
    uploadBtn.classList.add('_active')
    formContainer.append(uploadDocumentTmpl.cloneNode(true))
    initAllDates()
    initAllMasks()
    initFileUploading()
  })

  function updateSelect() {
    const selectDocument = bookingDocumentModal.querySelector(
      '.type-document-select',
    )
    const numberDocument = bookingDocumentModal.querySelector(
      '.number-document-mask',
    )
    selectDocument.addEventListener('change', () => {
      switch (selectDocument.value) {
        case '0': {
          numberDocument.className = 'main-input number-document-mask _contract'
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
  updateSelect()
}
