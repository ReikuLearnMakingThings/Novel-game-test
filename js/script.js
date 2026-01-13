let currentLabel = "start";
let step = 0;
let isTyping = false;
let typeTimer;
let audioUnlocked = false;

function unlockAudio() {
    if (audioUnlocked) return;
    const talk = document.getElementById('talk-sound');
    const click = document.getElementById('click-sound');
    talk.play().then(() => { talk.pause(); talk.currentTime = 0; });
    click.play().then(() => { click.pause(); click.currentTime = 0; });
    audioUnlocked = true;
}

function playVoice() {
    const audio = document.getElementById('talk-sound');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

function playClick() {
    const audio = document.getElementById('click-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

function createClickEffect(e) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
}

function startGame() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    render();
}

function render() {
    const data = storyData[currentLabel][step];
    const textEl = document.getElementById('text-display');
    const nameEl = document.getElementById('name-tag');
    const spriteImg = document.getElementById('main-sprite');
    const bgEl = document.getElementById('bg-layer');
    const choiceOverlay = document.getElementById('choice-overlay');

    choiceOverlay.innerHTML = "";
    choiceOverlay.classList.add('hidden');
    nameEl.innerText = data.name;

    if (data.bg) bgEl.style.backgroundImage = `url('${data.bg}')`;

    if (data.sprite) {
        spriteImg.src = data.sprite;
        spriteImg.style.opacity = "1";
    } else {
        spriteImg.style.opacity = "0";
    }

    if (data.choices) {
        choiceOverlay.classList.remove('hidden');
        data.choices.forEach(c => {
            const btn = document.createElement('button');
            btn.className = "btn-choice";
            btn.innerText = c.text;
            btn.onclick = (e) => { e.stopPropagation(); playClick(); jumpTo(c.target); };
            choiceOverlay.appendChild(btn);
        });
    }

    isTyping = true;
    textEl.innerText = "";
    let i = 0;
    clearInterval(typeTimer);

    typeTimer = setInterval(() => {
        if (i < data.text.length) {
            textEl.innerText += data.text.charAt(i);
            i++;
            // Suara hanya untuk Adachi Rei
            if (data.name === "Adachi Rei" && i % 2 === 0) {
                playVoice();
            }
        } else {
            clearInterval(typeTimer);
            isTyping = false;
        }
    }, 45);
}

function handleInteraction() {
    if (isTyping) {
        clearInterval(typeTimer);
        document.getElementById('text-display').innerText = storyData[currentLabel][step].text;
        isTyping = false;
        return;
    }
    if (storyData[currentLabel][step].choices) return;
    if (step < storyData[currentLabel].length - 1) {
        step++;
        render();
    }
}

function jumpTo(label) { currentLabel = label; step = 0; render(); }
function showMainMenu(e) { e.stopPropagation(); if(confirm("Return to Menu?")) location.reload(); }

async function saveToBackend(e) {
    e.stopPropagation();
    try {
        const response = await fetch(BACKEND_URL);
        const resData = await response.json();
        alert("Progress Saved to Java: " + resData.message);
    } catch (err) {
        alert("Backend Offline! Make sure savemanger.java is running.");
    }

}
