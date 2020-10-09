'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const path = require('path');
const bin = require('.');

bin.run(['--version']).then(() => {
	log.success('cavif pre-build test passed successfully');
}).catch(error => {
	log.warn(error.message);
	log.warn('cavif pre-build test failed');
	log.info('compiling from source');

	binBuild.file(path.resolve(__dirname, '../vendor/source/cavif-rs-0.6.3.tar.gz'), [
		`./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
		'make && make install'
	]).then(() => { // eslint-disable-line promise/prefer-await-to-then
		log.success('cavif built successfully');
	}).catch(error => {
		log.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	});
});
