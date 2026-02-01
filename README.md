# Remote Ruler - Premium Affiliate Marketplace 🚀

Remote Ruler is a high-performance, **Single-Page Application (SPA)** marketplace built to showcase affiliate products from top stores like Amazon, Rokomari, Star Tech, and more.

## ✨ Features

- **All-in-One Architecture**: The entire frontend, styling, and logic reside in a single `index.html` file.
- **Embedded Data**: Initial product data is embedded directly for zero-configuration startup.
- **Instant Navigation**: Hash-based routing (`#home`, `#shop`, `#admin`) for a seamless, no-reload experience.
- **Admin Suite**: Built-in inventory management, product parsing, and data export.
- **Premium Light Theme**: Locked to a clean, professional white interface for maximum readability.
- **Stock Monitor**: Real-time stock status checking using CORS proxies.

## 🛠️ Getting Started

### Local Use

1. Simply download/copy the `index.html` file.
2. Open it in any modern web browser (Chrome, Edge, Firefox).
3. Everything is self-contained!

### Deployment

You can host this Single-File SPA on any static hosting service:

- **GitHub Pages** (Recommended)
- **Netlify**
- **Vercel**

## 📦 Managing Products

### 1. The Admin Panel

Access the Admin panel by clicking **Admin** or navigating to `#admin`.

- **Access**: [Contact for Admin Access](https://web.whatsapp.com/send?autoload=1&app_absent=0&phone=8801703295566&text=Hello,%20I%20need%20Admin%20Access)

### 2. Temporary vs. Permanent Changes

- **Temporary**: Changes made in Admin are saved to your browser's **LocalStorage**. They will persist on your device but won't be visible to others.
- **Permanent**:
  1. Go to Admin -> Inventory.
  2. Click **Export JSON** to download `products.json`.
  3. Open `index.html` in a text editor (like Notepad or VS Code).
  4. Find the `defaultData` array in the JavaScript section and replace its contents with your exported JSON.
  5. Save the file and push/upload it to your host.

## 🛡️ License

**PROPRIETARY LICENSE**
Copyright (c) Remote Ruler. All rights reserved.

This software is the exclusive property of Remote Ruler. Unauthorized use, copying, modification, or distribution is strictly prohibited. For complete terms, please refer to the [LICENSE](LICENSE) file.

---
*Created with ❤️ by Remote Ruler Team.*
