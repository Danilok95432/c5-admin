const nonRefundableCheckbox = document.querySelector('[name="non-refundable"]')

const conditionBlocks = document.querySelectorAll('.condition-block')

nonRefundableCheckbox?.addEventListener('click', () => {
  if (nonRefundableCheckbox.checked) {
    conditionBlocks.forEach((item) => (item.style.display = 'none'))
  } else {
    conditionBlocks.forEach((item) => (item.style.display = 'flex'))
  }
})
