// ========================================
// MIBAR KITCHEN - SCRIPT.JS
// Complete JavaScript Logic for All Pages
// ========================================

// === CONFIGURATION ===
const CONFIG = {
    adminPassphrase: 'mibar',
    deliveryDays: '1-2 hari kerja'
};

const ACCOUNTS = {
    dana: {
        number: '087875110992',
        name: 'Mibar Kitchen'
    },
    mandiri: {
        number: '1610015070274',
        name: 'Mibar Kitchen'
    }
};

// === UTILITY FUNCTIONS ===
const formatRupiah = (number) => {
    return 'Rp' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const generateOrderCode = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `MBK-${timestamp}${random}`.slice(0, 15);
};

const formatDate = (date) => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('id-ID', options);
};

// === LOCAL STORAGE FUNCTIONS ===
const Storage = {
    getCart: () => JSON.parse(localStorage.getItem('mibar_cart') || '[]'),
    setCart: (cart) => localStorage.setItem('mibar_cart', JSON.stringify(cart)),
    getOrders: () => JSON.parse(localStorage.getItem('mibar_orders') || '[]'),
    setOrders: (orders) => localStorage.setItem('mibar_orders', JSON.stringify(orders)),
    clearCart: () => localStorage.removeItem('mibar_cart'),
    isAdminLoggedIn: () => localStorage.getItem('mibar_admin_logged') === 'true',
    setAdminLogin: (status) => localStorage.setItem('mibar_admin_logged', status)
};

// === CART FUNCTIONS ===
const Cart = {
    add: (product) => {
        let cart = Storage.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: parseInt(product.price),
                image: product.image,
                quantity: 1
            });
        }
        
        Storage.setCart(cart);
        Cart.updateCount();
        showNotification('Produk ditambahkan ke keranjang!');
    },
    
    remove: (productId) => {
        let cart = Storage.getCart();
        cart = cart.filter(item => item.id !== productId);
        Storage.setCart(cart);
        Cart.updateCount();
        if (typeof renderCart === 'function') renderCart();
    },
    
    updateQuantity: (productId, quantity) => {
        let cart = Storage.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                Cart.remove(productId);
            } else {
                item.quantity = quantity;
                Storage.setCart(cart);
            }
        }
        
        if (typeof renderCart === 'function') renderCart();
    },
    
    getTotal: () => {
        const cart = Storage.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    getCount: () => {
        const cart = Storage.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    },
    
    updateCount: () => {
        const countElements = document.querySelectorAll('.cart-count');
        const count = Cart.getCount();
        countElements.forEach(el => el.textContent = count);
    }
};

// === NOTIFICATION ===
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// === NAVBAR FUNCTIONS ===
const initNavbar = () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
    
    Cart.updateCount();
};

// === IMAGE SLIDER ===
const initSliders = () => {
    const sliders = document.querySelectorAll('.product-slider');
    
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider-img');
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        let currentIndex = 0;
        let autoSlideInterval;
        
        const showImage = (index) => {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            images[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        };
        
        const nextImage = () => {
            const newIndex = (currentIndex + 1) % images.length;
            showImage(newIndex);
        };
        
        const prevImage = () => {
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(newIndex);
        };
        
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextImage, 3000);
        };
        
        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };
        
        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevImage();
            stopAutoSlide();
            startAutoSlide();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextImage();
            stopAutoSlide();
            startAutoSlide();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showImage(index);
                stopAutoSlide();
                startAutoSlide();
            });
        });
        
        // Start auto-slide
        startAutoSlide();
        
        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    });
};

// === ADD TO CART BUTTONS ===
const initAddToCart = () => {
    const addButtons = document.querySelectorAll('.btn-add-cart, .btn-modal-add');
    
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: btn.dataset.price,
                image: btn.dataset.image
            };
            Cart.add(product);
            
            // Close modal if exists
            const modal = document.getElementById('productModal');
            if (modal && modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
        });
    });
};

