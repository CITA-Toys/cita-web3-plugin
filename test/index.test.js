const {
  address,
  Nervos,
  JSONRPC,
} = require('./config')

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
  return Nervos.netPeerCount().then(count => {
    expect(count.startsWith('0x')).toBe(true)
  })
})

test('get block number which should starts with 0x', async () => {
  expect.assertions(1)
  const blockNumber = await Nervos.getBlockNumber()
  expect(blockNumber).toBeTruthy()
})

test('get block by number of hash', async () => {
  expect.assertions(1)
  const blockNumber = await Nervos.getBlockNumber()
  const block = await Nervos.getBlockByNumber({
    quantity: blockNumber,
    txInfo: 1,
  })
  expect(+block.header.number).toBe(+blockNumber)
})


test('get block by number of integer', async () => {
  expect.assertions(1)
  const blockNumber = await Nervos.getBlockNumber()
  const block = await Nervos.getBlockByNumber({
    quantity: +blockNumber,
    txInfo: 1,
  })
  expect(+block.header.number).toBe(+blockNumber)
})

test('get block by number of latest', async () => {
  expect.assertions(1)
  const block = await Nervos.getBlockByNumber({
    quantity: 'latest',
    txInfo: 1,
  })
  expect(block.header.number).toBeTruthy()
})

test('get block by number of earliest', async () => {
  expect.assertions(1)
  const block = await Nervos.getBlockByNumber({
    quantity: 'earliest',
    txInfo: 1,
  })
  expect(block.header.number.startsWith('0x')).toBeTruthy()
})

test('get block by hash starts with 0x', async () => {
  const latest = await Nervos.getBlockByNumber({
    quantity: 'latest',
    txInfo: 1,
  })
  const hash = latest.hash
  expect.assertions(1)
  const block = await Nervos.getBlockByHash({
    hash,
    txInfo: 1,
  })
  expect(block.hash).toBe(hash)
})

test('get block by hash not starts with 0x', async () => {
  const latest = await Nervos.getBlockByNumber({
    quantity: 'latest',
    txInfo: 1,
  })
  const hash = latest.hash.slice(2)
  expect.assertions(1)
  const block = await Nervos.getBlockByHash({
    hash,
    txInfo: 1,
  })
  expect(block.hash).toBe(`0x${hash}`)
})

test('get block history', async () => {
  const COUNT = 5
  expect.assertions(2)
  const blockNumber = await Nervos.getBlockNumber()
  const blocks = await Nervos.getBlockHistory({
    by: blockNumber,
    count: COUNT,
  })
  expect(blocks.length).toBe(COUNT)
  expect(blocks.every(block => block.hash.startsWith('0x'))).toBeTruthy()
})


test('get logs', async () => {
  const logs = await Nervos.getLogs({
    topics: [],
  })
  if (logs.length) {
    expect(logs[0].topics.length).toBeTruthy()
  }
})

test('get meta data', async () => {
  const metaData = await Nervos.metadata({
    blockNumber: '0x0',
  })
  expect(metaData.chainId).toBeTruthy()
})

test(`get balance of ${address}`, async () => {
  const balance = await Nervos.getBalance({
    addr: address,
  })

  expect(balance.startsWith('0x')).toBeTruthy()
})

test(`get transaction count of ${address}`, async () => {
  const count = await Nervos.getTransactionCount({
    addr: address,
    blockNumber: 'latest',
  })
  expect(count).not.toBeUndefined()
})


test('new filter', async () => {
  const id = await Nervos.newFilter([])
  expect(id.startsWith('0x')).toBe(true)
})

test('new block filter', async () => {
  const id = await Nervos.newBlockFilter()
  expect(id.startsWith('0x')).toBe(true)
})


test('uninstall filter', async () => {
  const id = await Nervos.newBlockFilter()
  const result = await Nervos.uninstallFilter(id)
  expect(result).toBe(true)
})

test('get filter changes', async () => {
  const id = await Nervos.newBlockFilter()
  const logArray = await Nervos.getFilterChanges(id)
  const isArray = Array.isArray(logArray)
  expect(isArray).toBe(true)
})
// TODO: ethCall
