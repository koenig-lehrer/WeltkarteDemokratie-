(() => {
  const globe = document.getElementById('globe');
  const texture = document.getElementById('globeTexture');
  const toggleMotion = document.getElementById('toggleMotion');
  const slower = document.getElementById('slower');
  const faster = document.getElementById('faster');
  const speedLabel = document.getElementById('speedLabel');
  const toggleSolution = document.getElementById('toggleSolution');
  const solution = document.getElementById('solution');
  const fullscreen = document.getElementById('fullscreen');

  const speeds = [2.8, 5.2, 8.5]; // pixels per second at 1000 px globe width
  const speedNames = ['sehr langsam', 'langsam', 'mittel'];
  let speedIndex = 1;
  let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let offset = 0;
  let last = performance.now();
  let dragging = false;
  let pointerX = 0;
  let resumeTimer = null;

  function width() {
    return Math.max(1, globe.getBoundingClientRect().width);
  }

  function pixelsPerSecond() {
    return speeds[speedIndex] * (width() / 1000);
  }

  function applyPosition() {
    texture.style.backgroundPosition = `${offset}px 50%`;
  }

  function setPlaying(next) {
    playing = next;
    toggleMotion.textContent = playing ? 'Pause' : 'Weiter';
    toggleMotion.setAttribute('aria-pressed', String(!playing));
  }

  function updateSpeedLabel() {
    speedLabel.textContent = speedNames[speedIndex];
    slower.disabled = speedIndex === 0;
    faster.disabled = speedIndex === speeds.length - 1;
  }

  function frame(now) {
    const dt = Math.min(50, now - last) / 1000;
    last = now;
    if (playing && !dragging) {
      offset -= pixelsPerSecond() * dt;
      // Keep numbers bounded while preserving the seamless loop.
      const loop = width() * 2;
      if (Math.abs(offset) > loop * 20) offset %= loop;
      applyPosition();
    }
    requestAnimationFrame(frame);
  }

  toggleMotion.addEventListener('click', () => setPlaying(!playing));

  slower.addEventListener('click', () => {
    speedIndex = Math.max(0, speedIndex - 1);
    updateSpeedLabel();
  });

  faster.addEventListener('click', () => {
    speedIndex = Math.min(speeds.length - 1, speedIndex + 1);
    updateSpeedLabel();
  });

  toggleSolution.addEventListener('click', () => {
    const show = solution.hidden;
    solution.hidden = !show;
    toggleSolution.textContent = show ? 'Lösung ausblenden' : 'Lösung';
  });

  fullscreen.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (_) {
      // Fullscreen may be blocked by browser/school-device policy.
    }
  });

  globe.addEventListener('pointerdown', (event) => {
    dragging = true;
    pointerX = event.clientX;
    globe.classList.add('dragging');
    globe.setPointerCapture(event.pointerId);
    if (resumeTimer) clearTimeout(resumeTimer);
  });

  globe.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const dx = event.clientX - pointerX;
    pointerX = event.clientX;
    offset += dx * 1.15;
    applyPosition();
  });

  function finishDrag(event) {
    if (!dragging) return;
    dragging = false;
    globe.classList.remove('dragging');
    try { globe.releasePointerCapture(event.pointerId); } catch (_) {}
    if (playing) {
      resumeTimer = setTimeout(() => { last = performance.now(); }, 250);
    }
  }

  globe.addEventListener('pointerup', finishDrag);
  globe.addEventListener('pointercancel', finishDrag);

  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement ? 'Vollbild beenden' : 'Vollbild';
  });

  updateSpeedLabel();
  setPlaying(playing);
  applyPosition();
  requestAnimationFrame(frame);
})();
