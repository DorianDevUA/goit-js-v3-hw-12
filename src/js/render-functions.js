import galleryItemTpl from '../templates/galleryItem.hbs';

const galleryContainer = document.querySelector('.js-gallery');

export function appendGalleryItems(items) {
  galleryContainer.insertAdjacentHTML('beforeend', galleryItemTpl(items));
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}
