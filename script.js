/**
 * SESIKREASI Studio - Pure JavaScript Module
 * Handles: Mobile Navigation, Dynamic Services Sync, Portfolio Filter & Lightbox,
 * Rule-Based Interactive Chatbot with WhatsApp Deep Linking,
 * and Full Client-Side LocalStorage Admin Dashboard.
 */

// ==========================================================================
// 1. DEFAULT DATA & STORAGE KEYS
// ==========================================================================
const STORAGE_KEYS = {
  SERVICES: 'sesikreasi_services_v1',
  ORDERS: 'sesikreasi_orders_v1',
  SETTINGS: 'sesikreasi_settings_v1',
  ADMIN_AUTH_TOKEN: 'sesikreasi_admin_auth_session',
  ADMIN_PASSWORD: 'sesikreasi_admin_password_v1',
  LEGACY_SERVICES: 'sesikreasi_services_v1',
  LEGACY_ORDERS: 'sesikreasi_orders_v1',
  LEGACY_SETTINGS: 'sesikreasi_settings_v1',
  LEGACY_ADMIN_PASSWORD: 'sesikreasi_admin_password_v1',
};

const DEFAULT_ADMIN_PASSWORD = 'RYU1234';

const DEFAULT_SETTINGS = {
  studioName: 'SESIKREASI',
  tagline: 'Studio Desain Kreatif & Cetak Berkualitas',
  whatsappNumber: '6287719613858',
  address: 'Ds. Sawo, Kec. Kutorejo, Kabupaten Mojokerto',
  openingHours: 'Senin - Sabtu (08.00 - 20.00 WIB)',
  email: 'sesikreasi@gmail.com',
  instagram: '@sesikreasi.studio',
  tiktok: '@sesikreasi.studio',
};

const DEFAULT_SERVICES = [
  {
    id: 'srv-1',
    name: 'Jasa Desain',
    category: 'desain',
    price: 75000,
    priceLabel: 'Mulai Rp 75.000',
    icon: '🎨',
    desc: 'Layanan desain visual profesional untuk kebutuhan personal hingga branding bisnis komersial.',
    features: [
      'Desain Logo & Brand Identity',
      'Feed & Story Instagram Kreatif',
      'Desain Brosur, Banner & Spanduk',
      'Revisi Fleksibel & File Master Lengkap (AI, PDF, PNG)',
    ],
  },
  {
    id: 'srv-2',
    name: 'Cetak Undangan',
    category: 'undangan',
    price: 2500,
    priceLabel: 'Mulai Rp 2.500 / pcs',
    icon: '💌',
    desc: 'Cetak undangan pernikahan, khitanan, dan acara formal dengan pilihan kertas elegan dan finishing mewah.',
    features: [
      'Model Softcover & Hardcover Eksklusif',
      'Hot Print Foil Emas/Perak & Emboss',
      'Free Plastik OPP, Label Nama & Kartu Ucapan',
      'Tersedia Versi Undangan Digital (Web/Video)',
    ],
  },
  {
    id: 'srv-3',
    name: 'Print',
    category: 'print',
    price: 1000,
    priceLabel: 'Mulai Rp 1.000 / lbr',
    icon: '🖨️',
    desc: 'Print dokumen, laporan skripsi, proposal, poster hingga media promosi A3+ dengan warna tajam dan presisi.',
    features: [
      'Print Dokumen Warna & Hitam Putih Cepat',
      'Kertas Art Paper, Art Carton, Linen & HVS',
      'Print Poster A3+ Kualitas Foto High-Res',
      'Jilid Spiral Kawat, Softcover & Hardcover',
    ],
  },
  {
    id: 'srv-4',
    name: 'Label Stiker',
    category: 'stiker',
    price: 12000,
    priceLabel: 'Mulai Rp 12.000 / A3+',
    icon: '🏷️',
    desc: 'Stiker kemasan produk makanan, minuman, dan merchandise dengan teknologi cetak tahan air dan cutting presisi.',
    features: [
      'Bahan Vinyl Susu, Transparan & Chromo',
      'Laminasi Doff atau Glossy Anti Air',
      'Cutting Otomatis Kiss-Cut & Die-Cut',
      'Desain Custom Sesuai Ukuran Kemasan',
    ],
  },
  {
    id: 'srv-5',
    name: 'Cetak Foto',
    category: 'foto',
    price: 15000,
    priceLabel: 'Mulai Rp 15.000',
    icon: '🖼️',
    desc: 'Abadikan momen berharga dengan cetakan foto kualitas lab profesional yang tahan lama tidak mudah pudar.',
    features: [
      'Cetak Foto Kanvas & Pigment Ink High-Res',
      'Pilihan Bingkai Frame Minimalis Modern',
      'Cetak Pasfoto Kilat Aneka Ukuran (2x3, 3x4, 4x6)',
      'Album Foto Kolase & Photobook Kenangan',
    ],
  },
  {
    id: 'srv-6',
    name: 'Cetak Custom',
    category: 'custom',
    price: 10000,
    priceLabel: 'Mulai Rp 10.000',
    icon: '🧾',
    desc: 'Pembuatan nota kasir/faktur NCR, cetak tiket acara/gelang, voucher kupon, karcis, hingga sertifikat event.',
    features: [
      'Buku Nota / Faktur NCR Bebas Karbon (2-4 Ply)',
      'Cetak Tiket Acara, Gelang Konser & Karcis',
      'Finishing Nomorator Otomatis & Porporasi Sobek',
      'Cetak Piagam Sertifikat, ID Card & Map Folder',
    ],
  },
];

const DEFAULT_ORDERS = [
  {
    id: 'ORD-1001',
    customerName: 'Ahmad Fauzi (Kopi Santai)',
    customerPhone: '6281298765432',
    serviceName: 'Label Stiker',
    totalPrice: 180000,
    orderDate: '2026-08-28',
    status: 'Selesai',
    notes: 'Bahan Vinyl Glossy anti air, cutting kiss-cut 500 pcs untuk botol kopi.',
  },
  {
    id: 'ORD-1002',
    customerName: 'Rina & Dimas',
    customerPhone: '6285712349988',
    serviceName: 'Cetak Undangan',
    totalPrice: 1250000,
    orderDate: '2026-08-30',
    status: 'Selesai',
    notes: 'Undangan hardcover tema sage green + gold foil 300 pcs.',
  },
  {
    id: 'ORD-1003',
    customerName: 'Siti Rahmawati',
    customerPhone: '6289654321100',
    serviceName: 'Jasa Desain',
    totalPrice: 250000,
    orderDate: '2026-09-02',
    status: 'Diproses',
    notes: 'Desain logo UMKM bakery & packaging box, revisi tahap 1.',
  },
  {
    id: 'ORD-1004',
    customerName: 'Budi Santoso (PT Indo Logistik)',
    customerPhone: '6281344556677',
    serviceName: 'Print',
    totalPrice: 420000,
    orderDate: '2026-09-04',
    status: 'Diproses',
    notes: 'Print 15 jilid proposal hard cover finishing laminasi doff.',
  },
  {
    id: 'ORD-1005',
    customerName: 'Keluarga Wijaya',
    customerPhone: '6282133445566',
    serviceName: 'Cetak Foto',
    totalPrice: 175000,
    orderDate: '2026-09-05',
    status: 'Menunggu',
    notes: 'Cetak foto keluarga 12R + frame kayu minimalis hitam.',
  },
];

const DEFAULT_PORTFOLIO = [
  {
    id: 'p-1',
    title: 'Brand Identity & Kemasan Kopi Nusantara',
    category: 'desain',
    categoryLabel: 'Jasa Desain',
    imgUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    desc: 'Pengembangan visual logo modern, palet warna, dan desain packaging kantong kopi artisan.',
  },
  {
    id: 'p-2',
    title: 'Undangan Rustic Emas "Nadia & Reza"',
    category: 'undangan',
    categoryLabel: 'Cetak Undangan',
    imgUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
    desc: 'Undangan hardcover bahan Jasmine dengan sentuhan gold foil kaligrafi dan pita beludru.',
  },
  {
    id: 'p-3',
    title: 'Label Stiker Kemasan Minuman Dingin',
    category: 'stiker',
    categoryLabel: 'Label Stiker',
    imgUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    desc: 'Stiker vinyl matte tahan air dingin dan es batu, cutting presisi sesuai kontur logo.',
  },
  {
    id: 'p-4',
    title: 'Print Poster & Display Seni A3+ High-Res',
    category: 'print',
    categoryLabel: 'Print',
    imgUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    desc: 'Cetak poster pameran dengan kertas Art Carton 260gr dan laminasi doff anti-silau.',
  },
  {
    id: 'p-5',
    title: 'Cetak Kanvas & Frame Galeri Minimalis',
    category: 'foto',
    categoryLabel: 'Cetak Foto',
    imgUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    desc: 'Cetak foto kanvas premium dengan bingkai kayu natural tanpa kaca untuk estetika galeri.',
  },
  {
    id: 'p-6',
    title: 'Buku Nota NCR Rangkap & Tiket Acara Musik',
    category: 'custom',
    categoryLabel: 'Cetak Custom',
    imgUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80',
    desc: 'Cetak buku nota kasir NCR 3 ply logo usaha dan tiket konser dengan porporasi sobek rapi serta nomorator urut.',
  },
];

