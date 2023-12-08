const fs = require('fs-extra');
console.log('cleaning build/dist folders');
fs.rmSync('./umd', { recursive: true, force: true });
fs.rmSync('./lib', { recursive: true, force: true });
fs.rmSync('./es', { recursive: true, force: true });
fs.rmSync('./build', { recursive: true, force: true });
fs.rmSync('./demo/dist', { recursive: true, force: true });
fs.rmSync('./dist', { recursive: true, force: true });