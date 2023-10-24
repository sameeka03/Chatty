//Sameeka maroli
//Task: Make a chat app

function sendMessage(){
    var httpRequest = new XMLHttpRequest();
    var aliasName=document.getElementById("aliasTextBox").value;
    var messageText=document.getElementById("messageBox").value;
    let url ="/chats/post/";
    p = fetch(url ,{
      method: 'POST',
      body: JSON.stringify({
        time: new Date().getTime(),
        alias:aliasName,
        message:messageText,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        }
      });

    p.then((response) => {
          console.log("Request Sent");
          document.getElementById("messageBox").innerText="";
        }
    )
    .catch( (error) => {
        console.log('Error');
        console.log(error);
    });
}

function getMessage(){
    let path="/chats/"
    p = fetch(path);//fetching url
        p.then((response) => {
            return response.text();
          })
        .then((text) => { 
          document.getElementById("text").innerHTML=text;

        })
        .catch( (error) => {
          console.log('Error');
          console.log(error);
        });
}

setInterval(getMessage, 1000);
