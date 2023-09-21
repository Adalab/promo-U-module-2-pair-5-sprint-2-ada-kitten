'use-strict';
//querySelector

const jsList = document.querySelector('.js-list');
const input_search_desc = document.querySelector('.js_in_search_desc');

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

//datos generales

const descrSearchText = input_search_desc.value;

const kittenDataList = [
  {
    image: 'https://dev.adalab.es/gato-siames.webp',
    name: 'Anastacio',
    desc: 'Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.',
    race: 'Siamés',
  },
  {
    image: 'https://dev.adalab.es/sphynx-gato.webp',
    name: 'Fiona',
    desc: 'Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.',
    race: 'Sphynx',
  },
  {
    image: 'https://dev.adalab.es/maine-coon-cat.webp',
    name: 'Cielo',
    desc: 'Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.',
    race: 'Maine Coon',
  },
];

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
renderKittenList(kittenDataList);

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
  jsList.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    if (kittenItem.desc.includes(descrSearchText)) {
      jsList.innerHTML += renderKitten(kittenItem);
    }
  }
}

//manejadores

jsbtnadd.addEventListener('click', handleClickNewCatForm);
jsNewformAdd.addEventListener('click', addNewKitten);
jsBtnSearch.addEventListener('click', filterKitten);