// === PRODUCT DETAIL MODAL ===
const initProductModal = () => {
    const modal = document.getElementById('productModal');
    const closeBtn = modal?.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.btn-detail');
    
    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
};


// === CHECKOUT PAGE FUNCTIONS ===
const renderCart = () => {
    const cart = Storage.getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const orderSummary = document.getElementById('orderSummary');
    
    if (cart.length === 0) {
        if (cartItemsContainer) cartItemsContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        if (orderSummary) orderSummary.style.display = 'none';
        return;
    }
    
    if (cartItemsContainer) cartItemsContainer.style.display = 'flex';
    if (emptyCart) emptyCart.style.display = 'none';
    if (orderSummary) orderSummary.style.display = 'block';
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">${formatRupiah(item.price)}</p>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-item" onclick="Cart.remove('${item.id}')" title="Hapus">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    updateOrderSummary();
};

const updateOrderSummary = () => {
    const total = Cart.getTotal();
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('totalPrice');
    
    if (subtotalEl) subtotalEl.textContent = formatRupiah(total);
    if (totalEl) totalEl.textContent = formatRupiah(total);
};

const initCheckout = () => {
    renderCart();
    
    const proceedBtn = document.getElementById('proceedCheckout');
    const checkoutForm = document.getElementById('checkoutForm');
    const cartArea = document.querySelector('.cart-area');
    const orderSummary = document.getElementById('orderSummary');
    const backBtn = document.getElementById('backToCart');
    const orderForm = document.getElementById('orderForm');
    
    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            if (cartArea) cartArea.style.display = 'none';
            if (orderSummary) orderSummary.style.display = 'none';
            if (checkoutForm) checkoutForm.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (cartArea) cartArea.style.display = 'block';
            if (orderSummary) orderSummary.style.display = 'block';
            if (checkoutForm) checkoutForm.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleOrderSubmit();
        });
    }
};

const handleOrderSubmit = () => {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    const cart = Storage.getCart();
    
    const order = {
        code: generateOrderCode(),
        date: new Date().toISOString(),
        customer: {
            name: formData.get('customerName'),
            phone: formData.get('customerPhone'),
            address: formData.get('customerAddress')
        },
        items: cart,
        total: Cart.getTotal(),
        paymentMethod: formData.get('paymentMethod'),
        notes: formData.get('orderNotes') || '',
        status: 'pending'
    };
    
    // Save order
    if (window.Firebase && Firebase.saveOrder) {
        Firebase.saveOrder(order)
            .then((docId) => {
                console.log('Order tersimpan di Firestore dengan ID:', docId);
                showOrderConfirmation(order);
                Storage.clearCart();
                Cart.updateCount();
            })
            .catch((error) => {
                console.error('Gagal menyimpan ke Firestore:', error);
                showNotification('Gagal menyimpan pesanan. Coba lagi nanti.', 'error');
            });
    } else {
        console.error('Firebase belum terload');
        showNotification('Firebase belum siap!', 'error');
    }

};

