let charName = document.getElementById('name');
const Name = `Deku`;
charName.innerText = Name;
let button = document.getElementById('btn');
let buttonText = document.getElementById('btn-text');
let voice = document.getElementById('loader');
let inputBox = document.getElementById('input-box');
let charImg = document.getElementById('chrImg');

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.8;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}

let speechReco = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechReco()

recognition.onresult = (e) => {
    // console.log(e);
    let script = e.results[0][0].transcript;
    console.log(script);
    inputBox.innerHTML = script.toUpperCase();
    takeCommand(script.toLowerCase());
}

button.addEventListener("click", () => {
    recognition.start()
    buttonText.style.display = "none";
    voice.style.display = "flex";
    setTimeout(() => {
        buttonText.style.display = "flex";
        voice.style.display = "none";
    }, 7000);
})

function takeCommand(command) {
    voice.style.display = "none";
    buttonText.style.display = "flex";
    inputBox.style.display = "block";
    charImg.classList.add("side-border-animation");
    setTimeout(() => {
        charImg.classList.remove("side-border-animation", "screenOpening-animation");
    }, 4000);

    if (command.includes("search")) {
        let finalMsg = command.replace("search", '');
        speak(`Searching ${finalMsg}`);
        window.open(`https://www.google.com/search?q=${finalMsg}`);
    }
    else if (command.includes("how are you") || command.includes("how r u")) {
        speak("I am fine, how can I help you?");
    }
    else if (command.includes("what can you do") || command.includes("what could you do") || command.includes("how can you help")) {
        speak(`I can perform small tasks, such as opening applications and websites. I can search for anything you need, and I can also tell you the current time and date.`);
    }
    else if (command.includes('hello') || command.includes('hey')) {
        speak("Hello sir, how can I help you?");
    }
    else if (command.includes('what is your name') || command.includes("what's your name")) {
        speak(`My name is ${Name}, I am a virtual assistant.`);
    }
    else if (command.includes('who are you') || command.includes('who r u') || command.includes('hu r u')) {
        speak(`I am ${Name}. A virtual assistant created by Mr. Samir.`)
    }
    else if (command.includes('open calculator')) {
        speak(`Opening calculator.`);
        window.open("calculator://")
    }
    else if (command.includes('open whatsapp')) {
        speak(`Opening whatsapp.`);
        window.open("whatsapp://")
    }
    else if (command.includes('open linkedin')) {
        speak(`Opening linkedin.`);
        window.open("linkedin://")
    }
    else if (command.includes('time')) {
        let time = new Date().toLocaleString(undefined,{hour:"numeric", minute:"numeric"})
        speak(time);
    }
    else if (command.includes('date')) {
        let date = new Date().toLocaleString(undefined,{day:"numeric", month:"short"})
        speak(date);
    }
    else if (command.includes("open")) {
        let finalMsg = command.replace("open", '');
        speak(`opening ${finalMsg}.`);
        // console.log(finalMsg, finalMsg.length);
        let temp = ''
        for (let i = 0; i < finalMsg.length; i++) {
            temp = finalMsg.replace(" ", '');
            finalMsg = temp;
        }
        // console.log(temp)
        let finalMsg2 = finalMsg;
        window.open(`https://www.${finalMsg2}.com/`);
    }
    else {
        let finalMsg = command.replace(`${Name}`, '');
        speak(`This is what I found regarding ${finalMsg}`);
        window.open(`https://www.google.com/search?q=${finalMsg}`);
    }
}