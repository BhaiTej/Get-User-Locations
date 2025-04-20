const showDetails = document.querySelector(".showDetails");
const fullAddress = document.querySelector(".fullAddress");
const formattedAddress = document.querySelector(".formattedAddress");
const apiEndpoint = 'https://api.opencagedata.com/geocode/v1/json';
const apikey = 'cf6de4df4b82423985143ec3070b419b';  // Replace with your OpenCage API key

// Function to fetch the address using the latitude and longitude
const getCurrentAddress = async (latitude, longitude) => {
    let query = `${latitude},${longitude}`;
    let apiurl = `${apiEndpoint}?key=${apikey}&q=${query}&pretty=1`;

    try {
        const res = await fetch(apiurl);
        const data = await res.json();

        // Ensure that there are results
        if (data.results && data.results.length > 0) {
            const { city, state, postcode, country } = data.results[0].components;
            fullAddress.textContent = `User address: ${city || 'Unknown City'}, ${postcode || 'Unknown Postcode'}, ${state || 'Unknown State'}, ${country || 'Unknown Country'}`;
            formattedAddress.textContent = `User full address: ${data.results[0].formatted}`;
        } else {
            fullAddress.textContent = "Address not found!";
            formattedAddress.textContent = "No formatted address available.";
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        fullAddress.textContent = "Failed to fetch address. Please try again.";
        formattedAddress.textContent = "";
    }
};

// Function to handle the reset of details
const resetDetails = () => {
    showDetails.textContent = "User location details will appear here.";
    fullAddress.textContent = "User address will appear here.";
    formattedAddress.textContent = "User full address will appear here.";
};

// Detect location when button is clicked
document.querySelector('.geo-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords.latitude, position.coords.longitude);
                const { latitude, longitude } = position.coords;
                showDetails.textContent = `The latitude is ${latitude} & longitude is ${longitude}`;
                getCurrentAddress(latitude, longitude);
            },
            (error) => {
                showDetails.textContent = `Error: ${error.message}`;
                console.log(error.message);
            }
        );
    } else {
        showDetails.textContent = "Geolocation is not supported by your browser.";
    }
});

// Reset the details when the reset button is clicked
document.querySelector('.reset-btn').addEventListener('click', resetDetails);
