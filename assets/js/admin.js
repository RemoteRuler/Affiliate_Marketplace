/**
 * COPYRIGHT REMOTE RULER. ALL RIGHTS RESERVED.
 * UNAUTHORIZED COPYING, USE, OR DISTRIBUTION IS STRICTLY PROHIBITED.
 */
// --- 1. Login Logic ---
function checkLogin() {
    const pass = document.getElementById('adminPass').value;
    if (pass === 'SopnilJawata@11/07/23@29/12/23@11/29/23@29?11?23@!@#$$%%$%#%$^%#XVAGFGHAVDYFAGDAYRFDAHGGDYUG265ege46564') {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('admin-ui').style.filter = 'none';
        document.body.style.overflow = 'auto';
        initAdmin();
    } else {
        alert('Incorrect Password');
    }
}

// --- 2. Admin Init ---
async function initAdmin() {
    await DataManager.init();
    renderInventory();
}

function showSection(section) {
    document.querySelectorAll('section').forEach(el => el.style.display = 'none');
    document.getElementById(`section-${section}`).style.display = 'block';
    if (section === 'manage-products') renderInventory();
}

// --- 3. Product Parsing ---
async function parseUrl() {
    const url = document.getElementById('rawUrl').value;
    if (!url) return alert("Please enter a URL");

    const form = document.getElementById('product-form');
    form.style.display = 'block';

    const store = AffiliateParser.detectStore(url);
    const meta = await AffiliateParser.fetchMetadata(url);

    // Pre-fill form
    document.getElementById('p_store').value = store;
    document.getElementById('p_title').value = meta.suggestedTitle || "";
    document.getElementById('p_image').value = meta.suggestedImage || "";

    // Reset other fields
    document.getElementById('p_id').value = ""; // New ID
    document.getElementById('p_price').value = "";
    document.getElementById('p_original').value = "";
}

// --- 4. CRUD Logic ---
function saveProduct() {
    const pId = document.getElementById('p_id').value;
    const isEdit = !!pId;

    const price = parseFloat(document.getElementById('p_price').value) || 0;
    const original = parseFloat(document.getElementById('p_original').value) || price;

    const product = {
        id: isEdit ? pId : 'prod_' + Date.now(),
        affiliate_link: document.getElementById('rawUrl').value,
        store: document.getElementById('p_store').value,
        title: document.getElementById('p_title').value,
        subtitle: document.getElementById('p_subtitle').value,
        price: price,
        original_price: original,
        discount: original > price ? Math.round(((original - price) / original) * 100) : 0,
        currency: 'BDT', // Default
        image: document.getElementById('p_image').value,
        images: document.getElementById('p_gallery').value.split('\n').map(url => url.trim()).filter(url => url),
        category: document.getElementById('p_category').value,
        description: document.getElementById('p_desc').value,
        is_featured: document.getElementById('p_featured').checked,
        date_added: new Date().toISOString()
    };

    if (isEdit) {
        DataManager.update(product.id, product);
        alert('Product Updated!');
    } else {
        DataManager.add(product);
        alert('Product Added!');
    }

    resetForm();
    showSection('manage-products');
}

function editProduct(id) {
    const product = DataManager.getById(id);
    if (!product) return;

    showSection('add-product');
    document.getElementById('product-form').style.display = 'block';

    // Fill Form
    document.getElementById('rawUrl').value = product.affiliate_link || "";
    document.getElementById('p_id').value = product.id;
    document.getElementById('p_store').value = product.store;
    document.getElementById('p_title').value = product.title;
    document.getElementById('p_subtitle').value = product.subtitle || "";
    document.getElementById('p_price').value = product.price;
    document.getElementById('p_original').value = product.original_price;
    document.getElementById('p_original').value = product.original_price;
    document.getElementById('p_image').value = product.image;
    document.getElementById('p_gallery').value = (product.images || []).join('\n');
    document.getElementById('p_category').value = product.category;
    document.getElementById('p_desc').value = product.description;
    document.getElementById('p_featured').checked = product.is_featured;
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        DataManager.delete(id);
        renderInventory();
    }
}

function resetForm() {
    document.getElementById('rawUrl').value = "";
    document.getElementById('product-form').style.display = 'none';
    document.querySelectorAll('#product-form input, #product-form textarea').forEach(i => {
        if (i.type !== 'checkbox' && i.type !== 'hidden') i.value = "";
    });
}

function renderInventory() {
    const tbody = document.getElementById('inventory-body');
    tbody.innerHTML = '';

    DataManager.getAll().forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
            <td>${p.title}</td>
            <td><span class="badge badge-${p.store.toLowerCase()}">${p.store}</span></td>
            <td>${p.price}</td>
            <td>
                <button class="btn" style="font-size:0.8rem" onclick="editProduct('${p.id}')">Edit</button>
                <button class="btn" style="font-size:0.8rem; color:red;" onclick="deleteProduct('${p.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- 5. Export Logic ---
function downloadJSON() {
    const dataStr = JSON.stringify(DataManager.getAll(), null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'products.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    alert('products.json downloaded! Please save this file to "data/products.json" in your project folder to make changes live for everyone.');
}
