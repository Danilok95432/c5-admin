const createTariffPage = document.querySelector('.create-tariff-page')

if (createTariffPage) {
  const priceTypeWrappers = createTariffPage.querySelectorAll('.price-type')

  priceTypeWrappers.forEach(priceTypeEl => {
    const priceTypeSelect = priceTypeEl.querySelector('.price-type__select')
    priceTypeSelect.addEventListener('click', (e) => {
      priceTypeEl.dataset.priceType = e.currentTarget.value
    })
  })
}