const showOrderConfirmation = (order) => {
    const checkoutForm = document.getElementById('checkoutForm');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const orderCodeEl = document.getElementById('confirmationOrderCode');
    const paymentDetailsEl = document.getElementById('paymentDetails');
    const confirmationItemsEl = document.getElementById('confirmationItems');
    const confirmationTotalEl = document.getElementById('confirmationTotal');
    
    if (checkoutForm) checkoutForm.style.display = 'none';
    if (orderConfirmation) orderConfirmation.style.display = 'block';
    
    if (orderCodeEl) orderCodeEl.textContent = order.code;
    if (confirmationTotalEl) confirmationTotalEl.textContent = formatRupiah(order.total);
    
    // Payment details
    if (paymentDetailsEl) {
        let paymentHTML = '';
        
        if (order.paymentMethod === 'dana') {
            paymentHTML = `
                <h3>💳 Pembayaran via DANA</h3>
                <div class="payment-info">
                    <strong>Nomor DANA:</strong>
                    <p class="account-number">${ACCOUNTS.dana.number}</p>
                    <p>Atas Nama: <strong>${ACCOUNTS.dana.name}</strong></p>
                </div>
                <p>Silakan transfer sejumlah <strong>${formatRupiah(order.total)}</strong></p>
                <p>Setelah transfer, mohon kirim bukti pembayaran via WhatsApp.</p>
            `;
        } else if (order.paymentMethod === 'mandiri') {
            paymentHTML = `
                <h3>🏦 Pembayaran via MANDIRI</h3>
                <div class="payment-info">
                    <strong>Nomor Rekening:</strong>
                    <p class="account-number">${ACCOUNTS.mandiri.number}</p>
                    <p>Atas Nama: <strong>${ACCOUNTS.mandiri.name}</strong></p>
                </div>
                <p>Silakan transfer sejumlah <strong>${formatRupiah(order.total)}</strong></p>
                <p>Setelah transfer, mohon kirim bukti pembayaran via WhatsApp.</p>
            `;
        } else if (order.paymentMethod === 'cod') {
            paymentHTML = `
                <h3>💵 Cash on Delivery (COD)</h3>
                <p>Pembayaran dilakukan saat produk sampai.</p>
                <p>Total yang harus dibayar: <strong>${formatRupiah(order.total)}</strong></p>
                <p>Estimasi pengiriman: <strong>${CONFIG.deliveryDays}</strong></p>
            `;
        }
        
        paymentDetailsEl.innerHTML = paymentHTML;
    }
    
    // Order items
    if (confirmationItemsEl) {
        confirmationItemsEl.innerHTML = order.items.map(item => `
            <div class="confirmation-item">
                <span>${item.name} x${item.quantity}</span>
                <span>${formatRupiah(item.price * item.quantity)}</span>
            </div>
        `).join('');
    }
    
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// === ADMIN PAGE FUNCTIONS ===
const initAdminLogin = () => {
    const loginForm = document.getElementById('adminLoginForm');
    const adminLogin = document.getElementById('adminLogin');
    const adminDashboard = document.getElementById('adminDashboard');
    const loginError = document.getElementById('loginError');

    
    const logoutBtn = document.getElementById('adminLogout');
    if (logoutBtn) {
        // Remove old listener dengan clone
        const newLogoutBtn = logoutBtn.cloneNode(true);
        logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
        
        // Add new listener
        newLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Yakin ingin logout?')) {
                Storage.setAdminLogin('false');
                // Clear session & reload ke halaman login
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
        });
    }
    
    // Check if already logged in
    if (Storage.isAdminLoggedIn()) {
        if (adminLogin) adminLogin.style.display = 'none';
        if (adminDashboard) adminDashboard.style.display = 'block';
        loadAdminDashboard();
        return;
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const passphrase = document.getElementById('adminPassphrase').value;
            
            if (passphrase === CONFIG.adminPassphrase) {
                Storage.setAdminLogin('true');
                if (adminLogin) adminLogin.style.display = 'none';
                if (adminDashboard) adminDashboard.style.display = 'block';
                loadAdminDashboard();
            } else {
                if (loginError) {
                    loginError.textContent = 'Passphrase salah!';
                    setTimeout(() => loginError.textContent = '', 3000);
                }
            }
        });
    }
    
};

