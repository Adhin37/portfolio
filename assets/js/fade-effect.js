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

  // Initialize the fade effect
  setupAutoFadeAwayEffect();
});
