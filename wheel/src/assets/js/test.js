// an easier DOM traversing library
import select from 'dom-select';

const test = () => {
  const btn = select('button');

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Huzzah, you can delete me and write your own scripts now!'); // eslint-disable-line
  });
};

export default test;
