const fs = require("fs-extra");
const concat = require("concat");
(async function build() {
  const files = [
    "./dist/ng-time-converter/runtime.js",
    "./dist/ng-time-converter/polyfills.js",
    "./dist/ng-time-converter/main.js"
  ];
  await fs.ensureDir("elements");
  await fs.emptyDir("elements");
  await concat(files, "elements/time-converter.js");
  await fs.copy("./dist/ng-time-converter/assets/", "elements/assets/");
  await fs.copy("./dist/ng-time-converter/favicon.ico", "elements/favicon.ico");
  await fs.copyFile("./src/demo.html", "elements/index.html");
  await fs.copyFile("CNAME", "elements/CNAME");
})();
