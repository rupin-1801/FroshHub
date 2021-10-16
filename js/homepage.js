const profile = document.getElementById("fh-profile");
const profileIcon = document.getElementById("fh-profile-icon");
const sidebar = document.getElementById("fh-sidebar");
const options = document.getElementsByClassName("fh-nav-options");
const iframe = document.getElementById("fh-iframe");
const borderLine = document.getElementById("fh-bottom-line");
const sideOptions = document.getElementsByClassName("fh-nav-side");
const logout = document.getElementsByClassName("fh-sidebar-option")[7];

window.onload = () => {
  profile.checked = false;
};
document.body.onclick = () => {

}
logout.onclick = () => {
  sessionStorage.removeItem("FRID");
  sessionStorage.removeItem("FRSE");
  window.location = "../index.html";
}

function closeSidebar(){
  profile.checked = false;
    profileIcon.style.transform =
          "scale(1) translateY(0px) translateX(0px)";
        setTimeout(() => {
          sidebar.style.width = "400px";
        }, 500);
}

for(let i = 0; i < sideOptions.length; i++){
  sideOptions[i].addEventListener("click", (event) => {
    changePage(`./${event.target.innerHTML}.html`);
    closeSidebar();
  })
}

let indexes = [0, 1, 2, 3];
indexes.map((option) => {
  options[option].addEventListener("click", (event) => {
    changePage(`./${event.target.innerHTML}.html`);
    borderLine.style.transform = `translateX(${20 * option}vw)`;
    closeSidebar();
  });
});

profile.addEventListener("change", (event) => {
  if (event.target.checked) {
    profileIcon.style.transform =
      "scale(1.70) translateY(35px) translateX(10px)";
    setTimeout(() => {
      sidebar.style.width = "650px";
    }, 500);
  } else { 
    profileIcon.style.transform = "scale(1) translateY(0px) translateX(0px)";
    setTimeout(() => {
      sidebar.style.width = "400px";
    }, 500);
  }
});

function changePage(link) {
  iframe.src = link;
}
