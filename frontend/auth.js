
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        if (email === "" || password === "") {
            message.textContent = "Please fill in all fields.";
            return;
        }

        message.textContent =
            "Form validated! Backend login is our next step.";
    });
}




const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
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

        message.textContent =
            "Registration form validated for " + name +
            ". Backend registration is our next step.";
    });
}
