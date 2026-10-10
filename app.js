const STORAGE_KEY = 'instprint-demo-state-v1';

const currencyFormatter = new Intl.NumberFormat('en-SG', {
  style: 'currency',
  currency: 'SGD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const orderStatusSequence = [
  'Pending',
  'Paid (simulated)',
  'Accepted',
  'Printing',
  'Ready for Collection',
  'Completed',
  'Cancelled',
  'Failed'
];

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.printers) || !Array.isArray(parsed.orders)) {
      return null;
    }

    return parsed;
  } catch (error) {
    console.warn('Failed to read localStorage state:', error);
    return null;
  }
}

function writeStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save localStorage state:', error);
  }
}

function getDefaultState() {
  return {
    printers: JSON.parse(JSON.stringify(window.instPrintDemoData.sampleState.printers)),
    orders: JSON.parse(JSON.stringify(window.instPrintDemoData.defaultDemoOrders)),
    selectedPrinterId: null,
    checkoutOrderId: null
  };
}

function getState() {
  const stored = readStorage();
  if (stored) {
    return stored;
  }

  const base = getDefaultState();
  writeStorage(base);
  return base;
}

function saveState(state) {
  writeStorage(state);
}

function formatPrice(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 'S$0.00';
  }
  return currencyFormatter.format(value);
}

function centsValue(amount) {
  return Math.round((Number(amount) || 0) * 100);
}

function toCityDistanceLabel(distanceKm) {
  if (typeof distanceKm !== 'number') {
    return 'Illustrative distance';
  }
  return `Approx. ${distanceKm.toFixed(1)} km away`;
}

function generateOrderReference() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 900 + 100);
  return `IP-${stamp}-${random}`;
}

function calculatePriceBreakdown({
  printer,
  pageCount,
  copies,
  colorMode
}) {
  const unitPrice = colorMode === 'colour' ? printer.colourPrice : printer.bwPrice;
  const subtotal = Number(pageCount) * Number(copies) * Number(unitPrice);
  const serviceFee = window.instPrintDemoData.demoConfig.serviceFee;
  const platformCommission = subtotal * window.instPrintDemoData.demoConfig.platformCommissionRate;
  const customerTotal = subtotal + serviceFee;
  const providerEarnings = subtotal - platformCommission;

  return {
    unitPrice,
    subtotal,
    serviceFee,
    platformCommission,
    customerTotal,
    providerEarnings,
    pageCount,
    copies,
    colorMode
  };
}

function getPrinterById(printerId, state = getState()) {
  return state.printers.find((printer) => printer.id === printerId) || null;
}

function getOrderById(orderId, state = getState()) {
  return state.orders.find((order) => order.id === orderId) || null;
}

function normalizeStatus(status) {
  return orderStatusSequence.includes(status) ? status : 'Pending';
}

function advanceOrderStatus(order) {
  const index = orderStatusSequence.indexOf(order.status);
  const nextIndex = index >= 0 ? (index + 1) % orderStatusSequence.length : 0;
  return orderStatusSequence[nextIndex];
}

function getStatusClass(status) {
  const normalized = normalizeStatus(status || 'Pending');
  const safe = normalized.toLowerCase().replace(/\s+/g, '-');
  if (safe.includes('pending')) return 'status-pending';
  if (safe.includes('paid') || safe.includes('accepted') || safe.includes('printing') || safe.includes('ready') || safe.includes('completed')) return 'status-paid';
  if (safe.includes('cancelled') || safe.includes('failed')) return 'status-cancelled';
  return 'status-pending';
}

function getStatusLabel(status) {
  return normalizeStatus(status || 'Pending');
}

function togglePrinterAvailability(printerId, activeState) {
  const state = getState();
  const printer = getPrinterById(printerId, state);
  if (!printer) return;

  printer.available = Boolean(activeState);
  saveState(state);
}

