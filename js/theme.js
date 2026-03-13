/* ========================================
   DEEP CONNECTION — Theme Toggle
   ======================================== */
/* eslint-disable no-undef, no-param-reassign */

DC.initTheme = function initTheme() {
	const saved = localStorage.getItem("dc-theme") || "dark";
	DC.state.theme = saved;
	DC.applyTheme(saved);
};

DC.applyTheme = function applyTheme(theme) {
	if (theme === "light") {
		document.documentElement.setAttribute("data-theme", "light");
	} else {
		document.documentElement.removeAttribute("data-theme");
	}
	const icon = theme === "light" ? "☀️" : "🌙";
	document.querySelectorAll(".theme-icon").forEach((el) => {
		el.textContent = icon;
	});
	const metaColor = document.querySelector('meta[name="theme-color"]');
	if (metaColor) {
		metaColor.content = theme === "light" ? "#faf5f0" : "#1a1a2e";
	}
};

DC.toggleTheme = function toggleTheme() {
	DC.state.theme = DC.state.theme === "dark" ? "light" : "dark";
	localStorage.setItem("dc-theme", DC.state.theme);
	DC.applyTheme(DC.state.theme);
};
