const API_URL = "http://localhost:5000/api/users";

// Registration form
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        message.textContent = "Creating your account...";

        try {
            const response = await fetch(API_URL + "/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            message.textContent = data.message;

            if (response.ok) {
                registerForm.reset();

                message.textContent =
                    "Registration successful! Taking you to login...";

                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1500);
            }

        } catch (error) {
            message.textContent =
                "Cannot connect to the server. Check the backend.";
        }
    });
}

// Login form
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        message.textContent = "Logging in...";

        try {
            const response = await fetch(API_URL + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            message.textContent = data.message;

            if (response.ok) {
                // Remember who is logged in (name and email only).
                // Add a token (JWT) once the backend needs to know
                // who is logged in, e.g. to save joined trips.
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href = "index.html";
            }

        } catch (error) {
            message.textContent =
                "Cannot connect to the server. Check the backend.";
        }
    });
}
