const DataManager = {
    products: [],

    init: async () => {
        // 1. Try to get products from LocalStorage (Simulating "Live DB" updates from Admin)
        const localProducts = Utils.Store.get('aff_products');

        if (localProducts && localProducts.length > 0) {
            DataManager.products = localProducts;
            console.log("Loaded products from LocalStorage");
        } else {
            // 2. If empty, fetch from products.json (Initial State)
            try {
                const response = await fetch('data/products.json');
                const data = await response.json();
                DataManager.products = data;
                // Seed LocalStorage
                Utils.Store.set('aff_products', data);
                console.log("Loaded products from JSON");
            } catch (error) {
                console.error("Failed to load products.json", error);
                DataManager.products = [];
            }
        }
    },

    getAll: () => DataManager.products,

    getById: (id) => DataManager.products.find(p => p.id === id),

    add: (product) => {
        DataManager.products.unshift(product); // Add to top
        Utils.Store.set('aff_products', DataManager.products);
    },

    update: (id, updatedFields) => {
        const index = DataManager.products.findIndex(p => p.id === id);
        if (index !== -1) {
            DataManager.products[index] = { ...DataManager.products[index], ...updatedFields };
            Utils.Store.set('aff_products', DataManager.products);
        }
    },

    delete: (id) => {
        DataManager.products = DataManager.products.filter(p => p.id !== id);
        Utils.Store.set('aff_products', DataManager.products);
    },

    // Reset to JSON file default (Useful for Admin)
    resetDatabase: async () => {
        Utils.Store.remove('aff_products');
        await DataManager.init();
        window.location.reload();
    }
};

window.DataManager = DataManager;
