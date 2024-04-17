export const body = document.querySelector('body')
export const modalOverlay = document.querySelector('.modal-overlay')
export const infoModal = document.querySelector('.info-modal')
export const loader = document.querySelector('.loader')
export const bigImgModal = document.querySelector('.big-img-modal')

export const pointerSvg =
  '<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M13.8418 0.158174C13.892 0.208187 13.9317 0.2676 13.9589 0.33301C13.986 0.39842 14 0.468543 14 0.539361C14 0.610179 13.986 0.680301 13.9589 0.745711C13.9317 0.811121 13.892 0.870534 13.8418 0.920547L7.38104 7.38133C7.33103 7.43147 7.27162 7.47125 7.20621 7.49839C7.1408 7.52553 7.07068 7.5395 6.99986 7.5395C6.92904 7.5395 6.85892 7.52553 6.79351 7.49839C6.7281 7.47125 6.66868 7.43147 6.61867 7.38133L0.157892 0.920547C0.0567951 0.81945 0 0.682333 0 0.539361C0 0.396388 0.0567951 0.259271 0.157892 0.158174C0.258988 0.0570776 0.396106 0.000281888 0.539078 0.000281888C0.682051 0.000281888 0.819167 0.0570776 0.920264 0.158174L6.99986 6.23885L13.0795 0.158174C13.1295 0.108035 13.1889 0.0682552 13.2543 0.041113C13.3197 0.0139708 13.3898 0 13.4606 0C13.5315 0 13.6016 0.0139708 13.667 0.041113C13.7324 0.0682552 13.7918 0.108035 13.8418 0.158174Z" fill="#064AB1"/>\n' +
  '</svg>\n'

export const lockSvg =
  '<svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
  '<path d="M5.46716 11.0979C5.46716 11.008 5.46267 10.918 5.46716 10.828C5.47613 10.5806 5.4537 10.3781 5.25637 10.1667C4.89311 9.78432 4.98281 9.1725 5.39092 8.83061C5.79006 8.49321 6.39549 8.54269 6.73633 8.93857C7.08166 9.33446 7.05475 9.93278 6.66458 10.2882C6.57937 10.3691 6.54349 10.4411 6.54349 10.5581C6.55246 10.927 6.54798 11.3004 6.54798 11.6693C6.54798 11.9977 6.31925 12.2406 6.01878 12.2496C5.71382 12.2541 5.47613 12.0067 5.47164 11.6693C5.46716 11.4803 5.46716 11.2869 5.46716 11.0979Z" fill="#0E8128"/>\n' +
  '<path d="M11.9966 6.92794C11.9966 6.78398 11.9966 6.63552 11.9697 6.49157C11.7948 5.51086 11.0638 4.81807 10.0996 4.6966V4.08028C10.0996 1.83095 8.27432 0 6.03195 0H5.96468C3.72232 0 1.89704 1.83095 1.89704 4.08028V4.6921C1.84771 4.6966 1.80286 4.7056 1.75801 4.7146C0.708586 4.91704 0.00896945 5.78528 0.00448472 6.87845C0 8.77689 0 10.6798 0 12.5783C0 12.7132 0.00448472 12.8482 0.0269083 12.9831C0.224236 14.0673 1.09427 14.7871 2.19751 14.7871C4.71344 14.7871 7.22937 14.7871 9.74979 14.7871C11.0728 14.7871 11.9966 13.8694 11.9966 12.5423C12.0011 10.6708 12.0011 8.79938 11.9966 6.92794ZM3.01822 4.08028C3.01822 2.45177 4.34121 1.12467 5.96468 1.12467H6.03644C7.65991 1.12467 8.9829 2.45177 8.9829 4.08028V4.46267H3.01822V4.08028ZM10.9203 12.5603C10.9203 13.2621 10.4673 13.7074 9.77221 13.7119C8.51201 13.7119 7.24731 13.7119 5.98711 13.7119C4.73587 13.7119 3.48463 13.7119 2.23788 13.7119C1.52032 13.7119 1.07633 13.2665 1.07633 12.5423C1.07633 10.6708 1.07633 8.79488 1.07633 6.92344C1.07633 6.20365 1.52481 5.75379 2.24236 5.75379C4.74932 5.75379 7.25628 5.75379 9.75876 5.75379C10.4673 5.75379 10.9203 6.19915 10.9203 6.90544C10.9248 8.79038 10.9248 10.6753 10.9203 12.5603Z" fill="#0E8128"/>\n' +
  '</svg>\n'

export const SMS_SECONDS_START_VALUE = 30
export const TIME_INTERVAL_MILLISECONDS = 1000

