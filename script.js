document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for .reveal elements
  const reveals = document.querySelectorAll('.reveal');
  const THRESHOLD = 0.1;

  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: THRESHOLD });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }

  // Page fade transition on nav buttons
  const pageWrapper = document.getElementById('page-wrapper');
  const navButtons = document.querySelectorAll('.nav-buttons button');
  let isTransitioning = false;

  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (isTransitioning) return; // prevent multiple clicks
      const targetUrl = button.getAttribute('data-href');
      if (!targetUrl) return;

      isTransitioning = true;
      pageWrapper.classList.add('fade-out');
      pageWrapper.addEventListener('transitionend', () => {
        window.location.href = targetUrl;
      }, { once: true });
    });
  });

  // Music play/pause controls
  const music = document.getElementById('bg-music');
  const playBtn = document.getElementById('play-music-btn');
  const pauseBtn = document.getElementById('pause-music-btn');

  if (music && playBtn && pauseBtn) {
    // Sync buttons with current music state
    if (!music.paused && !music.muted) {
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-block';
      playBtn.setAttribute('aria-pressed', 'false');
      pauseBtn.setAttribute('aria-pressed', 'true');
    } else {
      playBtn.style.display = 'inline-block';
      pauseBtn.style.display = 'none';
      playBtn.setAttribute('aria-pressed', 'true');
      pauseBtn.setAttribute('aria-pressed', 'false');
    }

    playBtn.addEventListener('click', () => {
      music.play().then(() => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        playBtn.setAttribute('aria-pressed', 'false');
        pauseBtn.setAttribute('aria-pressed', 'true');
      }).catch(err => {
        console.error('Music play failed:', err);
      });
    });

    pauseBtn.addEventListener('click', () => {
      music.pause();
      playBtn.style.display = 'inline-block';
      pauseBtn.style.display = 'none';
      playBtn.setAttribute('aria-pressed', 'true');
      pauseBtn.setAttribute('aria-pressed', 'false');
    });
  }
});
