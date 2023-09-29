import Sortable from 'sortablejs/modular/sortable.complete.esm.js'

const initSortable = () => {
  const sortedPhotos = document.querySelectorAll('.sorted-photos')

  if (sortedPhotos) {
    sortedPhotos.forEach((el) => {
      const sortable = new Sortable(el)
    })
  }
}

initSortable()
