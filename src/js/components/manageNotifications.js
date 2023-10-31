const closeNotificationButtons = document.querySelectorAll(
  '.close-notification-button',
)

if (closeNotificationButtons) {
  closeNotificationButtons.forEach((item) => {
    item.addEventListener('click', () => {
      item.closest('.notifications-block__item').style.display = 'none'
    })
  })
}