function addOwnerListing(formData) {
  const state = getState();
  const newId = `owner-printer-${Date.now()}`;
  const listing = {
    id: newId,
    name: formData.displayName,
    location: formData.location,
    distanceKm: 1.3 + Math.random() * 4.8,
    available: formData.active,
    bwPrice: Number(formData.bwPrice),
    colourPrice: Number(formData.colourPrice),
    duplex: formData.duplex === 'true',
    paperSizes: formData.paperSizes.split(',').map((item) => item.trim()).filter(Boolean),
    availability: formData.availability,
    completionTime: '45-90 min',
    rating: 4.7,
    minimumOrder: Number(formData.minimumOrder),
    collectionNotes: formData.collectionNotes,
    isOwnerListing: true,
    source: 'owner'
  };

  state.printers.push(listing);
  saveState(state);
}

function createDemoOrder(orderData) {
  const state = getState();
  const reference = generateOrderReference();
  const printer = getPrinterById(orderData.printerId, state);

  const entry = {
    id: `order-${Date.now()}`,
    reference,
    printerId: printer.id,
    printerName: printer.name,
    status: 'Pending',
    printSettings: {
      colorMode: orderData.colorMode,
      duplex: orderData.duplex,
      copies: Number(orderData.copies),
      paperSize: orderData.paperSize,
      pageCount: Number(orderData.pageCount)
    },
    total: Number(orderData.customerTotal),
    createdAt: new Date().toISOString(),
    notes: orderData.notes || '',
    paymentResult: orderData.paymentResult || 'pending'
  };

  state.orders.unshift(entry);
  state.checkoutOrderId = entry.id;
  saveState(state);
  return entry;
}

function updateOrderStatus(orderId, nextStatus) {
  const state = getState();
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  order.status = normalizeStatus(nextStatus);
  saveState(state);
}

function getOrderTotalsForOwner() {
  const state = getState();
  const metrics = {
    gross: 0,
    commission: 0,
    earnings: 0
  };

  state.orders.forEach((order) => {
    const total = Number(order.total) || 0;
    if (Number.isFinite(total)) {
      metrics.gross += total;
      metrics.commission += total * 0.2;
      metrics.earnings += total * 0.8;
    }
  });

  return metrics;
}

function getOwnerListingMetrics() {
  const state = getState();
  const ownerListings = state.printers.filter((printer) => printer.isOwnerListing || printer.source === 'owner');
  return {
    totalListings: ownerListings.length,
    activeListings: ownerListings.filter((item) => item.available).length,
    inactiveListings: ownerListings.filter((item) => !item.available).length
  };
}

function renderHomePageActions() {
  const homeSearchBtn = document.getElementById('home-search-btn');
  const earnWithPrinterBtn = document.getElementById('earn-with-printer-btn');

  if (homeSearchBtn) {
    homeSearchBtn.addEventListener('click', () => {
      const input = document.getElementById('home-search');
      const searchValue = (input?.value || '').trim();
      document.getElementById('printer-search').value = searchValue;
      document.getElementById('find-printer').scrollIntoView({ behavior: 'smooth', block: 'start' });
      renderPrinterList();
    });
  }

  if (earnWithPrinterBtn) {
    earnWithPrinterBtn.addEventListener('click', () => {
      document.getElementById('become-owner').scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('owner-name').focus();
    });
  }
}

