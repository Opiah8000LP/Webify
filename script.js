// Check if a name has been previously saved on this PC (using localStorage)
window.onload = function() {
    const storedName = localStorage.getItem('username');
    if (storedName) {
        // Optionally, direct them to the chat page if they have a saved name.
        window.location.href = 'chat.html'; // Redirect to chat if name is already saved
    }
};

// Function to check if the name is available
function checkNameAvailability() {
    const username = document.getElementById('username').value.trim();

    // Validate name input (cannot be empty)
    if (!username) {
        alert("Please enter a name.");
        return;
    }

    // Check if the name is already taken (stored in localStorage)
    const storedName = localStorage.getItem('username');

    if (storedName === username) {
        // If the name is valid and available (or was already taken by this user), save and proceed
        localStorage.setItem('username', username);

        // Redirection to the chat page after saving the name
        setTimeout(() => {
            window.location.href = 'chat.html';  // Redirect to the chat page
        }, 300);  // Delay to allow name save before redirection (optional smooth effect)
    } else {
        // If name is not available, show error
        showError();
    }
}

// Function to display error message if the name is already taken
function showError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.opacity = 1;
    }, 10);
}
