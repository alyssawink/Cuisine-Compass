let urlPull = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=austin';
let urlPaste = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=30196';

let responseArray = JSON.parse(localStorage.getItem("responseObject")) || [];

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4dc8e48276msh44bcaa71dc3aab5p1042e0jsnacd6bc1ca8a0',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
		'Cache-Control': 'no-cache',
	}
};

const userFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    const locationInput = document.querySelector('#search-term-location').value;

    if (!locationInput) {
        console.error('Please enter Location.');
        return;
    }

    const urlPull = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${locationInput}`;

    fetch(urlPull, options)
        .then((response) => response.json())
        .then((jsonInfo) => {
            const result = jsonInfo.data[0].locationId;
            const urlPaste = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=${result}`;

            fetch(urlPaste, options)
                .then((response) => response.json())
                .then(response => {
                    const restaurants = response;
                    // Update responseArray with the latest search results
                    responseArray = [restaurants];
                    localStorage.setItem("responseObject", JSON.stringify(responseArray));
                    location.href = "./landing.html";
                })
        })
}

userFormEl.addEventListener('submit', handleSearchFormSubmit);

document.addEventListener('DOMContentLoaded', function () {

  // Get modal
  const modal = document.getElementById('aboutModal');

  // Get button to open modal
  const btn = document.getElementById("aboutButton");

  // Get close button for modal
  const closeButton = modal.querySelector('.modal-close');

  // Function to open modal
  btn.onclick = function () {
      modal.classList.add('is-active');
  }

  // Function to close modal when clicking on close button or background
  if (modal && closeButton) {
      [modal, closeButton].forEach(function (el) {
          el.addEventListener('click', function () {
              modal.classList.remove('is-active');
          });
      });
  }

  // Prevent modal from closing when clicking inside modal content
  if (modal) {
      modal.querySelector('.modal-content').addEventListener('click', function (e) {
          e.stopPropagation();
      });
  }
});




//   https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=austin
// Pull from this one

// https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=30196
// Paste into this one

// Create a thing that takes the user input and applies it to the urlPull

// Use urlPaste response array to list Restaurant Name (data.data[i].name), Cuisine (data.data[i].establishmentTypeAndCuisineTags[0]), Current Open Status (data.data[i].currentOpenStatusCategory), average rating (data.data[i].averageRating), image (data.data[i].squareImgUrl)