# machinodymium

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)



## Develop

#### Prerequisites

* `node >= v4.0.0` ([download here](http://nodejs.org))

* `webpack` ([download here](https://github.com/webpack/webpack))

* Follow [JavaScript Standard Style](https://github.com/feross/standard) and use a [text editor plugin](https://github.com/feross/standard#text-editor-plugins)

#### Install dependencies

```
$ npm install
```
*(Yeoman should have done this for you)*


##### A note about webpack

We use webpack to manage dependencies loading through the app. Basically, it compiles them all into one `bundle.js` file and handle the `require([module])` stuffs. This means we **exclusively** use `npm` to manage our external dependencies.

Webpack does not only manage `js` modules, but also `css` stylesheets and all the app assets (images, videos, `json` datas, ...). It can be a bit confusing at first to load your stylesheets with a `require('../styles/main.css')` (cf. [entry script](src/entry.js)) instead of a good old `<link>` tag, but it keeps the workflow clean. This also mean we load assets in `js`.

Instead of doing:
```html
<img src="assets/my-img.png" />
```
You do:
```html
<img class="img-selector" />
```
```js
  document.querySelector('img-selector').src = require('../assets/my-img.png')

```

*the css loader will do this for you, so you can just load your assets with `background: url(../my/image.png);` for example. Just use its absolute path.*

Finally, webpack itself is modular and you can add many [loaders](https://webpack.github.io/docs/loaders.html) to handle what you need to handle. Just `npm i --save` the ones you need.

[This howto](https://github.com/petehunt/webpack-howto) also explains a lot of useful things.
[This page](https://github.com/webpack/docs/wiki/shimming-modules) also.

*If you find a good read about how to properly load assets with webpack, we'd really like to take a look !*


#### Run

##### In the browser

```
$ gulp dev
```








## License

MIT © hugohil
