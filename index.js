const ThemeManager = (function() {
	// Variables.
	const siteThemes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
	let activeThemeIndex = siteThemes.findIndex((theme) => document.body.classList.contains(theme));
	const themeButtons = document.querySelectorAll(".theme-buttons");
	const themeButtonWrapper = document.querySelector(".main-theme-switches");
	
	// Helper functions.
	function arrayIndexWrapHandler(indexValue, arrayLength) {
		return (indexValue + arrayLength) % arrayLength;
	}
	
	// Theme selection functions.
	function selectTheme(event) {
		const selectedThemeButton = event.target.closest(".theme-buttons");
		if (selectedThemeButton) {
			const selectedTheme = selectedThemeButton.dataset.theme;
			updateTheme(siteThemes.indexOf(selectedTheme));
		}
	}

	function nextTheme() {
		updateTheme(arrayIndexWrapHandler((activeThemeIndex + 1), siteThemes.length));
	}
	
	function previousTheme() {
		updateTheme(arrayIndexWrapHandler((activeThemeIndex - 1), siteThemes.length));
	}
	
	function randomTheme() {
		let randomThemeIndex;
		do {
			randomThemeIndex = Math.floor(Math.random() * siteThemes.length);
		}
		while (randomThemeIndex === activeThemeIndex);
		updateTheme(randomThemeIndex);
	}
	
	// DOM update functions.
	function updateTheme(newThemeIndex) {
		if (newThemeIndex === activeThemeIndex) { return; }
		else {
			document.body.classList.replace(siteThemes[activeThemeIndex], siteThemes[newThemeIndex]);
			activeThemeIndex = newThemeIndex;
	
			updateThemeButtons();
		}
	}
	
	function updateThemeButtons() {
		themeButtons.forEach(button => button.classList.remove("active-theme"));
		const activeThemeButton = [...themeButtons].find(button => button.dataset.theme === siteThemes[activeThemeIndex]);
		if (activeThemeButton) {
			activeThemeButton.classList.add("active-theme");
		}
	}
	
	// Event listeners.
	themeButtonWrapper.addEventListener("click", selectTheme);
	document.querySelector("#previous-theme-button").addEventListener("click", previousTheme);
	document.querySelector("#random-theme-button").addEventListener("click", randomTheme);
	document.querySelector("#next-theme-button").addEventListener("click", nextTheme);
})();