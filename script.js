let paperImages
let bottleImages
let plasticImages
let trashImages
let organicImages

        const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

const scoresPerBinColor = {
    green: {
        paper: -5,
        glass: 10,
        organic: -5,
        nonRecyclableWaste: -5,
        plastic: -5
    },
    blue: {
        paper: 10,
        glass: -5,
        organic: -5,
        nonRecyclableWaste: -5,
        plastic: -5
    },
    red: {
        paper: -5,
        glass: -5,
        organic: 10,
        nonRecyclableWaste: -5,
        plastic: -5
    },
    yellow: {
        paper: -5,
        glass: -5,
        organic: -5,
        nonRecyclableWaste: -5,
        plastic: 10
    },
    black: {
        paper: -5,
        glass: -5,
        organic: -5,
        nonRecyclableWaste: 10,
        plastic: -5
    },
}

console.log(scoresPerBinColor.blue.plastic)
// console.log(scoresPerBinColor[currentBinColor][thingICollidedWith.type])

let recycleBinImage, redBinImage, blackBinImage, yellowBinImage, greenBinImage, blueBinImage;
let paperImage;
let paperImage1;
let paperImage2;
let paperImage3;
let paperImage4;
let bottleImage;
let bottleImage1;
let bottleImage2;
let bottleImage3;
let plasticImage;
let plasticImage1;
let plasticImage2;
let plasticImage3;
let trashImage;
let trashImage1;
let organicImage;
let organicImage1;
let organicImage2;
let recycleBin, currentItem;
let score=0;

function selectRandomBin() {
    const bins = [redBinImage, blackBinImage, yellowBinImage, greenBinImage, blueBinImage];
    const colors = ["red", "black", "yellow", "green", "blue"];
    const randomIndex = Math.floor(Math.random() * bins.length);
    recycleBin.color=colors[randomIndex];
    recycleBinImage = bins[randomIndex];
}

function drawRecycleBin() {
    ctx.drawImage(recycleBinImage, recycleBin.x, recycleBin.y, recycleBin.width, recycleBin.height);
}

function drawItem(item) {
    if (item) {
        let image;
        switch (item.type) {
            case 'paper':
                image = pickRandom(paperImages);
                break;
            case 'plastic':
                image = pickRandom(plasticImages);
                break;
            case 'nonRecyclableWaste':
                image = pickRandom(trashImages);
                break;
            case 'organic':
                image = pickRandom(organicImages);
                break;
            case 'glass':
            
            default:
                image = pickRandom(bottleImages);
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

function updateGame() {//this is the game tick//
    let speedIncrease = 1;

    if (!currentItem) {
        const items = ['glass', 'paper', 'plastic', 'nonRecyclableWaste', 'organic'];
        let itemType = items[Math.floor(Math.random() * items.length)];
        currentItem = {
            x: Math.random() * (canvas.width - 50),
            y: 0,
            width: 90,
            height: 90,
            type: itemType
        };
    } else {
        currentItem.y += 5 * speedIncrease; //moves objects down//

        if (
            currentItem.x < recycleBin.x + recycleBin.width &&
            currentItem.x + currentItem.width > recycleBin.x &&
            currentItem.y < recycleBin.y + recycleBin.height &&
            currentItem.y + currentItem.height > recycleBin.y
        ) {
            score += scoresPerBinColor[recycleBin.color][currentItem.type];
            console.log(JSON.stringify({
                currentBinColor: recycleBin.color, 
                scoresForThisColor: scoresPerBinColor[recycleBin.color], 
                currentItemType: currentItem.type,
                calculatedScore: `${score} (${scoresPerBinColor[recycleBin.color][currentItem.type]})`
            }))

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

function initializeGame() {
    // Initialize bin images
    redBinImage = new Image();
    redBinImage.src = "./assets/images/red-bin.png";
    blackBinImage = new Image();
    blackBinImage.src = "./assets/images/black-bin.png";
    yellowBinImage = new Image();
    yellowBinImage.src = "./assets/images/yellow-bin.png";
    greenBinImage = new Image();
    greenBinImage.src = "./assets/images/green-bin.png";
    blueBinImage = new Image();
    blueBinImage.src = "./assets/images/blue-bin.png";

    // Initialize other images
    bottleImage = new Image();
    bottleImage.src = "./assets/images/bottle.png";
    bottleImage1 = new Image();
    bottleImage1.src = "./assets/images/wine.png";
    bottleImage2 = new Image();
    bottleImage2.src = "./assets/images/pickle.png";
    bottleImage3 = new Image();
    bottleImage3.src = "./assets/images/broken-glass.png";

    paperImage = new Image();
    paperImage.src = "./assets/images/paper.png";
    paperImage1 = new Image();
    paperImage1.src = "./assets/images/paper.png";
    paperImage2 = new Image();
    paperImage2.src = "./assets/images/toilet-paper.png";
    paperImage3 = new Image();
    paperImage3.src = "./assets/images/envelope.png";
    paperImage4 = new Image();
    paperImage4.src = "./assets/images/package.png";

    plasticImage = new Image();
    plasticImage.src = "./assets/images/plastic.png";
    plasticImage1 = new Image();
    plasticImage1.src = "./assets/images/plastic-cup.png";
    plasticImage2 = new Image();
    plasticImage2.src = "./assets/images/milk-carton.png";
    plasticImage3 = new Image();
    plasticImage3.src = "./assets/images/plastic-bag.png";

    trashImage = new Image();
    trashImage.src = "./assets/images/diaper.png";
    trashImage1 = new Image();
    trashImage1.src = "./assets/images/poop.png";

    organicImage = new Image();
    organicImage.src = "./assets/images/banana.png";
    organicImage1 = new Image();
    organicImage1.src = "./assets/images/apple.png";
    organicImage2 = new Image();
    organicImage2.src = "./assets/images/egg.png";

   
      
       paperImages = [
          paperImage,
          paperImage1,
          paperImage2,
          paperImage3,
          paperImage4,
      ]
      
       bottleImages = [
          bottleImage,
          bottleImage1,
          bottleImage2,
          bottleImage3,
      ]
      
       plasticImages = [
          plasticImage,
          plasticImage1,
          plasticImage2,
          plasticImage3,
      ]
      
       trashImages = [
          trashImage,
          trashImage1,
      ]
      
       organicImages = [
          organicImage,
          organicImage1,
          organicImage2,
      ]

    // Initialize game state
    recycleBin = {
        color:"blue",
        x: canvas.width / 2 - 75,
        y: canvas.height - 150,
        width: 150,
        height: 150,
    };

    currentItem = null;
    score = 0;

    selectRandomBin();
    updateGame();
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
    document.getElementById('gameSection').style.display = 'block';

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

// Initialize the game
initializeGame();

const binSwitchHandler = (event) => {
    if (event.key === "a") {
      recycleBin.color = "red";
      recycleBinImage = redBinImage;
    } else if (event.key === "s") {
      recycleBin.color = "green";
      recycleBinImage = greenBinImage;
    } else if (event.key === "d") {
      recycleBin.color = "blue";
      recycleBinImage  = blueBinImage;
    } else if (event.key === "f") {
      recycleBin.color = "yellow";
      recycleBinImage = yellowBinImage; 
    } else if (event.code === "Space") {
      recycleBin.color = "black";
      recycleBinImage = blackBinImage;
    }
  };
  document.addEventListener("keydown", binSwitchHandler);
