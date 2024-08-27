const body = document.body;
const themes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];

function cycleTheme() {
	const activeIndex = themes.findIndex((theme) => body.classList.contains(theme));
	const nextIndex = (activeIndex + 1) % themes.length;

	body.classList.replace(themes[activeIndex], themes[nextIndex]);
}

function randomTheme() {
	const activeIndex = themes.findIndex((theme) => body.classList.contains(theme));
	const randomTheme = Math.floor(Math.random() * themes.length);

	body.classList.replace(themes[activeIndex], themes[randomTheme]);
}