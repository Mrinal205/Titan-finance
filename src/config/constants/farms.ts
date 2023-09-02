import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'MAX',
    decimal: 18,
    lpAddresses: {
      250:'0xd45194A6c6F7930FC686d9C8f76fE9b45d981B58',
      4002: '0xCd202b1Fed4B78114862329199F24cE5857B6e2A'
    },
    tokenSymbol: 'DINO',
    tokenAddresses: {
      250:'0xd45194A6c6F7930FC686d9C8f76fE9b45d981B58',
      4002: '0xCd202b1Fed4B78114862329199F24cE5857B6e2A'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
//   {
//     pid: 0,
//     risk: 5,
//     lpSymbol: 'MAX-USDC LP',
//     decimal: 18,
//     lpAddresses: {
//       137: '0x09833c4fbd1d28971b89a84fed3e8c16e45dea7d',
//     },
//     tokenSymbol: 'MAX',
//     tokenAddresses: {
//       137: '0xad04791c59547ccd826a164ffb9061cf12b93fd4',
//     },
//     quoteTokenSymbol: QuoteToken.USDC,
//     quoteTokenAdresses: contracts.usdc,
//   },
//   {
//     pid: 1,
//     risk: 5,
//     lpSymbol: 'MAX-WMATIC LP',
//     decimal: 18,
//     lpAddresses: {
//       137: '0xdf401ad81944e68188334966f944a3b0c05cc3f3',
//     },
//     tokenSymbol: 'WMATIC',
//     tokenAddresses: {
//       137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
//     },
//     quoteTokenSymbol: QuoteToken.CAKE,
//     quoteTokenAdresses: contracts.cake,
//   },
//   {
//     pid: 2,
//     risk: 5,
//     isTokenOnly: true,
//     lpSymbol: 'MAX',
//     decimal: 18,
//     lpAddresses: {
//       137: '0x09833c4fbd1d28971b89a84fed3e8c16e45dea7d'
//     },
//     tokenSymbol: 'MAX',
//     tokenAddresses: {
//       137: '0xad04791c59547ccd826a164ffb9061cf12b93fd4'
//     },
//     quoteTokenSymbol: QuoteToken.USDC,
//     quoteTokenAdresses: contracts.usdc,
//   },
//   {
//     pid: 3,
//     risk: 3,
//     isTokenOnly: true,
//     lpSymbol: 'WMATIC',
//     decimal: 18,
//     lpAddresses: {
//       137: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827'
//     },
//     tokenSymbol: 'WMATIC',
//     tokenAddresses: {
//       137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
//     },
//     quoteTokenSymbol: QuoteToken.USDC,
//     quoteTokenAdresses: contracts.usdc,
//   },
//   {
//     pid: 4,
//     risk: 3,
//     isTokenOnly: true,
//     lpSymbol: 'AAVE',
//     decimal: 18,
//     lpAddresses: {
//       137: '0x7c76b6b3fe14831a39c0fec908da5f17180df677'
//     },
//     tokenSymbol: 'AAVE',
//     tokenAddresses: {
//       137: '0xd6df932a45c0f255f85145f286ea0b292b21c90b'
//     },
//     quoteTokenSymbol: QuoteToken.USDC,
//     quoteTokenAdresses: contracts.usdc,
//   },
//   {
//     pid: 5,
//     risk: 3,
//     isTokenOnly: true,
//     lpSymbol: 'WBTC',
//     decimal: 6,
//     lpAddresses: {
//       137: '0xf6a637525402643b0654a54bead2cb9a83c8b498'
//     },
//     tokenSymbol: 'WBTC',
//     tokenAddresses: {
//       137: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6'
//     },
//     quoteTokenSymbol: QuoteToken.USDC,
//     quoteTokenAdresses: contracts.usdc,
//   },
//   {
//     pid: 6,
//     risk: 3,
//     isTokenOnly: true,
//     lpSymbol: 'QUICK',
//     decimal: 18,
//     lpAddresses: {
//       137: '0x1f1e4c845183ef6d50e9609f16f6f9cae43bc9cb'
//     },
//     tokenSymbol: 'QUICK',
//     tokenAddresses: {
//       137: '0x831753dd7087cac61ab5644b308642cc1c33dc13'
//     },
//     quoteTokenSymbol: QuoteToken.USDC,
//     quoteTokenAdresses: contracts.usdc,
//   },
//   {
//     pid: 7,
//     risk: 3,
//     isTokenOnly: true,
//     lpSymbol: 'WETH',
//     decimal: 18,
//     lpAddresses: {
//       137: '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d'
//     },
//     tokenSymbol: 'WETH',
//     tokenAddresses: {
//       137: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
//     },
//     quoteTokenSymbol: QuoteToken.USDC,
//     quoteTokenAdresses: contracts.usdc,
//   },
//   {
//     pid: 8,
//     risk: 1,
//     isTokenOnly: true,
//     lpSymbol: 'DAI',
//     decimal: 18,
//     lpAddresses: {
//       137: '0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd'
//     },
//     tokenSymbol: 'DAI',
//     tokenAddresses: {
//       137: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'
//     },
//     quoteTokenSymbol: QuoteToken.USDC,
//     quoteTokenAdresses: contracts.usdc,
//   },
//   {
//     pid: 9,
//     risk: 3,
//     isTokenOnly: true,
//     lpSymbol: 'LINK',
//     decimal: 18,
//     lpAddresses: {
//       137: '0x70ceE55c98F6DA2685807611f115eA737d4a248E'
//     },
//     tokenSymbol: 'LINK',
//     tokenAddresses: {
//       137: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39'
//     },
//     quoteTokenSymbol: QuoteToken.USDC,
//     quoteTokenAdresses: contracts.usdc,
//   },

]

export default farms