export const newRoom = `<li class="rooms-list__item">
    <input class="room-order-input" type="hidden" name="order_room_id[2]" value="" />
              <h3>
                <span class="changeable-amount">1</span> номер
                бронирования     
              </h3>
              <ul class="guests-list">
                <li>
                  <h5 class="main-section__subtitle">
                    Гость
                    <span class="changeable-amount">1</span>
                    (взрослый)
                  </h5>
                  <div
                    class="edit-booking-page__inputs-row"
                    style="border: none"
                  >
                    <div class="input-column-wrapper">
                      <label>Фамилия клиента</label>
                      <input
                        class="main-input"
                        type="text"
                        placeholder="Фамилия"
                        name="adult_surname[1][1]"
                      />
                    </div>
                    <div class="input-column-wrapper">
                      <label>Имя клиента</label>
                      <input
                        class="main-input"
                        type="text"
                        placeholder="Имя"
                        name="adult_name[1][1]"
                      />
                    </div>
                    <div class="input-column-wrapper">
                      <label>Отчество клиента</label>
                      <input
                        class="main-input"
                        type="text"
                        placeholder="Отчество"
                        name="adult_patronymic[1][1]"
                      />
                    </div>
                    <div class="input-column-wrapper _md">
                      <label>Дата рождения</label>
                      <div class="icon-input">
                        <input
                          class="main-input date-mask"
                          placeholder="дд.мм.гггг"
                          type="text"
                          data-date-start=""
                          autocomplete="off"
                          name="adult_birthday[1][1]"
                        />
                        <svg width="14" height="10" viewBox="0 0 14 10"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 2.5C5.33152 2.5 5.64946 2.3683 5.88388 2.13388C6.1183 1.89946 6.25 1.58152 6.25 1.25C6.25 0.918479 6.1183 0.600537 5.88388 0.366117C5.64946 0.131696 5.33152 0 5 0C4.66848 0 4.35054 0.131696 4.11612 0.366117C3.8817 0.600537 3.75 0.918479 3.75 1.25C3.75 1.58152 3.8817 1.89946 4.11612 2.13388C4.35054 2.3683 4.66848 2.5 5 2.5ZM8.75 2.5C9.08152 2.5 9.39946 2.3683 9.63388 2.13388C9.8683 1.89946 10 1.58152 10 1.25C10 0.918479 9.8683 0.600537 9.63388 0.366117C9.39946 0.131696 9.08152 0 8.75 0C8.41848 0 8.10054 0.131696 7.86612 0.366117C7.6317 0.600537 7.5 0.918479 7.5 1.25C7.5 1.58152 7.6317 1.89946 7.86612 2.13388C8.10054 2.3683 8.41848 2.5 8.75 2.5ZM12.5 2.5C12.8315 2.5 13.1495 2.3683 13.3839 2.13388C13.6183 1.89946 13.75 1.58152 13.75 1.25C13.75 0.918479 13.6183 0.600537 13.3839 0.366117C13.1495 0.131696 12.8315 0 12.5 0C12.1685 0 11.8505 0.131696 11.6161 0.366117C11.3817 0.600537 11.25 0.918479 11.25 1.25C11.25 1.58152 11.3817 1.89946 11.6161 2.13388C11.8505 2.3683 12.1685 2.5 12.5 2.5ZM1.25 6.25C1.58152 6.25 1.89946 6.1183 2.13388 5.88388C2.3683 5.64946 2.5 5.33152 2.5 5C2.5 4.66848 2.3683 4.35054 2.13388 4.11612C1.89946 3.8817 1.58152 3.75 1.25 3.75C0.918479 3.75 0.600537 3.8817 0.366116 4.11612C0.131696 4.35054 0 4.66848 0 5C0 5.33152 0.131696 5.64946 0.366116 5.88388C0.600537 6.1183 0.918479 6.25 1.25 6.25ZM5 6.25C5.33152 6.25 5.64946 6.1183 5.88388 5.88388C6.1183 5.64946 6.25 5.33152 6.25 5C6.25 4.66848 6.1183 4.35054 5.88388 4.11612C5.64946 3.8817 5.33152 3.75 5 3.75C4.66848 3.75 4.35054 3.8817 4.11612 4.11612C3.8817 4.35054 3.75 4.66848 3.75 5C3.75 5.33152 3.8817 5.64946 4.11612 5.88388C4.35054 6.1183 4.66848 6.25 5 6.25ZM8.75 6.25C9.08152 6.25 9.39946 6.1183 9.63388 5.88388C9.8683 5.64946 10 5.33152 10 5C10 4.66848 9.8683 4.35054 9.63388 4.11612C9.39946 3.8817 9.08152 3.75 8.75 3.75C8.41848 3.75 8.10054 3.8817 7.86612 4.11612C7.6317 4.35054 7.5 4.66848 7.5 5C7.5 5.33152 7.6317 5.64946 7.86612 5.88388C8.10054 6.1183 8.41848 6.25 8.75 6.25ZM12.5 6.25C12.8315 6.25 13.1495 6.1183 13.3839 5.88388C13.6183 5.64946 13.75 5.33152 13.75 5C13.75 4.66848 13.6183 4.35054 13.3839 4.11612C13.1495 3.8817 12.8315 3.75 12.5 3.75C12.1685 3.75 11.8505 3.8817 11.6161 4.11612C11.3817 4.35054 11.25 4.66848 11.25 5C11.25 5.33152 11.3817 5.64946 11.6161 5.88388C11.8505 6.1183 12.1685 6.25 12.5 6.25ZM1.25 10C1.58152 10 1.89946 9.8683 2.13388 9.63388C2.3683 9.39946 2.5 9.08152 2.5 8.75C2.5 8.41848 2.3683 8.10054 2.13388 7.86612C1.89946 7.6317 1.58152 7.5 1.25 7.5C0.918479 7.5 0.600537 7.6317 0.366116 7.86612C0.131696 8.10054 0 8.41848 0 8.75C0 9.08152 0.131696 9.39946 0.366116 9.63388C0.600537 9.8683 0.918479 10 1.25 10ZM5 10C5.33152 10 5.64946 9.8683 5.88388 9.63388C6.1183 9.39946 6.25 9.08152 6.25 8.75C6.25 8.41848 6.1183 8.10054 5.88388 7.86612C5.64946 7.6317 5.33152 7.5 5 7.5C4.66848 7.5 4.35054 7.6317 4.11612 7.86612C3.8817 8.10054 3.75 8.41848 3.75 8.75C3.75 9.08152 3.8817 9.39946 4.11612 9.63388C4.35054 9.8683 4.66848 10 5 10ZM8.75 10C9.08152 10 9.39946 9.8683 9.63388 9.63388C9.8683 9.39946 10 9.08152 10 8.75C10 8.41848 9.8683 8.10054 9.63388 7.86612C9.39946 7.6317 9.08152 7.5 8.75 7.5C8.41848 7.5 8.10054 7.6317 7.86612 7.86612C7.6317 8.10054 7.5 8.41848 7.5 8.75C7.5 9.08152 7.6317 9.39946 7.86612 9.63388C8.10054 9.8683 8.41848 10 8.75 10Z"
                            fill="#064AB1" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    class="edit-booking-page__inputs-row"
                    style="border: none"
                  >
                    <div class="input-column-wrapper">
                      <label>Документ</label>
                      <select
                        class="main-input"
                        name="adult_doc[1][1]"
                      >
                        <option value="1">Паспорт</option>
                        <option value="2">Загранпаспорт</option>
                        <option value="3">Военный билет</option>
                        <option value="4">Свидетельство о рождении</option>
                      </select>
                    </div>
                    <div class="input-column-wrapper">
                      <label>Серия и номер</label>
                      <input
                        class="main-input"
                        type="text"
                        placeholder="Серия и номер"
                        name="adult_series[1][1]"
                      />
                    </div>

                    <div class="input-column-wrapper _md">
                      <label>Дата выдачи</label>
                      <div class="icon-input">
                        <input
                          class="main-input date-mask"
                          placeholder="дд.мм.гггг"
                          type="text"
                          data-date-start=""
                          autocomplete="off"
                          name="adult_issue[1][1]"
                        />
                        <svg width="14" height="10" viewBox="0 0 14 10"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 2.5C5.33152 2.5 5.64946 2.3683 5.88388 2.13388C6.1183 1.89946 6.25 1.58152 6.25 1.25C6.25 0.918479 6.1183 0.600537 5.88388 0.366117C5.64946 0.131696 5.33152 0 5 0C4.66848 0 4.35054 0.131696 4.11612 0.366117C3.8817 0.600537 3.75 0.918479 3.75 1.25C3.75 1.58152 3.8817 1.89946 4.11612 2.13388C4.35054 2.3683 4.66848 2.5 5 2.5ZM8.75 2.5C9.08152 2.5 9.39946 2.3683 9.63388 2.13388C9.8683 1.89946 10 1.58152 10 1.25C10 0.918479 9.8683 0.600537 9.63388 0.366117C9.39946 0.131696 9.08152 0 8.75 0C8.41848 0 8.10054 0.131696 7.86612 0.366117C7.6317 0.600537 7.5 0.918479 7.5 1.25C7.5 1.58152 7.6317 1.89946 7.86612 2.13388C8.10054 2.3683 8.41848 2.5 8.75 2.5ZM12.5 2.5C12.8315 2.5 13.1495 2.3683 13.3839 2.13388C13.6183 1.89946 13.75 1.58152 13.75 1.25C13.75 0.918479 13.6183 0.600537 13.3839 0.366117C13.1495 0.131696 12.8315 0 12.5 0C12.1685 0 11.8505 0.131696 11.6161 0.366117C11.3817 0.600537 11.25 0.918479 11.25 1.25C11.25 1.58152 11.3817 1.89946 11.6161 2.13388C11.8505 2.3683 12.1685 2.5 12.5 2.5ZM1.25 6.25C1.58152 6.25 1.89946 6.1183 2.13388 5.88388C2.3683 5.64946 2.5 5.33152 2.5 5C2.5 4.66848 2.3683 4.35054 2.13388 4.11612C1.89946 3.8817 1.58152 3.75 1.25 3.75C0.918479 3.75 0.600537 3.8817 0.366116 4.11612C0.131696 4.35054 0 4.66848 0 5C0 5.33152 0.131696 5.64946 0.366116 5.88388C0.600537 6.1183 0.918479 6.25 1.25 6.25ZM5 6.25C5.33152 6.25 5.64946 6.1183 5.88388 5.88388C6.1183 5.64946 6.25 5.33152 6.25 5C6.25 4.66848 6.1183 4.35054 5.88388 4.11612C5.64946 3.8817 5.33152 3.75 5 3.75C4.66848 3.75 4.35054 3.8817 4.11612 4.11612C3.8817 4.35054 3.75 4.66848 3.75 5C3.75 5.33152 3.8817 5.64946 4.11612 5.88388C4.35054 6.1183 4.66848 6.25 5 6.25ZM8.75 6.25C9.08152 6.25 9.39946 6.1183 9.63388 5.88388C9.8683 5.64946 10 5.33152 10 5C10 4.66848 9.8683 4.35054 9.63388 4.11612C9.39946 3.8817 9.08152 3.75 8.75 3.75C8.41848 3.75 8.10054 3.8817 7.86612 4.11612C7.6317 4.35054 7.5 4.66848 7.5 5C7.5 5.33152 7.6317 5.64946 7.86612 5.88388C8.10054 6.1183 8.41848 6.25 8.75 6.25ZM12.5 6.25C12.8315 6.25 13.1495 6.1183 13.3839 5.88388C13.6183 5.64946 13.75 5.33152 13.75 5C13.75 4.66848 13.6183 4.35054 13.3839 4.11612C13.1495 3.8817 12.8315 3.75 12.5 3.75C12.1685 3.75 11.8505 3.8817 11.6161 4.11612C11.3817 4.35054 11.25 4.66848 11.25 5C11.25 5.33152 11.3817 5.64946 11.6161 5.88388C11.8505 6.1183 12.1685 6.25 12.5 6.25ZM1.25 10C1.58152 10 1.89946 9.8683 2.13388 9.63388C2.3683 9.39946 2.5 9.08152 2.5 8.75C2.5 8.41848 2.3683 8.10054 2.13388 7.86612C1.89946 7.6317 1.58152 7.5 1.25 7.5C0.918479 7.5 0.600537 7.6317 0.366116 7.86612C0.131696 8.10054 0 8.41848 0 8.75C0 9.08152 0.131696 9.39946 0.366116 9.63388C0.600537 9.8683 0.918479 10 1.25 10ZM5 10C5.33152 10 5.64946 9.8683 5.88388 9.63388C6.1183 9.39946 6.25 9.08152 6.25 8.75C6.25 8.41848 6.1183 8.10054 5.88388 7.86612C5.64946 7.6317 5.33152 7.5 5 7.5C4.66848 7.5 4.35054 7.6317 4.11612 7.86612C3.8817 8.10054 3.75 8.41848 3.75 8.75C3.75 9.08152 3.8817 9.39946 4.11612 9.63388C4.35054 9.8683 4.66848 10 5 10ZM8.75 10C9.08152 10 9.39946 9.8683 9.63388 9.63388C9.8683 9.39946 10 9.08152 10 8.75C10 8.41848 9.8683 8.10054 9.63388 7.86612C9.39946 7.6317 9.08152 7.5 8.75 7.5C8.41848 7.5 8.10054 7.6317 7.86612 7.86612C7.6317 8.10054 7.5 8.41848 7.5 8.75C7.5 9.08152 7.6317 9.39946 7.86612 9.63388C8.10054 9.8683 8.41848 10 8.75 10Z"
                            fill="#064AB1" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="input-column-wrapper rooms-list-section__scan-upload">
                    <label>Скан документа</label>
                    <div class="file-upload">
                      <div class="file-upload__info">
                        <button class="file-upload__delete-btn" type="button">
                          <svg width="15" height="15" viewBox="0 0 15 15"
                               fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#A5AFBB" />
                            <path
                              d="M7.5318 8.33864C7.16028 8.71189 6.71447 9.15978 6.34296 9.53303C5.82283 10.0556 5.37701 10.5035 4.85688 11.026C4.55967 11.3247 4.18809 11.3247 3.96518 11.026C3.74227 10.8021 3.74227 10.3542 3.96518 10.1303C4.78252 9.30912 5.5999 8.48792 6.41724 7.66677C6.49155 7.59212 6.49151 7.59215 6.56581 7.5175C6.49151 7.44285 6.49155 7.4428 6.41724 7.36815C5.5999 6.54699 4.78252 5.72588 3.96518 4.90473C3.59366 4.53147 3.74232 4.0089 4.11384 3.8596C4.33675 3.78495 4.63397 3.78491 4.85688 4.00886C5.67422 4.83002 6.49151 5.65122 7.30885 6.47237C7.38315 6.54702 7.38321 6.54699 7.45751 6.62164C7.53182 6.54699 7.53178 6.54702 7.60608 6.47237C8.42343 5.65122 9.24078 4.83004 10.1324 3.93423C10.5039 3.63563 11.0241 3.71033 11.1727 4.08359C11.247 4.38219 11.247 4.60614 11.024 4.83009C10.2067 5.65125 9.38941 6.47235 8.57207 7.29351C8.49777 7.36816 8.49771 7.36822 8.42341 7.44287C8.49771 7.51752 8.49777 7.51748 8.57207 7.59213C9.38941 8.41329 10.2067 9.23449 11.024 10.0556C11.247 10.2796 11.3213 10.5782 11.1727 10.8022C11.0241 11.0261 10.8012 11.1753 10.5039 11.1007C10.3553 11.026 10.2067 10.9514 10.1324 10.8768C9.31509 10.0556 8.49771 9.23443 7.68037 8.41327C7.60607 8.48792 7.5318 8.41329 7.5318 8.33864Z"
                              fill="white" />
                          </svg>
                        </button>
                        <a href="#" download="" class="file-upload__name"></a>
                      </div>

                      <label
                        class="main-btn file-upload__add-label _blue-outlined"
                      >
                        <input type="file" class="file-upload__add main-input"
                               name="adult_scan[1][1]"
                               accept="application/pdf">
                        Загрузить скан
                      </label>
                    </div>
                  </div>
                </li>
              </ul>
  </li>`

