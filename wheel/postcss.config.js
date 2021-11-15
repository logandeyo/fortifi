const mixins = require('postcss-mixins');
const importer = require('postcss-easy-import');
const extend = require('postcss-extend');
const cssnext = require('postcss-cssnext');
const nested = require('postcss-nested');
const discardEmpty = require('postcss-discard-empty');
const mqPacker = require('css-mqpacker');
const removeRoot = require('postcss-remove-root');
const reporter = require('postcss-reporter');
const responsiveType = require('postcss-responsive-type');
const pseudoContent = require('postcss-pseudo-content-insert');

module.exports = {
  plugins: [
    mixins(),
    importer(),
    extend(),
    responsiveType(),
    pseudoContent(),
    cssnext({
      features: {
        nesting: false
      }
    }),
    nested(),
    discardEmpty(),
    mqPacker({
      sort: true
    }),
    removeRoot(),
    reporter()
  ],
  watch: true
};
