This repo is a demo site of [blockchain info](https://www.blockchain.com/btc/block/000000000000000001f942eb4bfa0aeccb6a14c268f4c72d5fff17270da771b9j)

## Know issues

1. 邮件给我的 API 地址好像不能获取到所有的数据，从这个https://blockchain.info/rawblock地址拿到了所有需要的数据；
2. 邮件给的 API，对于大数据可能加载的不完整，服务器端返回的数据长度和`content-length`不一致，比如:https://webbtc.com/block/000000000000000001f942eb4bfa0aeccb6a14c268f4c72d5fff17270da771b9.json?timestamp=1540092479772
