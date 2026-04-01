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

// ────────────── FEEDBACK DATA ──────────────
// Server-side aggregated counts loaded at init
DC._reactionCounts = {};
// User's own votes — persisted to localStorage
DC._userVotes = {};

// ────────────── LOCALSTORAGE KEYS ──────────────
DC._LS_REACTION_COUNTS = 'dc-reaction-counts';
DC._LS_USER_VOTES = 'dc-user-votes';

// ────────────── LOAD USER VOTES FROM LOCALSTORAGE ──────────────
DC._loadUserVotes = function _loadUserVotes() {
  try {
    var data = localStorage.getItem(DC._LS_USER_VOTES);
    if (data) DC._userVotes = JSON.parse(data);
  } catch (_) {
    // ignore
  }
};

DC._saveUserVotes = function _saveUserVotes() {
  try {
    localStorage.setItem(DC._LS_USER_VOTES, JSON.stringify(DC._userVotes));
  } catch (_) {
    // ignore
  }
};

// ────────────── LOAD REACTION COUNTS FROM SERVER ──────────────
DC.loadReactionCounts = async function loadReactionCounts() {
  DC._loadUserVotes();

  // Try fetching from server
  try {
    var url = DC.FEEDBACK_WEBHOOK_URL;
    if (!url) return;
    var res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var json = await res.json();
    if (json && json.data) {
      DC._reactionCounts = json.data;
      // Cache to localStorage
      try {
        localStorage.setItem(
          DC._LS_REACTION_COUNTS,
          JSON.stringify(DC._reactionCounts),
        );
      } catch (_) {
        // ignore
      }
    }
  } catch (_) {
    // Fallback: load from localStorage cache
    try {
      var cached = localStorage.getItem(DC._LS_REACTION_COUNTS);
      if (cached) DC._reactionCounts = JSON.parse(cached);
    } catch (_e) {
      // ignore
    }
  }
};

// ────────────── GET COUNTS (server + local delta) ──────────────
DC.getFeedbackCounts = function getFeedbackCounts(categoryId, questionId) {
  var key = String(questionId);
  var server =
    (DC._reactionCounts[categoryId] && DC._reactionCounts[categoryId][key]) ||
    null;
  return {
    likes: server ? server.likes || 0 : 0,
    dislikes: server ? server.dislikes || 0 : 0,
  };
};

// ────────────── GET USER VOTE ──────────────
DC.getUserVote = function getUserVote(categoryId, questionId) {
  return (
    (DC._userVotes[categoryId] &&
      DC._userVotes[categoryId][String(questionId)]) ||
    null
  );
};

// ────────────── SET USER VOTE (+ persist) ──────────────
DC._setUserVote = function _setUserVote(categoryId, questionId, type) {
  if (!DC._userVotes[categoryId]) DC._userVotes[categoryId] = {};
  var key = String(questionId);
  if (type) {
    DC._userVotes[categoryId][key] = type;
  } else {
    delete DC._userVotes[categoryId][key];
  }
  DC._saveUserVotes();
};

// ────────────── SEND FEEDBACK TO SERVER ──────────────
DC.sendFeedbackWebhook = function sendFeedbackWebhook(
  categoryId,
  questionId,
  vote,
  action,
) {
  if (!DC.FEEDBACK_WEBHOOK_URL) return;
  fetch(DC.FEEDBACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      category: categoryId,
      question_id: questionId,
      vote: vote,
      action: action,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      if (json && typeof json.likes === 'number') {
        // Update local cache with server-confirmed counts
        if (!DC._reactionCounts[categoryId])
          DC._reactionCounts[categoryId] = {};
        DC._reactionCounts[categoryId][String(questionId)] = {
          likes: json.likes,
          dislikes: json.dislikes,
        };
        try {
          localStorage.setItem(
            DC._LS_REACTION_COUNTS,
            JSON.stringify(DC._reactionCounts),
          );
        } catch (_) {
          // ignore
        }
      }
    })
    .catch(function () {
      // Silently catch errors — optimistic UI already updated
    });
};

