var store_email;
function staticAuth(){
    localStorage.setItem("email","test@gla.com");
    localStorage.setItem("pass","froshHubTeam");
}
staticAuth();
function readForm(){
    let email= document.getElementById("mail").value;
    let pass =document.getElementById("pass").value;
    return {email, pass};
}
function rememberMe(e){
    document.cookie=`email={}`;
    console.log(e);
}
function verification(){
    const {email, pass} = readForm();
    if((email === localStorage.getItem("email")) && pass === localStorage.getItem("pass")){
        alert("verified");
    }
    else{
        alert("incorrect");
    }
}
