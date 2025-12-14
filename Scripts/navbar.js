/* ============================================
   Navbar Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Navbar script loaded');

  // ==========================================
  // Notification Dropdown
  // ==========================================
  const notificationLink = document.querySelector('.notification-link');
  const notificationDropdown = document.getElementById('notificationDropdown');
  const closeNotifications = document.getElementById('closeNotifications');
  const notificationBadge = document.getElementById('notificationBadge');

  if (notificationLink && notificationDropdown) {
    notificationLink.addEventListener('click', function(e) {
      e.preventDefault();
      notificationDropdown.classList.toggle('active');
      console.log('Notification dropdown toggled');
    });

    // Close notification dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!notificationLink.contains(e.target) && !notificationDropdown.contains(e.target)) {
        notificationDropdown.classList.remove('active');
      }
    });
  }

  if (closeNotifications) {
    closeNotifications.addEventListener('click', function() {
      notificationDropdown.classList.remove('active');
    });
  }

  // ==========================================
  // Contact Modal
  // ==========================================
  const contactLink = document.querySelector('.contact-link');
  const contactModal = document.getElementById('contactModal');
  const contactOverlay = document.getElementById('contactOverlay');
  const closeContact = document.getElementById('closeContact');
  const contactForm = document.getElementById('contactForm');

  if (contactLink && contactModal) {
    contactLink.addEventListener('click', function(e) {
      e.preventDefault();
      openContactModal();
    });
  }

  function openContactModal() {
    contactModal.classList.add('active');
    contactOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Contact modal opened');
  }

  function closeContactModal() {
    contactModal.classList.remove('active');
    contactOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    console.log('Contact modal closed');
  }

  if (closeContact) {
    closeContact.addEventListener('click', closeContactModal);
  }

  if (contactOverlay) {
    contactOverlay.addEventListener('click', closeContactModal);
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
      closeContactModal();
    }
  });

  // Handle contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      console.log('Contact form submitted:', Object.fromEntries(formData));
      
      // Show success message
      showToast('Message sent successfully! We\'ll contact you soon.', 'success');
      contactForm.reset();
      closeContactModal();
    });
  }

  // ==========================================
  // Pizza Dropdown Menu
  // ==========================================
  const pizzaDropdownToggle = document.getElementById('pizzaDropdownToggle');
  const pizzaDropdownMenu = document.getElementById('pizzaDropdownMenu');
  const pizzaDropdownClose = document.getElementById('pizzaDropdownClose');
  const pizzaDropdownOptions = document.getElementById('pizzaDropdownOptions');
  const pizzaSearchInput = document.getElementById('pizzaSearchInput');

  // Fetch pizzas and populate dropdown
    try {
      const response = await fetch('http://localhost:5000/api/pizzas');
      const pizzas = await response.json();
      
      // Clear existing options (keep "All Pizzas")
      const allPizzasOption = pizzaDropdownOptions.querySelector('[data-filter="all"]');
      pizzaDropdownOptions.innerHTML = '';
      pizzaDropdownOptions.appendChild(allPizzasOption);
      
      // Add each pizza as an option
      pizzas.forEach(pizza => {
        const option = document.createElement('div');
        option.className = 'dropdown-option';
        option.setAttribute('data-filter', pizza.name.toLowerCase());
        option.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <span>${pizza.name}</span>
        `;
        
        option.addEventListener('click', function() {
          selectPizzaFilter(pizza.name, this);
        });
        
        pizzaDropdownOptions.appendChild(option);
      });
      
      console.log('Pizzas loaded in dropdown:', pizzas.length);
    } catch (error) {
      console.error('Error loading pizzas:', error);
    }
  }

  function selectPizzaFilter(pizzaName, element) {
    // Remove active class from all options
    document.querySelectorAll('.dropdown-option').forEach(opt => {
      opt.classList.remove('active');
    });
    
    // Add active class to selected option
    element.classList.add('active');
    
    // Update dropdown toggle text
    const toggleText = pizzaDropdownToggle.querySelector('.dropdown-text');
    toggleText.textContent = pizzaName;
    
    // Close dropdown
    pizzaDropdownMenu.classList.remove('active');
    pizzaDropdownToggle.classList.remove('active');
    
    // Filter pizzas
    const pizzaCards = document.querySelectorAll('.pizza-card');
    pizzaCards.forEach(card => {
      const cardTitle = card.querySelector('.pizza-title')?.textContent.toLowerCase() || '';
      
      if (pizzaName === 'All Pizzas' || cardTitle.includes(pizzaName.toLowerCase())) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.3s ease';
      } else {
        card.style.display = 'none';
      }
    });
    
    console.log('Pizza filter applied:', pizzaName);
  }

  // Toggle dropdown visibility
  if (pizzaDropdownToggle) {
    pizzaDropdownToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      pizzaDropdownMenu.classList.toggle('active');
      pizzaDropdownToggle.classList.toggle('active');
      console.log('Pizza dropdown toggled');
    });
  }

  // Close dropdown
  if (pizzaDropdownClose) {
    pizzaDropdownClose.addEventListener('click', function() {
      pizzaDropdownMenu.classList.remove('active');
      pizzaDropdownToggle.classList.remove('active');
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (pizzaDropdownToggle && pizzaDropdownMenu) {
      if (!pizzaDropdownToggle.contains(e.target) && !pizzaDropdownMenu.contains(e.target)) {
        pizzaDropdownMenu.classList.remove('active');
        pizzaDropdownToggle.classList.remove('active');
      }
    }
  });

  // Search within dropdown
  if (pizzaSearchInput) {
    pizzaSearchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const options = document.querySelectorAll('.dropdown-option');
      
      options.forEach(option => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchTerm) || searchTerm === '') {
          option.style.display = 'flex';
        } else {
          option.style.display = 'none';
        }
      });
    });
  }

  // Load pizzas on page load
  loadPizzasInDropdown();

  // ==========================================
  // Mobile Menu Toggle
  // ==========================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (mobileMenuToggle && navbarMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      console.log('Mobile menu toggled');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar-menu .navbar-link').forEach(link => {
      link.addEventListener('click', function() {
        navbarMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });
  }

  // ==========================================
  // Notification Badge Update
  // ==========================================
  function updateNotificationBadge(count) {
    if (notificationBadge) {
      notificationBadge.textContent = count;
      notificationBadge.style.animation = 'popIn 0.3s ease';
      console.log('Notification badge updated to:', count);
    }
  }

  // ==========================================
  // Logout Button Handler
  // ==========================================
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      console.log('Logout clicked');
      showToast('Logging out...', 'info');
      
      // Clear all session and auth data
      sessionStorage.clear();
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');  // Clear login token
      
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    });
  }

  // ==========================================
  // Show/Hide Logout Button Based on Auth
  // ==========================================
  function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const loginBtn = document.getElementById('loginBtn');
    
    if (token) {
      // User is logged in
      logoutBtn.style.display = 'flex';
      if (loginBtn) {
        loginBtn.style.display = 'none';
      }
    } else {
      // User is not logged in
      logoutBtn.style.display = 'none';
      if (loginBtn) {
        loginBtn.style.display = 'flex';
      }
    }
  }

  // Check auth status on load
  checkAuthStatus();

  // ==========================================
  // Toast Notification Function
  // ==========================================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${getToastColor(type)};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.3s ease;
      z-index: 2000;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function getToastColor(type) {
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      info: '#17a2b8',
      warning: '#ffc107'
    };
    return colors[type] || colors.info;
  }

  // ==========================================
  // Keyboard Shortcuts
  // ==========================================
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for pizza filter dropdown
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      pizzaDropdownToggle?.click();
      console.log('Pizza dropdown shortcut triggered');
    }

    // Ctrl/Cmd + B for basket/cart
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      const basketSection = document.getElementById('basket');
      basketSection?.scrollIntoView({ behavior: 'smooth' });
      console.log('Basket shortcut triggered');
    }

    // Ctrl/Cmd + N for notifications
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      notificationDropdown?.classList.toggle('active');
      console.log('Notification shortcut triggered');
    }
  });

  console.log('Navbar functionality initialized');
});

// Export functions for global access
window.updateNotificationBadge = function(count) {
  const badge = document.getElementById('notificationBadge');
  if (badge) badge.textContent = count;
};

window.showNotification = function(message, type) {
  const toastColor = {
    success: '#28a745',
    error: '#dc3545',
    info: '#17a2b8',
    warning: '#ffc107'
  };
  
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${toastColor[type] || toastColor.info};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideInRight 0.3s ease;
    z-index: 2000;
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};