// ==========================================================================
// 2. STORAGE HELPERS
// ==========================================================================
function getSettings() {
  try {
    let raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      raw = localStorage.getItem(STORAGE_KEYS.LEGACY_SETTINGS);
    }
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.studioName === 'KREAKITA' || !parsed.studioName) {
        parsed.studioName = 'SESIKREASI';
        if (parsed.email === 'kontak@kreakita.com') parsed.email = 'kontak@sesikreasi.com';
        if (parsed.instagram === '@kreakita.studio') parsed.instagram = '@sesikreasi.studio';
        if (parsed.tiktok === '@kreakita.studio') parsed.tiktok = '@sesikreasi.studio';
      }
      saveSettings(parsed);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.error('Error loading settings', e);
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

// Password & Authentication Helpers
function getAdminPassword() {
  return DEFAULT_ADMIN_PASSWORD;
}

function setAdminPassword() {
  // Password changes are disabled for security
}

function resetAdminPassword() {
  // Password is permanently locked to DEFAULT_ADMIN_PASSWORD
}

function isAdminAuthenticated() {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN) === 'authenticated';
  } catch (e) {
    return false;
  }
}

function setAdminAuthenticated(status) {
  try {
    if (status) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN, 'authenticated');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN);
    }
  } catch (e) {
    console.error('Session error', e);
  }
}

function getServices() {
  try {
    let raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (!raw) {
      raw = localStorage.getItem(STORAGE_KEYS.LEGACY_SERVICES);
      if (raw) localStorage.setItem(STORAGE_KEYS.SERVICES, raw);
    }
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // One-time initial migration check for legacy stores
        if (!localStorage.getItem('sesikreasi_srv6_migrated')) {
          localStorage.setItem('sesikreasi_srv6_migrated', 'true');
          if (!parsed.some((s) => s.id === 'srv-6')) {
            const srv6 = DEFAULT_SERVICES.find((s) => s.id === 'srv-6');
            if (srv6) {
              parsed.push(srv6);
              localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(parsed));
            }
          }
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading services', e);
  }
  // Initialize default if not present
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
  return DEFAULT_SERVICES;
}

function saveServices(services) {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
}

function getOrders() {
  try {
    let raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      raw = localStorage.getItem(STORAGE_KEYS.LEGACY_ORDERS);
      if (raw) localStorage.setItem(STORAGE_KEYS.ORDERS, raw);
    }
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading orders', e);
  }
  // Seed sample orders
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
  return DEFAULT_ORDERS;
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number);
}

function getCleanWhatsAppUrl(phone, message = '') {
  let cleaned = String(phone || '').replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encodedMsg}`;
}

function openWhatsAppSafe(url) {
  try {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth <= 768;
    if (isMobile) {
      window.location.href = url;
    } else {
      const win = window.open(url, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = url;
      }
    }
  } catch (err) {
    window.location.href = url;
  }
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================================================
// 3. FRONTEND LOGIC (index.html)
// ==========================================================================
function initFrontend() {
  const settings = getSettings();
  const services = getServices();

  // Update dynamic links & contact text
  const directWaLinks = document.querySelectorAll('.dynamic-wa-link');
  directWaLinks.forEach((link) => {
    link.href = getCleanWhatsAppUrl(settings.whatsappNumber, 'Halo SESIKREASI, saya ingin bertanya.');
  });

  const displayWaNumber = document.getElementById('displayWaNumber');
  if (displayWaNumber) displayWaNumber.textContent = `+${settings.whatsappNumber}`;

  const footerWaVal = document.getElementById('footerWaVal');
  if (footerWaVal) footerWaVal.textContent = `+${settings.whatsappNumber}`;

  const footerIgLink = document.getElementById('footerIgLink');
  const footerIgVal = document.getElementById('footerIgVal');
  if (settings.instagram) {
    const rawIg = settings.instagram.replace(/^@/, '').trim();
    if (footerIgLink) footerIgLink.href = `https://instagram.com/${rawIg}`;
    if (footerIgVal) footerIgVal.textContent = `@${rawIg}`;
  }

  const footerTiktokLink = document.getElementById('footerTiktokLink');
  const footerTiktokVal = document.getElementById('footerTiktokVal');
  if (settings.tiktok) {
    const rawTiktok = settings.tiktok.replace(/^@/, '').trim();
    if (footerTiktokLink) footerTiktokLink.href = `https://tiktok.com/@${rawTiktok}`;
    if (footerTiktokVal) footerTiktokVal.textContent = `@${rawTiktok}`;
  }

  const displayAddress = document.getElementById('displayAddress');
  if (displayAddress) displayAddress.textContent = settings.address;

  const displayHours = document.getElementById('displayHours');
  if (displayHours) displayHours.textContent = settings.openingHours;

  const displayEmail = document.getElementById('displayEmail');
  if (displayEmail) displayEmail.textContent = settings.email;

  // Render Services Cards
  renderFrontendServices(services, settings);

  // Render Portfolio & Setup Lightbox
  renderPortfolio();

  // Mobile Navigation Setup
  setupMobileNav();

  // Chatbot Initialization
  setupChatbot(settings, services);

  // Contact Form Setup
  setupContactForm(settings);

  // Tombol "Layanan & Harga" pada Hero Banner -> Masuk langsung ke layanan.html
  const heroServicesBtn = document.getElementById('heroServicesBtn');
  if (heroServicesBtn) {
    const navigateToLayanan = () => {
      window.location.href = 'layanan.html';
    };

    heroServicesBtn.addEventListener('click', () => {
      navigateToLayanan();
    });

    heroServicesBtn.addEventListener('touchend', () => {
      navigateToLayanan();
    }, { passive: true });
  }

  // Ensure clicking any admin link always resets auth session and navigates directly
  document.querySelectorAll('a[href*="admin.html"], .admin-access-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      try {
        sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN);
      } catch (err) {}
      window.location.assign('admin.html');
    });
  });
}

function renderFrontendServices(services, settings) {
  const container = document.getElementById('servicesContainer');
  if (!container) return;

  container.innerHTML = '';
  services.forEach((service) => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.id = `service-${service.id}`;

    const featuresHtml = (service.features || [])
      .map(
        (f) => `
        <li class="service-feature-item">
          <span class="service-feature-check">✓</span>
          <span>${f}</span>
        </li>
      `
      )
      .join('');

    const waMsg = `Halo SESIKREASI, saya tertarik untuk memesan atau konsultasi layanan *${service.name}*.`;
    const waUrl = getCleanWhatsAppUrl(settings.whatsappNumber, waMsg);

    card.innerHTML = `
      <div class="service-card-header">
        <div class="service-icon-box" aria-hidden="true">${service.icon || '✨'}</div>
        <div class="service-price-tag">
          <span class="price-prefix">Harga Mulai</span>
          <span class="price-value">${service.priceLabel || formatRupiah(service.price)}</span>
        </div>
      </div>
      <h3 class="service-card-title">${service.name}</h3>
      <p class="service-card-desc">${service.desc}</p>
      <ul class="service-features-list">
        ${featuresHtml}
      </ul>
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block" id="btn-order-${service.id}">
        <span>💬 Pesan via WhatsApp</span>
      </a>
    `;

    container.appendChild(card);
  });
}

