var mic = document.getElementById("microphone");
var input_bar = document.getElementById("input-bar");
var arrow = document.getElementById("location-arrow");
console.log(mic, input_bar);
var count = 0;
input_bar.addEventListener("keyup", () => {
    if (input_bar.value !== "") {
        mic.style.display = "none";
        arrow.style.display = "block";
    }
    else if (input_bar.value === "") {
        mic.style.display = "block";
        arrow.style.display = "none";
    }

})
var emoji = document.querySelector("#emoji");
emoji.addEventListener('click', () => {
    var emojiBox = document.querySelector('.emojiPicker')
    if (!emoji.checked) {
        emojiBox.style.display = "none";
    }
    if (emoji.checked) {
        emojiBox.style.display = "unset";
    }
});
var selectedEmoji = document.getElementsByClassName("selectEmoji");
for (let i = 0; i < selectedEmoji.length; i++) {
    selectedEmoji[i].addEventListener('click', (e) => {
        input_bar.value += e.target.innerHTML;
    })
}
function changeUserName(e) {
    var userName = document.querySelector("#user-name>h2");
    userName.innerHTML = e;
}
window.onload = () => {
    var userName = document.querySelector("#user-name>h2");
    let fName = document.getElementById("name");
    userName.innerHTML = fName.innerText;
}
let chatHeadingBody= document.getElementsByClassName("chatHeadingBody");
let contentDisp1 = document.getElementById("grid-item-1");
let contentDisp2 = document.getElementById("grid-item-2");
for( let i = 0;i<chatHeadingBody.length;i++){
    chatHeadingBody[i]=addEventListener('click',(e)=>{
        console.log(contentDisp1);
        contentDisp1.style.display = "none";
        contentDisp2.style.display = "unset";
    })
}
window.onresize= () => {
    if (window.innerWidth<625){
        console.log("hello")

    }
}