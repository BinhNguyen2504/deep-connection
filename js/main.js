/* ========================================
   DEEP CONNECTION — Main (Init + Events)
   ======================================== */
/* eslint-disable no-undef, no-param-reassign */

// ────────────── INIT ──────────────
DC.init = async function init() {
  try {
    DC.initRefs();
    DC.initTheme();
    DC.initSound();
    DC.initLanguage();
    DC.initFontSize();

    const categoryPromises = DC.CATEGORY_FILES.map(async (id) => {
      const res = await fetch(`data/${id}.json`);
      if (!res.ok) throw new Error(`Failed to load ${id}.json`);
      return res.json();
    });
    // Load categories and reaction counts in parallel
    var results = await Promise.allSettled([
      Promise.all(categoryPromises),
      DC.loadReactionCounts(),
    ]);
    if (results[0].status === 'rejected') throw results[0].reason;
    DC.state.categories = results[0].value;
    DC.renderCategories();
    DC.bindGlobalEvents();
    DC.bindCoverEvents();
    DC.bindInfoEvents();
    DC.bindContributeEvents();
    DC.bindSettingsEvents();
  } catch (err) {
    console.error('Error loading data:', err);
    DC.refs.categoryGrid.innerHTML =
      '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:2rem;">' +
      DC.t('loadError') +
      '</div>';
  }
};

// ────────────── HOME SCROLL → HIDE BUTTONS ──────────────
DC.handleHomeScroll = function handleHomeScroll() {
  var el = DC.refs.homeTopActions;
  var scrollTop = DC.refs.homeContainer.scrollTop;
  var THRESHOLD = 50;
  var ratio = Math.max(0, 1 - scrollTop / THRESHOLD);
  el.style.transform = 'scale(' + ratio + ')';
  el.style.opacity = ratio;
  if (ratio === 0) {
    el.classList.add('hidden-by-scroll');
  } else {
    el.classList.remove('hidden-by-scroll');
  }
};

// ────────────── GLOBAL EVENTS ──────────────
DC.bindGlobalEvents = function bindGlobalEvents() {
  const r = DC.refs;

  r.homeContainer.addEventListener('scroll', DC.handleHomeScroll, {
    passive: true,
  });

  r.btnBack.addEventListener('click', () => {
    DC.switchScreen(r.screenHome, {
      exit: 'screen-exit-right',
      enter: 'screen-enter-left',
    });
  });

  r.btnShuffle.addEventListener('click', () => {
    if (DC.state.currentCategory && !DC.state.isSwiping) {
      DC.playSound('shuffle');
      DC.state.isSwiping = true;
      r.cardStack.classList.add('shuffling');
      r.btnShuffle.style.transition =
        'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
      r.btnShuffle.style.transform = 'rotate(360deg)';

      setTimeout(() => {
        DC.state.remainingQuestions = DC.shuffleArray(
          DC.state.remainingQuestions.slice(),
        );
        DC.state.isFlipped = false;
        r.cardStack.classList.remove('shuffling');
        DC.renderCards();
        r.cardStack.querySelectorAll('.deep-card').forEach((c, i) => {
          c.classList.add('shuffle-deal');
          c.style.animationDelay = `${i * 0.08}s`;
          c.addEventListener(
            'animationend',
            () => {
              c.classList.remove('shuffle-deal');
              c.style.animationDelay = '';
            },
            { once: true },
          );
        });
        r.btnShuffle.style.transition = '';
        r.btnShuffle.style.transform = '';
        DC.state.isSwiping = false;
      }, 550);
    }
  });

  r.btnPrev.addEventListener('click', () => {
    DC.prevCard();
  });

  r.btnReset.addEventListener('click', () => {
    DC.hideModal();
    DC.startCategory(DC.state.currentCategory);
  });

  r.btnHome.addEventListener('click', () => {
    DC.hideModal();
    DC.switchScreen(r.screenHome, {
      exit: 'screen-exit-right',
      enter: 'screen-enter-left',
    });
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    // Settings sheet takes priority
    if (e.key === 'Escape' && r.settingsOverlay.classList.contains('visible')) {
      DC.hideSettings();
      return;
    }

    if (!r.screenPlay.classList.contains('active')) return;

    // Escape always works — close modals or go back
    if (e.key === 'Escape') {
      if (r.modalContribute.classList.contains('visible')) {
        DC.hideContributeModal();
      } else if (r.modalReset.classList.contains('visible')) {
        DC.hideModal();
      } else {
        DC.switchScreen(r.screenHome, {
          exit: 'screen-exit-right',
          enter: 'screen-enter-left',
        });
      }
      return;
    }

    // Don't intercept keys when a modal is open (e.g. contribute form)
    if (
      r.modalContribute.classList.contains('visible') ||
      r.modalReset.classList.contains('visible')
    )
      return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const activeCard = r.cardStack.querySelector('.active-card');
      if (activeCard && !DC.state.isSwiping) {
        DC.state.isSwiping = true;
        DC.playSound('next');
        const isFlipped = activeCard.classList.contains('flipped');
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        const visualDir = isFlipped ? -direction : direction;
        const flipPart = isFlipped ? 'rotateY(180deg) ' : '';
        activeCard.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        activeCard.style.transform = `${flipPart}translateX(${visualDir * 150}%) rotateZ(${
          visualDir * 20
        }deg)`;
        activeCard.style.opacity = '0';
        setTimeout(() => {
          DC.nextCard();
        }, 400);
      }
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const activeCard = r.cardStack.querySelector('.active-card');
      if (activeCard) DC.toggleFlip(activeCard);
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      DC.prevCard();
    }
  });

  // Info button
  r.btnInfo.addEventListener('click', () => {
    DC.switchScreen(r.screenInfo, {
      exit: 'screen-exit-scale-down',
      enter: 'screen-enter-up',
    });
  });

  r.btnInfoBack.addEventListener('click', () => {
    DC.switchScreen(r.screenHome, {
      exit: 'screen-exit-down',
      enter: 'screen-enter-scale-up',
    });
  });
};

// ────────────── BOOT ──────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', DC.init);
} else {
  DC.init();
}
