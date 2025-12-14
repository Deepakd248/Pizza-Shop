/**
 * Sidebar Toggle Functionality
 * Handles opening and closing the sidebar menu
 * Desktop: Hidden by default, toggle with button
 * Mobile: Toggleable with hamburger menu
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Sidebar script loaded');
  
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarCollapse = document.getElementById('sidebarCollapse');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  if (!sidebar) {
    console.error('Sidebar element not found');
    return;
  }

  if (!sidebarToggle) {
    console.error('Sidebar toggle button not found');
    return;
  }

  console.log('All sidebar elements found:', {
    sidebar,
    sidebarToggle,
    sidebarClose,
    sidebarCollapse,
    sidebarOverlay,
    linksCount: sidebarLinks.length
  });

  // Check if we're on desktop
  const isDesktop = () => window.innerWidth > 1024;

  // Load sidebar visibility state from localStorage
  const isSidebarVisible = localStorage.getItem('sidebarVisible') === 'true';
  const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

  if (isDesktop() && isSidebarVisible) {
    sidebar.classList.add('desktop-visible');
    console.log('Sidebar loaded as visible on desktop from localStorage');
  }

  if (isDesktop() && isSidebarVisible && isCollapsed) {
    sidebar.classList.add('collapsed');
    console.log('Sidebar loaded as collapsed from localStorage');
  }

  // ==========================================
  // Toggle Sidebar Visibility (Desktop)
  // ==========================================
  sidebarToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log('Sidebar toggle clicked');
    
    if (isDesktop()) {
      // On desktop: toggle desktop-visible class
      sidebar.classList.toggle('desktop-visible');
      const isVisible = sidebar.classList.contains('desktop-visible');
      localStorage.setItem('sidebarVisible', isVisible);
      console.log('Desktop: Sidebar visibility toggled:', isVisible);
      
      // Show/hide toggle button indicator
      sidebarToggle.classList.toggle('active', isVisible);
    } else {
      // On mobile: open sidebar as before
      sidebar.classList.add('active');
      if (sidebarOverlay) {
        sidebarOverlay.classList.add('active');
      }
      document.body.style.overflow = 'hidden';
      sidebarToggle.classList.add('active');
      console.log('Mobile: Sidebar opened');
    }
  });

  // ==========================================
  // Collapse/Expand Sidebar Button (Desktop)
  // ==========================================
  if (sidebarCollapse) {
    sidebarCollapse.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('Collapse button clicked');
      
      // Only allow collapse/expand on desktop when sidebar is visible
      if (!isDesktop() || !sidebar.classList.contains('desktop-visible')) {
        console.log('Cannot collapse: not desktop or sidebar not visible');
        return;
      }

      sidebar.classList.toggle('collapsed');
      
      // Save state to localStorage
      const collapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', collapsed);
      console.log('Sidebar collapsed state:', collapsed);

      // Add tooltips to collapsed sidebar links
      if (collapsed) {
        sidebarLinks.forEach(link => {
          const text = link.querySelector('.sidebar-link-text')?.textContent || '';
          link.setAttribute('data-tooltip', text);
        });
      } else {
        sidebarLinks.forEach(link => {
          link.removeAttribute('data-tooltip');
        });
      }
    });
  }

  // ==========================================
  // Close Sidebar (Mobile)
  // ==========================================
  function closeSidebar() {
    console.log('Closing sidebar');
    
    // Don't close sidebar on desktop (it's controlled by toggle button)
    if (isDesktop()) {
      console.log('Desktop view - sidebar toggle controls visibility');
      return;
    }
    
    sidebar.classList.remove('active');
    if (sidebarOverlay) {
      sidebarOverlay.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
    sidebarToggle.classList.remove('active');
  }

  // Close button click
  if (sidebarClose) {
    sidebarClose.addEventListener('click', function(e) {
      e.stopPropagation();
      closeSidebar();
    });
  }

  // Overlay click
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function(e) {
      e.stopPropagation();
      closeSidebar();
    });
  }

  // ==========================================
  // Sidebar Link Navigation
  // ==========================================
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      console.log('Navigating to:', section);
      
      // Only close on mobile
      if (!isDesktop()) {
        closeSidebar();
      }
      
      // Scroll to section if it exists
      setTimeout(() => {
        if(section === 'menu') {
          const menuSection = document.querySelector('.section-title');
          if (menuSection) {
            menuSection.scrollIntoView({behavior: 'smooth'});
          }
        } else if(section === 'basket') {
          const basketSection = document.querySelector('.basket-container');
          if (basketSection) {
            basketSection.scrollIntoView({behavior: 'smooth'});
          }
        } else if(section === 'home') {
          window.scrollTo({top: 0, behavior: 'smooth'});
        }
      }, 300);
    });
  });

  // ==========================================
  // Escape Key Handler (Mobile)
  // ==========================================
  document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && sidebar.classList.contains('active')) {
      console.log('Escape key pressed - closing sidebar');
      closeSidebar();
    }
  });

  // ==========================================
  // Window Resize Handler
  // ==========================================
  window.addEventListener('resize', function() {
    console.log('Window resized - checking sidebar state');
    
    if (!isDesktop()) {
      // Remove desktop-visible and active classes on mobile
      sidebar.classList.remove('desktop-visible');
      sidebar.classList.remove('active');
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('active');
      }
      document.body.style.overflow = 'auto';
      sidebarToggle.classList.remove('active');
      
      // Remove collapsed state on mobile
      sidebar.classList.remove('collapsed');
      sidebarLinks.forEach(link => {
        link.removeAttribute('data-tooltip');
      });
      console.log('Switched to mobile view - desktop states reset');
    }
  });

  console.log('Sidebar functionality initialized successfully');
});
