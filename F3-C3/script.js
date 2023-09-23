document.addEventListener("DOMContentLoaded", function () {
    const signupPage = document.getElementById("signup");
    const profilePage = document.getElementById("profile");
    const signupForm = document.getElementById("signup-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
     const signupButton = document.getElementById("signup-btn");
    const signupMessage = document.getElementById("signup-message");
    const profileUsername = document.getElementById("profile-username");
    const logoutButton = document.getElementById("logout-btn");

    // Check if the user is already logged in (access token in local storage)
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
        // User is logged in, show the profile page
        showProfilePage();
    } else {
        // User is not logged in, show the signup page
        showSignupPage();
    }

    // Function to show the signup page
    function showSignupPage() {
        signupPage.style.display = "block";
        profilePage.style.display = "none";
    }

    // Function to show the profile page
    function showProfilePage() {
        signupPage.style.display = "none";
        profilePage.style.display = "block";
        const username = localStorage.getItem("username");
        profileUsername.textContent = username;
    }

    // Function to generate a random access token
    function generateAccessToken() {
        const token = Array.from({ length: 16 }, () =>
            Math.floor(Math.random() * 256)
        );
        return btoa(String.fromCharCode.apply(null, token));
    }

    // Event listener for signup button click
    signupButton.addEventListener("click", function () {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Check if the fields are not empty
        if (username && password) {
            // Generate a random access token
            const accessToken = generateAccessToken();

            // Store user data in local storage
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("username", username);

            // Show success message and redirect to profile page
            signupMessage.textContent = "Signup successful!";
            setTimeout(function () {
                signupMessage.textContent = "";
                showProfilePage();
            }, 1000);
        } else {
            signupMessage.textContent = "Please fill in all fields.";
        }
    });

    // Event listener for logout button click
    logoutButton.addEventListener("click", function () {
        // Clear local storage and redirect to signup page
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        showSignupPage();
    });
});