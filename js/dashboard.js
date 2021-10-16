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

const newTag = document.getElementById("tag");
const newRole = document.getElementById("role");
const newMessage = document.getElementById("message");

var openAddPost = false;

const postData = {
    name: "Rupin Bhugra",
    tag: "Getting Started",
    role: "Admin",
    message: `This is my first post to make you familiar with how these posts works.
    so there are 3 buttons given below: <br /><br /><b>1. Like: </b>To tell whether this content is
    helpful for you or not.<br /><b>2. Comment: </b>To add your thoughts about the post.<br /><b>3. Share:
    </b> Share to your groups.`,
    comment: "4",
    like: "12",
    time: "2h ago"
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

window.onresize = () => {
  if (window.innerWidth > 600) {
    openAddPost = true;
    backPost.style.display = "inline-flex";
  } else {
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

const cardMove = () => {
  let child = containerTop.children[0];
  value =
    child.clientWidth + (containerTop.offsetWidth - child.offsetWidth * 3) / 3;
  if (containerTop.scrollLeft > (containerTop.children.length - 4) * value)
    containerTop.scrollLeft = 0;
  else containerTop.scrollLeft += value;
};

window.onload = () => {
  cardInterval = setInterval(cardMove, 2000);
  for(let i = 0; i < 3; i++) createStory(postData);
};
containerTop.addEventListener("mouseleave", () => {
  cardInterval = setInterval(cardMove, 2000);
});
containerTop.addEventListener("mouseenter", () => {
  clearInterval(cardInterval);
});

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
        <p class="card-text">${data.message}</p>
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
}

function readPostForm(){
    let data = {
        name:"New Student",
        comment: 0,
        like: 0,
        time: "Now",
    };
    data.tag = newTag.value;
    data.role = newRole.value;
    data.message = newMessage.value;
    return data;
}

publish.addEventListener("click", (event) => {
  event.preventDefault();
  let data = readPostForm();
  if(data.tag !== "" && data.role !== "" && data.message !== ""){
    createStory(data);
    newTag.value="";
    newRole.value="";
    newMessage.value="";
  }
});