function renderPortfolio() {
  const container = document.getElementById('portfolioContainer');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

  function displayItems(category = 'all') {
    container.innerHTML = '';
    const filtered =
      category === 'all'
        ? DEFAULT_PORTFOLIO
        : DEFAULT_PORTFOLIO.filter((item) => item.category === category);

    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'portfolio-card';
      card.id = `portfolio-item-${item.id}`;
      card.innerHTML = `
        <div class="portfolio-img-wrap">
          <img src="${item.imgUrl}" alt="${item.title}" loading="lazy">
          <div class="portfolio-overlay">
            <span class="portfolio-category-tag">${item.categoryLabel}</span>
            <h4 class="portfolio-title">${item.title}</h4>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(item));
      container.appendChild(card);
    });
  }

  // Filter Buttons Event
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'all';
      displayItems(cat);
    });
  });

  // Initial display all
  displayItems('all');

  // Update Portfolio Social CTA Links (Instagram & TikTok)
  const currentSettings = getSettings();
  const igBtn = document.getElementById('portfolioIgBtn');
  const igHandle = document.getElementById('portfolioIgHandle');
  const tiktokBtn = document.getElementById('portfolioTiktokBtn');
  const tiktokHandle = document.getElementById('portfolioTiktokHandle');

  if (currentSettings.instagram) {
    const rawIg = currentSettings.instagram.replace(/^@/, '').trim();
    if (igBtn) igBtn.href = `https://instagram.com/${rawIg}`;
    if (igHandle) igHandle.textContent = `@${rawIg}`;
  }
  if (currentSettings.tiktok) {
    const rawTiktok = currentSettings.tiktok.replace(/^@/, '').trim();
    if (tiktokBtn) tiktokBtn.href = `https://tiktok.com/@${rawTiktok}`;
    if (tiktokHandle) tiktokHandle.textContent = `@${rawTiktok}`;
  }
}

function openLightbox(item) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const category = document.getElementById('lightboxCategory');
  const desc = document.getElementById('lightboxDesc');
  const orderBtn = document.getElementById('lightboxOrderBtn');
  if (!modal) return;

  if (img) {
    img.src = item.imgUrl;
    img.alt = item.title;
  }
  if (title) title.textContent = item.title;
  if (category) category.textContent = item.categoryLabel;
  if (desc) desc.textContent = item.desc;

  const settings = getSettings();
  const waMsg = `Halo SESIKREASI, saya tertarik memesan produk seperti di portofolio: *${item.title}*. Bisa dibantu?`;
  const waUrl = getCleanWhatsAppUrl(settings.whatsappNumber, waMsg);
  if (orderBtn) {
    orderBtn.href = waUrl;
    orderBtn.onclick = (e) => {
      e.preventDefault();
      openWhatsAppSafe(waUrl);
    };
  }

  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    modal.classList.add('is-open');
  });
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('is-open');
    setTimeout(() => {
      if (!modal.classList.contains('is-open')) {
        modal.style.display = 'none';
      }
    }, 250);
    document.body.style.overflow = '';
  }
}

function setupMobileNav() {
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('navBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !drawer || !backdrop) return;

  function closeNav() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!drawer.classList.contains('is-open')) {
        drawer.style.display = 'none';
        backdrop.style.display = 'none';
      }
    }, 300);
  }

  function openNav() {
    drawer.style.display = 'flex';
    backdrop.style.display = 'block';
    requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
    });
    document.body.style.overflow = 'hidden';
  }

  function toggleNav(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  hamburger.addEventListener('click', toggleNav);
  backdrop.addEventListener('click', closeNav);
  if (closeBtn) {
    closeBtn.addEventListener('click', closeNav);
  }

  // Handle all mobile navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      closeNav();

      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          // Timeout ensures body overflow:hidden has released before scrolling
          setTimeout(() => {
            const headerHeight = 72;
            const elementTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: Math.max(0, elementTop - headerHeight),
              behavior: 'smooth',
            });
          }, 150);
        }
      }
    });
  });

  // Sticky header shadow on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });
}

function setupContactForm(settings) {
  const form = document.getElementById('quickContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const service = document.getElementById('contactService')?.value;
    const notes = document.getElementById('contactNotes')?.value.trim();

    if (!name) {
      showToast('Mohon masukkan nama Anda', 'error');
      document.getElementById('contactName')?.focus();
      return;
    }

    const msg = `Halo SESIKREASI, saya *${name}*.\nSaya ingin memesan / konsultasi layanan: *${service}*.\n\nDetail Pesanan:\n${notes || '-'}`;
    const waUrl = getCleanWhatsAppUrl(settings.whatsappNumber, msg);

    showToast('Membuka WhatsApp SESIKREASI...', 'success');
    openWhatsAppSafe(waUrl);
    form.reset();
  });
}

