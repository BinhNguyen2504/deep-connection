/* ========================================
   DEEP CONNECTION — State & DOM Refs
   ======================================== */
/* eslint-disable no-undef */

window.DC = {};

// ────────────── STATE ──────────────
DC.state = {
  categories: [],
  currentCategory: null,
  remainingQuestions: [],
  usedQuestions: [],
  currentQuestion: null,
  isFlipped: false,
  isSwiping: false,
  swipeHintShown: false,
  theme: 'dark',
};

// ────────────── DOM REFS ──────────────
DC.$ = function $(sel) {
  return document.querySelector(sel);
};

DC.refs = {};

DC.initRefs = function initRefs() {
  const { $ } = DC;
  const r = DC.refs;
  r.screenCover = $('#screen-cover');
  r.screenHome = $('#screen-home');
  r.screenPlay = $('#screen-play');
  r.screenInfo = $('#screen-info');
  r.categoryGrid = $('#category-grid');
  r.cardStack = $('#card-stack');
  r.cardCounter = $('#card-counter');
  r.categoryLabel = $('#category-label');
  r.btnBack = $('#btn-back');
  r.btnShuffle = $('#btn-shuffle');
  r.swipeHint = $('#swipe-hint');
  r.modalReset = $('#modal-reset');
  r.btnReset = $('#btn-reset');
  r.btnHome = $('#btn-home');
  r.btnPrev = $('#btn-prev');
  r.btnInfo = $('#btn-info');
  r.btnInfoBack = $('#btn-info-back');
  r.infoLogo = $('#info-logo');
  r.dedication = $('#dedication');
};
