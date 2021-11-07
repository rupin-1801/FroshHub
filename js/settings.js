function goBack() {
  window.history.back();
}

var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

function removeProfile(event) {
  var image = document.getElementById("output");
  // output.parentNode.removeChild(output);
  image.src = "../util/profile.png";
  // URL.revokeObjectURL(image.src);
}

