import Inputmask from 'inputmask'
import AirDatepicker from 'air-datepicker'

const fastBookingModal = document.querySelector('.fast-booking-modal')

if (fastBookingModal) {
  //переключение типа клиента

  const clientSelect = fastBookingModal.querySelector(
    '.client-section__type-client-select select',
  )
  const typeClientContent = fastBookingModal.querySelector(
    '.client-section__type-client',
  )

  const individualTypeTmpl = document.querySelector('#type-individual')?.content
  const orgTypeTmpl = document.querySelector('#type-org')?.content
  const individualTypeClone = individualTypeTmpl
    .querySelector('.fast-booking-modal__individual-content')
    .cloneNode(true)

  const orgTypeClone = orgTypeTmpl
    .querySelector('.fast-booking-modal__org-content')
    .cloneNode(true)

  Inputmask({
    alias: 'numeric',
    allowMinus: false,
    showMaskOnHover: false,
    showMaskOnFocus: false,
    shortcuts: null,
  }).mask([
    individualTypeClone.querySelector('.number-mask'),
    orgTypeClone.querySelector('.number-mask'),
  ])

  Inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: false,
    shortcuts: null,
  }).mask([
    individualTypeClone.querySelector('.phone-mask'),
    orgTypeClone.querySelector('.phone-mask'),
  ])

  clientSelect.addEventListener('input', (e) => {
    typeClientContent.innerHTML = ''
    if (e.currentTarget.value === '0') {
      typeClientContent.append(individualTypeClone)
    } else {
      typeClientContent.append(orgTypeClone)
    }
  })

  // логика связанная с выбором дат заезда и выезда

  const nightCounter = fastBookingModal.querySelector(
    '.dates-section__days-counter span',
  )

  const dateInputs = fastBookingModal.querySelectorAll(
    '.check-in-input, .check-out-input',
  )

  let checkInDate
  let checkOutDate

  dateInputs.forEach((el, _, arr) => {
    el.addEventListener('keydown', (e) => e.preventDefault())
    el.addEventListener('paste', (e) => e.preventDefault())

    const customDate = new AirDatepicker(el, {
      container: '.date-custom-container',
      onSelect: ({ date, _, datepicker }) => {
        // roomsSaveBtn.classList.add('_blocked')
        if (datepicker.$el.classList.contains('check-in-input') && date) {
          checkInDate = date
        }

        if (datepicker.$el.classList.contains('check-out-input') && date) {
          checkOutDate = date
        }

        if (checkInDate && checkOutDate) {
          const diffInMs = checkOutDate - checkInDate
          const daysDifference = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
          nightCounter.textContent = daysDifference < 1 ? '0' : daysDifference
        }
      },
    })

    el.addEventListener('click', (e) => {
      const featuredDate = e.currentTarget.value.split('.').reverse().join('-')
      if (featuredDate) {
        customDate.selectDate(featuredDate)
        customDate.setViewDate(featuredDate)
      }
    })
  })

  // генерация селектов с возрастом детей

  const renderAgeSelects = (ageCount, wrapper) => {
    if (ageCount < 1 || !ageCount) {
      wrapper.innerHTML = ''
      return
    }

    const arrCounterArr = new Array(ageCount).fill('')
    const ageSelectsHtml = arrCounterArr
      .map((el, i) => {
        return `
                <select
                  class="main-input _block-search-input"
                  name="child_age_${i + 1}"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                </select>
      `
      })
      .join('')
    wrapper.innerHTML = `
        <label>Возраст детей<span>*</span></label>
         <div class="child-generate-select__age-select-list">
            ${ageSelectsHtml}  
         </div>
    `
  }

  const childGenerateSelect = fastBookingModal.querySelector(
    '.child-generate-select__input',
  )

  const childAgeSelects = fastBookingModal.querySelector(
    '.child-generate-select__wrapper',
  )

  childGenerateSelect.addEventListener('input', (e) => {
    renderAgeSelects(+e.currentTarget.value, childAgeSelects)
  })
}
