const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let recycleBinImage, bottleImage, paperImage, plasticImage, trashImage;
let recycleBin, currentItem, score;

function initializeGame() {
    recycleBinImage = new Image();
    recycleBinImage.src = "./assets/images/blue-bin.png";

    bottleImage = new Image();
    bottleImage.src = "./assets/images/bottle.png";

    paperImage = new Image();
    paperImage.src = "./assets/images/paper.png";

    plasticImage = new Image();
    plasticImage.src = "./assets/images/plastic.png";

    trashImage = new Image();
    trashImage.src = "./assets/images/trash.png";

    recycleBin = {
        x: canvas.width / 2 - 75,
        y: canvas.height - 150,
        width: 150,
        height: 150,
    };

    currentItem = null;
    score = 0;
}

function drawRecycleBin() {
    ctx.drawImage(recycleBinImage, recycleBin.x, recycleBin.y, recycleBin.width, recycleBin.height);
}

function drawItem(item) {
    if (item) {
        let image;
        switch (item.type) {
            case 'paper':
                image = paperImage;
                break;
            case 'plastic':
                image = plasticImage;
                break;
            case 'trash':
                image = trashImage;
                break;
            case 'bottle':
            default:
                image = bottleImage;
                break;
        }
        ctx.drawImage(image, item.x, item.y, item.width, item.height);
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function updateGame() {
    let speedIncrease = 1;

    if (!currentItem) {
        const items = ['bottle', 'paper', 'plastic', 'trash'];
        let itemType = items[Math.floor(Math.random() * items.length)];
        currentItem = {
            x: Math.random() * (canvas.width - 50),
            y: 0,
            width: 90,
            height: 90,
            type: itemType
        };
    } else {
        currentItem.y += 5 * speedIncrease;

        if (
            currentItem.x < recycleBin.x + recycleBin.width &&
            currentItem.x + currentItem.width > recycleBin.x &&
            currentItem.y < recycleBin.y + recycleBin.height &&
            currentItem.y + currentItem.height > recycleBin.y
        ) {
            switch (currentItem.type) {
                case 'paper':
                    score += 10;
                    break;
                case 'plastic':
                    score += 5;
                    break;
                case 'trash':
                    score -= 10;
                    break;
                case 'bottle':
                    score -= 5;
                    break;
            }
            currentItem = null;
        }

        if (currentItem && currentItem.y > canvas.height) {
            currentItem = null;
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRecycleBin();
    drawItem(currentItem);
    drawScore();

    requestAnimationFrame(updateGame);
}

function resetGame() {
    location.reload();
}

function onCanvasMouseMove(event) {
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;
    const binHalfWidth = recycleBin.width / 2;

    recycleBin.x = Math.min(Math.max(mouseX - binHalfWidth, 0), canvas.width - recycleBin.width);
}

canvas.addEventListener('mousemove', onCanvasMouseMove);

function startGame() {
    initializeGame();
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';

    let assetsLoaded = 0;
    let totalAssets = 5;

    function assetLoaded() {
        assetsLoaded++;
        if (assetsLoaded === totalAssets) {
            updateGame();
        }
    }

    recycleBinImage.onload = assetLoaded;
    bottleImage.onload = assetLoaded;
    paperImage.onload = assetLoaded;
    plasticImage.onload = assetLoaded;
    trashImage.onload = assetLoaded;
}

function endGame() {
    document.getElementById('gameSection').style.display = 'none';
    document.getElementById('endSection').style.display = 'block';
    document.getElementById('finalScore').textContent = score.toString();
}

function restartGame() {
    document.getElementById('endSection').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'block';
    score = 0;
    resetGame();
}
