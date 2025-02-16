import { configurationValidationModule } from "./configuration-validator.js"

/**
 * @typedef {Object} ThemeManagerConfiguration
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
const CONFIGURATION_DEFAULTS = {
	themes: ["system", "dark", "light"],
	defaultThemeFallback: "light",
	activeThemeClass: "active-theme",
	buttonWrappers: [
		{
			wrapperSelector: ".theme-switches",
			intendedButtonSelectors: ".theme-selection-buttons",
			eventHandler: "selectButtonTheme"
		}
	],
	buttons: [
		{
			selector: "#previous-theme-control",
			eventHandler: "selectPreviousTheme"
		},
		{
			selector: "#random-theme-control",
			eventHandler: "selectRandomTheme"
		},
		{
			selector: "#next-theme-control",
			eventHandler: "selectNextTheme"
		}
	]
}

/**
 * ThemeManager Module
 *
 * This module manages our site's theme logtic.
 * It allows users to modify how they see the website through
 * new color schemes. The included API initializes the module
 * with custom configurations.
 *
 * @module ThemeManagerModule
 */
class ThemeManagerModule {
	/**
	 * Initializes the ThemeManager with the provided configuration.
	 *
	 * @param {ThemeManagerConfiguration} configurationOverrides - User-specified configuration to override defaults.
	 * @returns {void}
	 */
	constructor(configurationOverrides = CONFIGURATION_DEFAULTS) {
		const configurationValidator = new configurationValidationModule(configurationOverrides, this);
		configurationValidator.validate(configurationOverrides);
		
		this.configuration = { ...CONFIGURATION_DEFAULTS, ...configurationOverrides };
		
		this.siteThemes = this.configuration.themes;
		this.defaultTheme = this.configuration.defaultThemeFallback;
		this.activeThemeClass = this.configuration.activeThemeClass;
				
		// Get default settings then override with specified user inputs.
		this.activeThemeIndex = this.siteThemes.findIndex(theme => document.documentElement.classList.contains(theme));
		
		this.setupEventListeners();
		
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');
		
		const storedThemePreference = this.getStoredTheme();
		
		this.setInitialTheme(darkModeQuery, lightModeQuery, storedThemePreference);
	};
	
	/**
	 * Defines what the initial theme of the site should be upon loading
	 * through stored user preferences, default OS/browser preferences,
	 * and the default (fallback) theme set by the developer.
	 * 
	 * @param {MediaQueryList} darkModeQuery 
	 * @param {MediaQueryList} lightModeQuery 
	 * @param {string | false | null} storedThemePreference
	 * 
	 * @returns {void}
	 */
	setInitialTheme(darkModeQuery, lightModeQuery, storedThemePreference) {
		if (storedThemePreference !== null && storedThemePreference !== "undefined") {
			this.applyStoredTheme(storedThemePreference)
		}
		else if (darkModeQuery.matches || lightModeQuery.matches) {
			this.applySystemTheme(darkModeQuery, lightModeQuery);
		}
		else {
			this.applyDefaultTheme();
		}
	};
	
	/**
	 * Applies the theme that is stored
	 *
	 * @returns {void}
	 */
	applyStoredTheme(storedThemePreference) {
		const storedThemeIndex = this.siteThemes.indexOf(storedThemePreference);
		if (storedThemeIndex !== -1) {
			this.updateTheme(storedThemeIndex);
		}
	}
	
	/**
	 * Applies the theme based on a user's system/browser
	 * preferences.
	 *
	 * @returns {void}
	 */
	applySystemTheme(darkModeQuery, lightModeQuery) {
		if (darkModeQuery.matches) {
			this.updateTheme(this.siteThemes.indexOf("dark-theme")); // TODO: have dark & light themes not be hard-coded.
		}
		if (lightModeQuery.matches) {
			this.updateTheme(this.siteThemes.indexOf("light-theme"));
		}
	}
	
	/**
	 * Applies the default fallback theme as defined in the module
	 * configuration.
	 *
	 * @returns {void}
	 */
	applyDefaultTheme() {
		const defaultThemeIndex = this.siteThemes.indexOf(this.configuration.defaultThemeFallback);
		this.updateTheme(defaultThemeIndex);
	}
	
