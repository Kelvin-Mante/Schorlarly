const SUPABASE_URL = "https://ufziathygtqlbjapwkrn.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ss4cLwL-E-TAi9flBL_PLg_ACx49RlI";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
function showMessage(el, text, type) {
  el.textContent = text;
  el.className = "message " + type;
}

function initSignupForm() {
  const form = document.getElementById("signupForm");
  if (!form) return;
  const messageEl = document.getElementById("message");
  const btn = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    btn.disabled = true;
    btn.textContent = "Signing up...";
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) {
      showMessage(messageEl, error.message, "error");
      btn.disabled = false;
      btn.textContent = "Sign Up";
      return;
    }
    showMessage(messageEl, "Account created! Check your email to confirm, then log in.", "success");
    btn.disabled = false;
    btn.textContent = "Sign Up";
  });
}

function initLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  const messageEl = document.getElementById("message");
  const btn = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    btn.disabled = true;
    btn.textContent = "Logging in...";
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      showMessage(messageEl, error.message, "error");
      btn.disabled = false;
      btn.textContent = "Log In";
      return;
    }
    showMessage(messageEl, "Logged in! Redirecting...", "success");
    setTimeout(() => { window.location.href = "dashboard.html"; }, 800);
  });
}

async function guardDashboard() {
  const guardEl = document.getElementById("guardOnly");
  if (!guardEl) return;
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
    return;
  }
  const emailEl = document.getElementById("userEmail");
  if (emailEl) emailEl.textContent = session.user.email;
}

function initLogoutButton() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;
  logoutBtn.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "login.html";
  });
}

initSignupForm();
initLoginForm();
guardDashboard();
initLogoutButton();