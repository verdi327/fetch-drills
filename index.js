'use strict';

function watchForm() {
  $('form').on('submit', function(event){
    event.preventDefault();
    let apiUrl='';
    const resultTotal = $(this).serialize().split('=')[1];
    if (resultTotal){
      apiUrl=`https://dog.ceo/api/breeds/image/random/${resultTotal}`;}
    else{
      apiUrl=`https://dog.ceo/api/breeds/image/random/3`;
    }
    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        const dogImages = jsonData.message;
        const dogTemplate = dogImages.map(buildDogHtml);
        $('.js-dog-results').html(dogTemplate);
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