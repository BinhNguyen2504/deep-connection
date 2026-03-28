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
        `<div class="category-name">${cat.name_vi}</div>` +
        `<div class="category-name-en">${cat.name_en}</div>` +
        `<div class="category-count">${cat.questions.length} câu hỏi</div>` +
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

  DC.refs.categoryLabel.textContent = `${category.icon} ${category.name_vi}`;
  DC.updateCounter();

  DC.switchScreen(DC.refs.screenPlay);
  DC.renderCards();
};
