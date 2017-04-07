const fs = require('fs');
const argv = require('yargs').argv;
const shell = require("shelljs");
const path = argv.path ? argv.path : __dirname;
const readData = [
  'find',
  path,
  '-type f',
  '| grep .html'
].join(' ');
const formatData = 'const pathData = `{{data}}`;';

shell.exec(readData, function (err, stdout, stderr) {
  if (err) throw err;

  const pathData = formatData.replace(/\{\{(.*?)}}/, function (all, item) {
    return stdout;
  }).split(path+'/').join('');
  const location = [path, 'pathData.js'].join('/');

  fs.writeFileSync(location, pathData);
});

