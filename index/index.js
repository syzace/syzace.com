const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('button, a, input').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.borderColor = '#ffffff';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.borderColor = '#6889A7';
  });
});

const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 90);

function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;
  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


function handleNotify() {
  const input = document.getElementById('emailInput');
  const success = document.getElementById('notifySuccess');
  const wrap = document.querySelector('.notify-wrap');
  if (!input.value || !input.value.includes('@')) {
    input.style.borderColor = '#ff4444';
    input.placeholder = 'come on, real email only';
    setTimeout(() => {
      input.style.borderColor = '';
      input.placeholder = "drop your email — we'll hit you up";
    }, 2000);
    return;
  }
  wrap.style.display = 'none';
  success.style.display = 'block';
}

document.getElementById('emailInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleNotify();
});


document.querySelector('.glitch').addEventListener('mouseenter', function () {
  this.style.animation = 'none';
  setTimeout(() => this.style.animation = '', 100);
});