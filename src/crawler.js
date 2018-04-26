const HCCrawler = require('headless-chrome-crawler');
const fs = require('fs');

const crawler = HCCrawler.launch({
  evaluatePage: (() => ({
    data: $('.table').html(),
  })),
  onSuccess: (result => {
    const csv = String(result.result.data)
      .replace(/\s/g, "")
      .replace(/<\/td>/g, ";")
      .replace(/<\/th>/g, ";")
      .replace(/<\/tr>/g, "\n")
      .replace(/<(.*?)>/g, "")
      .replace(/;\n/g, "\n")
      fs.writeFile("tmp/result.csv", csv, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("CSV saved");
    }); 
    
  }),
});

module.exports = crawler;