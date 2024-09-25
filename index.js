const body = document.body;
const siteThemes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
let activeThemeIndex = siteThemes.findIndex((theme) => body.classList.contains(theme));
let newThemeIndex;
const themeButtons = document.querySelectorAll(".theme-buttons");

function nextTheme() {
	newThemeIndex = ((activeThemeIndex + 1) + siteThemes.length) % siteThemes.length;
	updateTheme();
}

function previousTheme() {
	newThemeIndex = ((activeThemeIndex - 1) + siteThemes.length) % siteThemes.length;
	updateTheme();
}

function randomTheme() {
	do {
		newThemeIndex = Math.floor(Math.random() * siteThemes.length);
	}
	while (newThemeIndex === activeThemeIndex);
	updateTheme();
}

function selectTheme() {
	const selectedTheme = event.target.getAttribute("data-theme");
	newThemeIndex = siteThemes.indexOf(selectedTheme);
	updateTheme();
}

function updateTheme() {
	body.classList.replace(siteThemes[activeThemeIndex], siteThemes[newThemeIndex]);
	activeThemeIndex = newThemeIndex;
	const activeThemeButton = document.querySelector(`.theme-buttons[data-theme=${siteThemes[activeThemeIndex]}]`);
	themeButtons.forEach(button => button.classList.remove('active-theme'));
	activeThemeButton.classList.add("active-theme");
	newThemeIndex = undefined;
}