'use strict';

/* Create & export a new Fractal instance */
const fractal = module.exports = require('@frctl/fractal').create();

/* Customize the default theme */
const mandelbrot = require('@frctl/mandelbrot');
const turnTheme = mandelbrot({
    skin: 'black'
});

/* Custom handlebars helpers */
const installHelpers = require('./handlebars');
const hbs = require('@frctl/handlebars')();
const { handlebars } = fractal.components.engine(hbs);

installHelpers(handlebars);

/* Set the project metadata */
fractal.set('project.title', 'Turn Component Library');
fractal.set('project.version', '1.0');
fractal.set('project.author', 'Turn');

/* Tell Fractal where the components will live & what layout to use */
fractal.components.set('path', __dirname + '/src/components');
fractal.components.set('default.preview', '@preview');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

/* Tell Fractal where static assets will live */
fractal.web.set('static.path', __dirname + '/public');

/* Tell Fractal where to put its static build */
fractal.web.set('builder.dest', __dirname + '/static');

/* Load in customized theme */
fractal.web.theme(turnTheme);
