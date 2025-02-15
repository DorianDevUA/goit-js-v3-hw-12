export default function getRefs() {
  return {
    searchForm: document.querySelector('.js-gallery-search-form'),
    galleryContainer: document.querySelector('.js-gallery'),
    galleryGuard: document.querySelector('.js-guard-gallery'),
    loadMoreBtn: document.querySelector('.js-load-more-btn'),
  };
}
