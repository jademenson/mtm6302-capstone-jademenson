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

//Get APOD data for a selected date
async function fetchApod(date) {
    try {
        const response = await fetch(`${BASE_URL}&date=${date}`);
        const data = await response.json();
