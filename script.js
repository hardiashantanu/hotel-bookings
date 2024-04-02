async function fetchdata() {
    const input = document.getElementById("searchInput").value;
    const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${input}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'df5e3d705dmsha013876d57ebee2p183edajsn259322594f87',
            'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayResults(result.data); // Pass only the data array to display results
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = ""; // Clear previous results

    if (data && data.length > 0) {
        data.forEach(hotel => {
            const listItem = document.createElement("li");

            const hotelName = document.createElement("h3");
            hotelName.textContent = hotel.name;
            listItem.appendChild(hotelName);

            const hotelImage = document.createElement("img");
            hotelImage.src = hotel.image_url;
            listItem.appendChild(hotelImage);

            const hotelInfo = document.createElement("div");
            hotelInfo.classList.add("hotel-info");

            const hotelLocation = document.createElement("p");
            hotelLocation.textContent = `Location: ${hotel.city_name}, ${hotel.region}, ${hotel.country}`;
            hotelInfo.appendChild(hotelLocation);

            const hotelRating = document.createElement("p");
            hotelRating.textContent = `Rating: ${hotel.rating}`;
            hotelInfo.appendChild(hotelRating);

            const hotelPrice = document.createElement("p");
            hotelPrice.textContent = `Price: ${hotel.price}`;
            hotelInfo.appendChild(hotelPrice);

            listItem.appendChild(hotelInfo);

            resultsList.appendChild(listItem);
        });
    } else {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No hotels found";
        resultsList.appendChild(noResultsMessage);
    }
}

document.getElementById("searchButton").addEventListener("click", fetchdata);
