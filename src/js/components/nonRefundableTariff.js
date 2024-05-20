const createTariffPage = document.querySelector('.create-tariff-page')

if (createTariffPage) {
  const nonRefundableCheckbox = createTariffPage.querySelector(
    '.non-refundable-checkbox',
  )
  const conditionBlocks = createTariffPage.querySelectorAll('.condition-block')


nonRefundableCheckbox?.addEventListener('click', () => {
  if (nonRefundableCheckbox.checked) {
    conditionBlocks.forEach((item) => (item.style.display = 'none'))
  } else {
    conditionBlocks.forEach((item) => (item.style.display = 'flex'))
  }
})
}

