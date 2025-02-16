import { ThemeManagerModule } from "./modules/theme-manager.js";

const THEME_MANAGER_CONFIGURATION = {
	themes: ["system-theme", "dark-theme", "light-theme", "pink-theme", "blue-theme"],
	defaultThemeFallback: "light-theme",
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
		},
	]
}

const ThemeManager = new ThemeManagerModule(THEME_MANAGER_CONFIGURATION);
