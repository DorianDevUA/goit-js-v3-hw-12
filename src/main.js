import './css/style.css';
import SearchButton from './js/components/search-button';
import PixabayApiService from './js/pixabay-api';
import SimpleLightboxServise from './js/utils/simple-lightbox';
import IziToastApiService from './js/utils/iziToast-api';
import { appendGalleryItems, clearGallery } from './js/render-functions';
import CustomLoader from './js/components/page-loader';

const refs = {
  searchForm: document.querySelector('.js-gallery-search-form'),
  galleryObserverGuard: document.querySelector('.js-guard-gallery'),
};

const messages = {
  badRequest: 'Введіть запит у поле для пошуку!',
  notFound: 'Нічого не знайдено. Спробуйте щось інше!',
  endOfSearch: 'Вибачте, але ви досягли кінця результатів пошуку',
};

const pixabayApi = new PixabayApiService({ limit: 40 });
const iziToastApi = new IziToastApiService();
const imageLightbox = new SimpleLightboxServise();
const loader = new CustomLoader({ selector: '.js-loader', hidden: true });

const observer = new IntersectionObserver(onLoadMore, {
  root: null,
  rootMargin: '300px',
});

const obsTarget = refs.galleryObserverGuard;

const gallerySearchBtn = new SearchButton({
  selector: '.js-gallery-search-btn',
  enabledLabel: 'Знайти',
  disabledLabel: 'Пошук',
  hidden: false,
});
gallerySearchBtn.enable();

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const searchQuery = form.elements.query.value.trim();

  if (!searchQuery) {
    iziToastApi.showWarningMsg(messages.badRequest);
    return;
  }

  clearGallery();
  pixabayApi.reset();
  observer.unobserve(obsTarget);
  gallerySearchBtn.disable();
  loader.show();
  pixabayApi.searchQuery = searchQuery;

  try {
    const images = await pixabayApi.fetchImages();

    if (images.length) {
      appendGalleryItems(images);
      imageLightbox.initialize();
      refs.galleryItem = document.querySelector('.js-gallery li');

      if (!pixabayApi.isLastPage) {
        observer.observe(obsTarget);
      } else {
        iziToastApi.showInfoMsg(messages.endOfSearch);
      }
    } else {
      iziToastApi.showErrorMsg(messages.notFound);
    }
  } catch (error) {
    console.log(error.message);
  }

  loader.hide();
  gallerySearchBtn.enable();

  form.reset();
}

function onLoadMore(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      observer.unobserve(obsTarget);
      loader.show();

      try {
        const images = await pixabayApi.fetchImages();
        appendGalleryItems(images);
        imageLightbox.refresh();

        // page scrolling
        const { height: cardHeight } = refs.galleryItem.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });

        if (!pixabayApi.isLastPage) {
          observer.observe(obsTarget);
        } else {
          iziToastApi.showInfoMsg(messages.endOfSearch);
        }
      } catch (error) {
        console.log(error.message);
      }
      loader.hide();
    }
  });
}
