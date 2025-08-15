
// navigation bar 
// Add this JavaScript code to your existing <script> section

// Sidebar functionality
document.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.getElementById("sidebarToggle")
    const sidebarToggle2 = document.getElementById("sidebarToggle2")
    const sidebarClose = document.getElementById("sidebarClose")
    const sidebar = document.getElementById("sidebar")
    const sidebarOverlay = document.getElementById("sidebarOverlay")
    const body = document.body

    // Open sidebar
    function openSidebar() {
        sidebar.classList.add("active")
        sidebarOverlay.classList.add("active")
        body.classList.add("sidebar-open")
    }

    // Close sidebar
    function closeSidebar() {
        sidebar.classList.remove("active")
        sidebarOverlay.classList.remove("active")
        body.classList.remove("sidebar-open")
    }

    // Event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", openSidebar)
    }
    if (sidebarToggle2) {
        sidebarToggle2.addEventListener("click", openSidebar)
    }

    if (sidebarClose) {
        sidebarClose.addEventListener("click", closeSidebar)
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar)
    }

    // Close sidebar when clicking on navigation links
    document.querySelectorAll(".sidebar-link").forEach((link) => {
        link.addEventListener("click", function (e) {
            // Only close if it's an anchor link (starts with #)
            if (this.getAttribute("href").startsWith("#")) {
                closeSidebar()
            }
        })
    })

    // Close sidebar on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sidebar.classList.contains("active")) {
            closeSidebar()
        }
    })

    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 992 && sidebar.classList.contains("active")) {
            closeSidebar()
        }
    })

    // Enhanced touch support for mobile
    let touchStartX = 0
    let touchStartY = 0

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
    })

    document.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX
        const touchEndY = e.changedTouches[0].clientY
        const diffX = touchStartX - touchEndX
        const diffY = touchStartY - touchEndY

        // Swipe right to open sidebar (from left edge)
        if (touchStartX < 50 && diffX < -50 && Math.abs(diffY) < 100) {
            openSidebar()
        }

        // Swipe left to close sidebar
        if (sidebar.classList.contains("active") && diffX > 50 && Math.abs(diffY) < 100) {
            closeSidebar()
        }
    })
})

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.6)';
    }
});
// Loading Animation
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.loading').forEach(el => {
        observer.observe(el);
    });
});

// Travel Blog Navigation
const cardsWrapper = document.getElementById('cardsWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function getCardDimensions() {
    if (!cardsWrapper) return { cardWidth: 370, maxIndex: 0 };
    
    const cards = cardsWrapper.querySelectorAll('.travel-card');
    if (cards.length === 0) return { cardWidth: 370, maxIndex: 0 };
    
    const containerWidth = cardsWrapper.parentElement.offsetWidth;
    const cardElement = cards[0];
    const cardStyle = window.getComputedStyle(cardElement);
    const cardWidth = parseFloat(cardStyle.flexBasis) || cardElement.offsetWidth;
    const gap = 20; // Gap between cards
    
    const cardsPerView = Math.floor(containerWidth / (cardWidth + gap));
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    
    return { 
        cardWidth: cardWidth + gap, 
        maxIndex: maxIndex,
        totalCards: cards.length,
        cardsPerView: cardsPerView
    };
}

function updateCarousel() {
    if (!cardsWrapper) return;
    
    const { cardWidth, maxIndex } = getCardDimensions();
    const translateX = -currentIndex * cardWidth;
    cardsWrapper.style.transform = `translateX(${translateX}px)`;

    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        const { maxIndex } = getCardDimensions();
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const { maxIndex } = getCardDimensions();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Initialize
    updateCarousel();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        const { maxIndex } = getCardDimensions();
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });
}

// Add touch/swipe support for mobile
let startX = 0;
let isDragging = false;

if (cardsWrapper) {
    cardsWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    cardsWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    cardsWrapper.addEventListener('touchend', (e) => {
        if (!isDragging) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const { maxIndex } = getCardDimensions();

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < maxIndex) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateCarousel();
        }

        isDragging = false;
    });
}

// Season Tab Functionality
document.querySelectorAll('.season-tabs a').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all tabs
        document.querySelectorAll('.season-tabs a').forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        this.classList.add('active');

        // Here you can add logic to show different content based on season
        const season = this.getAttribute('data-season');
        console.log('Selected season:', season);
    });
});