// ────────────── OPTIMISTIC COUNT UPDATE ──────────────
DC._applyOptimisticUpdate = function _applyOptimisticUpdate(
  categoryId,
  questionId,
  vote,
  action,
) {
  if (!DC._reactionCounts[categoryId]) DC._reactionCounts[categoryId] = {};
  var key = String(questionId);
  if (!DC._reactionCounts[categoryId][key])
    DC._reactionCounts[categoryId][key] = { likes: 0, dislikes: 0 };
  var c = DC._reactionCounts[categoryId][key];

  if (action === 'add') {
    c[vote] = (c[vote] || 0) + 1;
  } else if (action === 'remove') {
    c[vote] = Math.max(0, (c[vote] || 0) - 1);
  } else if (action === 'switch') {
    var other = vote === 'likes' ? 'dislikes' : 'likes';
    c[vote] = (c[vote] || 0) + 1;
    c[other] = Math.max(0, (c[other] || 0) - 1);
  }

  return { likes: c.likes, dislikes: c.dislikes };
};

// ────────────── BIND FEEDBACK EVENTS ──────────────
DC.bindFeedbackEvents = function bindFeedbackEvents(
  card,
  questionId,
  categoryId,
) {
  var feedbackDiv = card.querySelector('.card-feedback');
  if (!feedbackDiv) return;

  var likeBtn = feedbackDiv.querySelector('.feedback-like');
  var dislikeBtn = feedbackDiv.querySelector('.feedback-dislike');

  // Restore user's existing vote
  var existingVote = DC.getUserVote(categoryId, questionId);
  if (existingVote === 'likes') likeBtn.classList.add('voted');
  else if (existingVote === 'dislikes') dislikeBtn.classList.add('voted');

  function updateCountsUI(counts) {
    likeBtn.querySelector('.feedback-count').textContent = counts.likes;
    dislikeBtn.querySelector('.feedback-count').textContent = counts.dislikes;
  }

  function handleVote(btn, type, otherBtn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var currentVote = DC.getUserVote(categoryId, questionId);
      var action;
      var counts;

      // Trigger pop animation
      btn.classList.remove('feedback-pop');
      void btn.offsetWidth;
      btn.classList.add('feedback-pop');
      btn.addEventListener(
        'animationend',
        function () {
          btn.classList.remove('feedback-pop');
        },
        { once: true },
      );

      if (currentVote === type) {
        // Un-vote (toggle off) — clicking the same button again
        btn.classList.remove('voted');
        action = 'remove';
        DC._setUserVote(categoryId, questionId, null);
        counts = DC._applyOptimisticUpdate(
          categoryId,
          questionId,
          type,
          action,
        );
      } else if (currentVote) {
        // Switch vote — was voting the other type
        otherBtn.classList.remove('voted');
        btn.classList.add('voted');
        action = 'switch';
        DC._setUserVote(categoryId, questionId, type);
        counts = DC._applyOptimisticUpdate(
          categoryId,
          questionId,
          type,
          action,
        );
      } else {
        // New vote
        btn.classList.add('voted');
        action = 'add';
        DC._setUserVote(categoryId, questionId, type);
        counts = DC._applyOptimisticUpdate(
          categoryId,
          questionId,
          type,
          action,
        );
      }

      updateCountsUI(counts);
      DC.sendFeedbackWebhook(categoryId, questionId, type, action);
    });
  }

  handleVote(likeBtn, 'likes', dislikeBtn);
  handleVote(dislikeBtn, 'dislikes', likeBtn);

  // Stop propagation to prevent card flip/swipe
  feedbackDiv.addEventListener('mousedown', function (e) {
    e.stopPropagation();
  });
  feedbackDiv.addEventListener(
    'touchstart',
    function (e) {
      e.stopPropagation();
    },
    { passive: true },
  );
  feedbackDiv.addEventListener('touchend', function (e) {
    e.stopPropagation();
  });
};
