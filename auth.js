/**
 * Enhanced Auth JavaScript with Improved UX
 */

const API_URL = 'http://localhost:5000/api/auth';

// Toast notification system
class Toast {
  static show(message, type = 'success') {
    const container = document.getElementById('toastContainer') || this.createContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
  
  static createContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  }
}

// Loading spinner
class LoadingSpinner {
  static show() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
      spinner.classList.add('active');
    }
  }
  
  static hide() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
      spinner.classList.remove('active');
    }
  }
}

// Form validation
class FormValidator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static validatePassword(password) {
    return password.length >= 6;
  }
  
  static validateName(name) {
    return name.trim().length >= 2;
  }
}

// Authentication handler
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  if (loginForm) {
    setupLoginForm(loginForm);
  }
  
  if (signupForm) {
    setupSignupForm(signupForm);
  }
  
  // Add smooth form focus effects
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('focus', (e) => {
      e.target.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', (e) => {
      e.target.style.transform = 'scale(1)';
    });
  });
});

function setupLoginForm(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validation
    if (!FormValidator.validateEmail(email)) {
      Toast.show('Please enter a valid email address', 'error');
      return;
    }
    
    if (!FormValidator.validatePassword(password)) {
      Toast.show('Password must be at least 6 characters', 'error');
      return;
    }
    
    LoadingSpinner.show();
    
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        Toast.show('✨ Login successful! Redirecting...', 'success');
        localStorage.setItem('token', data.token);
        
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        Toast.show(data.message || 'Login failed. Please try again.', 'error');
      }
    } catch (err) {
      Toast.show('Connection error. Please try again.', 'error');
      console.error('Login error:', err);
    } finally {
      LoadingSpinner.hide();
    }
  });
}

function setupSignupForm(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    
    // Validation
    if (!FormValidator.validateName(name)) {
      Toast.show('Please enter a valid name (at least 2 characters)', 'error');
      return;
    }
    
    if (!FormValidator.validateEmail(email)) {
      Toast.show('Please enter a valid email address', 'error');
      return;
    }
    
    if (!FormValidator.validatePassword(password)) {
      Toast.show('Password must be at least 6 characters', 'error');
      return;
    }
    
    LoadingSpinner.show();
    
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        Toast.show('🎉 Account created successfully! Redirecting to login...', 'success');
        
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      } else {
        Toast.show(data.message || 'Signup failed. Please try again.', 'error');
      }
    } catch (err) {
      Toast.show('Connection error. Please try again.', 'error');
      console.error('Signup error:', err);
    } finally {
      LoadingSpinner.hide();
    }
  });
}

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
  
  .form-input {
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
`;
document.head.appendChild(style);
