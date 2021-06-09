const companies = [
  {
    name: 'Impala Platinum',
    issuedShares: 779740000,
    primaryCommodity: 'platinum',
    website: 'https://www.implats.co.za/',
    logo: '/images/Impala.png',
    assets: [
      {
        name: 'Impala Rustenburg',
        location: 'South Africa',
        stage: 'mine',
        resource: [
          { commodity: 'platinum' },
          { commodity: 'palladium' },
          { commodity: 'rhodium' },
          { commodity: 'nickel' },
          { commodity: 'copper' },
        ],
      },
    ],
    tickers: [
      {
        exchange: 'OTC',
        ticker: 'IMPUY',
        date: '2021-05-29',
        currency: '$',
        price: 17.33,
      },
    ],
  },
  {
    name: 'Antofagasta',
    issuedShares: 985860000,
    primaryCommodity: 'copper',
    website: 'https://www.antofagasta.co.uk/',
    logo: '/images/antofagasta.png',
    assets: [
      {
        name: 'Los Pelambres',
        location: 'Chile',
        stage: 'production',
        resource: [
          { commodity: 'copper' },
          { commodity: 'gold' },
          { commodity: 'silver' },
        ],
      },
      {
        name: 'Centinela',
        location: 'Chile',
        stage: 'production',
        resource: [
          { commodity: 'copper' },
          { commodity: 'gold' },
          { commodity: 'silver' },
        ],
      },
      {
        name: 'Zaldívar',
        location: 'Chile',
        stage: 'production',
        resource: [{ commodity: 'copper' }],
      },
    ],
    tickers: [
      {
        exchange: 'LSE',
        ticker: 'ANTO',
        date: '2021-06-6',
        currency: '£',
        price: 15.655,
      },
    ],
  },
  {
    name: 'Marenica Energy',
    issuedShares: 207871461,
    primaryCommodity: 'uranium',
    website: 'http://marenicaenergy.com.au/',
    logo: '/images/MEY.jpeg',
    assets: [
      {
        name: 'Namib land package',
        location: 'Namibia',
        stage: 'exploration',
        resource: [{ size: 0, units: 'Mlb', commodity: 'uranium' }],
      },
    ],
    tickers: [
      {
        exchange: 'ASX',
        ticker: 'MEY',
        price: 0.3,
        date: '2021-05-25',
        currency: 'A$',
      },
    ],
  },
  {
    name: 'Nexgen Energy',
    issuedShares: 470683919,
    primaryCommodity: 'uranium',
    website: 'https://www.nexgenenergy.ca/',
    logo: '/images/NXE.jpeg',
    assets: [
      {
        name: 'Arrow',
        location: 'Athabasca Basin, Canada',
        stage: 'Developer',
        resource: [{ size: 239.6, units: 'Mlb', commodity: 'uranium' }],
      },
    ],
    tickers: [
      {
        exchange: 'NYSE',
        ticker: 'NXE',
        date: '2021-05-25',
        currency: '$',
        price: 4.34,
      },
      {
        exchange: 'TSX',
        ticker: 'NXE',
        date: '2021-05-25',
        currency: 'C$',
        price: 5.23,
      },
    ],
  },
  {
    name: 'Boss Energy',
    issuedShares: 2278276306,
    primaryCommodity: 'uranium',
    website: 'https://www.bossenergy.com/',
    logo: '/images/BOE.webp',
    assets: [
      {
        name: 'Honeymoon',
        location: 'Australia',
        stage: 'Developer',
        resource: [{ size: 36, units: 'Mlb', commodity: 'uranium' }],
      },
    ],
    tickers: [
      {
        exchange: 'ASX',
        ticker: 'BOE',
        date: '2021-05-25',
        currency: 'A$',
        price: 0.165,
      },
    ],
  },
];

companies.forEach((company) => {
  const mcapValue = company.issuedShares * company.tickers[0].price;
  company.mcap = {
    currency: company.tickers[0].currency,
    value: mcapValue,
  };
});

export default companies;

// {
//   name: '',
//   issuedShares: 0,
//   primaryCommodity: '',
//   website: '',
//   logo: '',
//   assets: [
//     {
//       name: '',
//       commodity: [],
//       location: '',
//       stage: '',
//       resource: '',
//     },
//   ],
//   tickers: [
//     {
//       exchange: 'ASX',
//       ticker: '',
//       date: '2021-05-25',
//       currency: 'A$',
//       price: '',
//     },
//     {
//       exchange: 'OTC',
//       ticker: '',
//       date: '2021-05-25',
//       currency: '$',
//       price: '',
//     },
//     {
//       exchange: 'NYSE',
//       ticker: '',
//       date: '2021-05-25',
//       currency: '$',
//       price: '',
//     },
//     {
//       exchange: 'TSX',
//       ticker: '',
//       date: '2021-05-25',
//       currency: '$C',
//       price: '',
//     },
//   ],
// },
