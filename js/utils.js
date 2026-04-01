/* ========================================
   DEEP CONNECTION — Utilities
   ======================================== */
/* eslint-disable no-undef, no-underscore-dangle, no-param-reassign */

// ────────────── SHUFFLE ──────────────
DC.shuffleArray = function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
};

// ────────────── UPDATE PREV BUTTON ──────────────
DC.updatePrevBtn = function updatePrevBtn() {
  if (DC.refs.btnPrev)
    DC.refs.btnPrev.disabled = DC.state.usedQuestions.length === 0;
};

// ────────────── SOUND ENGINE ──────────────
const _AudioCtx = window.AudioContext || window.webkitAudioContext;
let _audioCtx = null;

function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new _AudioCtx();
  return _audioCtx;
}

// ────────────── SOUND TOGGLE ──────────────
DC.initSound = function initSound() {
  var saved = localStorage.getItem('dc-sound');
  DC.state.soundEnabled = saved !== 'off';
  DC.applySoundState();
};

DC.applySoundState = function applySoundState() {
  var icon = DC.state.soundEnabled ? '🔊' : '🔇';
  document.querySelectorAll('.sound-icon').forEach(function (el) {
    el.textContent = icon;
  });
};

DC.toggleSound = function toggleSound() {
  DC.state.soundEnabled = !DC.state.soundEnabled;
  localStorage.setItem('dc-sound', DC.state.soundEnabled ? 'on' : 'off');
  document.querySelectorAll('.sound-toggle').forEach(function (btn) {
    btn.classList.remove('toggling');
    void btn.offsetWidth;
    btn.classList.add('toggling');
    btn.addEventListener(
      'animationend',
      function () {
        btn.classList.remove('toggling');
      },
      { once: true },
    );
  });
  DC.applySoundState();
};

DC.playSound = function playSound(type) {
  if (!DC.state.soundEnabled) return;
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'flip') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.08);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'next') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.2);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'prev') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.2);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'deal') {
      [
        [0, 480],
        [0.06, 600],
        [0.12, 780],
      ].forEach((item) => {
        const delay = item[0];
        const freq = item[1];
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + delay);
        o.frequency.exponentialRampToValueAtTime(
          freq * 0.85,
          now + delay + 0.12,
        );
        g.gain.setValueAtTime(0, now + delay);
        g.gain.linearRampToValueAtTime(0.055, now + delay + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.16);
        o.start(now + delay);
        o.stop(now + delay + 0.18);
      });
      gain.gain.setValueAtTime(0, now);
      osc.start(now);
      osc.stop(now + 0.001);
    } else if (type === 'shuffle') {
      [0, 0.07, 0.14, 0.21].forEach((delay, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'triangle';
        const baseFreq = i % 2 === 0 ? 700 : 500;
        o.frequency.setValueAtTime(baseFreq, now + delay);
        o.frequency.exponentialRampToValueAtTime(
          baseFreq * 0.75,
          now + delay + 0.06,
        );
        g.gain.setValueAtTime(0, now + delay);
        g.gain.linearRampToValueAtTime(0.05, now + delay + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.07);
        o.start(now + delay);
        o.stop(now + delay + 0.08);
      });
      gain.gain.setValueAtTime(0, now);
      osc.start(now);
      osc.stop(now + 0.001);
    }
  } catch (_) {
    // Silently catch audio context errors
  }
};

// ────────────── DEV: EXPORT FEEDBACK DATA ──────────────
window.dcExportFeedback = function dcExportFeedback() {
  console.log(
    '%c📊 Deep Connection — Feedback Data (phiên này)',
    'font-weight:bold;font-size:1.1em;color:#e94560;',
  );
  console.log(JSON.stringify(DC._feedbackSession, null, 2));
  return DC._feedbackSession;
};
