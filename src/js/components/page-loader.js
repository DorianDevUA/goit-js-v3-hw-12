export default class CustomLoader {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.loader = document.querySelector(selector);
    refs.label = refs.loader.querySelector('.label');
    refs.spinner = refs.loader.querySelector('.spinner');

    return refs;
  }

  show() {
    this.refs.loader.classList.remove('visually-hidden');
  }

  hide() {
    this.refs.loader.classList.add('visually-hidden');
  }
}
