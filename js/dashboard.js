const containerTop = document.getElementById("fh-container-top");
const click = document.getElementById("click");
const rightTab = document.getElementById("right-box");

const postTop = rightTab.offsetTop-20;

document.onscroll = () => {
    if(window.pageYOffset >= postTop){
        rightTab.classList.add("fh-sticky");
    }
    else if(window.pageYOffset < postTop){
        rightTab.classList.remove("fh-sticky");
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
