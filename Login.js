// Check if user is already logged in (using localStorage)
window.onload = function() {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
        // If logged in, redirect to chat (or dashboard page)
        window.location.href = 'chat.html'; // Create this page later
    }
};

// Function to handle user login
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        // Store user information in localStorage (In a real app, use an API)
        const user = { email, password };
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'chat.html'; // Redirect to chat page
    } else {
        alert('Please fill in both fields.');
    }
}

// Function to handle user signup
function signUpUser() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (email && password) {
        // Store user information in localStorage (In a real app, use an API)
        const user = { email, password };
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'chat.html'; // Redirect to chat page
    } else {
        alert('Please fill in both fields.');
    }
}

// Function for anonymous login (no email or password required)
function anonymousLogin() {
    // Just create a generic anonymous user with no email/password
    const anonymousUser = { email: 'anonymous', password: 'anonymous' };
    localStorage.setItem('user', JSON.stringify(anonymousUser));
    window.location.href = 'chat.html'; // Redirect to chat page
}
