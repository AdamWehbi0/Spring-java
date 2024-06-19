// Add event listener to the form for the 'submit' event
document.getElementById('addStudentForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target); // Get form data
    const student = {};
    formData.forEach((value, key) => student[key] = value); // Convert form data to a plain object

    try {
        const response = await fetch('http://localhost:8080/api/v1/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the request headers
            },
            body: JSON.stringify(student) // Convert the student object to a JSON string
        });

        if (response.ok) {
            alert('Student added successfully!'); // Show success message
            event.target.reset(); // Reset the form
        } else {
            const errorData = await response.json(); // Parse the error response
            console.error('Error details:', errorData);
            alert('Failed to add student: ' + (errorData.message || 'Unknown error')); // Show error message
        }
    } catch (error) {
        console.error('Network error:', error); // Log network error
        alert('Failed to add student: Network error'); // Show network error message
    }
});

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function(event) {
    // Function to show/hide the navbar and toggle body/header padding
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId);

        // Check if all elements exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show'); // Toggle navbar visibility
                toggle.classList.toggle('bx-x'); // Toggle icon change
                bodypd.classList.toggle('body-pd'); // Toggle body padding
                headerpd.classList.toggle('body-pd'); // Toggle header padding
            });
        }
    };

    // Initialize the navbar with the specified IDs
    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

    // Get all navigation links
    const linkColor = document.querySelectorAll('.nav_link');

    // Function to add 'active' class to the clicked link
    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active')); // Remove 'active' class from all links
            this.classList.add('active'); // Add 'active' class to the clicked link
        }
    }

    // Add click event to each navigation link
    linkColor.forEach(l => l.addEventListener('click', colorLink));
});