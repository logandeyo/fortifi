import 'whatwg-fetch';
import $ from 'jquery';
import formPack from 'form-pack';
import select from 'dom-select';
import validateForm from './validateForm';
import checkStatus from './check-status';

export default(el) => {
  const ui = {
    el,
    fieldsets: select.all('.apply-now-form__fieldset', el),
    nextBtns: select.all('.js-next-pg-button', document),
    prevBtns: select.all('.js-prev-pg-button', el),
    header: select('.global-header'),
    nopeMsg: 'There has been a problem retrieving content. Please try again.'
  };

  const state = {
    isLoading: false,
    curSet: 0
  };


  // used to set scroll position on invalid form hand slap
  const headerHeight = ui.header.offsetHeight;

  // SETUP
  // hide all fieldsets
  const hideSets = () => {
    ui.fieldsets.forEach((set) => {
      set.classList.add('is-hidden');
    });
  };

  // hide a single fieldset
  const hideSet = (int) => {
    ui.fieldsets[int].classList.add('is-hidden');
  };

  // set active fieldset
  const activateSet = (int) => {
    const set = ui.fieldsets[int];
    set.classList.remove('is-hidden');
  };

  // adds/removes spinner from form
  const setLoadingState = () => {
    ui.el.classList[state.isLoading ? 'remove' : 'add']('is-loading');
    state.isLoading = !state.isLoading;

    return state.isLoading;
  };

  // removes sorry message from DOM
  const notSorry = () => {
    const nope = select('.card--nope.error', ui.el);

    if (nope) {
      ui.el.removeChild(nope);
    }
  };

  // prints message to DOM
  const saySorry = (message = ui.nopeMsg) => {
    const nope = document.createElement('p');
    const msg = document.createTextNode(message);
    nope.classList.add('card--nope');
    nope.classList.add('error');
    nope.appendChild(msg);

    notSorry();
    ui.el.appendChild(nope);
  };

  const sayThanks = () => {
    hideSets();
    ui.el.classList.add('form--complete');
  };

  // PAGING
  // useful for moving between pages of form
  const incrementCurSet = () => {
    state.curSet += 1;
    return state.curSet;
  };

  const decrementCurSet = () => {
    if (state.curSet === 0) {
      return state.curSet;
    }

    state.curSet -= 1;
    return state.curSet;
  };

  // scrolls page to top of form
  const scrollIntoView = () => {
    ui.el.scrollIntoView(true, { behavior: 'smooth', block: 'start' });
    window.scrollTo(0, window.scrollY - (headerHeight * 2));
  };

  // fire off event 'hit' to google-analytics
  const analyticTracker = (direction) => {
    if ((null === window.ga) || ('' === window.ga)) { return; } // eslint-disable-line

    window.ga(
      'send',
      'event',
      'test_apply-now', // [eventCategory]
      'test_step-' + direction, // [eventAction]
      'step-' + state.curSet, // [eventLabel]
      state.curSet // [eventValue]
    );
  };

  // this is where most of the functionality fires...
  // handle advancing to next fieldset via next button
  const handleNextClick = (ev) => {
    ev.preventDefault();

    validateForm(ui.el);
    if (!$(ui.el).valid()) { return; }
    analyticTracker('next');


    ui.fieldsets[state.curSet].classList.add('is-valid');

    if (!isNaN(ev.target.dataset.skipToStep)) {
      hideSet(state.curSet);
      state.curSet = parseInt(ev.target.dataset.skipToStep, 10);
      activateSet(state.curSet);
      scrollIntoView();
    } else {
      hideSet(state.curSet);
      incrementCurSet();
      activateSet(state.curSet);
      scrollIntoView();
    }
  };

  // handle going back to previous page
  const handlePrevClick = (ev) => {
    ev.preventDefault();

    // this should never happen, but better safe than dead
    if (state.curSet === 0) {
      return;
    }
    analyticTracker("prev");

    if (ev.target.dataset.skipToStep) {
      hideSet(state.curSet);
      state.curSet = parseInt(ev.target.dataset.skipToStep, 10);
      activateSet(state.curSet);
      scrollIntoView();
    } else {
      hideSet(state.curSet);
      decrementCurSet();
      activateSet(state.curSet);
      scrollIntoView();
    }
  };

  const handleSubmit = () => {
    const url = ui.el.dataset.postUrl;
    const data = formPack(ui.el, { urlencoded: true });

    // ensure final step is validated too
    validateForm(ui.el);
    if (!$(ui.el).valid()) { return; }


    setLoadingState();


  };

  // bind events to next/prev paging buttons
  const setBindings = () => {
    ui.nextBtns.forEach((btn) => {
      btn.addEventListener('click', handleNextClick);
      btn.addEventListener('touchstart', handleNextClick);
    });

    ui.prevBtns.forEach((btn) => {
      btn.addEventListener('click', handlePrevClick);
      btn.addEventListener('touchstart', handlePrevClick);
    });

    ui.el.addEventListener('submit', handleSubmit);
  };

  // kick it off
  const initMultiStep = () => {
    console.log(ui.fieldsets);
    hideSets();
    activateSet(state.curSet);
    validateForm(ui.el);
    setBindings();
  };

  initMultiStep();
};