function renderPrinterList() {
  const list = document.getElementById('printer-list');
  const search = (document.getElementById('printer-search')?.value || '').trim().toLowerCase();
  const type = document.getElementById('printer-type')?.value || 'all';
  const maxPriceValue = document.getElementById('printer-max-price')?.value || 'all';
  const availableOnly = document.getElementById('available-only')?.checked || false;
  const sortBy = document.getElementById('printer-sort')?.value || 'distance';

  const state = getState();
  let printers = [...state.printers];

  if (search) {
    printers = printers.filter((printer) => {
      const haystack = `${printer.name} ${printer.location}`.toLowerCase();
      return haystack.includes(search);
    });
  }

  if (type === 'bw') {
    printers = printers.filter((printer) => printer.bwPrice > 0);
  } else if (type === 'colour') {
    printers = printers.filter((printer) => printer.colourPrice > 0);
  }

  if (maxPriceValue !== 'all') {
    const limit = Number(maxPriceValue);
    printers = printers.filter((printer) => {
      const price = Math.min(printer.bwPrice, printer.colourPrice);
      return price <= limit;
    });
  }

  if (availableOnly) {
    printers = printers.filter((printer) => printer.available);
  }

  printers.sort((a, b) => {
    if (sortBy === 'price-low') {
      return Math.min(a.bwPrice, a.colourPrice) - Math.min(b.bwPrice, b.colourPrice);
    }
    if (sortBy === 'price-high') {
      return Math.min(b.bwPrice, b.colourPrice) - Math.min(a.bwPrice, a.colourPrice);
    }
    return (a.distanceKm || 999) - (b.distanceKm || 999);
  });

  if (!printers.length) {
    list.innerHTML = '<div class="empty-state">No nearby printers match your filters. Try broadening the search or enabling the availability switch.</div>';
    return;
  }

  list.innerHTML = printers
    .map((printer) => {
      const bestPrice = Math.min(printer.bwPrice, printer.colourPrice);
      const statusClass = printer.available ? 'available' : 'unavailable';
      const statusText = printer.available ? 'Available' : 'Unavailable';
      const paperSizes = printer.paperSizes?.join(', ') || 'A4';

      return `
        <article class="printer-card" data-printer-id="${printer.id}">
          <div class="printer-header">
            <div>
              <h3>${printer.name}</h3>
              <p>${printer.location}</p>
            </div>
            <span class="badge ${statusClass}">${statusText}</span>
          </div>

          <div class="printer-meta">
            <span>${toCityDistanceLabel(printer.distanceKm)}</span>
            <span>${printer.rating.toFixed(1)}★ demo rating</span>
          </div>

          <table aria-label="Printer price and services">
            <tbody>
              <tr><td>B&amp;W</td><td>${formatPrice(printer.bwPrice)}/page</td></tr>
              <tr><td>Colour</td><td>${formatPrice(printer.colourPrice)}/page</td></tr>
              <tr><td>Paper</td><td>${paperSizes}</td></tr>
              <tr><td>Duplex</td><td>${printer.duplex ? 'Yes' : 'No'}</td></tr>
              <tr><td>ETA</td><td>${printer.completionTime}</td></tr>
            </tbody>
          </table>

          <div class="card-actions">
            <span><strong>From ${formatPrice(bestPrice)}</strong></span>
            <button class="btn btn-primary btn-inline" type="button" data-select-printer="${printer.id}">
              Book this printer
            </button>
          </div>
        </article>
      `;
    })
    .join('');

  document.querySelectorAll('[data-select-printer]').forEach((button) => {
    button.addEventListener('click', () => {
      const printerId = button.getAttribute('data-select-printer');
      const printer = getPrinterById(printerId, getState());
      renderOrderPanel(printer);
      document.getElementById('selected-printer-order').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function renderOrderPanel(printer) {
  const panel = document.getElementById('selected-printer-order');
  if (!printer) {
    panel.classList.add('hidden');
    panel.innerHTML = '';
    return;
  }

  panel.classList.remove('hidden');
  panel.innerHTML = `
    <div class="section-heading left-aligned">
      <p class="eyebrow">Print order</p>
      <h2>Order from ${printer.name}</h2>
    </div>

    <form id="print-order-form" data-printer-id="${printer.id}" novalidate>
      <div class="order-form-grid">
        <div>
          <label for="upload-file">Upload PDF</label>
          <input id="upload-file" name="uploadFile" type="file" accept="application/pdf" />
          <p class="prototype-note">Customer-entered page count is required for this demo. Uploaded PDF files are not stored in localStorage.</p>
        </div>
        <div>
          <label for="order-page-count">Customer-entered page count</label>
          <input id="order-page-count" name="pageCount" type="number" min="1" value="10" required />
        </div>
        <div>
          <label for="order-colour-mode">Print type</label>
          <select id="order-colour-mode" name="colourMode">
            <option value="bw">Black-and-white</option>
            <option value="colour">Colour</option>
          </select>
        </div>
        <div>
          <label for="order-duplex">Printing mode</label>
          <select id="order-duplex" name="duplex">
            <option value="single-sided">Single-sided</option>
            <option value="double-sided">Double-sided</option>
          </select>
        </div>
        <div>
          <label for="order-copies">Number of copies</label>
          <input id="order-copies" name="copies" type="number" min="1" value="1" required />
        </div>
        <div>
          <label for="order-paper-size">Paper size</label>
          <select id="order-paper-size" name="paperSize">
            ${printer.paperSizes.map((size) => `<option value="${size}">${size}</option>`).join('')}
          </select>
        </div>
        <div class="span-2">
          <label for="order-notes">Collection notes</label>
          <textarea id="order-notes" name="notes" rows="3" placeholder="Optional notes for pick-up or delivery"></textarea>
        </div>
      </div>

      <div id="order-pricing" class="pricing-breakdown" aria-live="polite"></div>
      <div id="order-form-error" class="error-text" aria-live="polite"></div>
      <div class="order-actions">
        <button type="submit" class="btn btn-primary">Continue to Demo Checkout</button>
      </div>
    </form>
  `;

  const form = document.getElementById('print-order-form');
  const pageCountInput = document.getElementById('order-page-count');
  const copiesInput = document.getElementById('order-copies');
  const colourModeSelect = document.getElementById('order-colour-mode');
  const fileInput = document.getElementById('upload-file');

  const updatePricing = () => {
    const priceBreakdown = calculatePriceBreakdown({
      printer,
      pageCount: Number(pageCountInput.value || 0),
      copies: Number(copiesInput.value || 1),
      colorMode: colourModeSelect.value
    });

    const breakdownEl = document.getElementById('order-pricing');
    if (breakdownEl) {
      breakdownEl.innerHTML = `
        <h3>Price breakdown (illustrative)</h3>
        <div class="breakdown-row"><span>Printing subtotal</span><strong>${formatPrice(priceBreakdown.subtotal)}</strong></div>
        <div class="breakdown-row"><span>Service fee</span><strong>${formatPrice(priceBreakdown.serviceFee)}</strong></div>
        <div class="breakdown-row"><span>Platform commission (20%)</span><strong>${formatPrice(priceBreakdown.platformCommission)}</strong></div>
        <div class="breakdown-row"><span>Provider earnings</span><strong>${formatPrice(priceBreakdown.providerEarnings)}</strong></div>
        <div class="breakdown-row total"><span>Customer total</span><strong>${formatPrice(priceBreakdown.customerTotal)}</strong></div>
      `;
    }
  };

  [pageCountInput, copiesInput, colourModeSelect].forEach((input) => {
    input.addEventListener('input', updatePricing);
    input.addEventListener('change', updatePricing);
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      document.getElementById('order-form-error').textContent = 'Only PDF files are allowed for this demo.';
      fileInput.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      document.getElementById('order-form-error').textContent = 'PDF exceeds 5 MB limit. Please keep the file under 5 MB or enter the page count manually.';
      fileInput.value = '';
      return;
    }

    document.getElementById('order-form-error').textContent = 'Uploaded PDF is stored only in memory for this session and will be discarded when the page is refreshed.';
    updatePricing();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const file = fileInput.files && fileInput.files[0];
    const pageCount = Number(pageCountInput.value || 0);
    const copies = Number(copiesInput.value || 1);
    const colourMode = colourModeSelect.value;
    const duplex = document.getElementById('order-duplex').value;
    const paperSize = document.getElementById('order-paper-size').value;
    const notes = document.getElementById('order-notes').value.trim();
    const errorEl = document.getElementById('order-form-error');

    if (file && file.type !== 'application/pdf') {
      errorEl.textContent = 'Only PDF uploads are supported in this prototype.';
      return;
    }

    if (!file && pageCount <= 0) {
      errorEl.textContent = 'Please upload a PDF or enter the page count manually.';
      return;
    }

    if (copies <= 0) {
      errorEl.textContent = 'Copies must be at least 1.';
      return;
    }

    const breakdown = calculatePriceBreakdown({ printer, pageCount, copies, colorMode: colourMode });
    const state = getState();
    const order = createDemoOrder({
      printerId: printer.id,
      colorMode: colourMode,
      duplex,
      copies,
      paperSize,
      pageCount,
      notes,
      customerTotal: breakdown.customerTotal
    });

    const checkoutPanel = document.createElement('div');
    const reference = order.reference;
    checkoutPanel.className = 'order-panel';
    checkoutPanel.innerHTML = `
      <div class="section-heading left-aligned">
        <p class="eyebrow">Demo checkout</p>
        <h2>Complete your order</h2>
      </div>
      <div class="pricing-breakdown">
        <div class="breakdown-row"><span>Order reference</span><strong>${reference}</strong></div>
        <div class="breakdown-row"><span>Printer</span><strong>${printer.name}</strong></div>
        <div class="breakdown-row"><span>Print type</span><strong>${colourMode === 'bw' ? 'Black-and-white' : 'Colour'}</strong></div>
        <div class="breakdown-row"><span>Copies</span><strong>${copies}</strong></div>
        <div class="breakdown-row"><span>Page count</span><strong>${pageCount}</strong></div>
        <div class="breakdown-row total"><span>Customer total</span><strong>${formatPrice(breakdown.customerTotal)}</strong></div>
      </div>
      <div class="order-actions">
        <button type="button" class="btn btn-primary" id="simulate-success-button">Simulate successful payment</button>
        <button type="button" class="btn btn-danger" id="simulate-failure-button">Simulate failed payment</button>
      </div>
      <p class="prototype-note">This is a demo checkout only. No real card details are collected and these are not actual payments.</p>
    `;

    panel.replaceChildren(checkoutPanel);
    document.getElementById('simulate-success-button').addEventListener('click', () => {
      const updatedState = getState();
      const currentOrder = updatedState.orders.find((item) => item.id === order.id);
      currentOrder.status = 'Paid (simulated)';
      currentOrder.paymentResult = 'success';
      saveState(updatedState);
      renderOrderHistory();
      renderDashboard();
      renderAdminDashboard();
      showConfirmationScreen(currentOrder, true);
    });

    document.getElementById('simulate-failure-button').addEventListener('click', () => {
      const updatedState = getState();
      const currentOrder = updatedState.orders.find((item) => item.id === order.id);
      currentOrder.status = 'Failed';
      currentOrder.paymentResult = 'failed';
      saveState(updatedState);
      renderOrderHistory();
      renderDashboard();
      renderAdminDashboard();
      showConfirmationScreen(currentOrder, false);
    });

    if (file) {
      URL.revokeObjectURL(URL.createObjectURL(file));
    }

    errorEl.textContent = '';
  });
}

function showConfirmationScreen(order, successful) {
  const panel = document.getElementById('selected-printer-order');
  const resolutions = successful
    ? {
        title: 'Payment successful',
        message: 'Your demo order has been placed and is now awaiting confirmation.'
      }
    : {
        title: 'Payment failed',
        message: 'Demo payment was not processed. No real payment was taken.'
      };

  panel.innerHTML = `
    <div class="section-heading left-aligned">
      <p class="eyebrow">Order confirmation</p>
      <h2>${resolutions.title}</h2>
    </div>
    <div class="pricing-breakdown">
      <div class="breakdown-row"><span>Reference</span><strong>${order.reference}</strong></div>
      <div class="breakdown-row"><span>Status</span><strong>${order.status}</strong></div>
      <div class="breakdown-row"><span>Printer</span><strong>${order.printerName}</strong></div>
      <div class="breakdown-row total"><span>Total paid</span><strong>${formatPrice(order.total)}</strong></div>
    </div>
    <p class="prototype-note">${resolutions.message}</p>
    <div class="order-actions">
      <button type="button" class="btn btn-primary" id="confirmation-back-button">Create another order</button>
    </div>
  `;

  document.getElementById('confirmation-back-button').addEventListener('click', () => {
    const state = getState();
    state.selectedPrinterId = null;
    saveState(state);
    renderPrinterList();
    panel.classList.add('hidden');
  });
}

function renderOrderHistory() {
  const container = document.getElementById('order-history');
  const state = getState();

  if (!state.orders.length) {
    container.innerHTML = '<div class="empty-state">No demo orders yet. Select a printer and place a test order.</div>';
    return;
  }

  container.innerHTML = state.orders
    .map((order) => {
      const statusClass = getStatusClass(order.status);
      return `
        <article class="order-card">
          <div class="printer-header">
            <div>
              <h3>${order.reference}</h3>
              <p>${order.printerName}</p>
            </div>
            <span class="status-badge ${statusClass}">${getStatusLabel(order.status)}</span>
          </div>
          <div class="order-meta">
            <span>${order.printSettings.colorMode === 'bw' ? 'B&W' : 'Colour'}</span>
            <span>${order.printSettings.paperSize}</span>
            <span>${order.printSettings.copies} copies</span>
          </div>
          <ul>
            <li>Page count: ${order.printSettings.pageCount}</li>
            <li>Printing mode: ${order.printSettings.duplex}</li>
            <li>Total: ${formatPrice(order.total)}</li>
            <li>Notes: ${order.notes || 'No special notes'}</li>
          </ul>
          <div class="order-actions">
            <button type="button" class="btn btn-primary btn-inline" data-advance-order="${order.id}">Advance status</button>
          </div>
        </article>
      `;
    })
    .join('');

  document.querySelectorAll('[data-advance-order]').forEach((button) => {
    button.addEventListener('click', () => {
      const orderId = button.getAttribute('data-advance-order');
      const state = getState();
      const order = state.orders.find((item) => item.id === orderId);
      if (!order) return;
      order.status = advanceOrderStatus(order);
      saveState(state);
      renderOrderHistory();
      renderDashboard();
      renderAdminDashboard();
    });
  });
}

function renderDashboard() {
  const metricsContainer = document.getElementById('owner-dashboard-metrics');
  const listingsPanel = document.getElementById('owner-listings-panel');
  const ownerOrdersPanel = document.getElementById('owner-order-panel');
  const state = getState();
  const listings = state.printers.filter((printer) => printer.isOwnerListing || printer.source === 'owner');
  const orderMetrics = getOrderTotalsForOwner();

  metricsContainer.innerHTML = `
    <div class="metric-card">
      <h3>Registered listings</h3>
      <strong>${listings.length}</strong>
    </div>
    <div class="metric-card">
      <h3>Active listings</h3>
      <strong>${listings.filter((item) => item.available).length}</strong>
    </div>
    <div class="metric-card">
      <h3>Gross print value</h3>
      <strong>${formatPrice(orderMetrics.gross)}</strong>
    </div>
    <div class="metric-card">
      <h3>Platform commission</h3>
      <strong>${formatPrice(orderMetrics.commission)}</strong>
    </div>
    <div class="metric-card">
      <h3>Provider earnings</h3>
      <strong>${formatPrice(orderMetrics.earnings)}</strong>
    </div>
  `;

  if (!listings.length) {
    listingsPanel.innerHTML = '<div class="empty-state">No registered printers yet. Add your demo printer listing first.</div>';
  } else {
    listingsPanel.innerHTML = `
      <h3>Registered printer listings</h3>
      ${listings
        .map((listing) => `
          <div class="order-card">
            <div class="printer-header">
              <div>
                <h3>${listing.name}</h3>
                <p>${listing.location}</p>
              </div>
              <label class="switch">
                <input type="checkbox" data-printer-toggle="${listing.id}" ${listing.available ? 'checked' : ''} />
                <span class="slider"></span>
              </label>
            </div>
            <ul>
              <li>BW: ${formatPrice(listing.bwPrice)}/page</li>
              <li>Colour: ${formatPrice(listing.colourPrice)}/page</li>
              <li>Duplex: ${listing.duplex ? 'Yes' : 'No'}</li>
              <li>Paper sizes: ${listing.paperSizes.join(', ')}</li>
            </ul>
          </div>
        `)
        .join('')}
    `;

    document.querySelectorAll('[data-printer-toggle]').forEach((toggle) => {
      toggle.addEventListener('change', (event) => {
        const printerId = event.target.getAttribute('data-printer-toggle');
        togglePrinterAvailability(printerId, event.target.checked);
        renderDashboard();
        renderPrinterList();
      });
    });
  }

  if (!state.orders.length) {
    ownerOrdersPanel.innerHTML = '<div class="empty-state">No demo orders for this printer yet.</div>';
    return;
  }

  ownerOrdersPanel.innerHTML = `
    <h3>Demo orders</h3>
    ${state.orders
      .map((order) => `
        <div class="order-card">
          <div class="printer-header">
            <div>
              <h3>${order.reference}</h3>
              <p>${order.printerName}</p>
            </div>
            <span class="status-badge ${getStatusClass(order.status)}">${getStatusLabel(order.status)}</span>
          </div>
          <ul>
            <li>Print type: ${order.printSettings.colorMode === 'bw' ? 'B&W' : 'Colour'}</li>
            <li>Copies: ${order.printSettings.copies}</li>
            <li>Amount: ${formatPrice(order.total)}</li>
          </ul>
          <div class="order-actions">
            <button type="button" class="btn btn-primary btn-inline" data-owner-advance="${order.id}">Update status</button>
          </div>
        </div>
      `)
      .join('')}
  `;

  document.querySelectorAll('[data-owner-advance]').forEach((button) => {
    button.addEventListener('click', () => {
      const orderId = button.getAttribute('data-owner-advance');
      const order = state.orders.find((item) => item.id === orderId);
      if (!order) return;
      order.status = advanceOrderStatus(order);
      saveState(state);
      renderDashboard();
      renderOrderHistory();
      renderAdminDashboard();
    });
  });
}

function renderAdminDashboard() {
  const metricsContainer = document.getElementById('admin-metrics');
  const summaryContainer = document.getElementById('admin-status-summary');
  const state = getState();
  const totalValue = state.orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const platformRevenue = totalValue * 0.2;
  const statusCounts = {};

  orderStatusSequence.forEach((status) => {
    statusCounts[status] = 0;
  });

  state.orders.forEach((order) => {
    const normalized = normalizeStatus(order.status);
    statusCounts[normalized] = (statusCounts[normalized] || 0) + 1;
  });

  metricsContainer.innerHTML = `
    <div class="metric-card">
      <h3>Total sample printers</h3>
      <strong>${state.printers.length}</strong>
    </div>
    <div class="metric-card">
      <h3>Total demo orders</h3>
      <strong>${state.orders.length}</strong>
    </div>
    <div class="metric-card">
      <h3>Printing value</h3>
      <strong>${formatPrice(totalValue)}</strong>
    </div>
    <div class="metric-card">
      <h3>Platform revenue</h3>
      <strong>${formatPrice(platformRevenue)}</strong>
    </div>
  `;

  summaryContainer.innerHTML = `
    <div class="order-card">
      <h3>Prototype order status summary</h3>
      <ul>
        ${orderStatusSequence
          .map((status) => `<li>${status}: ${statusCounts[status] || 0}</li>`)
          .join('')}
      </ul>
    </div>
  `;
}

function initOwnerForm() {
  const form = document.getElementById('owner-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const errorEl = document.getElementById('owner-form-error');

    const requiredFields = ['displayName', 'location', 'printerModel', 'paperSizes', 'bwPrice', 'colourPrice', 'availability', 'minimumOrder'];
    const missing = requiredFields.filter((field) => !String(values[field] || '').trim());

    if (missing.length) {
      errorEl.textContent = 'Please complete all required fields before saving the listing.';
      return;
    }

    const bwPrice = Number(values.bwPrice);
    const colourPrice = Number(values.colourPrice);
    const minimumOrder = Number(values.minimumOrder);

    if (bwPrice <= 0 || colourPrice <= 0 || minimumOrder < 0) {
      errorEl.textContent = 'Pricing values must be greater than zero, and the minimum order amount must not be negative.';
      return;
    }

    addOwnerListing({
      displayName: values.displayName,
      location: values.location,
      printerModel: values.printerModel,
      paperSizes: values.paperSizes,
      bwPrice,
      colourPrice,
      duplex: document.getElementById('owner-duplex').value,
      availability: values.availability,
      minimumOrder,
      collectionNotes: values.collectionNotes || '',
      active: document.getElementById('owner-active').checked
    });

    form.reset();
    document.getElementById('owner-active').checked = true;
    document.getElementById('owner-duplex').value = 'true';
    errorEl.textContent = 'Listing saved in this browser only. It will remain available after a page refresh.';
    renderPrinterList();
    renderDashboard();
    renderAdminDashboard();
  });
}

function initialize() {
  const state = getState();
  if (!state || !state.printers || !state.orders) {
    saveState(getDefaultState());
  }

  renderHomePageActions();
  renderPrinterList();
  renderOrderHistory();
  renderDashboard();
  renderAdminDashboard();
  initOwnerForm();

  const searchInput = document.getElementById('printer-search');
  if (searchInput) {
    searchInput.addEventListener('input', renderPrinterList);
  }

  ['printer-type', 'printer-max-price', 'printer-sort', 'available-only'].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', renderPrinterList);
      element.addEventListener('input', renderPrinterList);
    }
  });
}

document.addEventListener('DOMContentLoaded', initialize);
