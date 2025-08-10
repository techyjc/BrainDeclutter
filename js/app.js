let clutter = [];
let cluttereditid = null;

const dialog = document.querySelector(".dialog-form");
let btns = document.querySelectorAll(".card-add-btn");
let card = document.querySelectorAll(".card");
const cardAddBtn = document.querySelector(".card-add-btn");

const clutterform = document.querySelector("#clutterform");
const cluttersearch = document.querySelector("#searchform");
const clutterclrsearch = document.querySelector(".search-clear-btn");
const dialogcloseBtn = document.querySelector(".dialog-close-btn");
const dialogcancelBtn = document.querySelector(".dialog-cancel-btn");

function generateID() {
  let clutterID = Date.now().toString();
  return clutterID;
}

function loadClutter() {
  storedClutter = localStorage.getItem("ClutterPad");
  return storedClutter ? JSON.parse(storedClutter) : [];
}

function timeStamp() {
  let currentDate = new Date();
  let lastedited = "";
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth().toString();
  let currentDay = currentDate.getDate().toString();
  let currentHours = currentDate.getHours().toString();
  let currentMinutes = currentDate.getMinutes().toString();
  let currentSeconds = currentDate.getSeconds().toString();
  lastedited =
    currentDay.padStart(2, "0") +
    "/" +
    currentMonth.padStart(2, "0") +
    "/" +
    currentYear +
    " | " +
    currentHours.padStart(2, "0") +
    ":" +
    currentMinutes.padStart(2, "0") +
    ":" +
    currentSeconds.padStart(2, "0");
  return lastedited.toString();
}

function addClutter(event) {
  event.preventDefault();
  saveClutter();
  storeClutter();
  updateClutter();
  dialog.close();
}

function saveClutter() {
  const clutterID = generateID();
  const clutterTitle = document.querySelector("#clutter-title").value.trim();
  const clutterContent = document
    .querySelector("#clutter-text-content")
    .value.trim();
  const clutterTimeStamp = timeStamp();
  clearDialog();

  if (cluttereditid) {
    const clutterindex = clutter.findIndex(
      (clutter) => clutter.id === cluttereditid
    );
    clutter[clutterindex] = {
      ...clutter[clutterindex],
      title: clutterTitle,
      content: clutterContent,
      timestamp: timeStamp()
    };

    storeClutter();
    cluttereditid = null;
    updateClutter();
  } else {
    clutter.unshift({
      id: clutterID,
      title: clutterTitle,
      content: clutterContent,
      timestamp: timeStamp()
    });
  }
}

function storeClutter() {
  localStorage.setItem("ClutterPad", JSON.stringify(clutter));
}

function editCard(clutterid = 0) {
  const cluttered = clutter.find((clutter) => clutter.id === clutterid);
  cluttereditid = clutterid;
  if (clutterid) {
    let cluttertitle = document.getElementById("clutter-title");
    let cluttercontent = document.getElementById("clutter-text-content");
    document.getElementById("dialog-btn").textContent = "Update Clutter";
    cluttertitle.value = cluttered.title;
    cluttercontent.value = cluttered.content;
    dialog.showModal();
  }
}

function deleteClutter(clutterid = 0) {
  clutter = clutter.filter((clutter) => clutter.id != clutterid);
  storeClutter();
  updateClutter();
}


function searchClutter(event) {
  event.preventDefault();
  const searchtext = document.querySelector(".search-input").value.trim().toLowerCase();
  clutterSearch = clutter.filter(clutter => clutter.content.toLowerCase().includes(searchtext));
  updateClutter(clutterSearch, true);
}

function updateClutter(clutterentries = clutter, searchbool = false) {
  const cards = document.querySelector(".cards");
  if (clutterentries.length == 0 && searchbool === true) {
    return;
  }

  if (clutter.length === 0) {
    cards.innerHTML = `
      <article class="card">
      <div class="card-title">
      <h3 class="card-title-text">Can't find any clutter...</h3>
    </div>
    <hr>
    <div class="card-no-content">
      <p class="card-content-text">Click the '+' button to add clutter.</p>
        <button class="card-add-btn" type="submit" title="Add a peice of clutter.">
    <svg class="plus-btn" viewBox="0 0 448 512" width="100" title="plus">
      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
    </svg>
  </button>
    </div>
  </article>`;
    return;
  }

  cards.innerHTML = clutterentries.map((card) => `
      <article class="card" id="${card.id}" data-id="${card.id}">
    <div class="card-title">
      <h3 class="card-title-text">${card.title}</h3>
      <div class="card-controls">
      <button class="card-control-btn card-edit" title="Edit my clutter">
        <svg class="card-control card-edit" viewBox="0 0 512 512" width="100" title="pencil-alt">
          <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z" />
        </svg>
        </button>
        <button class="card-control-btn card-delete" title="Delete my clutter">
        <svg class="card-control card-delete" viewBox="0 0 352 512" width="100" title="times">
          <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
        </svg>
        </button>
      </div>
    </div>
    <hr>
    <div class="card-content">
      <p class="card-content-text">${card.content}</p>
    </div>
    <div class="card-footer">
      <hr>
      <p class="card-lastedit">Edited: ${card.timestamp}</p>
    </div>
    <div class="-dcard-corner">
    </div>
  </article>
    `
  )
    .join("");
  cardEvents();
  return;
}

function updateBtns() {
  btns = document.querySelectorAll(".card-add-btn");
  btns.forEach(function (element, index) {
    element.addEventListener("click", (event) => {
      dialog.showModal();
      document.getElementById("clutter-title").focus();
    });
  });
}

function cardEvents() {
  card = document.querySelectorAll(".card");
  card.forEach((cardBtn) => {
    cardBtn.addEventListener("click", (event) => {
      // Edit Card
      if (event.target.parentNode.classList.contains("card-edit")) {
        editCard(cardBtn.getAttribute("data-id"));
      }

      // Delete Card
      if (event.target.parentNode.classList.contains("card-delete")) {
        let prompt = "Are you sure you want to delete this Clutter?\nEither OK or Cancel.";
        if (confirm(prompt) === true) {
          deleteClutter(cardBtn.getAttribute("data-id"));
        }
      }
    });
  });
}

function clearDialog() {
  let cluttertitle = document.querySelector("#clutter-title");
  let cluttercontent = document.querySelector("#clutter-text-content");
  cluttertitle.value = "";
  cluttercontent.value = "";
  document.getElementById("dialog-btn").textContent = "Add Clutter";
}

clutterform.addEventListener("submit", addClutter);

cluttersearch.addEventListener("submit", searchClutter);

clutterclrsearch.addEventListener("click", (event) => {
  const searchinput = document.querySelector("#search-input");
  searchinput.value = "";
  updateClutter();
  updateBtns();
});

dialogcloseBtn.addEventListener("click", (event) => {
  clearDialog();
  dialog.close();
});

dialogcancelBtn.addEventListener("click", (event) => {
  clearDialog();
  dialog.close();
});

dialog.addEventListener("click", function (event) {
  if (event.target === this) {
    clearDialog();
    dialog.close();
  }
});

clutter = loadClutter();
updateClutter();
updateBtns();
