const ThemeManager = (function() {
	// Private variables
	let siteThemes = [];
	let activeThemeIndex = -1;
	let themeButtons = [];
	let themeButtonWrapper = null;
	let options = {};
	
	// Initialization functions
	function initializeThemeManager(configOverrides) {
		options = {
			// Default configuration settings.
			themes: ["dark-theme", "light-theme"],
			themeButtonSelector: ".theme-buttons",
			buttonWrapperSelector: ".main-theme-switches",
			previousButtonSelector: "#previous-theme-button",
			randomButtonSelector: "#random-theme-button",
			nextButtonSelector: "#next-theme-button",
			activeThemeClass: "active-theme",
			// User-specified override configurations.
			// They will override our default properties as needed.
			...configOverrides
		};
		
		siteThemes = options.themes;
		activeThemeIndex = siteThemes.findIndex(theme => document.body.classList.contains(theme));
		themeButtons = document.querySelectorAll(options.themeButtonSelector);
		themeButtonWrapper = document.querySelector(options.buttonWrapperSelector);
		
		setupEventListeners();
		
		// Always initialize our site to load the first theme in the array.
		// I plan to make this load whichever theme the user last selected
		// or to set it automatically based on device/browser preferences.
		updateTheme(0);
	}
	
	function setupEventListeners() {
		if (themeButtonWrapper) {
			themeButtonWrapper.addEventListener("click", selectButtonTheme);
		}
		
		const buttonsConfig = [
			{ selector: options.previousButtonSelector, handler: selectPreviousTheme },
			{ selector: options.randomButtonSelector, handler: selectRandomTheme },
			{ selector: options.nextButtonSelector, handler: selectNextTheme },
		];
		
		buttonsConfig.forEach(({ selector, handler }) => {
			setupButtonEvents(selector, handler);
		});
	}
	
	// Helper functions
	function setupButtonEvents(buttonSelector, buttonEventHandler) {
		const button = document.querySelector(buttonSelector);
		if (button) {
			button.addEventListener("click", buttonEventHandler);
		}
	}
	
	function arrayIndexWrapHandler(indexValue, arrayLength) {
		return (indexValue + arrayLength) % arrayLength;
	}
	
	// Theme selection functions
	function selectButtonTheme(event) {
		const selectedThemeButton = event.target.closest(options.themeButtonSelector);
		if (selectedThemeButton) {
			const selectedTheme = selectedThemeButton.dataset.theme;
			if (!siteThemes.includes(selectedTheme)) { return; } // Check to make sure button's theme actually exists in our array.
			updateTheme(siteThemes.indexOf(selectedTheme));
		}
	}
	
	function selectNextTheme() {
		updateTheme(arrayIndexWrapHandler(activeThemeIndex + 1, siteThemes.length));
	}
	
	function selectPreviousTheme() {
		updateTheme(arrayIndexWrapHandler(activeThemeIndex - 1, siteThemes.length));
	}
	
	function selectRandomTheme() {
		let randomThemeIndex;
		do {
			randomThemeIndex = Math.floor(Math.random() * siteThemes.length);
		} while (randomThemeIndex === activeThemeIndex);
		updateTheme(randomThemeIndex);
	}
	
	// DOM update functions
	function addThemeClass(newThemeIndex) {
		document.body.classList.add(siteThemes[newThemeIndex]);
	}
	
	function replaceThemeClass(newThemeIndex) {
		document.body.classList.replace(siteThemes[activeThemeIndex], siteThemes[newThemeIndex]);
	}
	
	function updateThemeButtons() {
		themeButtons.forEach(button => button.classList.remove(options.activeThemeClass));
		const activeThemeButton = [...themeButtons].find(button => button.dataset.theme === siteThemes[activeThemeIndex]);
		if (activeThemeButton) {
			activeThemeButton.classList.add(options.activeThemeClass);
		}
	}
	
	function updateTheme(newThemeIndex) {
		if (newThemeIndex !== activeThemeIndex) {
			// If there isn't a theme found on the document body we add a new theme class to the body element.
			if (activeThemeIndex === -1) {
				addThemeClass(newThemeIndex);
			} else { // Otherwise we just replace one theme class with another.
				replaceThemeClass(newThemeIndex);
			}
			activeThemeIndex = newThemeIndex;
			updateThemeButtons();
		}
	}
	
	// Public API
	return {
		initializeThemeManager,
	};
})();

// Usage example
ThemeManager.initializeThemeManager({
	themes: ["dark-theme", "light-theme", "pink-theme", "blue-theme"],
	themeButtonSelector: ".theme-buttons",
	buttonWrapperSelector: ".main-theme-switches",
	previousButtonSelector: "#previous-theme-button",
	randomButtonSelector: "#random-theme-button",
	nextButtonSelector: "#next-theme-button",
	activeThemeClass: "active-theme"
});