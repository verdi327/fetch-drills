'use strict';

const store = [];

function fetchDogImages(totalImages) {
  console.log('totalImages', totalImages);
  if (!totalImages){
    console.log('here');
    totalImages = 3;
  }

  const apiUrl = `https://dog.ceo/api/breeds/image/random/${totalImages}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      jsonData.message.forEach(img => store.push(img));
      render();
    })
    .catch((error) => console.log(error));
}

function render() {
  const dogTemplate = store.map(buildDogHtml);
  $('.js-dog-results').html(dogTemplate);
}

function fetchDogs() {
  $('form#total-dogs').on('submit', function(event){
    event.preventDefault();
    event.target.reset();
    const totalImages = $('#number-of-dogs').val();
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