const loadAdminDashboard = async () => {
    if (!window.Firebase || !Firebase.getAllOrders) {
        console.warn("Firebase belum siap");
        return;
    }

    try {
        const orders = await Firebase.getAllOrders();
        
        // Update stats
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const totalRevenue = orders
            .filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + (o.total || 0), 0);
        
        const totalOrdersEl = document.getElementById('totalOrders');
        const pendingOrdersEl = document.getElementById('pendingOrders');
        const totalRevenueEl = document.getElementById('totalRevenue');
        
        if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
        if (pendingOrdersEl) pendingOrdersEl.textContent = pendingOrders;
        if (totalRevenueEl) totalRevenueEl.textContent = formatRupiah(totalRevenue);
        
        // Render table
        renderOrdersTable(orders);
        
        // Setup filter (remove old listener first)
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            const newFilter = statusFilter.cloneNode(true);
            statusFilter.parentNode.replaceChild(newFilter, statusFilter);
            
            newFilter.addEventListener('change', (e) => {
                const status = e.target.value;
                const filtered = status === 'all' ? orders : orders.filter(o => o.status === status);
                renderOrdersTable(filtered);
            });
        }
        
        // Setup refresh button
        const refreshBtn = document.getElementById('refreshOrders');
        if (refreshBtn) {
            const newBtn = refreshBtn.cloneNode(true);
            refreshBtn.parentNode.replaceChild(newBtn, refreshBtn);
            
            newBtn.addEventListener('click', async () => {
                showNotification('Memuat ulang data...');
                await loadAdminDashboard();
                showNotification('Data berhasil diperbarui!');
            });
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showNotification('Gagal memuat data!', 'error');
    }
};

