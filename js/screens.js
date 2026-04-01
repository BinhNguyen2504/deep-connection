/* ========================================
   DEEP CONNECTION — Screens & UI
   ======================================== */
/* eslint-disable no-undef */

// ────────────── COUNTER ──────────────
DC.updateCounter = function updateCounter() {
  const total = DC.state.currentCategory.questions.length;
  const remaining = DC.state.remainingQuestions.length;
  DC.refs.cardCounter.textContent = `${total - remaining + (remaining > 0 ? 1 : 0)} / ${total}`;
};

// ────────────── MODAL ──────────────
DC.showModal = function showModal() {
  DC.refs.modalReset.classList.add('visible');
};

DC.hideModal = function hideModal() {
  DC.refs.modalReset.classList.remove('visible');
};

// ────────────── SCREEN SWITCH ──────────────
DC.switchScreen = function switchScreen(target, transition) {
  var currentScreen = document.querySelector('.screen.active');

  if (!transition || !currentScreen || currentScreen === target) {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.remove('active');
    });
    target.classList.add('active');
    return;
  }

  if (DC.state.isTransitioning) return;
  DC.state.isTransitioning = true;

  var exit = transition.exit;
  var enter = transition.enter;

  target.classList.add('active', enter);
  currentScreen.classList.add(exit);

  var cleaned = false;
  var cleanup = function () {
    if (cleaned) return;
    cleaned = true;
    currentScreen.classList.remove('active', exit);
    target.classList.remove(enter);
    DC.state.isTransitioning = false;
  };

  target.addEventListener('animationend', cleanup, { once: true });
  setTimeout(cleanup, 500);
};

// ────────────── COVER SCREEN ──────────────
DC.bindCoverEvents = function bindCoverEvents() {
  DC.refs.screenCover.addEventListener('click', () => {
    DC.switchScreen(DC.refs.screenHome);
  });
};

// ────────────── INFO SCREEN / EASTER EGG ──────────────
DC.bindInfoEvents = function bindInfoEvents() {
  const yearEl = DC.$('#info-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (localStorage.getItem('dc-egg') === '1') {
    DC.refs.dedication.classList.add('visible');
  }

  let tapCount = 0;
  let tapTimer = null;
  DC.refs.infoLogo.addEventListener('click', () => {
    if (DC.refs.dedication.classList.contains('visible')) return;
    tapCount += 1;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => {
      tapCount = 0;
    }, 2000);
    if (tapCount >= 5) {
      DC.refs.dedication.classList.add('visible');
      localStorage.setItem('dc-egg', '1');
      DC.playSound('deal');
      tapCount = 0;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      DC.refs.screenInfo.classList.contains('active') &&
      !DC.refs.settingsOverlay.classList.contains('visible')
    ) {
      DC.switchScreen(DC.refs.screenHome, {
        exit: 'screen-exit-down',
        enter: 'screen-enter-scale-up',
      });
    }
  });
};
