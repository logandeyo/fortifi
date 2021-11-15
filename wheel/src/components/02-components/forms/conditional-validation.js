import select from 'dom-select';

const FormsConditionalValidation = (el) => {

  // salesforce form needs `[phone]` field to be required
  // when the leadType==='contractor'

  const ui = {
    el,
    phonefield: select('#phone', el),
    leadtypeSelect: select('.select-lead-type', el)
  };



  const onChange = (ev) => {

    const conditionalTrigger = ui.leadtypeSelect.value.toLowerCase().trim() === 'contractor';

    if (conditionalTrigger) {
      ui.phonefield.setAttribute('required', 'true');
      ui.phonefield.setAttribute('aria-required', 'true');
    }
    else{
      ui.phonefield.removeAttribute('required');
      ui.phonefield.removeAttribute('aria-required');
    }

  };

  if( null !== ui.leadtypeSelect) {
    ui.leadtypeSelect.addEventListener('change', onChange, false);
  }

};

FormsConditionalValidation.initAll = () => {
  select.all('.select-lead-type').map(FormsConditionalValidation);
};

export default FormsConditionalValidation;
