import Inputmask from 'inputmask'
import AirDatepicker from 'air-datepicker'
import { initAllDates } from './customDate';
import { initAllMasks } from './inputMask';
import { initFileUploading } from './fileUpload';


const bookingDocumentModal = document.querySelector('.booking-document-modal')

if(bookingDocumentModal) {
  const createBtn = bookingDocumentModal.querySelector('.create-document-btn');
  const uploadBtn = bookingDocumentModal.querySelector('.upload-document-btn');
  const formContainer = bookingDocumentModal.querySelector('.form-container-template');

  const createDocumentTmpl = bookingDocumentModal.querySelector('#create-document',)?.content
  const uploadDocumentTmpl = bookingDocumentModal.querySelector('#upload-document')?.content
  
  createBtn.addEventListener('click', () => {
    formContainer.innerHTML = '';
    createBtn.classList.add('_active')
    uploadBtn.classList.remove('_active')
    formContainer.append(createDocumentTmpl.cloneNode(true));
    initAllDates()
    initAllMasks()
    initFileUploading()
    updateDate()
    updateSelect()
  });

  uploadBtn.addEventListener('click', () => {
    formContainer.innerHTML = '';
    createBtn.classList.remove('_active')
    uploadBtn.classList.add('_active')
    formContainer.append(uploadDocumentTmpl.cloneNode(true));
    initAllDates()
    initAllMasks()
    initFileUploading()
    updateDate()
  });

  function updateSelect() {
    const selectDocument = bookingDocumentModal.querySelector('.type-document-select')
    const numberDocument = bookingDocumentModal.querySelector('.number-document-mask')
    selectDocument.addEventListener('change', () => {
      if(selectDocument.value == 0){
        numberDocument.className = 'main-input number-document-mask _contract'
        numberDocument.setAttribute('value', "ДОГ -######")
      }
      if(selectDocument.value == 1){
        numberDocument.className = 'main-input number-document-mask _act'
        numberDocument.setAttribute('value', "АКТ -######")
      }
      if(selectDocument.value == 2){
        numberDocument.className = 'main-input number-document-mask _bill'
        numberDocument.setAttribute('value', "СЧТ -######")
      }
      if(selectDocument.value == 3){
        numberDocument.className = 'main-input number-document-mask _live'
        numberDocument.setAttribute('value', "СПР -######")
      }
      initAllMasks()
    })
  }

  function updateDate() {
    const setStartDate = (input) => {
      const inputValue = input.value
  
      return inputValue ? new Date(inputValue) : new Date()
    }
  
    const checkDateInput = bookingDocumentModal.querySelector('.date-document')
    const checkDateDatepicker = new AirDatepicker(checkDateInput, {
      selectedDates: [setStartDate(checkDateInput)],
      minDate: new Date(),
    })
  }
  updateDate()
  updateSelect()
}

