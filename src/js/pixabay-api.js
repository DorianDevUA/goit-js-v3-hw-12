import axios from 'axios';

const API_KEY = '43520057-d4110ce2722b475a1deefaa82';
axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default class PixabayApiService {
  #query;
  #page;
  #limit;
  #totalPages;
  #isLastPage;

  constructor({ limit = 20 } = {}) {
    this.#query = '';
    this.#page = 1;
    this.#limit = limit;
    this.#totalPages = 1;
    this.#isLastPage = false;
  }

  get searchQuery() {
    return this.#query;
  }

  set searchQuery(newQuery) {
    this.#query = newQuery.trim().toLowerCase();
  }

  get totalPages() {
    return this.#totalPages;
  }

  get isLastPage() {
    return this.#isLastPage;
  }

  incrementPage() {
    this.#page += 1;
  }

  reset() {
    this.#page = 1;
    this.#totalPages = 1;
    this.#isLastPage = false;
  }

  async fetchImages() {
    const config = {
      method: 'GET',
      params: {
        key: API_KEY,
        q: this.#query,
        page: this.#page,
        per_page: this.#limit,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    };

    const {
      data: { totalHits, hits: images },
    } = await axios('/', config);

    this.incrementPage();

    this.#totalPages = Math.ceil(totalHits / this.#limit);
    this.#isLastPage = this.#page > this.#totalPages;

    return images;
  }
}
