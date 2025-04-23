/**
 * fade-effect.js
 * Auto fade away effect for sections on the index page
 * This script should be loaded after main.js
 */

document.addEventListener("DOMContentLoaded", function () {  
  // Setup auto fade away effect based on mouse position
  const setupAutoFadeAwayEffect = () => {
    // Target sections to apply fade effect
    const sectionsToFade = [
      document.getElementById('featured-experience'),
      document.getElementById('skills-highlight')
    ];
    
    // Filter out null values (in case sections don't exist)
    const validSections = sectionsToFade.filter(section => section !== null);
    
    if (validSections.length === 0) return;
    
    // Prepare sections for fade effect
    validSections.forEach(section => {
      // Add fade-section class
      section.classList.add('fade-section');
      
      // Create bottom content container that will fade away
      const sectionContent = section.querySelector('.container');
      
      // Add a wrapper for the header part that should always remain visible
      const headerWrapper = document.createElement('div');
      headerWrapper.className = 'section-header-wrapper';
      
      // Get the section title element
      const sectionTitle = section.querySelector('.section-title');
      
      // Create bottom content wrapper that will fade away
      const bottomContentWrapper = document.createElement('div');
      bottomContentWrapper.className = 'section-bottom-content';
      
      // Move all content except the section title into the bottom content wrapper
      if (sectionContent && sectionTitle) {
        // First, get all child elements of the container
        const contentElements = Array.from(sectionContent.children);
        
        // Add the section title to the header wrapper
        headerWrapper.appendChild(sectionTitle.cloneNode(true));
        
        // Move all other elements to the bottom content wrapper
        contentElements.forEach(element => {
          if (!element.classList.contains('section-title')) {
            bottomContentWrapper.appendChild(element.cloneNode(true));
          }
        });
        
        // Clear the original container
        sectionContent.innerHTML = '';
        
        // Add both wrappers to the container
        sectionContent.appendChild(headerWrapper);
        sectionContent.appendChild(bottomContentWrapper);
        
        // Apply initial fade state
        bottomContentWrapper.classList.add('faded');
      }
      
      // Add mouse events to handle auto fade
      section.addEventListener('mouseenter', () => {
        const bottomContent = section.querySelector('.section-bottom-content');
        if (bottomContent) {
          bottomContent.classList.remove('faded');
        }
      });
      
      section.addEventListener('mouseleave', () => {
        const bottomContent = section.querySelector('.section-bottom-content');
        if (bottomContent) {
          bottomContent.classList.add('faded');
        }
      });
    });
  };

  // Add the necessary styles for the fade effect
  const addFadeEffectStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
      /* Auto fade effect for sections - Only applies to index.html */
      .fade-section {
        position: relative;
        transition: all 0.4s ease;
      }
      
      .section-header-wrapper {
        padding-bottom: 0.5rem;
        position: relative;
        z-index: 2;
      }
      
      .section-bottom-content {
        transition: all 1.5s ease;
        height: auto;
        opacity: 1;
      }
      
      .section-bottom-content.faded {
        opacity: 0.2;
        max-height: 120px; /* Show just a glimpse of the content */
        overflow: hidden;
      }
      
      /* Make sure section title is always visible */
      .fade-section .section-title {
        opacity: 1 !important;
        margin-bottom: 1rem;
      }
      
      /* Add subtle hint that content is interactive */
      .fade-section .section-bottom-content.faded {
        position: relative;
      }
      
      .fade-section .section-bottom-content.faded::after {
        content: 'Hover to view';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(37, 99, 235, 0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        pointer-events: none;
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);
  };

  // Initialize the fade effect
  setupAutoFadeAwayEffect();
  addFadeEffectStyles();
});
