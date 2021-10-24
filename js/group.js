var input_bar = document.getElementById("input-bar");
var arrow = document.getElementById("location-arrow");
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
    console.log(e.target);
    var userName = document.querySelector("#user-name>h2");
    userName.innerHTML = e;
    if (window.innerWidth < 625) {
        var contentDisp1 = document.getElementById("grid-item-1");
        var contentDisp2 = document.getElementById("grid-item-2");
        let backBtn = document.getElementsByClassName("backButton")
        contentDisp1.style.display = "none";
        contentDisp2.style.display = "unset";
        backBtn[0].addEventListener('click', (e) => {
            contentDisp1.style.display = "unset";
            contentDisp2.style.display = "none";
        })
    }
}
window.onload = () => {
    var userName = document.querySelector("#user-name>h2");
    let fName = document.getElementById("name");
    userName.innerHTML = fName.innerText;
}

function searchByName() {
    let chatBody = document.getElementsByClassName('chatHeadingBody');

    for (let i = 0; i < chatBody.length; i++) {
        var inputedString;
        inputedString = document.getElementById("search"); 
        let filter = inputedString.value;
        let chatMessage = document.getElementsByClassName("chat-message");
        let userName = chatBody[i].firstElementChild.firstElementChild.innerHTML;
        if(userName.toString().match(new RegExp('.*' + filter + '.*', "i"))){
            chatMessage[i].style.display = "";
            chatMessage[i].attributes[0].value= "";
        }
        else {
            chatMessage[i].style.display = "none";
        }
    }
    inputedString = document.getElementsByClassName('search');

}