// Festival Item Interaction
document.querySelectorAll('.festival-item').forEach(item => {
    item.addEventListener('click', function () {
        // Remove active state from all items
        document.querySelectorAll('.festival-item').forEach(i => {
            i.style.color = '';
            i.innerHTML = i.innerHTML.replace('→ ', '');
        });

        // Add active state to clicked item
        this.style.color = '#ff6b35';
        if (!this.innerHTML.includes('→')) {
            this.innerHTML = '→ ' + this.innerHTML;
        }

        // Update right panel content based on festival
        const festival = this.getAttribute('data-festival');
        updateFestivalContent(festival);
    });
});

function updateFestivalContent(festival) {
    const overlayContent = document.querySelector('.overlay-content');
    const festivalData = {
        holi: {
            title: 'Celebrate Holi in Indian Style',
            location: 'Vrindavan & Mathura, Uttar Pradesh',
            duration: '5 Nights - 6 Days'
        },
        diwali: {
            title: 'Experience Diwali Festival of Lights',
            location: 'Varanasi & Ayodhya, Uttar Pradesh',
            duration: '4 Nights - 5 Days'
        },
        ganesh: {
            title: 'Ganesh Chaturthi Celebrations',
            location: 'Mumbai & Pune, Maharashtra',
            duration: '3 Nights - 4 Days'
        },
        dussehra: {
            title: 'Dussehra Victory Celebrations',
            location: 'Delhi & Mysore, Karnataka',
            duration: '6 Nights - 7 Days'
        },
        krishna: {
            title: 'Krishna Janmashtami Festival',
            location: 'Mathura & Vrindavan, Uttar Pradesh',
            duration: '4 Nights - 5 Days'
        }
    };

    if (festivalData[festival]) {
        const data = festivalData[festival];
        overlayContent.innerHTML = `
                    <h2>${data.title}</h2>
                    <p>${data.location}</p>
                    <span class="badge">${data.duration}</span>
                    <div class="mt-3">
                        <a href="#" class="btn-book">Book Now</a>
                    </div>
                `;
    }
}

// Filter tab functionality
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Here you can add logic to filter packages
        const filter = this.textContent.trim();
        console.log('Selected filter:', filter);
    });
});

// Scroll functionality for packages
function scrollPackages(direction) {
    const container = document.getElementById('packagesContainer');
    if (container) {
        const scrollAmount = 340; // Card width + gap
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Book button functionality
document.querySelectorAll('.btn-orange').forEach(btn => {
    if (btn.textContent.includes('Book Now')) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Booking functionality would be implemented here!');
        });
    }
});

// Circle button functionality
document.querySelector('.circle-btn')?.addEventListener('click', function () {
    alert('Trip planning quiz would be implemented here!');
});

// Learn More button functionality
document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Redirecting to detailed itinerary...');
    });
});

// Newsletter form submission
document.getElementById('newsletterForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const consent = document.getElementById('emailConsent').checked;

    // Enhanced validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !consent) {
        alert('Please fill in all fields and agree to receive emails.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for subscribing! You will receive inspiration in your inbox soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

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

// Pagination dots functionality
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', function () {
        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        this.classList.add('active');

        // Scroll to corresponding section
        const container = document.getElementById('packagesContainer');
        if (container) {
            container.scrollTo({
                left: index * 340,
                behavior: 'smooth'
            });
        }
    });
});

// Update pagination dots on scroll
const packagesContainer = document.getElementById('packagesContainer');
if (packagesContainer) {
    packagesContainer.addEventListener('scroll', function () {
        const scrollLeft = this.scrollLeft;
        const cardWidth = 340;
        const activeIndex = Math.round(scrollLeft / cardWidth);

        document.querySelectorAll('.pagination-dots .dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });
}

// Enhanced carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const carousel = new bootstrap.Carousel('#travelCarousel', {
        interval: 6000,
        wrap: true,
        touch: true,
        pause: 'hover'
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            carousel.prev();
        } else if (e.key === 'ArrowRight') {
            carousel.next();
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.6)';
    }
});

// Share functionality
document.querySelectorAll('.share-icon').forEach(icon => {
    icon.addEventListener('click', function (e) {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: 'Magical India Travels',
                text: 'Check out this amazing travel destination!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
    // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
        this.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Image+Not+Available';
    });
});

