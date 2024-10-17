import { ThemeManager } from "./modules/thememanager.js";

ThemeManager.initializeThemeManager({
	themes: ["dark-theme", "light-theme", "pink-theme", "blue-theme"],
	themeButtonSelector: ".theme-buttons",
	buttonWrapperSelector: ".main-theme-switches",
	activeThemeClass: "active-theme",
	previousButtonSelector: "#previous-theme-button",
	randomButtonSelector: "#random-theme-button",
	nextButtonSelector: "#next-theme-button",
});