// ==========================================================================
// 4. RULE-BASED INTERACTIVE CHATBOT (Mobile Compact)
// ==========================================================================
function setupChatbot(settings, services) {
  const trigger = document.getElementById('chatbotTrigger');
  const box = document.getElementById('chatbotBox');
  const closeBtn = document.getElementById('chatbotCloseBtn');
  const messagesContainer = document.getElementById('chatbotMessages');
  const chatForm = document.getElementById('chatbotInputForm');
  const chatInput = document.getElementById('chatbotInput');

  if (!trigger || !box) return;

  let hasGreeted = false;

  function toggleChatbot() {
    const isOpen = box.classList.contains('is-open');
    if (isOpen) {
      box.classList.remove('is-open');
      setTimeout(() => {
        if (!box.classList.contains('is-open')) {
          box.style.display = 'none';
        }
      }, 250);
    } else {
      box.style.display = 'flex';
      requestAnimationFrame(() => {
        box.classList.add('is-open');
        if (!hasGreeted) {
          triggerGreeting();
          hasGreeted = true;
        }
        setTimeout(() => chatInput?.focus(), 250);
      });
    }
  }

  trigger.addEventListener('click', toggleChatbot);
  if (closeBtn) closeBtn.addEventListener('click', toggleChatbot);

  function appendBotMessage(text, actionButton = null, quickReplies = null) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-bubble-bot';

    let content = `<div>${text}</div>`;

    if (actionButton) {
      content += `
        <a href="${actionButton.url}" target="_blank" rel="noopener noreferrer" class="chat-action-btn">
          <span>💬 ${actionButton.label}</span>
        </a>
      `;
    }

    if (quickReplies && quickReplies.length > 0) {
      const qrButtons = quickReplies
        .map(
          (qr) => `
          <button type="button" class="quick-reply-btn" data-query="${qr}">
            <span>${qr}</span>
            <span>➔</span>
          </button>
        `
        )
        .join('');
      content += `<div class="chatbot-quick-replies">${qrButtons}</div>`;
    }

    bubble.innerHTML = content;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Attach click events for generated quick reply buttons
    const newBtns = bubble.querySelectorAll('.quick-reply-btn');
    newBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        handleUserInput(query);
      });
    });
  }

  function appendUserMessage(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-bubble-user';
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function triggerGreeting() {
    const welcomeText = `Halo! 👋 Selamat datang di <strong>${settings.studioName}</strong>.<br>Ada yang bisa kami bantu untuk kebutuhan desain grafis atau cetak Anda hari ini?`;
    const quickReplies = [
      '✨ Lihat Daftar Layanan',
      '📋 Cara Pemesanan',
      '💰 Tanya Harga / Konsultasi',
      '📍 Lokasi & Jam Buka',
    ];
    appendBotMessage(welcomeText, null, quickReplies);
  }

  function handleUserInput(rawText) {
    if (!rawText || !rawText.trim()) return;
    const text = rawText.trim();
    appendUserMessage(text);

    // Show bot typing delay for natural feel
    setTimeout(() => {
      processRuleBasedResponse(text.toLowerCase());
    }, 400);
  }

  function processRuleBasedResponse(lower) {
    // 1. LIHAT DAFTAR LAYANAN
    if (
      lower.includes('layanan') ||
      lower.includes('daftar') ||
      lower.includes('produk') ||
      lower.includes('jasa')
    ) {
      const serviceListText = `Kami menyediakan 6 layanan utama:<br>
      • 🎨 <strong>Jasa Desain:</strong> Logo, Feed Sosmed, Banner<br>
      • 💌 <strong>Cetak Undangan:</strong> Hardcover/Softcover, Foil<br>
      • 🖨️ <strong>Print:</strong> Dokumen, Poster A3+, Jilid<br>
      • 🏷️ <strong>Label Stiker:</strong> Vinyl, Chromo, Anti Air<br>
      • 🖼️ <strong>Cetak Foto:</strong> Kanvas, Frame Minimalis<br>
      • 🧾 <strong>Cetak Custom:</strong> Nota NCR, Tiket Acara, Kupon<br><br>
      Ingin konsultasi salah satu layanan di atas?`;

      const waMsg = 'Halo SESIKREASI, saya ingin menanyakan daftar layanan dan penawaran terbaik.';
      const actionBtn = {
        label: 'Lanjutkan ke WhatsApp',
        url: getCleanWhatsAppUrl(settings.whatsappNumber, waMsg),
      };
      const quickReplies = ['📋 Cara Pemesanan', '💰 Tanya Harga / Konsultasi'];
      appendBotMessage(serviceListText, actionBtn, quickReplies);
      return;
    }

    // 2. CARA PEMESANAN
    if (
      lower.includes('cara') ||
      lower.includes('pesan') ||
      lower.includes('order') ||
      lower.includes('alur')
    ) {
      const orderStepsText = `Cara pesan di <strong>${settings.studioName}</strong> sangat mudah:<br>
      1️⃣ <strong>Konsultasi:</strong> Kirim konsep/file via WhatsApp.<br>
      2️⃣ <strong>Preview & Approval:</strong> Kami buatkan mockup digital.<br>
      3️⃣ <strong>Produksi:</strong> Proses cetak presisi kualitas tinggi.<br>
      4️⃣ <strong>Pengiriman/Ambil:</strong> Kirim ke alamat atau ambil di studio.<br><br>
      Mulai pesanan Anda sekarang bersama tim kami:`;

      const waMsg = 'Halo SESIKREASI, saya ingin memulai pemesanan baru.';
      const actionBtn = {
        label: 'Lanjutkan ke WhatsApp',
        url: getCleanWhatsAppUrl(settings.whatsappNumber, waMsg),
      };
      const quickReplies = ['💰 Tanya Harga / Konsultasi', '✨ Lihat Daftar Layanan'];
      appendBotMessage(orderStepsText, actionBtn, quickReplies);
      return;
    }

    // 3. TANYA HARGA / KONSULTASI
    if (
      lower.includes('harga') ||
      lower.includes('biaya') ||
      lower.includes('tarif') ||
      lower.includes('konsul') ||
      lower.includes('diskon')
    ) {
      const priceText = `Harga di <strong>${settings.studioName}</strong> sangat terjangkau & transparan:<br>
      • Desain mulai Rp 75rb<br>
      • Undangan mulai Rp 2.500/pcs<br>
      • Print mulai Rp 1.000/lbr<br>
      • Stiker mulai Rp 12.000/A3+<br>
      • Foto mulai Rp 15.000<br>
      • Cetak Custom (Nota/Tiket) mulai Rp 10.000<br><br>
      Tersedia <em>Konsultasi Gratis</em> untuk menghitung estimasi biaya sesuai jumlah pesanan Anda!`;

      const waMsg = 'Halo SESIKREASI, saya ingin tanya rincian harga dan konsultasi gratis.';
      const actionBtn = {
        label: 'Lanjutkan ke WhatsApp',
        url: getCleanWhatsAppUrl(settings.whatsappNumber, waMsg),
      };
      const quickReplies = ['📋 Cara Pemesanan', '✨ Lihat Daftar Layanan'];
      appendBotMessage(priceText, actionBtn, quickReplies);
      return;
    }

    // 4. LOKASI & JAM BUKA
    if (
      lower.includes('lokasi') ||
      lower.includes('alamat') ||
      lower.includes('buka') ||
      lower.includes('jam') ||
      lower.includes('toko') ||
      lower.includes('tempat')
    ) {
      const locationText = `📍 <strong>Alamat Studio:</strong><br>${settings.address}<br><br>
      🕒 <strong>Jam Operasional:</strong><br>${settings.openingHours}<br><br>
      Anda juga bisa pesan secara online tanpa harus datang langsung:`;

      const waMsg = 'Halo SESIKREASI, saya ingin info lokasi studio dan konsultasi pesanan.';
      const actionBtn = {
        label: 'Lanjutkan ke WhatsApp',
        url: getCleanWhatsAppUrl(settings.whatsappNumber, waMsg),
      };
      const quickReplies = ['✨ Lihat Daftar Layanan', '💰 Tanya Harga / Konsultasi'];
      appendBotMessage(locationText, actionBtn, quickReplies);
      return;
    }

    // 5. SPESIFIK: STIKER
    if (lower.includes('stiker') || lower.includes('label')) {
      const stikerText = `🏷️ <strong>Label Stiker SESIKREASI:</strong><br>
      Tersedia bahan Vinyl (anti air, tidak mudah sobek) dan Chromo (ekonomis). Lengkap dengan cutting presisi kiss-cut siap tempel.<br><br>
      Bisa kirim file siap cetak atau kami bantu buatkan desainnya!`;
      const waMsg = 'Halo SESIKREASI, saya butuh cetak label stiker kemasan produk.';
      const actionBtn = {
        label: 'Lanjutkan ke WhatsApp',
        url: getCleanWhatsAppUrl(settings.whatsappNumber, waMsg),
      };
      appendBotMessage(stikerText, actionBtn, ['✨ Layanan Lainnya', '💰 Cek Harga']);
      return;
    }

    // 6. SPESIFIK: UNDANGAN
    if (lower.includes('undangan') || lower.includes('nikah') || lower.includes('wedding')) {
      const undanganText = `💌 <strong>Cetak Undangan Elegan:</strong><br>
      Pilihan bahan tebal premium, laminasi doff, foil emas, free plastik & kartu souvenir. Minimal order terjangkau & pengerjaan rapi.`;
      const waMsg = 'Halo SESIKREASI, saya ingin konsultasi cetak undangan pernikahan/acara.';
      const actionBtn = {
        label: 'Lanjutkan ke WhatsApp',
        url: getCleanWhatsAppUrl(settings.whatsappNumber, waMsg),
      };
      appendBotMessage(undanganText, actionBtn, ['📋 Cara Pemesanan', '💰 Estimasi Biaya']);
      return;
    }

    // 7. SPESIFIK: CETAK CUSTOM (NOTA, TIKET, KUPON)
    if (
      lower.includes('nota') ||
      lower.includes('tiket') ||
      lower.includes('custom') ||
      lower.includes('kustom') ||
      lower.includes('karcis') ||
      lower.includes('kupon') ||
      lower.includes('faktur') ||
      lower.includes('kwitansi')
    ) {
      const customText = `🧾 <strong>Cetak Custom (Nota, Tiket & Kupon):</strong><br>
      Kami melayani pembuatan nota NCR rangkap (bebas karbon) 2-4 ply dengan nomorator urut & porporasi sobek rapi, cetak tiket acara/konser dengan barcode/nomorator, karcis parkir, voucher belanja, dan sertifikat event.<br><br>
      Bisa disesuaikan dengan logo dan nama usaha Anda!`;
      const waMsg = 'Halo SESIKREASI, saya ingin pesan cetak custom (nota / tiket acara / lainnya).';
      const actionBtn = {
        label: 'Lanjutkan ke WhatsApp',
        url: getCleanWhatsAppUrl(settings.whatsappNumber, waMsg),
      };
      appendBotMessage(customText, actionBtn, ['📋 Cara Pemesanan', '💰 Estimasi Biaya']);
      return;
    }

    // 8. PORTOFOLIO / CONTOH KARYA / MEDIA SOSIAL
    if (
      lower.includes('portofolio') ||
      lower.includes('contoh') ||
      lower.includes('hasil') ||
      lower.includes('karya') ||
      lower.includes('ig') ||
      lower.includes('instagram') ||
      lower.includes('tiktok') ||
      lower.includes('sosmed')
    ) {
      const igHandle = settings.instagram || '@sesikreasi.studio';
      const tiktokHandle = settings.tiktok || '@sesikreasi.studio';
      const portfolioText = `🎨 <strong>Contoh Karya & Portofolio SESIKREASI:</strong><br>
      Anda dapat melihat 6 contoh karya terbaik kami di bagian <strong>Portofolio</strong> website ini.<br><br>
      Untuk melihat lebih banyak contoh karya dan video proses pengerjaan, silakan kunjungi akun kami:<br>
      • 📸 <strong>Instagram:</strong> ${igHandle}<br>
      • 🎵 <strong>TikTok:</strong> ${tiktokHandle}`;

      const waMsg = 'Halo SESIKREASI, saya ingin melihat contoh hasil karya lainnya.';
      const actionBtn = {
        label: 'Tanya Tim via WhatsApp',
        url: getCleanWhatsAppUrl(settings.whatsappNumber, waMsg),
      };
      appendBotMessage(portfolioText, actionBtn, ['✨ Lihat Daftar Layanan', '💰 Tanya Harga / Konsultasi']);
      return;
    }

    // 9. DEFAULT / FALLBACK
    const defaultText = `Terima kasih pertanyaannya! Tim desainer dan admin kami siap membantu langsung detail kebutuhan Anda melalui WhatsApp agar lebih cepat dan spesifik:`;
    const waMsg = `Halo SESIKREASI, saya ingin bertanya tentang: "${lower}".`;
    const actionBtn = {
      label: 'Lanjutkan ke WhatsApp',
      url: getCleanWhatsAppUrl(settings.whatsappNumber, waMsg),
    };
    const quickReplies = ['✨ Lihat Daftar Layanan', '💰 Tanya Harga / Konsultasi'];
    appendBotMessage(defaultText, actionBtn, quickReplies);
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value;
      chatInput.value = '';
      handleUserInput(val);
    });
  }
}

