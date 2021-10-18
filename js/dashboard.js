const containerTop = document.getElementById("fh-container-top");
const click = document.getElementById("click");
const rightTab = document.getElementById("right-box");
const stories = document.getElementById("stories");
const main = document.getElementsByClassName("fh-main")[0];
const scrollable = document.getElementsByClassName("scrollable")[0];
const addPost = document.getElementsByClassName("fh-add-post")[0];
const backPost = document.getElementById("post-back");
const publish = document.getElementById("publish");
const postTop = rightTab.offsetTop - 20;
const formatList = document.getElementsByClassName("format-item");
const newTag = document.getElementById("tag");
const newMessage = document.getElementById("message");

var openAddPost = false;

window.onload = () => {
  cardInterval = setInterval(cardMove, 2000);
  // renderPost();
};
window.onresize = () => {
  if (window.innerWidth > 600) {
    openAddPost = true;
    backPost.style.display = "inline-flex";
  } else {
    openAddPost = false;
    backPost.style.display = "none";
  }
};

for (let i = 0; i < 6; i++) {
  formatList[i].addEventListener("click", () => {
    if (i == 0) useFormat("B");
    if (i == 1) useFormat("I");
    if (i == 2) useFormat("U");
    if (i == 3) useFormat("OL");
    if (i == 4) useFormat("UL");
    if (i == 5) useFormat("L");
  });
}

rightTab.onclick = (event) => {
  event.stopPropagation();
};
backPost.onclick = () => {
  if (window.innerWidth <= 600) {
    openAddPost = false;
    backPost.style.display = "none";
  }
};
addPost.onclick = () => {
  openAddPost = true;
  backPost.style.display = "inline-flex";
};
scrollable.onscroll = () => {
  if (scrollable.scrollTop >= postTop) {
    rightTab.classList.add("fh-sticky");
    stories.classList.add("fh-stickier");
    main.classList.add("inline-main");
  } else if (scrollable.scrollTop < postTop) {
    rightTab.classList.remove("fh-sticky");
    stories.classList.remove("fh-stickier");
    main.classList.remove("inline-main");
  }
};


containerTop.addEventListener("mouseleave", () => {
  cardInterval = setInterval(cardMove, 2000);
});
containerTop.addEventListener("mouseenter", () => {
  clearInterval(cardInterval);
});
newMessage.addEventListener("keydown", (event) => {
  message = newMessage.value;

  if (
    event.key === "Backspace" &&
    message[newMessage.selectionEnd - 1] === ">"
  ) {
    event.preventDefault();
    closing = false;
    for (let i = newMessage.selectionEnd - 1; i >= 0; i--) {
      if (message[i] === "<") {
        openFirst = i;
        if (closing) curTag = message.slice(i + 2, newMessage.selectionEnd - 1);
        else curTag = message.slice(i + 1, newMessage.selectionEnd - 1);
        break;
      } else if (message[i] === "/") {
        closing = true;
      }
    }

    if (closing) {
      close = false;
      for (let i = openFirst; i >= 0; i--) {
        if (message[i] === ">" && !close) {
          closeSecond = i;
          close = true;
        }
        if (close && message[i] === "<") {
          if (message.slice(i + 1, closeSecond) === curTag) {
            openSecond = i;
            break;
          } else {
            close = false;
          }
        }
      }
      newMessage.value =
        message.slice(0, openSecond) +
        message.slice(closeSecond + 1, openFirst) +
        message.slice(newMessage.selectionEnd, message.length);
      newMessage.selectionEnd = openSecond + (openFirst - closeSecond - 1);
    } else {
      open = false;
      for (let i = newMessage.selectionEnd; i < message.length; i++) {
        if (message[i] === "<" && !open) {
          openSecond = i;
          open = true;
        }
        if (open && message[i] === ">") {
          closeSecond = i;
          break;
        }
      }
      start = newMessage.selectionEnd;
      newMessage.value =
        message.slice(0, openFirst) +
        message.slice(newMessage.selectionEnd, openSecond) +
        message.slice(closeSecond + 1, message.length);
      newMessage.selectionEnd = openFirst + (openSecond - start);
    }
  }

  li = message.slice(newMessage.selectionEnd, newMessage.selectionEnd + 4);
  tag = message.slice(newMessage.selectionEnd, newMessage.selectionEnd + 5);
  if (
    event.key === "Enter" &&
    (li === "<li>" || tag === "</ol>" || tag === "</ul>")
  ) {
    event.preventDefault();
    useFormat("LI");
  }
});
publish.addEventListener("click", (event) => {
  event.preventDefault();
  let data = readPostForm();
  if (data.tag !== "" && data.message !== "") {
    firebase
      .database()
      .ref("student/posts")
      .on("value", function (snap) {
        sessionStorage.setItem("FRPL", snap.val().length);
      });
    // uploadPost(data);
    // renderPost();
    newTag.value = "";
    newMessage.value = "";
  }
});

