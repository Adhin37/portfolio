document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation toggle
  const setupMobileNav = () => {
    const navToggle = document.querySelector(".mobile-nav-toggle");
    const nav = document.querySelector("nav");
    
    if (!navToggle || !nav) return;
    
    // Create overlay if it doesn't exist
    if (!document.querySelector(".nav-overlay")) {
      const overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      document.body.appendChild(overlay);
      
      // Close menu when clicking overlay
      overlay.addEventListener("click", () => {
        nav.classList.remove("active");
        navToggle.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      });
    }
  
    const overlay = document.querySelector(".nav-overlay");
    
    navToggle.addEventListener("click", function() {
      const isActive = nav.classList.contains("active");
      
      nav.classList.toggle("active");
      this.classList.toggle("active");
      overlay.classList.toggle("active");
      
      // Prevent scrolling when menu is open
      document.body.style.overflow = isActive ? "" : "hidden";
    });
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

  // Calcule et met à jour dynamiquement les années d'expérience
  const updateExperienceYears = () => {
    // Date de début de la carrière
    const careerStartDate = new Date(2015, 8, 1);
    const currentDate = new Date();

    const yearsOfExperience = Math.floor(
      (currentDate - careerStartDate) / (365.25 * 24 * 60 * 60 * 1000)
    );

    const experienceElements = document.querySelectorAll(
      ".years-of-experience"
    );

    experienceElements.forEach((element) => {
      element.textContent = yearsOfExperience;
    });

    const experiencePhrases = document.querySelectorAll(".experience-phrase");
    experiencePhrases.forEach((element) => {
      element.innerHTML = element.innerHTML.replace(
        /\d+\s+ans/,
        `${yearsOfExperience} ans`
      );
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
  updateExperienceYears();
});
