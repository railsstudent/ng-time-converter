const fs = require("fs-extra");
const concat = require("concat");
(async function build() {
  const files = [
    "./dist/elements-build/runtime.js",
    "./dist/elements-build/polyfills.js",
    "./dist/elements-build/scripts.js",
    "./dist/elements-build/main.js"
  ];
  await fs.ensureDir("elements");
  await fs.emptyDir("elements");
  await concat(files, "elements/time-converter.js");
  await fs.copy(
    "./src/assets/timezones.json",
    "elements/assets/timezones.json"
  );
  await fs.copyFile("./src/favicon.ico", "elements/favicon.ico");
  await fs.copyFile("./src/demo.html", "elements/index.html");
  await fs.copyFile("CNAME", "elements/CNAME");
})();
