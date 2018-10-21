const proxy = require('express-http-proxy');
const app = require('express')();

app.use('/api', proxy('https://blockchain.info'));
app.listen(3001, () => console.log('server listen on port 3001'));

// const https = require('https');
// https
//   .get(
//     'https://webbtc.com/block/000000000000000001f942eb4bfa0aeccb6a14c268f4c72d5fff17270da771b9.json?timestamp=1540092479772',
//     resp => {
//       let data = '';
//       // A chunk of data has been recieved.
//       resp.on('data', chunk => {
//         console.log('---');
//         data += chunk;
//       });
//       // The whole response has been received. Print out the result.
//       resp.on('end', () => {
//         console.log(data.length);
//         // console.log(JSON.parse(data));
//       });
//     }
//   )
//   .on('error', err => {
//     console.log('Error: ' + err.message);
//   });
