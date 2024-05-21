const gridContainers = document.querySelectorAll('.checkboxes-container')

let GRID_COLUMNS_COUNT = 4

if (window.matchMedia('(max-width: 1120px)').matches) {
  GRID_COLUMNS_COUNT = 3
}

if (window.matchMedia('(max-width: 850px)').matches) {
  GRID_COLUMNS_COUNT = 2
}

if (window.matchMedia('(max-width: 850px)').matches) {
  GRID_COLUMNS_COUNT = 1
}

if (gridContainers) {
  gridContainers.forEach((item) => {
    const itemChildrenCount = item.children.length
    const gridRowsCount = Math.ceil(itemChildrenCount / GRID_COLUMNS_COUNT)

    item.style.setProperty(
      'grid-template-rows',
      'repeat(' + gridRowsCount + ', 1fr)',
    )
  })
}
