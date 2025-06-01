// وظائف عامة للموقع

// تحميل المتاجر النشطة
document.addEventListener('DOMContentLoaded', function() {
    loadActiveStores();
    setupMobileMenu();
    setupRegisterSteps();
});

// تحميل المتاجر النشطة
function loadActiveStores() {
    const storesContainer = document.getElementById('stores-container');
    if (!storesContainer) return;

    // بيانات وهمية للمتاجر (في التطبيق الحقيقي سيتم جلبها من قاعدة البيانات)
    const stores = [
        {
            id: 1,
            name: "مطعم اللذة الشرقية",
            description: "أجمل الأطباق الشرقية بأيدي خبراء الطهي",
            image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            category: "شرقي",
            rating: 4.5
        },
        {
            id: 2,
            name: "بيتزا فرنال",
            description: "أشهى أنواع البيتزا والمعجنات الإيطالية",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            category: "إيطالي",
            rating: 4.2
        },
        {
            id: 3,
            name: "مشاوي السلطان",
            description: "أفضل أنواع المشويات واللحوم الطازجة",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            category: "مشويات",
            rating: 4.8
        },
        {
            id: 4,
            name: "كافيه ريمارك",
            description: "أجواء هادئة مع أفضل المشروبات الساخنة والباردة",
            image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            category: "مقاهي",
            rating: 4.3
        }
    ];

    stores.forEach(store => {
        const col = document.createElement('div');
        col.className = 'col-md-3 mb-4';
        col.innerHTML = `
            <div class="store-card">
                <div class="store-image">
                    <img src="${store.image}" alt="${store.name}" class="img-fluid">
                    <div class="store-rating">
                        <i class="fas fa-star"></i> ${store.rating}
                    </div>
                </div>
                <div class="store-info">
                    <h5>${store.name}</h5>
                    <p class="text-muted">${store.description}</p>
                    <a href="store.html?id=${store.id}" class="btn btn-sm btn-outline-primary">زيارة المتجر</a>
                </div>
            </div>
        `;
        storesContainer.appendChild(col);
    });
}

// إعداد القائمة للجوال
function setupMobileMenu() {
    const toggleBtns = document.querySelectorAll('.sidebar-toggle');
    if (toggleBtns.length > 0) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelector('.dashboard-sidebar').classList.toggle('show');
            });
        });
    }
}

// إعداد خطوات التسجيل
function setupRegisterSteps() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    const steps = form.querySelectorAll('.step-content');
    const stepIndicators = form.querySelectorAll('.step');
    const nextButtons = form.querySelectorAll('.next-step');
    const prevButtons = form.querySelectorAll('.prev-step');

    let currentStep = 1;

    // التالي
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        });
    });

    // السابق
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            showStep(currentStep - 1);
        });
    });

    // التحقق من صحة الخطوة
    function validateStep(step) {
        let isValid = true;
        
        if (step === 1) {
            const requiredFields = form.querySelectorAll('[data-step="1"] [required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
        }
        
        if (step === 2) {
            const storeAddress = document.getElementById('storeAddress');
            if (!storeAddress.value.trim()) {
                storeAddress.classList.add('is-invalid');
                isValid = false;
            } else {
                storeAddress.classList.remove('is-invalid');
            }
        }
        
        return isValid;
    }

    // عرض الخطوة المحددة
    function showStep(step) {
        // إخفاء جميع الخطوات
        steps.forEach(s => s.classList.remove('active'));
        stepIndicators.forEach(i => i.classList.remove('active'));
        
        // عرض الخطوة الحالية
        const currentStepElement = form.querySelector(`.step-content[data-step="${step}"]`);
        const currentIndicator = form.querySelector(`.step[data-step="${step}"]`);
        
        if (currentStepElement && currentIndicator) {
            currentStepElement.classList.add('active');
            currentIndicator.classList.add('active');
            currentStep = step;
            
            // في الخطوة الأخيرة، تعبئة البيانات
            if (step === 3) {
                fillFinalData();
            }
        }
    }

    // تعبئة البيانات النهائية
    function fillFinalData() {
        document.getElementById('finalStoreName').textContent = document.getElementById('storeName').value;
        document.getElementById('finalStoreEmail').textContent = document.getElementById('email').value;
        
        // إنشاء رابط المتجر
        const storeName = document.getElementById('storeName').value;
        const storeSlug = storeName.replace(/\s+/g, '-').toLowerCase();
        document.getElementById('storeSlug').textContent = storeSlug;
    }

    // معالجة رفع صورة الشعار
    const logoInput = document.getElementById('storeLogo');
    if (logoInput) {
        logoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.getElementById('logoPreview');
                    preview.src = event.target.result;
                    document.querySelector('.logo-upload-label').classList.add('d-none');
                    document.querySelector('.logo-preview').classList.remove('d-none');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // إزالة صورة الشعار
    const removeLogoBtn = document.querySelector('.remove-logo');
    if (removeLogoBtn) {
        removeLogoBtn.addEventListener('click', function() {
            document.getElementById('storeLogo').value = '';
            document.querySelector('.logo-upload-label').classList.remove('d-none');
            document.querySelector('.logo-preview').classList.add('d-none');
        });
    }
}