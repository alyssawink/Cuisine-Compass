const apiKEY = 'zWPt5cfKm9OawNFe1JwFlPyWec-8IkXkdiC6PZj01sJD5xKQ0LgM-rceW9RmJeWC0g58qltGLn09IvYzcaDSE9kUgUcmc9C257rqsj8Qk38CinS-ajHme0nRh3kDZnYx'
const userFormEl = document.querySelector('#user-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const cuisineInput = document.querySelector('#search-term-input').value;
  const locationInput = document.querySelector('#search-term-location').vaule;

  if(!cuisineInput, locationInput) {
    console.error('Please enter Cuisine and Location.')
    return;
  }
  const queryString = `./landing.html?q=${cuisineInput}&format=${locationInput}`;

  location.assign(queryString);
}
userFormEl.addEventListener('submit', handleSearchFormSubmit);
