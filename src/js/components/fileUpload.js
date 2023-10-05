// загрузка файлов

import { showInfoModal } from '../_functions'

export const initFileUploading = () => {
  const handleDeleteFile = (e) => {
    if (e.target.classList.contains('file-upload__delete-btn')) {
      const currentFileWrapper = e.target.closest('.file-upload')
      const currentInput = currentFileWrapper.querySelector('.file-upload__add')
      currentFileWrapper.classList.remove('_loaded')
      currentInput.value = ''
    }
  }

  const fileUploads = document.querySelectorAll('.file-upload')
  if (fileUploads) {
    fileUploads.forEach((fileUploadEl) => {
      const uploadInput = fileUploadEl.querySelector('.file-upload__add')
      const uploadWrapper = fileUploadEl.querySelector(
        '.file-upload__add-wrapper',
      )
      const uploadName = fileUploadEl.querySelector('.file-upload__name')
      const uploadSize = fileUploadEl.querySelector('.file-upload__size')

      uploadInput.addEventListener('input', (evt) => {
        let targetInput = evt.currentTarget
        let fileItem = targetInput.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(fileItem)

        reader.addEventListener('load', (e) => {
          if (uploadName) {
            uploadName.textContent = fileItem.name ?? ''
            uploadName.href = reader.result
          }
          if (uploadSize) {
            uploadSize.textContent =
              `${Math.round(fileItem.size / 1000)} КБ` ?? ''
          }
          fileUploadEl.classList.add('_loaded')
        })

        reader.addEventListener('error', () => {
          showInfoModal(`Произошла ошибка при чтении файла: ${fileItem.name}`)
        })
      })
      fileUploadEl.addEventListener('click', handleDeleteFile)
    })
  }
}

initFileUploading()
