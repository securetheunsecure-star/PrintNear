export type UserRole = 'customer' | 'provider' | 'admin';

export type Provider = {
  id: string;
  name: string;
  location: string;
  postalCode: string;
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

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'ACCEPTED'
  | 'PRINTING'
  | 'READY_FOR_COLLECTION'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'REFUND_PENDING'
  | 'REFUNDED'
  | 'FAILED';

export type Order = {
  id: string;
  customerName: string;
  providerId: string;
  providerName: string;
  totalCents: number;
  status: OrderStatus;
  createdAt: string;
  pickupCode?: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
};

import { mockProviders, mockOrders } from '@/lib/mock-data';
import { calculateQuote } from '@/lib/pricing';

export const printNearStore = {
  users: [] as User[],
  providers: mockProviders.map((provider) => ({
    ...provider,
    postalCode: 'S' + (110000 + (provider.distance * 1000)).toString().slice(0, 5),
  })) as Provider[],
  orders: mockOrders.map((order) => ({
    ...order,
    providerId: `${order.providerName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    totalCents: order.total,
    status: order.status as OrderStatus,
    createdAt: order.createdAt,
    pickupCode: order.pickupCode,
  })) as Order[],
};

export function registerUser(input: Omit<User, 'id'>) {
  const email = input.email.trim().toLowerCase();
  if (printNearStore.users.some((user) => user.email === email)) {
    throw new Error('An account with this email already exists.');
  }

  const user: User = { ...input, id: `user_${Date.now()}`, email };
  printNearStore.users.push(user);
  return user;
}

export function validateLogin(email: string, password: string) {
  const user = printNearStore.users.find(
    (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password,
  );
  return user ?? null;
}

export function getProviderById(id: string) {
  return printNearStore.providers.find((provider) => provider.id === id) ?? null;
}

export function getProviderMatches(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [...printNearStore.providers];

  return printNearStore.providers.filter((provider) => {
    return [provider.name, provider.location, provider.postalCode].some((value) =>
      value.toLowerCase().includes(q),
    );
  });
}

export function registerProvider(input: Omit<Provider, 'id'>) {
  const name = input.name.trim();
  const location = input.location.trim();

  if (!name || !location) {
    return null;
  }

  const provider: Provider = {
    ...input,
    id: `provider_${Date.now()}`,
    name,
    location,
    available: input.available !== false,
    features: input.features.length ? input.features : ['A4', 'Duplex'],
  };

  printNearStore.providers.unshift(provider);
  return provider;
}

export function createOrder(input: { customerName: string; providerId: string; totalCents: number; status?: OrderStatus }) {
  const provider = getProviderById(input.providerId);
  const order: Order = {
    id: `PN-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: input.customerName,
    providerId: input.providerId,
    providerName: provider?.name ?? 'PrintNear Partner',
    totalCents: input.totalCents,
    status: input.status ?? 'PAID',
    createdAt: new Date().toISOString().slice(0, 10),
    pickupCode: `PRN-${Math.floor(1000 + Math.random() * 9000)}`,
  };

  printNearStore.orders.unshift(order);
  return order;
}

export function getOrderById(id: string) {
  return printNearStore.orders.find((order) => order.id === id) ?? null;
}

export function updateOrderStatus(id: string, status: string) {
  const order = getOrderById(id);
  if (!order) return null;

  order.status = status as OrderStatus;
  if (status === 'READY_FOR_COLLECTION' && !order.pickupCode) {
    order.pickupCode = `PRN-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  return order;
}

export function getSandboxQuote(input: { pages: number; color: boolean; copies: number; providerRate?: { bwPerPage: number; colourPerPage: number } }) {
  return calculateQuote(input);
}
