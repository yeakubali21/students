// =========================
// API URL (Change this)
// =========================
const API_URL = "https://practice-session-u3uy.onrender.com";
const STUDENTS_URL = `${API_URL}/students/`;

// =========================
// DOM Elements
// =========================
const form = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const message = document.getElementById("message");

const studentIdInput = document.getElementById("studentId");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const department = document.getElementById("department");
const roll = document.getElementById("roll");
const session = document.getElementById("session");

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const refreshBtn = document.getElementById("refreshBtn");

// =========================
// Error Message
// =========================
function getErrorMessage(data) {
    if (data.detail) {
        return typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail);
    }
    return "Something went wrong.";
}

// =========================
// GET All Students
// =========================
async function loadStudents() {
    refreshBtn.disabled = true;
    studentTable.innerHTML = `
        <tr>
            <td colspan="6">Loading students...</td>
        </tr>
    `;

    try {
        const response = await fetch(STUDENTS_URL);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(getErrorMessage(errorData));
        }

        const students = await response.json();

        studentTable.innerHTML = "";

        if (students.length === 0) {
            studentTable.innerHTML = `
                <tr>
                    <td colspan="6">No students found.</td>
                </tr>
            `;
            return;
        }

        students.forEach(student => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.first_name}</td>
                <td>${student.last_name}</td>
                <td>${student.department}</td>
                <td>${student.session}</td>
                <td>${student.roll}</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `;

            row.querySelector(".edit")
                .addEventListener("click", () => editStudent(student));

            row.querySelector(".delete")
                .addEventListener("click", () => deleteStudent(student.roll));

            studentTable.appendChild(row);
        });

    } catch (error) {
        studentTable.innerHTML = `
            <tr>
                <td colspan="6">
                    Could not load students: ${error.message}
                </td>
            </tr>
        `;
    } finally {
        refreshBtn.disabled = false;
    }
}

// =========================
// Edit Student
// =========================
function editStudent(student) {
    studentIdInput.value = student.id;
    firstName.value = student.first_name;
    lastName.value = student.last_name;
    department.value = student.department;
    session.value = student.session;
    roll.value = student.roll

    formTitle.textContent = "Update Student";
    submitBtn.textContent = "Update Student";
    cancelBtn.hidden = false;

    form.scrollIntoView({
        behavior: "smooth"
    });
}

// =========================
// Reset Form
// =========================
function resetForm() {
    form.reset();
    studentIdInput.value = "";

    formTitle.textContent = "Add New Student";
    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;
}

// =========================
// Cancel Button
// =========================
cancelBtn.addEventListener("click", () => {
    resetForm();
    message.textContent = "";
});

// =========================
// POST / PUT
// =========================
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = studentIdInput.value;

    const student = {
        first_name: firstName.value.trim(),
        last_name: lastName.value.trim(),
        session : Number(session.value.trim()),
        department: department.value.trim(),
        roll: roll.value
    };

    if (!student.first_name || !student.department || !student.roll) {
        message.textContent = "Please fill all fields.";
        return;
    }


    const url = id
        ? `${STUDENTS_URL}`+`update/${roll.value}`
        : STUDENTS_URL+'create';

    const method = id ? "PATCH" : "POST";

    submitBtn.disabled = true;
    message.textContent = id
        ? "Updating student..."
        : "Creating student...";

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(getErrorMessage(errorData));
        }

        message.textContent = id
            ? "Student updated successfully!"
            : "Student created successfully!";

        resetForm();
        loadStudents();

    } catch (error) {
        message.textContent = error.message;
    } finally {
        submitBtn.disabled = false;
    }
});

// =========================
// DELETE Student
// =========================
async function deleteStudent(roll) {

    if (!confirm(`Delete student ${roll}?`))
        return;

    try {
        const response = await fetch(`${STUDENTS_URL}${roll}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(getErrorMessage(errorData));
        }

        message.textContent = "Student deleted successfully!";

        if (studentIdInput.value == id)
            resetForm();

        loadStudents();

    } catch (error) {
        message.textContent = error.message;
    }
}


// =========================
// Refresh Button
// =========================
refreshBtn.addEventListener("click", loadStudents);

// =========================
// Initial Load
// =========================
loadStudents();