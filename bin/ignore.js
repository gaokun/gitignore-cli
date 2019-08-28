#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CWD = process.cwd();

function IsFileExist(filename) {
  return new Promise((resolve, reject) => {
    fs.access(filename, fs.constants.F_OK, err => err ? reject(err) : resolve());
  });
}

function CopyFile() {
  fs.createReadStream(path.resolve(__dirname, '../gitignore/gitignore'))
    .pipe(fs.createWriteStream(path.resolve(CWD, '.gitignore')));
}

function main() {
  IsFileExist('.gitignore')
    .then(() => {
      console.log('.gitignore already exists');
    })
    .catch(() => {
      return CopyFile();
    })
    .then(() => {
      console.log('create .gitignore succeed');
    });
}

main();
