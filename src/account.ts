// class Account {
//   static create = (entropy?:string) => {
//     const innerHex = keccak256(Bytes.concat(Bytes.raondom(32), entropy | Bytes.random(32)))
//     var middleHex = Bytes.concat(Bytes.concat(Bytes.random(32), innerHex), Bytes.random(32))
//     var outerHex = keccak256(middleHex)
//     return fromPrivate(outerHex)
//   }
// }

// const toCheckSum = (addr: string) => {
//   const addrHash = keccak256s(addr.slice(2))
//   const checksumAddr = '0x'

// }
