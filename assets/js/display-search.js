const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer zWPt5cfKm9OawNFe1JwFlPyWec-8IkXkdiC6PZj01sJD5xKQ0LgM-rceW9RmJeWC0g58qltGLn09IvYzcaDSE9kUgUcmc9C257rqsj8Qk38CinS-ajHme0nRh3kDZnYx'
    }
  };

  const userFormEl = document.querySelector('#user-form')

  function getParams() {
    const searchParamsArr = document.location.search.split('&');

    const query = searchParamsArr[0].split('=').pop(); //test pop
    const format = searchParamsArr[1].split('=').pop();

    searchApi(query, format);
  }

  function printResults(resultObj) {
    console.log(resultObj);
  }

  function searchApi(query, format) {
    let locQueryUrl = `https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20&location=texas`;

    if (format) {
        locQueryUrl = `https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20&location=${format}`
    }

    locQueryUrl = `${locQueryUrl}&q=${query}`;

    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (locRes) {
        resultTextEl.textContent = locRes.search.query;
        console.log(locRes);

        if (!locRes.results.length) {
            console.log('No results found!');
            resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
            resultContentEl.textContent = '';
            for (let i = 0; i < locRes.results.length; i++) {
                printResults(locRes.results[i]);
            }
        }
    })
    .catch(function (error) {
              console.error(error);
    });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    const cuisineInput = document.querySelector('#search-term-input').value;
    const locationInput = document.querySelector('#search-term-location').vaule;

    const queryString = `./landing.html?q=${cuisineInput}&format=${locationInput}`;

    location.assign(queryString);
  
    if(!cuisineInput, locationInput) {
      console.error('Please enter Cuisine and Location.')
      return;
    }

    getParams();
  
  }
  userFormEl.addEventListener('submit', handleSearchFormSubmit);

  getParams();

            
        

  
//   const getUserSearch = function (location) {
    
//     const apiURL = `https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20&location=${location}`;
  
//   fetch(apiURL, options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// }