import './css/style.css';
import getRefs from './js/getRefs';
import CustomButton from './js/components/custom-button';
import PixabayApiService from './js/pixabay-api';
import SimpleLightboxServise from './js/utils/simple-lightbox';
import izitoastApi from './js/utils/iziToast-api';
import {
  appendGalleryItems,
  clearGalleryContainer,
} from './js/render-functions';

const refs = getRefs();

const observer = new IntersectionObserver(onLoadMoreObserver, {
  root: null,
  rootMargin: '300px',
  // threshold: 1.0,
});

function onLoadMoreObserver(entries, observer) {
  console.log('entries:', entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onLoadMore();
      console.log('call observer');
    }
  });
}

const pixabayApi = new PixabayApiService();
const imageLightbox = new SimpleLightboxServise();
const gallerySearchBtn = new CustomButton({
  selector: '.js-gallery-search-btn',
  enabledLabel: 'Знайти',
  disabledLabel: 'Пошук',
});
const loadMoreBtn = new CustomButton({
  selector: '.js-load-more-btn',
  enabledLabel: 'Показати ще',
  disabledLabel: 'Завантаження',
  hidden: true,
});

gallerySearchBtn.enable();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const searchQuery = form.elements.query.value.trim();

  if (!searchQuery) {
    izitoastApi.showWarningMsg(izitoastApi.MESSAGES.BAD_REQUEST);
    return;
  }

  pixabayApi.searchQuery = searchQuery;
  resetGallery();

  try {
    await fillGallery();
    imageLightbox.initialize();
    observer.observe(refs.galleryGuard);
  } catch (error) {
    console.log(error);
  }

  gallerySearchBtn.enable();
  form.reset();
}

async function onLoadMore() {
  try {
    await fillGallery();
    imageLightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

async function fillGallery() {
  loadMoreBtn.disable();
  console.log('call fillGullery');

  const images = await pixabayApi.fetchImages();
  const imagesExist = Boolean(images.length);

  if (!imagesExist) {
    izitoastApi.showErrorMsg(izitoastApi.MESSAGES.NOT_FOUND);
    return izitoastApi.MESSAGES.NOT_FOUND;
  }

  appendGalleryItems(images);

  if (pixabayApi.isLastPage) {
    izitoastApi.showInfoMsg(izitoastApi.MESSAGES.END_OF_SEARCH);
    console.log('перед видаленням');
    observer.unobserve(refs.galleryGuard);
    loadMoreBtn.hide();
  } else {
    loadMoreBtn.show();
    loadMoreBtn.enable();
  }
}

function resetGallery() {
  pixabayApi.resetPage();
  pixabayApi.isLastPage = false;
  gallerySearchBtn.disable();
  loadMoreBtn.hide();
  clearGalleryContainer();
}
