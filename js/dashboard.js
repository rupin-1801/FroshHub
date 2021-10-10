const containerTop = document.getElementById("fh-container-top");
const click = document.getElementById("click");

const cardMove = () => {
    let child = containerTop.children[0];
    value = child.clientWidth + ((containerTop.offsetWidth - (child.offsetWidth * 3))/3);
    console.log(value);
    if(containerTop.scrollLeft > (containerTop.children.length - 4) * value)
    containerTop.scrollLeft = 0;
    else
    containerTop.scrollLeft += value;
    console.log(containerTop.scrollLeft, 
        (containerTop.children.length - 4) * value);
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
