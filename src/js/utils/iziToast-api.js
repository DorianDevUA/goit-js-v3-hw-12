import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const MESSAGES = {
  BAD_REQUEST: 'Введіть запит у поле для пошуку!',
  NOT_FOUND:
    'Sorry, there are no images matching your search query. Please try again!',
  END_OF_SEARCH: "We're sorry, but you've reached the end of search results.",
};

function showWarningMsg(message) {
  iziToast.warning({
    position: 'topRight',
    // title: 'Увага!',
    message,
  });
}

function showErrorMsg(message) {
  iziToast.error({
    position: 'topRight',
    // title: 'Помилка!',
    message,
  });
}

function showInfoMsg(message) {
  iziToast.info({
    position: 'topRight',
    message,
  });
}

export default { showWarningMsg, showErrorMsg, showInfoMsg, MESSAGES };
