/* ========================================
   DEEP CONNECTION — JavaScript (app.js)
   ======================================== */
/* eslint-disable no-use-before-define */

(function deepConnection() {
	// ────────────── STATE ──────────────
	const state = {
		categories: [],
		currentCategory: null,
		remainingQuestions: [],
		usedQuestions: [],
		currentQuestion: null,
		isFlipped: false,
		isSwiping: false,
		swipeHintShown: false,
		cardsSinceSpecial: 0,
		theme: "dark"
	};

	// ────────────── DOM REFS ──────────────
	const $ = (sel) => document.querySelector(sel);
	const screenCover = $("#screen-cover");
	const screenHome = $("#screen-home");
	const screenPlay = $("#screen-play");
	const categoryGrid = $("#category-grid");
	const cardStack = $("#card-stack");
	const cardCounter = $("#card-counter");
	const categoryLabel = $("#category-label");
	const btnBack = $("#btn-back");
	const btnShuffle = $("#btn-shuffle");
	const swipeHint = $("#swipe-hint");
	const modalReset = $("#modal-reset");
	const btnReset = $("#btn-reset");
	const btnHome = $("#btn-home");

	// ────────────── CATEGORY FILES ──────────────
	const CATEGORY_FILES = [
		"first-sparks",
		"understanding",
		"passion",
		"bonding",
		"challenges",
		"future"
	];

	// ────────────── UTILS ──────────────
	function shuffleArray(arr) {
		const array = arr;
		for (let i = array.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			// eslint-disable-next-line no-param-reassign
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function switchScreen(target) {
		document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
		target.classList.add("active");
	}

	// ────────────── SCREEN SWITCH ──────────────
	function bindCoverEvents() {
		screenCover.addEventListener("click", () => {
			switchScreen(screenHome);
		});
	}

	// ────────────── INIT ──────────────
	async function init() {
		try {
			initTheme();
			// Load each category from its own JSON file
			const categoryPromises = CATEGORY_FILES.map(async (id) => {
				const res = await fetch(`data/${id}.json`);
				if (!res.ok) throw new Error(`Failed to load ${id}.json`);
				return res.json();
			});
			state.categories = await Promise.all(categoryPromises);
			renderCategories();
			bindGlobalEvents();
			bindCoverEvents();
		} catch (err) {
			console.error("Error loading data:", err);
			categoryGrid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:2rem;">
          ⚠️ Không thể tải dữ liệu. Vui lòng kiểm tra lại các file trong thư mục <code>data/.
        </div>`;
		}
	}

	// ────────────── THEME TOGGLE ──────────────
	function initTheme() {
		const saved = localStorage.getItem("dc-theme") || "dark";
		state.theme = saved;
		applyTheme(saved);
	}

	function applyTheme(theme) {
		if (theme === "light") {
			document.documentElement.setAttribute("data-theme", "light");
		} else {
			document.documentElement.removeAttribute("data-theme");
		}
		// Update all toggle button icons
		const icon = theme === "light" ? "☀️" : "🌙";
		document.querySelectorAll(".theme-icon").forEach((el) => {
			const element = el;
			element.textContent = icon;
		});
		// Update meta theme-color
		const metaColor = document.querySelector('meta[name="theme-color"]');
		if (metaColor) {
			metaColor.content = theme === "light" ? "#faf5f0" : "#1a1a2e";
		}
	}

	function toggleTheme() {
		state.theme = state.theme === "dark" ? "light" : "dark";
		localStorage.setItem("dc-theme", state.theme);
		applyTheme(state.theme);
	}

	// ────────────── RENDER CATEGORIES ──────────────
	function renderCategories() {
		categoryGrid.innerHTML = state.categories
			.map(
				(cat) => `
        <div class="category-card" data-id="${cat.id}" style="--category-color:${cat.color}">
          <div class="category-icon">${cat.icon}</div>
          <div class="category-name">${cat.name_vi}</div>
          <div class="category-name-en">${cat.name_en}</div>
          <div class="category-count">${cat.questions.length} câu hỏi</div>
        </div>`
			)
			.join("");

		// Bind click
		categoryGrid.querySelectorAll(".category-card").forEach((card) => {
			card.addEventListener("click", () => {
				const cat = state.categories.find((c) => c.id === card.dataset.id);
				if (cat) startCategory(cat);
			});
		});
	}

	// ────────────── START CATEGORY ──────────────
	function startCategory(category) {
		state.currentCategory = category;
		state.remainingQuestions = [...category.questions];
		state.usedQuestions = [];
		state.isFlipped = false;
		state.swipeHintShown = false;
		state.cardsSinceSpecial = 0;

		categoryLabel.textContent = `${category.icon} ${category.name_vi}`;
		updateCounter();

		switchScreen(screenPlay);
		renderCards();
	}

	// ────────────── RENDER CARDS (Stack of 3) ──────────────
	function renderCards() {
		cardStack.innerHTML = "";

		if (state.remainingQuestions.length === 0) {
			showModal();
			return;
		}

		// Show up to 3 (current + 2 behind)
		const visibleCount = Math.min(3, state.remainingQuestions.length);

		for (let i = visibleCount - 1; i >= 0; i -= 1) {
			const q = state.remainingQuestions[i];
			const card = createCardElement(q, i);
			cardStack.appendChild(card);
		}

		// eslint-disable-next-line prefer-destructuring
		state.currentQuestion = state.remainingQuestions[0];
		state.isFlipped = false;
		updateCounter();

		// Toggle last-card class for stack shadow visibility
		if (state.remainingQuestions.length <= 1) {
			cardStack.classList.add("last-card");
		} else {
			cardStack.classList.remove("last-card");
		}
	}

	function createCardElement(question, stackIndex) {
		const card = document.createElement("div");
		card.className = "deep-card";
		card.dataset.questionId = question.id;

		if (stackIndex === 0) {
			card.classList.add("active-card");
		} else if (stackIndex === 1) {
			card.classList.add("stack-1");
		} else {
			card.classList.add("stack-2");
		}

		const cat = state.currentCategory;

		card.innerHTML = `
      <div class="card-face card-front" style="background: linear-gradient(145deg, ${cat.color}22, ${cat.color}08), var(--bg-card-front);">
        <div class="card-ornament-frame"></div>
        <span class="card-front-corner top-left">❀</span>
        <span class="card-front-corner top-right">๏</span>
        <span class="card-front-corner bottom-left">๏</span>
        <span class="card-front-corner bottom-right">❀</span>
        <span class="card-edge-ornament top">✦</span>
        <span class="card-edge-ornament bottom">✦</span>
        <span class="card-edge-ornament left">❦</span>
        <span class="card-edge-ornament right">❦</span>
        <div class="card-front-inner">
          <div class="card-front-icon">${cat.icon}</div>
          <div class="card-front-title">Deep Connection</div>
          <div class="card-front-subtitle">${cat.name_vi}</div>
          <div class="card-front-hint">Chạm để lật</div>
        </div>
      </div>
      <div class="card-face card-back" style="border-color: ${cat.color}33;">
        <div class="card-ornament-frame"></div>
        <span class="card-back-corner top-left">♡</span>
        <span class="card-back-corner top-right">♡</span>
        <span class="card-back-corner bottom-left">♡</span>
        <span class="card-back-corner bottom-right">♡</span>
        <span class="card-edge-ornament back-edge top">∞</span>
        <span class="card-edge-ornament back-edge bottom">∞</span>
        <p class="card-question-vi">${question.text_vi}</p>
        <div class="card-divider" style="background:${cat.color};"></div>
        <p class="card-question-en">${question.text_en}</p>
        <span class="card-back-category">${cat.name_en}</span>
      </div>
    `;

		// Only active card has interactions
		if (stackIndex === 0) {
			bindCardEvents(card);
		}

		return card;
	}

	// ────────────── CARD EVENTS ──────────────
	function bindCardEvents(card) {
		let startX = 0;
		let startY = 0;
		let currentX = 0;
		let isDragging = false;
		let hasMoved = false;
		let lastTouchTime = 0;

		const onStart = (e) => {
			if (state.isSwiping) return;
			// Prevent ghost mouse events after touch
			if (e.touches) lastTouchTime = Date.now();
			if (!e.touches && Date.now() - lastTouchTime < 500) return;

			const touch = e.touches ? e.touches[0] : e;
			startX = touch.clientX;
			startY = touch.clientY;
			currentX = 0;
			isDragging = true;
			hasMoved = false;
			card.classList.add("swiping");
		};

		const onMove = (e) => {
			if (!isDragging) return;
			const touch = e.touches ? e.touches[0] : e;
			const deltaX = touch.clientX - startX;
			const deltaY = touch.clientY - startY;

			// If vertical scroll > horizontal, don't swipe
			if (!hasMoved && Math.abs(deltaY) > Math.abs(deltaX)) {
				isDragging = false;
				card.classList.remove("swiping");
				return;
			}

			hasMoved = true;
			e.preventDefault();
			currentX = deltaX;

			// When flipped, rotateY(180deg) inverts X axis so negate for correct visual direction
			const visualDelta = state.isFlipped ? -deltaX : deltaX;
			const rotation = visualDelta * 0.08;
			const opacity = 1 - Math.abs(deltaX) / 600;

			const flipTransform = state.isFlipped ? "rotateY(180deg) " : "";
			// eslint-disable-next-line no-param-reassign
			card.style.transform = `${flipTransform}translateX(${visualDelta}px) rotate(${rotation}deg)`;
			// eslint-disable-next-line no-param-reassign
			card.style.opacity = `${Math.max(opacity, 0.3)}`;
		};

		const onEnd = () => {
			if (!isDragging) return;
			isDragging = false;

			const threshold = 80;

			if (Math.abs(currentX) > threshold) {
				// Swipe out — keep .swiping on to prevent CSS transition flash,
				// then set inline transition to animate the exit.
				state.isSwiping = true;
				const direction = currentX > 0 ? 1 : -1;
				const visualDir = state.isFlipped ? -direction : direction;
				const flipPart = state.isFlipped ? "rotateY(180deg) " : "";
				// Inline transition overrides .swiping's transition:none
				// eslint-disable-next-line no-param-reassign
				card.style.transition = "transform 0.4s ease, opacity 0.4s ease";
				// eslint-disable-next-line no-param-reassign
				card.style.transform = `${flipPart}translateX(${visualDir * 150}%) rotate(${
					visualDir * 20
				}deg)`;
				// eslint-disable-next-line no-param-reassign
				card.style.opacity = "0";

				if (!state.swipeHintShown) {
					state.swipeHintShown = true;
				}

				setTimeout(() => {
					nextCard();
					state.isSwiping = false;
				}, 400);
			} else if (!hasMoved || Math.abs(currentX) < 5) {
				// Tap — flip the card
				card.classList.remove("swiping");
				// eslint-disable-next-line no-param-reassign
				card.style.transform = "";
				// eslint-disable-next-line no-param-reassign
				card.style.opacity = "";
				toggleFlip(card);
			} else {
				// Snap back — remove swiping so CSS transition smooths the return
				card.classList.remove("swiping");
				// eslint-disable-next-line no-param-reassign
				card.style.transform = "";
				// eslint-disable-next-line no-param-reassign
				card.style.opacity = "";
				// Reapply flip if needed
				if (state.isFlipped) {
					card.classList.add("flipped");
				}
			}
		};

		// Touch events
		card.addEventListener("touchstart", onStart, { passive: true });
		card.addEventListener("touchmove", onMove, { passive: false });
		card.addEventListener("touchend", onEnd);

		// Mouse events (for desktop testing)
		card.addEventListener("mousedown", onStart);
		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onEnd);

		// Store cleanup
		// eslint-disable-next-line no-param-reassign
		card.cleanupCardEvents = () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onEnd);
		};
	}

	function toggleFlip(card) {
		const cardElement = card;
		state.isFlipped = !state.isFlipped;
		cardElement.classList.toggle("flipped");

		// Show swipe hint after first flip
		if (state.isFlipped && !state.swipeHintShown) {
			setTimeout(() => {
				swipeHint.classList.add("visible");
				setTimeout(() => swipeHint.classList.remove("visible"), 3000);
			}, 600);
		}
	}

	// ────────────── NEXT CARD ──────────────
	function nextCard() {
		// Move current question to used
		const used = state.remainingQuestions.shift();
		if (used) state.usedQuestions.push(used);

		// Track cards for special animation
		state.cardsSinceSpecial += 1;

		// Cleanup old card events
		const oldCard = cardStack.querySelector(".active-card");
		if (oldCard && oldCard.cleanupCardEvents) oldCard.cleanupCardEvents();

		// Render fresh stack
		renderCards();

		// Trigger special animation every 5th card
		if (state.cardsSinceSpecial >= 5 && state.remainingQuestions.length > 0) {
			state.cardsSinceSpecial = 0;
			triggerSpecialCard();
		}
	}

	// ────────────── SPECIAL CARD EFFECT ──────────────
	function triggerSpecialCard() {
		const activeCard = cardStack.querySelector(".active-card");
		if (!activeCard) return;

		const color = state.currentCategory ? state.currentCategory.color : "#e94560";

		// Special entrance animation
		activeCard.classList.remove("active-card");
		// eslint-disable-next-line no-unused-expressions
		activeCard.offsetWidth; // force reflow
		activeCard.classList.add("active-card", "special-entrance");
		activeCard.addEventListener(
			"animationend",
			() => {
				activeCard.classList.remove("special-entrance");
			},
			{ once: true }
		);

		// Glow effect
		const glow = document.createElement("div");
		glow.className = "card-special-glow";
		glow.style.setProperty("--glow-color", `${color}80`);
		activeCard.appendChild(glow);
		glow.addEventListener("animationend", () => glow.remove(), { once: true });

		// Shimmer sweep
		const shimmer = document.createElement("div");
		shimmer.className = "card-shimmer";
		activeCard.querySelector(".card-front").appendChild(shimmer);
		setTimeout(() => shimmer.remove(), 1200);

		// Heart particle burst
		const particles = document.createElement("div");
		particles.className = "card-particles";
		cardStack.appendChild(particles);

		const emojis = ["💖", "✨", "💕", "💗", "♥", "💫", "🌟", "💘"];
		for (let i = 0; i < 10; i += 1) {
			const p = document.createElement("span");
			p.className = "card-particle";
			p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
			const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
			const dist = 60 + Math.random() * 80;
			p.style.setProperty("--px", `${Math.cos(angle) * dist}px`);
			p.style.setProperty("--py", `${Math.sin(angle) * dist}px`);
			p.style.setProperty("--rot", `${Math.random() * 360}deg`);
			p.style.animationDelay = `${i * 0.04}s`;
			p.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
			particles.appendChild(p);
		}
		setTimeout(() => particles.remove(), 1200);
	}

	// ────────────── COUNTER ──────────────
	function updateCounter() {
		const total = state.currentCategory.questions.length;
		const remaining = state.remainingQuestions.length;
		cardCounter.textContent = `${total - remaining + (remaining > 0 ? 1 : 0)} / ${total}`;
	}

	// ────────────── MODAL ──────────────
	function showModal() {
		modalReset.classList.add("visible");
	}

	function hideModal() {
		modalReset.classList.remove("visible");
	}

	// ────────────── GLOBAL EVENTS ──────────────
	function bindGlobalEvents() {
		btnBack.addEventListener("click", () => {
			switchScreen(screenHome);
		});

		// Theme toggle buttons
		document.querySelectorAll(".theme-toggle").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.stopPropagation(); // prevent cover screen click-through
				toggleTheme();
			});
		});

		btnShuffle.addEventListener("click", () => {
			if (state.currentCategory && !state.isSwiping) {
				// Shuffle animation — Phase 1: scatter cards out
				state.isSwiping = true;
				cardStack.classList.add("shuffling");
				btnShuffle.style.transition = "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
				btnShuffle.style.transform = "rotate(360deg)";

				// Phase 2: after scatter, replace cards and deal back in
				setTimeout(() => {
					state.remainingQuestions = shuffleArray([...state.remainingQuestions]);
					state.isFlipped = false;
					cardStack.classList.remove("shuffling");
					renderCards();
					// Phase 3: new cards get deal-in animation via CSS .shuffle-deal
					cardStack.querySelectorAll(".deep-card").forEach((c, i) => {
						const card = c;
						card.classList.add("shuffle-deal");
						card.style.animationDelay = `${i * 0.08}s`;
						card.addEventListener(
							"animationend",
							() => {
								card.classList.remove("shuffle-deal");
								card.style.animationDelay = "";
							},
							{ once: true }
						);
					});
					btnShuffle.style.transition = "";
					btnShuffle.style.transform = "";
					state.isSwiping = false;
				}, 550);
			}
		});

		btnReset.addEventListener("click", () => {
			hideModal();
			startCategory(state.currentCategory);
		});

		btnHome.addEventListener("click", () => {
			hideModal();
			switchScreen(screenHome);
		});

		// Keyboard support
		document.addEventListener("keydown", (e) => {
			if (!screenPlay.classList.contains("active")) return;

			if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
				e.preventDefault();
				const activeCard = cardStack.querySelector(".active-card");
				if (activeCard && !state.isSwiping) {
					state.isSwiping = true;
					const direction = e.key === "ArrowRight" ? 1 : -1;
					const visualDir = state.isFlipped ? -direction : direction;
					const flipPart = state.isFlipped ? "rotateY(180deg) " : "";
					activeCard.style.transition = "transform 0.4s ease, opacity 0.4s ease";
					activeCard.style.transform = `${flipPart}translateX(${visualDir * 150}%) rotate(${
						visualDir * 20
					}deg)`;
					activeCard.style.opacity = "0";
					setTimeout(() => {
						nextCard();
						state.isSwiping = false;
					}, 400);
				}
			}

			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				const activeCard = cardStack.querySelector(".active-card");
				if (activeCard) toggleFlip(activeCard);
			}

			if (e.key === "Escape") {
				if (modalReset.classList.contains("visible")) {
					hideModal();
				} else {
					switchScreen(screenHome);
				}
			}
		});
	}

	// ────────────── BOOT ──────────────
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
