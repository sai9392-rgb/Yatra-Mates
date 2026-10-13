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
            }

        } catch (error) {
            message.textContent =
                "Cannot connect to the server. Check the backend.";
        }
    });
}

// Login form — backend login will be added next.
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        document.getElementById("message").textContent =
            "Login backend is our next step.";
    });
}
