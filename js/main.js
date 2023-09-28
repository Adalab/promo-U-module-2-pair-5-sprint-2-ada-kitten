'use-strict';
//querySelector

const jsList = document.querySelector('.js-list');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');

const jsbtnadd = document.querySelector('.js-btn-add');
const newForm = document.querySelector('.new-form');

const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const labelMessageError = document.querySelector('.js-label-error');

const jsNewformAdd = document.querySelector('.js-newform-add');
const jsNewformCancel = document.querySelector('.js-newform-cancel');
const jsBtnSearch = document.querySelector('.js_btn_search');

const GITHUB_USER = '<BravoCarmen>';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

//datos generales

const descrSearchText = input_search_desc.value;

//Traer gatitos del servidor / cogerlos del local storage

let kittenDataList = [];

const kittenListStored = JSON.parse(localStorage.getItem('kittenDataList'));

if (kittenListStored) {
  //si existe el listado de gatitos en el local storage
  // vuelve a pintar el listado de gatitos
  //...
  //completa el código...
  kittenDataList = kittenListStored;
  renderKittenList(kittenDataList);
} else {
  //sino existe el listado de gatitos en el local storage
  //haz la petición al servidor
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((data) => {
      kittenDataList = data.results;
      localStorage.setItem('gatitos', JSON.stringify(kittenDataList));
      renderKittenList(kittenDataList);
    })
    .catch((error) => {
      console.error(error);
    });
}

// //funciones
function renderKitten(kittenData) {
  const liElement = document.createElement('li');
  liElement.classList.add('card');
  const articleElement = document.createElement('article');
  liElement.appendChild(articleElement);
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', kittenData.image);
  imgElement.classList.add('card_img');
  articleElement.appendChild(imgElement);
  const h3Element = document.createElement('h3');
  h3Element.classList.add('card_tittle');
  const textH3 = document.createTextNode(kittenData.name);
  h3Element.appendChild(textH3);
  articleElement.appendChild(h3Element);
  const h4Element = document.createElement('h4');
  const textH4 = document.createTextNode(kittenData.race);
  h4Element.appendChild(textH4);
  h4Element.classList.add('card_race');
  articleElement.appendChild(h4Element);
  const pElement = document.createElement('p');
  pElement.classList.add('card_description');
  const textDesc = document.createTextNode(kittenData.desc);
  pElement.appendChild(textDesc);
  articleElement.appendChild(pElement);

  return liElement;
}

// function renderKitten(kittenData) {
//   return `<li class="card">
// <article>
//   <img
//     class="card_img"
//     src= "${kittenData.image}"
//     alt="gatito"
//     />
//     <h3 class="card_title">${kittenData.name}</h3>
//     <h4 class="card_race">${kittenData.race}</h4>
//     <p class="card_description">
//     ${kittenData.desc}
//    </p>
// </article>
// </li>`;
// }

//mostrar-ocultar formulario

function showNewCatForm() {
  newForm.classList.remove('collapsed');
}
function hideNewCatForm() {
  newForm.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newForm.classList.contains('collapsed')) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}

//subir un nuevo gatito

function addNewKitten(event) {
  event.preventDefault();
  const newKitten = {
    image: inputPhoto.value,
    name: inputName.value,
    desc: inputDesc.value,
    race: inputRace.value,
  };
  if (
    newKitten.desc === '' ||
    newKitten.photo === '' ||
    newKitten.name === '' ||
    newKitten.race === ''
  ) {
    labelMessageError.innerHTML = `¡Uy, parece que has olvidado algo!`;
  } else {
    kittenDataList.push(newKitten);
    renderKittenList(kittenDataList);
    labelMessageError.innerHTML = `Mola! Un nuevo gatito en Adalab!`;
  }

  // fetch(SERVER_URL)
  // .then((response) => response.json())
  // .then((data) => {

  // })
}

function renderKittenList(kittenDataList) {
  jsList.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    jsList.appendChild(renderKitten(kittenItem));
  }
}

jsNewformCancel.addEventListener('click', () => {
  newForm.classList.toggle('collapsed');
  inputDesc.value = ``;
  inputPhoto.value = ``;
  inputName.value = ``;
  inputRace.value = ``;
  labelMessageError.innerHTML = ``;
});

//filtrar por descripción
function filterKitten(event) {
  event.preventDefault();
  const descrSearchText = input_search_desc.value;
  const raceSearchText = input_search_race.value;
  jsList.innerHTML = '';
  const filterKittenList = kittenDataList
    .filter((item) => item.desc.includes(descrSearchText))
    .filter((item) => item.race.includes(raceSearchText));

  renderKittenList(filterKittenList);
}

console.log(filterKitten);

//manejadores

jsbtnadd.addEventListener('click', handleClickNewCatForm);
jsNewformAdd.addEventListener('click', addNewKitten);
jsBtnSearch.addEventListener('click', filterKitten);
