'use strict';

let store = [];

function fetchDogImages(totalImages) {
  if (!totalImages){
    totalImages = 3;
  }

  const apiUrl = `https://dog.ceo/api/breeds/image/random/${totalImages}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      store = [].concat(jsonData.message);
      render(store);
    })
    .catch((error) => console.log(error));
}

function render(store) {
  const dogTemplate = store.map(buildDogHtml);
  $('.js-dog-results').html(dogTemplate);
}

function fetchDogs() {
  $('form#total-dogs').on('submit', function(event){
    event.preventDefault();
    const totalImages = $('#number-of-dogs').val();
    event.target.reset();
    fetchDogImages(totalImages);
  });
}

function breed(){
  $('.form-breed').on('submit', function(event){
    event.preventDefault();
    let breed = $('.breed-name').val();
    let urlapi= `https://dog.ceo/api/breed/${breed}/images/random`;
    let xhr = new XMLHttpRequest();
    try {
      urlapi=`https://dog.ceo/api/breed/hound/images/random`;
      fetch(urlapi).then(res=>res.json()).then(data=>{
        $('.js-dog-results').html(buildDogHtml(data.message));
      }).catch((error) => console.log(error))
    } catch(e){
      fetch('https://dog.ceo/api/breed/hound/images/random').then(res=>res.json()).then(data=>{$('.js-dog-results').html(buildDogHtml(data.message));}).catch((error)=>console.log(error));
    }
  });
}

function buildDogHtml(image) {
  return `
    <li><img src='${image}'></li>
  `;
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  fetchDogs();
  breed();
  breedlist();
});