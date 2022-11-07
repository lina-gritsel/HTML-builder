const path = require('path');
const fs = require('fs');
const { stdout, stdin, exit } = require('process');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Здравствуйте, ');
const endFunc = () => {
    stdout.write('До свидания!');
    exit();
  }
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    endFunc();
  }
  writeStream.write(data);
});
process.on('SIGINT', endFunc);
