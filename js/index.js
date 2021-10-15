var store_email, email, pass, remembered;

const remember = document.getElementById("remember");
const mRemember = document.getElementById("m-remember");
const eye = document.getElementsByClassName("show")[0];
const passField = document.getElementById("pass");

eye.onclick = () => {
  if(eye.classList.contains("far")){
    eye.classList.remove("fa-eye");
    eye.classList.remove("far");
    eye.classList.add("fa-eye-slash");
    eye.classList.add("fas");
    passField.type="text";
    passField.style.letterSpacing ="0px";
  }
  else{
    eye.classList.remove("fa-eye-slash");
    eye.classList.remove("fas");
    eye.classList.add("fa-eye");
    eye.classList.add("far");    
    passField.type="password";
    passField.style.letterSpacing ="3px";
  }
}

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
