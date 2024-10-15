const ThemeManager = (function() {
    // Private variables
    let siteThemes = [];
    let activeThemeIndex = -1;
    let themeButtons = [];
    let themeButtonWrapper = null;
    let options = {}; // Store options at a higher scope

    // Initialization functions
    function initializeThemeManager(initOptions) {
        options = initOptions; // Save options for use in other functions
        siteThemes = options.themes || ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
        activeThemeIndex = siteThemes.findIndex(theme => document.body.classList.contains(theme));
        themeButtons = document.querySelectorAll(options.themeButtonSelector || ".theme-buttons");
        themeButtonWrapper = document.querySelector(options.buttonWrapperSelector || ".main-theme-switches");

        setupEventListeners();
    }

    function setupEventListeners() {
        themeButtonWrapper.addEventListener("click", selectButtonTheme);
        document.querySelector(options.previousButtonSelector || "#previous-theme-button").addEventListener("click", selectPreviousTheme);
        document.querySelector(options.randomButtonSelector || "#random-theme-button").addEventListener("click", selectRandomTheme);
        document.querySelector(options.nextButtonSelector || "#next-theme-button").addEventListener("click", selectNextTheme);
    }

    // Helper function
    function arrayIndexWrapHandler(indexValue, arrayLength) {
        return (indexValue + arrayLength) % arrayLength;
    }

    // Theme selection functions
    function selectButtonTheme(event) {
		const selectedThemeButton = event.target.closest(options.themeButtonSelector);
		if (selectedThemeButton) {
			const selectedTheme = selectedThemeButton.dataset.theme;
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
    function updateTheme(newThemeIndex) {
        if (newThemeIndex === activeThemeIndex) { return; }
        document.body.classList.replace(siteThemes[activeThemeIndex], siteThemes[newThemeIndex]);
        activeThemeIndex = newThemeIndex;

        updateThemeButtons();
    }

    function updateThemeButtons() {
        themeButtons.forEach(button => button.classList.remove("active-theme"));
        const activeThemeButton = [...themeButtons].find(button => button.dataset.theme === siteThemes[activeThemeIndex]);
        if (activeThemeButton) {
            activeThemeButton.classList.add(options.activeThemeClass);
        }
    }

    // Public API
    return {
        initializeThemeManager,
    };
})();

// Usage example
ThemeManager.initializeThemeManager({
    themes: ["dark-theme", "light-theme", "pink-theme", "blue-theme"], // Configuration for the website's themes.
    themeButtonSelector: ".theme-buttons", // Configuration for the theme buttons selector.
    buttonWrapperSelector: ".main-theme-switches", // Configuration for the theme button container selector.
    previousButtonSelector: "#previous-theme-button", // Configuration for the previous theme button selector.
    randomButtonSelector: "#random-theme-button", // Configuration for the random theme button selector.
    nextButtonSelector: "#next-theme-button", // Configuration for the next theme button selector.
	activeThemeClass: "active-theme" // Configuration for the active theme classes' name.
});