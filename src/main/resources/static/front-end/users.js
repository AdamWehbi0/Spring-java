document.addEventListener("DOMContentLoaded", function () {
    // Navbar show/hide functionality
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId);

        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show');
                toggle.classList.toggle('bx-x');
                bodypd.classList.toggle('body-pd');
                headerpd.classList.toggle('body-pd');
            });
        }
    };

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

    // Active link highlighting
    const linkColor = document.querySelectorAll('.nav_link');
    linkColor.forEach(l => l.addEventListener('click', function () {
        linkColor.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    }));

    // Fetch and display students
    fetchStudents('/api/v1/student');
});

// Fetch students from the API
async function fetchStudents(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Could not fetch data");

        const students = await response.json();
        displayStudentCards(students);
    } catch (error) {
        console.error("There was an error while trying to fetch the data", error);
    }
}

// Display student cards
function displayStudentCards(students) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'card';

        const name = document.createElement('h3');
        name.textContent = student.name;

        const age = document.createElement('p');
        age.textContent = `Age: ${student.age}`;

        const dob = document.createElement('p');
        dob.textContent = `DOB: ${student.dob}`;

        const email = document.createElement('p');
        email.textContent = `Email: ${student.email}`;

        card.appendChild(name);
        card.appendChild(age);
        card.appendChild(dob);
        card.appendChild(email);

        cardContainer.appendChild(card);
    });
}