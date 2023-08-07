const mainTables = document.querySelectorAll('.main-table')

if (mainTables) {
  mainTables.forEach(table => {
    const paginationRowForm = table.querySelector('.main-table__pagination-row form')
    const submitSelect = table.querySelector('.main-table__pagination-row select.main-input')
    if (submitSelect) {
      submitSelect.addEventListener('input', () => {
        paginationRowForm.submit()
      })
    }
  })
}
