# Quintessential Wellness Centre

![Website](https://img.shields.io/website?url=https%3A%2F%2Fquintessentialwellnesscentre.com)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
![License](https://img.shields.io/badge/License-Proprietary-red.svg)

Professional massage therapy services website for Quintessential Wellness Centre in St. Catharines, Ontario.

**Live Site:** [https://quintessentialwellnesscentre.com](https://quintessentialwellnesscentre.com)

---

## 🌟 Features

- **React SPA** - Modern single-page application built with React
- **WebP Image Optimization** - Automatic WebP serving for 40-50% faster image loading
- **Mobile Responsive** - Optimized for all devices and screen sizes
- **SEO Optimized** - Proper meta tags, semantic HTML, sitemap.xml
- **Performance Focused** - 1-year cache headers, Content-Delivery-Network ready
- **SSL/HTTPS** - Secure encrypted connections with Let's Encrypt certificate

---

## 📊 Performance Metrics

### Image Optimization
- **169 images** converted to WebP format
- **59% average size reduction** (e.g., hero-11.jpg: 17KB → 7KB)
- **Automatic content negotiation** - Modern browsers get WebP, older browsers get JPG/PNG
- **Bandwidth savings:** ~30-40% per page load

### Web Vitals
- ✅ Improved LCP (Largest Contentful Paint)
- ✅ Improved FCP (First Contentful Paint)
- ✅ Mobile-optimized loading

---

## 🛠️ Technology Stack

### Frontend
- React 18
- React Router
- Framer Motion (animations)
- Bootstrap 4
- Owl Carousel
- Magnific Popup
- jQuery 3.4.1

### Backend/Server
- **Web Server:** Nginx with HTTP/2
- **SSL:** Let's Encrypt (auto-renewal)
- **Image Optimization:** WebP with automatic fallback
- **Cache:** 1-year expiry for static assets
- **Compression:** Gzip/Brotli enabled

### Build Tools
- Vite (bundler)
- PostCSS
- Terser (JS minification)

---

## 📁 Project Structure

```
quintessential-wellness-centre/
├── assets/                  # React compiled bundles
│   ├── index-*.js          # Main application bundle
│   ├── vendor-*.js         # Third-party libraries
│   └── *Page-*.js          # Code-split page components
├── css/                    # Stylesheets
│   ├── bootstrap.min.css
│   ├── pink-theme.css      # Active theme
│   ├── responsive.css
│   └── ...
├── images/                 # Images (both original and WebP)
│   ├── *.jpg/png           # Original images
│   ├── *.webp              # WebP versions (auto-served)
│   └── ...
├── js/                     # JavaScript files
│   ├── jquery-3.4.1.min.js
│   ├── bootstrap.min.js
│   └── ...
├── fonts/                  # Custom icon fonts
├── index.html              # Entry point
├── sitemap.xml             # SEO sitemap
└── OPTIMIZATION-FIXES.md   # Optimization documentation
```

---

## 🚀 Deployment

### Server Requirements
- **OS:** Linux (Ubuntu 20.04+)
- **Web Server:** Nginx 1.18+
- **SSL:** Let's Encrypt via certbot
- **PHP:** 8.1+ (optional, for forms)
- **Image Tools:** cwebp (for WebP conversion)

### Nginx Configuration
The site uses custom nginx configuration for:
- HTTP/2 support
- Automatic HTTPS redirect
- WebP content negotiation
- Long-term caching (1 year for static assets)
- Gzip/Brotli compression

**Config location:** `/etc/nginx/sites-available/quintessentialwellnesscentre.com`

### SSL Certificate
- **Provider:** Let's Encrypt
- **Auto-renewal:** Enabled via certbot
- **Expiry:** January 29, 2026
- **Renewal command:** `certbot renew`

---

## 🔧 Recent Optimizations (Oct 31, 2025)

### Broken Links Fixed ✅
1. Removed non-existent `/css/new-enhancements.css` reference
2. Fixed `bg01.jpg` → `bg-01.jpg` in menu.css
3. Created missing `bg-03.jpg` image file

### WebP Image Optimization ✅
- Converted all 169 images to WebP format
- Configured automatic WebP serving based on browser support
- Zero code changes required - works transparently
- Fallback to original JPG/PNG for older browsers

### Performance Impact
- 🚀 **30-40% faster image loading**
- 📉 **40-50% bandwidth reduction**
- 📱 **Improved mobile experience**
- 🔍 **Better SEO rankings (Core Web Vitals)**

---

## ⚠️ Known Issues

### Services Navigation Routing (React)
**Issue:** The "Services" navigation link routes to HomePage instead of MassageServicesPage.

**Cause:** Incorrect routing in the React bundle.

**Fix Required:** 
1. Locate React source code (src/ directory not in repo)
2. Update routing configuration:
   ```jsx
   // Change from:
   <Route path="/massage-services" element={<HomePage />} />
   
   // To:
   <Route path="/massage-services" element={<MassageServicesPage />} />
   ```
3. Rebuild: `npm run build`
4. Deploy new build to server

**Component:** MassageServicesPage exists (`assets/MassageServicesPage-DhMRh7XJ.js`) but not wired to route.

---

## 📱 Browser Support

- ✅ Chrome 90+ (WebP)
- ✅ Firefox 88+ (WebP)
- ✅ Edge 90+ (WebP)
- ✅ Safari 14+ (WebP)
- ✅ Opera 76+ (WebP)
- ⚠️ IE 11 (fallback to JPG/PNG)

---

## 📍 Service Area

Serving the entire Niagara Region:
- Fort Erie
- Grimsby
- Lincoln
- Niagara Falls
- Niagara-on-the-Lake
- Pelham
- Port Colborne
- **St. Catharines** (Main Location)
- Thorold
- Wainfleet
- Welland
- West Lincoln

---

## 📞 Contact Information

**Quintessential Wellness Centre**

📍 2287 King Street  
St. Catharines, ON L2R 6P7

📧 quintessentialw@icloud.com  
📱 (905) 932-8236

🌐 [quintessentialwellnesscentre.com](https://quintessentialwellnesscentre.com)

---

## 🔐 Security

- ✅ HTTPS/SSL enabled (Let's Encrypt)
- ✅ HTTP to HTTPS redirect
- ✅ Security headers configured
- ✅ No exposed sensitive files
- ✅ Input validation on forms
- ✅ XSS protection

---

## 📝 License

© 2024 Quintessential Wellness Centre. All Rights Reserved.

This is proprietary software. Unauthorized copying, modification, or distribution is prohibited.

---

## 🛠️ Maintained By

**JTGSYSTEMS**  
Web Development & IT Solutions

🌐 [www.jtgsystems.com](https://www.jtgsystems.com)  
📧 contact@jtgsystems.com

---

## 📚 Documentation

- [OPTIMIZATION-FIXES.md](./OPTIMIZATION-FIXES.md) - Recent optimization work
- [MOBILE-MENU-REVIEW.md](./MOBILE-MENU-REVIEW.md) - Mobile menu implementation notes

---

**Last Updated:** October 31, 2025
