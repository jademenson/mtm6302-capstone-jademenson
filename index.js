//NASA API Key
const API_KEY = '9gayPwfvFr2pwEBUfIVLGHCZy1NQtNMwF9l1FeLm';
const BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

//DOM Elements
const dateform = document.getElementById('date-form');
const apodDateInput =  document.getElementById('apod-date');
const apodDisplaySection = document.getElementById('apod-display-section');
const apodImage = document.getElementById('apod-image');
const apodTitle = document.getElementById('apod-title');
const apodDateDisplay = document.getElementById('apod-date-display');
const apodExplanation = document.getElementById('apod-explanation');
const addFavoriteBtn = document.getElementById('add-favorite-btn');
const favoritesContainer = document.getElementById('favorites-container');
const hdApodImageModal = new bootstrap.Modal(document.getElementById('hdImageModal'));
const hdApodImage = document.getElementById('hd-apod-image');


// Initialize an array to store favorite items
let favoriteData = [];

//Initialize max date for the date input (today's date)
apodDateInput.max = new Date().toISOString().split('T')[0];

//Event listener for date form submission
dateform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const date =apodDateInput.ariaValueMax;
    if (date) {
        await fetchApod(date);
    }
});

const dateInputBox = document.getElementById('apod-date')
const datePicker = document.getElementById('get-date-btn')
const imgContainer = document.getElementById('img-container')

datePicker.addEventListener('click', function () {
    const dateSelected = dateInputBox.value
    fetchData(dateSelected)
})

async function fetchData(date) {
    const response = await fetch(`${BASE_URL}&date=${date}`)
    const data = await response.json()
    console.log(data)
    imgContainer.src = data.url
    apodTitle.textContent = data.title

    addFavoriteBtn.addEventListener('click', function() {
        console.log('the btn was clicked')
        favoritesContainer.classList.remove('d-none')
        // add the data to the favorite data array, then iterate and display all the information
        addToFavorites(data)

    })
}


// Display the APOD data on the page
function displayApod(data) {
    imgContainer.src = data.url;
    imgContainer.alt = data.title;
    apodTitle.textContent = data.title;
    apodDateDisplay.textContent = data.date;
    apodExplanation.textContent = data.explanation;
    imgContainer.addEventListener('click', () => {
        hdApodImage.src = data.hdurl || data.url;
        hdApodImageModal.show();
    });
        // Enable the "Add to Favorites" button
        // addFavoriteBtn.addEventListener('click', function() {
        //     favoritesContainer.classList.remove('d-none')
        //     // add the data to the favorite data array, then iterate and display all the information
        //     addToFavorites(data)

        // })
        // addFavoriteBtn.onclick = () => addToFavorites(data);
    }
  
    
// Add the current APOD data to favorites
function addToFavorites(data) {
    console.log('before add favorites', favoriteData)
    // Check if the item already exists in favorites
    if (favoriteData.some((favorite) => favorite.date === data.date)) {
            alert('This item is already in your favorites!');
            return;
        } else {
    
    // if (favoriteData.some((favorite) => favorite.date === data.date)) {
    //     alert('This item is already in your favorites!');
    //     return;
    // }

     // Add the item to the favorites array
     favoriteData.push(data);
     console.log("updated favorite data:", favoriteData)
     updateFavorites();
        }
}    

    // Update the favorites section with the current favorites
function updateFavorites() {
    // Clear the current favorites display
    favoritesContainer.innerHTML = '';

    // Iterate through favoriteData to create cards for each favorite item
    favoriteData.forEach((favorite) => {
        const favoriteCard = document.createElement('div');
        favoriteCard.classList.add('col', 'card', 'text-center');
        favoriteCard.style.width = '18rem';
        favoriteCard.innerHTML = `
            <img src="${favorite.url}" class="card-img-top" alt="${favorite.title}">
            <div class="card-body">
                <h5 class="card-title">${favorite.title}</h5>
                <p class="card-text"><small class="text-muted">${favorite.date}</small></p>
                <button class="btn btn-danger" onclick="removeFromFavorites('${favorite.date}')">Remove</button>
            </div>
        `;
        favoritesContainer.appendChild(favoriteCard);
    });
}

// Remove a favorite by date
function removeFromFavorites(date) {
    favoriteData = favoriteData.filter((favorite) => favorite.date !== date);
    saveFavorites();
    updateFavorites();
}

//Initialize app
loadFavorites();