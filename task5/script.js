function insertData(event) {
    event.preventDefault();
    var firstName = document.getElementById("name").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pwd").value;
    var confirmPWD = document.getElementById("confirmPWD").value;
    var dob = document.getElementById("DOB").value;

    var namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(firstName)) {
        alert('First name should contain only letters.');
        return;
    }

    if (!namePattern.test(lastName)) {
        alert('Last name should contain only letters.');
        return;
    }

    var emailPattern = /^[\w-_.]+@[\w-]+\.[\w]{2,7}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password !== confirmPWD) {
        alert('Passwords do not match.');
        return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPWD || !dob) {
        alert('Please fill out all fields.');
        return;
    }

    let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

    let duplicateUser = userData.find(user => user.email === email);
    if (duplicateUser) {
        alert('A user with this email already exists. Please use a different email.');
        return;
    }

    userData.push({
        'name': firstName,
        'lastName': lastName,
        'email': email,
        'password': password,
        'DOB': dob
    });

    localStorage.setItem("userDetails", JSON.stringify(userData));
}

function login() {
    var useremail = document.getElementById("useremail").value;
    var userpassword = document.getElementById("userpwd").value;

    let entries = JSON.parse(localStorage.getItem("userDetails")) ?? [];

    let user = entries.find(entry => entry.email === useremail && entry.password === userpassword);

    const adminEmail = "admin@gmail.com";
    const adminpwd = 1020;

    if(useremail == adminEmail && userpassword == adminpwd) {
        window.open("admin.html");
        return;
    }

    if (user) {
        alert('You have successfully logged in...!');
        localStorage.setItem("currentUser", JSON.stringify(user)); 
        window.open("user.html"); 
    } else if (entries.email === useremail || entries.password === userpassword) {
        alert('Email and password do not match. Please correct them.');
    } else {
        alert('User not found.');
    }
}

function showUserInfo() {
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var uemail = document.getElementById("uemail");
    var userpwd = document.getElementById("userpwd");
    var birthDate = document.getElementById("birthDate");

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        fname.innerText = currentUser.name;
        lname.innerText = currentUser.lastName;
        uemail.innerText = currentUser.email;
        userpwd.innerText = currentUser.password;
        birthDate.innerText = currentUser.DOB;
    } else {
        alert('No user data found. Please log in.');
    }
}

function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html"; 
}

function showAllData() {
    let entries = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    let tbody = document.getElementById('userTableBody');
    tbody.innerHTML = ''; 

    entries.forEach((entry, index) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.lastName}</td>
            <td>${entry.email}</td>
            <td>${entry.DOB}</td>
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function editUser(index) {
    let entries = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    let entry = entries[index];

    currentEditIndex = index;

    document.getElementById("editFirstName").value = entry.name;
    document.getElementById("editLastName").value = entry.lastName;
    document.getElementById("editEmail").value = entry.email;
    document.getElementById("editDOB").value = entry.DOB;

    document.getElementById("editModal").style.display = "block";
}

function saveEdit() {
    let entries = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    let entry = entries[currentEditIndex];

    entry.name = document.getElementById("editFirstName").value;
    entry.lastName = document.getElementById("editLastName").value;
    entry.email = document.getElementById("editEmail").value;
    entry.DOB = document.getElementById("editDOB").value;

    var namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(entry.name)) {
        alert('First name should contain only letters.');
        return;
    }

    if (!namePattern.test(entry.lastName)) {
        alert('Last name should contain only letters.');
        return;
    }

    var emailPattern = /^[\w-_.]+@[\w-]+\.[\w]{2,7}$/;
    if (!emailPattern.test(entry.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!entry.name || !entry.lastName || !entry.email || !entry.DOB) {
        alert('Please fill out all fields.');
        return;
    }

    localStorage.setItem("userDetails", JSON.stringify(entries));
    showAllData();
    closeModal();
}

function deleteUser(index) {
    let entries = JSON.parse(localStorage.getItem("userDetails")) ?? [];

    if (confirm("Are you sure you want to delete this user?")) {
        entries.splice(index, 1);
        localStorage.setItem("userDetails", JSON.stringify(entries));
        showAllData();
    }
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

