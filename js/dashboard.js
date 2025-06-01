// وظائف لوحة التحكم
document.addEventListener('DOMContentLoaded', function() {
    loadStoreData();
    setupProductForm();
    initCharts();
});

// تحميل بيانات المتجر
function loadStoreData() {
    const storeData = JSON.parse(localStorage.getItem('currentStore'));
    const ownerData = JSON.parse(localStorage.getItem('currentOwner'));
    
    if (storeData) {
        // تحديث الشريط الجانبي
        document.getElementById('sidebarStoreName').textContent = storeData.name;
        document.getElementById('sidebarStoreUrl').textContent = `kambsh.com/stores/${storeData.slug}`;
        document.getElementById('sidebarStoreUrl').href = `store.html?store=${storeData.slug}`;
        
        // تحديث شعار المتجر إذا كان موجوداً
        if (storeData.logo) {
            document.getElementById('sidebarStoreLogo').src = URL.createObjectURL(storeData.logo);
        }
    }
    
    if (ownerData) {
        // تحديث معلومات الملف الشخصي
        const userProfile = document.querySelector('.user-profile span');
        if (userProfile) {
            userProfile.textContent = ownerData.name;
        }
    }
}

// إعداد نموذج إضافة المنتج
function setupProductForm() {
    const form = document.getElementById('addProductForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع بيانات المنتج
        const product = {
            id: Date.now(),
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDescription').value,
            category: document.getElementById('productCategory').value,
            image: document.getElementById('productImage').files[0] ? 
                   URL.createObjectURL(document.getElementById('productImage').files[0]) : 
                   'https://via.placeholder.com/150',
            createdAt: new Date().toISOString()
        };
        
        // حفظ المنتج
        saveProduct(product);
        
        // إعادة تعيين النموذج
        form.reset();
        
        // عرض تنبيه بنجاح الإضافة
        showAlert('تم إضافة المنتج بنجاح', 'success');
    });
}

// حفظ المنتج في التخزين المحلي
function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('storeProducts')) || [];
    products.push(product);
    localStorage.setItem('storeProducts', JSON.stringify(products));
    
    // تحديث واجهة المستخدم
    updateProductsList();
}

// تحديث قائمة المنتجات
function updateProductsList() {
    const products = JSON.parse(localStorage.getItem('storeProducts')) || [];
    const tableBody = document.querySelector('#productsTable tbody');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price} ر.س</td>
                <td>${product.category === 'food' ? 'طعام' : 
                     product.category === 'drinks' ? 'مشروبات' : 'حلويات'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1 edit-product" data-id="${product.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-product" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // إضافة مستمعات الأحداث للأزرار
        document.querySelectorAll('.edit-product').forEach(btn => {
            btn.addEventListener('click', function() {
                editProduct(this.dataset.id);
            });
        });
        
        document.querySelectorAll('.delete-product').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteProduct(this.dataset.id);
            });
        });
    }
}

// تحرير منتج
function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem('storeProducts')) || [];
    const product = products.find(p => p.id == productId);
    
    if (product) {
        // تعبئة النموذج ببيانات المنتج
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productCategory').value = product.category;
        
        // عرض تنبيه
        showAlert('يمكنك الآن تعديل المنتج', 'info');
    }
}

// حذف منتج
function deleteProduct(productId) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        let products = JSON.parse(localStorage.getItem('storeProducts')) || [];
        products = products.filter(p => p.id != productId);
        localStorage.setItem('storeProducts', JSON.stringify(products));
        
        // تحديث واجهة المستخدم
        updateProductsList();
        
        // عرض تنبيه
        showAlert('تم حذف المنتج بنجاح', 'success');
    }
}

// عرض تنبيه
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.page-content');
    if (container) {
        container.prepend(alert);
        
        // إخفاء التنبيه تلقائياً بعد 5 ثواني
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 5000);
    }
}

// تهيئة الرسوم البيانية
function initCharts() {
    // رسم بياني للمبيعات
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'المبيعات',
                    data: [12000, 19000, 15000, 18000, 22000, 25000],
                    borderColor: '#4e73df',
                    backgroundColor: 'rgba(78, 115, 223, 0.05)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        rtl: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // رسم بياني للفئات
    const categoriesCtx = document.getElementById('categoriesChart');
    if (categoriesCtx) {
        new Chart(categoriesCtx, {
            type: 'doughnut',
            data: {
                labels: ['طعام', 'مشروبات', 'حلويات'],
                datasets: [{
                    data: [55, 30, 15],
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: true
                    }
                }
            }
        });
    }
}