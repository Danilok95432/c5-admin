const addMenuBtn = document.querySelector(".add-menu-btn")
const deleteMenuBtn = document.querySelectorAll(".delete-menu-btn")
const restaurantMenu = document.querySelector(".restaurant-menu-block")
const deleteBtnExample = document.getElementById("delete-menu-btn-2")

let blockCounter = 2

if(deleteBtnExample){
  deleteBtnExample.addEventListener("click", () => {
    const menuBlock = document.getElementById(`menu-2`)
    menuBlock.remove()
    blockCounter -= 1
    updateMenuHeaders()
  })
}

if(addMenuBtn){
  addMenuBtn.addEventListener("click", () => {
    const newMenu = document.createElement('div')
    newMenu.id = `menu-${blockCounter}`;
    newMenu.innerHTML = `
                  <h4 class="menu-title">Меню ${blockCounter}</h4>
                    <div class="set-menu-block" id="set-menu-block-${blockCounter}">
                      <div class="input-column-wrapper menu-column">
                        <label>Название меню</label>
                        <input
                          class="main-input manage-restaurant-input__menu"
                          type="text"
                          value="Основное"
                          name="title_menu[${blockCounter}]"
                          required
                        />
                      </div>
                      <div class="input-column-wrapper">
                        <label>Документ меню</label>
                        <div class="file-upload">
                          <div class="file-upload__info">
                            <button
                              class="file-upload__delete-btn"
                              type="button"
                              data-script="./data/test.txt"
                              data-remove-id=""
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#A5AFBB" />
                                <path
                                  d="M7.5318 8.33864C7.16028 8.71189 6.71447 9.15978 6.34296 9.53303C5.82283 10.0556 5.37701 10.5035 4.85688 11.026C4.55967 11.3247 4.18809 11.3247 3.96518 11.026C3.74227 10.8021 3.74227 10.3542 3.96518 10.1303C4.78252 9.30912 5.5999 8.48792 6.41724 7.66677C6.49155 7.59212 6.49151 7.59215 6.56581 7.5175C6.49151 7.44285 6.49155 7.4428 6.41724 7.36815C5.5999 6.54699 4.78252 5.72588 3.96518 4.90473C3.59366 4.53147 3.74232 4.0089 4.11384 3.8596C4.33675 3.78495 4.63397 3.78491 4.85688 4.00886C5.67422 4.83002 6.49151 5.65122 7.30885 6.47237C7.38315 6.54702 7.38321 6.54699 7.45751 6.62164C7.53182 6.54699 7.53178 6.54702 7.60608 6.47237C8.42343 5.65122 9.24078 4.83004 10.1324 3.93423C10.5039 3.63563 11.0241 3.71033 11.1727 4.08359C11.247 4.38219 11.247 4.60614 11.024 4.83009C10.2067 5.65125 9.38941 6.47235 8.57207 7.29351C8.49777 7.36816 8.49771 7.36822 8.42341 7.44287C8.49771 7.51752 8.49777 7.51748 8.57207 7.59213C9.38941 8.41329 10.2067 9.23449 11.024 10.0556C11.247 10.2796 11.3213 10.5782 11.1727 10.8022C11.0241 11.0261 10.8012 11.1753 10.5039 11.1007C10.3553 11.026 10.2067 10.9514 10.1324 10.8768C9.31509 10.0556 8.49771 9.23443 7.68037 8.41327C7.60607 8.48792 7.5318 8.41329 7.5318 8.33864Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                            <a href="#" download="" class="file-upload__name"></a>
                          </div>
                          <label
                            class="main-btn file-upload__add-label _blue-outlined load-btn"
                          >
                            <input
                              type="file"
                              class="file-upload__add main-input"
                              name="scan_menu[${blockCounter}]"
                              data-script="./data/test.txt"
                            />
                            Загрузить pdf-файл
                          </label>
                        </div>
                      </div>
                      <div class="input-column-wrapper">
                        <label>Фото меню</label>
                        <div class="file-upload">
                          <div class="file-upload__info">
                            <button
                              class="file-upload__delete-btn"
                              type="button"
                              data-script="./data/test.txt"
                              data-remove-id=""
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#A5AFBB" />
                                <path
                                  d="M7.5318 8.33864C7.16028 8.71189 6.71447 9.15978 6.34296 9.53303C5.82283 10.0556 5.37701 10.5035 4.85688 11.026C4.55967 11.3247 4.18809 11.3247 3.96518 11.026C3.74227 10.8021 3.74227 10.3542 3.96518 10.1303C4.78252 9.30912 5.5999 8.48792 6.41724 7.66677C6.49155 7.59212 6.49151 7.59215 6.56581 7.5175C6.49151 7.44285 6.49155 7.4428 6.41724 7.36815C5.5999 6.54699 4.78252 5.72588 3.96518 4.90473C3.59366 4.53147 3.74232 4.0089 4.11384 3.8596C4.33675 3.78495 4.63397 3.78491 4.85688 4.00886C5.67422 4.83002 6.49151 5.65122 7.30885 6.47237C7.38315 6.54702 7.38321 6.54699 7.45751 6.62164C7.53182 6.54699 7.53178 6.54702 7.60608 6.47237C8.42343 5.65122 9.24078 4.83004 10.1324 3.93423C10.5039 3.63563 11.0241 3.71033 11.1727 4.08359C11.247 4.38219 11.247 4.60614 11.024 4.83009C10.2067 5.65125 9.38941 6.47235 8.57207 7.29351C8.49777 7.36816 8.49771 7.36822 8.42341 7.44287C8.49771 7.51752 8.49777 7.51748 8.57207 7.59213C9.38941 8.41329 10.2067 9.23449 11.024 10.0556C11.247 10.2796 11.3213 10.5782 11.1727 10.8022C11.0241 11.0261 10.8012 11.1753 10.5039 11.1007C10.3553 11.026 10.2067 10.9514 10.1324 10.8768C9.31509 10.0556 8.49771 9.23443 7.68037 8.41327C7.60607 8.48792 7.5318 8.41329 7.5318 8.33864Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                            <a href="#" download="" class="file-upload__name"></a>
                          </div>
                          <label
                            class="main-btn file-upload__add-label _blue-outlined load-btn"
                          >
                            <input
                              type="file"
                              class="file-upload__add main-input"
                              name="scan_menu[${blockCounter}]"
                              data-script="./data/test.txt"
                            />
                            Загрузить фото
                          </label>
                        </div>
                      </div>
                    </div>
                `
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-menu-btn'
    deleteBtn.id = `delete-menu-btn-${blockCounter}`
    deleteBtn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="10" fill="#FF6716"/>
                          <path d="M10.0424 11.1182C9.54704 11.6159 8.95263 12.213 8.45727 12.7107C7.76377 13.4075 7.16934 14.0047 6.47584 14.7014C6.07955 15.0995 5.58412 15.0995 5.28691 14.7014C4.98969 14.4028 4.98969 13.8056 5.28691 13.507C6.3767 12.4122 7.46653 11.3172 8.55632 10.2224C8.65539 10.1228 8.65535 10.1229 8.75442 10.0233C8.65535 9.9238 8.65539 9.92373 8.55632 9.82419C7.46653 8.72932 6.3767 7.63451 5.28691 6.53964C4.79155 6.04196 4.98977 5.3452 5.48512 5.14613C5.78234 5.0466 6.17863 5.04655 6.47584 5.34515C7.56563 6.44003 8.65535 7.53495 9.74513 8.62983C9.84421 8.72937 9.84428 8.72932 9.94335 8.82885C10.0424 8.72932 10.0424 8.72937 10.1414 8.62983C11.2312 7.53495 12.321 6.44005 13.5099 5.24564C14.0053 4.8475 14.6988 4.94711 14.8969 5.44478C14.996 5.84292 14.9959 6.14152 14.6987 6.44013C13.6089 7.535 12.5192 8.62981 11.4294 9.72468C11.3304 9.82422 11.3303 9.82429 11.2312 9.92383C11.3303 10.0234 11.3304 10.0233 11.4294 10.1228C12.5192 11.2177 13.6089 12.3126 14.6987 13.4075C14.9959 13.7061 15.0951 14.1043 14.8969 14.4029C14.6988 14.7015 14.4016 14.9004 14.0053 14.8009C13.8071 14.7014 13.609 14.6019 13.5099 14.5024C12.4201 13.4075 11.3303 12.3126 10.2405 11.2177C10.1414 11.3172 10.0424 11.2177 10.0424 11.1182Z" fill="white"/>
                        </svg>`
    deleteBtn.addEventListener("click", () => {
      const menuId = deleteBtn.id.replace("delete-menu-btn-", "")
      const menuBlock = document.getElementById(`menu-${menuId}`)
      menuBlock.remove()
      blockCounter -= 1
      updateMenuHeaders()
    })
    const newSetMenuBlock = newMenu.querySelector(`.set-menu-block`)
    newSetMenuBlock.append(deleteBtn)
    blockCounter += 1
    restaurantMenu.append(newMenu)
  })
}

function updateMenuHeaders() {
  const menuHeaders = document.querySelectorAll(".menu-title")
  menuHeaders.forEach((header, index) => {
    header.textContent = `Меню ${index + 1}`
  })
}

