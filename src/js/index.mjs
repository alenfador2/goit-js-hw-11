import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  '41281960-4f851dde922e1c31c346e4445';

const gallery = document.querySelector('.gallery');
const searchButton = document.querySelector('.search-btn');
const input = document.querySelector('input[type="text"]');
const baseUrl = 'https://pixabay.com/api/';

const headers = new Headers({
  'Content-Type': 'application/json',
  'X-Custom-Header': 'custom value',
  'Access-Control-Allow-Origin': '*',
});
const options = {
  params: {
    key: '41281960-4f851dde922e1c31c346e4445',
    q: input.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
};

const fetchImg = async (baseUrl, options) => {
  try {
    const response = await axios.get(baseUrl, options);
    const photos = await response.data;
    console.log(photos);
    return photos;
  } catch (error) {
    console.error(error);
  }
};

searchButton.addEventListener('click', ev => {
  ev.preventDefault();
  options.params.q = input.value;
  fetchImg(baseUrl, options);
});
