<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم - متاجر كمبش</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="d-flex">
        <!-- الشريط الجانبي -->
        <div class="sidebar bg-primary text-white">
            <div class="sidebar-header p-3 text-center">
                <h4 class="mb-0"><i class="fas fa-store me-2"></i>لوحة التحكم</h4>
            </div>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" href="#">
                        <i class="fas fa-tachometer-alt me-2"></i>الرئيسية
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#products" data-bs-toggle="collapse">
                        <i class="fas fa-boxes me-2"></i>المنتجات
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#orders">
                        <i class="fas fa-shopping-cart me-2"></i>الطلبات
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#settings">
                        <i class="fas fa-cog me-2"></i>الإعدادات
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-sign-out-alt me-2"></i>تسجيل الخروج
                    </a>
                </li>
            </ul>
        </div>

        <!-- المحتوى الرئيسي -->
        <div class="main-content w-100">
            <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                <div class="container-fluid">
                    <button class="btn btn-sm" id="sidebarToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="d-flex align-items-center">
                        <span class="me-3 d-none d-md-block">متجر: <strong id="storeName"></strong></span>
                        <a href="store.html" class="btn btn-sm btn-outline-primary" target="_blank">
                            <i class="fas fa-external-link-alt me-1"></i>عرض المتجر
                        </a>
                    </div>
                </div>
            </nav>

            <div class="container-fluid py-4">
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <h6 class="text-muted">المنتجات</h6>
                                        <h3 id="productsCount">0</h3>
                                    </div>
                                    <div class="icon-circle bg-primary-light text-primary">
                                        <i class="fas fa-box"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <h6 class="text-muted">الطلبات</h6>
                                        <h3 id="ordersCount">0</h3>
                                    </div>
                                    <div class="icon-circle bg-success-light text-success">
                                        <i class="fas fa-shopping-cart"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <h6 class="text-muted">رابط المتجر</h6>
                                        <a href="#" id="storeLink" class="text-decoration-none">...</a>
                                    </div>
                                    <div class="icon-circle bg-info-light text-info">
                                        <i class="fas fa-link"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- قسم إضافة منتج جديد -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-white border-0">
                        <h5 class="mb-0"><i class="fas fa-plus-circle me-2"></i>إضافة منتج جديد</h5>
                    </div>
                    <div class="card-body">
                        <form id="addProductForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="productName" class="form-label">اسم المنتج</label>
                                    <input type="text" class="form-control" id="productName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="productPrice" class="form-label">السعر</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" id="productPrice" required>
                                        <span class="input-group-text" id="currencySymbol">ر.س</span>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="productDescription" class="form-label">الوصف</label>
                                    <textarea class="form-control" id="productDescription" rows="3"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="productCategory" class="form-label">الفئة</label>
                                    <select class="form-select" id="productCategory">
                                        <option value="food">طعام</option>
                                        <option value="drinks">مشروبات</option>
                                        <option value="desserts">حلويات</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="productImage" class="form-label">صورة المنتج</label>
                                    <input type="file" class="form-control" id="productImage" accept="image/*">
                                </div>
                                <div class="col-12 mt-3">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-save me-1"></i>حفظ المنتج
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- قائمة المنتجات -->
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-0">
                        <h5 class="mb-0"><i class="fas fa-boxes me-2"></i>قائمة المنتجات</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>الصورة</th>
                                        <th>الاسم</th>
                                        <th>السعر</th>
                                        <th>الفئة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="productsTable">
                                    <!-- سيتم ملؤها بالمنتجات -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
    <script>
        // تحميل بيانات المتجر
        document.addEventListener('DOMContentLoaded', function() {
            const storeData = JSON.parse(localStorage.getItem('storeData'));
            if (storeData) {
                document.getElementById('storeName').textContent = storeData.name;
                document.getElementById('currencySymbol').textContent = 
                    storeData.currency === 'SAR' ? 'ر.س' : 
                    storeData.currency === 'USD' ? '$' : 
                    storeData.currency === 'EUR' ? '€' : 'د.إ';
                
                // إنشاء رابط المتجر
                const storeSlug = storeData.name.replace(/\s+/g, '-').toLowerCase();
                const storeLink = `${window.location.origin}/store.html?store=${storeSlug}`;
                document.getElementById('storeLink').textContent = storeLink;
                document.getElementById('storeLink').href = storeLink;
            }

            // إضافة منتج جديد
            document.getElementById('addProductForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const product = {
                    id: Date.now(),
                    name: document.getElementById('productName').value,
                    price: document.getElementById('productPrice').value,
                    description: document.getElementById('productDescription').value,
                    category: document.getElementById('productCategory').value,
                    image: document.getElementById('productImage').files[0] ? 
                           URL.createObjectURL(document.getElementById('productImage').files[0]) : 
                           'https://via.placeholder.com/150'
                };
                
                // حفظ المنتج
                let products = JSON.parse(localStorage.getItem('storeProducts')) || [];
                products.push(product);
                localStorage.setItem('storeProducts', JSON.stringify(products));
                
                // تحديث الجدول
                updateProductsTable();
                
                // إعادة تعيين النموذج
                this.reset();
            });
            
            // تحديث جدول المنتجات
            function updateProductsTable() {
                const products = JSON.parse(localStorage.getItem('storeProducts')) || [];
                const tbody = document.getElementById('productsTable');
                tbody.innerHTML = '';
                
                document.getElementById('productsCount').textContent = products.length;
                
                products.forEach(product => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><img src="${product.image}" alt="${product.name}" width="50" height="50" class="rounded"></td>
                        <td>${product.name}</td>
                        <td>${product.price} ${storeData.currency === 'SAR' ? 'ر.س' : 
                                           storeData.currency === 'USD' ? '$' : 
                                           storeData.currency === 'EUR' ? '€' : 'د.إ'}</td>
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
                    tbody.appendChild(tr);
                });
            }
            
            // تحميل المنتجات عند فتح الصفحة
            updateProductsTable();
        });
    </script>
</body>
</html>