const fs = require("fs");
const path = require("path");

const pathNewFolder = path.join(__dirname, "project-dist");
const pathStyle = path.join(__dirname, "styles");

fs.mkdir(pathNewFolder, { recursive: true }, (err) => {
  if (err) throw err;
  addHtml();
  copyAssets();
});

/*СБОРКА СТИЛЕЙ*/

fs.readdir(pathStyle, (err, files) => {
  if (err) throw err;
  const outputCSS = fs.createWriteStream(path.join(pathNewFolder, "style.css"));

  files.forEach((file) => {
    let adress = path.join(pathStyle, file);

    fs.stat(adress, (err, stat) => {
      if (err) throw err;
      if (stat.isFile()) {
        if (path.parse(path.join(pathStyle, file)).ext === ".css") {
          let style = fs.createReadStream(adress, "utf-8");
          style.pipe(outputCSS);
        }
      }
    });
  });
});

/* ЗАПИСЬ В INDEX.HTML */

const pathComponents = path.join(__dirname, "components");
const directory = path.dirname(pathNewFolder);

const addHtml = () => {
  fs.readdir(pathComponents, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    fs.readFile(`${directory}/template.html`,"utf8", function (error, template) {
        if (error) throw err;
        files.forEach((item) => {
          if (item.isFile()) {
            const parse = path.parse(`${pathComponents}/${item.name}`);
            if (parse.ext === ".html") {
              fs.readFile(`${pathComponents}/${item.name}`,"utf8", function (error, data) {
                  if (error) throw err;
                  template = template.replace(`{{${parse.name}}}`, data);
                  fs.writeFile(`${directory}/project-dist/index.html`,template,
                    function (error) {
                      if (error) throw error;
                    }
                  );
                }
              );
            }
          }
        });
      }
    );
  });
}

/* КОПИРОВАНИЕ ASSETS */

const copyAssets = () => {
  const pathNewDirectory = path.join(__dirname, 'project-dist/assets');
  const directoryPath = path.join(__dirname, 'assets');
  copyDir(directoryPath, pathNewDirectory);
}

const  copyDir = (directoryPath, pathNewDirectory) => {
  fs.mkdir(pathNewDirectory, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((element) => {
      if (!element.isFile()) {
        copyDir(`${directoryPath}/${element.name}`, `${pathNewDirectory}/${element.name}`);
      } else {
        fs.copyFile(`${directoryPath}/${element.name}`, `${pathNewDirectory}/${element.name}`, (err) => {
          if (err) throw err;
        });
      }
    });
  });
}
