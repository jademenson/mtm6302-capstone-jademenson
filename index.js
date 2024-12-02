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


const favoriteData = []
// iterate
favoriteData.map(favorite => {
    //favorite.innerHTML += `<img src='favorite.url' alt=''>`
})

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
        favoritesContainer.classList.remove('d-none')
        // add the data to the favorite data array, then iterate and display all the information
        favoriteData.push(data)
        const favoriteHtml = favoriteData.map(data => {
            
        })
        
    })
}
