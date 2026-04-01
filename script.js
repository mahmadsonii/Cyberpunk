const alifbo = "аабвгғдеёжзийӣкқлмнопрстуӯфхҳчҷшъэюя".split("");
const voiceData = {}; 
const grid = document.getElementById('alphabetGrid');
const btnSpeak = document.getElementById('btnSpeak');
const textInput = document.getElementById('textInput');

// 1. Сохтани тугмаҳои алифбо
alifbo.forEach(char => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.innerText = char.toUpperCase();
    btn.onclick = () => record(char, btn);
    grid.appendChild(btn);
});

// 2. Функсияи сабти овоз
async function record(char, btn) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        let chunks = [];

        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            voiceData[char] = URL.createObjectURL(blob);
            btn.classList.add('recorded');
        };

        btn.innerText = "REC";
        recorder.start();
        
        setTimeout(() => {
            recorder.stop();
            btn.innerText = char.toUpperCase();
            // Хомӯш кардани микрофон баъди сабт
            stream.getTracks().forEach(track => track.stop());
        }, 1000); // 1 сония барои ҳар як ҳарф кифоя аст

    } catch (err) {
        alert("Хатогӣ дар дастрасии микрофон!");
    }
}

// 3. Функсияи хондан
function speakText() {
    const text = textInput.value.toLowerCase();
    let i = 0;

    function play() {
        if (i < text.length) {
            const char = text[i];
            if (char === " ") {
                setTimeout(() => { i++; play(); }, 400);
            } else if (voiceData[char]) {
                const audio = new Audio(voiceData[char]);
                audio.onended = () => { i++; play(); };
                audio.play();
            } else {
                i++; play();
            }
        }
    }
    play();
}

btnSpeak.onclick = speakText;
document.getElementById('btnClear').onclick = () => textInput.value = "";
