
let metaData;
let scriptData;
let currentFrameIndex = 0;
let value = 0;

document.getElementById('start-button').addEventListener('click', startGame);

function loadGame() {
    fetch('gameData.json')
        .then(response => response.json())
        .then(data => {
            metaData = data.metadata;
            scriptData = data.script;
            
            let title = metaData.title;
            let author = metaData.author;

            document.getElementById('character').innerHTML = `<span style='font-size:200%'>${title}</span>`;
            document.title = title;
            document.getElementById('dialogue-text').innerText = "作者：" + author;
            if (metaData.cover) {
                document.getElementById('background').style.backgroundImage = `url(${metaData.cover})`;
            }
        });
}

function startGame() {
    document.getElementById('start-button').style.display = 'none';
    loadFrame(0);
}

function loadFrame(index) {
    const frame = scriptData[index];
    currentFrameIndex = index;

    if (frame.backgroundImage === null) {
        document.getElementById('background').style.backgroundImage = null;
    }

    if (frame.backgroundImage) {
        document.getElementById('background').style.backgroundImage = `url(${frame.backgroundImage})`;
    }

    if (frame.characterImage) {
        document.getElementById('character-img').style.backgroundImage = `url(${frame.characterImage})`;
    }

    if (frame.character || frame.character === "") {
        document.getElementById('character').innerText = frame.character;
    }

    document.getElementById('dialogue-text').innerText = frame.text;

    if (frame.choices) {
        document.getElementById('background').removeEventListener('click', () => nextFrame(frame));
        displayChoices(frame.choices);
    } else {
        document.getElementById('choices').innerHTML = '';
        document.getElementById('choices').style.display = 'none';
        document.getElementById('background').addEventListener('click', () => nextFrame(frame));
        document.addEventListener('keydown', () => nextFrame(frame), { once: true });
    }

    if (frame.valueEvent) {
        value += frame.valueEvent;
    }
}

function displayChoices(choices) {
    const choicesContainer = document.getElementById('choices');
    // 延迟1s
    setTimeout(() => {
        choicesContainer.style.display = 'flex';
    }, 1000);
    choicesContainer.innerHTML = '';
    choices.forEach(choice => {
        if (!choice.valueRange || (value >= choice.valueRange[0] && value <= choice.valueRange[1])) {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.addEventListener('click', () => {
                choicesContainer.style.display = 'none';
                loadFrameById(choice.goto);
            });
            choicesContainer.appendChild(button);
        }
    });
}

function nextFrame(frame) {
    if (frame.goto === 'end') {
        alert('游戏结束');
        return;
    }

    if (Array.isArray(frame.goto)) {
        for (const condition of frame.goto) {
            if (value >= condition.valueRange[0] && value <= condition.valueRange[1]) {
                loadFrameById(condition.nextId);
                return;
            }
        }
        alert('游戏结束');
    } else {
        if (frame.goto) {
            loadFrameById(frame.goto);
        } else {
            loadFrame(currentFrameIndex + 1);
        }
    }
}

function loadFrameById(id) {
    const index = scriptData.findIndex(frame => frame.id === id);
    if (index !== -1) {
        loadFrame(index);
    } else {
        alert('游戏结束');
    }
}

loadGame();
