'use strict';

function watchForm() {
  $('form').on('submit', function(event){
    event.preventDefault();
    const resultTotal = $(this).serialize().split('=')[1];
    const apiUrl = `https://dog.ceo/api/breeds/image/random/${resultTotal}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        const dogImages = jsonData.message;
        const dogTemplate = dogImages.map(buildDogHtml);
        $('.js-dogs-results').html(dogTemplate);
      })
      .catch((error) => console.log(error));
    
  });
}

function buildDogHtml(image) {
  return `
    <li><img src='${image}'></li>
  `;
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});