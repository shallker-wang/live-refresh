var fs = require('fs');
var CoffeeScript = require('coffee-script');

var coffeeFile = __dirname + '/index.coffee';

CoffeeScript.run(
  fs.readFileSync(coffeeFile, {encoding: 'utf8'}),
  {filename: coffeeFile}
);
