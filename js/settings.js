function goBack() {
  window.history.back();
}

// window.onload = () => {
  // var image = document.getElementById("output");
  // profile = sessionStorage.getItem("profile");
  // image.src = URL.createObjectURL(profile);
// }
var loadFile = function (event) {
  // var image = document.getElementById("output");
  // image.src = URL.createObjectURL(event.target.files[0]);
  let ref = firebase.storage().ref();
  const task = ref.child("profile").put(event.target.files[0], event.target.files[0].type);
  task.then(snap => snap.ref.getDownloadURL())
  .then(url => console.log(url));
};

function removeProfile(event) {
  var image = document.getElementById("output");
  // output.parentNode.removeChild(output);
  image.src = "https://bootdey.com/img/Content/avatar/avatar1.png";
  // URL.revokeObjectURL(image.src);
}
