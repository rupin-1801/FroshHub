var store_email;

function staticAuth() {
  localStorage.setItem("email", "test@gla.com");
  localStorage.setItem("pass", "froshHubTeam");
}
staticAuth();
function readForm(form) {
  email = document.getElementById(form[0].id).value;
  pass = document.getElementById(form[1].id).value;
  return { email, pass };
}

function verification(event) {
  const { email, pass } = readForm(event.target);
  if (
    email === localStorage.getItem("email") &&
    pass === localStorage.getItem("pass")
  ) {
    console.log("verified");
  } else {
    alert("incorrect");
  }
}
