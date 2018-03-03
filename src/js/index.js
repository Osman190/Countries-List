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
  initMap(Number(final[0]), Number(final[1]), 24);
  console.log(final);
})

  allCountry()
  searchButton()