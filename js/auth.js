// ========================================
// SCHOLARLY: AUTH
// Piece 1: sign up
// ========================================

// ---------- Helper: show a message under the form ----------
// type is "error" or "success" (controls the color)
function showMessage(text, type) {
    const box = document.getElementById("form-message");
    box.textContent = text;
    box.className = "form-message " + type;
}


// ---------- SIGN UP ----------
const signupForm = document.getElementById("signup-form");

// This only runs on pages that have a signup form
if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
        // Stop the browser from reloading the page
        event.preventDefault();

        const button = signupForm.querySelector("button");
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Check the two passwords match before bothering Supabase
        if (password !== confirmPassword) {
            showMessage("Passwords don't match.", "error");
            return;
        }

        // Disable the button so it can't be double-clicked
        button.disabled = true;

        // Send the details to Supabase
        const { error } = await supabaseClient.auth.signUp({
            email: document.getElementById("email").value.trim(),
            password: password,
            options: {
                // Where the confirmation email link sends them back to
                emailRedirectTo: window.location.origin + "/login.html",

                // Extra student details, saved with the account
                data: {
                    full_name: document.getElementById("full-name").value.trim(),
                    school: document.getElementById("school").value.trim(),
                    programme: document.getElementById("programme").value.trim(),
                    student_id: document.getElementById("student-id").value.trim(),
                    age: Number(document.getElementById("age").value),
                    level: document.getElementById("level").value.trim()
                }
            }
        });

        button.disabled = false;

        if (error) {
            showMessage(error.message, "error");
            return;
        }

        showMessage("Account created! Check your email to confirm it, then log in.", "success");
        signupForm.reset();
    });
}
// ---------- LOG IN ----------
const loginForm = document.getElementById("login-form");

// This only runs on pages that have a login form
if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const button = loginForm.querySelector("button");
        button.disabled = true;

        const { error } = await supabaseClient.auth.signInWithPassword({
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value
        });

        button.disabled = false;

        if (error) {
            showMessage(error.message, "error");
            return;
        }

        // Logged in: send them to the dashboard
        window.location.href = "dashboard.html";
    });
}