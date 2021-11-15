import select from 'dom-select';

export default(method, selector) => {
  select.all(selector, document)
    .forEach((el) => {
      method(el);
    });
};
