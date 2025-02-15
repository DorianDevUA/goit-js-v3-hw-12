import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class SimpleLightboxServise {
  constructor() {
    this.lightbox = null;
  }

  initialize() {
    const largeImageLink = '.js-gallery a';
    const options = {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    };

    this.lightbox = new SimpleLightbox(largeImageLink, options);
  }

  refresh() {
    this.lightbox.refresh();
  }
}
