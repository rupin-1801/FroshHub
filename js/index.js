var store_email, email, pass, remembered;

const remember = document.getElementById("remember");
const mRemember = document.getElementById("m-remember");

window.onload = () => {
  staticAuth();
  if (localStorage.getItem("remembered")) {
    document.getElementById("mail").value = localStorage.getItem("user-email");
    document.getElementById("m-mail").value =
      localStorage.getItem("user-email");
    document.getElementById("pass").value = localStorage.getItem("user-pass");
    document.getElementById("m-pass").value = localStorage.getItem("user-pass");
  }
};

function staticAuth() {
  localStorage.setItem("email", "test@gla.com");
  localStorage.setItem("pass", "froshHubTeam");
}

function readForm(form) {
  email = document.getElementById(form[0].id).value;
  pass = document.getElementById(form[1].id).value;
}

remember.addEventListener("change", () => {
  remembered = !remembered;
});

mRemember.addEventListener("change", () => {
  remembered = !remembered;
});

function verification(event) {
  readForm(event.target);
  if (
    email !== localStorage.getItem("email") ||
    pass !== localStorage.getItem("pass")
  ) {
    alert("Invalid email id or password!");
    event.preventDefault();
  }
  if (remembered) {
    localStorage.setItem("remembered", true);
    localStorage.setItem("user-email", email);
    localStorage.setItem("user-pass", pass);
  }
}
