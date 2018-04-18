const { default: CitaWeb3Plugin, JSONRPC } = require('../lib/')

const SERVER = 'http://39.104.94.244:1301'

const { CITA } = CitaWeb3Plugin({
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
    detailed: true,
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
    detailed: true,
  })
  expect(block.header.number).toBe(blockNumber)
})

test('get block by number of latest', async () => {
  expect.assertions(1)
  const block = await CITA.getBlockByNumber({
    quantity: 'latest',
    detailed: true,
  })
  expect(block.header.number.startsWith('0x')).toBeTruthy()
})

test.skip('get block by number of earliest', async () => {
  expect.assertions(1)
  const block = await CITA.getBlockByNumber({
    quantity: 'earliest',
    detailed: true,
  })
  expect(block.header.number.startsWith('0x')).toBeTruthy()
})

test('get block by hash starts with 0x', async () => {
  const hash =
    '0xa4fa53748ccb4c2009e1655772622f89cceea55d1bd1fb7cc49fc5fb41567c4d'
  expect.assertions(1)
  const block = await CITA.getBlockByHash({
    hash,
    detailed: true,
  })
  expect(block.hash).toBe(hash)
})

test('get block by hash not starts with 0x', async () => {
  const hash =
    'a4fa53748ccb4c2009e1655772622f89cceea55d1bd1fb7cc49fc5fb41567c4d'
  expect.assertions(1)
  const block = await CITA.getBlockByHash({
    hash,
    detailed: true,
  })
  expect(block.hash).toBe(`0x${hash}`)
})

test.skip('get block by hash and parse transaction correctly', async () => {
  const hash =
    '0x1ae8e40a492336096c6381c6b785cc61996679d3077973ffdb65a37252e1c258'
  const block = await CITA.getBlockByHash({
    hash: hash,
    detialed: true,
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
    '0x75cfb052270979d927c696ebbbc6e7d96f93a416bbc753a1ad8ad1765211e0e5'
  const tx = await CITA.getTransaction(HASH)
  expect(tx.hash.startsWith('0x')).toBeTruthy()
})

test('get transaction detail and parse transaction correctly', async () => {
  const HASH =
    '0x75cfb052270979d927c696ebbbc6e7d96f93a416bbc753a1ad8ad1765211e0e5'
  const tx = await CITA.getTransaction(HASH)
  expect(tx.basicInfo).toBeTruthy()
})

test('get logs', async () => {
  const logs = await CITA.getLogs({ topics: [] })
  if (logs.length) {
    expect(logs[0].topics.length).toBeTruthy()
  }
})

// TODO: Eth Call
// TODO: eth_getTransactionCount
// TODO: eth_getCode
// TODO: eth_getAbi
// TODO: cita_getTransactionProof
