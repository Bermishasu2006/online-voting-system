const API_BASE_URL = "https://online-voting-system-qc0g.onrender.com";

function login() {
    let voterId = document.getElementById("voterId").value;
    let password = document.getElementById("password").value;

    fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            voterId: voterId,
            password: password
        })
    })
    .then(response => response.text())
    .then(data => {
        if(data == "Login Success"){

            localStorage.setItem("loggedInVoterId", voterId);

            alert("Login Successful");
            window.location.href = "vote.html";
        }
        else{
            alert("Invalid Voter ID or Password");
        }
    });
}

function submitVote(){

    let candidate = document.querySelector('input[name="candidate"]:checked');
    let voterId = localStorage.getItem("loggedInVoterId");

    if(candidate == null){
        alert("Please select a candidate");
    }
    else{
        fetch(`${API_BASE_URL}/api/vote?voterId=${voterId}&candidateId=${candidate.value}`, {
            method: "POST"
        })
        .then(response => response.text())
        .then(data => {
            alert(data);

            if(data == "Vote Submitted"){
                window.location.href = "thankyou.html";
            }
        });
    }
}

function register(){

    let fullName = document.getElementById("fullName").value;
    let voterId = document.getElementById("registerVoterId").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(fullName == ""){
        alert("Please enter your full name");
    }
    else if(voterId == ""){
        alert("Please enter your Voter ID");
    }
    else if(password == ""){
        alert("Please enter your password");
    }
    else if(confirmPassword == ""){
        alert("Please confirm your password");
    }
    else if(password != confirmPassword){
        alert("Passwords do not match");
    }
    else {

        fetch(`${API_BASE_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: fullName,
                voterId: voterId,
                password: password,
                hasVoted: false
            })
        })
        .then(response => response.text())
        .then(data => {
            alert("Registration Successful");
            window.location.href = "login.html";
        })
        .catch(error => {
            alert("Registration Failed");
            console.log(error);
        });
    }
}

function loadResults(){

    fetch(`${API_BASE_URL}/api/results`)
    .then(response => response.json())
    .then(data => {

        let resultsBox = document.getElementById("resultsBox");

        resultsBox.innerHTML = "";

        data.forEach(candidate => {

            resultsBox.innerHTML += `
                <div class="result-card">
                    <h3>${candidate.candidateName}</h3>
                    <p>${candidate.partyName}</p>
                    <p>${candidate.voteCount} Votes</p>
                </div>
            `;

        });

    });
}

function adminLogin(){

    let adminId = document.getElementById("adminId").value;
    let adminPassword = document.getElementById("adminPassword").value;

    if(adminId === "admin" && adminPassword === "admin123"){

        alert("Admin Login Successful");
        window.location.href = "admin-dashboard.html";

    }
    else{
        alert("Invalid Admin Credentials");
    }
}

function loadUsers(){

    fetch(`${API_BASE_URL}/api/users`)
    .then(response => response.json())
    .then(data => {

        let table = document.getElementById("userTable");

        data.forEach(user => {

            table.innerHTML += `
<tr>
    <td>${user.id}</td>
    <td>${user.fullName}</td>
    <td>${user.voterId}</td>
    <td>${user.hasVoted ? "Voted" : "Not Voted"}</td>
</tr>
`;

        });

    });
}    else{
        fetch(`http://localhost:8080/api/vote?voterId=${voterId}&candidateId=${candidate.value}`, {
            method: "POST"
        })
        .then(response => response.text())
        .then(data => {
            alert(data);

            if(data == "Vote Submitted"){
                window.location.href = "thankyou.html";
            }
        });
    }
}
function register(){

    let fullName = document.getElementById("fullName").value;
    let voterId = document.getElementById("registerVoterId").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(fullName == ""){
        alert("Please enter your full name");
    }
    else if(voterId == ""){
        alert("Please enter your Voter ID");
    }
    else if(password == ""){
        alert("Please enter your password");
    }
    else if(confirmPassword == ""){
        alert("Please confirm your password");
    }
    else if(password != confirmPassword){
        alert("Passwords do not match");
    }
    else {

    fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName: fullName,
            voterId: voterId,
            password: password,
            hasVoted: false
        })
    })
    .then(response => response.text())
    .then(data => {
        alert("Registration Successful");
        window.location.href = "login.html";
    })
    .catch(error => {
        alert("Registration Failed");
        console.log(error);
    });

}
}
function loadResults(){

    fetch("http://localhost:8080/api/results")
    .then(response => response.json())
    .then(data => {

        let resultsBox = document.getElementById("resultsBox");

        resultsBox.innerHTML = "";

        data.forEach(candidate => {

            resultsBox.innerHTML += `
                <div class="result-card">
                    <h3>${candidate.candidateName}</h3>
                    <p>${candidate.partyName}</p>
                    <p>${candidate.voteCount} Votes</p>
                </div>
            `;

        });

    });

}
function adminLogin(){

    let adminId = document.getElementById("adminId").value;
    let adminPassword = document.getElementById("adminPassword").value;

    if(adminId === "admin" && adminPassword === "admin123"){

        alert("Admin Login Successful");
        window.location.href = "admin-dashboard.html";

    }
    else{

        alert("Invalid Admin Credentials");

    }
}
function loadUsers(){

    fetch("http://localhost:8080/api/users")
    .then(response => response.json())
    .then(data => {

        let table = document.getElementById("userTable");

        data.forEach(user => {

            table.innerHTML += `
<tr>
    <td>${user.id}</td>
    <td>${user.fullName}</td>
    <td>${user.voterId}</td>
    <td>${user.hasVoted ? "Voted" : "Not Voted"}</td>
</tr>
`;

        });

    });

}