// Accessibility improvements
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
});

// Print styles
window.addEventListener('beforeprint', function () {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function () {
    document.body.classList.remove('printing');
});



// Add interactivity for heart icons
document.querySelectorAll('.wt-heart-icon').forEach(heart => {
    heart.addEventListener('click', function () {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#dc3545';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '#6c757d';
        }
    });
});

// Add hover effects for cards
document.querySelectorAll('.wt-tour-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Wildlife Tours Pagination
class WildlifeToursPagination {
    constructor() {
        this.currentPage = 1;
        this.cardsPerPage = 9; // 3x3 grid
        this.totalCards = 82; // Total packages as mentioned
        this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
        this.visibleCards = document.querySelectorAll('.wt-tour-card');
        
        this.init();
    }

    init() {
        this.generateAllCards();
        this.renderPagination();
        this.showPage(1);
        this.attachEventListeners();
    }

    generateAllCards() {
        const container = document.querySelector('.container .row');
        if (!container) return;

        // Get existing cards as templates
        const existingCards = Array.from(container.querySelectorAll('.wt-tour-card'));
        if (existingCards.length === 0) return;

        const templates = existingCards.map(card => card.parentElement.outerHTML);
        
        // Clear container
        container.innerHTML = '';

        // Generate 82 cards using the templates
        for (let i = 0; i < this.totalCards; i++) {
            const templateIndex = i % templates.length;
            const cardHTML = templates[templateIndex];
            
            // Create a temporary div to parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cardHTML;
            const cardElement = tempDiv.firstElementChild;
            
            // Update card content with unique information
            this.updateCardContent(cardElement, i + 1);
            
            container.appendChild(cardElement);
        }

        // Update the reference to all cards
        this.allCards = Array.from(container.children);
    }

    updateCardContent(cardElement, cardNumber) {
        const titleElement = cardElement.querySelector('.wt-tour-title');
        const locationElement = cardElement.querySelector('.wt-tour-location');
        const durationElement = cardElement.querySelector('.wt-duration-badge');
        
        if (titleElement) {
            const titles = [
                'Best of India Wildlife Tour',
                'Tadoba National Park Adventure',
                'Corbett Tiger Safari',
                'Kaziranga Wildlife Experience',
                'Ranthambore Tiger Trail',
                'Bandhavgarh Forest Safari',
                'Kanha National Park Tour',
                'Sundarbans Wildlife Cruise',
                'Gir Lion Safari Gujarat'
            ];
            titleElement.textContent = titles[(cardNumber - 1) % titles.length] + ` #${cardNumber}`;
        }

        if (locationElement) {
            const locations = [
                'DELHI, AGRA, JAIPUR',
                'MUMBAI, NAGPUR, TADOBA',
                'DELHI, CORBETT, HARIDWAR',
                'GUWAHATI, KAZIRANGA, JORHAT',
                'JAIPUR, RANTHAMBORE, BHARATPUR',
                'JABALPUR, BANDHAVGARH, KHAJURAHO',
                'NAGPUR, KANHA, JABALPUR',
                'KOLKATA, SUNDARBANS, KOLKATA',
                'RAJKOT, GIR, SOMNATH'
            ];
            locationElement.textContent = locations[(cardNumber - 1) % locations.length];
        }

        if (durationElement) {
            const durations = ['3 Nights - 4 Days', '5 Nights - 6 Days', '11 Nights - 12 Days'];
            durationElement.textContent = durations[(cardNumber - 1) % durations.length];
        }
    }

    showPage(page) {
        this.currentPage = page;
        const startIndex = (page - 1) * this.cardsPerPage;
        const endIndex = startIndex + this.cardsPerPage;

        // Hide all cards
        this.allCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
                // Add animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                card.style.display = 'none';
            }
        });

        this.updatePaginationState();
        this.scrollToTop();
    }

    renderPagination() {
        const paginationContainer = document.querySelector('.wt-pagination-container ul');
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = 'page-item';
        prevLi.innerHTML = `
            <a class="page-link" href="#" aria-label="Previous" data-page="prev">
                <i class="fas fa-chevron-left"></i>
            </a>
        `;
        paginationContainer.appendChild(prevLi);

        // Page numbers
        const maxVisiblePages = 7;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Add first page and ellipsis if needed
        if (startPage > 1) {
            this.addPageButton(paginationContainer, 1);
            if (startPage > 2) {
                this.addEllipsis(paginationContainer);
            }
        }

        // Add visible page numbers
        for (let i = startPage; i <= endPage; i++) {
            this.addPageButton(paginationContainer, i);
        }

        // Add ellipsis and last page if needed
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                this.addEllipsis(paginationContainer);
            }
            this.addPageButton(paginationContainer, this.totalPages);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = 'page-item';
        nextLi.innerHTML = `
            <a class="page-link" href="#" aria-label="Next" data-page="next">
                <i class="fas fa-chevron-right"></i>
            </a>
        `;
        paginationContainer.appendChild(nextLi);
    }

    addPageButton(container, pageNumber) {
        const li = document.createElement('li');
        li.className = 'page-item';
        li.innerHTML = `<a class="page-link" href="#" data-page="${pageNumber}">${pageNumber}</a>`;
        container.appendChild(li);
    }

    addEllipsis(container) {
        const li = document.createElement('li');
        li.className = 'page-item disabled';
        li.innerHTML = `<span class="page-link">...</span>`;
        container.appendChild(li);
    }

    updatePaginationState() {
        const pageItems = document.querySelectorAll('.wt-pagination-container .page-item');
        
        pageItems.forEach(item => {
            const link = item.querySelector('.page-link');
            const page = link.getAttribute('data-page');
            
            // Remove active class
            item.classList.remove('active');
            
            // Add active class to current page
            if (parseInt(page) === this.currentPage) {
                item.classList.add('active');
            }
            
            // Disable/enable prev/next buttons
            if (page === 'prev') {
                item.classList.toggle('disabled', this.currentPage === 1);
            }
            if (page === 'next') {
                item.classList.toggle('disabled', this.currentPage === this.totalPages);
            }
        });
    }

    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.wt-pagination-container .page-link')) {
                e.preventDefault();
                const link = e.target.closest('.page-link');
                const page = link.getAttribute('data-page');
                
                if (page === 'prev' && this.currentPage > 1) {
                    this.showPage(this.currentPage - 1);
                } else if (page === 'next' && this.currentPage < this.totalPages) {
                    this.showPage(this.currentPage + 1);
                } else if (!isNaN(parseInt(page))) {
                    this.showPage(parseInt(page));
                }
                
                this.renderPagination();
            }
        });
    }

    scrollToTop() {
        const packageSection = document.querySelector('.wt-header-section');
        if (packageSection) {
            packageSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize pagination when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for all content to load
    setTimeout(() => {
        new WildlifeToursPagination();
    }, 100);
});


  function navigateDestinationsCarousel(direction) {
            // Add scroll functionality here if needed
            console.log('Navigating carousel ' + direction);
            
            // Example: Add animation or carousel functionality
            const gridContainer = document.querySelector('#destinations-grid-container');
            if (direction === 'left') {
                // Implement left scroll logic
                gridContainer.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    gridContainer.style.transform = 'translateX(0)';
                }, 200);
            } else {
                // Implement right scroll logic
                gridContainer.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    gridContainer.style.transform = 'translateX(0)';
                }, 200);
            }
        }
        
        // Add click handlers for destination cards
        document.querySelectorAll('.travel-location-card').forEach(card => {
            card.addEventListener('click', function() {
                const destinationName = this.querySelector('.location-name-badge').textContent;
                console.log('Clicked on destination: ' + destinationName);
                // Add navigation logic here
            });
        });



         // Festival Item Interaction
    document.querySelectorAll('.festival-item').forEach(item => {
      item.addEventListener('click', function () {
        // Remove active state from all items
        document.querySelectorAll('.festival-item').forEach(i => {
          i.classList.remove('active');
          // Remove inline styles to let CSS take control
          i.style.color = '';
          i.style.fontSize = '';
          i.style.fontWeight = '';
          // Reset content to original text
          i.innerHTML = i.innerHTML.replace('→ ', '');
        });

        // Add active state to clicked item (CSS will handle styling)
        this.classList.add('active');
        // Add arrow indicator
        if (!this.innerHTML.includes('→')) {
          this.innerHTML = '→ ' + this.innerHTML;
        }

        // Update right panel content and background based on festival
        const festival = this.getAttribute('data-festival');
        updateFestivalContent(festival);
      });
    });

    function updateFestivalContent(festival) {
      const overlayContent = document.querySelector('.overlay-content');
      const rightPanel = document.querySelector('.right-panel');
      
      const festivalData = {
        holi: {
          title: 'Celebrate Holi in Indian Style',
          location: 'Vrindavan & Mathura, Uttar Pradesh',
          duration: '5 Nights - 6 Days',
          image: '/Image/holi.png',
          description: 'Experience the vibrant colors of Holi in the birthplace of Lord Krishna. Join the festivities with locals and immerse yourself in this joyous celebration.'
        },
        diwali: {
          title: 'Experience Diwali Festival of Lights',
          location: 'Varanasi & Ayodhya, Uttar Pradesh',
          duration: '4 Nights - 5 Days',
          image: '/Image/tajmahal.png',
          description: 'Witness the spiritual celebration of Diwali in the holy city of Varanasi. Experience the divine light festival with Ganga Aarti and traditional ceremonies.'
        },
        ganesh: {
          title: 'Ganesh Chaturthi Celebrations',
          location: 'Mumbai & Pune, Maharashtra',
          duration: '3 Nights - 4 Days',
          image: '/Image/Indian city buildings scene.png',
          description: 'Join the grand Ganesh Chaturthi celebrations in Mumbai. Witness the spectacular processions and immersion ceremonies of Lord Ganesha.'
        },
        dussehra: {
          title: 'Dussehra Victory Celebrations',
          location: 'Delhi & Mysore, Karnataka',
          duration: '6 Nights - 7 Days',
          image: '/Image/beautiful-view-isa-khan-s-tomb-new-india-sunny-day 1.png',
          description: 'Celebrate the victory of good over evil during Dussehra. Experience the magnificent Mysore Dasara and witness the burning of Ravana effigies in Delhi.'
        },
        krishna: {
          title: 'Krishna Janmashtami Festival',
          location: 'Mathura & Vrindavan, Uttar Pradesh',
          duration: '4 Nights - 5 Days',
          image: '/Image/kerla (1).jpg',
          description: 'Celebrate Lord Krishna\'s birth in his sacred birthplace. Experience the midnight celebrations and traditional dance performances.'
        }
      };

      if (festivalData[festival]) {
        const data = festivalData[festival];
        
        // Update background image with smooth transition
        rightPanel.style.transition = 'background-image 0.5s ease-in-out';
        rightPanel.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${data.image}")`;
        
        // Update content with fade effect
        overlayContent.style.opacity = '0';
        setTimeout(() => {
          overlayContent.innerHTML = `
            <h2 class="loading">${data.title}</h2>
            <p>${data.location}</p>
            <p class="festival-description mb-3">${data.description}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="badge">${data.duration}</span>
              <a href="#" class="btn-book">Book Now</a>
            </div>
          `;
          overlayContent.style.opacity = '1';
        }, 250);
      }
    }

    // Initialize first festival as active
    const firstFestival = document.querySelector('.festival-item[data-festival="holi"]');
    if (firstFestival) {
      firstFestival.classList.add('active');
      // Let CSS handle the styling, just add the arrow
      if (!firstFestival.innerHTML.includes('→')) {
        firstFestival.innerHTML = '→ ' + firstFestival.innerHTML;
      }
    }


    // Galary Sectinn
     function openAdventurePhotoModal(element) {
            const img = element.querySelector('img');
            const modalOverlay = document.getElementById('adventurePhotoModalOverlay');
            const modalImage = document.getElementById('adventurePhotoModalImage');
            
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalOverlay.style.display = 'block';
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            
            // Prevent event bubbling
            event.stopPropagation();
        }
        
        function closeAdventurePhotoModal() {
            const modalOverlay = document.getElementById('adventurePhotoModalOverlay');
            modalOverlay.style.display = 'none';
            
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeAdventurePhotoModal();
            }
        });
        
        // Add smooth loading animation for adventure tiles
        document.addEventListener('DOMContentLoaded', function() {
            const adventureTiles = document.querySelectorAll('.adventure-image-tile');
            
            adventureTiles.forEach((tile, index) => {
                tile.style.opacity = '0';
                tile.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    tile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    tile.style.opacity = '1';
                    tile.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });