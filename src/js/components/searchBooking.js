const searchBookingInput = document.querySelector('.booking-search-input')
const searchBookingBtn = document.querySelector('.booking-search-btn')
const searchBookingAmount = document.querySelector(
  '.booking-search-info__count',
)
if (searchBookingBtn && searchBookingInput) {
  searchBookingBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let searchedAmount = 0
    if (searchBookingInput.value.length < 2) {
      searchedAmount = 0
      searchBookingAmount.textContent = String(searchedAmount)
      return
    }
    const bookingTracks = document.querySelectorAll('.booking-track')
    bookingTracks?.forEach((track) => {
      if (track.title.toLowerCase().includes(searchBookingInput.value)) {
        searchedAmount++
        track.classList.add('_searched')
      } else {
        track.classList.remove('_searched')
      }
    })
    searchBookingAmount.textContent = String(searchedAmount)
  })
}
