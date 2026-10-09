'use client';

import { useEffect, useState } from 'react';

type OrderRecord = {
  id: string;
  customerName: string;
  providerName: string;
  totalCents: number;
  status: string;
  pickupCode?: string;
};

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);
    try {
      const response = await fetch('/api/orders');
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Unable to load orders.');
      }

      const list = Array.isArray(payload.orders) ? payload.orders : [];
      setOrders(list);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  async function updateStatus(orderId: string, status: string) {
    const response = await fetch('/api/provider', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, status }),
    });

    const payload = await response.json();
    if (response.ok && payload.ok) {
      await loadOrders();
    }
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Provider orders</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Incoming requests</h1>
      </div>

      {loading ? <div className="card p-6 text-slate-600">Loading orders…</div> : null}

      {!loading && orders.length === 0 ? <div className="card p-6 text-slate-600">No orders yet.</div> : null}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{order.id}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{order.customerName}</h2>
              <p className="mt-1 text-sm text-slate-500">{order.providerName}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{order.status}</span>
              <span className="text-lg font-black text-slate-900">S${(order.totalCents / 100).toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => void updateStatus(order.id, 'ACCEPTED')} className="rounded-full bg-emerald-600 px-3 py-2 text-sm font-semibold text-white">Accept</button>
              <button type="button" onClick={() => void updateStatus(order.id, 'REJECTED')} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">Reject</button>
              <button type="button" onClick={() => void updateStatus(order.id, 'READY_FOR_COLLECTION')} className="rounded-full bg-brand-600 px-3 py-2 text-sm font-semibold text-white">Ready</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
