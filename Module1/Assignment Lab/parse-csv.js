const csvtojson = require('csvtojson');
const fs = require("fs");
const path = require("path")
const uuidv1 = require("uuid/v1")

const parseCsvFile = (file = 'customer-data.csv') => {
    let numberOfRowsParsed = 0;
    csvtojson().fromFile(file)
    .on('csv', (csvRow, rowIndex) => {
            numberOfRowsParsed++;
    })
    .on('error', (error) => {
        console.err(error);
    })
    .on('done', (error) => {
        console.log('Done parsing %s rows', numberOfRowsParsed);
    }).on('end_parsed',(resultJson)=> {
        let resultJSONFileName = file + "-" + uuidv1() + '.json';
        fs.writeFileSync(path.join(__dirname, ".", resultJSONFileName), JSON.stringify(resultJson));
        console.timeEnd("parsingTimer")
        // console.log(resultJson);
    })
}

console.time("parsingTimer")
parseCsvFile(process.argv[2]);
