/* ========================================
   DEEP CONNECTION — Contribute Questions
   ======================================== */
/* eslint-disable no-undef */

// ────────────── WEBHOOK ──────────────
DC.CONTRIBUTE_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbz9Qjnut8YQA0pUCsKg04WfhzfI9Hhg9uKdOGAnEhlO9q_6Leyl5M6_z3MNS_xPoT6h/exec';

// ────────────── COOLDOWN ──────────────
DC._contributeLastSubmit = 0;
DC.CONTRIBUTE_COOLDOWN_MS = 10000;

// ────────────── SHOW MODAL ──────────────
DC.showContributeModal = function showContributeModal(preselectedCategory) {
  var r = DC.refs;
  var select = r.contributeCategory;

  // Populate category options from loaded data
  select.innerHTML =
    '<option value="">' + DC.t('contributeCategoryPlaceholder') + '</option>';
  DC.state.categories.forEach(function (cat) {
    var opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.icon + ' ' + DC.localizedName(cat);
    if (preselectedCategory && cat.id === preselectedCategory) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  // Reset form
  r.contributeVi.value = '';
  r.contributeEn.value = '';
  r.contributeName.value = '';
  DC._clearContributeStatus();
  DC._clearFormErrors();
  r.btnContributeSubmit.classList.remove('btn-contribute-loading');
  r.btnContributeSubmit.disabled = false;

  // Reset scroll to top
  var modalContent = r.modalContribute.querySelector('.modal-contribute');
  if (modalContent) modalContent.scrollTop = 0;

  r.modalContribute.classList.add('visible');
};

// ────────────── HIDE MODAL ──────────────
DC.hideContributeModal = function hideContributeModal() {
  DC.refs.modalContribute.classList.remove('visible');
  // Re-show completion modal if on play screen with no cards left
  if (
    DC.refs.screenPlay.classList.contains('active') &&
    DC.state.remainingQuestions.length === 0
  ) {
    DC.showModal();
  }
};

// ────────────── CLEAR HELPERS ──────────────
DC._clearContributeStatus = function _clearContributeStatus() {
  var el = DC.refs.contributeStatus;
  el.textContent = '';
  el.className = 'contribute-status';
};

DC._clearFormErrors = function _clearFormErrors() {
  var groups = DC.refs.modalContribute.querySelectorAll('.form-group');
  groups.forEach(function (g) {
    g.classList.remove('has-error');
  });
};

// ────────────── SHOW STATUS ──────────────
DC._showContributeStatus = function _showContributeStatus(type, message) {
  var el = DC.refs.contributeStatus;
  el.textContent = message;
  el.className = 'contribute-status status-' + type;
};

// ────────────── VALIDATE ──────────────
DC._countWords = function _countWords(text) {
  return text.split(/\s+/).filter(function (w) {
    return w.length > 0;
  }).length;
};

DC._validateContributeForm = function _validateContributeForm() {
  DC._clearFormErrors();
  var vi = DC.refs.contributeVi.value.trim();
  var valid = true;

  if (!vi) {
    DC.refs.contributeVi.closest('.form-group').classList.add('has-error');
    DC._showContributeStatus('error', DC.t('validateViRequired'));
    valid = false;
  } else if (vi.length < 10) {
    DC.refs.contributeVi.closest('.form-group').classList.add('has-error');
    DC._showContributeStatus('error', DC.t('validateViMinLength'));
    valid = false;
  } else if (DC._countWords(vi) > 25) {
    DC.refs.contributeVi.closest('.form-group').classList.add('has-error');
    DC._showContributeStatus(
      'error',
      DC.t('validateViMaxWords').replace('{n}', DC._countWords(vi)),
    );
    valid = false;
  }

  return valid;
};

// ────────────── SUBMIT ──────────────
DC.submitContribution = function submitContribution() {
  if (!DC._validateContributeForm()) return;

  // Cooldown check
  var now = Date.now();
  if (now - DC._contributeLastSubmit < DC.CONTRIBUTE_COOLDOWN_MS) {
    var remaining = Math.ceil(
      (DC.CONTRIBUTE_COOLDOWN_MS - (now - DC._contributeLastSubmit)) / 1000,
    );
    DC._showContributeStatus(
      'error',
      DC.t('contributeCooldown').replace('{n}', remaining),
    );
    return;
  }

  var r = DC.refs;
  var payload = {
    type: 'contribute',
    category: r.contributeCategory.value || DC.t('contributeNoCategory'),
    question_vi: r.contributeVi.value.trim(),
    question_en: r.contributeEn.value.trim() || '',
    contributor_name:
      r.contributeName.value.trim() || DC.t('contributeAnonymous'),
    timestamp: new Date().toISOString(),
  };

  // Loading state
  r.btnContributeSubmit.classList.add('btn-contribute-loading');
  r.btnContributeSubmit.disabled = true;
  DC._showContributeStatus('loading', DC.t('contributeSending'));

  fetch(DC.CONTRIBUTE_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
    .then(function () {
      DC._contributeLastSubmit = Date.now();
      DC._showContributeStatus('success', DC.t('contributeSuccess'));

      // Reset form after success
      r.contributeVi.value = '';
      r.contributeEn.value = '';
      r.contributeName.value = '';
      r.contributeCategory.selectedIndex = 0;

      // Auto-close after 2s
      setTimeout(function () {
        DC.hideContributeModal();
      }, 2000);
    })
    .catch(function () {
      DC._showContributeStatus('error', DC.t('contributeError'));
    })
    .finally(function () {
      r.btnContributeSubmit.classList.remove('btn-contribute-loading');
      r.btnContributeSubmit.disabled = false;
    });
};

// ────────────── BIND EVENTS ──────────────
DC.bindContributeEvents = function bindContributeEvents() {
  var r = DC.refs;

  // Submit
  r.contributeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    DC.submitContribution();
  });

  // Cancel
  r.btnContributeCancel.addEventListener('click', function () {
    DC.hideContributeModal();
  });

  // Click overlay to close
  r.modalContribute.addEventListener('click', function (e) {
    if (e.target === r.modalContribute) {
      DC.hideContributeModal();
    }
  });

  // Entry points
  r.btnContribute.addEventListener('click', function () {
    DC.showContributeModal();
  });

  r.btnContributeModal.addEventListener('click', function () {
    DC.hideModal();
    DC.showContributeModal(
      DC.state.currentCategory ? DC.state.currentCategory.id : null,
    );
  });

  // Clear error state on input
  r.contributeVi.addEventListener('input', function () {
    r.contributeVi.closest('.form-group').classList.remove('has-error');
    DC._clearContributeStatus();
  });
};
