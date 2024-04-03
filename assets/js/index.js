const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4dc8e48276msh44bcaa71dc3aab5p1042e0jsnacd6bc1ca8a0',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	}
};

let urlPull = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=austin';
let urlPaste = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=30196';
const userFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const locationInput = document.querySelector('#search-term-location').value;

  if(!locationInput) {
    console.error('Please enter Location.')
    return;
  }
  const urlPull = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${locationInput}`;
  fetch(urlPull, options) 
  .then((response) => response.json())
  .then((jsonInfo) => getID(jsonInfo))


const getID = (apiObj) => {
	console.log(apiObj)
	const result = apiObj.data[0].locationId;
	console.log(result)
  
  const urlPaste = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=${result}`;
  fetch(urlPaste, options) 
  .then((response) => response.json())
  .then(response => {
   
    const restaurants = response;
	console.log(restaurants)
  })}}
    


// Use if implementing landing page
//   const queryString = `./landing.html?q=${locationInput}`;

//   location.assign(queryString);
// }
userFormEl.addEventListener('submit', handleSearchFormSubmit);




//   https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=austin
// Pull from this one

// https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=30196
// Paste into this one

// Create a thing that takes the user input and applies it to the urlPull

// Use urlPaste response array to list Restaurant Name (data.data[i].name), Cuisine (data.data[i].establishmentTypeAndCuisineTags[0]), Current Open Status (data.data[i].currentOpenStatusCategory), average rating (data.data[i].averageRating), image (data.data[i].squareImgUrl)