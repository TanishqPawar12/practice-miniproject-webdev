const paragraphs = [
    "Subscribe to Drop X Out",
    "Practice makes a man perfect",
    "Focus on your goals always",
    "Be consistent to get results",
    "Discipline beats motivation",
    "Hard work always pays off",
    "Never stop learning new things",
    "Consistency is the key to success",
    "Push yourself, because no one else will",
    "Success comes to those who hustle",
    "Mistakes are proof that you are trying",
    "Dream big and dare to fail",
    "Every expert was once a beginner",
    "The only limit is your mind",
    "Believe in yourself and all that you are",
    "Stay positive, work hard, make it happen"
  ];  
  
  const typingText = document.querySelector(".typing-text p");
  const timeTag = document.querySelector(".time span b");
  const mistakeTag = document.querySelector(".mistake span");
  const wpmTag = document.querySelector(".wpm span");
  const cpmTag = document.querySelector(".cpm span");
  const tryAgainBtn = document.querySelector("button");
  
  let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = 0,
    mistakes = 0,
    isTyping = false;
  
  function loadParagraph() {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
  
    paragraphs[randIndex].split("").forEach(char => {
      typingText.innerHTML += `<span>${char}</span>`;
    });
  
    typingText.querySelector("span").classList.add("active");
    document.addEventListener("keydown", startTyping); // type anywhere
  }
  
  function startTyping(e) {
    const characters = typingText.querySelectorAll("span");
  
    let typedChar = e.key;
  
    if (charIndex < characters.length && timeLeft > 0) {
      if (!isTyping) {
        timer = setInterval(updateTimer, 1000);
        isTyping = true;
      }
  
      let currentChar = characters[charIndex].innerText;
  
      if (typedChar === currentChar) {
        characters[charIndex].classList.add("correct");
      } else {
        characters[charIndex].classList.add("incorrect");
        mistakes++;
      }
  
      characters[charIndex].classList.remove("active");
      charIndex++;
      if (charIndex < characters.length) {
        characters[charIndex].classList.add("active");
      }
  
      updateStats();
    }
  }
  
  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      updateStats();
    } else {
      clearInterval(timer);
    }
  }
  
  function updateStats() {
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
  
    let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes;
  }
  
  function resetGame() {
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    loadParagraph();
    updateStats();
  }
  
  tryAgainBtn.addEventListener("click", resetGame);
  
  window.onload = () => {
    loadParagraph();
  };
  