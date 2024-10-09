import Quill from 'quill'

const options = {
  modules: {
    toolbar: [['bold', 'italic'], ['link']],
  },
  theme: 'snow',
}

const textEditors = document.querySelectorAll('.text-editor__wrapper')

if (textEditors?.length) {
  textEditors.forEach((editorElWrapper) => {
    const editorItem = editorElWrapper.querySelector('.text-editor')
    const editorInput = editorElWrapper.querySelector('input')

    const quill = new Quill(editorItem, options)

    const editorForm = editorElWrapper.closest('form')
    editorForm.addEventListener('submit', () => {
      editorInput.value = quill.root.innerHTML
    })
  })
}
