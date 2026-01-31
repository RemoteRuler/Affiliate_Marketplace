/**
 * COPYRIGHT REMOTE RULER. ALL RIGHTS RESERVED.
 * UNAUTHORIZED COPYING, USE, OR DISTRIBUTION IS STRICTLY PROHIBITED.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Init Data & Theme
    Utils.Theme.init();
    await DataManager.init();

    // 2. Determine Page Context
    const path = window.location.pathname;
    const isHome = path.endsWith('index.html') || path.endsWith('/');
    const isShop = path.endsWith('shop.html');
    const isProduct = path.endsWith('product.html');

    // 3. Router-like logic
    if (isHome) {
        renderFeatured();
    } else if (isShop) {
        // Will be handled by shop.html specfic script or expanded here
        if (window.initShop) window.initShop();
    } else if (isProduct) {
        if (window.initProductDetail) window.initProductDetail();
    }
});

// --- Renderer Functions ---

function createProductCard(product) {
    const card = document.createElement('a');
    card.href = `product.html?id=${product.id}`;
    card.className = 'product-card';

    // Calculate Discount
    const hasDiscount = product.discount > 0;

    card.innerHTML = `

        <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
        <div class="card-body">
            <h3 class="product-title" title="${product.title}">${product.title}</h3>
            ${product.subtitle ? `<div class="product-subtitle">${product.subtitle}</div>` : ''}
            <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem;">${product.category}</div>
            <div class="price-area">
                <span class="current-price">${Utils.formatMoney(product.price, product.currency)}</span>
                ${hasDiscount ? `<span class="old-price">${Utils.formatMoney(product.original_price, product.currency)}</span>` : ''}
                ${hasDiscount ? `<span class="discount-tag">-${product.discount}%</span>` : ''}
            </div>
        </div>
    `;
    return card;
}

function renderFeatured() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    // Filter featured products
    const featured = DataManager.getAll().filter(p => p.is_featured);
    const productsToShow = featured.length > 0 ? featured : DataManager.getAll().slice(0, 4);

    container.innerHTML = '';

    if (productsToShow.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center">No products found. Add some from Admin!</div>';
        return;
    }

    productsToShow.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}
