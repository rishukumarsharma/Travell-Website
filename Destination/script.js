
      class DestinationCarousel {
        constructor() {
          this.currentSlide = 0;
          this.totalSlides = 3;
          this.track = document.getElementById("carouselTrack");
          this.indicators = document.querySelectorAll(".indicator");
          this.prevBtn = document.getElementById("prevBtn");
          this.nextBtn = document.getElementById("nextBtn");
          this.init();
        }

        init() {
          // Add event listeners
          this.prevBtn.addEventListener("click", () => this.prevSlide());
          this.nextBtn.addEventListener("click", () => this.nextSlide());
          this.indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => this.goToSlide(index));
          });
          // Touch/swipe support
          this.addTouchSupport();
          // Auto-play (optional)
          this.startAutoPlay();
        }

        goToSlide(slideIndex) {
          this.currentSlide = slideIndex;
          const translateX = -slideIndex * (100 / this.totalSlides);
          this.track.style.transform = `translateX(${translateX}%)`;
          // Update indicators
          this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === slideIndex);
          });
        }

        nextSlide() {
          this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
          this.goToSlide(this.currentSlide);
        }

        prevSlide() {
          this.currentSlide =
            (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
          this.goToSlide(this.currentSlide);
        }

        addTouchSupport() {
          let startX = 0;
          let currentX = 0;
          let isDragging = false;

          this.track.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
          });

          this.track.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
          });

          this.track.addEventListener("touchend", () => {
            if (!isDragging) return;
            isDragging = false;
            const diffX = startX - currentX;
            const threshold = 50;
            if (Math.abs(diffX) > threshold) {
              if (diffX > 0) {
                this.nextSlide();
              } else {
                this.prevSlide();
              }
            }
          });
        }

        startAutoPlay() {
          setInterval(() => {
            this.nextSlide();
          }, 5000); // Change slide every 5 seconds
        }
      }

      // Kerala card section
      let keralaCurrentSlide = 0;
      const keralaTotalSlides = 5;
      function slideKerala(direction) {
        const slider = document.getElementById("keralaSlider");
        keralaCurrentSlide += direction;
        if (keralaCurrentSlide >= keralaTotalSlides) {
          keralaCurrentSlide = 0;
        } else if (keralaCurrentSlide < 0) {
          keralaCurrentSlide = keralaTotalSlides - 1;
        }
        const translateX = -keralaCurrentSlide * 20; // 20% per slide
        slider.style.transform = `translateX(${translateX}%)`;
      }

      // Auto-slide functionality (optional)
      setInterval(() => {
        slideKerala(1);
      }, 5000);

      // Touch/swipe support for mobile
      let keralaStartX = 0;
      let keralaEndX = 0;
      document
        .querySelector(".kerala-slider-container")
        .addEventListener("touchstart", (e) => {
          keralaStartX = e.touches[0].clientX;
        });
      document
        .querySelector(".kerala-slider-container")
        .addEventListener("touchend", (e) => {
          keralaEndX = e.changedTouches[0].clientX;
          handleKeralaSwipe();
        });

      function handleKeralaSwipe() {
        const swipeThreshold = 50;
        const diff = keralaStartX - keralaEndX;
        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            slideKerala(1); // Swipe left - next slide
          } else {
            slideKerala(-1); // Swipe right - previous slide
          }
        }
      }

      // Destinations Section Carousel - FIXED FUNCTIONALITY
      class DestinationsCarousel {
        constructor() {
          this.currentSlide = 0;
          this.container = document.getElementById("destinationsContainer");
          this.cards = document.querySelectorAll(".destinations-travel-item");
          this.totalCards = this.cards.length;
          this.cardWidth = 0;
          this.gap = 24;
          this.cardsPerView = 1;
          this.maxSlides = 0;

          this.backwardBtn = document.getElementById("destinationsBackward");
          this.forwardBtn = document.getElementById("destinationsForward");
          this.dots = document.querySelectorAll(".destinations-progress-dot");

          this.calculateDimensions();
          this.init();
          this.updateButtons();
        }

        calculateDimensions() {
          if (this.cards.length > 0) {
            const containerWidth = this.container.parentElement.offsetWidth;
            const cardRect = this.cards[0].getBoundingClientRect();
            this.cardWidth = cardRect.width;

            // Calculate cards per view based on container width
            if (window.innerWidth <= 576) {
              this.cardsPerView = 1;
            } else if (window.innerWidth <= 768) {
              this.cardsPerView = 1;
            } else if (window.innerWidth <= 992) {
              this.cardsPerView = 2;
            } else if (window.innerWidth <= 1200) {
              this.cardsPerView = 3;
            } else {
              this.cardsPerView = 3;
            }

            this.maxSlides = Math.max(0, this.totalCards - this.cardsPerView);
          }
        }

        init() {
          // Add event listeners
          this.backwardBtn.addEventListener("click", () => this.prevSlide());
          this.forwardBtn.addEventListener("click", () => this.nextSlide());

          // Dot navigation
          this.dots.forEach((dot, index) => {
            dot.addEventListener("click", () => this.goToSlide(index));
          });

          // Touch/swipe support
          this.addTouchSupport();

          // Resize handler
          window.addEventListener("resize", () => {
            this.calculateDimensions();
            this.currentSlide = Math.min(this.currentSlide, this.maxSlides);
            this.updateSlider();
          });
        }

        goToSlide(slideIndex) {
          this.currentSlide = Math.max(0, Math.min(slideIndex, this.maxSlides));
          this.updateSlider();
        }

        nextSlide() {
          if (this.currentSlide < this.maxSlides) {
            this.currentSlide++;
            this.updateSlider();
          }
        }

        prevSlide() {
          if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlider();
          }
        }

        updateSlider() {
          const translateX = -this.currentSlide * (this.cardWidth + this.gap);
          this.container.style.transform = `translateX(${translateX}px)`;

          // Update dots
          this.dots.forEach((dot, index) => {
            dot.classList.toggle(
              "current",
              index ===
                Math.floor(
                  ((this.currentSlide * this.cardsPerView) / this.totalCards) *
                    this.dots.length
                )
            );
          });

          this.updateButtons();
        }

        updateButtons() {
          // Update button states
          this.backwardBtn.style.opacity =
            this.currentSlide === 0 ? "0.5" : "1";
          this.backwardBtn.style.cursor =
            this.currentSlide === 0 ? "not-allowed" : "pointer";
          this.backwardBtn.disabled = this.currentSlide === 0;

          this.forwardBtn.style.opacity =
            this.currentSlide >= this.maxSlides ? "0.5" : "1";
          this.forwardBtn.style.cursor =
            this.currentSlide >= this.maxSlides ? "not-allowed" : "pointer";
          this.forwardBtn.disabled = this.currentSlide >= this.maxSlides;
        }

        addTouchSupport() {
          let startX = 0;
          let currentX = 0;
          let isDragging = false;

          this.container.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
          });

          this.container.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            e.preventDefault();
          });

          this.container.addEventListener("touchend", () => {
            if (!isDragging) return;
            isDragging = false;
            const diffX = startX - currentX;
            const threshold = 50;

            if (Math.abs(diffX) > threshold) {
              if (diffX > 0) {
                this.nextSlide();
              } else {
                this.prevSlide();
              }
            }
          });
        }
      }

      // Tab functionality for destinations
      document
        .querySelectorAll(".destinations-territory-link")
        .forEach((tab) => {
          tab.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove selected class from all tabs
            document
              .querySelectorAll(".destinations-territory-link")
              .forEach((t) => t.classList.remove("selected"));

            // Add selected class to clicked tab
            this.classList.add("selected");
          });
        });

      // Initialize carousel when DOM is loaded
      document.addEventListener("DOMContentLoaded", () => {
        new DestinationCarousel();
        // Add a small delay to ensure DOM is fully rendered
        setTimeout(() => {
          new DestinationsCarousel();
          new TravelBlogSlider();
        }, 100);
        includeHTML("header-file", "../header/index.html");
        includeHTML("footer-file", "../footer/index.html");
      });

      // Travel Blog Slider Class
      class TravelBlogSlider {
        constructor() {
          this.currentIndex = 0;
          this.cardsWrapper = document.getElementById("cardsWrapper");
          this.prevBtn = document.getElementById("prevBtnBlog");
          this.nextBtn = document.getElementById("nextBtnBlog");

          if (!this.cardsWrapper || !this.prevBtn || !this.nextBtn) {
            console.warn("Travel blog slider elements not found");
            return;
          }

          this.init();
        }

        init() {
          this.updateSlider();
          this.attachEventListeners();
          this.addTouchSupport();

          // Update on window resize
          window.addEventListener("resize", () => {
            this.updateSlider();
          });
        }

        getSliderDimensions() {
          if (!this.cardsWrapper)
            return { cardWidth: 350, maxIndex: 0, cardsPerView: 1 };

          const cards = this.cardsWrapper.querySelectorAll(".travel-card");
          if (cards.length === 0)
            return { cardWidth: 350, maxIndex: 0, cardsPerView: 1 };

          const containerWidth = this.cardsWrapper.parentElement.offsetWidth;
          const cardElement = cards[0];
          const cardStyle = window.getComputedStyle(cardElement);
          const cardWidth =
            parseFloat(cardStyle.flexBasis) || cardElement.offsetWidth;
          const gap = 20;

          let cardsPerView;
          if (window.innerWidth <= 576) {
            cardsPerView = 1;
          } else if (window.innerWidth <= 768) {
            cardsPerView = 1;
          } else if (window.innerWidth <= 992) {
            cardsPerView = 2;
          } else {
            cardsPerView = 3;
          }

          const maxIndex = Math.max(0, cards.length - cardsPerView);

          return {
            cardWidth: cardWidth + gap,
            maxIndex: maxIndex,
            totalCards: cards.length,
            cardsPerView: cardsPerView,
          };
        }

        updateSlider() {
          if (!this.cardsWrapper) return;

          const { cardWidth, maxIndex } = this.getSliderDimensions();

          // Ensure current index is within bounds
          this.currentIndex = Math.min(this.currentIndex, maxIndex);

          const translateX = -this.currentIndex * cardWidth;
          this.cardsWrapper.style.transform = `translateX(${translateX}px)`;

          // Update button states
          if (this.prevBtn && this.nextBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
            this.nextBtn.disabled = this.currentIndex >= maxIndex;

            // Update button opacity
            this.prevBtn.style.opacity = this.currentIndex === 0 ? "0.5" : "1";
            this.nextBtn.style.opacity =
              this.currentIndex >= maxIndex ? "0.5" : "1";
          }
        }

        attachEventListeners() {
          if (this.prevBtn) {
            this.prevBtn.addEventListener("click", () => {
              const { maxIndex } = this.getSliderDimensions();
              if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateSlider();
                this.animateCards();
              }
            });
          }

          if (this.nextBtn) {
            this.nextBtn.addEventListener("click", () => {
              const { maxIndex } = this.getSliderDimensions();
              if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                this.updateSlider();
                this.animateCards();
              }
            });
          }
        }

        animateCards() {
          const cards = this.cardsWrapper.querySelectorAll(".travel-card");
          cards.forEach((card, index) => {
            card.style.transition = "all 0.3s ease";
            card.style.opacity = "0.7";
            card.style.transform = "scale(0.95)";

            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 100 + index * 50);
          });
        }

        addTouchSupport() {
          let startX = 0;
          let isDragging = false;

          if (this.cardsWrapper) {
            this.cardsWrapper.addEventListener("touchstart", (e) => {
              startX = e.touches[0].clientX;
              isDragging = true;
            });

            this.cardsWrapper.addEventListener("touchmove", (e) => {
              if (!isDragging) return;
              e.preventDefault();
            });

            this.cardsWrapper.addEventListener("touchend", (e) => {
              if (!isDragging) return;

              const endX = e.changedTouches[0].clientX;
              const diff = startX - endX;
              const { maxIndex } = this.getSliderDimensions();

              if (Math.abs(diff) > 50) {
                if (diff > 0 && this.currentIndex < maxIndex) {
                  this.currentIndex++;
                } else if (diff < 0 && this.currentIndex > 0) {
                  this.currentIndex--;
                }
                this.updateSlider();
                this.animateCards();
              }

              isDragging = false;
            });
          }
        }
      }

      // Handle enquire buttons
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("enquire-btn")) {
          alert("Enquiry form would open here!");
        }
      });

      // Mobile Menu Toggle Function
      function toggleMobileMenu() {
        const mobileMenu = document.getElementById("mobileMenu");
        const toggleBtn = document.querySelector(".magical-mobile-toggle i");

        mobileMenu.classList.toggle("active");

        if (mobileMenu.classList.contains("active")) {
          toggleBtn.className = "bi bi-x";
        } else {
          toggleBtn.className = "bi bi-list";
        }
      }

      // Close mobile menu when clicking on a link
      document.querySelectorAll(".magical-mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => {
          const mobileMenu = document.getElementById("mobileMenu");
          const toggleBtn = document.querySelector(".magical-mobile-toggle i");

          mobileMenu.classList.remove("active");
          toggleBtn.className = "bi bi-list";
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        const mobileMenu = document.getElementById("mobileMenu");
        const navbar = document.querySelector(".magical-navbar");

        if (
          !navbar.contains(e.target) &&
          mobileMenu.classList.contains("active")
        ) {
          mobileMenu.classList.remove("active");
          document.querySelector(".magical-mobile-toggle i").className =
            "bi bi-list";
        }
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });
   

      document.addEventListener("DOMContentLoaded", () => {
        const sidebarToggle = document.getElementById("sidebarToggle");
        const sidebarToggle2 = document.getElementById("sidebarToggle2");
        const sidebarClose = document.getElementById("sidebarClose");
        const sidebar = document.getElementById("sidebar");
        const sidebarOverlay = document.getElementById("sidebarOverlay");
        const body = document.body;

        // Open sidebar
        function openSidebar() {
          sidebar.classList.add("active");
          sidebarOverlay.classList.add("active");
          body.classList.add("sidebar-open");
        }

        // Close sidebar
        function closeSidebar() {
          sidebar.classList.remove("active");
          sidebarOverlay.classList.remove("active");
          body.classList.remove("sidebar-open");
        }

        // Event listeners
        if (sidebarToggle) {
          sidebarToggle.addEventListener("click", openSidebar);
        }
        if (sidebarToggle2) {
          sidebarToggle2.addEventListener("click", openSidebar);
        }

        if (sidebarClose) {
          sidebarClose.addEventListener("click", closeSidebar);
        }

        if (sidebarOverlay) {
          sidebarOverlay.addEventListener("click", closeSidebar);
        }

        // Close sidebar when clicking on navigation links
        document.querySelectorAll(".sidebar-link").forEach((link) => {
          link.addEventListener("click", function (e) {
            // Only close if it's an anchor link (starts with #)
            if (this.getAttribute("href").startsWith("#")) {
              closeSidebar();
            }
          });
        });

        // Close sidebar on escape key
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && sidebar.classList.contains("active")) {
            closeSidebar();
          }
        });

        // Handle window resize
        window.addEventListener("resize", () => {
          if (
            window.innerWidth >= 992 &&
            sidebar.classList.contains("active")
          ) {
            closeSidebar();
          }
        });

        // Enhanced touch support for mobile
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener("touchstart", (e) => {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        });

        document.addEventListener("touchend", (e) => {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const diffX = touchStartX - touchEndX;
          const diffY = touchStartY - touchEndY;

          // Swipe right to open sidebar (from left edge)
          if (touchStartX < 50 && diffX < -50 && Math.abs(diffY) < 100) {
            openSidebar();
          }

          // Swipe left to close sidebar
          if (
            sidebar.classList.contains("active") &&
            diffX > 50 &&
            Math.abs(diffY) < 100
          ) {
            closeSidebar();
          }
        });
      });

      window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 100) {
          navbar.style.background = "rgba(0, 0, 0, 0.9)";
        } else {
          navbar.style.background = "rgba(0, 0, 0, 0.6)";
        }
      });

      $(".exotic-journey-slider-track").slick({
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 5,
        arrows: true,
        dots: false,
        prevArrow:
          '<button type="button" class="slick-prev carousel-nav prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next carousel-nav next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              centerPadding: "30px",
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              centerPadding: "40px",
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              centerPadding: "20px",
              arrows: false,
            },
          },
        ],
      });
      function includeHTML(id, file) {
  const container = document.getElementById(id);
  if (!container) return;
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (window.initSidebar) window.initSidebar();
    });
}

// Sidebar re-initialization for dynamic header
window.initSidebar = function() {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarToggle2 = document.getElementById("sidebarToggle2");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const body = document.body;
  function openSidebar() {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    body.classList.add("sidebar-open");
  }
  function closeSidebar() {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    body.classList.remove("sidebar-open");
  }
  if (sidebarToggle) sidebarToggle.addEventListener("click", openSidebar);
  if (sidebarToggle2) sidebarToggle2.addEventListener("click", openSidebar);
  if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href") && this.getAttribute("href").startsWith("#")) closeSidebar();
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) closeSidebar();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992 && sidebar.classList.contains("active")) closeSidebar();
  });
}


   
  