function cardMove(){
  let child = containerTop.children[0];
  value =
    child.clientWidth + (containerTop.offsetWidth - child.offsetWidth * 3) / 3;
  if (containerTop.scrollLeft > (containerTop.children.length - 4) * value)
    containerTop.scrollLeft = 0;
  else containerTop.scrollLeft += value;
};
function readSession() {
  let name = sessionStorage.getItem("FRNM");
  let role = sessionStorage.getItem("FRL");
  return { name, role };
};
function createStory(data) {
  const fhStory = document.createElement("div");
  fhStory.classList.add("fh-story");
  fhStory.classList.add("card");
  fhStory.innerHTML = `
  <div class="card-body">
  <header class="fh-card-title-box">
  <i class="fas fa-user-circle"></i>
  <div class="fh-name-box">
  <p># ${data.tag}</p>
  <p class="fh-name">
  <span class="card-title">${data.name}</span>
  <span> @${data.role}</span>
  <div class="fh-time">${data.time}</div>
  </p>
  </div>
  </header>
  <div class="card-text">${data.message}</div>
        </div>
        <div class="card-footer">
    <ul class="nav nav-pills nav-fill">
    <li class="nav-item">
    <i class="far fa-comment"></i>
    ${data.comment}
    </li>
    <li class="nav-item">
    <i class="far fa-thumbs-up"></i>
    ${data.like}
    </li>
    <li class="nav-item">
    <i class="far fa-share-square"></i>
    </li>
    </ul>
  </div>`;
  stories.prepend(fhStory);
};
function readPostForm() {
  let { name, role } = readSession();
  data = {
    name: name,
    role: role,
    comment: 0,
    like: 0,
    time: "now",
  };
  data.tag = newTag.value;
  data.message = newMessage.value;
  return data;
};
function useFormat(type) {
  let start = newMessage.selectionStart;
  let end = newMessage.selectionEnd;
  let text = newMessage.value;
  if (type === "B") {
    newMessage.value =
      text.slice(0, start) +
      "<b>" +
      text.slice(start, end) +
      "</b>" +
      text.slice(end, text.length);
    newMessage.focus();
    if (end - start > 0) newMessage.selectionEnd = end + 7;
    else newMessage.selectionEnd = start + 3;
  } else if (type === "I") {
    newMessage.value =
      text.slice(0, start) +
      "<i>" +
      text.slice(start, end) +
      "</i>" +
      text.slice(end, text.length);
    newMessage.focus();
    if (end - start > 0) newMessage.selectionEnd = end + 7;
    else newMessage.selectionEnd = start + 3;
  } else if (type === "U") {
    newMessage.value =
      text.slice(0, start) +
      "<u>" +
      text.slice(start, end) +
      "</u>" +
      text.slice(end, text.length);
    newMessage.focus();
    if (end - start > 0) newMessage.selectionEnd = end + 7;
    else newMessage.selectionEnd = start + 3;
  } else if (type === "OL") {
    newMessage.value =
      text.slice(0, start) +
      "<ol><li>" +
      text.slice(start, end) +
      "</ol>" +
      text.slice(end, text.length);
    newMessage.focus();
    if (end - start > 0) newMessage.selectionEnd = end + 13;
    else newMessage.selectionEnd = start + 8;
  } else if (type === "UL") {
    newMessage.value =
      text.slice(0, start) +
      "<ul><li>" +
      text.slice(start, end) +
      "</ul>" +
      text.slice(end, text.length);
    newMessage.focus();
    if (end - start > 0) newMessage.selectionEnd = end + 13;
    else newMessage.selectionEnd = start + 8;
  } else if (type === "L") {
    newMessage.value =
      text.slice(0, start) +
      `<a href='' target='_blank'>` +
      text.slice(start, end) +
      "</a>" +
      text.slice(end, text.length);
    newMessage.focus();
    if (end - start > 0) newMessage.selectionEnd = start + 9;
    else newMessage.selectionEnd = start + 11;
  } else if (type === "LI") {
    newMessage.value =
      text.slice(0, start) +
      "<li>" +
      text.slice(start, end) +
      text.slice(end, text.length);
    newMessage.focus();
    newMessage.selectionEnd = start + 4;
  }
};
function renderPost() {
  stories.innerHTML = "";
  firebase
    .database()
    .ref("student/posts")
    .on("value", function (snap) {
      snap.val().forEach((element) => {
        createStory(element);
      });
    });
};
function uploadPost(post) {
  index = sessionStorage.getItem("FRPL");
  firebase
    .database()
    .ref("student/posts/" + index)
    .set(post);
};
