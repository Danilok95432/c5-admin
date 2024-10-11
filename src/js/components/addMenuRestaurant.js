const addMenuBtn = document.querySelector(".add-menu-btn")
const deleteMenuBtn = document.querySelectorAll(".delete-menu-btn")
const restaurantMenu = document.querySelector(".restaurant-menu-block")
let blockCounter = 3

addMenuBtn.addEventListener("click", () => {
  const newMenu = document.createElement('div')
  newMenu.id = `menu-${blockCounter}`;
  newMenu.innerHTML = `
                <h4>Меню ${blockCounter}</h4>
                  <div class="set-menu-block">
                    <div class="input-column-wrapper menu-column">
                      <label>Название меню</label>
                      <input
                        class="main-input manage-restaurant-input__menu"
                        type="text"
                        value="Основное"
                        name="title-menu"
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
                            name="scan[1][1]"
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
                            name="scan[1][1]"
                            data-script="./data/test.txt"
                          />
                          Загрузить фото
                        </label>
                      </div>
                    </div>
              `
  blockCounter += 1
  restaurantMenu.appendChild(newMenu)
})

