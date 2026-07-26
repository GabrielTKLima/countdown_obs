let countdownInterval = null;
let totalSeconds = 300;
let remainingSeconds = 300;
let isRunning = false;

const display = document.getElementById('timer-display');
const configPanel = document.getElementById('config-panel');
const minInput = document.getElementById('minutes');
const secInput = document.getElementById('seconds');
const endTextInput = document.getElementById('end-text');

const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateDisplay() {
    if (remainingSeconds <= 0) {
        display.innerText = endTextInput.value || "INICIANDO";
        display.classList.add('finished');
        clearInterval(countdownInterval);
        isRunning = false;
    } else {
        display.innerText = formatTime(remainingSeconds);
        display.classList.remove('finished');
    }
}

function startTimer() {
    if (isRunning) return;
    
    // Se o tempo estiver em zero, carrega os valores dos inputs
    if (remainingSeconds <= 0) {
        const mins = parseInt(minInput.value) || 0;
        const secs = parseInt(secInput.value) || 0;
        totalSeconds = (mins * 60) + secs;
        remainingSeconds = totalSeconds;
    }

    if (remainingSeconds <= 0) return;

    isRunning = true;
    configPanel.classList.add('hidden'); // Esconde o painel automaticamente ao iniciar
    updateDisplay();

    countdownInterval = setInterval(() => {
        remainingSeconds--;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    clearInterval(countdownInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(countdownInterval);
    isRunning = false;
    const mins = parseInt(minInput.value) || 0;
    const secs = parseInt(secInput.value) || 0;
    totalSeconds = (mins * 60) + secs;
    remainingSeconds = totalSeconds;
    display.classList.remove('finished');
    updateDisplay();
}

// Atualiza a tela em tempo real se o usuário mudar os inputs enquanto parado
minInput.addEventListener('input', () => { if (!isRunning) resetTimer(); });
secInput.addEventListener('input', () => { if (!isRunning) resetTimer(); });
endTextInput.addEventListener('input', () => { if (!isRunning && remainingSeconds <= 0) updateDisplay(); });

btnStart.addEventListener('click', startTimer);
btnPause.addEventListener('click', pauseTimer);
btnReset.addEventListener('click', resetTimer);

// Duplo clique na tela alterna a visibilidade do painel de configuração
window.addEventListener('dblclick', () => {
    configPanel.classList.toggle('hidden');
});

// Inicializa com os valores padrão ao carregar
resetTimer();