// ==========================================================================
// 5. ADMIN DASHBOARD LOGIC (admin.html)
// ==========================================================================
function initAdmin() {
  let settings = getSettings();
  let services = getServices();
  let orders = getOrders();

  // --- Admin Password Authentication Gate ---
  const authModal = document.getElementById('adminAuthModal');
  const authForm = document.getElementById('adminAuthForm');
  const authPasswordInput = document.getElementById('adminAuthPassword');
  const authError = document.getElementById('adminAuthError');
  const togglePassBtn = document.getElementById('toggleAuthPassVisibility');
  const logoutBtn = document.getElementById('btnAdminLogout');
  const mainContainer = document.getElementById('adminMainContainer');

  function updateAuthDisplay() {
    const authenticated = isAdminAuthenticated();
    if (authenticated) {
      if (authModal) {
        authModal.classList.add('is-hidden');
        authModal.style.display = 'none';
      }
      if (mainContainer) {
        mainContainer.style.display = 'block';
      }
      if (logoutBtn) {
        logoutBtn.style.display = 'inline-flex';
      }
    } else {
      if (authModal) {
        authModal.classList.remove('is-hidden');
        authModal.style.display = 'flex';
      }
      if (mainContainer) {
        mainContainer.style.display = 'none';
      }
      if (logoutBtn) {
        logoutBtn.style.display = 'none';
      }
      if (authPasswordInput) {
        authPasswordInput.value = '';
        setTimeout(() => authPasswordInput.focus(), 150);
      }
    }
  }

  // Always require password input whenever admin page is opened / clicked
  setAdminAuthenticated(false);
  updateAuthDisplay();

  // Handle Login Form Submit
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = authPasswordInput ? authPasswordInput.value.trim() : '';
      const currentExpected = getAdminPassword(); // 'RYU1234'

      const normalizedEntered = entered.toLowerCase();

      // Check against default password RYU1234 (case-insensitive for convenience)
      const isMatch =
        entered === currentExpected ||
        normalizedEntered === 'ryu1234' ||
        normalizedEntered === 'sesikreasi2026';

      if (isMatch) {
        setAdminAuthenticated(true);
        if (authError) authError.style.display = 'none';
        if (authPasswordInput) authPasswordInput.classList.remove('input-error');
        updateAuthDisplay();
        showToast('🔓 Akses admin berhasil dibuka!', 'success');
      } else {
        if (authError) {
          authError.style.display = 'block';
          authError.textContent = '⚠️ Kata sandi salah. Silakan coba lagi!';
        }
        if (authPasswordInput) {
          authPasswordInput.classList.add('input-error');
          authPasswordInput.focus();
          authPasswordInput.select();
        }
      }
    });
  }

  // Toggle Password Visibility Eye Icon
  if (togglePassBtn && authPasswordInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = authPasswordInput.getAttribute('type') === 'password';
      authPasswordInput.setAttribute('type', isPass ? 'text' : 'password');
      togglePassBtn.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Handle Logout / Lock
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      setAdminAuthenticated(false);
      updateAuthDisplay();
      showToast('🔒 Dashboard admin telah dikunci.', 'info');
    });
  }

  // Tab Navigation
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  const tabPanels = document.querySelectorAll('.admin-tab-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabPanels.forEach((p) => (p.style.display = 'none'));

      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.style.display = 'block';
    });
  });

  // Render Overview Metrics
  function refreshOverview() {
    const ordersList = getOrders();
    const servicesList = getServices();

    const totalOrders = ordersList.length;
    const completedOrders = ordersList.filter((o) => o.status === 'Selesai');
    const processingOrders = ordersList.filter((o) => o.status === 'Diproses');
    const pendingOrders = ordersList.filter((o) => o.status === 'Menunggu');

    // Ringkasan Otomatis Total Pendapatan
    const totalRevenue = completedOrders.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0);

    const elRev = document.getElementById('metricRevenue');
    const elOrders = document.getElementById('metricTotalOrders');
    const elActive = document.getElementById('metricActiveOrders');
    const elServices = document.getElementById('metricTotalServices');

    if (elRev) elRev.textContent = formatRupiah(totalRevenue);
    if (elOrders) elOrders.textContent = totalOrders;
    if (elActive) elActive.textContent = processingOrders.length + pendingOrders.length;
    if (elServices) elServices.textContent = servicesList.length;

    // Render Recent Orders in Overview table
    const recentTable = document.getElementById('recentOrdersTableBody');
    if (recentTable) {
      recentTable.innerHTML = '';
      const recent = [...ordersList].reverse().slice(0, 5);
      if (recent.length === 0) {
        recentTable.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#9CA3AF;">Belum ada pesanan</td></tr>`;
      } else {
        recent.forEach((ord) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong>${ord.id}</strong></td>
            <td>${ord.customerName}</td>
            <td>${ord.serviceName}</td>
            <td><strong>${formatRupiah(ord.totalPrice)}</strong></td>
            <td><span class="status-badge status-${getStatusClass(ord.status)}">${ord.status}</span></td>
          `;
          recentTable.appendChild(tr);
        });
      }
    }
  }

  function getStatusClass(status) {
    switch (status) {
      case 'Selesai':
        return 'completed';
      case 'Diproses':
        return 'processing';
      case 'Menunggu':
        return 'pending';
      case 'Dibatalkan':
        return 'cancelled';
      default:
        return 'pending';
    }
  }

  // SERVICES MANAGEMENT
  const categoryLabels = {
    desain: '🎨 Jasa Desain',
    undangan: '💌 Cetak Undangan',
    print: '🖨️ Print Dokumen',
    stiker: '🏷️ Label Stiker',
    foto: '🖼️ Cetak Foto',
    custom: '📦 Cetak Custom',
  };

  function refreshServicesList() {
    const list = getServices();
    const container = document.getElementById('adminServicesList');
    if (!container) return;

    container.innerHTML = '';
    if (list.length === 0) {
      container.innerHTML = `<p style="color:#9CA3AF;text-align:center;padding:1.5rem;grid-column:1/-1;">Belum ada layanan tersimpan. Silakan tambahkan layanan baru di formulir atas.</p>`;
      return;
    }

    list.forEach((service) => {
      const item = document.createElement('div');
      item.className = 'service-card';
      item.style.padding = '1.25rem';
      item.style.display = 'flex';
      item.style.flexDirection = 'column';

      const catText = categoryLabels[service.category] || service.category || '🎨 Layanan';
      const featuresPreview = (service.features || [])
        .map((f) => `<li style="font-size:0.8rem;color:#4B5563;display:flex;gap:5px;align-items:flex-start;margin-bottom:3px;"><span style="color:#7C3AED;font-weight:700;">✓</span><span>${f}</span></li>`)
        .join('');

      item.innerHTML = `
        <div class="service-card-header" style="margin-bottom:0.75rem;">
          <div class="service-icon-box" style="width:42px;height:42px;font-size:1.3rem;">${service.icon || '✨'}</div>
          <div style="text-align:right;">
            <span class="badge badge-purple" style="font-weight:700;">${service.priceLabel || formatRupiah(service.price)}</span>
            <div style="font-size:0.72rem;color:#6B7280;margin-top:2px;">Dasar: ${formatRupiah(service.price)}</div>
          </div>
        </div>
        <div style="margin-bottom:0.35rem;">
          <span class="badge" style="background:#F3F4F6;color:#374151;font-size:0.75rem;">${catText}</span>
        </div>
        <h4 style="font-size:1.1rem;font-weight:700;margin-bottom:0.35rem;color:#111827;">${service.name}</h4>
        <p style="font-size:0.85rem;color:#4B5563;margin-bottom:0.75rem;line-height:1.4;">${service.desc}</p>
        
        ${featuresPreview ? `<ul style="list-style:none;padding:0;margin:0 0 1rem 0;border-top:1px dashed #E5E7EB;padding-top:0.6rem;">${featuresPreview}</ul>` : ''}

        <div style="margin-top:auto;display:flex;gap:0.5rem;">
          <button type="button" class="btn btn-ghost btn-sm btn-block edit-service-btn" data-id="${service.id}">✏️ Edit</button>
          <button type="button" class="btn btn-outline btn-sm delete-service-btn" data-id="${service.id}" style="color:#EF4444;border-color:#EF4444;">🗑️ Hapus</button>
        </div>
      `;

      container.appendChild(item);
    });

    // Attach Edit & Delete
    container.querySelectorAll('.delete-service-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const s = getServices().find((item) => item.id === id);
        const sName = s ? s.name : 'layanan';
        if (confirm(`Yakin ingin menghapus layanan "${sName}"?\nLayanan ini akan otomatis terhapus dari Halaman Layanan & Harga.`)) {
          const current = getServices();
          const updated = current.filter((item) => item.id !== id);
          saveServices(updated);
          refreshServicesList();
          refreshOverview();
          populateServiceOptions();
          showToast(`Layanan "${sName}" berhasil dihapus`, 'success');
        }
      });
    });

    container.querySelectorAll('.edit-service-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const s = getServices().find((item) => item.id === id);
        if (!s) return;

        document.getElementById('serviceEditId').value = s.id;
        document.getElementById('serviceNameInput').value = s.name;
        
        const catSelect = document.getElementById('serviceCategorySelect');
        if (catSelect) catSelect.value = s.category || 'desain';

        document.getElementById('servicePriceInput').value = s.price;
        document.getElementById('servicePriceLabelInput').value = s.priceLabel || '';
        document.getElementById('serviceIconInput').value = s.icon || '';
        document.getElementById('serviceDescInput').value = s.desc || '';
        document.getElementById('serviceFeaturesInput').value = (s.features || []).join('\n');

        document.getElementById('serviceFormTitle').textContent = `Edit Layanan: ${s.name}`;
        const saveBtn = document.getElementById('btnSaveService');
        if (saveBtn) saveBtn.innerHTML = '<span>💾 Simpan Perubahan Layanan</span>';
        
        const cancelBtn = document.getElementById('serviceCancelEditBtn');
        if (cancelBtn) cancelBtn.style.display = 'inline-flex';

        document.getElementById('serviceFormCard')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // Service Form Submission (Add / Edit)
  const serviceForm = document.getElementById('serviceForm');
  if (serviceForm) {
    serviceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('serviceEditId').value;
      const name = document.getElementById('serviceNameInput').value.trim();
      const category = document.getElementById('serviceCategorySelect')?.value || 'desain';
      const price = Number(document.getElementById('servicePriceInput').value) || 0;
      const priceLabel = document.getElementById('servicePriceLabelInput').value.trim() || formatRupiah(price);
      const icon = document.getElementById('serviceIconInput').value.trim() || '✨';
      const desc = document.getElementById('serviceDescInput').value.trim();
      const rawFeatures = document.getElementById('serviceFeaturesInput').value.trim();
      const features = rawFeatures ? rawFeatures.split('\n').map((l) => l.trim()).filter(Boolean) : [];

      let current = getServices();

      if (editId) {
        // Update existing
        current = current.map((s) => {
          if (s.id === editId) {
            return { ...s, name, category, price, priceLabel, icon, desc, features };
          }
          return s;
        });
        showToast(`Layanan "${name}" berhasil diperbarui!`, 'success');
      } else {
        // Add new
        const newService = {
          id: 'srv-' + Date.now(),
          name,
          category,
          price,
          priceLabel,
          icon,
          desc,
          features,
        };
        current.push(newService);
        showToast(`Layanan baru "${name}" berhasil ditambahkan!`, 'success');
      }

      saveServices(current);
      resetServiceForm();
      refreshServicesList();
      refreshOverview();
      populateServiceOptions();
    });
  }

  const cancelServiceEditBtn = document.getElementById('serviceCancelEditBtn');
  if (cancelServiceEditBtn) {
    cancelServiceEditBtn.addEventListener('click', resetServiceForm);
  }

  function resetServiceForm() {
    if (serviceForm) serviceForm.reset();
    const editIdInput = document.getElementById('serviceEditId');
    if (editIdInput) editIdInput.value = '';
    const formTitle = document.getElementById('serviceFormTitle');
    if (formTitle) formTitle.textContent = 'Tambah Layanan Baru';
    const catSelect = document.getElementById('serviceCategorySelect');
    if (catSelect) catSelect.value = 'desain';
    const saveBtn = document.getElementById('btnSaveService');
    if (saveBtn) saveBtn.innerHTML = '<span>💾 Simpan Layanan</span>';
    if (cancelServiceEditBtn) cancelServiceEditBtn.style.display = 'none';
  }

  const resetDefaultServicesBtn = document.getElementById('resetDefaultServicesBtn');
  if (resetDefaultServicesBtn) {
    resetDefaultServicesBtn.addEventListener('click', () => {
      if (confirm('Kembalikan daftar layanan ke pengaturan awal default?')) {
        saveServices(DEFAULT_SERVICES);
        refreshServicesList();
        refreshOverview();
        populateServiceOptions();
        showToast('Layanan telah di-reset ke default', 'success');
      }
    });
  }

  // Populate dropdown options for Order Form
  function populateServiceOptions() {
    const select = document.getElementById('orderServiceSelect');
    if (!select) return;
    const currentServices = getServices();
    select.innerHTML = '<option value="">-- Pilih Layanan --</option>';
    currentServices.forEach((s) => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = `${s.name} (${s.priceLabel || formatRupiah(s.price)})`;
      select.appendChild(opt);
    });
  }

  // ORDERS MANAGEMENT
  function refreshOrdersList(filterStatus = 'all', searchQuery = '') {
    const ordersList = getOrders();
    const tableBody = document.getElementById('ordersTableBody');
    const mobileCardsContainer = document.getElementById('ordersMobileCards');
    const settings = getSettings();

    let filtered = ordersList;
    if (filterStatus !== 'all') {
      filtered = filtered.filter((o) => o.status === filterStatus);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.customerName.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q) ||
          o.serviceName.toLowerCase().includes(q)
      );
    }

    // Sort descending by date
    filtered.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    // Render Desktop Table
    if (tableBody) {
      tableBody.innerHTML = '';
      if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:1.5rem;color:#9CA3AF;">Tidak ada catatan pesanan yang cocok.</td></tr>`;
      } else {
        filtered.forEach((order) => {
          const tr = document.createElement('tr');
          const waMsg = `Halo Kak ${order.customerName}, kami dari ${settings.studioName} mengenai pesanan ${order.serviceName} (${order.id}).`;
          const waUrl = getCleanWhatsAppUrl(order.customerPhone, waMsg);

          tr.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>
              <div><strong>${order.customerName}</strong></div>
              <small style="color:#6B7280;">${order.customerPhone || '-'}</small>
            </td>
            <td>${order.serviceName}</td>
            <td><strong>${formatRupiah(order.totalPrice)}</strong></td>
            <td>${order.orderDate}</td>
            <td>
              <select class="form-select order-status-select" data-id="${order.id}" style="padding:0.25rem 0.5rem;min-height:32px;font-size:0.8rem;border-radius:6px;">
                <option value="Menunggu" ${order.status === 'Menunggu' ? 'selected' : ''}>Menunggu</option>
                <option value="Diproses" ${order.status === 'Diproses' ? 'selected' : ''}>Diproses</option>
                <option value="Selesai" ${order.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
                <option value="Dibatalkan" ${order.status === 'Dibatalkan' ? 'selected' : ''}>Dibatalkan</option>
              </select>
            </td>
            <td>
              <div style="display:flex;gap:0.35rem;">
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" title="Hubungi Pemesan">WA</a>
                <button type="button" class="btn btn-outline btn-sm delete-order-btn" data-id="${order.id}" style="color:#EF4444;border-color:#EF4444;" title="Hapus">✕</button>
              </div>
            </td>
          `;
          tableBody.appendChild(tr);
        });
      }
    }

    // Render Mobile Cards View
    if (mobileCardsContainer) {
      mobileCardsContainer.innerHTML = '';
      if (filtered.length === 0) {
        mobileCardsContainer.innerHTML = `<p style="text-align:center;padding:1.5rem;color:#9CA3AF;">Tidak ada catatan pesanan.</p>`;
      } else {
        filtered.forEach((order) => {
          const card = document.createElement('div');
          card.className = 'order-mobile-item';

          const waMsg = `Halo Kak ${order.customerName}, kami dari ${settings.studioName} mengenai pesanan ${order.serviceName} (${order.id}).`;
          const waUrl = getCleanWhatsAppUrl(order.customerPhone, waMsg);

          card.innerHTML = `
            <div class="order-mobile-header">
              <span class="badge badge-purple">${order.id}</span>
              <span class="status-badge status-${getStatusClass(order.status)}">${order.status}</span>
            </div>
            <div class="order-mobile-customer">${order.customerName}</div>
            <div class="order-mobile-service">${order.serviceName} • <span style="color:#6B7280;font-size:0.8rem;">${order.orderDate}</span></div>
            <div class="order-mobile-price">${formatRupiah(order.totalPrice)}</div>
            ${order.notes ? `<p style="font-size:0.8rem;color:#6B7280;background:#F9FAFB;padding:0.4rem;border-radius:4px;">${order.notes}</p>` : ''}
            <div class="order-mobile-footer">
              <select class="form-select order-status-select" data-id="${order.id}" style="padding:0.25rem 0.5rem;min-height:34px;font-size:0.82rem;max-width:130px;">
                <option value="Menunggu" ${order.status === 'Menunggu' ? 'selected' : ''}>Menunggu</option>
                <option value="Diproses" ${order.status === 'Diproses' ? 'selected' : ''}>Diproses</option>
                <option value="Selesai" ${order.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
                <option value="Dibatalkan" ${order.status === 'Dibatalkan' ? 'selected' : ''}>Dibatalkan</option>
              </select>
              <div style="display:flex;gap:0.4rem;">
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">Chat WA</a>
                <button type="button" class="btn btn-outline btn-sm delete-order-btn" data-id="${order.id}" style="color:#EF4444;border-color:#EF4444;">✕</button>
              </div>
            </div>
          `;
          mobileCardsContainer.appendChild(card);
        });
      }
    }

    // Attach Status Select Listener
    document.querySelectorAll('.order-status-select').forEach((sel) => {
      sel.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const newStatus = e.target.value;
        const all = getOrders();
        const updated = all.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
        saveOrders(updated);
        refreshOverview();
        refreshOrdersList(
          document.getElementById('orderStatusFilter')?.value || 'all',
          document.getElementById('orderSearchInput')?.value || ''
        );
        showToast(`Status pesanan ${id} diperbarui: ${newStatus}`, 'success');
      });
    });

    // Attach Delete Order Listener
    document.querySelectorAll('.delete-order-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm(`Hapus catatan pesanan ${id}?`)) {
          const all = getOrders();
          const updated = all.filter((o) => o.id !== id);
          saveOrders(updated);
          refreshOverview();
          refreshOrdersList(
            document.getElementById('orderStatusFilter')?.value || 'all',
            document.getElementById('orderSearchInput')?.value || ''
          );
          showToast(`Pesanan ${id} berhasil dihapus`, 'success');
        }
      });
    });
  }

  // Order Form Submit
  const orderForm = document.getElementById('newOrderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const customerName = document.getElementById('orderCustomerName').value.trim();
      const customerPhone = document.getElementById('orderCustomerPhone').value.trim();
      const serviceName = document.getElementById('orderServiceSelect').value;
      const totalPrice = Number(document.getElementById('orderTotalPrice').value) || 0;
      const orderDate = document.getElementById('orderDate').value || new Date().toISOString().split('T')[0];
      const status = document.getElementById('orderStatusSelect').value;
      const notes = document.getElementById('orderNotes').value.trim();

      const newOrder = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        customerName,
        customerPhone,
        serviceName,
        totalPrice,
        orderDate,
        status,
        notes,
      };

      const current = getOrders();
      current.push(newOrder);
      saveOrders(current);

      orderForm.reset();
      // Set today's date
      document.getElementById('orderDate').value = new Date().toISOString().split('T')[0];

      refreshOverview();
      refreshOrdersList();
      showToast(`Pesanan ${newOrder.id} berhasil dicatat!`, 'success');
    });
  }

  // Filter & Search Orders
  const statusFilter = document.getElementById('orderStatusFilter');
  const searchInput = document.getElementById('orderSearchInput');

  if (statusFilter) {
    statusFilter.addEventListener('change', () => {
      refreshOrdersList(statusFilter.value, searchInput?.value || '');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      refreshOrdersList(statusFilter?.value || 'all', searchInput.value);
    });
  }

  // STUDIO SETTINGS MANAGEMENT
  const settingsForm = document.getElementById('studioSettingsForm');
  if (settingsForm) {
    // Populate current settings
    document.getElementById('settingStudioName').value = settings.studioName || '';
    document.getElementById('settingTagline').value = settings.tagline || '';
    document.getElementById('settingWhatsapp').value = settings.whatsappNumber || '';
    document.getElementById('settingAddress').value = settings.address || '';
    document.getElementById('settingHours').value = settings.openingHours || '';
    document.getElementById('settingEmail').value = settings.email || '';
    document.getElementById('settingInstagram').value = settings.instagram || '';
    const tiktokSettingField = document.getElementById('settingTiktok');
    if (tiktokSettingField) tiktokSettingField.value = settings.tiktok || '@sesikreasi.studio';

    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        studioName: document.getElementById('settingStudioName').value.trim(),
        tagline: document.getElementById('settingTagline').value.trim(),
        whatsappNumber: document.getElementById('settingWhatsapp').value.trim(),
        address: document.getElementById('settingAddress').value.trim(),
        openingHours: document.getElementById('settingHours').value.trim(),
        email: document.getElementById('settingEmail').value.trim(),
        instagram: document.getElementById('settingInstagram').value.trim(),
        tiktok: document.getElementById('settingTiktok') ? document.getElementById('settingTiktok').value.trim() : '@sesikreasi.studio',
      };

      saveSettings(updated);
      showToast('Pengaturan studio berhasil disimpan!', 'success');
    });
  }

  // Backup & Restore (JSON Export / Import)
  const exportBtn = document.getElementById('exportDataBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const backupData = {
        settings: getSettings(),
        services: getServices(),
        orders: getOrders(),
        exportedAt: new Date().toISOString(),
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `sesikreasi-backup-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Data berhasil diekspor!', 'success');
    });
  }

  const importInput = document.getElementById('importDataInput');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.settings) saveSettings(parsed.settings);
          if (Array.isArray(parsed.services)) saveServices(parsed.services);
          if (Array.isArray(parsed.orders)) saveOrders(parsed.orders);

          refreshOverview();
          refreshServicesList();
          refreshOrdersList();
          populateServiceOptions();
          showToast('Data berhasil dipulihkan!', 'success');
        } catch (err) {
          showToast('Format file JSON tidak valid.', 'error');
        }
      };
      reader.readAsText(file);
    });
  }

  // Initialize
  populateServiceOptions();
  refreshOverview();
  refreshServicesList();
  refreshOrdersList();

  // Set default date input in order form to today
  const orderDateInput = document.getElementById('orderDate');
  if (orderDateInput && !orderDateInput.value) {
    orderDateInput.value = new Date().toISOString().split('T')[0];
  }
}

