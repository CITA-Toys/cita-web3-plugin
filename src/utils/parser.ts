import { Chain } from '../typings'

const pb = require('../../proto-ts/blockchain_pb.js')

export const hexToBytes = (hex: string) => {
  let _hex = hex.startsWith('0x') ? hex.slice(2) : hex
  var result = []
  while (_hex.length >= 2) {
    result.push(parseInt(_hex.substring(0, 2), 16))
    _hex = _hex.substring(2, _hex.length)
  }
  return result
}
export const bytesToHex = function(bytes: Uint8Array) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    /* jshint ignore:start */
    hex.push((bytes[i] >>> 4).toString(16))
    hex.push((bytes[i] & 0xf).toString(16))
    /* jshint ignore:end */
  }
  return '0x' + hex.join('')
}

export const toHex = (num: number) => `0x${num.toString(16)}`
export const blockNumberFormatter = (num: string | number) => {
  if (typeof num === 'number') {
    return toHex(num)
  }
  return num
}
export const hashFormatter = (hash: string) =>
  hash.startsWith('0x') ? hash : `0x${hash}`

export const transactionContentParser = (content: string) => {
  const bytes = hexToBytes(content)
  const decoded = pb.UnverifiedTransaction.deserializeBinary(bytes)
  const tx = decoded.getTransaction()
  return {
    from: tx.getFrom ? tx.getFrom() : '',
    to: tx.getTo ? tx.getTo() : '',
    data: tx.getData ? tx.getData() : '',
    value: tx.getValue ? tx.getValue().toString() : '',
  }
}

export const transactionParser = (transaction: Chain.TransactionInBlock) => {
  if (transaction.content) {
    transaction.basicInfo = transactionContentParser(transaction.content)
  }
  return transaction
}

export const blockParser = (block: Chain.Block<Chain.TransactionInBlock>) => {
  block.body.transactions = block.body.transactions.map(tx =>
    transactionParser(tx),
  )
  return block
}