const renderOrdersTable = (orders) => {
    const tbody = document.getElementById('ordersTableBody');
    const noOrders = document.getElementById('noOrders');
    
    if (!orders || orders.length === 0) {
        if (tbody) tbody.innerHTML = '';
        if (noOrders) noOrders.style.display = 'block';
        return;
    }
    
    if (noOrders) noOrders.style.display = 'none';
    
    if (tbody) {
        tbody.innerHTML = orders.map(order => {
            // Handle Firestore timestamp
            let orderDate = '-';
            if (order.date) {
                orderDate = formatDate(order.date);
            } else if (order.createdAt && order.createdAt.toDate) {
                orderDate = formatDate(order.createdAt.toDate());
            } else if (order.createdAt) {
                orderDate = formatDate(order.createdAt);
            }
            
            return `
                <tr>
                    <td><strong>${order.code || order.id || '-'}</strong></td>
                    <td>${orderDate}</td>
                    <td>
                        ${order.customer?.name || '-'}<br>
                        <small>${order.customer?.phone || '-'}</small>
                    </td>
                    <td>${(order.items || []).map(i => `${i.name} (${i.quantity}x)`).join(', ')}</td>
                    <td><strong>${formatRupiah(order.total || 0)}</strong></td>
                    <td>${(order.paymentMethod || 'COD').toUpperCase()}</td>
                    <td><span class="status-badge status-${order.status || 'pending'}">${getStatusLabel(order.status || 'pending')}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-view" onclick="viewOrderDetail('${order.id}')">Lihat</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
};

const getStatusLabel = (status) => {
    const labels = {
        'pending': 'Pending',
        'confirmed': 'Dikonfirmasi',
        'processing': 'Diproses',
        'shipped': 'Dikirim',
        'completed': 'Selesai',
        'cancelled': 'Dibatalkan'
    };
    return labels[status] || status;
};

// 🧩 Fungsi untuk menampilkan detail pesanan di modal
async function viewOrderDetail(orderId) {
    const modal = document.getElementById('orderDetailModal');
    const content = document.getElementById('orderDetailContent');
    
    if (!modal || !content) {
        console.error('Modal atau content element tidak ditemukan');
        return;
    }

    try {
        // Ambil order dari Firebase
        const order = await Firebase.getOrderById(orderId);
        
        if (!order) {
            showNotification('Pesanan tidak ditemukan!', 'error');
            return;
        }

        // Format tanggal dari Firestore timestamp
        let orderDate = '-';
        if (order.date) {
            orderDate = formatDate(order.date);
        } else if (order.createdAt && order.createdAt.toDate) {
            orderDate = formatDate(order.createdAt.toDate());
        }

        content.innerHTML = `
            <div class="order-detail">
                <div class="detail-section">
                    <h3>Informasi Pesanan</h3>
                    <p><strong>Kode Pesanan:</strong> ${order.code || order.id}</p>
                    <p><strong>Tanggal:</strong> ${orderDate}</p>
                    <p><strong>Status:</strong> <span class="status-badge status-${order.status || 'pending'}">${getStatusLabel(order.status || 'pending')}</span></p>
                </div>

                <div class="detail-section">
                    <h3>Informasi Pelanggan</h3>
                    <p><strong>Nama:</strong> ${order.customer?.name || '-'}</p>
                    <p><strong>Telepon:</strong> ${order.customer?.phone || '-'}</p>
                    <p><strong>Alamat:</strong> ${order.customer?.address || '-'}</p>
                </div>

                <div class="detail-section">
                    <h3>Produk</h3>
                    ${(order.items || []).map(item => `
                        <div class="order-item">
                            <p>${item.name} x ${item.quantity}</p>
                            <p><strong>${formatRupiah(item.price * item.quantity)}</strong></p>
                        </div>
                    `).join('')}
                    <div class="order-total">
                        <p><strong>Total:</strong> ${formatRupiah(order.total || 0)}</p>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Pembayaran</h3>
                    <p><strong>Metode:</strong> ${(order.paymentMethod || 'cod').toUpperCase()}</p>
                </div>

                ${order.notes ? `
                    <div class="detail-section">
                        <h3>Catatan</h3>
                        <p>${order.notes}</p>
                    </div>
                ` : ''}

                <div class="detail-actions" style="margin-top: 20px; display: flex; gap: 10px;">
                    <select id="updateStatus" class="filter-select">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Dikonfirmasi</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Diproses</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Dikirim</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Selesai</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Dibatalkan</option>
                    </select>
                    <button class="btn btn-primary" onclick="handleUpdateOrderStatus('${order.id}')">Update Status</button>
                </div>
            </div>
        `;

        modal.classList.add('show');

        // Tombol close
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = () => modal.classList.remove('show');
        }

        // Klik di luar modal untuk tutup
        modal.onclick = (e) => {
            if (e.target === modal) modal.classList.remove('show');
        };

    } catch (err) {
        console.error('Gagal memuat detail order:', err);
        showNotification("Gagal memuat detail pesanan!", "error");
    }
}
async function handleUpdateOrderStatus(orderId) {
    const select = document.getElementById('updateStatus');
    const newStatus = select.value;

    if (!confirm(`Ubah status pesanan menjadi "${newStatus}"?`)) return;

    try {
        await Firebase.updateOrderStatus(orderId, newStatus);
        showNotification('Status berhasil diperbarui!');
        
        const modal = document.getElementById('orderDetailModal');
        if (modal) modal.classList.remove('show');
        
        loadAdminDashboard(); // Refresh dashboard
    } catch (error) {
        console.error("Gagal update status:", error);
        showNotification('Terjadi kesalahan saat mengupdate status!', 'error');
    }
}
// === SMOOTH SCROLL ===
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// === ANIMATION ON SCROLL ===
const initScrollAnimation = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.product-card, .vm-item, .stat-card').forEach(el => {
        observer.observe(el);
    });
};

// === PAGE INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Common functions for all pages
    initNavbar();
    initSmoothScroll();
    
    // Check current page and initialize accordingly
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    if (page === 'index.html' || page === '') {
        // Index page
        initSliders();
        initAddToCart();
        initProductModal();
        // initAdminTrigger();
        initScrollAnimation();
    } else if (page === 'checkout.html') {
        // Checkout page
        initCheckout();
    } else if (page === 'admin.html') {
        // Admin page
        initAdminLogin();
    }
});

// === MAKE FUNCTIONS GLOBAL FOR ONCLICK ATTRIBUTES ===
if (typeof window !== 'undefined') {
    window.Cart = Cart;
}
// === ADD ANIMATION KEYFRAMES ===
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .order-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .order-total {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 2px solid var(--border-color);
        font-size: 1.2rem;
    }
    
    .detail-section {
        margin-bottom: 25px;
        padding: 20px;
        background: var(--cream-light);
        border-radius: 10px;
    }
    
    .detail-section h3 {
        color: var(--saddle-brown);
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px solid var(--cream);
    }
    
    .detail-section p {
        margin: 8px 0;
        color: var(--text-gray);
    }
`;
document.head.appendChild(style);
