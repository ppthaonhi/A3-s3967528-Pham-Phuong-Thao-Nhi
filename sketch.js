const messages = [
    "It looks like you're lost. 🤔",
    "But don't worry, I'm here to guide you through some simple games. 😊",
    "These games are so much fun! 🎉",
    "Are you ready to explore this world? 🌍"
  ];
  
  let currentMessageIndex = 0; 
  let charIndex = 0; 
  let typingInterval;
  const messageContainer = document.getElementById("message-container");
  const chatContainer = document.getElementById("chat-container");
  const gameContainer = document.getElementById("game-container");

  function typeMessage() {
    if (charIndex < messages[currentMessageIndex].length) {
      let messageDiv = document.getElementById(`message-${currentMessageIndex}`);
      if (!messageDiv) {
        messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.id = `message-${currentMessageIndex}`;
        messageContainer.appendChild(messageDiv);
      }
      messageDiv.textContent =
        messages[currentMessageIndex].substring(0, charIndex + 1);
      charIndex++;
    } else {
      clearInterval(typingInterval);
      charIndex = 0;
      currentMessageIndex++;
      if (currentMessageIndex < messages.length) {
        setTimeout(() => startTyping(), 1000);
      } else {
        setTimeout(() => showOptions(), 1000);
      }
    }
  }

  function startTyping() {
    typingInterval = setInterval(typeMessage, 50);
  }

  function showOptions() {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.className = "option-btn";
    yesButton.onclick = () => {
      showImportantMessage();
    };

    const readyButton = document.createElement("button");
    readyButton.textContent = "I’m Ready";
    readyButton.className = "option-btn";
    readyButton.onclick = () => {
      showImportantMessage();
    };

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(readyButton);
    messageContainer.appendChild(buttonContainer);
  }

  function showImportantMessage() {
    // Clear previous messages
    messageContainer.innerHTML = '<div class="anna-avatar"></div>';
    
    const importantMessages = [
      "Ohh, almost forgot this super-duper important thing, here is the tutorial! ✨",
      "Let me introduce myself, I am Anna. 👋",
      "I will be with you throughout all the games. 🎮",
      "Now, here’s the tutorial. Please read it carefully! 📖"
    ];

    importantMessages.forEach((text, index) => {
      setTimeout(() => {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.textContent = text;
        messageContainer.appendChild(messageDiv);
      }, index * 2000);
    });

    setTimeout(() => showTutorial(), importantMessages.length * 2000 + 1000);
  }

  function showTutorial() {
    const tutorialMessages = [
      "Tutorial:",
      "Press 1: Basic Math Game",
      "Press 2: Find the Odd Emoji",
      "Press 3: Guess the Fruit",
      "Press Space: Change background color",
      "Press ESC: Return to Home Screen",
      "Now, let’s get started!"
    ];

    tutorialMessages.forEach((text) => {
      const tutorialDiv = document.createElement("div");
      tutorialDiv.className = "message";
      tutorialDiv.textContent = text;
      messageContainer.appendChild(tutorialDiv);
    });

    setTimeout(() => {
      chatContainer.classList.add("hidden");
      gameContainer.classList.remove("hidden");
      gameContainer.style.display = "flex";
    }, 5000); 
  }

  window.onload = () => {
    gameContainer.style.display = "none"; 
    startTyping();
  };
  
  
  // Game screen
  let onWelcomeScreen = true;
  let onGame1 = false;
  let onGame3 = false;
  let onGame5 = false;
  
  let bgColor = [240, 230, 255]; 
  let answerInput;
  let currentEquation = "";
  let correctAnswer;
  let floatingDisplays = [];
  const emojiList = ["😊", "🤔", "😈", "😂", "🎉", "💡", "✨", "❤️", "👍", "🥳"];
  let feedbackMessage = "";
  let feedbackColor = "black";
  
  // Game 2
  let emojiArray = [];
  let oddEmoji;
  
  // Game 3
  let imageHints = [];
  let correctDescriptions = [];
  let currentHintIndex = 0;
  
  let confettiPieces = [];
  
 
  const pastelColors = [
    [240, 230, 255],
    [255, 240, 245],
    [250, 235, 215],
    [245, 255, 250],
    [240, 255, 240],
  ];
  
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
  
   
    answerInput = createInput();
    answerInput.position(width / 2 - 100, height / 2 + 50);
    answerInput.size(200, 40);
    answerInput.style("font-size", "20px");
    answerInput.hide();
  
  
    imageHints = [
      "🍎",
      "🍉",
      "🍌",
      "🍊",
      "🥝",
      "🍋",
      "🍒",
      "🍑",
      "🫐",
      "🍐",
      "🥭",
    ];
    correctDescriptions = [
      "apple",
      "watermelon",
      "banana",
      "orange",
      "kiwi",
      "lemon",
      "cherry",
      "peach",
      "blueberry",
      "pear",
      "mango",
    ];
  }
  
  function draw() {
    background(bgColor);
  
  
    if (onWelcomeScreen) {
      displayWelcomeScreen();
    } else if (onGame1) {
      playGame1();
    } else if (onGame3) {
      playGame3();
    } else if (onGame5) {
      playGame5();
    }
  
   
    fill(feedbackColor);
    textSize(20);
    text(feedbackMessage, width / 2, height - 50);
  
   
    for (let i = floatingDisplays.length - 1; i >= 0; i--) {
      const fd = floatingDisplays[i];
      fd.display();
      fd.update();
      if (!fd.isAlive()) {
        floatingDisplays.splice(i, 1);
      }
    }
  
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      confettiPieces[i].display();
      confettiPieces[i].update();
      if (!confettiPieces[i].isAlive()) {
        confettiPieces.splice(i, 1);
      }
    }
  }
  
  
  function displayWelcomeScreen() {
    fill(50);
    textSize(36);
    textStyle(BOLD);
    text("Welcome to Anna's Math Kingdom!", width / 2, height / 2 - 150);
  
    let boxWidth = 150;
    let boxHeight = 70;
    let spacing = 20;
    let totalWidth = 3 * boxWidth + 2 * spacing;
    let startX = width / 2 - totalWidth / 2;
    let y = height / 2;
  
    for (let i = 0; i < 3; i++) {
      let x = startX + i * (boxWidth + spacing);
  
     
      fill(255);
      stroke(50);
      rect(x, y, boxWidth, boxHeight, 10);
  
     
      fill(50);
      noStroke();
      textSize(16);
  
      let labelText = `Press ${i + 1} to Play`;
      if (i === 2) labelText = `Press 3 to Play`;
      text(labelText, x + boxWidth / 2, y + boxHeight / 2);
    }
  }
  
  // Game 1: Basic math
  function playGame1() {
    fill(50);
    textSize(36);
    text("Basic Math with Anna", width / 2, 100);
  
    if (!currentEquation) {
      generateMathProblem();
      answerInput.show();
    }
  
    textSize(48);
    text(currentEquation, width / 2, height / 2 - 50);
    textSize(24);
    text("Enter your answer and press ENTER", width / 2, height / 2 + 150);
  }
  
  // Game 2: Odd 1 out
  function playGame3() {
    fill(50);
    textSize(36);
    text("Find the Odd Emoji!", width / 2, 100);
  
    if (emojiArray.length === 0) {
      generateOddEmojiChallenge();
    }
  
    let gridSize = 5;
    let emojiSize = 60;
    let startX = width / 2 - (gridSize * emojiSize) / 2 + emojiSize / 2;
    let startY = height / 2 - (gridSize * emojiSize) / 2 + emojiSize / 2;
  
    for (let i = 0; i < emojiArray.length; i++) {
      let x = startX + (i % gridSize) * emojiSize;
      let y = startY + floor(i / gridSize) * emojiSize;
      textSize(32);
      text(emojiArray[i], x, y);
  
      if (
        mouseIsPressed &&
        dist(mouseX, mouseY, x, y) < emojiSize / 2 &&
        emojiArray[i] === oddEmoji
      ) {
        emojiArray = [];
        oddEmoji = null;
        break; // Kết thúc sớm nếu tìm được emoji khác biệt
      }
    }
  }
  
  // Game 3: Guess the fruit
  function playGame5() {
    fill(50);
    textSize(36);
    text("Guess the Fruit!", width / 2, 100);
  
    if (currentHintIndex < imageHints.length) {
      textSize(64);
      text(imageHints[currentHintIndex], width / 2, height / 2 - 100);
      textSize(24);
      text(
        "Enter the word for this emoji and press ENTER",
        width / 2,
        height / 2 + 150
      );
      answerInput.show();
    } else {
      text("Hoo-ray, You've completed all the fruits!", width / 2, height / 2);
      answerInput.hide();
    }
  }
  
  // Game 1
  function generateMathProblem() {
    let num1 = floor(random(1, 11));
    let num2 = floor(random(1, 11));
    currentEquation = `${num1} + ${num2}`;
    correctAnswer = num1 + num2;
  }
  
  // Game 2
  function generateOddEmojiChallenge() {
    emojiArray = []; 
    let randomEmoji = random(emojiList);
    oddEmoji = random(emojiList);
  
    
    while (oddEmoji === randomEmoji) {
      oddEmoji = random(emojiList);
    }
  
    
    for (let i = 0; i < 25; i++) {
      emojiArray.push(randomEmoji);
    }
    emojiArray[floor(random(25))] = oddEmoji;
  }
  
  
  function keyPressed() {
    if (keyCode === ENTER) {
      let playerAnswer = answerInput.value().trim().toLowerCase();
  
      if (onGame1 && Number(playerAnswer) === correctAnswer) {
        feedbackMessage = "Correct! Great job, Anna is happy!";
        feedbackColor = "green";
        currentEquation = "";
        answerInput.value("");
        F;
      } else if (
        onGame5 &&
        playerAnswer === correctDescriptions[currentHintIndex]
      ) {
        feedbackMessage = "Correct! You guessed it!";
        feedbackColor = "green";
        currentHintIndex++;
        answerInput.value("");
      } else {
        feedbackMessage = "Incorrect! Try again.";
        feedbackColor = "red";
        answerInput.value("");
      }
    } else if (key === "1") {
      onWelcomeScreen = false;
      onGame1 = true;
      feedbackMessage = "";
    } else if (key === "2") {
      onWelcomeScreen = false;
      onGame3 = true;
      feedbackMessage = "";
    } else if (key === "3") {
      onWelcomeScreen = false;
      onGame5 = true;
      feedbackMessage = "";
    } else if (key === " ") {
      bgColor = random(pastelColors); 
    } else if (keyCode === ESCAPE) {
      resetGameStates();
      feedbackMessage = "";
      feedbackColor = "black";
    }
  }
  
  
  function resetGameStates() {
    onWelcomeScreen = true;
    onGame1 = false;
    onGame3 = false;
    onGame5 = false;
  
   
    currentEquation = "";
    emojiArray = [];
    oddEmoji = null;
    currentHintIndex = 0;
  
    
    answerInput.hide();
  }
  
  // Floating emojis
  function mouseClicked() {
    floatingDisplays.push(new FloatingDisplay(random(emojiList), mouseX, mouseY));
  }
  
  // Floating display class
  class FloatingDisplay {
    constructor(text, x, y) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.opacity = 255;
    }
  
    update() {
      this.y -= 2; 
      this.opacity -= 5; 
    }
  
    display() {
      fill(0, 0, 0, this.opacity);
      textSize(32);
      text(this.text, this.x, this.y);
    }
  
    isAlive() {
      return this.opacity > 0;
    }
  }
  
  
  function keyPressed() {
    if (key === " ") {
      
      bgColor = random(pastelColors);
    } else if (keyCode === ESCAPE) {
      
      resetGame();
    } else if (onWelcomeScreen) {
      
      if (key === "1") {
        startGame(1);
      } else if (key === "2") {
        startGame(3);
      } else if (key === "3") {
        startGame(5);
      }
    } else if (onGame1 || onGame3 || onGame5) {
      
      if (keyCode === ENTER) {
        let playerAnswer = answerInput.value().trim().toLowerCase();
        processGameInput(playerAnswer);
      }
    }
  }
  
  
  function startGame(gameNumber) {
    onWelcomeScreen = false;
    onGame1 = gameNumber === 1;
    onGame3 = gameNumber === 3;
    onGame5 = gameNumber === 5;
    feedbackMessage = "";
    answerInput.value("");
  }
  
  
  function processGameInput(playerAnswer) {
    if (onGame1 && Number(playerAnswer) === correctAnswer) {
      feedbackMessage = "Correct! Great job, Anna is happy!";
      feedbackColor = "green";
      currentEquation = "";
      answerInput.value("");
    } else if (
      onGame5 &&
      playerAnswer === correctDescriptions[currentHintIndex]
    ) {
      feedbackMessage = "Correct! You guessed it!";
      feedbackColor = "green";
      currentHintIndex++;
      answerInput.value("");
    } else {
      feedbackMessage = "Incorrect! Try again.";
      feedbackColor = "red";
      answerInput.value("");
    }
  }
  
  
  function resetGame() {
    onWelcomeScreen = true;
    onGame1 = false;
    onGame3 = false;
    onGame5 = false;
    feedbackMessage = "";
    answerInput.hide();
  }
  
  function resetGame() {
    onWelcomeScreen = true;
    onGame1 = false;
    onGame3 = false;
    onGame5 = false;
    feedbackMessage = "";
    feedbackColor = "black";
    currentEquation = "";
    emojiArray = [];
    oddEmoji = null;
    currentHintIndex = 0;
  
    
    answerInput.hide();
  }
  
  function startGame(gameNumber) {
    onWelcomeScreen = false;
    onGame1 = gameNumber === 1;
    onGame3 = gameNumber === 3;
    onGame5 = gameNumber === 5;
    feedbackMessage = "";
    feedbackColor = "black";
  
   
    if (onGame1 || onGame5) {
      answerInput.show();
    } else {
      answerInput.hide(); 
    }
  
    answerInput.value("");
  }
  