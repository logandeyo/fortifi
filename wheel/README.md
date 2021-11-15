# Wheel

[Turn](https://turnwith.us/)’s standard, stand-alone front-end setup. Includes support for a [Fractal](http://fractal.build/) component library, [PostCSS](http://postcss.org/)-processed style generation, [Babel](https://babeljs.io/)-transpiled ES6+ JavaScript capabilities, and all the other standard goodies of a modern front-end boilerplate.

## Getting started

### tl;dr
`npm i && npm run dev`

### Requirements
1. [Node](https://nodejs.org/) 6.11.3 or greater
2. **Optional:** an IDE or text editor that has [.editorconfig](http://editorconfig.org/) support

### First time setup

1. clone this repository by running `git clone git@github.com:turnwithus/wheel.git name-of-your-project-folder-here`
2. navigate into the  directory where you cloned it: `cd name-of-your-project-folder-here`
3. set up a new remote repository on, say, [GitHub](https://github.com/new/), since you’re here already, then copy the resulting `git://` url for that new repo
4. replace _this_ repo with _your new repo_ as the `remote origin` for your project: `git remote set-url git://your.new.repo.url.here`
5. run `npm i` to install necessary dependencies; this might take a little bit, especially on a fresh install
6. run `npm run dev` to get your development environment up and running
7. if you’re watching your terminal, you’ll see a linting warning in that initial build due to an intentional `console.log()` in `src/assets/js/index.js`—you should probably fix that before you get started 🤓

### Primary scripts
Script | Description
--- | ---
dev | Starts the Fractal dev server (with Browsersync) at `localhost:3000`, sets up a continuous watch (linting & compiling) of CSS and JavaScript files, and copies any image files to the necessary disk location as needed.
build | Compiles the Fractal style guide down to static HTML, lints, compiles, and minifies CSS and JavaScript, and minifies image files.
start | Starts static server pointed at `npm run build` static output location.

### Individually defined scripts
_Each of these can be run individually (`npm run {name of script}`), but are also included where required in one of the three primary scripts defined above. They may prove useful on their own for debugging purposes, however._

Script | Description
--- | ---
clean | deletes the contents of `public`; runs once as the first task on both `start` and `build`
css | processes all `.css` files in  `/src/assets/css` using the PostCSS config found at `postcss.config.js`
css:prod | processes all `.css` files in  `/src/assets/css` using the PostCSS config found at `postcss.config.prod.js`
fractal:start | starts the Fractal dev server with Browsersync for live reloading across clients
fractal:static | builds and exports a static HTML version of the Fractal style guide
img | copies all `.jpg`, `.png`, `.svg`, & `.gif` files in `/src/assets/images` to `/public/images`
img:prod | minifies and copies all `.jpg`, `.png`, `.svg`, & `.gif` files in `/src/assets/images` to `/public/images`
js | transpiles all `.js` files in `/src/assets/js` using the Babel presets in `.babelrc`, outputting them to `/pubic/js` along with source maps
js:prod | same as `js` without the source maps and with minified output
lint:css | runs authored CSS through `stylelint` rules set in `.stylelintrc`
lint:js | runs authored JavaScript through ESLint rules set in `.eslintrc`
