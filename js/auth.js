// Authentication state observer
auth.onAuthStateChanged(user => {
  const loadingSpinner = document.getElementById('loadingSpinner');
  
  if (user) {
    // User is signed in
    console.log("User logged in:", user.email);
    
    // If we're on the login page, redirect to dashboard
    if (window.location.pathname.includes('login.html')) {
      loadingSpinner.style.display = 'flex';
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    }
  } else {
    // User is signed out
    console.log("User logged out");
    
    // If we're not on the login page, redirect to login
    if (!window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('index.html')) {
      loadingSpinner.style.display = 'flex';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    }
  }
  
  loadingSpinner.style.display = 'none';
});

// Login function
function login(email, password, rememberMe) {
  const loadingSpinner = document.getElementById('loadingSpinner');
  loadingSpinner.style.display = 'flex';
  
  return auth.setPersistence(rememberMe ? 
    firebase.auth.Auth.Persistence.LOCAL : 
    firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return auth.signInWithEmailAndPassword(email, password);
    })
    .catch(error => {
      loadingSpinner.style.display = 'none';
      throw error;
    });
}

// Logout function
function logout() {
  const loadingSpinner = document.getElementById('loadingSpinner');
  loadingSpinner.style.display = 'flex';
  
  return auth.signOut()
    .then(() => {
      window.location.href = 'login.html';
    })
    .catch(error => {
      loadingSpinner.style.display = 'none';
      console.error("Logout error:", error);
      alert("Logout failed: " + error.message);
    });
}

// Password reset function
function sendPasswordResetEmail(email) {
  const loadingSpinner = document.getElementById('loadingSpinner');
  loadingSpinner.style.display = 'flex';
  
  return auth.sendPasswordResetEmail(email)
    .then(() => {
      loadingSpinner.style.display = 'none';
      return true;
    })
    .catch(error => {
      loadingSpinner.style.display = 'none';
      throw error;
    });
}