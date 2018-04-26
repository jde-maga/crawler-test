const HCCrawler = require('headless-chrome-crawler');
const fs = require('fs');

// (async () => {
//   const crawler = await HCCrawler.launch({
//     evaluatePage: (() => ({
//       data: $('.table').html(),
//     })),
//     onSuccess: (result => {
//       const csv = String(result.result.data)
//         .replace(/\s/g, "")
//         .replace(/<\/td>/g, ";")
//         .replace(/<\/th>/g, ";")
//         .replace(/<\/tr>/g, "\n")
//         .replace(/<(.*?)>/g, "")
//         .replace(/;\n/g, "\n")
//         fs.writeFile("tmp/result.csv", csv, (err) => {
//           if(err) {
//               return console.log(err);
//           }
//           console.log("CSV saved");
//       }); 
      
//     }),
//   });
//   crawler.queue('https://coinmarketcap.com/currencies/tether/historical-data/?start=20180401&end=20180410');
//   await crawler.onIdle();
//   await crawler.close();
// })();

(async () => {
  const crawler = await HCCrawler.launch({
    evaluatePage: (() => ({
      data: $('.currency-name-container'),
    })),
    onSuccess: (result => {
      const coins = String(result.result.data)
      console.log(coins);      
    }),
  });
  crawler.queue('https://coinmarketcap.com/');
  await crawler.onIdle();
  await crawler.close();
})();