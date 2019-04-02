'use strict';

function fetchtotaldog() {
  $('.form-num').on('submit', function(event){
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
function breed(){
  $('.form-breed').on('submit', function(event){
    event.preventDefault();
    let breed = $('.breed-name').val();
    let urlapi= `https://dog.ceo/api/breed/${breed}/images/random`;
    let xhr = new XMLHttpRequest();
    try{urlapi=`https://dog.ceo/api/breed/hound/images/random`;
    fetch(urlapi).then(res=>res.json()).then(data=>{
      $('.js-dog-results').html(buildDogHtml(data.message));
    }).catch((error)=>
      console.log(error)
  )} catch(e){fetch('https://dog.ceo/api/breed/hound/images/random').then(res=>res.json()).then(data=>{$('.js-dog-results').html(buildDogHtml(data.message));}).catch((error)=>console.log(error));}
  //   fetch('https://dog.ceo/api/breed/hound/images/random').then(res=>res.json()).then(data=>{$('.js-dog-results').html(buildDogHtml(data.message));}).catch((error)=>console.log(error));
  

})}

function buildDogHtml(image) {
  return `
    <li><img src='${image}'></li>
  `;
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  fetchtotaldog();
  breed();
  breedlist();
});