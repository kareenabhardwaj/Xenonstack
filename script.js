// script.js

// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful');
            window.location.href = 'index.html';
        } else {
            alert('Login failed: ' + data.message);
        }
    });
});

// Handle signup form submission
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Signup successful');
            window.location.href = 'login.html';
        } else {
            alert('Signup failed: ' + data.message);
        }
    });
});

// Fetch properties and display them on the property listing page
window.onload = function() {
    fetch('/properties')
        .then(response => response.json())
        .then(data => {
            const propertyList = document.getElementById('property-list');
            data.forEach(property => {
                const propertyDiv = document.createElement('div');
                propertyDiv.classList.add('property');
                propertyDiv.innerHTML = `
                    <h3>${property.name}</h3>
                    <p>Price: $${property.price}</p>
                    <p>Location: ${property.location}</p>
                    <a href="property_listing.html?id=${property.id}">View Details</a>
                `;
                propertyList.appendChild(propertyDiv);
            });
        });
};
