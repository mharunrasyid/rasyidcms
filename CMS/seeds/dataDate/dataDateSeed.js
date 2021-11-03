const fs = require('fs');
const mongoose = require('mongoose');
var DataDate = require("../../model/datadate");
let data = JSON.parse(fs.readFileSync('data.json'));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/cmsdb');
}

main().then(() => {
    DataDate.insertMany(data).then(function () {
        console.log("Data inserted")
    }).catch(function (error) {
        console.log(error)
    });
}).catch(err => console.log(err));
