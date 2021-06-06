const companies = [
  {
    _id: '1',
    name: 'Impala Platinum',
    issuedShares: 779740000,
    primaryCommodity: 'platinum',
    website: 'https://www.implats.co.za/',
    logo: 'frontend/public/images/Impala.png',
    assets: [
      {
        name: 'Impala Rustenburg',
        commodity: ['platinum', 'palladium', 'rhodium', 'nickel', 'copper'],
        location: '',
        stage: '',
        resource: '',
      },
    ],
    tickers: [
      {
        exchange: 'OTC',
        ticker: 'IMPUY',
        date: '2021-05-29',
        currency: '$',
        price: '17.33',
      },
    ],
  },
  {
    _id: '2',
    name: 'Antofagasta PLC',
    issuedShares: 985860000,
    primaryCommodity: 'Copper',
    website: 'https://www.antofagasta.co.uk/',
    logo: 'frontend/public/images/antofagasta.png',
    assets: [
      {
        name: 'Los Pelambres',
        commodity: ['copper', 'gold', 'silver'],
        location: 'Chile',
        stage: 'production',
        resource: '',
      },
      {
        name: 'Centinela',
        commodity: ['copper', 'gold', 'silver'],
        location: 'Chile',
        stage: 'production',
        resource: '',
      },
      {
        name: 'Zaldívar',
        commodity: ['copper'],
        location: 'Chile',
        stage: 'production',
        resource: '',
      },
    ],
    tickers: [
      {
        exchange: 'LSE',
        ticker: 'ANTO',
        date: '2021-06-6',
        currency: '£',
        price: '1565.50',
      },
    ],
  },
  {
    _id: '3',
    name: 'Marenica Energy',
    issuedShares: 207871461,
    primaryCommodity: 'uranium',
    website: 'http://marenicaenergy.com.au/',
    logo: '/home/tom/Desktop/resources-investing/frontend/public/images/MEY.jpeg',
    assets: [
      {
        name: 'Namib land package',
        commodity: ['uranium'],
        location: 'Namibia',
        stage: 'exploration',
        resource: '0',
      },
    ],
    tickers: [
      {
        exchange: 'ASX',
        ticker: 'MEY',
        price: '0.3',
        date: '2021-05-25',
        currency: 'A$',
      },
    ],
  },
  {
    _id: '4',
    name: 'Nexgen Energy Ltd.',
    issuedShareCount: 470683919,
    primaryCommodity: 'uranium',
    website: 'https://www.nexgenenergy.ca/',
    logo: '/home/tom/Desktop/resources-investing/frontend/public/images/NXE.jpeg',
    assets: [
      {
        name: 'Arrow',
        commodity: ['uranium'],
        location: 'Athabasca Basin, Canada',
        stage: 'Developer',
        resource: '239.6',
      },
    ],
    tickers: [
      {
        exchange: 'NYSE',
        ticker: 'NXE',
        date: '2021-05-25',
        currency: '$',
        price: '4.34',
      },
      {
        exchange: 'TSX',
        ticker: 'NXE',
        date: '2021-05-25',
        currency: 'C$',
        price: '5.23',
      },
    ],
  },
  {
    _id: '5',
    name: 'Boss Energy',
    issuedShares: 2278276306,
    primaryCommodity: 'uranium',
    website: 'https://www.bossenergy.com/',
    logo: '/home/tom/Desktop/resources-investing/frontend/public/images/BOE.webp',
    assets: [
      {
        name: 'Honeymoon',
        commodity: ['uranium'],
        location: 'Australia',
        stage: 'Developer',
        resource: '36',
      },
    ],
    tickers: [
      {
        exchange: 'ASX',
        ticker: 'BOE',
        date: '2021-05-25',
        currency: 'A$',
        price: '0.165',
      },
    ],
  },
  {
    _id: 'template',
    name: '',
    issuedShares: 0,
    primaryCommodity: '',
    website: '',
    logo: '',
    assets: [
      {
        name: '',
        commodity: [],
        location: '',
        stage: '',
        resource: '',
      },
    ],
    tickers: [
      {
        exchange: 'ASX',
        ticker: '',
        date: '2021-05-25',
        currency: 'A$',
        price: '',
      },
      {
        exchange: 'OTC',
        ticker: '',
        date: '2021-05-25',
        currency: '$',
        price: '',
      },
      {
        exchange: 'NYSE',
        ticker: '',
        date: '2021-05-25',
        currency: '$',
        price: '',
      },
      {
        exchange: 'TSX',
        ticker: '',
        date: '2021-05-25',
        currency: '$C',
        price: '',
      },
    ],
  },
];

export default companies;
