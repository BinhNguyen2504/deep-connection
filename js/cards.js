/* ========================================
   DEEP CONNECTION — Card Rendering
   ======================================== */
/* eslint-disable no-undef */

DC.renderCards = function renderCards() {
  const { cardStack } = DC.refs;
  cardStack.innerHTML = '';

  if (DC.state.remainingQuestions.length === 0) {
    DC.showModal();
    return;
  }

  const visibleCount = Math.min(3, DC.state.remainingQuestions.length);

  for (let i = visibleCount - 1; i >= 0; i -= 1) {
    const q = DC.state.remainingQuestions[i];
    const card = DC.createCardElement(q, i);
    cardStack.appendChild(card);
  }

  const [currentQuestion] = DC.state.remainingQuestions;
  DC.state.currentQuestion = currentQuestion;
  DC.state.isFlipped = false;
  DC.updateCounter();
  DC.updatePrevBtn();

  if (DC.state.remainingQuestions.length <= 1) {
    cardStack.classList.add('last-card');
  } else {
    cardStack.classList.remove('last-card');
  }
};

DC.createCardElement = function createCardElement(question, stackIndex) {
  const card = document.createElement('div');
  card.className = 'deep-card';
  card.dataset.questionId = question.id;
  card.dataset.tag = question.tag || 'light';

  if (stackIndex === 0) {
    card.classList.add('active-card');
  } else if (stackIndex === 1) {
    card.classList.add('stack-1');
  } else {
    card.classList.add('stack-2');
  }

  const cat = DC.state.currentCategory;
  const tagBorderAlpha = {
    light: '22',
    medium: '44',
    deep: '88',
    sensitive: null,
  };
  const backBorderColor =
    question.tag === 'sensitive'
      ? 'rgba(233,69,96,0.45)'
      : cat.color + (tagBorderAlpha[question.tag] || '33');
  const TAG_LABELS = {
    light: 'nhẹ nhàng',
    medium: 'thú vị',
    deep: 'sâu sắc',
    sensitive: 'nhạy cảm',
  };
  const tagLabel = TAG_LABELS[question.tag] || '';

  let feedbackHtml = '';
  if (DC.ENABLE_FEEDBACK && stackIndex === 0) {
    const c = DC.getFeedbackCounts(cat.id, question.id);
    feedbackHtml =
      `<div class="card-feedback">` +
      `<button class="feedback-btn feedback-like" aria-label="Câu hay">` +
      `<span class="feedback-icon">\ud83d\udc4d</span>` +
      `<span class="feedback-count">${c.likes}</span>` +
      `</button>` +
      `<button class="feedback-btn feedback-dislike" aria-label="Chưa hay">` +
      `<span class="feedback-icon">\ud83d\udc4e</span>` +
      `<span class="feedback-count">${c.dislikes}</span>` +
      `</button>` +
      `</div>`;
  }

  card.innerHTML =
    `<div class="card-face card-front" style="background: linear-gradient(145deg, ${cat.color}22, ${cat.color}08), var(--bg-card-front);">` +
    `<div class="card-ornament-frame"></div>` +
    `<span class="card-front-corner top-left">❀</span>` +
    `<span class="card-front-corner top-right">๏</span>` +
    `<span class="card-front-corner bottom-left">๏</span>` +
    `<span class="card-front-corner bottom-right">❀</span>` +
    `<span class="card-edge-ornament top">✦</span>` +
    `<span class="card-edge-ornament bottom">✦</span>` +
    `<span class="card-edge-ornament left">❦</span>` +
    `<span class="card-edge-ornament right">❦</span>` +
    `<div class="card-front-inner">` +
    `<div class="card-front-icon">${cat.icon}</div>` +
    `<div class="card-front-title">Deep Connection</div>` +
    `<div class="card-front-subtitle">${cat.name_vi}</div>` +
    `<div class="card-front-hint">Chạm để lật</div>` +
    `</div>` +
    `</div>` +
    `<div class="card-face card-back" style="border-color: ${backBorderColor};">` +
    `<div class="card-ornament-frame"></div>` +
    `<span class="card-back-corner top-left">♡</span>` +
    `<span class="card-back-corner top-right">♡</span>` +
    `<span class="card-back-corner bottom-left">♡</span>` +
    `<span class="card-back-corner bottom-right">♡</span>` +
    `<span class="card-edge-ornament back-edge top">∞</span>` +
    `<span class="card-edge-ornament back-edge bottom">∞</span>` +
    `<span class="card-tag-badge tag-${question.tag || 'light'}">${tagLabel}</span>` +
    `<div class="card-question-wrap">` +
    `<p class="card-question-vi">${question.text_vi}</p>` +
    `</div>` +
    `<div class="card-divider" style="background:${cat.color};"></div>` +
    `<p class="card-question-en">${question.text_en}</p>${feedbackHtml}<span class="card-back-category">${cat.name_en}</span>` +
    `</div>`;

  if (stackIndex === 0) {
    DC.bindCardEvents(card);
    if (DC.ENABLE_FEEDBACK) DC.bindFeedbackEvents(card, question.id, cat.id);
  }

  return card;
};

// ────────────── SPECIAL CARD EFFECT ──────────────
DC.triggerSpecialCard = function triggerSpecialCard() {
  const { cardStack } = DC.refs;
  const activeCard = cardStack.querySelector('.active-card');
  if (!activeCard) return;

  const color = DC.state.currentCategory
    ? DC.state.currentCategory.color
    : '#e94560';

  activeCard.classList.remove('active-card');
  // eslint-disable-next-line no-unused-expressions
  activeCard.offsetWidth;
  activeCard.classList.add('active-card', 'special-entrance');
  activeCard.addEventListener(
    'animationend',
    () => {
      activeCard.classList.remove('special-entrance');
    },
    { once: true },
  );

  const glow = document.createElement('div');
  glow.className = 'card-special-glow';
  glow.style.setProperty('--glow-color', `${color}80`);
  activeCard.appendChild(glow);
  glow.addEventListener(
    'animationend',
    () => {
      glow.remove();
    },
    { once: true },
  );

  const shimmer = document.createElement('div');
  shimmer.className = 'card-shimmer';
  activeCard.querySelector('.card-front').appendChild(shimmer);
  setTimeout(() => {
    shimmer.remove();
  }, 1200);

  const particles = document.createElement('div');
  particles.className = 'card-particles';
  cardStack.appendChild(particles);

  const emojis = ['💖', '✨', '💕', '💗', '♥', '💫', '🌟', '💘'];
  for (let i = 0; i < 10; i += 1) {
    const p = document.createElement('span');
    p.className = 'card-particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
    const dist = 60 + Math.random() * 80;
    p.style.setProperty('--px', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--py', `${Math.sin(angle) * dist}px`);
    p.style.setProperty('--rot', `${Math.random() * 360}deg`);
    p.style.animationDelay = `${i * 0.04}s`;
    p.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
    particles.appendChild(p);
  }
  setTimeout(() => {
    particles.remove();
  }, 1200);
};
