const fs = require('fs');
const path = require('path');
const { stdout } = process;

const filePath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(filePath , 'utf-8');
readableStream.on('data', data => stdout.write(data))


// fs.readFile(filePath, 'utf-8', (err, content) =>{
//     if(err) {
//         throw err;
//     }
//     console.log(content);
// } )