export const newAdultGuest = `<li>
    <h5 class="main-section__subtitle">
      Гость
      <span class="changeable-amount">1</span>
      (взрослый)
    </h5>
    <div class="edit-booking-page__inputs-row" style="border: none">
      <div class="input-column-wrapper">
        <label>Фамилия клиента</label>
        <input
          class="main-input changeable-input"
          type="text"
          placeholder="Фамилия"
          name="adult_surname[1][1]"
        />
      </div>
      <div class="input-column-wrapper">
        <label>Имя клиента</label>
        <input
          class="main-input changeable-input"
          type="text"
          placeholder="Имя"
          name="adult_name[1][1]]"
        />
      </div>
      <div class="input-column-wrapper">
        <label>Отчество клиента</label>
        <input
          class="main-input changeable-input"
          type="text"
          placeholder="Отчество"
          name="adult_patronymic[1][1]"
        />
      </div>
      <div class="input-column-wrapper _md">
        <label>Дата рождения</label>
        <div class="icon-input">
          <input
            class="main-input date-mask changeable-input"
            placeholder="дд.мм.гггг"
            type="text"
            data-date-start=""
            autocomplete="off"
            name="adult_birthday[1}][1]"
          />
          <svg
            width="13"
            height="9"
            viewBox="0 0 13 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 2.25C4.79837 2.25 5.08452 2.13147 5.2955 1.92049C5.50647 1.70952 5.625 1.42337 5.625 1.125C5.625 0.826631 5.50647 0.540484 5.2955 0.329505C5.08452 0.118527 4.79837 0 4.5 0C4.20163 0 3.91548 0.118527 3.7045 0.329505C3.49353 0.540484 3.375 0.826631 3.375 1.125C3.375 1.42337 3.49353 1.70952 3.7045 1.92049C3.91548 2.13147 4.20163 2.25 4.5 2.25ZM7.875 2.25C8.17337 2.25 8.45952 2.13147 8.6705 1.92049C8.88147 1.70952 9 1.42337 9 1.125C9 0.826631 8.88147 0.540484 8.6705 0.329505C8.45952 0.118527 8.17337 0 7.875 0C7.57663 0 7.29048 0.118527 7.0795 0.329505C6.86853 0.540484 6.75 0.826631 6.75 1.125C6.75 1.42337 6.86853 1.70952 7.0795 1.92049C7.29048 2.13147 7.57663 2.25 7.875 2.25ZM11.25 2.25C11.5484 2.25 11.8345 2.13147 12.0455 1.92049C12.2565 1.70952 12.375 1.42337 12.375 1.125C12.375 0.826631 12.2565 0.540484 12.0455 0.329505C11.8345 0.118527 11.5484 0 11.25 0C10.9516 0 10.6655 0.118527 10.4545 0.329505C10.2435 0.540484 10.125 0.826631 10.125 1.125C10.125 1.42337 10.2435 1.70952 10.4545 1.92049C10.6655 2.13147 10.9516 2.25 11.25 2.25ZM1.125 5.625C1.42337 5.625 1.70952 5.50647 1.92049 5.2955C2.13147 5.08452 2.25 4.79837 2.25 4.5C2.25 4.20163 2.13147 3.91548 1.92049 3.7045C1.70952 3.49353 1.42337 3.375 1.125 3.375C0.826631 3.375 0.540483 3.49353 0.329505 3.7045C0.118526 3.91548 0 4.20163 0 4.5C0 4.79837 0.118526 5.08452 0.329505 5.2955C0.540483 5.50647 0.826631 5.625 1.125 5.625ZM4.5 5.625C4.79837 5.625 5.08452 5.50647 5.2955 5.2955C5.50647 5.08452 5.625 4.79837 5.625 4.5C5.625 4.20163 5.50647 3.91548 5.2955 3.7045C5.08452 3.49353 4.79837 3.375 4.5 3.375C4.20163 3.375 3.91548 3.49353 3.7045 3.7045C3.49353 3.91548 3.375 4.20163 3.375 4.5C3.375 4.79837 3.49353 5.08452 3.7045 5.2955C3.91548 5.50647 4.20163 5.625 4.5 5.625ZM7.875 5.625C8.17337 5.625 8.45952 5.50647 8.6705 5.2955C8.88147 5.08452 9 4.79837 9 4.5C9 4.20163 8.88147 3.91548 8.6705 3.7045C8.45952 3.49353 8.17337 3.375 7.875 3.375C7.57663 3.375 7.29048 3.49353 7.0795 3.7045C6.86853 3.91548 6.75 4.20163 6.75 4.5C6.75 4.79837 6.86853 5.08452 7.0795 5.2955C7.29048 5.50647 7.57663 5.625 7.875 5.625ZM11.25 5.625C11.5484 5.625 11.8345 5.50647 12.0455 5.2955C12.2565 5.08452 12.375 4.79837 12.375 4.5C12.375 4.20163 12.2565 3.91548 12.0455 3.7045C11.8345 3.49353 11.5484 3.375 11.25 3.375C10.9516 3.375 10.6655 3.49353 10.4545 3.7045C10.2435 3.91548 10.125 4.20163 10.125 4.5C10.125 4.79837 10.2435 5.08452 10.4545 5.2955C10.6655 5.50647 10.9516 5.625 11.25 5.625ZM1.125 9C1.42337 9 1.70952 8.88147 1.92049 8.6705C2.13147 8.45952 2.25 8.17337 2.25 7.875C2.25 7.57663 2.13147 7.29048 1.92049 7.0795C1.70952 6.86853 1.42337 6.75 1.125 6.75C0.826631 6.75 0.540483 6.86853 0.329505 7.0795C0.118526 7.29048 0 7.57663 0 7.875C0 8.17337 0.118526 8.45952 0.329505 8.6705C0.540483 8.88147 0.826631 9 1.125 9ZM4.5 9C4.79837 9 5.08452 8.88147 5.2955 8.6705C5.50647 8.45952 5.625 8.17337 5.625 7.875C5.625 7.57663 5.50647 7.29048 5.2955 7.0795C5.08452 6.86853 4.79837 6.75 4.5 6.75C4.20163 6.75 3.91548 6.86853 3.7045 7.0795C3.49353 7.29048 3.375 7.57663 3.375 7.875C3.375 8.17337 3.49353 8.45952 3.7045 8.6705C3.91548 8.88147 4.20163 9 4.5 9ZM7.875 9C8.17337 9 8.45952 8.88147 8.6705 8.6705C8.88147 8.45952 9 8.17337 9 7.875C9 7.57663 8.88147 7.29048 8.6705 7.0795C8.45952 6.86853 8.17337 6.75 7.875 6.75C7.57663 6.75 7.29048 6.86853 7.0795 7.0795C6.86853 7.29048 6.75 7.57663 6.75 7.875C6.75 8.17337 6.86853 8.45952 7.0795 8.6705C7.29048 8.88147 7.57663 9 7.875 9Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <button class="delete-guest-btn" data-btn="delete" type="button">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.44019 7.50023L14.8059 1.13451C15.0657 0.874712 15.0657 0.454198 14.8059 0.194397C14.5461 -0.0647991 14.1256 -0.0647991 13.8658 0.194397L7.50008 6.56011L1.13497 0.194397C0.875165 -0.0647991 0.454651 -0.0647991 0.19485 0.194397C-0.0643459 0.454198 -0.0643459 0.874712 0.19485 1.13451L6.56056 7.50023L0.19485 13.8653C-0.0649501 14.1251 -0.0649501 14.5457 0.19485 14.8055C0.324751 14.9354 0.494527 15 0.664908 15C0.835289 15 1.00507 14.9354 1.13497 14.8055L7.50068 8.43974L13.8664 14.8055C13.9963 14.9354 14.1661 15 14.3365 15C14.5068 15 14.6766 14.9354 14.8065 14.8055C15.0663 14.5457 15.0663 14.1251 14.8065 13.8653L8.44079 7.49962L8.44019 7.50023Z"
            fill="#920303" />
        </svg>
      </button>
    </div>
  </li>`

