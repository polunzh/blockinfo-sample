const proxy = require('express-http-proxy');
const app = require('express')();

app.use('/api', proxy('https://blockchain.info'));
app.listen(3001, () => console.log('server listen on port 3001'));