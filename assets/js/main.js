document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation toggle
  const setupMobileNav = () => {
    const header = document.querySelector("header");
    if (!header) return;

    // Create mobile nav elements if they don't exist already
    if (!document.querySelector(".mobile-nav-toggle")) {
      const navToggle = document.createElement("button");
      navToggle.className = "mobile-nav-toggle";
      navToggle.innerHTML = "<span></span><span></span><span></span>";
      navToggle.setAttribute("aria-label", "Toggle navigation");

      const headerContainer = document.querySelector(".header-container");
      headerContainer.appendChild(navToggle);

      // Add the mobile navigation toggle functionality
      navToggle.addEventListener("click", function () {
        const nav = document.querySelector("nav");
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          this.classList.remove("active");
        } else {
          nav.classList.add("active");
          this.classList.add("active");
        }
      });
    }
  };

  // Add active class to current page in navigation
  const highlightCurrentPage = () => {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
      if (
        link.getAttribute("href") === currentLocation.split("/").pop() ||
        (currentLocation === "/" && link.getAttribute("href") === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  // Smooth scrolling for anchor links
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      });
    });
  };

  // Add animation to timeline items when they enter the viewport
  const setupScrollAnimations = () => {
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (timelineItems.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      timelineItems.forEach((item) => {
        observer.observe(item);
      });
    }
  };

  // Initialize all functions
  setupMobileNav();
  highlightCurrentPage();
  setupSmoothScroll();
  setupScrollAnimations();
});
