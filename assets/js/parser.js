/**
 * COPYRIGHT REMOTE RULER. ALL RIGHTS RESERVED.
 * UNAUTHORIZED COPYING, USE, OR DISTRIBUTION IS STRICTLY PROHIBITED.
 */
const AffiliateParser = {
    detectStore: (url) => {
        if (!url) return 'unknown';
        const lowerUrl = url.toLowerCase();

        // Rokomari
        if (lowerUrl.includes('rokomari.com') || lowerUrl.includes('rkmri.co')) return 'rokomari';


        // Global
        if (lowerUrl.includes('amazon.')) return 'amazon';
        if (lowerUrl.includes('aliexpress.com')) return 'aliexpress';

        // local BD
        if (lowerUrl.includes('pickaboo.com')) return 'pickaboo';
        if (lowerUrl.includes('startech.com.bd')) return 'star-tech';
        if (lowerUrl.includes('ryanscomputers.com')) return 'ryans';
        if (lowerUrl.includes('bdshop.com')) return 'bdshop';

        return 'others'; // Default to others category
    },

    // Live Stock Checker using CORS Proxy with Fallback
    checkLiveStock: async (url, store) => {
        if (!url) return 'unknown';

        const proxies = [
            (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
            (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`
        ];

        for (const proxyGen of proxies) {
            try {
                const proxyUrl = proxyGen(url);
                const response = await fetch(proxyUrl);

                if (!response.ok) continue; // Try next proxy

                let html = "";
                // Handle different proxy response formats
                if (proxyUrl.includes('allorigins')) {
                    const data = await response.json();
                    html = data.contents;
                    if (!html) continue;
                } else {
                    html = await response.text();
                }

                html = html.toLowerCase();

                // 1. Check for POSITIVE keywords (In Stock) first
                const inStockKeywords = [
                    'in stock',
                    'add to cart',
                    'buy now',
                    'copies left', // 'only X copies left'
                    'add to bag',
                    'add to basket'
                ];

                let quantity = null;

                // Regex for quantity extraction (e.g., "only 18 copies left")
                const quantityPatterns = [
                    /only (\d+) copies left/i,
                    /(\d+) items available/i,
                    /stock: (\d+)/i,
                    /(\d+) left/i
                ];

                for (const pattern of quantityPatterns) {
                    const match = html.match(pattern);
                    if (match && match[1]) {
                        quantity = match[1];
                        break;
                    }
                }

                const isDefinitelyInStock = inStockKeywords.some(keyword => html.includes(keyword));

                if (isDefinitelyInStock) return { status: 'in_stock', quantity: quantity };

                // 2. If not found, check for NEGATIVE keywords (Out of Stock)
                const outOfStockKeywords = [
                    'out of stock',
                    'unavailable',
                    'sold out',
                    'not available',
                    'currently unavailable',
                    'পাওয়া যাচ্ছে না'
                ];

                const isOutOfStock = outOfStockKeywords.some(keyword => html.includes(keyword));

                return {
                    status: isOutOfStock ? 'out_of_stock' : 'in_stock',
                    quantity: quantity
                };

            } catch (e) {
                console.warn("Proxy Failed:", e);
                // Continue to next proxy
            }
        }

        return 'error'; // All proxies failed
    },

    // Mock Metadata Fetcher (Since CORS blocks real scraping on client side)
    // In a real generic app, this would hit a proxy. Here we simulate "smart fetch" or return null.
    fetchMetadata: async (url) => {
        const store = AffiliateParser.detectStore(url);
        return {
            store: store,
            suggestedTitle: "",
            suggestedImage: ""
        };
    }
};

window.AffiliateParser = AffiliateParser;
