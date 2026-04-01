const btnSpeak = document.getElementById('btnSpeak');
const textInput = document.getElementById('textInput');
const statusText = document.querySelector('.status');

// Ин функсия овозҳои дар система бударо меҷӯяд
function getTajikVoice() {
    const voices = window.speechSynthesis.getVoices();
    // Кофтугӯи овози тоҷикӣ аз рӯи код (tg-TJ) ё ном
    return voices.find(v => v.lang.includes('tg') || v.name.includes('Tajik') || v.name.includes('Gulnara'));
}

function speakText() {
    const text = textInput.value.trim();
    
    if (!text) {
        alert("Лутфан матнро ворид кунед!");
        return;
    }

    // Сохтани объекти гуфтор
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Танзимоти AI барои табиӣ баромадан
    const tgVoice = getTajikVoice();
    
    if (tgVoice) {
        utterance.voice = tgVoice;
        statusText.innerText = "Система: Овози AI (Tajik) фаъол аст";
    } else {
        // Агар овози махсус наёфт, забони стандартиро мемонем
        utterance.lang = 'tg-TJ';
        statusText.innerText = "Система: Овози стандартӣ (Локалӣ)";
    }

    utterance.rate = 0.9;  // Суръати муътадил (на тез, на суст)
    utterance.pitch = 1.0; // Оҳанги овоз
    utterance.volume = 1.0; // Баландии овоз

    // Пеш аз сар кардан, агар чизе хонда истода бошад, онро қатъ мекунем
    window.speechSynthesis.cancel();
    
    // Иҷрои овоз
    window.speechSynthesis.speak(utterance);

    // Эффект ҳангоми хондан
    utterance.onstart = () => {
        btnSpeak.style.boxShadow = "0 0 25px #00ff41";
        btnSpeak.innerText = "ХОНДА ИСТОДААСТ...";
    };

    utterance.onend = () => {
        btnSpeak.style.boxShadow = "none";
        btnSpeak.innerText = "ХОНДАН";
    };
}

// Дар баъзе браузерҳо овозҳо дертар бор мешаванд
window.speechSynthesis.onvoiceschanged = () => {
    console.log("Овозҳои AI бор шуданд.");
};

btnSpeak.onclick = speakText;

// Тугмаи тоза кардан
document.getElementById('btnClear').onclick = () => {
    textInput.value = "";
    window.speechSynthesis.cancel();
};
        
