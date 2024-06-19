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

    // Add click event to the button with ID 'fetchData'
    document.getElementById('fetchData').addEventListener('click', fetchData);

    // Function to fetch data from the API and update the table
    async function fetchData() {
        try {
            const response = await fetch('/api/v1/student');
            const data = await response.json();
            const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear the table body

            // Populate the table with fetched data
            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.dob}</td>
                    <td>${student.email}</td>
                    <td>${student.age}</td>
                    <td><button id="deleteButton" class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to delete a student by ID
    window.deleteStudent = async function(studentId) {
        try {
            const response = await fetch(`/api/v1/student/${studentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchData(); // Refresh data after deletion
            } else {
                console.error("Could not delete student");
            }
        } catch (error) {
            console.log("Error", error);
        }
    };
});