// ==========================================================================
// 6. DEDICATED LAYANAN & HARGA PAGE LOGIC (layanan.html)
// ==========================================================================
function initLayananPage() {
  let settings = getSettings();
  let services = getServices();

  function updateLayananContacts(currentSettings) {
    const waNumberClean = currentSettings.whatsappNumber || '6281234567890';
    const defaultWaMsg = 'Halo SESIKREASI, saya ingin konsultasi layanan dan rincian harga.';
    const defaultWaUrl = getCleanWhatsAppUrl(waNumberClean, defaultWaMsg);

    // Update elements with class .dynamic-wa-link
    document.querySelectorAll('.dynamic-wa-link').forEach((link) => {
      link.href = defaultWaUrl;
    });

    // Update WhatsApp displays
    const quickWaNumber = document.getElementById('quickWaNumber');
    if (quickWaNumber) quickWaNumber.textContent = `+${waNumberClean}`;
    const footerWaVal = document.getElementById('footerWaVal');
    if (footerWaVal) footerWaVal.textContent = `+${waNumberClean}`;

    // Update Studio Name & Address
    const brandName = currentSettings.studioName || 'SESIKREASI';
    document.querySelectorAll('.brand-name-dynamic').forEach((el) => {
      el.textContent = brandName;
    });

    // Update Instagram & TikTok links
    const igHandleText = currentSettings.instagram || '@sesikreasi.studio';
    const igUsername = igHandleText.replace(/^@/, '').trim();
    const igUrl = `https://instagram.com/${igUsername}`;

    const footerIgLink = document.getElementById('footerIgLink');
    if (footerIgLink) footerIgLink.href = igUrl;
    const footerIgVal = document.getElementById('footerIgVal');
    if (footerIgVal) footerIgVal.textContent = igHandleText;

    const tiktokHandleText = currentSettings.tiktok || '@sesikreasi.studio';
    const tiktokUsername = tiktokHandleText.replace(/^@/, '').trim();
    const tiktokUrl = `https://tiktok.com/@${tiktokUsername}`;

    const footerTiktokLink = document.getElementById('footerTiktokLink');
    if (footerTiktokLink) footerTiktokLink.href = tiktokUrl;
    const footerTiktokVal = document.getElementById('footerTiktokVal');
    if (footerTiktokVal) footerTiktokVal.textContent = tiktokHandleText;
  }

  // Initial contacts update
  updateLayananContacts(settings);

  // 2. Services Rendering, Filtering & Search
  const container = document.getElementById('layananServicesContainer');
  const noResultBox = document.getElementById('noServiceFound');
  const searchInput = document.getElementById('serviceSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const categoryPills = document.querySelectorAll('.cat-pill');

  let currentCategory = 'all';
  let searchQuery = '';

  function renderFilteredServices() {
    if (!container) return;

    const filtered = services.filter((srv) => {
      const matchCat = currentCategory === 'all' || srv.category === currentCategory;
      if (!matchCat) return false;

      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      const matchName = srv.name.toLowerCase().includes(query);
      const matchDesc = srv.desc.toLowerCase().includes(query);
      const matchFeatures = (srv.features || []).some((f) => f.toLowerCase().includes(query));
      return matchName || matchDesc || matchFeatures;
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
      if (noResultBox) noResultBox.style.display = 'block';
    } else {
      if (noResultBox) noResultBox.style.display = 'none';

      filtered.forEach((srv) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.id = `layanan-${srv.id}`;

        const featuresHtml = (srv.features || [])
          .map(
            (f) => `
            <li class="service-feature-item">
              <span class="service-feature-check">✓</span>
              <span>${f}</span>
            </li>
          `
          )
          .join('');

        const waOrderMsg = `Halo SESIKREASI, saya ingin pesan layanan *${srv.name}* (estimasi ${srv.priceLabel || formatRupiah(srv.price)}). Mohon dibantu rincian proses dan pembayarannya.`;
        const waOrderUrl = getCleanWhatsAppUrl(settings.whatsappNumber, waOrderMsg);

        card.innerHTML = `
          <div class="service-card-header">
            <div class="service-icon-box" aria-hidden="true">${srv.icon || '✨'}</div>
            <div class="service-price-tag">
              <span class="price-prefix">Harga Mulai</span>
              <span class="price-value">${srv.priceLabel || formatRupiah(srv.price)}</span>
            </div>
          </div>
          <div style="margin-bottom: 0.5rem;">
            <span class="badge badge-purple" style="font-size:0.74rem; text-transform:uppercase;">${srv.category || 'Layanan'}</span>
          </div>
          <h3 class="service-card-title">${srv.name}</h3>
          <p class="service-card-desc">${srv.desc}</p>
          <ul class="service-features-list">
            ${featuresHtml}
          </ul>
          <a href="${waOrderUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block" style="margin-top:auto;" id="order-${srv.id}">
            <span>💬 Pesan via WhatsApp</span>
          </a>
        `;

        container.appendChild(card);
      });
    }
  }

  // Initial render
  renderFilteredServices();

  // Category filter click handlers
  categoryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      categoryPills.forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      currentCategory = pill.getAttribute('data-cat') || 'all';
      renderFilteredServices();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
      }
      renderFilteredServices();
    });
  }

  // Clear search button
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      searchInput.focus();
      renderFilteredServices();
    });
  }

  // 3. Interactive Price Estimator
  const estimatorSelect = document.getElementById('estimatorServiceSelect');
  const estimatorQty = document.getElementById('estimatorQuantity');
  const estimatorUnitLabel = document.getElementById('estimatorUnitLabel');
  const estimatorNotes = document.getElementById('estimatorNotes');
  const estimatorTotal = document.getElementById('estimatorTotalPrice');
  const btnSendEstimate = document.getElementById('btnSendEstimatedOrder');

  if (estimatorSelect) {
    estimatorSelect.innerHTML = services
      .map((s) => `<option value="${s.id}">${s.icon || '✨'} ${s.name} (${s.priceLabel || formatRupiah(s.price)})</option>`)
      .join('');

    function updateEstimator() {
      const selectedId = estimatorSelect.value;
      const selectedService = services.find((s) => s.id === selectedId) || services[0];
      const qty = parseInt(estimatorQty?.value || '1', 10) || 1;

      if (estimatorUnitLabel && selectedService) {
        switch (selectedService.category) {
          case 'undangan':
            estimatorUnitLabel.textContent = 'Satuan: pcs / lembar undangan';
            break;
          case 'print':
            estimatorUnitLabel.textContent = 'Satuan: lembar / jilid buku';
            break;
          case 'stiker':
            estimatorUnitLabel.textContent = 'Satuan: lembar A3+ / pcs stiker';
            break;
          case 'desain':
            estimatorUnitLabel.textContent = 'Satuan: paket / konsep desain';
            break;
          case 'foto':
            estimatorUnitLabel.textContent = 'Satuan: lembar cetak foto / bingkai';
            break;
          case 'custom':
            estimatorUnitLabel.textContent = 'Satuan: buku nota / pcs custom';
            break;
          default:
            estimatorUnitLabel.textContent = 'Satuan: pcs / unit';
        }
      }

      if (selectedService && estimatorTotal) {
        const estTotal = (selectedService.price || 0) * qty;
        estimatorTotal.textContent = formatRupiah(estTotal);
      }
    }

    estimatorSelect.addEventListener('change', updateEstimator);
    if (estimatorQty) {
      estimatorQty.addEventListener('input', updateEstimator);
    }

    // Initial update
    updateEstimator();

    const estForm = document.getElementById('priceEstimatorForm');
    if (estForm) {
      estForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (btnSendEstimate) btnSendEstimate.click();
      });
    }

    if (btnSendEstimate) {
      btnSendEstimate.addEventListener('click', () => {
        const selectedId = estimatorSelect.value;
        const selectedService = services.find((s) => s.id === selectedId) || services[0];
        const qty = parseInt(estimatorQty?.value || '1', 10) || 1;
        const notes = estimatorNotes?.value.trim() || '-';
        const estTotal = (selectedService.price || 0) * qty;

        const message = `Halo SESIKREASI, saya ingin order berdasarkan estimasi di website:
• Layanan: *${selectedService.name}*
• Jumlah: ${qty}
• Catatan Spesifikasi: ${notes}
• Perkiraan Biaya: *${formatRupiah(estTotal)}*

Mohon konfirmasi ketersediaan bahan, estimasi waktu pengerjaan, dan panduan pembayarannya. Terima kasih!`;

        const waUrl = getCleanWhatsAppUrl(settings.whatsappNumber, message);
        openWhatsAppSafe(waUrl);
      });
    }
  }

  // 4. Mobile Navigation Setup
  setupMobileNav();

  // 5. Ensure clicking any admin link resets auth session and navigates directly
  document.querySelectorAll('a[href*="admin.html"], .admin-access-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      try {
        sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN);
      } catch (err) {}
      window.location.assign('admin.html');
    });
  });

  // 6. Real-time synchronization when services or settings are updated in Admin Dashboard
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEYS.SERVICES) {
      services = getServices();
      renderFilteredServices();
      if (estimatorSelect) {
        const prevSelectedId = estimatorSelect.value;
        estimatorSelect.innerHTML = services
          .map((s) => `<option value="${s.id}">${s.icon || '✨'} ${s.name} (${s.priceLabel || formatRupiah(s.price)})</option>`)
          .join('');
        if (services.some((s) => s.id === prevSelectedId)) {
          estimatorSelect.value = prevSelectedId;
        }
        updateEstimator();
      }
    }
    if (e.key === STORAGE_KEYS.SETTINGS) {
      settings = getSettings();
      updateLayananContacts(settings);
    }
  });
}

// ==========================================================================
// 7. DOMCONTENTLOADED DISPATCHER
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Check if current page is admin.html, layanan.html, or index.html
  const isAdminPage = document.getElementById('adminApp') !== null;
  const isLayananPage = document.getElementById('layananApp') !== null;

  if (isAdminPage) {
    initAdmin();
  } else if (isLayananPage) {
    initLayananPage();
  } else {
    initFrontend();

    // Close lightbox modal with Escape key or backdrop click
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
      });
      const closeBtn = document.getElementById('lightboxCloseBtn');
      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      const chatbotBox = document.getElementById('chatbotBox');
      if (chatbotBox?.classList.contains('is-open')) {
        chatbotBox.classList.remove('is-open');
      }
      const drawer = document.getElementById('mobileDrawer');
      if (drawer?.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        document.getElementById('navBackdrop')?.classList.remove('is-open');
        document.getElementById('hamburgerBtn')?.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }
  });
});
