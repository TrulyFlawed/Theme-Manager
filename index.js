import { ThemeManager } from "./modules/theme-manager.js";

ThemeManager.initializeThemeManager({
	themes: ["system-theme", "dark-theme", "light-theme", "pink-theme", "blue-theme"],
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
