const API_URL = 'http://localhost:5000/api/auth';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      try {
        const res = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
          alert('Login successful!');
          localStorage.setItem('token', data.token);
          window.location.href = 'index.html';  // 🔁 Redirect to homepage
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert('Login failed.');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;

      try {
        const res = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
          alert('Signup successful!');
          window.location.href = 'login.html';
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert('Signup failed.');
      }
    });
  }
});
