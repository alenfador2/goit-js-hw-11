import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const searchButton = document.querySelector('.search-btn');
const input = document.querySelector('input[type="text"]');
const baseUrl = 'https://pixabay.com/api/';

let page = 1;
const perPage = 40;
let button;
var lightbox = new SimpleLightbox('.image a', {});
const options = {
  params: {
    key: '41281960-4f851dde922e1c31c346e4445',
    q: input.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  },
};
const fetchPosts = async (baseUrl, options) => {
  try {
    const response = await axios.get(baseUrl, options);
    const data = response.data;
    console.log(data);
    const totalHits = data.totalHits;
    const hits = data.hits;
    if (hits.length === 0) {
      Notiflix.Report.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      const galleryItem = hits.map(item => {
        return `<div class="photo-card">
            <a class = "ancor" href = "${item.previewURL}"><img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" class = "image"/></a>
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
      gallery.insertAdjacentHTML('beforeend', galleryItem.join(''));
    }
    if (totalHits > page * perPage) {
      addMoreButton();
    }
  } catch (error) {
    console.error(error);
  }
};

function addMoreButton() {
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.classList.add('load-more');
    button.textContent = 'Load more';
    gallery.append(button);
  } else {
    button.remove();
    button.textContent = 'Fetch more posts';
    gallery.append(button);
  }

  button.addEventListener('click', async () => {
    try {
      page += 1;
      options.params.page = page;
      lightbox.refresh();
      await fetchPosts(baseUrl, options);
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      if (totalHits <= page * perPage) {
        button.remove();
        button.style.display = 'none';
      }
    } catch (error) {
      console.log(error);
    }
  });
}

searchButton.addEventListener('click', ev => {
  ev.preventDefault();
  options.params.q = input.value;
  gallery.innerHTML = '';
  page = 1;
  fetchPosts(baseUrl, options);
});
