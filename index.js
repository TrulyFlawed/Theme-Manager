import { ThemeManager } from "./modules/theme-manager.js";

ThemeManager.initializeThemeManager({
	themes: ["dark-theme", "light-theme", "pink-theme", "blue-theme"],
	defaultTheme: "light-theme",
	activeThemeClass: "active-theme",
	buttonWrappers: [
		{
			wrapperSelector: ".main-theme-switches",
			intendedButtonSelectors: ".theme-buttons",
			eventHandler: "selectButtonTheme"
		}
	],
	buttons: [
		{
			selector: "#previous-theme-button",
			eventHandler: "selectPreviousTheme"
		},
		{
			selector: "#random-theme-button",
			eventHandler: "selectRandomTheme"
		},
		{
			selector: "#next-theme-button",
			eventHandler: "selectNextTheme"
		}
	]
});

const buttons = document.querySelectorAll(".theme-buttons");
const activeThemeButton = [...buttons].find(button => button.dataset.theme === localStorage.getItem('theme'));
if (activeThemeButton) {
	activeThemeButton.classList.add("active-theme");
}