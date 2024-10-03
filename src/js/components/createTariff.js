const createTariffPage = document.querySelector('.create-tariff-page')

if (createTariffPage) {
  const priceTypeWrappers = createTariffPage.querySelectorAll('.price-type')

  priceTypeWrappers.forEach((priceTypeEl) => {
    const priceTypeSelect = priceTypeEl.querySelector('.price-type__select')
    priceTypeSelect.addEventListener('click', (e) => {
      priceTypeEl.dataset.priceType = e.currentTarget.value
    })
  })

  //логика блокировки инпутов предоплаты

  const prepaymentInput = createTariffPage.querySelector('.prepayment-input')
  const costFirstDayCheckboxWrapper = createTariffPage.querySelector(
    '.first-day-checkbox',
  )
  const costFirstDayCheckbox = createTariffPage.querySelector(
    '.first-day-checkbox input',
  )

  prepaymentInput.addEventListener('input', (e) => {
    if (e.currentTarget.value) {
      costFirstDayCheckboxWrapper.classList.add('_disabled')
      costFirstDayCheckbox.checked = false
    } else {
      costFirstDayCheckboxWrapper.classList.remove('_disabled')
    }
  })
  costFirstDayCheckbox.addEventListener('input', (e) => {
    if (e.currentTarget.checked) {
      prepaymentInput.value = ''
      prepaymentInput.classList.add('_disabled')
    } else {
      prepaymentInput.classList.remove('_disabled')
    }
  })
}
