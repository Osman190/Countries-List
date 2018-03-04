/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// class countriesList{
//   constructor(){
//     var xhttp = new XMLHttpRequest();
//     xhttp.open('GET', 'https://restcountries.eu/rest/v2/all', false);
//     xhttp.send();
//     this.countries = JSON.parse(xhttp.responseText)
//   }

//   printCountries(){
//     console.log(this.countries)
//   }
// }

// const objconutries1 = new countriesList();
// objconutries1.printCountries()

let body = document.querySelector('body');
let countriesList = [];

let url = 'https://restcountries.eu/rest/v2/all'
  function allCountry(){ 
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(countries =>{
        countriesList = countries;
        console.log(countriesList)
        overview(countriesList);
    })
  }
  


  function overview(countriesList) {

    if (document.getElementById("searchcountry").value !== "") {
      countriesList = countriesList.filter(i => i.name.toLowerCase().includes(document.getElementById("searchcountry").value))
    }
     
    if (window.location.search.substr(1) === "sort=asc") {
      countriesList.sort((a, b) => b.population - a.population)
      } else if (window.location.search.substr(1) === "sort=desc") {
        countriesList.sort((a, b) => a.population - b.population)
    }
    
    let html = "";
    let i = 1
    let tableBody = document.getElementById('tableBody')
    let counter = 0;
    countriesList.forEach(country => {
      counter += country.population
    })
    
    countriesList.forEach(country => {
      html += `<tr>
                  <td>${i}</td>
                  <td width=20%>${country.name}<td>
                  <td data-id = "${country.latlng}" width=20%>
                  <img src='${country.flag}' width=50%>
                  </td>
                  <td width=20%>${country.population}</td>
                  <td width=20%
                  <b>${((country.population /counter) * 100).toFixed(5)} %</td>
              </tr>`;
          i++
    })
    tableBody.innerHTML = html;
  }

function searchButton() {
  let button = document.getElementById('searchcountry');
  button.addEventListener('keyup', (e) => {
    e.preventDefault()
    overview(countriesList)
  })
}
  
function initMap(lat, lng, zoom) {
  const coord = {
    lat: lat,
    lng: lng
  }
  const map = new google.maps.Map(document.getElementById('map'),
    {
      zoom: zoom,
      center: coord
    })
  const marker = new google.maps.Marker({
    position: coord, 
    map: map
  })
}

document.getElementById('tableBody').addEventListener('click', function (e) {
  const { target } = e;
  const coord = target.getAttribute('data-id');
  const final = coord.split(',');
  initMap(Number(final[0]), Number(final[1]), 6);
  console.log(final);
})

  allCountry()
  searchButton()

/***/ })
/******/ ]);