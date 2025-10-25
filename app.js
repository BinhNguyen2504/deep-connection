// ==========================================
// BẢNG MÀU
// ==========================================
const colorPalette = ['#FDFBFA', '#FCE5D0', '#F5D6E1', '#E59EAC', '#E77B6F'];

// ==========================================
// LOGIC ỨNG DỤNG (ĐÃ VIẾT LẠI)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Biến 'categories' đã có sẵn từ file questions.js
  if (typeof categories === 'undefined') {
    alert('Lỗi: Không thể tải tệp questions.js');
    return;
  }

  const cardContainer = document.getElementById('cardContainer');

  let currentCardIndex = 0;
  let cards = []; // Mảng chứa các thẻ (Cover, Menu, và các thẻ câu hỏi)
  let touchStartX = 0;
  let touchEndX = 0;

  // Giữ tham chiếu đến 2 thẻ chính
  let coverCard = null;
  let menuCard = null;

  // --- 1. Hàm khởi tạo ứng dụng ---
  function initializeApp() {
    cardContainer.innerHTML = '';
    cards = [];
    currentCardIndex = 0;

    // 1a. Tạo thẻ Bìa (index 0)
    coverCard = createCoverCard();
    cards.push(coverCard);
    cardContainer.appendChild(coverCard);

    // 1b. Tạo thẻ Menu (index 1)
    menuCard = createMenuCard();
    cards.push(menuCard);
    cardContainer.appendChild(menuCard);

    // 1c. Gán sự kiện vuốt
    addSwipeListeners();
  }

  // --- 2. Hàm tạo thẻ Bìa ---
  function createCoverCard() {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundColor = colorPalette[0]; // Màu 1
    card.innerHTML = `
            <div class="cover-content">
                <h1>Deep<br>Connection</h1>
                <p>Vuốt để bắt đầu</p>
            </div>
        `;
    card.style.zIndex = 2; // Thẻ Bìa có z-index = 2
    card.style.transform = 'scale(1)';
    card.style.opacity = '1';
    card.style.pointerEvents = 'auto';
    return card;
  }

  // --- 3. Hàm tạo thẻ Menu (MỚI) ---
  function createMenuCard() {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundColor = colorPalette[1]; // Màu 2

    let menuButtonsHTML = '';
    // Lặp qua các chủ đề trong 'categories'
    for (const key in categories) {
      menuButtonsHTML += `
                <button class="menu-button" data-key="${key}">
                    ${categories[key].title}
                </button>
            `;
    }

    card.innerHTML = `
            <div class="menu-content">
                <h2>Chọn một chủ đề</h2>
                ${menuButtonsHTML}
            </div>
        `;

    // Xếp chồng bên dưới thẻ Bìa
    card.style.zIndex = 1; // Thẻ Menu có z-index = 1
    card.style.transform = 'scale(0.9)';
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';

    // Gán sự kiện click cho các nút menu
    card.querySelectorAll('.menu-button').forEach((button) => {
      button.addEventListener('click', () => {
        buildQuestionDeck(button.dataset.key);
      });
    });

    return card;
  }

  // --- 4. Hàm tạo bộ thẻ câu hỏi (MỚI) ---
  function buildQuestionDeck(categoryKey) {
    // 4a. Xóa bộ câu hỏi cũ (nếu có)
    // Bắt đầu xóa từ index 2 (vì 0 là Cover, 1 là Menu)
    while (cards.length > 2) {
      const oldCard = cards.pop(); // Xóa khỏi mảng
      cardContainer.removeChild(oldCard); // Xóa khỏi DOM
    }

    const questionSet = categories[categoryKey].questions;
    const totalQuestions = questionSet.length;
    const totalCardsInDeck = totalQuestions + 2; // +2 (Cover, Menu)

    // 4b. Tạo các thẻ câu hỏi mới
    questionSet.forEach((q, index) => {
      const card = createQuestionCard(
        q,
        index,
        totalQuestions,
        totalCardsInDeck
      );
      cards.push(card);
      cardContainer.appendChild(card);
    });

    // 4c. Tự động chuyển sang thẻ câu hỏi đầu tiên
    // (Lúc này currentCardIndex đang là 1 - Menu)
    showNextCard();
  }

  // --- 5. Hàm tạo 1 thẻ câu hỏi (Refactor) ---
  function createQuestionCard(q, index, totalQuestions, totalCardsInDeck) {
    const card = document.createElement('div');
    card.className = 'card';

    // Lấy màu xoay vòng, bắt đầu từ màu T3
    const colorIndex = (index + 2) % colorPalette.length;
    card.style.backgroundColor = colorPalette[colorIndex];

    const pageNum = index + 1;
    const cardIndex = index + 2; // Vị trí (sau Cover, Menu)

    card.innerHTML = `
            <div class="question-block">
                <span class="quote-mark top">“</span>
                <p class="question-vi">${q.vi}</p>
                <hr class="divider">
                <p class="question-en">${q.en}</p>
                <span class="quote-mark bottom">”</span>
            </div>
            <p class="brand">Deep Connection</p>
            <span class="page-number">${pageNum} / ${totalQuestions}</span>
        `;

    // Xếp chồng bên dưới
    card.style.zIndex = totalCardsInDeck - cardIndex; // zIndex âm
    card.style.transform = 'scale(0.9)';
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';

    return card;
  }

  // --- 6. Hàm quay về Menu (MỚI) ---
  function returnToMenu() {
    if (currentCardIndex <= 1) return; // Đang ở Menu hoặc Cover

    // Ẩn thẻ hiện tại (thẻ câu hỏi cuối)
    const lastCard = cards[currentCardIndex];
    lastCard.style.transform = 'scale(0.9)';
    lastCard.style.opacity = '0';
    lastCard.style.pointerEvents = 'none';

    // Đặt index về 1 (Menu)
    currentCardIndex = 1;

    // Hiển thị Menu
    const menu = cards[currentCardIndex];
    menu.style.transform = 'scale(1) translateX(0) rotate(0)';
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'auto';
  }

  // --- 7. Hàm xử lý chuyển thẻ (Tiếp theo) ---
  function showNextCard() {
    // Nếu đã hết thẻ câu hỏi trong bộ
    if (currentCardIndex >= cards.length - 1) {
      if (confirm('Đã hết câu hỏi. Quay về menu chính?')) {
        returnToMenu();
      }
      return;
    }

    const currentCard = cards[currentCardIndex];
    currentCard.style.transform = 'translateX(-120%) rotate(-10deg)';
    currentCard.style.opacity = '0';
    currentCard.style.pointerEvents = 'none';

    currentCardIndex++;

    const nextCard = cards[currentCardIndex];
    nextCard.style.transform = 'scale(1)';
    nextCard.style.opacity = '1';
    nextCard.style.pointerEvents = 'auto';
  }

  // --- 8. Hàm xử lý chuyển thẻ (Quay lại) ---
  function showPrevCard() {
    if (currentCardIndex <= 0) {
      // Đang ở thẻ bìa, không lùi được nữa
      return;
    }

    const currentCard = cards[currentCardIndex];
    currentCard.style.transform = 'scale(0.9)';
    currentCard.style.opacity = '0';
    currentCard.style.pointerEvents = 'none';

    currentCardIndex--;

    const prevCard = cards[currentCardIndex];
    prevCard.style.transform = 'scale(1) translateX(0) rotate(0)';
    prevCard.style.opacity = '1';
    prevCard.style.pointerEvents = 'auto';
  }

  // --- 9. Gán sự kiện Vuốt (Swipe) ---
  function addSwipeListeners() {
    cardContainer.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    cardContainer.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      showNextCard();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      showPrevCard();
    }
    touchStartX = 0;
    touchEndX = 0;
  }

  // --- Bắt đầu chạy ứng dụng ---
  initializeApp();
});
