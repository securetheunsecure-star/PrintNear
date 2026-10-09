export function OrderStatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { label: string; className: string }> = {
    PENDING_PAYMENT: { label: 'Pending payment', className: 'bg-amber-100 text-amber-700' },
    PAID: { label: 'Paid', className: 'bg-blue-100 text-blue-700' },
    ACCEPTED: { label: 'Accepted', className: 'bg-emerald-100 text-emerald-700' },
    PRINTING: { label: 'Printing', className: 'bg-violet-100 text-violet-700' },
    READY_FOR_COLLECTION: { label: 'Ready', className: 'bg-cyan-100 text-cyan-700' },
    COMPLETED: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700' },
    REJECTED: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
    CANCELLED: { label: 'Cancelled', className: 'bg-slate-200 text-slate-700' },
    REFUND_PENDING: { label: 'Refund pending', className: 'bg-orange-100 text-orange-700' },
    REFUNDED: { label: 'Refunded', className: 'bg-rose-100 text-rose-700' },
    FAILED: { label: 'Failed', className: 'bg-red-100 text-red-700' }
  };

  const mapping = statusMap[status] ?? { label: status, className: 'bg-slate-100 text-slate-700' };

  return <span className={`badge ${mapping.className}`}>{mapping.label}</span>;
}
