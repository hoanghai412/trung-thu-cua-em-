let messages = [];
let shuffledMessageIndices = [];

// Hàm trộn mảng
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Fetch messages.json
fetch('messages.json')
  .then(response => response.json())
  .then(data => {
    messages = data.messages;
    setupLanterns();
  })
  .catch(() => {
    // fallback nếu không load được file
    messages = [
      "💌 Gửi em, ánh trăng này là của chúng ta 💕",
      "🌙 Em yêu, anh nhớ em lắm! 💖",
      "🕯️ Trung Thu này, thắp đèn cùng em ❤️",
      "⭐ Em là ngôi sao sáng nhất trong đời anh ✨"
    ];
    setupLanterns();
  });

function setupLanterns() {
  const extended = [];
  for (let i = 0; i < 2; i++) {
    extended.push(...messages.map((_, idx) => idx));
  }
  while (extended.length < 25) {
    extended.push(Math.floor(Math.random() * messages.length));
  }
  shuffledMessageIndices = shuffleArray(extended);
  createLanterns();
}

function createLanterns() {
  const screenWidth = window.innerWidth;
  let lanternCount = 25; // mặc định

  if (screenWidth <= 320) lanternCount = 25;
  else if (screenWidth <= 480) lanternCount = 35;
  else if (screenWidth <= 768) lanternCount = 50;
  else lanternCount = 70; // desktop to thì nhiều hơn

  for (let i = 0; i < lanternCount; i++) {
    let lantern = document.createElement("div");
    lantern.className = "lantern";

    lantern.style.left = Math.random() * 95 + "vw"; 
    lantern.style.animationDuration = (18 + Math.random() * 15) + "s"; 
    lantern.style.animationDelay = Math.random() * 12 + "s"; 

    // random scale cho đa dạng hơn
    let scale = 1 + Math.random() * 1.2; 
    lantern.style.transform = `scale(${scale})`;

    const msgIndex = shuffledMessageIndices[i % shuffledMessageIndices.length];
    lantern.onclick = () => showLanternMessage(lantern, messages[msgIndex]);

    document.body.appendChild(lantern);
  }
}



function showLanternMessage(lantern, messageContent) {
  lantern.style.animationPlayState = 'paused';
  document.getElementById('messageContent').innerText = messageContent;
  document.getElementById('messageContainer').style.display = 'flex';
}

function hideMessage() {
  document.getElementById('messageContainer').style.display = 'none';
  const lanterns = document.querySelectorAll('.lantern');
  lanterns.forEach(l => l.style.animationPlayState = 'running');
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) closeBtn.onclick = hideMessage;

  const container = document.getElementById('messageContainer');
  if (container) container.onclick = hideMessage;

  const box = document.getElementById('message');
  if (box) box.onclick = e => e.stopPropagation();
});

// Tạo sao
function createStars() {
  const stars = document.getElementById('stars');
  for (let i = 0; i < 100; i++) {
    let star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 2 + "s";
    stars.appendChild(star);
  }
}
window.onload = createStars;

// Fix autoplay nhạc mobile
document.body.addEventListener("click", () => {
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic && bgMusic.paused) bgMusic.play();
}, { once: true });
// Fix lại vị trí lồng đèn khi resize
window.onresize = () => {
  const lanterns = document.querySelectorAll('.lantern');
  lanterns.forEach(lantern => {
    lantern.style.left = Math.random() * 90 + "vw";
  });
};