	/**
	 * Sets up the necessary event listeners for our theming using the
	 * module's given configurations.
	 *
	 * @returns {void}
	 */
	setupEventListeners() {
		// Set up event listeners based on button wrappers configuration
		this.configuration.buttonWrappers.forEach(wrapperConfig => {
			const wrapper = document.querySelector(wrapperConfig.wrapperSelector);
			if (wrapper) {
				wrapper.addEventListener("click", (event) => {
					const button = event.target.closest(wrapperConfig.intendedButtonSelectors);
					if (button) {
						this[wrapperConfig.eventHandler].call(this, event);
					}
				});
			}
		});
		
		// Set up event listeners for standalone buttons
		this.configuration.buttons.forEach(buttonConfig => {
			const button = document.querySelector(buttonConfig.selector);
			if (button) {
				button.addEventListener("click", this[buttonConfig.eventHandler].bind(this));
			}
		});
	}
	
	/**
	 * Returns the currently stored user theme.
	 * 
	 * @returns {localStorage}
	 */
	getStoredTheme() {
		if (typeof Storage !== 'undefined') {
            return localStorage.getItem("theme");
        }
        return false;
	}
	
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
	arrayIndexWrapHandler(indexValue, arrayLength) {
		return (indexValue + arrayLength) % arrayLength;
	}
	
	/**
	 * Selects the theme based on the specific clicked button's data-theme attribute.
	 *
	 * @param {MouseEvent} event - The click event triggered by the theme button.
	 * @returns {void}
	 */
	selectButtonTheme(event) {
		const selectedThemeButton = event.target.closest("[data-theme]");
		if (selectedThemeButton) {
			const selectedTheme = selectedThemeButton.dataset.theme;
			if (!this.siteThemes.includes(selectedTheme)) {
				return;
			}
			this.updateTheme(this.siteThemes.indexOf(selectedTheme));
		}
	}
	
	/**
	 * Selects the next theme in the array.
	 *
	 * @returns {void}
	 */
	selectNextTheme() {
		this.updateTheme(this.arrayIndexWrapHandler(this.activeThemeIndex + 1, this.siteThemes.length));
	}
	
	/**
	 * Selects the previous theme in the array.
	 *
	 * @returns {void}
	 */
	selectPreviousTheme() {
		this.updateTheme(this.arrayIndexWrapHandler(this.activeThemeIndex - 1, this.siteThemes.length));
	}
	
	/**
	 * Selects a random theme from the available themes (not including the current theme).
	 *
	 * @returns {void}
	 */
	selectRandomTheme() {
		let randomThemeIndex;
		do {
			randomThemeIndex = Math.floor(Math.random() * this.siteThemes.length);
		} while (randomThemeIndex === this.activeThemeIndex);
		this.updateTheme(randomThemeIndex);
	}
	
	/**
	 * Updates the active theme button classes based on the currently active theme.
	 *
	 * @returns {void}
	 */
	updateThemeButtons() {
		const buttons = document.querySelectorAll(this.configuration.buttonWrappers.map(wrapper => wrapper.intendedButtonSelectors).join(", "));
		buttons.forEach(button => button.classList.remove(this.configuration.activeThemeClass));
		const activeThemeButton = [...buttons].find(button => button.dataset.theme === this.siteThemes[this.activeThemeIndex]);
		if (activeThemeButton) {
			activeThemeButton.classList.add(this.configuration.activeThemeClass);
		}
	}
	
	/**
	 * Adds a new theme class to the document body.
	 * 
	 * Intended to be used only when the document body does not already have
	 * an available theme class.
	 *
	 * @param {number} newThemeIndex - The index of the new theme to add.
	 * @returns {void}
	 */
	addThemeClass(newThemeIndex) {
		document.documentElement.classList.add(this.siteThemes[newThemeIndex]);
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
	replaceThemeClass(newThemeIndex) {
		document.documentElement.classList.replace(this.siteThemes[this.activeThemeIndex], this.siteThemes[newThemeIndex]);
	}
	
	/**
	 * Updates the theme based on the specified index.
	 *
	 * @param {number} newThemeIndex - The index of the theme to update to.
	 * @returns {void}
	 */
	updateTheme(newThemeIndex) {
		if (newThemeIndex !== this.activeThemeIndex) {
			// If there isn't a theme found on the document body we add a new theme class to the body element.
			if (this.activeThemeIndex === -1) {
				this.addThemeClass(newThemeIndex);
				localStorage.setItem("theme", this.siteThemes[newThemeIndex])
			} else { // Otherwise we just replace one theme class with another.
				this.replaceThemeClass(newThemeIndex);
				localStorage.setItem("theme", this.siteThemes[newThemeIndex])
			}
			this.activeThemeIndex = newThemeIndex;
			this.updateThemeButtons();
		}
	}
}

export { ThemeManagerModule };