const fs = require("fs");
const path = require("path");

const pathFolder = path.join(__dirname, "styles");
const pathBundleFolder = path.join(__dirname, "project-dist");
const output = fs.createWriteStream(path.join(pathBundleFolder, "bundle.css"));

fs.readdir(pathFolder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    let adress = path.join(pathFolder, file);

    fs.stat(adress, (err, stat) => {
      if (err) throw err;
      if (stat.isFile()) {
        if (path.parse(path.join(pathFolder, file)).ext === ".css") {
          let style = fs.createReadStream(adress, "utf-8");
          style.pipe(output);
        }
      }
    });
  });
});
