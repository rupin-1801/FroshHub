const containerTop = document.getElementById("fh-container-top");
const click = document.getElementById("click");
const rightTab = document.getElementById("right-box");
const stories = document.getElementById("stories");
const main = document.getElementsByClassName("fh-main")[0];
const scrollable = document.getElementsByClassName("scrollable")[0];
const addPost = document.getElementsByClassName("fh-add-post")[0];
const backPost = document.getElementById("post-back");
const postTop = rightTab.offsetTop-20;
var openAddPost = false;

rightTab.onclick = (event) => {
    event.stopPropagation();
}

backPost.onclick = () => {
    if(window.innerWidth <= 600){
        openAddPost = false;
        backPost.style.display = "none";
    }
}

window.onresize = () => {
    if(window.innerWidth > 600){
        openAddPost = true;
        backPost.style.display = "inline-flex";
    }   
    else{
        openAddPost = false;
        backPost.style.display = "none";
    }
}

addPost.onclick = () => {
    openAddPost = true;
    backPost.style.display = "inline-flex";
}

scrollable.onscroll = () => {
    if(scrollable.scrollTop >= postTop){
        rightTab.classList.add("fh-sticky");
        stories.classList.add("fh-stickier");
        main.classList.add("inline-main");
    }
    else if(scrollable.scrollTop < postTop){
        rightTab.classList.remove("fh-sticky");
        stories.classList.remove("fh-stickier");
        main.classList.remove("inline-main");
    }
}

const cardMove = () => {
    let child = containerTop.children[0];
    value = child.clientWidth + ((containerTop.offsetWidth - (child.offsetWidth * 3))/3);
    if(containerTop.scrollLeft > (containerTop.children.length - 4) * value)
    containerTop.scrollLeft = 0;
    else
    containerTop.scrollLeft += value;
}

window.onload = () => {
    cardInterval = setInterval(cardMove, 2000);
}
containerTop.addEventListener("mouseleave", ()=> {
    cardInterval = setInterval(cardMove, 2000);
})
containerTop.addEventListener("mouseenter", ()=> {
    clearInterval(cardInterval);
})
