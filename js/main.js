// Main application functionality
let currentUser = null;

// Initialize dashboard
function initDashboard() {
  auth.onAuthStateChanged(user => {
    currentUser = user;
    
    if (user) {
      loadDashboardData();
      setupEventListeners();
    }
  });
}

// Load dashboard data
function loadDashboardData() {
  // Load summary data
  loadSummaryCards();
  
  // Load inventory data
  loadInventory();
  
  // Load invoice data
  loadInvoices();
  
  // Load user data
  loadUsers();
}

// Setup event listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showSection(this.getAttribute('data-section'));
    });
  });
  
  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
  // Other event listeners...
}

// Show section
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  
  document.getElementById(sectionId).classList.remove('hidden');
  
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
}

// Load summary cards
function loadSummaryCards() {
  // Implement your summary card loading logic here
}

// Load inventory
function loadInventory() {
  // Implement your inventory loading logic here
}

// Load invoices
function loadInvoices() {
  // Implement your invoice loading logic here
}

// Load users
function loadUsers() {
  // Implement your user loading logic here
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const rememberMe = document.getElementById('rememberMe').checked;
      
      login(email, password, rememberMe)
        .then(() => {
          // Redirect handled by auth state observer
        })
        .catch(error => {
          document.getElementById('errorMessage').textContent = getErrorMessage(error);
          new bootstrap.Modal(document.getElementById('errorModal')).show();
        });
    });
  }
});

// Get user-friendly error messages
function getErrorMessage(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return "Invalid email address format.";
    case 'auth/user-disabled':
      return "This account has been disabled.";
    case 'auth/user-not-found':
      return "No account found with this email.";
    case 'auth/wrong-password':
      return "Incorrect password. Please try again.";
    case 'auth/too-many-requests':
      return "Too many failed attempts. Account temporarily locked.";
    case 'auth/network-request-failed':
      return "Network error. Please check your internet connection.";
    default:
      return error.message || "An unknown error occurred.";
  }
}
