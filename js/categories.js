/* ========================================
   DEEP CONNECTION — Categories
   ======================================== */
/* eslint-disable no-undef */

DC.renderCategories = function renderCategories() {
  const { categoryGrid } = DC.refs;
  categoryGrid.innerHTML = DC.state.categories
    .map(
      (cat) =>
        `<div class="category-card" data-id="${cat.id}" style="--category-color:${cat.color}">` +
        `<div class="category-icon">${cat.icon}</div>` +
        `<div class="category-name">${DC.localizedName(cat)}</div>` +
        `<div class="category-name-en">${cat.name_en}</div>` +
        `<div class="category-count">${cat.questions.length} ${DC.t('questions')}</div>` +
        `</div>`,
    )
    .join('');

  categoryGrid.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', () => {
      const cat = DC.state.categories.find((c) => c.id === card.dataset.id);
      if (cat) DC.startCategory(cat);
    });
  });
};

DC.startCategory = function startCategory(category) {
  DC.playSound('deal');
  DC.state.currentCategory = category;
  DC.state.remainingQuestions = category.questions.slice();
  DC.state.usedQuestions = [];
  DC.state.isFlipped = false;
  DC.state.swipeHintShown = false;

  DC.refs.categoryLabel.textContent = `${category.icon} ${DC.localizedName(category)}`;
  DC.updateCounter();

  DC.switchScreen(DC.refs.screenPlay, {
    exit: 'screen-exit-left',
    enter: 'screen-enter-right',
  });
  DC.renderCards();
};
