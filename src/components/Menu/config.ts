import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: "Presale",
    icon: 'TicketIcon',
    href: '/presale',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://spookyswap.finance/swap?outputCurrency=',
      },
      {
        label: 'Liquidity',
        href: 'https://spookyswap.finance/add',
      },
    ],
  },
  
  // {
  //   label: "Farms",
  //   icon: 'FarmIcon',
  //   href: '/farms',
  // },
  {
    label: "Farms",
    icon: 'FarmIcon',
    href: '/Farms',
  },
  // {
  //   label: "Pools",
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  {
    label: "Pools",
    icon: 'PoolIcon',
    href: '/Pools',
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {

        label: 'spookyswap',
        href: '#',
      },
      {
        label: 'Vfat',
        href: '#',
      },
      {
        label: 'DappRadar',
        href: '#'
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: '#',
      },
      {
        label: 'Docs',
        href: '#',
      },
    ],
  },
  {
    label: 'Audit',
    icon: 'AuditIcon',
    href: '#'
  },
  // {
  //   label: 'Reviewed by Rugdoc',
  //   icon: 'AuditIcon',
  //   href: '#',
  // },
  // {
  //   label: 'JagoSafer KYC | Low Risk',
  //   icon: 'AuditIcon',
  //   href: 'https://jagosafer.io/maximum-farm',
  // },
  // {
  //   label: 'Roadmap',
  //   icon: 'RoadmapaIcon',
  //   href: 'https://maximum-farm.gitbook.io/max-farm/roadmap',
  // },
]

export default config
