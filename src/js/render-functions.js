import galleryItemTpl from '../templates/galleryItem.hbs';
import getRefs from './getRefs';

const refs = getRefs();

export function appendGalleryItems(items) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryItemTpl(items));
}

export function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
