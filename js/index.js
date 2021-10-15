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
  // firebase.database().ref("student/" + "test")
  // .set({
  //   email: "test@gla.com",
  //   password: "froshHubTeam"
  // });
  if (localStorage.getItem("remembered")) {
    document.getElementById("mail").value = localStorage.getItem("user-email");
    document.getElementById("m-mail").value =
      localStorage.getItem("user-email");
    document.getElementById("pass").value = localStorage.getItem("user-pass");
    document.getElementById("m-pass").value = localStorage.getItem("user-pass");
  }
};

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
  let loading = event.target.childNodes[event.target.childNodes.length - 2];
  event.preventDefault();
  loading.style.display="block";
  let i = 0;
  const loadEvent = setInterval(() => {
    if(i%4 === 0) loading.innerHTML = "Validating<b>.</b>...";
    if(i%4 === 1) loading.innerHTML = "Validating.<b>.</b>..";
    if(i%4 === 2) loading.innerHTML = "Validating..<b>.</b>.";
    if(i%4 === 3) loading.innerHTML = "Validating...<b>.</b>";
    i++;
  }, 200);
  firebase.database().ref("student/" + email.split("@")[0])
  .on("value", function(snap){
    clearInterval(loadEvent);
    loading.style.display="none";
    if((email !== snap.val().email) || (pass !== snap.val().password)){
      alert("Invalid email id or password");
    }
    else{
      window.location = "./pages/homepage.html";
    }
  })

  if (remembered) {
    localStorage.setItem("remembered", true);
    localStorage.setItem("user-email", email);
    localStorage.setItem("user-pass", pass);
  }
}
