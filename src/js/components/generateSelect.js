import { initAllDates } from "./customDate";

const formatGenerate = (nameSelect, roomNumber, i) => {
  const nameArr = nameSelect.split("[");
  nameArr[1] = `${roomNumber - 1}]`;
  nameArr[2] = `${i - 1}]`;
  return nameArr.join("[");
};

export const initGenerateSelect = () => {
  const generateSelectWrappers = document.querySelectorAll(".generate-select");

  if (generateSelectWrappers) {
    generateSelectWrappers.forEach((selectWrapper) => {
      const templateId = selectWrapper.dataset.template;
      const templateFragment = document.querySelector(
        `#${templateId}`
      )?.content;
      const templateElement =
        templateFragment.firstElementChild.cloneNode(true);
      const genSelect = selectWrapper.querySelector("select");
      const genList = selectWrapper.parentElement.querySelector(
        ".generate-select__list"
      );
      const currentRoomNumber = genSelect.name.match(/\d/g)?.join("");
      genSelect.addEventListener("input", (e) => {
        genList.innerHTML = "";
        const elCount = e.target.value;
        let fragment = new DocumentFragment();
        for (let i = 1; i <= elCount; i++) {
          let newEl = templateElement.cloneNode(true);
          let newELCounter = newEl.querySelector(".generate-select__count");
          let newELSelect = newEl.querySelector("select");
          if (newELCounter) {
            newELCounter.textContent = i;
          }
          newELSelect.name = formatGenerate(
            newELSelect.name,
            currentRoomNumber,
            i
          );
          fragment.append(newEl);
        }
        genList.append(fragment);
      });
    });
  }
};

if (!document.querySelector(".edit-booking-page")) {
  initGenerateSelect();
}

////////////////////////////

const rommatesBlock = document.querySelector(".roommates");
let guestsUserValues = Array.from(rommatesBlock.dataset.userValues);

const getRoommatesData = () => {
  const guestsList = document.querySelectorAll(
    ".generate-select__list > .template-item"
  );

  if (guestsList) {
    guestsList.forEach((guestsListItem) => {
      const guestsListItemId = guestsListItem
        .querySelector("h4")
        .querySelector(".generate-select__count").innerHTML;

      const guestsItemInputs = guestsListItem.querySelectorAll("input");
      if (guestsItemInputs) {
        guestsItemInputs.forEach((guestInput) => {
          guestInput.addEventListener("change", (e) => {
            const guestType =
              guestInput.closest(".guests-item").dataset.generateList;
            const userData = {
              id: guestsListItemId,
              guestType,
              [guestInput.name]: e.target.value,
            };

            if (guestsUserValues.length === 0) {
              guestsUserValues.push(userData);
              return;
            }

            let currentGuestID = guestsUserValues.find(
              (item) => item.id === guestsListItemId
            )?.id;

            if (!currentGuestID) {
              guestsUserValues.push(userData);
            } else {
              guestsUserValues.map((item) =>
                item.id == currentGuestID ? Object.assign(item, userData) : item
              );
            }
          });
        });
      }
    });
  }

  return guestsUserValues;
};

export const editBookingGenerateSelect = () => {
  const guestsContainer = document.querySelector(".guests");
  const generateSelectWrappers = document
    .querySelector(".edit-booking-page")
    .querySelectorAll(".generate-select");

  if (generateSelectWrappers) {
    generateSelectWrappers.forEach((selectWrapper) => {
      const templateId = selectWrapper.dataset.template;
      const templateFragment = document.querySelector(
        `#${templateId}`
      )?.content;
      const templateElement =
        templateFragment.firstElementChild.cloneNode(true);
      const genSelect = selectWrapper.querySelector("select");

      getRoommatesData();

      genSelect.addEventListener("input", (e) => {
        const guestType = e.target.parentElement.dataset.guestType;
        const genList = document.querySelector(
          `[data-generate-list='${guestType}']`
        );

        genList.innerHTML = "";

        const elCount = e.target.value;

        let fragment = new DocumentFragment();

        for (let i = 1; i <= elCount; i++) {
          let newEl = templateElement.cloneNode(true);
          fragment.append(newEl);
        }

        genList.append(fragment);
        initAllDates();

        let newELCounters = guestsContainer.querySelectorAll(
          ".generate-select__count"
        );

        if (newELCounters) {
          for (let i = 0; i < newELCounters.length; i += 1) {
            newELCounters[i].textContent = i + 1;
          }
        }
        let data = getRoommatesData();

        console.log(data);

        const guestsList = document.querySelectorAll(
          ".generate-select__list > .template-item"
        );

        if (data.length) {
          outer: for (let i = 0; i < guestsList.length; i += 1) {
            console.log("LOOP");
            const currentBlock = guestsList[i];

            for (let j = i + 1; j <= data.length; j += 1) {
              const currentBlockInfo = data.find((item) => +item.id == j);

              if (!currentBlockInfo) break;

              console.log(i);
              console.log(j);
              console.log(currentBlock);
              console.log(currentBlockInfo);

              const userSurname = currentBlock.querySelector(
                'input[name="surname"]'
              );
              const userName = currentBlock.querySelector('input[name="name"]');
              const userPatronymic = currentBlock.querySelector(
                'input[name="patronymic"]'
              );
              const userBirthday = currentBlock.querySelector(
                'input[name="check_in"]'
              );

              userSurname.value = "";
              userName.value = "";
              userPatronymic.value = "";
              userBirthday.value = "";

              if (
                currentBlock.dataset.generateList == currentBlockInfo.guestType
              ) {
                userSurname.value = currentBlockInfo?.surname || "";
                userName.value = currentBlockInfo?.name || "";
                userPatronymic.value = currentBlockInfo?.patronymic || "";
                userBirthday.value = currentBlockInfo?.check_in || "";

                

                break;
              }

              // userSurname.value = "";
              // userName.value = "";
              // userPatronymic.value = "";
              // userBirthday.value = "";

              if (j == data.length) {
                console.log(`J ${j}`);
                break outer;
              }

              continue;

              // else {
              //   userSurname.value = "";
              //   userName.value = "";
              //   userPatronymic.value = "";
              //   userBirthday.value = "";

              //   if (j === data.length) break outer;

              //   continue;
              // }
            }
          }
        }
      });
    });
  }
};

editBookingGenerateSelect();
