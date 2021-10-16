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
    if(emoji.checked){
        emojiBox.style.display = "unset";
    }
});