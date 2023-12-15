import axios from 'axios';
import Notiflix from 'notiflix';

const gallery = document.querySelector('.gallery');
const searchButton = document.querySelector('.search-btn');
const input = document.querySelector('input[type="text"]');
const baseUrl = 'https://pixabay.com/api/';

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
    const data = response.data;
    console.log(data);
    const hits = data.hits;
    const galleryItem = hits.map(item => {
      return `<div class="photo-card">
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" class = "image"/>
            <div class="info">
              <p class="info-item">
                <b>Likes: ${item.likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${item.views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${item.comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${item.downloads}</b>
              </p>
            </div>
          </div>`;
    });
    gallery.insertAdjacentHTML('afterbegin', galleryItem.join(''));
  } catch (error) {
    console.error(error);
  }
};

searchButton.addEventListener('click', ev => {
  ev.preventDefault();
  options.params.q = input.value;
  gallery.innerHTML = '';
  fetchImg(baseUrl, options);
});
