This repo is a demo site of [blockchain info](https://www.blockchain.com/btc/block/000000000000000001f942eb4bfa0aeccb6a14c268f4c72d5fff17270da771b9j), driven by [Blockchain API](https://blockchain.info).

## Install dependency

Install with `yarn`

```sh
yarn install
```

## Run

* run proxy server

```sh
yarn start:proxy
```

* start web

``` sh
yarn start
```

## Run test

```sh
yarn test
```

## Know issues

1. I didn't use the given API, because the given API may load data incomplete，I got the data from https://blockchain.info/rawblock.
1. More tests should be added.
1. Better error handling.

## License
This project is offered under [MIT License](https://github.com/wix/wix-style-react/blob/master/LICENSE).