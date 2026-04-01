// Мо аз API-и системавӣ истифода мебарем
const btnSpeak = document.getElementById('btnSpeak');
const textInput = document.getElementById('textInput');

function speakText() {
    const text = textInput.value;
    
    // Санҷиш: Оё браузер овозҳоро дастгирӣ мекунад?
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Танзими забон ба Тоҷикӣ
        // Диққат: Ин дар браузерҳое кор мекунад, ки пакети тоҷикӣ доранд (масалан Edge)
        utterance.lang = 'tg-TJ'; 
        
        // Танзими суръат ва оҳанг
        utterance.rate = 0.9; // Суръати муқаррарӣ
        utterance.pitch = 1.0; // Оҳанги овоз
        
        // Пайдо кардани овози тоҷикӣ дар система
        const voices = window.speechSynthesis.getVoices();
        const tgVoice = voices.find(v => v.lang.includes('tg') || v.name.includes('Tajik'));
        
        if (tgVoice) {
            utterance.voice = tgVoice;
        }

        window.speechSynthesis.speak(utterance);
    } else {
        alert("Браузери шумо AI-TTS-ро дастгирӣ намекунад.");
    }
}

btnSpeak.onclick = speakText;

// Барои он ки овозҳо бор шаванд
window.speechSynthesis.onvoiceschanged = () => {
    console.log("Овозҳо омода шуданд");
};
