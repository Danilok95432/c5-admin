// загрузка файлов

import { sendData, sendDataDefault, showInfoModal } from '../_functions'

export const initFileUploading = () => {
  const handleDeleteFile = async (e) => {
    if (e.target.classList.contains('file-upload__delete-btn')) {
      const currentFileWrapper = e.target.closest('.file-upload')
      const currentInput = currentFileWrapper.querySelector('.file-upload__add')

      if (e.target.dataset.script) {
        const removeId = e.target.dataset.removeId
        const data = {
          removeId,
        }
        const jsonData = JSON.stringify(data)

        try {
          const response = await sendData(jsonData, e.target.dataset.script)
          const finishedResponse = await response.json()

          const { status, errortext } = finishedResponse

          if (status === 'ok') {
            currentFileWrapper.classList.remove('_loaded')
            currentInput.value = ''
          } else {
            showInfoModal(errortext)
          }
        } catch (err) {
          showInfoModal('Во время выполнения запроса произошла ошибка')
          console.error(err)
        }
      } else {
        currentFileWrapper.classList.remove('_loaded')
        currentInput.value = ''
      }
    }
  }

  const fileUploads = document.querySelectorAll('.file-upload')
  if (fileUploads) {
    fileUploads.forEach((fileUploadEl) => {
      const uploadInput = fileUploadEl.querySelector('.file-upload__add')

      const uploadName = fileUploadEl.querySelector('.file-upload__name')
      const uploadSize = fileUploadEl.querySelector('.file-upload__size')

      uploadInput.addEventListener('input', (evt) => {
        let targetInput = evt.currentTarget
        let fileItem = targetInput.files[0]
        let reader = new FileReader()

        const fileScript = targetInput.dataset.script

        reader.readAsDataURL(fileItem)

        reader.addEventListener('load', async (e) => {
          if (fileScript && fileItem) {
            const formData = new FormData()
            formData.append('file', fileItem)

            try {
              const response = await sendDataDefault(formData, fileScript)
              const finishedResponse = await response.json()

              const { status, errortext, removeId } = finishedResponse

              if (status === 'ok') {
                const deleteBtn = fileUploadEl.querySelector(
                  '.file-upload__delete-btn',
                )
                if (deleteBtn) {
                  deleteBtn.dataset.removeId = removeId
                }
                if (uploadName) {
                  uploadName.textContent = fileItem.name ?? ''
                  uploadName.href = reader.result
                }
                if (uploadSize) {
                  uploadSize.textContent =
                    `${Math.round(fileItem.size / 1000)} КБ` ?? ''
                }
                fileUploadEl.classList.add('_loaded')
              } else {
                showInfoModal(errortext)
              }
            } catch (err) {
              showInfoModal('Во время выполнения запроса произошла ошибка')
              console.error(err)
            }
          } else {
            if (uploadName) {
              uploadName.textContent = fileItem.name ?? ''
              uploadName.href = reader.result
            }
            if (uploadSize) {
              uploadSize.textContent =
                `${Math.round(fileItem.size / 1000)} КБ` ?? ''
            }
            fileUploadEl.classList.add('_loaded')
          }
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
