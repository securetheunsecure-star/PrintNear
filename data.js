const demoConfig = {
  bwRate: 0.15,
  colourRate: 0.40,
  serviceFee: 0.5,
  platformCommissionRate: 0.2,
  statusFlow: [
    'Pending',
    'Paid (simulated)',
    'Accepted',
    'Printing',
    'Ready for Collection',
    'Completed',
    'Cancelled',
    'Failed'
  ]
};

const samplePrinters = [
  {
    id: 'printer-1',
    name: 'Tampines Ink Hub',
    location: 'Tampines Central, 520123',
    distanceKm: 1.6,
    available: true,
    bwPrice: 0.15,
    colourPrice: 0.4,
    duplex: true,
    paperSizes: ['A4', 'A3', 'Letter'],
    availability: 'Mon-Sun, 9am-9pm',
    completionTime: '30-60 min',
    rating: 4.9,
    isOwnerListing: false,
    source: 'sample'
  },
  {
    id: 'printer-2',
    name: 'PaperNest by Alina',
    location: 'Serangoon North, 550456',
    distanceKm: 3.2,
    available: true,
    bwPrice: 0.18,
    colourPrice: 0.45,
    duplex: true,
    paperSizes: ['A4', 'Legal'],
    availability: 'Weeknights & weekends',
    completionTime: '1-2 hrs',
    rating: 4.8,
    isOwnerListing: false,
    source: 'sample'
  },
  {
    id: 'printer-3',
    name: 'BlueDesk Prints',
    location: 'Jurong West, 640177',
    distanceKm: 5.7,
    available: false,
    bwPrice: 0.12,
    colourPrice: 0.38,
    duplex: false,
    paperSizes: ['A4', 'A5', 'Letter'],
    availability: 'Tue-Sat, 10am-6pm',
    completionTime: '2-4 hrs',
    rating: 4.6,
    isOwnerListing: false,
    source: 'sample'
  },
  {
    id: 'printer-4',
    name: 'HomePrint by Kevin',
    location: 'Bishan, 570344',
    distanceKm: 2.4,
    available: true,
    bwPrice: 0.14,
    colourPrice: 0.42,
    duplex: true,
    paperSizes: ['A4', 'A3', 'Legal'],
    availability: 'Daily, 8am-8pm',
    completionTime: '45 min',
    rating: 4.7,
    isOwnerListing: false,
    source: 'sample'
  }
];

const defaultDemoOrders = [
  {
    id: 'order-101',
    reference: 'IP-20261010-101',
    printerId: 'printer-1',
    printerName: 'Tampines Ink Hub',
    status: 'Paid (simulated)',
    printSettings: {
      colorMode: 'bw',
      duplex: 'double-sided',
      copies: 3,
      paperSize: 'A4',
      pageCount: 12
    },
    total: 7.1,
    createdAt: '2026-10-10T09:21:00Z',
    notes: 'Please place in basket near entrance.'
  },
  {
    id: 'order-102',
    reference: 'IP-20261010-102',
    printerId: 'printer-2',
    printerName: 'PaperNest by Alina',
    status: 'Ready for Collection',
    printSettings: {
      colorMode: 'colour',
      duplex: 'single-sided',
      copies: 2,
      paperSize: 'A4',
      pageCount: 8
    },
    total: 8.9,
    createdAt: '2026-10-09T12:33:00Z',
    notes: 'Collect after 2pm.'
  }
];

const sampleState = {
  printers: [...samplePrinters],
  orders: [...defaultDemoOrders],
  selectedPrinterId: null,
  checkoutOrderId: null
};

window.instPrintDemoData = {
  demoConfig,
  samplePrinters,
  defaultDemoOrders,
  sampleState
};
