export default class CustomButton {
  constructor({ selector, enabledLabel, disabledLabel, hidden = false }) {
    this.refs = this.getRefs(selector);
    this.enabledLabel = enabledLabel;
    this.disabledLabel = disabledLabel;

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.custom-btn-label');
    refs.spinner = refs.button.querySelector('.custom-btn-spinner');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = this.enabledLabel;
    this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = this.disabledLabel;
    this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
