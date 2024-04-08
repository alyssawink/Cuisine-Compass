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
        console.error('Please enter Location.');
        return;
    }
    const urlPull = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${locationInput}`;
    fetch(urlPull, options)
        .then((response) => response.json())
        .then((jsonInfo) => getID(jsonInfo));
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
            // Display map with markers
            const latitude = apiObj.data[0].latitude;
            const longitude = apiObj.data[0].longitude;
            initMap(latitude, longitude);
        });
}

function displayResults(){
    resultContent.innerHTML = '';

    const returnObject = responseArray[0].data.data;

    for(let i = 0; i < returnObject.length; i++){
        console.log(returnObject[i]);

        const resultDiv = document.createElement("div");
        resultDiv.setAttribute("class", "resultDiv");
        resultDiv.innerHTML = `
            <h2 class="RestName">${returnObject[i].name}</h2>
            <img class="displayImage" src="${returnObject[i].squareImgUrl}" alt="no image displayed"></img>
            <p class="cuisineTag">${returnObject[i].establishmentTypeAndCuisineTags[0]}</p>
            <p class="priceTag"> Cost: ${returnObject[i].priceTag}</p>
            <p class="rating"> Rating: ${returnObject[i].averageRating}</p>
            <p class="openStatus"> Status: ${returnObject[i].currentOpenStatusText}
            <p class="reviewSnippet">${returnObject[i].reviewSnippets.reviewSnippetsList[0].reviewText}</p>
        `;
        resultContent.append(resultDiv);
    }
}

userFormEl.addEventListener('submit', handleSearchFormSubmit);

function initMap(latitude, longitude) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    });

    // Create markers for each restaurant and set them on the map
    const returnObject = responseArray[0].data.data;
    for (let i = 0; i < returnObject.length; i++) {
        const locationId = returnObject[i].location_id;
        fetchRestaurantDetails(locationId)
            .then((details) => {
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(details.latitude), lng: parseFloat(details.longitude) },
                    map: map,
                    title: returnObject[i].name
                });
            })
            .catch((error) => {
                console.error("Error fetching restaurant details:", error);
            });
    }
}

function fetchRestaurantDetails(locationId) {
    const urlDetails = `https://tripadvisor16.p.rapidapi.com/api/v2/restaurant-details?location_id=${locationId}`;
    return fetch(urlDetails, options)
        .then((response) => response.json())
        .then((data) => data.data)
        .catch((error) => {
            console.error("Error fetching restaurant details:", error);
            throw error;
        });
}
