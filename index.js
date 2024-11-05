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