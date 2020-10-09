'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const compareSize = require('compare-size');
const cavif = require('..');

test('rebuild the cavif binaries', async t => {
	const temporary = tempy.directory();

	await binBuild
		.file(path.resolve(__dirname, '../vendor/source/cavif-rs-0.6.3.tar.gz'), [
			`./configure --disable-shared --prefix="${temporary}" --bindir="${temporary}"`,
			'make && make install'
		]);

	t.true(fs.existsSync(path.join(temporary, 'cavif')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(cavif, ['--version']));
});

test('minify and convert a PNG to AVIF', async t => {
	const temporary = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(temporary, 'test-png.avif');
	const args = [
		src,
		'-o',
		dest
	];

	await execa(cavif, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});

test('minify and convert a JPG to AVIF', async t => {
	const temporary = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.jpg');
	const dest = path.join(temporary, 'test-jpg.avif');
	const args = [
		src,
		'-o',
		dest
	];

	await execa(cavif, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
