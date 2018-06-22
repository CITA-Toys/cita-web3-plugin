import { Transaction, Block } from '../index'

const pb = require('../cita-proto/blockchain_pb.js')

const hexToBytes = (hex: string) => {
  let _hex = hex.startsWith('0x') ? hex.slice(2) : hex
  var result = []
  while (_hex.length >= 2) {
    result.push(parseInt(_hex.substring(0, 2), 16))
    _hex = _hex.substring(2, _hex.length)
  }
  return result
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
    // utf8: tx.getData_asU8 ? tx.getData_asU8() : '',
    // base64: tx.getData_asB64 ? tx.getData_asB64() : '',
  }
}

export const transactionParser = (transaction: Transaction) => {
  if (transaction.content) {
    transaction.basicInfo = transactionContentParser(transaction.content)
  }
  return transaction
}

export const blockParser = (block: Block) => {
  block.body.transactions = block.body.transactions.map(tx =>
    transactionParser(tx),
  )
  return block
}
