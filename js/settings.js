/* ========================================
   DEEP CONNECTION — Settings Bottom Sheet
   ======================================== */
/* eslint-disable no-undef */

// ────────────── SHOW / HIDE ──────────────
DC.showSettings = function showSettings() {
  DC.syncSettingsUI();
  DC.refs.settingsOverlay.classList.add('visible');
  DC.refs.settingsSheet.classList.add('visible');
  DC.playSound('deal');
};

DC.hideSettings = function hideSettings() {
  DC.refs.settingsOverlay.classList.remove('visible');
  DC.refs.settingsSheet.classList.remove('visible');
};

// ────────────── FONT SIZE ──────────────
DC.initFontSize = function initFontSize() {
  var saved = localStorage.getItem('dc-font-size');
  if (saved && ['small', 'medium', 'large'].indexOf(saved) !== -1) {
    DC.state.fontSize = saved;
  }
  document.documentElement.setAttribute('data-font-size', DC.state.fontSize);
};

DC.setFontSize = function setFontSize(size) {
  if (['small', 'medium', 'large'].indexOf(size) === -1) return;
  DC.state.fontSize = size;
  document.documentElement.setAttribute('data-font-size', size);
  localStorage.setItem('dc-font-size', size);
  DC.syncFontSizeUI();
  DC.playSound('deal');
};

DC.syncFontSizeUI = function syncFontSizeUI() {
  var group = DC.refs.settingsFontSizeGroup;
  if (!group) return;
  var btns = group.querySelectorAll('.settings-font-size-btn');
  btns.forEach(function (btn) {
    if (btn.getAttribute('data-size') === DC.state.fontSize) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
};

// ────────────── SYNC UI STATE ──────────────
DC.syncSettingsUI = function syncSettingsUI() {
  var r = DC.refs;

  // Sound icon — toggle class instead of swapping text
  if (r.settingsSoundToggle) {
    if (DC.state.soundEnabled) {
      r.settingsSoundToggle.classList.remove('sound-disabled');
    } else {
      r.settingsSoundToggle.classList.add('sound-disabled');
    }
  }

  // Language — use SVG flag
  var langData = DC.LANGUAGES[DC.state.language];
  if (r.settingsLangFlag && langData) {
    r.settingsLangFlag.innerHTML = langData.flagSvg || langData.flag;
  }
  if (r.settingsLangLabel) {
    r.settingsLangLabel.textContent = langData.label;
  }

  // Font size
  DC.syncFontSizeUI();
};

// ────────────── BIND EVENTS ──────────────
DC.bindSettingsEvents = function bindSettingsEvents() {
  var r = DC.refs;

  // Close on backdrop click
  r.settingsOverlay.addEventListener('click', function () {
    DC.hideSettings();
  });

  // Prevent sheet clicks from closing
  r.settingsSheet.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // Close button
  r.settingsClose.addEventListener('click', function () {
    DC.hideSettings();
  });

  // Theme toggle — CSS handles animation via data-theme attribute
  r.settingsThemeToggle.addEventListener('click', function () {
    DC.toggleTheme();
    // syncSettingsUI still needed for other non-theme UI
    DC.syncSettingsUI();
  });

  // Sound toggle — with bounce animation
  r.settingsSoundToggle.addEventListener('click', function () {
    DC.toggleSound();
    DC.syncSettingsUI();
    // Trigger bounce
    r.settingsSoundToggle.classList.add('sound-animating');
    r.settingsSoundToggle.addEventListener(
      'animationend',
      function () {
        r.settingsSoundToggle.classList.remove('sound-animating');
      },
      { once: true },
    );
  });

  // Language cycle button — with flag swap animation
  r.settingsLangBtn.addEventListener('click', function () {
    var flagEl = r.settingsLangFlag;
    if (flagEl) {
      flagEl.classList.add('flag-animating');
      // Swap content midway through animation
      setTimeout(function () {
        DC.cycleLanguage();
        DC.syncSettingsUI();
      }, 160);
      flagEl.addEventListener(
        'animationend',
        function () {
          flagEl.classList.remove('flag-animating');
        },
        { once: true },
      );
    } else {
      DC.cycleLanguage();
      DC.syncSettingsUI();
    }
  });

  // Gear buttons (all screens)
  document.querySelectorAll('.settings-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      DC.showSettings();
    });
  });

  // Font size segment buttons
  if (r.settingsFontSizeGroup) {
    r.settingsFontSizeGroup.addEventListener('click', function (e) {
      var btn = e.target.closest('.settings-font-size-btn');
      if (!btn) return;
      var size = btn.getAttribute('data-size');
      if (size) DC.setFontSize(size);
    });
  }
};
