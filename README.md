![Build Status](https://travis-ci.org/CITA-Toys/cita-web3-plugin.svg?branch=master)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/@cita/web3-plugin)
[![npm type definitions](https://img.shields.io/npm/types/chalk.svg)](https://www.npmjs.com/package/@cita/web3-plugin)
![npm](https://img.shields.io/npm/l/express.svg)

# CITA-Web3-Plugin

Promise based [CITA RPC](https://cryptape.github.io/cita/usage-guide/rpc/) toolkit.

# Features

- Supports the Promise API

# Installing

```bash
$ yarn add @cita/web3-plugin
```

# Example

```javascript
import web3Plugin from '@cita/web3-plugin'

const SERVER = 'localhost:1337'

const { Nervos } = web3Plugin({ server: SERVER })

/**
 * @function metadata
 * @description request metadata of specified chain
 * @param {{blockNumber}}
 * @return {Metadata}
 */
Nervos.metadata({blockNumer: '0x0'}).then(metadata => console.log(metadata))

/**
 * @function netPeerCount
 * @description request net peer count
 * @param null
 * @returns {string} peerCount
 */
Nervos.netPeerCount().then(count => console.log(count))

/**
 * @function getBlockByNumber
 * @description request block by block number
 * @param {string} quantity - quantity is the current block height of CITA
 * @param {boolean} detialed - return transaction list if true, otherwise return hash of transaction
 * @returns {object} block
 */
Nervos.getBlockByNumber({
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
Nervos.getBlockByHash({
  hash: blockHash,
  detailed: true
}).then(block => console.log(block))



/**
 * @function getBlockHistory
 * @description retrieve blocks of height from (by - count + 1) to by
 * @param {by: string, count: number} - by: the startpoint of history, count: the count of records to retrieve
 * @return {array} list of block
 */
Nervos.getBlockHistory({
  by: '0x4bb99',
  count: 5,
}).then(blocks => console.log(blocks))

/**
 * @function getTransaction
 * @description request transaction detail
 * @param {string} transactionHash
 * @return {object} Transaction
 */
Nervos.getTransaction('0x...').then(transaction => console.log(transaction))

/**
 * @function getLogs
 * @description requestion log on specified block
 * @param {{topics: Topic[]}}
 * @return {object} Logs
 */
Nervos.getLogs({topics: []}).then(logs => console.log(logs))

/**
 * @function getBalance
 * @description get balance of specified address
 * @param {{addr}} - addr: specified address
 * @return {Balance}
 */
Nervos.getBalance({addr: '0x...'}).then(balance => console.log(balance))

/**
 * @function getTransactionCount
 * @description get transaction count of specified addr
 * @param {{addr, blockNumber}}
 * @return {TransactionCount}
 */
Nervos.getTransactionCount({addr: '0x..', blockNumber: 'latest'}).then(count => console.log(count))

/**
 * @function getTransactionProof
 * @description get transaction proof of specified transaction hash
 * @param {string} trasnactionHash
 * @return {string} transaction proof
 */

Nervos.getTransactionProof('0x...').then(proof => console.log(proof))


/**
 * @function setServer
 * @description set server
 * @param {string} server
 * @return undefined
 */

Nervos.setServer('http://localhost:1301')
```
