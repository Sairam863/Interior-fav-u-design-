// Product Data
const products = [
    {
        id: 1,
        name: "Luxury Master Bedroom",
        category: "Bedroom",
        price: 125000,
        location: "Hyderabad",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
        description: "Modern master bedroom with walk-in wardrobe"
    },
    {
        id: 2,
        name: "Modular Kitchen L-Shape",
        category: "Kitchen",
        price: 85000,
        location: "Chennai",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76bbb17b?w=400&h=300&fit=crop",
        description: "Premium L-shaped modular kitchen"
    },
    {
        id: 3,
        name: "Wall Mounted TV Unit",
        category: "TV Unit",
        price: 45000,
        location: "Bangalore",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=300&fit=crop",
        description: "Designer wall mounted TV entertainment unit"
    },
    {
        id: 4,
        name: "Kids Bedroom Design",
        category: "Bedroom",
        price: 95000,
        location: "Hyderabad",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
        description: "Fun and functional kids bedroom"
    },
    {
        id: 5,
        name: "Straight Modular Kitchen",
        category: "Kitchen",
        price: 72000,
        location: "Bangalore",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3133?w=400&h=300&fit=crop",
        description: "Compact straight line kitchen design"
    },
    {
        id: 6,
        name: "Crockery Unit",
        category: "Crockery",
        price: 55000,
        location: "Chennai",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        description: "Elegant crockery and showcase unit"
    },
    {
        id: 7,
        name: "Guest Bedroom",
        category: "Bedroom",
        price: 78000,
        location: "Chennai",
        image: "https://images.unsplash.com/photo-1618221195710-dd2dabb60b29?w=400&h=300&fit=crop",
        description: "Compact guest bedroom design"
    },
    {
        id: 8,
        name: "U-Shaped Kitchen",
        category: "Kitchen",
        price: 110000,
        location: "Hyderabad",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4cb0d?w=400&h=300&fit=crop",
        description: "Spacious U-shaped premium kitchen"
    },
    {
        id: 9,
        name: "Floating TV Unit",
        category: "TV Unit",
        price: 38000,
        location: "Bangalore",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        description: "Modern floating TV console unit"
    },
    {
        id: 10,
        name: "Wardrobe with Study",
        category: "Bedroom",
        price: 98000,
        location: "Bangalore",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
        description: "Multi-functional bedroom with study"
    },
    {
        id: 11,
        name: "Island Kitchen",
        category: "Kitchen",
        price: 165000,
        location: "Hyderabad",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76bbb17b?w=400&h=300&fit=crop",
        description: "Luxury kitchen with center island"
    },
    {
        id: 12,
        name: "Designer TV Wall",
        category: "TV Unit",
        price: 62000,
        location: "Chennai",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=300&fit=crop",
        description: "Feature wall with integrated TV unit"
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const locationFilter = document.getElementById('locationFilter');
const priceFilter = document.getElementById('priceFilter');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    initSlider();
    initMobileMenu();
    initContactForm();
});

// Render Products
function renderProducts(productList) {
    productsGrid.innerHTML = '';
    
    if (productList.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h2>No products found</h2>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    productList.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openContactModal(product);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">₹${product.price.toLocaleString()}</div>
            <div class="product-location">
                <i class="fas fa-map-marker-alt"></i> ${product.location}
            </div>
            <button class="product-btn">Get Quote</button>
        </div>
    `;
    
    return card;
}

// Search Functionality
function searchProducts() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

// Filter Products
function filterProducts() {
    let filtered = [...products];
    
    // Location filter
    const location = locationFilter.value;
    if (location) {
        filtered = filtered.filter(p => p.location === location);
    }
    
    // Price filter
    const priceRange = priceFilter.value;
    if (priceRange) {
        if (priceRange === '0-50000') {
            filtered = filtered.filter(p => p.price <= 50000);
        } else if (priceRange === '50000-100000') {
            filtered = filtered.filter(p => p.price > 50000 && p.price <= 100000);
        } else if (priceRange === '100000+') {
            filtered = filtered.filter(p => p.price > 100000);
        }
    }
    
    renderProducts(filtered);
}

// Clear Filters
function clearFilters() {
    searchInput.value = '';
    locationFilter.value = '';
    priceFilter.value = '';
    renderProducts(products);
}

// Search on Enter
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function initSlider() {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Contact Modal
function openContactModal(product = null) {
    const modal = document.getElementById('contactModal');
    const form = document.getElementById('contactForm');
    
    if (product) {
        form.innerHTML = `
            <input type="text" placeholder="Your Name" required>
            <input type="tel" placeholder="Phone Number" required>
            <input type="email" placeholder="Email Address" required>
            <input type="hidden" id="productName" value="${product.name}">
            <textarea placeholder="Interested in: ${product.name} (${product.category})\nPrice: ₹${product.price.toLocaleString()}\nLocation: ${product.location}\n\nPlease share your requirements..." rows="6" required></textarea>
            <button type="submit">Get Quote for ${product.name}</button>
        `;
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Contact Form
function initContactForm() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            alert('Thank you! Our team will contact you within 24 hours.');
            closeModal();
            button.textContent = originalText;
            button.disabled = false;
            this.reset();
        }, 2000);
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
