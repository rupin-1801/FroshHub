var input_bar = document.getElementById("input-bar");
var arrow = document.getElementById("location-arrow");
var emoji = document.querySelector("#emoji");
const chatContainer = document.getElementById("grid-item-1-a");
var selectedEmoji = document.getElementsByClassName("selectEmoji");
const chatTime = document.getElementsByClassName("time");
var curUserName;
var onLoad = document.getElementById("onLoad");
var displayChatMessage;
var displayChatTime;
window.onload = () => {
    firebase.database().ref(`student/testglacom/chats/`).on("value", function (chatData) {
        chatContainer.innerHTML ="";
        let chats = chatData.val();
        let ind = 0;
        for (let i in chats) {
            console.log(chats[i].name)
        }
        for (let i in chats) {
            let len = Object.keys(chats[i]).length;
            if(len === 1){
                chats[i] = {
                    0:{time:"now",
                    message: "type your message"
                },
                name: chats[i].name,
            }
            len = 2;
            }
            chatContainer.innerHTML += `<div id="item-${ind + 2}" class="fh chat-message">
        <div class="fh chat-card">
            <div id="user-logo">
                <a href="">
                    <i class="fas fa-users"></i>
                </a>
            </div>
            <div id="chat-heading-body" class="chatHeadingBody" onclick="changeUserName('${chats[i].name}')">
                <div id="heading">
                    <p id="name">${chats[i].name}</p>
                    <p class="time">${chats[i][len - 2].time}</p>
                    
                </div>
                <!-- <hr id="h-row"> -->
                <div id="chat-body">
                    <p id="message-body">${chats[i][len - 2].message}</p>
                </div>
            </div>
        </div>
    </div>`;
            ind++;
        }
    });
}
for (let i = 0; i < selectedEmoji.length; i++) {
    selectedEmoji[i].addEventListener('click', (e) => {
        input_bar.value += e.target.innerHTML;
    })
}
var curUserName = "";
emoji.addEventListener('click', () => {
    var emojiBox = document.querySelector('.emojiPicker')
    if (!emoji.checked) {
        emojiBox.style.display = "none";
    }
    if (emoji.checked) {
        emojiBox.style.display = "flex";
    }
});
var messageContainer = document.getElementById("chat-content")
function changeUserName(e) {
    var userName = document.querySelector("#user-name>h2");
    userName.innerHTML = e;
    curUserName = e;
    onLoad.style.display = "none";
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
    firebase.database().ref(`student/testglacom`).on("value", function (snap) {
        messageContainer.innerHTML = '';
        if (snap.val().chats && snap.val().chats[curUserName]) {
            user = snap.val().chats[curUserName];
            for (var i in user) {
                if (i !== "name") {
                    addMessage(user[i]);
                }
            }
        }
    })
}
function searchByName() {
    let chatBody = document.getElementsByClassName('chatHeadingBody');
    for (let i = 0; i < chatBody.length; i++) {
        var inputedString;
        inputedString = document.getElementById("search");
        let filter = inputedString.value;
        let chatMessage = document.getElementsByClassName("chat-message");
        let userName = chatBody[i].firstElementChild.firstElementChild.innerHTML;
        if (userName.toString().match(new RegExp('.*' + filter + '.*', "i"))) {
            chatMessage[i].style.display = "";
            chatMessage[i].attributes[0].value = "";
        }
        else {
            chatMessage[i].style.display = "none";
        }
    }
    inputedString = document.getElementsByClassName('search');

}

function sendMessage(e) {
    e.preventDefault();
    let hr = (new Date().getHours() % 12);
    let min = new Date().getMinutes();
    if (input_bar.value === "") {
        return;
    }
    time = ((hr < 10) ? "0" : "") + hr + ":" + ((min < 10) ? "0" : "") + min + ((new Date().getHours() < 12) ? " am" : " pm");
    addMessage({ message: input_bar.value, time: time });
    let index = -1;
    firebase.database().ref(`student/testglacom/`).on("value", function (snap) {
        if (snap.val().chats && snap.val().chats[curUserName]) {
            index = Object.keys(snap.val().chats[curUserName]).length - 1;
        }
    });
    if (index === -1) index = 0;
    firebase.database().ref(`student/testglacom/chats/${curUserName}/${index}`).set(
        {
            message: input_bar.value,
            time: time
        }
    )
    input_bar.value = "";
}
function addMessage(data) {
    let newElement = document.createElement("div");
    let childMessage = document.createElement("div");
    newElement.classList.add("chatBox");
    childMessage.classList.add("messageDiv");
    childMessage.innerHTML = `${data.message}<br> <p id = "messageTime">${data.time}</p>`;
    newElement.appendChild(childMessage);
    messageContainer.appendChild(newElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}