export default class SearchButton {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.search-btn-label');
    refs.spinner = refs.button.querySelector('.search-btn-spinner');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Знайти';
    this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Пошук';
    this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
