const siteThemes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
let activeThemeIndex = siteThemes.findIndex((theme) => document.body.classList.contains(theme));
const themeButtons = document.querySelectorAll(".theme-buttons");

function arrayIndexWrapHandler(indexValue, arrayLength) {
	return (indexValue + arrayLength) % arrayLength;
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

function selectTheme() {
	const selectedTheme = event.target.getAttribute("data-theme");
	updateTheme(siteThemes.indexOf(selectedTheme));
}

function updateTheme(newThemeIndex) {
	document.body.classList.replace(siteThemes[activeThemeIndex], siteThemes[newThemeIndex]);
	activeThemeIndex = newThemeIndex;

	updateThemeButtons();
}

function updateThemeButtons() {
	themeButtons.forEach(button => button.classList.remove("active-theme"));
	const activeThemeButton = [...themeButtons].find(button => button.dataset.theme === siteThemes[activeThemeIndex]);
	if (activeThemeButton) {
		activeThemeButton.classList.add("active-theme");
	}
}