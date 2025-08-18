 

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
            
  includeHTML("header-file", "../header/index.html");

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