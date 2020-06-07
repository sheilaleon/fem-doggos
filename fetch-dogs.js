const DOG_API_URL = 'https://dog.ceo/api/';
const BREEDLIST_API_URL = 'https://dog.ceo/api/breeds/list/all';

const content = document.querySelector('.content');
const breeds = document.querySelector('#breed');
const loader = document.querySelector('.loader');

function getDogImg(promise) {
  loader.classList.remove('hidden');

  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      const img = document.createElement('img');
      img.src = processedResponse.message;
      img.alt = 'Dog';
      content.insertAdjacentElement('afterbegin', img);
      loader.classList.add('hidden');
    });
}

function fetchRandomImg() {
  const promise = fetch(`${DOG_API_URL}breeds/image/random`);
  getDogImg(promise);
}

document.querySelector('.fetch-btn').addEventListener('click', fetchRandomImg);

// fetch image from user selected breed
function selectedBreed(value) {
  const selected = value;
  const promise = fetch(`${DOG_API_URL}breed/${selected}/images/random`);
  loader.classList.remove('hidden');
  getDogImg(promise);
}

document.querySelector('#breed').addEventListener('change', function(e) {
  selectedBreed(e.target.value);
});

// create select list of breeds from dog.ceo
function fetchBreeds() {
  const promise = fetch(BREEDLIST_API_URL);
  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      const breedList = processedResponse.message;
      let breed;
      for (breed in breedList) {
        const option = document.createElement('option');
        option.value = breed;
        option.innerText = breed;
        breeds.appendChild(option);
      }
    });
}

fetchBreeds();
