// Dom
const i = document.getElementById.bind(document);
const qa = document.querySelectorAll.bind(document);

const btnStartChat = i('btn-start');
const overlay = i('bg');
const chatContainer = i('chat-container');

/* 
* Toggle Chat container
*/

function toggleChat() {
    var cond = chatContainer.classList.contains('show');
    if(cond) {
        overlay.classList.add('hidden');
        chatContainer.classList.remove('show');
    }else {
        overlay.classList.remove('hidden');
        chatContainer.classList.add('show');
    }
}

btnStartChat.addEventListener('click', toggleChat);

// Update date
function getDate(t) {
    return ('0'+t).slice(-2);
}

var time = new Date();
var [minute, second] = [getDate(time.getHours()), time.getMinutes()];
i('chat-time-start').innerHTML = `Today at ${minute}:${second}`;

/* 
* Fake chat
*/

const chatArea = i('msgs');

var chatEnded = false;
var indx = 0;

getReceived();

function getReceived() {
    if(!chatEnded) {
        var qts = questions[indx].msgs;
        for(var i = 0; i < qts.length; i++) {
            var qs = qts[i];
            var div = document.createElement('div');
            div.classList.add('msg', 'received');
            div.innerHTML = qs;
            chatArea.appendChild(div);
        }
    }
}

/* 
* Form submition
*/

const form = i('form');
const input = i('input');

form.addEventListener('submit', function(e) {
    if(input.value) {
        e.preventDefault();
        sendMsg(input.value);
        input.value = '';
    }
    indx++;
    if(indx > questions.length - 1) chatEnded = true;
    getReceived();
})

function sendMsg(msg) {
    var div = document.createElement('div');
    div.classList.add('msg', 'sended');
    div.innerHTML = msg;
    chatArea.appendChild(div);
}