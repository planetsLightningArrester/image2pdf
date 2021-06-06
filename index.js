const { print } = require('printaeu');

const fs = require('fs');
const imagesToPdf = require("images-to-pdf");

if (process.argv.length < 4) {
  print.red("You should enter \"node index.js <images_input's folder> <output_file_name>\"");
  return;
}

let imageFolder = process.argv[2];
let pdfs = [];

// Read all files
fs.readdir(imageFolder, async (err, files) => {
  
  // Insert all sorted
  files.forEach(file => {

    let inserted = false;

    if (!pdfs.length) {
      pdfs.push(imageFolder + file);
      inserted = true;
    }
    
    for (let i = 0; i < pdfs.length && !inserted; i++) {
      if (parseInt(file.slice(file.indexOf('(') + 1, file.indexOf(')'))) <= parseInt(pdfs[i].slice(pdfs[i].indexOf('(') + 1, pdfs[i].indexOf(')')))) {
        pdfs.splice(i, 0, imageFolder + file);
        inserted = true;
      }
    }
    
    if (!inserted) {
      pdfs.push(imageFolder + file);
    }

  });

  // Print files in order
  print.log(pdfs);
  
  print.log('Converting...');

  let outputFile = process.argv[3].includes('.pdf')?process.argv[3]:process.argv[3]+".pdf";

  // Convert
  await imagesToPdf(pdfs, outputFile);
  print.log('Done');
});


