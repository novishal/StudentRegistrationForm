window.addEventListener("DOMContentLoaded",function() {
    // Intialize the students array from local storage or create an empty array if none exist
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // function to render the student table
    function renderStudents() {
        // will updates the HTML table to display the current list of students
        const tbody = document.querySelector("#studentTable tbody");
        tbody.innerHTML = "";   //Clear existing rows to avoid duplicates
        students.forEach((student,index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.studentClass}</td>
            <td>${student.contact}</td>
            <td>${student.address}</td>
            <td>
                <button onclick ="editStudent(${index})">Edit</button>
                <button onclick ="deleteStudent(${index})">Delete</button>
            </td>
            `;
            tbody.appendChild(row); //Add the row to the table body
        });
    }
    // Function to validate form inputs
    function validateForm(name, id, email, studentClass, contact, address) {
        // Name: only letters and spaces
        if (!name || [...name].some(c => !isNaN(c) && c !== ' ')) {
            alert("Name must contain only letters and spaces.");
            return false;
        }

        // ID: only numbers
        if (!id || isNaN(id)) {
            alert("ID must be numeric.");
            return false;
        }
        // Prevention of duplicate Id
        if (students.some(s => s.id === id)) {
            alert("A student with this ID already exists.");
            return false;
        }
        
        // Email: must include "@" and "."
        if (!email || !email.includes("@") || !email.includes(".")) {
            alert("Enter a valid email.");
            return false;
        }

        // Class: Only numbers(Between 1-12 Only)
        const classNumber = Number(studentClass);
        if (!studentClass || isNaN(classNumber) || classNumber < 0 || classNumber > 13) {
            alert("Class must be Number between 1 to 12 Only.");
            return false;
        }

        // Contact: exactly 10 digits, only numbers
        if (!contact || isNaN(contact) || contact.length !== 10) {
            alert("Contact must be 10 digits.");
            return false;
        }

        // Address: Can be Anything
        if (!address){
            alert("Address cannot be empty.");
            return false;
        }  

        return true;
    }

    // Event listener for form submission
    // This handles adding new students to the system
    document.getElementById("mainForm").addEventListener("submit",function (e) {
        e.preventDefault(); //Prevent default form submission to handle it via JavaScript
        
        const name = document.getElementById("name").value.trim();
        const id = document.getElementById("studentId").value.trim();
        const email = document.getElementById("email").value.trim();
        const studentClass = document.getElementById("class").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const address = document.getElementById("address").value.trim();

        // Check if any field is empty,prevent adding empty rows.
        if(!validateForm(name,id,email,studentClass,contact,address)) return;

        // Add new students to the array
        students.push({name, id , email , studentClass , contact , address});
        // Save to local storage to persist data across page reloads
        localStorage.setItem("students", JSON.stringify(students));
        // Reset the form for the next entry
        document.getElementById("mainForm").reset();
        // Update the table to show the new student
        renderStudents();
    });

    // Function to delete a student at the specified index from the array and update localStorage and table
    window.deleteStudent = function(index){
        students.splice( index, 1); //Remove the student at the given index
        // Update localStorage
        localStorage.setItem("students", JSON.stringify(students));
        // Refresh the table to reflect the deletion
        renderStudents();
    };

    // Function to edit a student
    window.editStudent = function(index) {
        const student = students[index];

        // Form with student's details for editing 
        document.getElementById("name").value = student.name;
        document.getElementById("studentId").value = student.id;
        document.getElementById("email").value = student.email;
        document.getElementById("class").value = student.studentClass;
        document.getElementById("contact").value = student.contact;
        document.getElementById("address").value = student.address;

        // TODO-: To allow actual editing 
        students.splice(index , 1);  //remove the students
        localStorage.setItem("students",JSON.stringify(students));
        renderStudents();
    };

    // Initial render of students on page load
    renderStudents();
});
