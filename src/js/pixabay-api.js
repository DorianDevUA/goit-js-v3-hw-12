import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
// const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43520057-d4110ce2722b475a1deefaa82';

export default class PixabayApiService {
  #query;
  #page;
  #isLastPage;

  constructor() {
    this.#query = '';
    this.#page = 1;
    this.#isLastPage = false;
    this.limit = 50;
  }

  get searchQuery() {
    return this.#query;
  }

  set searchQuery(newQuery) {
    this.#query = newQuery.trim().toLowerCase();
  }

  get isLastPage() {
    return this.#isLastPage;
  }

  set isLastPage(value) {
    this.#isLastPage = value;
  }

  get galleryPage() {
    return this.#page;
  }

  set galleryPage(newPage) {
    this.#page = newPage;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  async fetchImages() {
    const config = {
      method: 'GET',
      params: {
        key: API_KEY,
        q: this.#query,
        page: this.#page,
        per_page: this.limit,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    };

    return axios('', config).then(({ data }) => {
      const totalPages = Math.ceil(data.totalHits / this.limit);
      this.#isLastPage = this.#page >= totalPages;
      console.log('Це остання сторінка?:', this.#isLastPage);

      if (this.#isLastPage) {
        console.log('This is last page. The End!');
        return data.hits;
      }

      this.incrementPage();

      return data.hits;
    });
  }

  // fetchImages() {
  //   const searchParams = new URLSearchParams({
  //     key: API_KEY,
  //     q: this.#query,
  //     page: this.#page,
  //     per_page: this.limit,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: true,
  //   });
  //   const url = `${BASE_URL}?${searchParams}`;

  //   return fetch(url)
  //     .then(resp => {
  //       if (!resp.ok) {
  //         throw new Error(`HTTP error: ${resp.status}`);
  //       }

  //       return resp.json();
  //     })
  //     .then(({ hits, totalHits }) => {
  //       const total = this.#page * this.limit;

  //       if (total >= totalHits) {
  //         this.isLastPage = true;
  //       }

  //       this.incrementPage();

  //       return hits;
  //     });
  // }
}
