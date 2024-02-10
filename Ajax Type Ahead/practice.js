const points = "https://raw.githubusercontent.com/apsaraaruna/srilanka-cities-json/master/cities-and-postalcode-by-district-min.json"

let cities = [];
fetch(points)
  .then(blob => blob.json())
  .then(data => {
    console.log(data);
    for(let city in data) {
      cities.push(data[city]);
    }
  });

console.log(cities);

function findCity(typeStr, cities) {
  return cities.filter(place => {
    place.city.match(/amp/gi);
  })
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", func1);
searchInput.addEventListener("keyup", func1);