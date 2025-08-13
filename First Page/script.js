
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

    if (cardsWrapper && prevBtn && nextBtn) {
      // Card width including gap
      const cardWidth = 370; // 350px card + 20px gap
      
      // Update scroll position based on card width
      function updateScrollPosition(direction) {
        const currentScroll = cardsWrapper.scrollLeft;
        const maxScroll = cardsWrapper.scrollWidth - cardsWrapper.clientWidth;
        
        if (direction === 'prev') {
          cardsWrapper.scrollLeft = Math.max(0, currentScroll - cardWidth);
        } else {
          cardsWrapper.scrollLeft = Math.min(maxScroll, currentScroll + cardWidth);
        }
      }
      
      // Update button states
      function updateButtonStates() {
        const currentScroll = cardsWrapper.scrollLeft;
        const maxScroll = cardsWrapper.scrollWidth - cardsWrapper.clientWidth;
        
        // Update previous button
        if (currentScroll <= 5) { // Small tolerance for floating point errors
          prevBtn.disabled = true;
          prevBtn.style.opacity = '0.5';
          prevBtn.style.cursor = 'not-allowed';
        } else {
          prevBtn.disabled = false;
          prevBtn.style.opacity = '1';
          prevBtn.style.cursor = 'pointer';
        }
        
        // Update next button
        if (currentScroll >= maxScroll - 5) { // Small tolerance for floating point errors
          nextBtn.disabled = true;
          nextBtn.style.opacity = '0.5';
          nextBtn.style.cursor = 'not-allowed';
        } else {
          nextBtn.disabled = false;
          nextBtn.style.opacity = '1';
          nextBtn.style.cursor = 'pointer';
        }
      }

      prevBtn.addEventListener('click', () => {
        updateScrollPosition('prev');
      });

      nextBtn.addEventListener('click', () => {
        updateScrollPosition('next');
      });
      
      // Listen for scroll events to update button states
      cardsWrapper.addEventListener('scroll', updateButtonStates);
      
      // Listen for window resize to update button states
      window.addEventListener('resize', () => {
        setTimeout(updateButtonStates, 100);
      });
      
      // Initialize button states on page load
      setTimeout(updateButtonStates, 100);
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
        // Don't prevent default - allow natural scrolling
      });

      cardsWrapper.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        // Update button states after touch scroll
        setTimeout(() => {
          if (cardsWrapper && prevBtn && nextBtn) {
            const currentScroll = cardsWrapper.scrollLeft;
            const maxScroll = cardsWrapper.scrollWidth - cardsWrapper.clientWidth;
            
            prevBtn.disabled = currentScroll <= 5;
            nextBtn.disabled = currentScroll >= maxScroll - 5;
            
            prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
            nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
          }
        }, 100);
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

    // Packages Navigation Event Listeners
    const packagesPrevBtn = document.getElementById('packagesPrev');
    const packagesNextBtn = document.getElementById('packagesNext');

    if (packagesPrevBtn && packagesNextBtn) {
      packagesPrevBtn.addEventListener('click', () => {
        scrollPackages(-1);
      });

      packagesNextBtn.addEventListener('click', () => {
        scrollPackages(1);
      });
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












    // new code

// Animated Text Functionality
document.addEventListener('DOMContentLoaded', function() {
  const animatedText = document.getElementById('animated-text');
  const experiences = [
    'EXPERIENCES',
    'ADVENTURES',
    'MEMORIES',
    'JOURNEYS',
    'DISCOVERIES',
    'MOMENTS'
  ];
  
  let currentIndex = 0;
  
  function changeText() {
    animatedText.classList.add('fade-out');
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % experiences.length;
      animatedText.textContent = experiences[currentIndex];
      animatedText.classList.remove('fade-out');
    }, 500);
  }
  
  // Start the animation
  setInterval(changeText, 2000);
});

