import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default class IziToastApiService {
  constructor() {}

  showWarningMsg(message) {
    iziToast.warning({
      position: 'topRight',
      // title: 'Увага!',
      message,
    });
  }

  showErrorMsg(message) {
    iziToast.error({
      position: 'topRight',
      // title: 'Помилка!',
      message,
    });
  }

  showInfoMsg(message) {
    iziToast.info({
      position: 'topRight',
      message,
    });
  }
}

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

// export default { showWarningMsg, showErrorMsg, showInfoMsg, MESSAGES };
