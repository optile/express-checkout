const fs = require('fs-extra');
console.log('generating build folder');
fs.copySync('./umd', './build');
fs.copySync('./lib', './build/lib');
fs.copySync('./es', './build/es');
