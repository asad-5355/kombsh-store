// وظائف خاصة بصفحة التسجيل
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = {
                store: {
                    name: document.getElementById('storeName').value,
                    description: document.getElementById('storeDescription').value,
                    address: document.getElementById('storeAddress').value,
                    logo: document.getElementById('storeLogo').files[0] ? 
                          document.getElementById('storeLogo').files[0].name : null,
                    slug: document.getElementById('storeName').value.replace(/\s+/g, '-').toLowerCase(),
                    currency: document.getElementById('currency').value,
                    language: document.getElementById('language').value,
                    createdAt: new Date().toISOString()
                },
                owner: {
                    name: document.getElementById('ownerName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    password: document.getElementById('password').value
                }
            };
            
            // إرسال طلب التسجيل إلى البريد الإلكتروني
            sendRegistrationEmail(formData);
            
            // حفظ بيانات المتجر (بديل للخادم)
            localStorage.setItem('currentStore', JSON.stringify(formData.store));
            localStorage.setItem('currentOwner', JSON.stringify(formData.owner));
            
            // إنشاء متجر وهمي جديد
            createDemoStore(formData);
            
            // توجيه المستخدم إلى لوحة التحكم
            window.location.href = 'dashboard.html';
        });
    }
});

// إرسال طلب التسجيل إلى البريد الإلكتروني
function sendRegistrationEmail(formData) {
    const subject = 'طلب تسجيل متجر جديد - ' + formData.store.name;
    const body = `
        تفاصيل طلب التسجيل:
        
        معلومات المتجر:
        - الاسم: ${formData.store.name}
        - الوصف: ${formData.store.description}
        - العنوان: ${formData.store.address}
        - العملة: ${formData.store.currency}
        - اللغة: ${formData.store.language}
        
        معلومات المالك:
        - الاسم: ${formData.owner.name}
        - البريد الإلكتروني: ${formData.owner.email}
        - الهاتف: ${formData.owner.phone}
        
        وقت الطلب: ${new Date().toLocaleString()}
    `;
    
    // هذا مثال لإرسال البريد، في التطبيق الحقيقي سيتم استخدام خدمة بريد إلكتروني
    const mailtoLink = `mailto:noorcombsh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
}

// إنشاء متجر وهمي جديد (لأغراض العرض التوضيحي)
function createDemoStore(formData) {
    let stores = JSON.parse(localStorage.getItem('stores')) || [];
    
    const newStore = {
        id: stores.length + 1,
        name: formData.store.name,
        description: formData.store.description,
        image: formData.store.logo || 'https://via.placeholder.com/400x300',
        category: 'مطعم',
        rating: 4.5,
        slug: formData.store.slug,
        owner: formData.owner.name,
        createdAt: new Date().toISOString()
    };
    
    stores.push(newStore);
    localStorage.setItem('stores', JSON.stringify(stores));
}