// Lógica por página: badge del carrito, detalle de producto, carrito y checkout.

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  if (document.body.dataset.page === 'producto') {
    renderProductDetail();
  }
  if (document.body.dataset.page === 'carrito') {
    renderCart();
  }

  setupPriceFilter();
});

function setupPriceFilter() {
  const form = document.querySelector('.filter-form');
  if (!form) return;
  const minInput = form.querySelector('input[name="min"]');
  const maxInput = form.querySelector('input[name="max"]');
  const cards = document.querySelectorAll('.product-card[data-price]');

  function applyFilter(e) {
    if (e) e.preventDefault();
    const min = parseFloat(minInput.value);
    const max = parseFloat(maxInput.value);
    cards.forEach((card) => {
      const price = parseFloat(card.dataset.price);
      const passMin = isNaN(min) || price >= min;
      const passMax = isNaN(max) || price <= max;
      card.style.display = passMin && passMax ? '' : 'none';
    });
  }

  form.addEventListener('submit', applyFilter);
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  const count = Cart.count();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function renderProductDetail() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const product = PRODUCTS[id];
  const container = document.querySelector('.product-detail');
  if (!product || !container) {
    if (container) {
      container.innerHTML = '<p>Producto no encontrado. <a href="index.html">Volver al inicio</a></p>';
    }
    return;
  }

  document.title = `Full Stock | ${product.name}`;
  const features = FEATURES[product.category] || [];

  container.innerHTML = `
    <div class="product-detail-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-detail-info">
      <h1>${product.name}</h1>
      <p class="product-detail-price">${formatPrice(product.price)}</p>
      <p class="product-detail-description">${product.description}</p>
      <button type="button" class="btn-primary btn-block" id="add-to-cart-btn">Agregar al Carrito</button>
      <hr class="product-detail-divider" />
      <h2 class="product-features-title">Características</h2>
      <ul class="product-features-list">
        ${features.map((f) => `<li>${f}</li>`).join('')}
      </ul>
    </div>
  `;

  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    Cart.add(product.id, 1);
    updateCartBadge();
    showToast(`"${product.name}" agregado al carrito`);
  });
}

function renderCart() {
  const container = document.getElementById('cart-content');
  if (!container) return;

  const items = Cart.get();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <h1 class="cart-title">Carrito de compras</h1>
        <div class="cart-box">
          <div class="cart-total-row">
            <span>Total</span>
            <span>${formatPrice(0)}</span>
          </div>
          <a href="index.html" class="btn-primary btn-block">Ir a la tienda</a>
        </div>
      </div>
    `;
    return;
  }

  const summaryItemsHtml = items
    .map((item) => {
      const p = PRODUCTS[item.id];
      if (!p) return '';
      return `
      <div class="summary-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" />
        <div class="summary-item-body">
          <div class="summary-item-head">
            <h3>${p.name}</h3>
            <button type="button" class="summary-remove" aria-label="Eliminar">&times;</button>
          </div>
          <div class="summary-item-meta">
            <span>${item.qty}</span>
            <span class="summary-times">&times;</span>
            <span>${formatPrice(p.price)}</span>
          </div>
        </div>
      </div>`;
    })
    .join('');

  container.innerHTML = `
    <div class="checkout-layout">

      <div class="checkout-form-col">
        <form id="checkout-form" class="checkout-form">

          <section class="checkout-section">
            <h2>Información de contacto</h2>
            <label>
              Correo electrónico
              <input type="email" name="email" required />
            </label>
          </section>

          <hr class="checkout-divider" />

          <section class="checkout-section">
            <h2>Información de envío</h2>

            <label>
              Nombre
              <input type="text" name="first_name" required />
            </label>

            <label>
              Apellido
              <input type="text" name="last_name" required />
            </label>

            <label>
              Compañia
              <input type="text" name="company" />
            </label>

            <label>
              Dirección
              <input type="text" name="address" required />
            </label>

            <label>
              Ciudad
              <input type="text" name="city" required />
            </label>

            <label>
              País
              <select name="country" required>
                <option value="">Seleccionar país</option>
                <option>Perú</option>
                <option>Argentina</option>
                <option>Chile</option>
                <option>Colombia</option>
                <option>México</option>
                <option>España</option>
                <option>Estados Unidos</option>
              </select>
            </label>

            <label>
              Provincia/Estado
              <input type="text" name="state" required />
            </label>

            <label>
              Código Postal
              <input type="text" name="zip" required />
            </label>

            <label>
              Teléfono
              <input type="tel" name="phone" required />
            </label>
          </section>

          <button type="submit" class="btn-primary btn-block checkout-submit">Confirmar Orden</button>
        </form>
      </div>

      <aside class="checkout-summary">
        <h2>Resumen de la orden</h2>
        <div class="summary-card">
          <div class="summary-items">
            ${summaryItemsHtml}
          </div>
          <div class="summary-total-row">
            <span>Total</span>
            <span id="summary-total">${formatPrice(Cart.total())}</span>
          </div>
        </div>
      </aside>

    </div>
  `;

  // Wire remove buttons
  container.querySelectorAll('.summary-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.closest('.summary-item').dataset.id;
      Cart.remove(id);
      renderCart();
      updateCartBadge();
    });
  });

  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    Cart.clear();
    location.href = 'gracias.html';
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('visible'), 2000);
}
