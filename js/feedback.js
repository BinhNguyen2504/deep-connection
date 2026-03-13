/* ========================================
   DEEP CONNECTION — Feedback System
   ======================================== */
/* eslint-disable no-undef, no-underscore-dangle */

// ────────────── FEEDBACK FEATURE FLAG ──────────────
DC.ENABLE_FEEDBACK = true;

// ────────────── FEEDBACK WEBHOOK ──────────────
DC.FEEDBACK_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbz9Qjnut8YQA0pUCsKg04WfhzfI9Hhg9uKdOGAnEhlO9q_6Leyl5M6_z3MNS_xPoT6h/exec';

// ────────────── CATEGORY FILES ──────────────
DC.CATEGORY_FILES = [
  'first-sparks',
  'understanding',
  'passion',
  'bonding',
  'challenges',
  'future',
];

// ────────────── FEEDBACK SESSION DATA ──────────────
DC._feedbackSession = {};
DC._votedSession = {};

DC.recordFeedback = function recordFeedback(
  categoryId,
  questionId,
  type,
  previousType,
) {
  if (!DC._feedbackSession[categoryId]) DC._feedbackSession[categoryId] = {};
  const key = String(questionId);
  if (!DC._feedbackSession[categoryId][key])
    DC._feedbackSession[categoryId][key] = { likes: 0, dislikes: 0 };
  if (previousType && previousType !== type) {
    DC._feedbackSession[categoryId][key][previousType] = Math.max(
      0,
      DC._feedbackSession[categoryId][key][previousType] - 1,
    );
  }
  DC._feedbackSession[categoryId][key][type] += 1;
  if (!DC._votedSession[categoryId]) DC._votedSession[categoryId] = {};
  DC._votedSession[categoryId][key] = type;
  return DC._feedbackSession[categoryId][key];
};

DC.getUserVote = function getUserVote(categoryId, questionId) {
  return (
    (DC._votedSession[categoryId] &&
      DC._votedSession[categoryId][String(questionId)]) ||
    null
  );
};

DC.sendFeedbackWebhook = function sendFeedbackWebhook(
  categoryId,
  questionId,
  type,
) {
  if (!DC.FEEDBACK_WEBHOOK_URL) return;
  fetch(DC.FEEDBACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      category: categoryId,
      question_id: questionId,
      vote: type,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {
    // Silently catch errors
  });
};

DC.getFeedbackCounts = function getFeedbackCounts(categoryId, questionId) {
  return (
    (DC._feedbackSession[categoryId] &&
      DC._feedbackSession[categoryId][String(questionId)]) || {
      likes: 0,
      dislikes: 0,
    }
  );
};

DC.bindFeedbackEvents = function bindFeedbackEvents(
  card,
  questionId,
  categoryId,
) {
  const feedbackDiv = card.querySelector('.card-feedback');
  if (!feedbackDiv) return;

  const likeBtn = feedbackDiv.querySelector('.feedback-like');
  const dislikeBtn = feedbackDiv.querySelector('.feedback-dislike');

  const existingVote = DC.getUserVote(categoryId, questionId);
  if (existingVote === 'likes') likeBtn.classList.add('voted');
  else if (existingVote === 'dislikes') dislikeBtn.classList.add('voted');

  function handleVote(btn, type, otherBtn, otherType) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.classList.contains('voted')) return;
      const wasSwitching = otherBtn.classList.contains('voted');
      if (wasSwitching) otherBtn.classList.remove('voted');
      btn.classList.add('voted');
      const previousType = wasSwitching ? otherType : null;
      const counts = DC.recordFeedback(
        categoryId,
        questionId,
        type,
        previousType,
      );
      likeBtn.querySelector('.feedback-count').textContent = counts.likes;
      dislikeBtn.querySelector('.feedback-count').textContent = counts.dislikes;
      DC.sendFeedbackWebhook(categoryId, questionId, type);
    });
  }

  handleVote(likeBtn, 'likes', dislikeBtn, 'dislikes');
  handleVote(dislikeBtn, 'dislikes', likeBtn, 'likes');

  feedbackDiv.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });
  feedbackDiv.addEventListener(
    'touchstart',
    (e) => {
      e.stopPropagation();
    },
    { passive: true },
  );
  feedbackDiv.addEventListener('touchend', (e) => {
    e.stopPropagation();
  });
};
