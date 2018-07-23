const {
  bytecode,
  address,
  Nervos,
  JSONRPC,
  privateKey,
} = require('./config')
const signer = require('@nervos/signer').default

const tx = {
  "privateKey": privateKey,
  "data": bytecode,
  "nonce": "47",
  "quota": 999999,
  "validUntilBlock": 114930,
  "version": 0,
  "chainId": 1,
  "value": '0',
}

const inquireReceipt = txHash =>
  new Promise((resolve, reject) => {
    let remains = 10
    let interval = setInterval(() => {
      if (!remains) {
        clearInterval(interval)
        reject(new Error('No Receipt Received'))
      }
      remains--
      Nervos.getTransactionReceipt(txHash).then(receipt => {
        if (receipt && receipt.transactionHash) {
          clearInterval(interval)
          resolve(receipt)
        }
      })
    }, 1000)
  })

const inquireProof = txHash =>
  new Promise((resolve, reject) => {
    let remains = 10
    let interval = setInterval(() => {
      if (!remains) {
        clearInterval(interval)
        reject(new Error('No Receipt Received'))
      }
      remains--
      Nervos.getTransactionProof(txHash).then(proof => {
        if (proof) {
          clearInterval(interval)
          resolve(proof)
        }
      })
    }, 1000)
  })

test('sendSignedTransaction, getTransactionReceipt, getTransaction, and parse Transaction', async () => {
  jest.setTimeout(100000)
  const current = await Nervos.getBlockNumber()
  const transaction = {
    ...tx,
    validUntilBlock: +current + 88,
  }

  const signedMsg = signer(transaction)
  const {
    hash
  } = await Nervos.sendSignedTransaction(signedMsg)

  expect(hash.startsWith('0x')).toBe(true)


  const receipt = await inquireReceipt(hash)
  expect(receipt.errorMessage).toBe(null)
  const transactionDetail = await Nervos.getTransaction(hash)
  expect(transactionDetail.hash).toBe(hash)
  const proof = await inquireProof(hash)
  expect(proof).toBeTruthy()
  //TODO: test transaction parser
})

test.skip('get block by number and parse transaction correctly', async () => {
  const blockNumber = '0x61ed8'
  const block = await Nervos.getBlockByNumber({
    quantity: blockNumber,
    detialed: true,
  })
  expect(block.body.transactions[0].basicInfo.to).toBeTruthy()
})
test.skip('get block by hash and parse transaction correctly', async () => {
  const latest = await Nervos.getBlockByNumber({
    quantity: 'latest',
    txInfo: 1,
  })
  const {
    hash
  } = latest
  const block = await Nervos.getBlockByHash({
    hash: hash,
    txInfo: 1,
  })
  expect(block.body.transactions[0].basicInfo.to).toBeTruthy()
})

test.skip('get transaction detail', async () => {
  const HASH = TX_HASH
  const tx = await Nervos.getTransaction(HASH)
  expect(tx.hash.startsWith('0x')).toBeTruthy()
})

test.skip('get transaction detail and parse transaction correctly', async () => {
  const HASH = TX_HASH
  const tx = await Nervos.getTransaction(HASH)
  expect(tx.basicInfo).toBeTruthy()
})
test.skip(`get transaction proof`, async () => {
  const proof = await Nervos.getTransactionProof(TX_HASH)
  expect(proof.startsWith('0x')).toBe(true)
})
