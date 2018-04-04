![Build Status](https://travis-ci.org/CITA-Toys/cita-web3-plugin.svg?branch=master)

# CITA-Web3-Plugin

Promise based [CITA RPC](https://cryptape.github.io/cita/usage-guide/rpc/) toolkit.

# Features

* Supports the Promise API

# Installing

```bash
$ yarn add cita-web3-plugin
```

# Example

```javascript
import CitaWeb3Plugin from 'cita-web3-plugin'

const SERVER = 'localhost:1337'

const { CITA } = CitaWeb3Plugin({ server: SERVER })

/**
 * @function netPeerCount
 * @description request net peer count
 * @param null
 * @returns {string} peerCount
 */
CITA.netPeerCount().then(count => console.log(count))

/**
 * @function getBlockByNumber
 * @description request block by block number
 * @param {string} quantity - quantity is the current block height of CITA
 * @param {boolean} detialed - return transaction list if true, otherwise return hash of transaction
 * @returns {object} block
 */
CITA.getBlockByNumber({
  quantity: blockNumber
  detailed: true,
}).then(block => console.log(block))

/**
 * @function getBlockByHash
 * @description request block by block hash
 * @param {string} hash - block hash
 * @param {boolean} detailed - return transaction list if true, otherwise return hash of transaction
 * @returns {object} block
 */
CITA.getBlockByHash({
  hash: blockHash,
  detailed: true
}).then(block => console.log(block))
```
