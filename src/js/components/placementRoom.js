const checkBtn = document.querySelectorAll('.check-into-btn')
const changeStatus = document.querySelector(".placements-page")
let stat = ''
if(changeStatus && changeStatus.classList.contains('placement-live') || changeStatus.classList.contains('placement-out'))
{
  stat = 'Высел'
}
else stat = 'Засел'

if(checkBtn){
  checkBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      if(e.target.className == "check-into-btn"){
        e.target.classList.add("check-into-btn__active")
        e.target.innerHTML = `<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.3168 0.460824C12.2835 0.366516 12.2253 0.289355 12.1588 0.220767C12.0922 0.152179 12.0091 0.0921648 11.9259 0.0578709C11.7513 -0.0192903 11.5433 -0.0192903 11.3687 0.0578709C11.2772 0.0921648 11.2024 0.152179 11.1358 0.220767L4.36618 7.191L1.24748 3.96737C0.973034 3.68445 0.490675 3.68445 0.21623 3.96737C0.0748488 4.11312 0 4.30174 0 4.49893C0 4.69612 0.0748488 4.88473 0.21623 5.03048L3.85055 8.77709C3.91709 8.84568 4.00025 8.90569 4.09173 8.93999C4.18322 8.97428 4.2747 9 4.36618 9C4.45766 9 4.55746 8.98285 4.64062 8.93999C4.73211 8.90569 4.80696 8.84568 4.87349 8.77709L12.1588 1.2753C12.2253 1.20672 12.2835 1.12098 12.3168 1.03525C12.3501 0.940938 12.375 0.84663 12.375 0.752322C12.375 0.658014 12.3584 0.555132 12.3168 0.469397V0.460824Z" fill="#006641"/>
                    </svg> ${stat}ен`
      }
      else{
        e.target.classList.remove("check-into-btn__active")
        e.target.innerHTML = `${stat}ить`
      }
    })
  })
}