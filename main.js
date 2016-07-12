"use strict";

var Alphabet = require('./alphabet');
var Cache = require('./cache');

var alpha = new Alphabet();
var cache = new Cache('alpha1');

var Transform = require('stream').Transform; //trans

class ToUpperCase extends Transform{
	_transform(chunk, encoding, callback){
		this.push(chunk.toString().toUpperCase());
		callback();
	}
}
var toUpperCase = new ToUpperCase();

alpha.pipe(toUpperCase)
	 .pipe(cache);

cache.on('finish', function(){
	console.log('Cache store:');
	for(var key in Cache.store){
		console.log(key, ':', Cache.store[key]);
		//console.log(key, ':', Cache.store[key].toString());
	}
});