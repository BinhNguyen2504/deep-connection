/* ========================================
   DEEP CONNECTION — Card Interactions
   ======================================== */
/* eslint-disable no-undef, no-underscore-dangle, no-param-reassign */

DC.bindCardEvents = function bindCardEvents(card) {
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isDragging = false;
  let hasMoved = false;
  let lastTouchTime = 0;
  let wasFlipped = false;

  const onStart = function onStart(e) {
    if (DC.state.isSwiping || DC.state.isFlipping) return;
    if (e.touches) lastTouchTime = Date.now();
    if (!e.touches && Date.now() - lastTouchTime < 500) return;

    const touch = e.touches ? e.touches[0] : e;
    startX = touch.clientX;
    startY = touch.clientY;
    currentX = 0;
    isDragging = true;
    hasMoved = false;
    wasFlipped = card.classList.contains('flipped');
    card.classList.add('swiping');
  };

  const onMove = function onMove(e) {
    if (!isDragging) return;
    const touch = e.touches ? e.touches[0] : e;
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (!hasMoved && Math.abs(deltaY) > Math.abs(deltaX)) {
      isDragging = false;
      card.classList.remove('swiping');
      return;
    }

    hasMoved = true;
    e.preventDefault();
    currentX = deltaX;

    const visualDelta = wasFlipped ? -deltaX : deltaX;
    const rotation = visualDelta * 0.08;
    const opacity = 1 - Math.abs(deltaX) / 600;

    const flipPart = wasFlipped ? 'rotateY(180deg) ' : '';
    card.style.transform = `${flipPart}translateX(${visualDelta}px) rotateZ(${rotation}deg)`;
    card.style.opacity = Math.max(opacity, 0.3);
  };

  const onEnd = function onEnd() {
    if (!isDragging) return;
    isDragging = false;

    const threshold = 80;

    if (Math.abs(currentX) > threshold) {
      DC.state.isSwiping = true;
      DC.playSound('next');
      const direction = currentX > 0 ? 1 : -1;
      const visualDir = wasFlipped ? -direction : direction;
      const flipPart = wasFlipped ? 'rotateY(180deg) ' : '';
      card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      card.style.transform = `${flipPart}translateX(${visualDir * 150}%) rotateZ(${
        visualDir * 20
      }deg)`;
      card.style.opacity = '0';

      if (!DC.state.swipeHintShown) {
        DC.state.swipeHintShown = true;
      }

      setTimeout(() => {
        DC.nextCard();
      }, 400);
    } else if (!hasMoved || Math.abs(currentX) < 5) {
      card.classList.remove('swiping');
      card.style.transform = '';
      card.style.opacity = '';
      DC.toggleFlip(card);
    } else {
      card.classList.remove('swiping');
      card.style.transform = '';
      card.style.opacity = '';
      if (wasFlipped) {
        card.classList.add('flipped');
      }
    }
  };

  card.addEventListener('touchstart', onStart, { passive: true });
  card.addEventListener('touchmove', onMove, { passive: false });
  card.addEventListener('touchend', onEnd);

  card.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  card._cleanup = function cleanup() {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onEnd);
  };
};

// ────────────── FLIP ──────────────
DC.toggleFlip = function toggleFlip(card) {
  if (DC.state.isSwiping || DC.state.isFlipping) return;
  DC.state.isFlipping = true;
  DC.state.isFlipped = !DC.state.isFlipped;
  card.classList.toggle('flipped');
  DC.playSound('flip');

  // Chặn lật/úp bài cho đến khi animation kết thúc
  let unlocked = false;
  const unlock = function unlock() {
    if (unlocked) return;
    unlocked = true;
    DC.state.isFlipping = false;
  };
  card.addEventListener('transitionend', function handler(e) {
    if (e.propertyName === 'transform') {
      card.removeEventListener('transitionend', handler);
      unlock();
    }
  });
  // Fallback: nếu transitionend không fire (ví dụ tab ẩn), mở khóa sau 700ms
  setTimeout(unlock, 700);

  if (DC.state.isFlipped && !DC.state.swipeHintShown) {
    setTimeout(() => {
      DC.refs.swipeHint.classList.add('visible');
      setTimeout(() => {
        DC.refs.swipeHint.classList.remove('visible');
      }, 3000);
    }, 600);
  }
};

// ────────────── PREV CARD ──────────────
DC.prevCard = function prevCard() {
  if (DC.state.isSwiping || DC.state.usedQuestions.length === 0) return;

  DC.playSound('prev');
  DC.state.isSwiping = true;

  const prevQuestion = DC.state.usedQuestions.pop();
  const { cardStack } = DC.refs;

  const activeCard = cardStack.querySelector('.active-card');
  if (activeCard) {
    const isFlipped = activeCard.classList.contains('flipped');
    const flipPart = isFlipped ? 'rotateY(180deg) ' : '';
    activeCard.style.transition = 'transform 0.33s ease-in, opacity 0.33s ease';
    activeCard.style.transform = `${flipPart}translateX(110%) rotateZ(14deg)`;
    activeCard.style.opacity = '0';
    if (activeCard._cleanup) activeCard._cleanup();
  }

  setTimeout(() => {
    DC.state.remainingQuestions.unshift(prevQuestion);
    DC.renderCards();
    const newActive = cardStack.querySelector('.active-card');
    if (newActive) {
      newActive.classList.add('card-return-in');
      newActive.addEventListener(
        'animationend',
        () => {
          newActive.classList.remove('card-return-in');
          // Prevent cardEntrance animation from restarting after override removal
          newActive.style.animation = 'none';
          DC.state.isSwiping = false;
        },
        { once: true },
      );
    } else {
      DC.state.isSwiping = false;
    }
  }, 330);
};

// ────────────── NEXT CARD ──────────────
DC.nextCard = function nextCard() {
  const { cardStack } = DC.refs;
  const used = DC.state.remainingQuestions.shift();
  if (used) DC.state.usedQuestions.push(used);

  const oldCard = cardStack.querySelector('.active-card');
  if (oldCard && oldCard._cleanup) oldCard._cleanup();

  DC.renderCards();

  const newActive = cardStack.querySelector('.active-card');
  if (newActive) {
    newActive.addEventListener(
      'animationend',
      () => {
        DC.state.isSwiping = false;
      },
      { once: true },
    );
  } else {
    DC.state.isSwiping = false;
  }

  if (
    DC.state.remainingQuestions.length > 0 &&
    ['deep', 'sensitive'].indexOf(DC.state.remainingQuestions[0].tag) !== -1
  ) {
    DC.triggerSpecialCard();
  }
};