// Hero Cards Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const heroCardsWrapper = document.getElementById('heroCardsWrapper');
  
  if (heroCardsWrapper) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let momentum = 0;
    let frame;
    
    // Mouse events for desktop
    heroCardsWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      heroCardsWrapper.style.cursor = 'grabbing';
      startX = e.pageX - heroCardsWrapper.offsetLeft;
      scrollLeft = heroCardsWrapper.scrollLeft;
      velocity = 0;
      cancelAnimationFrame(frame);
    });
    
    heroCardsWrapper.addEventListener('mouseleave', () => {
      isDown = false;
      heroCardsWrapper.style.cursor = 'grab';
      beginMomentum();
    });
    
    heroCardsWrapper.addEventListener('mouseup', () => {
      isDown = false;
      heroCardsWrapper.style.cursor = 'grab';
      beginMomentum();
    });
    
    heroCardsWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - heroCardsWrapper.offsetLeft;
      const walk = (x - startX) * 2;
      const prev = heroCardsWrapper.scrollLeft;
      heroCardsWrapper.scrollLeft = scrollLeft - walk;
      velocity = heroCardsWrapper.scrollLeft - prev;
    });
    
    // Touch events for mobile
    heroCardsWrapper.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - heroCardsWrapper.offsetLeft;
      scrollLeft = heroCardsWrapper.scrollLeft;
      velocity = 0;
      cancelAnimationFrame(frame);
    });
    
    heroCardsWrapper.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - heroCardsWrapper.offsetLeft;
      const walk = (x - startX) * 2;
      const prev = heroCardsWrapper.scrollLeft;
      heroCardsWrapper.scrollLeft = scrollLeft - walk;
      velocity = heroCardsWrapper.scrollLeft - prev;
    });
    
    heroCardsWrapper.addEventListener('touchend', () => {
      isDown = false;
      beginMomentum();
    });
    
    function beginMomentum() {
      momentum = velocity * 0.95;
      
      function momentumLoop() {
        heroCardsWrapper.scrollLeft -= momentum;
        momentum *= 0.95;
        
        if (Math.abs(momentum) > 0.5) {
          frame = requestAnimationFrame(momentumLoop);
        }
      }
      
      if (Math.abs(momentum) > 0.5) {
        frame = requestAnimationFrame(momentumLoop);
      }
    }
    
    // Wheel scrolling support
    heroCardsWrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      heroCardsWrapper.scrollLeft += e.deltaY;
    });
  }
});

