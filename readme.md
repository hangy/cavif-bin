# cavif-bin [![Build Status](https://travis-ci.org/hangy/cavif-bin.svg?branch=master)](https://travis-ci.org/hangy/cavif-bin)

> [AVIF](https://aomediacodec.github.io/av1-avif/) is a new image format that provides lossless and lossy compression for images on the web.

You probably want [`imagemin-avif`](https://github.com/imagemin/imagemin-avif) instead.


## Install

```
$ npm install cavif-bin
```


## Usage

```js
const {execFile} = require('child_process');
const cavif = require('cavif-bin');

execFile(cavif, ['input.png', '-o', 'output.avif'], err => {
	if (err) {
		throw err;
	}

	console.log('Image is converted!');
});
```


## CLI

```
$ npm install --global cavif-bin
```

```
$ cavif --help
```


## License

MIT © [Imagemin](https://github.com/imagemin)
