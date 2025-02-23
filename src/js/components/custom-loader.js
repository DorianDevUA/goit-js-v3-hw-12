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
    this.refs.loader.hidden = false;
    this.refs.spinner.classList.remove('is-hidden');
    this.refs.label.textContent = 'Loading images, please wait';
  }

  hide() {
    this.refs.loader.hidden = true;
    this.refs.spinner.classList.add('is-hidden');
    this.refs.label.textContent = '';
  }
}
