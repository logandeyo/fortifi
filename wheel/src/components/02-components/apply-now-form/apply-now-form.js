import select from 'dom-select';
import A11yDialog from 'a11y-dialog';
// import $ from 'jquery';
// import validateForm from '../../../assets/js/forms/validateForm';

const ApplyNow = (el) => {
  // cache elements
  const ui = {
    el,
    step0: select('#apply-now-form__00'),
    stateField: select('.apply-now__state-select'),
    ownersField: select('.apply-now__owners', el),
    submit02: select('.apply-now__submit-02'),
    submit02a: select('.apply-now__submit-02a'),
    form2a: select('#apply-now-form__02a', el),
    submit00: select('.apply-now__submit-00'),
    californiaModals: select.all('.modal-california', el),
    floridaModals: select.all('.modal-florida', el),
    statedSource: select("[id='00N5G00000VL3Li']"),
    statedSourceConditionalsSalesRep: select('.stated-source-conditionals__sales-rep'),
    statedSourceConditionalsContractorName: select('.stated-source-conditionals__contractor-name')
  };

  const fields = {
    firstName1: ui.el.querySelector("[id='first_name']"),
    lastName1: ui.el.querySelector("[id='last_name']"),
    ssn1: ui.el.querySelector("[id='00N5G00000VL3LQ']"),
    dob1: ui.el.querySelector("[id='00N5G00000VL3LM']"),
    annualincome1: ui.el.querySelector("[id='00N5G00000VL3LL']"),
    email1: ui.el.querySelector("[id='email']"),
    phone1: ui.el.querySelector("[id='phone']"),
    firstName2: ui.el.querySelector("[id='00N5G00000VL3LU']"),
    lastName2: ui.el.querySelector("[id='00N5G00000VL3LW']"),
    ssn2: ui.el.querySelector("[id='00N5G00000VL3La']"),
    dob2: ui.el.querySelector("[id='00N5G00000VL3LS']"),
    annualincome2: ui.el.querySelector("[id='00N5G00000VL3LR']"),
    email2: ui.el.querySelector("[id='00N5G00000VL3LT']"),
    phone2: ui.el.querySelector("[id='00N5G00000VL3LY']")
  };

  const populateSummary = () => {
    Object.values(fields).forEach((node) => {
      const { value } = node;
      const { id } = node;

      const target = ui.el.querySelector(`#value-of-${id}`);
      if (target) target.innerHTML = value;
    });
  };

  const handleSubmit00Click = (ev) => {
    setTimeout(() => {
      if (ui.stateField.value === 'CA' && ui.step0.classList.contains('is-valid')) {
        modalsCalifornia[0].show();
        ui.californiaModals[0].classList.remove('is-hidden');
        ui.californiaModals[0].setAttribute('aria-hidden', false);
      }
      if (ui.stateField.value === 'FL' && ui.step0.classList.contains('is-valid')) {
        modalsFlorida[0].show();
        ui.floridaModals[0].classList.remove('is-hidden');
        ui.floridaModals[0].setAttribute('aria-hidden', false);
      }
    }, 100);
  }

  const handleSubmit02Click = (ev) => {
    const owner2fields = select.all('.apply-now__second-owner', ui.el);
    if (ui.ownersField.value === '1 Property Owner') {
      owner2fields.forEach((field) => {
        field.classList.add('is-hidden');
      });
    } else {
      owner2fields.forEach((field) => {
        field.classList.remove('is-hidden');
      });
    }
  }

  const handleNextCaliforniaClick = (i, elementCalifornia, modal) => {
    console.log(i, elementCalifornia, modal);

    modalsCalifornia[i] = elementCalifornia;
    const formCalifornia = select('.modal__footer', modal);

    setTimeout(() => {
      if (formCalifornia.classList.contains('is-valid')) {
        if (modalsCalifornia[i + 1]) {
          modalsCalifornia[i + 1].show();
          ui.californiaModals[i + 1].classList.remove('is-hidden');
          ui.californiaModals[i + 1].setAttribute('aria-hidden', false);
        }

        ui.californiaModals[i].classList.add('is-hidden');
      }
    }, 200); //setTimeout
  };

  const modalsCalifornia = [];
  const modalsFlorida = [];

  const initModals = () => {
    // CALIFORNIA
    ui.californiaModals.forEach((modal, i) => {
      const elementCalifornia = new A11yDialog(modal);
      modalsCalifornia[i] = elementCalifornia;

      const nextCalifornia = select('.modal__cta', modal);
      const formCalifornia = select('.modal__footer', modal);

      /* all DRYed up, sorr */
      nextCalifornia.addEventListener('click', () => {
        setTimeout(() => {
          if (formCalifornia.classList.contains('is-valid')) {
            if (modalsCalifornia[i + 1]) {
              modalsCalifornia[i + 1].show();
              ui.californiaModals[i + 1].classList.remove('is-hidden');
              ui.californiaModals[i + 1].setAttribute('aria-hidden', false);
            }

            ui.californiaModals[i].classList.add('is-hidden');
          }
        }, 100);
      });

      nextCalifornia.addEventListener('touchstart', () => {
        setTimeout(() => {
          if (formCalifornia.classList.contains('is-valid')) {
            if (modalsCalifornia[i + 1]) {
              modalsCalifornia[i + 1].show();
              ui.californiaModals[i + 1].classList.remove('is-hidden');
              ui.californiaModals[i + 1].setAttribute('aria-hidden', false);
            }

            ui.californiaModals[i].classList.add('is-hidden');
          }
        }, 100);
      });

    });
    // FLORIDA
    ui.floridaModals.forEach((modal, i) => {
      const elementFlorida = new A11yDialog(modal);
      modalsFlorida[i] = elementFlorida;

      const nextFlorida = select('.modal__cta', modal);
      const formFlorida = select('.modal__footer', modal);

      nextFlorida.addEventListener('click', () => {
        setTimeout(() => {
          if (formFlorida.classList.contains('is-valid')) {
            if (modalsFlorida[i + 1]) {
              modalsFlorida[i + 1].show();
              ui.floridaModals[i + 1].classList.remove('is-hidden');
              ui.floridaModals[i + 1].setAttribute('aria-hidden', false);
            }

            ui.floridaModals[i].classList.add('is-hidden');
          }
        }, 100);
      });
      nextFlorida.addEventListener('touchstart', () => {
        setTimeout(() => {
          if (formFlorida.classList.contains('is-valid')) {
            if (modalsFlorida[i + 1]) {
              modalsFlorida[i + 1].show();
              ui.floridaModals[i + 1].classList.remove('is-hidden');
              ui.floridaModals[i + 1].setAttribute('aria-hidden', false);
            }

            ui.floridaModals[i].classList.add('is-hidden');
          }
        }, 100);
      });

    });
  };

  const addEventListeners = () => {
    ui.statedSource.addEventListener('change', () => {
      setTimeout(() => {
        if (ui.statedSource.value === 'FortiFi Sales Rep') {
          ui.statedSourceConditionalsSalesRep.classList.remove('is-hidden');
          ui.statedSourceConditionalsSalesRep.setAttribute('aria-hidden', false);
          ui.statedSourceConditionalsContractorName.classList.add('is-hidden');
          ui.statedSourceConditionalsContractorName.setAttribute('aria-hidden', true);
        } else if (ui.statedSource.value === 'Contractor') {
          ui.statedSourceConditionalsSalesRep.classList.add('is-hidden');
          ui.statedSourceConditionalsSalesRep.setAttribute('aria-hidden', true);
          ui.statedSourceConditionalsContractorName.classList.remove('is-hidden');
          ui.statedSourceConditionalsContractorName.setAttribute('aria-hidden', false);
        } else {
          ui.statedSourceConditionalsSalesRep.classList.add('is-hidden');
          ui.statedSourceConditionalsSalesRep.setAttribute('aria-hidden', true);
          ui.statedSourceConditionalsContractorName.classList.add('is-hidden');
          ui.statedSourceConditionalsContractorName.setAttribute('aria-hidden', true);
        }
      }, 100);
    });

    ui.stateField.addEventListener('change', () => {
      if (ui.stateField.value === 'CA') {
        ui.submit00.removeAttribute('data-skip-to-step');
        ui.submit00.classList.add('ca-flow');
      } else if (ui.stateField.value === 'FL') {
        ui.submit00.removeAttribute('data-skip-to-step');
        ui.submit00.classList.add('fl-flow');
        ui.submit00.setAttribute('data-skip-to-step', 9);
      } else {
        ui.submit00.classList.remove('ca-flow');
        ui.submit00.classList.remove('fl-flow');
        ui.submit00.setAttribute('data-skip-to-step', 14);
      }
    });

    ui.submit02.addEventListener('click', handleSubmit02Click);
    ui.submit02.addEventListener('touchstart', handleSubmit02Click);

    ui.submit02a.addEventListener('click', populateSummary);
    ui.submit02a.addEventListener('touchstart', populateSummary);

    ui.submit00.addEventListener('click', handleSubmit00Click);
    ui.submit00.addEventListener('touchstart', handleSubmit00Click);
  };

  const init = () => {
    if (null === ui.step0) { // Dave isn't here, man.
      console.log('no step 0');
      return; // NO need to init anything, no apply-now form on this page: bail!
    }

    addEventListeners();
    initModals();

    setTimeout(() => {
      if (ui.stateField.value === 'CA') {
        ui.submit00.setAttribute('data-skip-to-step', 1);
        ui.submit00.classList.add('ca-flow');
      } else if (ui.stateField.value === 'FL') {
        ui.submit00.setAttribute('data-skip-to-step', 9);
        ui.submit00.classList.add('fl-flow');
      } else {
        ui.submit00.classList.remove('ca-flow');
        ui.submit00.classList.remove('fl-flow');
        ui.submit00.setAttribute('data-skip-to-step', 14);
      }
    }, 200);
  };

  init();
};

ApplyNow.initAll = () => {
  select.all('.apply-now-form').map(ApplyNow);
};

export default ApplyNow;
