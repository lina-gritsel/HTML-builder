const path = require("path");
const fs = require("fs");

const folderPath = path.join(__dirname, "files");
const folderCopyPath = path.join(__dirname, "files-copy");

fs.readdir(folderCopyPath, (err, files) => {
  if (err) {
    fs.mkdir(folderCopyPath, (err) => {
      if (err) throw err;
    });
  } else {
    files.forEach((file) => {
      fs.unlink(path.join(folderCopyPath, file), (err) => {
        if (err)
          throw err;
      });
    });
  }
});

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.isFile()){}
    fs.copyFile( path.join(folderPath, file), path.join(folderCopyPath, file), (err) => {
        if (err)
          throw err;
      }
    );
  });
});
