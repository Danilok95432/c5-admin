// загрузка файлов

import { sendData, showInfoModal } from '../_functions'

export const initFileUploading = () => {
  const fileUploads = document.querySelectorAll('.file-upload')
  if (fileUploads) {
    const isDelete = (target) =>
      target.classList.contains('file-upload__delete')
    const handleDeleteFile = async (script, fileId, delElement) => {
      const data = {
        id_file: fileId,
      }
      const jsonData = JSON.stringify(data)
      try {
        const response = await sendData(jsonData, script)
        const finishedResponse = await response.json()
        const { status, errortext } = finishedResponse

        if (status === 'ok') {
          delElement.closest('.file-upload__el').remove()
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        showInfoModal('Во время выполнения запроса произошла ошибка')
        console.error(err)
      }
    }

    fileUploads.forEach((fileUploadEl) => {
      const uploadInput = fileUploadEl.querySelector('.file-upload__add')
      const uploadLabel = fileUploadEl.querySelector('.file-upload__add-label')
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
          }
          if (uploadSize) {
            uploadSize.textContent =
              `${Math.round(fileItem.size / 1000)} КБ` ?? ''
          }
          uploadLabel.classList.add('hidden')
        })

        reader.addEventListener('error', () => {
          showInfoModal(`Произошла ошибка при чтении файла: ${fileItem.name}`)
        })
      })
    })
  }
}

initFileUploading()
