const { default: CitaWeb3Plugin, JSONRPC } = require('../lib/')

const SERVER = 'http://39.104.94.244:1301'

const { CITA } = CitaWeb3Plugin({ server: SERVER })

test('Form RPC Request', () => {
  const id = Math.round(Math.random() * 100)
  expect(JSONRPC({ method: 'test', params: ['test'], id })).toEqual({
    jsonrpc: '2.0',
    method: 'test',
    params: ['test'],
    id,
  })
})

test('get peerCount which should starts with 0x', () => {
  expect.assertions(1)
  return CITA.netPeerCount().then(count => {
    console.log(count)
    expect(count.startsWith('0x')).toBe(true)
  })
})

test('get block number which should starts with 0x', async () => {
  expect.assertions(1)
  const blockNumber = await CITA.getBlockNumber()
  expect(blockNumber.startsWith('0x')).toBe(true)
})

test('get block by number', async () => {
  expect.assertions(1)
  const blockNumber = await CITA.getBlockNumber()
  const block = await CITA.getBlockByNumber({
    quantity: blockNumber,
    detailed: true,
  })
  expect(block.header.number).toBe(blockNumber)
})

test('get block by hash', async () => {
  const hash =
    '0xa4fa53748ccb4c2009e1655772622f89cceea55d1bd1fb7cc49fc5fb41567c4d'
  expect.assertions(1)
  const block = await CITA.getBlockByHash({ hash, detailed: true })
  expect(block.hash).toBe(hash)
})
