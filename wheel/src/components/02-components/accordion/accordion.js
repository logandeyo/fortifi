import select from 'dom-select';
// import classlist from 'classlist';
import createSetState from '../../../assets/js/lib/createSetState';

const Accordion = (el) => {
  // cache elements
  const ui = {
    el,
    input: select('.accordion__input', el),
    content: select('.accordion__content', el)
  };

  // state
  const state = {
    isChecked: ui.input.checked
  };

  // update state
  const setState = createSetState(state, ({ isUpdating }) => {
    if (isUpdating('isChecked')) {
      ui.content.setAttribute('aria-expanded', state.isChecked);
    }
  });

  // listener callbacks
  const onChange = (ev) => {
    ev.preventDefault();
    setState({ isChecked: !state.isChecked });
  };

  // init universal event listeners
  ui.input.addEventListener('change', onChange, false);
};

Accordion.initAll = () => {
  select.all('.accordion').map(Accordion);
};

export default Accordion;
