const apiKEY = 'zWPt5cfKm9OawNFe1JwFlPyWec-8IkXkdiC6PZj01sJD5xKQ0LgM-rceW9RmJeWC0g58qltGLn09IvYzcaDSE9kUgUcmc9C257rqsj8Qk38CinS-ajHme0nRh3kDZnYx'
const userFormEl = document.querySelector('#user-form');
const locInputEL = document.querySelector('#search-term-input');


const formSubmitHandler = function (event) {
    event.preventDefault();

    const loc = locInputEL.value.trim();

    if (loc) {
        getUserLoc(loc);

        locContainerEl.textContent = '';
        locInputEL.value = '';
    } else {
      alert('Please enter a valid location.');

    }
};

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer zWPt5cfKm9OawNFe1JwFlPyWec-8IkXkdiC6PZj01sJD5xKQ0LgM-rceW9RmJeWC0g58qltGLn09IvYzcaDSE9kUgUcmc9C257rqsj8Qk38CinS-ajHme0nRh3kDZnYx'
    }
  };
  
  const getUserSearch = function (location) {
    
    const apiURL = 'https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20&location=${location}';
  
  fetch(apiURL, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}








userFormEl.addEventListener('submit', formSubmitHandler);
