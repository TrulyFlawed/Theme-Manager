const body = document.body;
const siteThemes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
let activeThemeIndex = siteThemes.findIndex((theme) => body.classList.contains(theme));
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
	body.classList.replace(siteThemes[activeThemeIndex], siteThemes[newThemeIndex]);
	activeThemeIndex = newThemeIndex;
	const activeThemeButton = document.querySelector(`.theme-buttons[data-theme=${siteThemes[activeThemeIndex]}]`);
	themeButtons.forEach(button => button.classList.remove("active-theme"));
	activeThemeButton.classList.add("active-theme");
}