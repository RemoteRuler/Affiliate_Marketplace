# Remote Ruler - Multi-Affiliate E-commerce Platform

A premium, static-first e-commerce marketplace for affiliate products (Rokomari, Amazon). Built to run entirely on GitHub Pages without a backend server.

## 🚀 Deployment Guide (GitHub Pages)

1. **Upload Code**: Push the `Affiliate_Marketplace` folder to a GitHub repository.
2. **Enable Pages**:
   - Go to Repo **Settings** > **Pages**.
   - Select `main` branch and `/` root folder (or `/Affiliate_Marketplace` if subdirectory).
   - Click **Save**.
3. **Visit Site**: Your site will be live at `https://username.github.io/repo-name/`.

## 🛠 Admin & Product Management

Since this is a **Static Website**, it does not have a database. We use a **JSON-first** approach with a clever Admin Workflow.

### How to Add Products

1. Go to `/admin.html` (Password: `admin123`).
2. **Add Products**: Paste an affiliate link (e.g., Rokomari) and click "Auto-Detect". Fill in details.
3. **Test Locally**: The new products will be saved to your browser's **Local Storage**. You will see them on the site immediately *only on your computer*.
4. **Publish Changes**:
   - In the Admin Panel sidebar, click **"📥 Export JSON"**.
   - This downloads a `products.json` file.
   - Replace the existing file at `data/products.json` in your project folder with this new one.
   - **Commit & Push** this change to GitHub.
   - Now the new products are live for **everyone**!

## 🌟 Features

- **Multi-Store Support**: Auto-detects Rokomari and Amazon links.
- **Smart Filtering**: Sidebar filters for Stores, Categories, and Price sorting.
- **Dark Mode**: Built-in visual toggle.
- **Zero Hosting Cost**: Runs 100% free on GitHub Pages.
- **SEO Ready**: Basic structure optimized for search engines.

## 📁 Folder Structure

- `index.html`: Homepage.
- `shop.html`: Product listing & search.
- `product.html`: Single product details.
- `admin.html`: Product management interface.
- `data/products.json`: The "Database".
- `assets/`: CSS, JS, and Images resources.

## 🔒 Safety Note

This system creates affiliate links. Ensure you have proper approval from affiliate programs (Rokomari, Amazon Associates) before promoting links publicly. Use the "Others" mode to ensure compliance if auto-detection misses data.
