import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

const sortedPhotos = document.querySelectorAll('.sorted-photos')

if (sortedPhotos) {
  sortedPhotos.forEach(el => {
    const sortable = new Sortable(el)
  })
}
