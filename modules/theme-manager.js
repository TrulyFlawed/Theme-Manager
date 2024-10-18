/**
 * ThemeManager Module
 *
 * This module manages our site's theme logtic.
 * It allows users to modify how they see the website through
 * new color schemes. The included API initializes the module
 * with custom configurations.
 *
 * @module ThemeManager
 * @example
 *	ThemeManager.initializeThemeManager({
 *		themes: ["dark-theme", "light-theme", "high-contrast-theme"],
 *		themeButtonSelector: ".theme-buttons",
 *		buttonWrapperSelector: ".main-theme-switches",
 *	});
 */
const ThemeManager = (function() {
	
	// ==============================
	// Private Variables
	// ==============================
	
	let siteThemes = [];
	let activeThemeIndex = -1;
	let themeButtons = [];
	let themeButtonWrapper = null;
	let options = {};
	
	// ==============================
	// Initialization Functions
	// ==============================

	/**
	 * @typedef {Object} ThemeManagerConfig
	 * @property {string[]} themes - An array of available theme class names.
	 * @property {string} themeButtonSelector - A CSS selector for the theme buttons.
	 * @property {string} buttonWrapperSelector - A CSS selector for the wrapper containing the theme buttons.
	 * @property {string} activeThemeClass - Class name for the active theme button.
	 * @property {string} [previousButtonSelector] - (Optional) Selector for the previous theme button.
	 * @property {string} [randomButtonSelector] - (Optional) Selector for the random theme button.
	 * @property {string} [nextButtonSelector] - (Optional) Selector for the next theme button.
	 */

	/**
	 * Retrieves the default theme configurations. These are hard-coded, but
	 * I need to come up with better default names. For now they will remain
	 * as the website's used names.
	 *
	 * @returns {ThemeManagerConfig} Default configuration object with it's
	 * themes and element selectors.
	 */
	function getConfigurationDefaults() {
		return {
			themes: ["dark-theme", "light-theme"],
			themeButtonSelector: ".theme-buttons",
			buttonWrapperSelector: ".main-theme-switches",
			activeThemeClass: "active-theme",
			previousButtonSelector: "#previous-theme-button",
			randomButtonSelector: "#random-theme-button",
			nextButtonSelector: "#next-theme-button",
		}
	}
	
	/**
	 * Initializes the ThemeManager with the provided configuration.
	 * 
	 * This function will always load the first theme in the array before ending initialization.
	 *
	 * @param {ThemeManagerConfig} configurationOverrides - User-specified configuration options to override defaults.
	 * @returns {void}
	 */
	function initializeThemeManager(configurationOverrides) {
		// Get default settings then override with specified user inputs.
		options = { ...getConfigurationDefaults(), ...configurationOverrides };
		
		// Initialize theme variables.
		siteThemes = options.themes;
		activeThemeIndex = siteThemes.findIndex(theme => document.body.classList.contains(theme));
		
		// Initialize element variables.
		themeButtons = document.querySelectorAll(options.themeButtonSelector);
		themeButtonWrapper = document.querySelector(options.buttonWrapperSelector);
		
		// Initialize events & immediate active theme.
		setupEventListeners();
		// Always initialize our site to load the first theme in the array.
		// I plan to make this load whichever theme the user last selected
		// or to set it automatically based on device/browser preferences.
		updateTheme(0);
	}
	
	/**
	 * Sets up the necessary event listeners for our theming using the
	 * given configurations.
	 *
	 * @returns {void}
	 */
	function setupEventListeners() {
		if (themeButtonWrapper) {
			themeButtonWrapper.addEventListener("click", selectButtonTheme);
		}
		
		// TODO (#1): Use more configurable button event setup.
		const buttonsConfig = [
			{ selector: options.previousButtonSelector, handler: selectPreviousTheme },
			{ selector: options.randomButtonSelector, handler: selectRandomTheme },
			{ selector: options.nextButtonSelector, handler: selectNextTheme },
		];
		
		buttonsConfig.forEach(({ selector, handler }) => {
			setupButtonEvents(selector, handler);
		});
	}
	
	// ==============================
	// Helper Functions
	// ==============================

	/**
	 * Configures event listeners for specific buttons.
	 * 
	 * It is called from the `setupEventListeners` function, which runs the `forEach` method
	 * on each of the specified buttons that wasn't in a button wrapper.
	 *
	 * @param {string} buttonSelector - The CSS selector for the button.
	 * @param {Function} buttonEventHandler - The function to call when the button is clicked.
	 * @returns {void}
	 */
	function setupButtonEvents(buttonSelector, buttonEventHandler) {
		const button = document.querySelector(buttonSelector);
		if (button) {
			button.addEventListener("click", buttonEventHandler);
		}
	}
	
	/**
	 * Wraps the index around to the other end of the array to ensure it remains valid.
	 *
	 * @param {number} indexValue - The index to wrap.
	 * @param {number} arrayLength - The length of the array.
	 * @returns {number} A valid index within the array.
	 */
	function arrayIndexWrapHandler(indexValue, arrayLength) {
		return (indexValue + arrayLength) % arrayLength;
	}
	
	// ==============================
	// Theme Selection Functions
	// ==============================
	
	/**
	 * Selects the theme based on the specific clicked button's data-theme attribute.
	 *
	 * @param {MouseEvent} event - The click event triggered by the theme button.
	 * @returns {void}
	 */
	function selectButtonTheme(event) {
		const selectedThemeButton = event.target.closest(options.themeButtonSelector);
		if (selectedThemeButton) {
			const selectedTheme = selectedThemeButton.dataset.theme;
			if (!siteThemes.includes(selectedTheme)) { return; } // Check to make sure button's theme actually exists in our array.
			updateTheme(siteThemes.indexOf(selectedTheme));
		}
	}
	
	/**
	 * Selects the next theme in the array.
	 *
	 * @returns {void}
	 */
	function selectNextTheme() {
		updateTheme(arrayIndexWrapHandler(activeThemeIndex + 1, siteThemes.length));
	}
	
	/**
	 * Selects the previous theme in the array.
	 *
	 * @returns {void}
	 */
	function selectPreviousTheme() {
		updateTheme(arrayIndexWrapHandler(activeThemeIndex - 1, siteThemes.length));
	}
	
	/**
	 * Selects a random theme from the available themes (not including the current theme).
	 *
	 * @returns {void}
	 */
	function selectRandomTheme() {
		let randomThemeIndex;
		do {
			randomThemeIndex = Math.floor(Math.random() * siteThemes.length);
		} while (randomThemeIndex === activeThemeIndex);
		updateTheme(randomThemeIndex);
	}
	
	// ==============================
	// DOM Update Functions
	// ==============================

	/**
	 * Adds a new theme class to the document body.
	 * 
	 * Intended to be used only when the document body does not already have
	 * an available theme class.
	 *
	 * @param {number} newThemeIndex - The index of the new theme to add.
	 * @returns {void}
	 */
	function addThemeClass(newThemeIndex) {
		document.body.classList.add(siteThemes[newThemeIndex]);
	}
	
	/**
	 * Replaces the current theme class with a new one.
	 * 
	 * Intended as the default use for changing the theme; should only be run when
	 * a theme class is available on the document body to be replaced.
	 *
	 * @param {number} newThemeIndex - The index of the new theme to replace the current theme.
	 * @returns {void}
	 */
	function replaceThemeClass(newThemeIndex) {
		document.body.classList.replace(siteThemes[activeThemeIndex], siteThemes[newThemeIndex]);
	}
	
	/**
	 * Updates the active theme button classes based on the currently active theme.
	 *
	 * @returns {void}
	 */
	function updateThemeButtons() {
		themeButtons.forEach(button => button.classList.remove(options.activeThemeClass));
		const activeThemeButton = [...themeButtons].find(button => button.dataset.theme === siteThemes[activeThemeIndex]);
		if (activeThemeButton) {
			activeThemeButton.classList.add(options.activeThemeClass);
		}
	}
	
	/**
	 * Updates the theme based on the specified index.
	 *
	 * @param {number} newThemeIndex - The index of the theme to update to.
	 * @returns {void}
	 */
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
	
	// ==============================
	// Public API
	// ==============================

	return {
		initializeThemeManager,
	};
})();

export { ThemeManager };