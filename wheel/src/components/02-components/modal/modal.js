import A11yDialog from 'a11y-dialog';
import select from 'dom-select';

const Modal = (el) => {
  const ui = {
    el,
    close: select('.modal__close', el),
    next: select('.modal__cta:not(.modal__cta--consent)', el),
    overlay: select('.modal__overlay', el)
  };

  const { id } = el;

  const dialog = new A11yDialog(el);

  const addEvents = () => {
    if (ui.toggle !== null) {
      ui.toggle.addEventListener('click', () => {
        // console.log('fuck chasing this shit', ui.el);
        dialog.show();
        ui.el.classList.remove('is-hidden');
      });
    }

    ui.close.addEventListener('click', () => {
      dialog.hide();
      ui.el.classList.add('is-hidden');
    });

    // if (ui.next) {
    //   ui.next.addEventListener('click', () => {
    //     dialog.hide();
    //     ui.el.classList.add('is-hidden');
    //   });
    // }

    ui.overlay.addEventListener('click', () => {
      dialog.hide();
      ui.el.classList.add('is-hidden');
    });
  };

  const init = () => {
    ui.toggle = document.querySelector(`#opens--${id}`);
    addEvents();
  };

  init();
};

Modal.initAll = () => {
  select.all('.modal').map(Modal);
};

export default Modal;
