export type Provider = {
  id: string;
  name: string;
  location: string;
  available: boolean;
  rating: number;
  distance: number;
  pickupWindow: string;
  pricing: {
    bwPerPage: number;
    colourPerPage: number;
  };
  features: string[];
};

export type Order = {
  id: string;
  customerName: string;
  providerName: string;
  total: number;
  status: string;
  createdAt: string;
  pickupCode?: string;
};

export const mockProviders: Provider[] = [
  {
    id: 'p1',
    name: 'PrintNest @ Tampines',
    location: 'Tampines Street 21',
    available: true,
    rating: 4.9,
    distance: 1.2,
    pickupWindow: 'Within 4 hours',
    pricing: { bwPerPage: 0.15, colourPerPage: 0.4 },
    features: ['A4', 'Duplex', 'Colour ready']
  },
  {
    id: 'p2',
    name: 'QuickCopy Bedok',
    location: 'Bedok Reservoir',
    available: true,
    rating: 4.8,
    distance: 2.4,
    pickupWindow: 'Same day',
    pricing: { bwPerPage: 0.17, colourPerPage: 0.45 },
    features: ['A3', 'Duplex', 'High volume']
  },
  {
    id: 'p3',
    name: 'OfficePrint Punggol',
    location: 'Punggol Central',
    available: false,
    rating: 4.7,
    distance: 3.1,
    pickupWindow: 'Tomorrow',
    pricing: { bwPerPage: 0.16, colourPerPage: 0.42 },
    features: ['A4', 'Office prints', 'Secure handling']
  },
  {
    id: 'p4',
    name: 'HomeDoc Queenstown',
    location: 'Queenstown',
    available: true,
    rating: 4.9,
    distance: 4.2,
    pickupWindow: 'Within 2 hours',
    pricing: { bwPerPage: 0.14, colourPerPage: 0.38 },
    features: ['A4', 'Fast pickup', 'Colour']
  },
  {
    id: 'p5',
    name: 'TidyPrint Jurong',
    location: 'Jurong East',
    available: true,
    rating: 4.6,
    distance: 5.7,
    pickupWindow: 'Within 6 hours',
    pricing: { bwPerPage: 0.18, colourPerPage: 0.46 },
    features: ['A4', 'Duplex', 'Weekend slots']
  }
];

export const mockOrders: Order[] = [
  {
    id: 'PN-1024',
    customerName: 'Sarah Lim',
    providerName: 'PrintNest @ Tampines',
    total: 1260,
    status: 'READY_FOR_COLLECTION',
    createdAt: '2026-10-09',
    pickupCode: 'PRN-8421'
  },
  {
    id: 'PN-1023',
    customerName: 'Daniel Tan',
    providerName: 'QuickCopy Bedok',
    total: 450,
    status: 'PAID',
    createdAt: '2026-10-08'
  },
  {
    id: 'PN-1022',
    customerName: 'Alicia Wong',
    providerName: 'OfficePrint Punggol',
    total: 960,
    status: 'REJECTED',
    createdAt: '2026-10-07'
  }
];

export const adminStats = {
  users: 1842,
  providers: 264,
  orders: 1894,
  revenue: 14320,
  platformCommission: 2864,
  pendingRefunds: 4
};
