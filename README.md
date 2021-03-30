# Webpack Const Reassignment

Minimal reproduction for build issue with re-assigning a const variable

first, install deps and build
```bash
npm ci
./node_modules/.bin/webpack --config webpack.config.js --progress
```

then, run `tail -n 10 dist/empty_component.bundle.js` - at the bottom of the file, the following lines are rendered:
```js
/* harmony default export */ const empty_component = (component.exports);
empty_component = __webpack_exports__.default;
```

If you load / serve this to a browser (run `python -m http.server 8888` and open `http://localhost:8888/index.html`), this throws the following error:
```
Uncaught TypeError: invalid assignment to const 'empty_component'
```
