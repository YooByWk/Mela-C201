const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'build');
const destDir = path.join(__dirname, '../backend/src/main/resources/dist');

// try {fs.readdirSync(sourceDir).forEach(file => {
//   fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
// });}
// catch (err) {
//   console.log(err,'err');
// }
try {
  fs.copySync(sourceDir, destDir);
}
catch {
  console.log('err');
}

console.log('Build moved to backend');

fs.rmdirSync(sourceDir, { recursive: true });


// fs.copySync(sourceDir, destDir);

// console.log('Build moved to backend');
