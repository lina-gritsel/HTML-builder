const path = require("path");
const fs = require("fs");

const folderPath = path.join(__dirname, "secret-folder");

fs.readdir(folderPath, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    let adress = path.join(folderPath, file);

    fs.stat(adress, (err, stat) => {
      if (err) {
        throw err;
      } else {
        if (stat.isFile()) {
          console.log(
            path.parse(path.join(folderPath, file)).name + " - " + path.parse(path.join(folderPath, file)).ext.slice(1) + " - " + stat.size + " bytes"
          );
        }
      }
    });
  });
});
