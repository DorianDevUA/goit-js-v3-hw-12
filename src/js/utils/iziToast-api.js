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
