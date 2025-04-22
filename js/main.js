document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const setupMobileNav = () => {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Create mobile nav elements if they don't exist already
    if (!document.querySelector('.mobile-nav-toggle')) {
      const navToggle = document.createElement('button');
      navToggle.className = 'mobile-nav-toggle';
      navToggle.innerHTML = '<span></span><span></span><span></span>';
      navToggle.setAttribute('aria-label', 'Toggle navigation');
      
      const headerContainer = document.querySelector('.header-container');
      headerContainer.appendChild(navToggle);
      
      // Add the mobile navigation toggle functionality
      navToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          this.classList.remove('active');
        } else {
          nav.classList.add('active');
          this.classList.add('active');
        }
      });
    }
  };
  
  // Add active class to current page in navigation
  const highlightCurrentPage = () => {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentLocation.split('/').pop() || 
          (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };
  
  // Smooth scrolling for anchor links
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  // Add animation to timeline items when they enter the viewport
  const setupScrollAnimations = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      timelineItems.forEach(item => {
        observer.observe(item);
      });
    }
  };
  
  // Form submission handling
  const setupContactForm = () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // Here you would normally send the data to a server
      // For demo purposes, we'll just log it and show a success message
      console.log('Form submission:', formDataObj);
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'alert alert-success';
      successMessage.textContent = 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.';
      
      contactForm.innerHTML = '';
      contactForm.appendChild(successMessage);
    });
  };
  
  // Initialize all functions
  setupMobileNav();
  highlightCurrentPage();
  setupSmoothScroll();
  setupScrollAnimations();
  setupContactForm();
  
  // Add additional styling for mobile navigation
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .header-container {
        position: relative;
      }
      
      .mobile-nav-toggle {
        display: block;
        position: absolute;
        right: 20px;
        top: 20px;
        background: none;
        border: none;
        padding: 10px;
        cursor: pointer;
        z-index: 1000;
      }
      
      .mobile-nav-toggle span {
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px 0;
        background-color: #333;
        transition: transform 0.3s, opacity 0.3s;
      }
      
      .mobile-nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .mobile-nav-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -8px);
      }
      
      nav {
        display: none;
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        z-index: 100;
      }
      
      nav.active {
        display: block;
      }
      
      nav ul {
        flex-direction: column;
        padding: 10px;
      }
      
      nav ul li {
        margin: 10px 0;
        width: 100%;
        text-align: center;
      }
      
      nav ul li a {
        display: block;
        padding: 10px;
      }
    }
    
    @media (min-width: 769px) {
      .mobile-nav-toggle {
        display: none;
      }
      
      nav {
        display: block !important;
      }
    }
  `;
  document.head.appendChild(style);
});