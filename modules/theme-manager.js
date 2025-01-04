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
 *		themes: ["dark-theme", "light-theme", "pink-theme", "blue-theme"],
 *		activeThemeClass: "active-theme",
 *		buttonWrappers: [
 *			{
 *				wrapperSelector: ".button-wrapper-class",
 *				intendedButtonSelectors: ".buttons-that-get-event-assigned",
 *				eventHandler: "selectButtonTheme"
 *			}
 *		],
 *		buttons: [
 *			{
 *				selector: "#button-id",
 *				eventHandler: "selectNextTheme"
 *			}
 *		]
 *	});
 */
 const ThemeManager = (function() {
	
	// ==============================
	// Private Variables
	// ==============================
	
	let siteThemes = [];
	let activeThemeIndex = -1;
	let configuration = {};
	
	// ==============================
	// Initialization
	// ==============================
	
	/**
	 * @typedef {Object} ThemeManagerConfig
	 * @property {string[]} themes - An array of available theme class names.
	 * @property {string} activeThemeClass - Class name for the active theme button.
	 * @property {Object[]} buttonWrappers - An array of configurations for button wrappers.
	 * @property {string} buttonWrappers[].wrapperSelector - A CSS selector for the button wrapper.
	 * @property {string} buttonWrappers[].intendedButtonSelectors - A CSS selector for the buttons within the wrapper.
	 * @property {string} buttonWrappers[].eventHandler - The name of the event handler function to call when a button is clicked.
	 * @property {Object[]} buttons - An array of configurations for standalone buttons.
	 * @property {string} buttons[].selector - A CSS selector for the standalone button.
	 * @property {string} buttons[].eventHandler - The name of the event handler function to call when the button is clicked.
	 */
	
	/**
	 * Retrieves the default theme configurations.
	 * 
	 * I need to come up with better default names. For now they will remain
	 * as the website's used names.
	 *
	 * @returns {ThemeManagerConfig} Default configuration object with it's
	 * themes and element selectors.
	 */
	function getConfigurationDefaults() { // TODO: Improve default configurations.
		return {
			themes: ["dark-theme", "light-theme"],
			defaultTheme: "light-theme",
			activeThemeClass: "active-theme",
			buttonWrappers: [],
			buttons: [],
		}
	}
	
	/**
	 * @typedef {Object} EventHandlersMap
	 * @property {Function} selectButtonTheme - Handles the theme selection based on the clicked button.
	 * @property {Function} selectNextTheme - Handles the action of selecting the next theme in the array.
	 * @property {Function} selectPreviousTheme - Handles the action of selecting the previous theme in the array.
	 * @property {Function} selectRandomTheme - Handles the action of selecting a random theme from the available themes.
	 */
	
	/**
	 * A collection of the available internal methods we want to
	 * "expose" and apply to our buttons & wrappers.
	 *
	 * @type {EventHandlersMap}
	 */
	const eventHandlersMap = {
		selectButtonTheme,
		selectNextTheme,
		selectPreviousTheme,
		selectRandomTheme,
	};
	
	/**
	 * Initializes the ThemeManager with the provided configuration.
	 *
	 * This function will always load the first theme in the array before ending initialization.
	 *
	 * @param {ThemeManagerConfig} configurationOverrides - User-specified configuration to override defaults.
	 * @returns {void}
	 */
	function initializeThemeManager(configurationOverrides) {
		// Get default settings then override with specified user inputs.
		configuration = { ...getConfigurationDefaults(), ...configurationOverrides };
		
		// Initialize theme variables.
		siteThemes = configuration.themes;
		activeThemeIndex = siteThemes.findIndex(theme => document.documentElement.classList.contains(theme));
		
		// Initialize events & active theme.
		setupEventListeners();
		
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');
		
		const storedThemePreference = getStoredTheme();
		
		if (storedThemePreference !== null) {
			updateTheme(siteThemes.indexOf(localStorage.getItem("theme")))
		} // Set default theme to default browser/OS theme.
		else if (darkModeQuery || lightModeQuery) {
			if (darkModeQuery.matches) {
				updateTheme(0);
			}
			if (lightModeQuery.matches) {
				updateTheme(1);
			}
		} // Set default theme as defined in configuration.
		else {
			const defaultTheme = siteThemes.findIndex(theme => configuration.defaultTheme === theme);
			updateTheme(defaultTheme);
		}
	}
	
	function getStoredTheme() {
		if (typeof Storage !== 'undefined') {
            return localStorage.getItem("theme");
        }
        return false;
	}
	
	/**
	 * Sets up the necessary event listeners for our theming using the
	 * given configurations.
	 *
	 * @returns {void}
	 */
	function setupEventListeners() {
		// Set up event listeners based on button wrappers configuration
		configuration.buttonWrappers.forEach(wrapperConfig => {
			const wrapper = document.querySelector(wrapperConfig.wrapperSelector);
			if (wrapper) {
				const buttons = wrapper.querySelectorAll(wrapperConfig.intendedButtonSelectors);
				buttons.forEach(button => {
					button.addEventListener("click", eventHandlersMap[wrapperConfig.eventHandler]);
				});
			}
		});
		
		// Set up event listeners for standalone buttons
		configuration.buttons.forEach(buttonConfig => {
			const button = document.querySelector(buttonConfig.selector);
			if (button) {
				button.addEventListener("click", eventHandlersMap[buttonConfig.eventHandler]);
			}
		});
	}
	
	// ==============================
	// Helper Functions
	// ==============================
	
	/**
	 * Wraps the index around to the other end of the array to ensure it remains valid.
	 *
	 * @param {number} indexValue - The index to wrap.
	 * @param {number} arrayLength - The length of the array.
	 * @returns {number} A valid index within the array.
	 * 
	 * @example
	 * arrayIndexWrapHandler(4, 4); // returns 0
	 * arrayIndexWrapHandler(-1, 4); // returns 3
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
		const selectedThemeButton = event.target.closest("[data-theme]");
		if (selectedThemeButton) {
			const selectedTheme = selectedThemeButton.dataset.theme;
			if (!siteThemes.includes(selectedTheme)) {
				return;
			}
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
		document.documentElement.classList.add(siteThemes[newThemeIndex]);
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
		document.documentElement.classList.replace(siteThemes[activeThemeIndex], siteThemes[newThemeIndex]);
	}
	
	/**
	 * Updates the active theme button classes based on the currently active theme.
	 *
	 * @returns {void}
	 */
	function updateThemeButtons() {
		const buttons = document.querySelectorAll(configuration.buttonWrappers.map(wrapper => wrapper.intendedButtonSelectors).join(", "));
		buttons.forEach(button => button.classList.remove(configuration.activeThemeClass));
		const activeThemeButton = [...buttons].find(button => button.dataset.theme === siteThemes[activeThemeIndex]);
		if (activeThemeButton) {
			activeThemeButton.classList.add(configuration.activeThemeClass);
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
				localStorage.setItem("theme", siteThemes[newThemeIndex])
			} else { // Otherwise we just replace one theme class with another.
				replaceThemeClass(newThemeIndex);
				localStorage.setItem("theme", siteThemes[newThemeIndex])
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