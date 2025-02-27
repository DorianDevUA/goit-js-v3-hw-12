import galleryItemTpl from '../templates/galleryItem.hbs';

const galleryContainer = document.querySelector('.js-gallery ul');

export function appendGalleryItems(items) {
  galleryContainer.insertAdjacentHTML('beforeend', galleryItemTpl(items));
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

function getRefs(selector) {
  const refs = {
    gallery: document.querySelector(selector),
  };

  refs.galleryContainer = refs.gallery.querySelector('ul');
}
