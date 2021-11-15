import select from 'dom-select';
import Cookies from 'js-cookie';

const AlertModal = (el) => {
  const ui = {
    el,
    close: select('.alert-modal__close', el),
    presslink: select('.alert-modal__press-link', el)
  };

  const readCookie = () => {
    const value = Cookies.get('fortifi-alert-cookie');

    if (!value) {
      ui.el.classList.remove('is-hidden');
      document.body.classList.add('is-locked');
    }
  }

  const addEvents = () => {
    ui.close.addEventListener('click', () => {
      Cookies.set('fortifi-alert-cookie', true);
      document.body.classList.remove('is-locked');
      ui.el.classList.add('is-hidden');
    });

    ui.presslink.addEventListener('click', () => {
      Cookies.set('fortifi-alert-cookie', true);
      document.body.classList.remove('is-locked');
      ui.el.classList.add('is-hidden');
    });
  };

  const init = () => {
    readCookie();
    addEvents();
  }

  init();
};

export default AlertModal;
