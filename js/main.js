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

//Traer gatitos del servidor

let kittenDataList = [];
fetch(SERVER_URL)
.then((response) => response.json())
  .then((data) => {
    kittenDataList = data.results;
    console.log(kittenDataList);
    renderKittenList(kittenDataList);
  });


//funciones

function renderKitten(kittenData) {
  return `<li class="card">
<article>
  <img
    class="card_img"
    src= "${kittenData.image}"
    alt="gatito"
    />
    <h3 class="card_title">${kittenData.name}</h3>
    <h4 class="card_race">${kittenData.race}</h4>
    <p class="card_description">
    ${kittenData.desc}
   </p>
</article>
</li>`;
}

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

  
}

function renderKittenList(kittenDataList) {
  jsList.innerHTML = '';
  for (i = 0; i < kittenDataList.length; i++) {
    jsList.innerHTML += renderKitten(kittenDataList[i]);
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