export const newChildGuest = `<li>
    <h5 class="main-section__subtitle">
      Гость
      <span class="changeable-amount">1</span>
      (ребенок)
    </h5>
    <div class="edit-booking-page__inputs-row" style="border: none">
      <div class="input-column-wrapper">
        <label>Фамилия клиента</label>
        <input
          class="main-input changeable-input"
          type="text"
          placeholder="Фамилия"
          name="child_surname[1][1]"
        />
      </div>
      <div class="input-column-wrapper">
        <label>Имя клиента</label>
        <input
          class="main-input changeable-input"
          type="text"
          placeholder="Имя"
          name="child_name[1][1]]"
        />
      </div>
      <div class="input-column-wrapper">
        <label>Отчество клиента</label>
        <input
          class="main-input changeable-input"
          type="text"
          placeholder="Отчество"
          name="child_patronymic[1][1]"
        />
      </div>
      <div class="input-column-wrapper _md">
        <label>Дата рождения</label>
        <div class="icon-input">
          <input
            class="main-input date-mask changeable-input"
            placeholder="дд.мм.гггг"
            type="text"
            data-date-start=""
            autocomplete="off"
            name="child_birthday[1][1]"
          />
          <svg
            width="13"
            height="9"
            viewBox="0 0 13 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 2.25C4.79837 2.25 5.08452 2.13147 5.2955 1.92049C5.50647 1.70952 5.625 1.42337 5.625 1.125C5.625 0.826631 5.50647 0.540484 5.2955 0.329505C5.08452 0.118527 4.79837 0 4.5 0C4.20163 0 3.91548 0.118527 3.7045 0.329505C3.49353 0.540484 3.375 0.826631 3.375 1.125C3.375 1.42337 3.49353 1.70952 3.7045 1.92049C3.91548 2.13147 4.20163 2.25 4.5 2.25ZM7.875 2.25C8.17337 2.25 8.45952 2.13147 8.6705 1.92049C8.88147 1.70952 9 1.42337 9 1.125C9 0.826631 8.88147 0.540484 8.6705 0.329505C8.45952 0.118527 8.17337 0 7.875 0C7.57663 0 7.29048 0.118527 7.0795 0.329505C6.86853 0.540484 6.75 0.826631 6.75 1.125C6.75 1.42337 6.86853 1.70952 7.0795 1.92049C7.29048 2.13147 7.57663 2.25 7.875 2.25ZM11.25 2.25C11.5484 2.25 11.8345 2.13147 12.0455 1.92049C12.2565 1.70952 12.375 1.42337 12.375 1.125C12.375 0.826631 12.2565 0.540484 12.0455 0.329505C11.8345 0.118527 11.5484 0 11.25 0C10.9516 0 10.6655 0.118527 10.4545 0.329505C10.2435 0.540484 10.125 0.826631 10.125 1.125C10.125 1.42337 10.2435 1.70952 10.4545 1.92049C10.6655 2.13147 10.9516 2.25 11.25 2.25ZM1.125 5.625C1.42337 5.625 1.70952 5.50647 1.92049 5.2955C2.13147 5.08452 2.25 4.79837 2.25 4.5C2.25 4.20163 2.13147 3.91548 1.92049 3.7045C1.70952 3.49353 1.42337 3.375 1.125 3.375C0.826631 3.375 0.540483 3.49353 0.329505 3.7045C0.118526 3.91548 0 4.20163 0 4.5C0 4.79837 0.118526 5.08452 0.329505 5.2955C0.540483 5.50647 0.826631 5.625 1.125 5.625ZM4.5 5.625C4.79837 5.625 5.08452 5.50647 5.2955 5.2955C5.50647 5.08452 5.625 4.79837 5.625 4.5C5.625 4.20163 5.50647 3.91548 5.2955 3.7045C5.08452 3.49353 4.79837 3.375 4.5 3.375C4.20163 3.375 3.91548 3.49353 3.7045 3.7045C3.49353 3.91548 3.375 4.20163 3.375 4.5C3.375 4.79837 3.49353 5.08452 3.7045 5.2955C3.91548 5.50647 4.20163 5.625 4.5 5.625ZM7.875 5.625C8.17337 5.625 8.45952 5.50647 8.6705 5.2955C8.88147 5.08452 9 4.79837 9 4.5C9 4.20163 8.88147 3.91548 8.6705 3.7045C8.45952 3.49353 8.17337 3.375 7.875 3.375C7.57663 3.375 7.29048 3.49353 7.0795 3.7045C6.86853 3.91548 6.75 4.20163 6.75 4.5C6.75 4.79837 6.86853 5.08452 7.0795 5.2955C7.29048 5.50647 7.57663 5.625 7.875 5.625ZM11.25 5.625C11.5484 5.625 11.8345 5.50647 12.0455 5.2955C12.2565 5.08452 12.375 4.79837 12.375 4.5C12.375 4.20163 12.2565 3.91548 12.0455 3.7045C11.8345 3.49353 11.5484 3.375 11.25 3.375C10.9516 3.375 10.6655 3.49353 10.4545 3.7045C10.2435 3.91548 10.125 4.20163 10.125 4.5C10.125 4.79837 10.2435 5.08452 10.4545 5.2955C10.6655 5.50647 10.9516 5.625 11.25 5.625ZM1.125 9C1.42337 9 1.70952 8.88147 1.92049 8.6705C2.13147 8.45952 2.25 8.17337 2.25 7.875C2.25 7.57663 2.13147 7.29048 1.92049 7.0795C1.70952 6.86853 1.42337 6.75 1.125 6.75C0.826631 6.75 0.540483 6.86853 0.329505 7.0795C0.118526 7.29048 0 7.57663 0 7.875C0 8.17337 0.118526 8.45952 0.329505 8.6705C0.540483 8.88147 0.826631 9 1.125 9ZM4.5 9C4.79837 9 5.08452 8.88147 5.2955 8.6705C5.50647 8.45952 5.625 8.17337 5.625 7.875C5.625 7.57663 5.50647 7.29048 5.2955 7.0795C5.08452 6.86853 4.79837 6.75 4.5 6.75C4.20163 6.75 3.91548 6.86853 3.7045 7.0795C3.49353 7.29048 3.375 7.57663 3.375 7.875C3.375 8.17337 3.49353 8.45952 3.7045 8.6705C3.91548 8.88147 4.20163 9 4.5 9ZM7.875 9C8.17337 9 8.45952 8.88147 8.6705 8.6705C8.88147 8.45952 9 8.17337 9 7.875C9 7.57663 8.88147 7.29048 8.6705 7.0795C8.45952 6.86853 8.17337 6.75 7.875 6.75C7.57663 6.75 7.29048 6.86853 7.0795 7.0795C6.86853 7.29048 6.75 7.57663 6.75 7.875C6.75 8.17337 6.86853 8.45952 7.0795 8.6705C7.29048 8.88147 7.57663 9 7.875 9Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <button class="delete-guest-btn" data-btn="delete" type="button">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.44019 7.50023L14.8059 1.13451C15.0657 0.874712 15.0657 0.454198 14.8059 0.194397C14.5461 -0.0647991 14.1256 -0.0647991 13.8658 0.194397L7.50008 6.56011L1.13497 0.194397C0.875165 -0.0647991 0.454651 -0.0647991 0.19485 0.194397C-0.0643459 0.454198 -0.0643459 0.874712 0.19485 1.13451L6.56056 7.50023L0.19485 13.8653C-0.0649501 14.1251 -0.0649501 14.5457 0.19485 14.8055C0.324751 14.9354 0.494527 15 0.664908 15C0.835289 15 1.00507 14.9354 1.13497 14.8055L7.50068 8.43974L13.8664 14.8055C13.9963 14.9354 14.1661 15 14.3365 15C14.5068 15 14.6766 14.9354 14.8065 14.8055C15.0663 14.5457 15.0663 14.1251 14.8065 13.8653L8.44079 7.49962L8.44019 7.50023Z"
            fill="#920303" />
        </svg>
      </button>
    </div>
  </li>`
