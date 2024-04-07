const responseArray = JSON.parse(localStorage.getItem("responseObject")) || [];
console.log(responseArray);
const resultContent = document.getElementById("result-content");

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
      console.error('Please enter Location.')
      return;
  }
  const urlPull = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${locationInput}`;
  fetch(urlPull, options)
      .then((response) => response.json())
      .then((jsonInfo) => getID(jsonInfo))
}

function getID(apiObj) {
  const result = apiObj.data[0].locationId;
  const urlPaste = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=${result}`;
  fetch(urlPaste, options)
      .then((response) => response.json())
      .then((response) => {
          // Store the response in responseArray
          responseArray[0] = response;
          localStorage.setItem("responseObject", JSON.stringify(responseArray));
          // Display results
          displayResults();
      });
}

function displayResults(){
  resultContent.innerHTML = '';

const returnObject = responseArray[0].data.data

  for(let i = 0; i < returnObject.length; i++){
    console.log(returnObject[i])


    // const rName = document.createElement("h2")
    // rName.textContent = returnObject[i].name
    const resultDiv = document.createElement("div")
    resultDiv.setAttribute("class", "resultDiv")
    resultDiv.innerHTML = `
    <h2 class="RestName">${returnObject[i].name}</h2>
    <img class="displayImage" src="${returnObject[i].squareImgUrl}" alt="no image displayed"></img>
    <p class="cuisineTag">${returnObject[i].establishmentTypeAndCuisineTags[0]}</p>
    <p class="priceTag"> Cost: ${returnObject[i].priceTag}</p>
    <p class="rating"> Rating: ${returnObject[i].averageRating}</p>
    <p class="openStatus"> Status: ${returnObject[i].currentOpenStatusText}
    <p class="reviewSnippet">${returnObject[i].reviewSnippets.reviewSnippetsList[0].reviewText}</p>
    `

    resultContent.append(resultDiv)
  }
}

displayResults()

userFormEl.addEventListener('submit', handleSearchFormSubmit);

// FIRST ATTEMPT AT API IMPLEMENTATION
//   const resultTextEl = document.querySelector('#result-text')
//   const resultContentEl = document.querySelector('#result-content')
//   const userFormEl = document.querySelector('#search-form')

//   function getParams() {
//     const searchParamsArr = document.location.search.split('&');

//     const query = searchParamsArr[0].split('=').pop(); //test .pop
//     const format = searchParamsArr[1]; // test .split

//     searchApi(query, format);
//   }

//   function printResults(resultObj) {
//     console.log(resultObj);
//   }

//   function searchApi(query, format) {
//     let locQueryUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=30196`;

//     if (format) {
//         locQueryUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=30196`
//     }

//     locQueryUrl = `${locQueryUrl}&q=${query}`;

//     fetch(locQueryUrl, options)
//         .then(function (response) {
//             if (!response.ok) {
//                 throw response.json();
//             }

//             return response.json();
//         })
//         .then(function (locRes) {
//         resultTextEl.textContent = locRes.search.query;
//         console.log(locRes);

//         if (!locRes.results.length) {
//             console.log('No results found!');
//             resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
//             } else {
//             resultContentEl.textContent = '';
//             for (let i = 0; i < locRes.results.length; i++) {
//                 printResults(locRes.results[i]);
//             }
//         }
//     })
//     .catch(function (error) {
//               console.error(error);
//     });
// }

// function handleSearchFormSubmit(event) {
//     event.preventDefault();
  
//     const cuisineInput = document.querySelector('#search-term-input').value;
//     const locationInput = document.querySelector('#search-term-location').value;

//     const queryString = `./landing.html?q=${locationInput}`;

//     location.assign(queryString);
  
//     if(!locationInput) {
//       console.error('Please enter Cuisine and Location.');
//       return;
//     }

//     getParams();
  
//   }
//   userFormEl.addEventListener('submit', handleSearchFormSubmit);

//   getParams();

            
        

  