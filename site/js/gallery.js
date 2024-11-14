// Function to update the greeting message based on the time of day
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    const date = new Date();
    const hours = date.getHours();
    let greeting;

    if (hours <12) {
        greeting = "Good morning! Welcome to the Hedgehog Gallery.";
    } else if (hours < 18) {
        greeting = "Good afternoon! Enjoy browsing the Hedgehog Gallery.";
    } else {
        greeting = "Good evening! Hope you like the Hedgehog Gallery.";
    }

    greetingElement.textContent = greeting;
}

// Function to update the date in the footer
function updateDate() {
    const dateElement = document.getElementById('date');
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString();
}

// Event listener for when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    updateDate();
});