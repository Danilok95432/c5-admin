const noticeCounter = document.querySelector('.auth-panel__notice-counter')

if (noticeCounter) {
  const currentCount = +noticeCounter.textContent

  if (currentCount < 1) {
    noticeCounter.classList.add('hidden')
  }
}
