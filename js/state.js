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
  soundEnabled: true,
  language: 'vi',
  fontSize: 'medium',
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
  r.homeTopActions = $('.home-top-actions');
  r.homeContainer = $('.home-container');
  r.infoLogo = $('#info-logo');
  r.dedication = $('#dedication');
  r.homeSubtitle = $('.app-subtitle');
  r.homeFooter = $('.home-footer p');

  // Cover screen i18n
  r.coverSubtitle = $('#cover-subtitle');
  r.coverStartHint = $('#cover-start-hint');
  r.coverFooter = $('#cover-footer-text');

  // Play screen i18n
  r.swipeHintText = $('#swipe-hint-text');
  r.btnPrevLabel = $('#btn-prev-label');
  r.tapHint = $('#tap-hint');

  // Completion modal i18n
  r.modalResetTitle = $('#modal-reset-title');
  r.modalResetText = $('#modal-reset-text');

  // Info screen i18n
  r.infoHeaderTitle = $('#info-header-title');
  r.infoTagline = $('#info-tagline');
  r.infoAboutTitle = $('#info-about-title');
  r.infoAboutText = $('#info-about-text');
  r.infoHowTitle = $('#info-how-title');
  r.infoStep1 = $('#info-step-1');
  r.infoStep2 = $('#info-step-2');
  r.infoStep3 = $('#info-step-3');
  r.infoStep4 = $('#info-step-4');
  r.infoContributeTitle = $('#info-contribute-title');
  r.infoContributeText = $('#info-contribute-text');
  r.infoContributeCta = $('#btn-contribute');
  r.infoAuthorTitle = $('#info-author-title');
  r.infoAuthorText = $('#info-author-text');

  // Contribute modal i18n
  r.contributeModalTitle = $('#contribute-modal-title');
  r.contributeModalDesc = $('#contribute-modal-desc');
  r.contributeCategoryLabel = $('#contribute-category-label');
  r.contributeViLabel = $('#contribute-vi-label');
  r.contributeEnLabel = $('#contribute-en-label');
  r.contributeNameLabel = $('#contribute-name-label');

  // Contribute modal
  r.modalContribute = $('#modal-contribute');
  r.contributeForm = $('#contribute-form');
  r.contributeCategory = $('#contribute-category');
  r.contributeVi = $('#contribute-vi');
  r.contributeEn = $('#contribute-en');
  r.contributeName = $('#contribute-name');
  r.contributeStatus = $('#contribute-status');
  r.btnContributeSubmit = $('#btn-contribute-submit');
  r.btnContributeCancel = $('#btn-contribute-cancel');
  r.btnContribute = $('#btn-contribute');
  r.btnContributeModal = $('#btn-contribute-modal');

  // Settings bottom sheet
  r.settingsOverlay = $('#settings-overlay');
  r.settingsSheet = $('#settings-sheet');
  r.settingsClose = $('#settings-close');
  r.settingsTitle = $('#settings-title');
  r.settingsThemeToggle = $('#settings-theme-toggle');
  r.settingsThemeLabel = $('#settings-theme-label');
  r.settingsThemeSublabel = $('#settings-theme-sublabel');
  r.settingsSoundToggle = $('#settings-sound-toggle');
  r.settingsSoundLabel = $('#settings-sound-label');
  r.settingsSoundSublabel = $('#settings-sound-sublabel');
  r.settingsLangBtn = $('#settings-lang-btn');
  r.settingsLangFlag = $('#settings-lang-flag');
  r.settingsLangLabel = $('#settings-lang-label-text');
  r.settingsLangRowLabel = $('#settings-lang-label');
  r.settingsLangSublabel = $('#settings-lang-sublabel');

  // Font size
  r.settingsFontSizeLabel = $('#settings-fontsize-label');
  r.settingsFontSizeSublabel = $('#settings-fontsize-sublabel');
  r.settingsFontSizeGroup = $('#settings-fontsize-group');
};
