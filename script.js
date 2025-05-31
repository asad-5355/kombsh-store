// بيانات المطاعم
const restaurants = [
    {
        id: 1,
        name: "مطعم اللذة الشرقية",
        description: "أجمل الأطباق الشرقية بأيدي خبراء الطهي",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        category: "شرقي"
    },
    {
        id: 2,
        name: "بيتزا فرنال",
        description: "أشهى أنواع البيتزا والمعجنات الإيطالية",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "إيطالي"
    },
    {
        id: 3,
        name: "مشاوي السلطان",
        description: "أفضل أنواع المشويات واللحوم الطازجة",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        category: "مشويات"
    }
];

// بيانات قائمة الطعام
const menuItems = [
    {
        id: 1,
        name: "كباب مشوي",
        description: "قطع لحم ضأن مشوية على الفحم مع خضار مشوي",
        price: 35,
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
        id: 2,
        name: "بيتزا بيبروني",
        description: "بيتزا مع جبنة موزاريلا وبيبروني وصلصة الطماطم",
        price: 45,
        image: "https://images.unsplash.com/photo-1581873372796-635b67ca2008?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
        id: 3,
        name: "سلطة يونانية",
        description: "خضار طازجة مع جبنة فيتا وزيتون وزيت زيتون",
        price: 25,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    }
];

// عرض المطاعم في الصفحة الرئيسية
function displayRestaurants() {
    const restaurantsList = document.getElementById('restaurants-list');
    if (restaurantsList) {
        restaurants.forEach(restaurant => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card restaurant-card">
                    <img src="${restaurant.image}" class="card-img-top restaurant-img" alt="${restaurant.name}">
                    <div class="card-body">
                        <h5 class="card-title">${restaurant.name}</h5>
                        <p class="card-text">${restaurant.description}</p>
                        <a href="store.html?id=${restaurant.id}" class="btn btn-primary">زيارة المتجر</a>
                    </div>
                </div>
            `;
            restaurantsList.appendChild(col);
        });
    }
}

// عرض قائمة الطعام في صفحة المتجر
function displayMenuItems() {
    const menuItemsContainer = document.getElementById('menu-items');
    if (menuItemsContainer) {
        menuItems.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-4 menu-item';
            col.innerHTML = `
                <div class="card h-100">
                    <img src="${item.image}" class="card-img-top menu-item-img" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="text-primary fw-bold">${item.price} ريال</p>
                        <button class="btn btn-outline-primary">إضافة إلى الطلب</button>
                    </div>
                </div>
            `;
            menuItemsContainer.appendChild(col);
        });
    }
}

// معالجة نموذج التسجيل
function handleRegistrationForm() {
    const form = document.getElementById('register-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const restaurantData = {
                name: document.getElementById('restaurant-name').value,
                owner: document.getElementById('owner-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                logo: document.getElementById('logo').files[0] ? document.getElementById('logo').files[0].name : null
            };
            
            // حفظ البيانات في localStorage (بديل مؤقت لقاعدة البيانات)
            localStorage.setItem('currentRestaurant', JSON.stringify(restaurantData));
            
            // توجيه المستخدم إلى صفحة المتجر
            window.location.href = 'store.html?new=true';
        });
    }
}

// تحميل بيانات المتجر
function loadStoreData() {
    const urlParams = new URLSearchParams(window.location.search);
    const isNew = urlParams.get('new');
    
    if (isNew) {
        // متجر جديد
        const restaurantData = JSON.parse(localStorage.getItem('currentRestaurant'));
        
        if (restaurantData) {
            document.getElementById('store-name').textContent = restaurantData.name;
            document.getElementById('hero-title').textContent = `مرحبًا بكم في ${restaurantData.name}`;
            document.getElementById('store-address').textContent = restaurantData.address;
            document.getElementById('store-phone').textContent = restaurantData.phone;
            document.getElementById('store-email').textContent = restaurantData.email;
            
            // إضافة المطعم إلى القائمة
            const newRestaurant = {
                id: restaurants.length + 1,
                name: restaurantData.name,
                description: `مطعم ${restaurantData.name} يقدم أشهى المأكولات`,
                image: restaurantData.logo || "https://via.placeholder.com/600x400",
                category: "متنوع"
            };
            
            restaurants.push(newRestaurant);
        }
    } else {
        // متجر موجود
        const storeId = urlParams.get('id');
        const restaurant = restaurants.find(r => r.id === parseInt(storeId));
        
        if (restaurant) {
            document.getElementById('store-name').textContent = restaurant.name;
            document.getElementById('hero-title').textContent = `مرحبًا بكم في ${restaurant.name}`;
            document.getElementById('hero-subtitle').textContent = restaurant.description;
        }
    }
}

// إضافة العلامة المائية
function addWatermark() {
    if (window.location.pathname.includes('store.html')) {
        const watermark = document.createElement('div');
        watermark.className = 'watermark';
        watermark.innerHTML = '<p>Powered by <strong>متاجر كمبش</strong></p>';
        document.body.appendChild(watermark);
    }
}

// تحديث سنة حقوق النشر
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    displayRestaurants();
    displayMenuItems();
    handleRegistrationForm();
    loadStoreData();
    addWatermark();
    updateCopyrightYear();
});