// Enhanced Season Carousel Navigation
document.addEventListener('DOMContentLoaded', function() {
  const seasonPrevBtn = document.getElementById('seasonPrev');
  const seasonNextBtn = document.getElementById('seasonNext');
  const tourCarousel = document.getElementById('tourCarousel');
  
  if (seasonPrevBtn && seasonNextBtn && tourCarousel) {
    // Calculate card width dynamically
    function getCardWidth() {
      const firstCard = tourCarousel.querySelector('.season-card');
      if (firstCard) {
        const cardStyle = window.getComputedStyle(firstCard);
        const cardWidth = firstCard.offsetWidth;
        const marginRight = parseInt(cardStyle.marginRight) || 0;
        return cardWidth + marginRight + 20; // Add gap
      }
      return 300; // fallback
    }
    
    // Update scroll position based on card width
    function updateScrollPosition(direction) {
      const cardWidth = getCardWidth();
      const currentScroll = tourCarousel.scrollLeft;
      const maxScroll = tourCarousel.scrollWidth - tourCarousel.clientWidth;
      
      if (direction === 'prev') {
        tourCarousel.scrollLeft = Math.max(0, currentScroll - cardWidth);
      } else {
        tourCarousel.scrollLeft = Math.min(maxScroll, currentScroll + cardWidth);
      }
    }
    
    // Update button states
    function updateButtonStates() {
      const currentScroll = tourCarousel.scrollLeft;
      const maxScroll = tourCarousel.scrollWidth - tourCarousel.clientWidth;
      
      // Update previous button
      if (currentScroll <= 5) { // Small tolerance for floating point errors
        seasonPrevBtn.disabled = true;
        seasonPrevBtn.style.opacity = '0.5';
        seasonPrevBtn.style.cursor = 'not-allowed';
      } else {
        seasonPrevBtn.disabled = false;
        seasonPrevBtn.style.opacity = '1';
        seasonPrevBtn.style.cursor = 'pointer';
      }
      
      // Update next button
      if (currentScroll >= maxScroll - 5) { // Small tolerance for floating point errors
        seasonNextBtn.disabled = true;
        seasonNextBtn.style.opacity = '0.5';
        seasonNextBtn.style.cursor = 'not-allowed';
      } else {
        seasonNextBtn.disabled = false;
        seasonNextBtn.style.opacity = '1';
        seasonNextBtn.style.cursor = 'pointer';
      }
    }
    
    // Event listeners for navigation buttons
    seasonPrevBtn.addEventListener('click', () => {
      updateScrollPosition('prev');
    });
    
    seasonNextBtn.addEventListener('click', () => {
      updateScrollPosition('next');
    });
    
    // Listen for scroll events to update button states
    tourCarousel.addEventListener('scroll', updateButtonStates);
    
    // Listen for window resize to update button states
    window.addEventListener('resize', () => {
      setTimeout(updateButtonStates, 100);
    });
    
    // Enhanced Mobile Touch Support for Season Slider
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let momentum = 0;
    let animationFrame;
    
    // Touch/Mouse start
    function handleStart(e) {
      isDown = true;
      tourCarousel.style.cursor = 'grabbing';
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      startX = clientX - tourCarousel.offsetLeft;
      scrollLeft = tourCarousel.scrollLeft;
      velocity = 0;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    }
    
    // Touch/Mouse move
    function handleMove(e) {
      if (!isDown) return;
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = clientX - tourCarousel.offsetLeft;
      const walk = (x - startX) * 2;
      const prev = tourCarousel.scrollLeft;
      tourCarousel.scrollLeft = scrollLeft - walk;
      velocity = tourCarousel.scrollLeft - prev;
    }
    
    // Touch/Mouse end
    function handleEnd() {
      isDown = false;
      tourCarousel.style.cursor = 'grab';
      beginMomentum();
    }
    
    // Momentum scrolling
    function beginMomentum() {
      momentum = velocity * 0.95;
      
      function momentumLoop() {
        tourCarousel.scrollLeft -= momentum;
        momentum *= 0.95;
        
        if (Math.abs(momentum) > 0.5) {
          animationFrame = requestAnimationFrame(momentumLoop);
        }
      }
      
      if (Math.abs(momentum) > 0.5) {
        animationFrame = requestAnimationFrame(momentumLoop);
      }
    }
    
    // Touch events
    tourCarousel.addEventListener('touchstart', handleStart, { passive: false });
    tourCarousel.addEventListener('touchmove', handleMove, { passive: false });
    tourCarousel.addEventListener('touchend', handleEnd);
    
    // Mouse events for desktop
    tourCarousel.addEventListener('mousedown', handleStart);
    tourCarousel.addEventListener('mousemove', handleMove);
    tourCarousel.addEventListener('mouseup', handleEnd);
    tourCarousel.addEventListener('mouseleave', handleEnd);
    
    // Wheel scrolling support
    tourCarousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      tourCarousel.scrollLeft += e.deltaY;
    });
    
    // Initialize
    tourCarousel.style.cursor = 'grab';
    window.addEventListener('resize', () => {
      setTimeout(updateButtonStates, 100);
    });
    
    // Initialize button states on page load
    setTimeout(updateButtonStates, 100); // Small delay to ensure elements are rendered
  }
}); 

// Hero Cards Bottom Navigation
document.addEventListener("DOMContentLoaded", () => {
  const heroCardsWrapper = document.getElementById("heroCardsWrapper");
  const heroNavLeft = document.getElementById("heroNavLeft");
  const heroNavRight = document.getElementById("heroNavRight");

  if (heroCardsWrapper && heroNavLeft && heroNavRight) {
    const cardWidth = 320; // Card width + gap

    function updateNavButtons() {
      const maxScroll = heroCardsWrapper.scrollWidth - heroCardsWrapper.clientWidth;
      
      // Update left button
      heroNavLeft.disabled = heroCardsWrapper.scrollLeft <= 0;
      
      // Update right button
      heroNavRight.disabled = heroCardsWrapper.scrollLeft >= maxScroll - 1;
    }

    function scrollToPosition(position) {
      heroCardsWrapper.scrollTo({
        left: position,
        behavior: 'smooth'
      });
    }

    // Left arrow click
    heroNavLeft.addEventListener("click", () => {
      const currentPosition = Math.max(0, heroCardsWrapper.scrollLeft - cardWidth);
      scrollToPosition(currentPosition);
    });

    // Right arrow click
    heroNavRight.addEventListener("click", () => {
      const maxScroll = heroCardsWrapper.scrollWidth - heroCardsWrapper.clientWidth;
      const currentPosition = Math.min(maxScroll, heroCardsWrapper.scrollLeft + cardWidth);
      scrollToPosition(currentPosition);
    });

    // Update button states on scroll
    heroCardsWrapper.addEventListener("scroll", updateNavButtons);

    // Update button states on window resize
    window.addEventListener("resize", () => {
      setTimeout(updateNavButtons, 100);
    });

    // Initialize button states
    setTimeout(updateNavButtons, 100);
  }
});

    