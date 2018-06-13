const {
  default: CitaWeb3Plugin,
  JSONRPC
} = require('../lib/')

const SERVER = 'http://47.75.129.215:1337'

const {
  CITA
} = CitaWeb3Plugin({
  server: SERVER,
})

test('Form RPC Request', () => {
  const id = Math.round(Math.random() * 100)
  expect(
    JSONRPC({
      method: 'test',
      params: ['test'],
      id,
    }),
  ).toEqual({
    jsonrpc: '2.0',
    method: 'test',
    params: ['test'],
    id,
  })
})

test('get peerCount which should starts with 0x', () => {
  expect.assertions(1)
  return CITA.netPeerCount().then(count => {
    expect(count.startsWith('0x')).toBe(true)
  })
})

test('get block number which should starts with 0x', async () => {
  expect.assertions(1)
  const blockNumber = await CITA.getBlockNumber()
  expect(blockNumber.startsWith('0x')).toBe(true)
})

test('get block by number of hash', async () => {
  expect.assertions(1)
  const blockNumber = await CITA.getBlockNumber()
  const block = await CITA.getBlockByNumber({
    quantity: blockNumber,
    txInfo: 1,
  })
  expect(block.header.number).toBe(blockNumber)
})

test.skip('get block by number and parse transaction correctly', async () => {
  const blockNumber = '0x61ed8'
  const block = await CITA.getBlockByNumber({
    quantity: blockNumber,
    detialed: true,
  })
  expect(block.body.transactions[0].basicInfo.to).toBeTruthy()
})

test('get block by number of integer', async () => {
  expect.assertions(1)
  const blockNumber = await CITA.getBlockNumber()
  const block = await CITA.getBlockByNumber({
    quantity: +blockNumber,
    txInfo: 1,
  })
  expect(block.header.number).toBe(blockNumber)
})

test('get block by number of latest', async () => {
  expect.assertions(1)
  const block = await CITA.getBlockByNumber({
    quantity: 'latest',
    txInfo: 1,
  })
  expect(block.header.number.startsWith('0x')).toBeTruthy()
})

test.skip('get block by number of earliest', async () => {
  expect.assertions(1)
  const block = await CITA.getBlockByNumber({
    quantity: 'earliest',
    txInfo: 1,
  })
  expect(block.header.number.startsWith('0x')).toBeTruthy()
})

test('get block by hash starts with 0x', async () => {
  const hash =
    '0xf132f56c048a6dffac3950dada971a266925a18ce2595f59830fb9cf02a6e4d6'
  expect.assertions(1)
  const block = await CITA.getBlockByHash({
    hash,
    txInfo: 1,
  })
  expect(block.hash).toBe(hash)
})

test('get block by hash not starts with 0x', async () => {
  const hash =
    'f132f56c048a6dffac3950dada971a266925a18ce2595f59830fb9cf02a6e4d6'
  expect.assertions(1)
  const block = await CITA.getBlockByHash({
    hash,
    txInfo: 1,
  })
  expect(block.hash).toBe(`0x${hash}`)
})

test.skip('get block by hash and parse transaction correctly', async () => {
  const hash =
    '0xf132f56c048a6dffac3950dada971a266925a18ce2595f59830fb9cf02a6e4d6'
  const block = await CITA.getBlockByHash({
    hash: hash,
    txInfo: 1,
  })
  expect(block.body.transactions[0].basicInfo.to).toBeTruthy()
})

test('get block history', async () => {
  const COUNT = 5
  expect.assertions(2)
  const blockNumber = await CITA.getBlockNumber()
  const blocks = await CITA.getBlockHistory({
    by: blockNumber,
    count: COUNT,
  })
  expect(blocks.length).toBe(COUNT)
  expect(blocks.every(block => block.hash.startsWith('0x'))).toBeTruthy()
})

test('get transaction detail', async () => {
  const HASH =
    '0x19aff12bd3c1eab52477e2968f13dd87b0464d68429ab875005abfbee4b667cb'
  const tx = await CITA.getTransaction(HASH)
  expect(tx.hash.startsWith('0x')).toBeTruthy()
})

test('get transaction detail and parse transaction correctly', async () => {
  const HASH =
    '0x19aff12bd3c1eab52477e2968f13dd87b0464d68429ab875005abfbee4b667cb'
  const tx = await CITA.getTransaction(HASH)
  expect(tx.basicInfo).toBeTruthy()
})

test('get logs', async () => {
  const logs = await CITA.getLogs({
    topics: []
  })
  if (logs.length) {
    expect(logs[0].topics.length).toBeTruthy()
  }
})

test('get meta data', async () => {
  const metaData = await CITA.metaData({
    blockNumber: '0x0'
  })
  console.log(metaData)
  expect(metaData.chainId).toBeTruthy()
})

test(`get balance of ${'0x627306090abaB3A6e1400e9345bC60c78a8BEf57'}`, async () => {
  const balance = await CITA.getBalance({
    addr: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
  })

  expect(balance.startsWith('0x')).toBeTruthy()
})

// TODO: Eth Call
// TODO: eth_getTransactionCount
// TODO: eth_getCode
// TODO: eth_getAbi
// TODO: cita_getTransactionProof
