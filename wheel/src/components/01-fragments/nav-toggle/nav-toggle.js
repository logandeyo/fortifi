import select from 'dom-select';

export default(el) => {
  const body = select('body');

  el.addEventListener('click', () => {
    // if login menu's open, body class contains
    // subnav-active *without* nav-active
    // and the menu button is in its active state
    // resetting and toggling then creates odd, unwanted states
    // this is a stop-gap at correcting it
    if (body.classList.contains('subnav-active')) {
      if (body.classList.contains('nav-active')) {
        el.classList.remove('nav-toggle--is-active');
        body.classList.remove('nav-active');
      }
      else {
        el.classList.add('nav-toggle--is-active');
        body.classList.add('nav-active');
      }
    }
    else {
      el.classList.toggle('nav-toggle--is-active');
      body.classList.toggle('nav-active');
    }
  });
};
