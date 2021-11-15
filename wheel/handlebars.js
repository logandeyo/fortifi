const helpers = require('handlebars-helpers');

module.exports = (handlebars) => {
  helpers({ handlebars });

  handlebars.registerHelper('joinclass', (...args) => (
    new handlebars.SafeString(`${args.slice(0, -1).filter((a) => a).join(' ')}`)
  ));

  handlebars.registerHelper('classlist', (...args) => (
    new handlebars.SafeString(` class="${args.slice(0, -1).filter((a) => a).join(' ')}"`)
  ));

  handlebars.registerHelper('classname', (...args) => (
    args.slice(0, -1).filter((a) => a).join('')
  ));

  handlebars.registerHelper('terinary', function terinary(test, a, ...args) {
    const b = args.length > 1 ? args[0] : '';
    return (typeof test === 'function' ? test.call(this) : test) ? a : b;
  });
};
