const body = document.body;
const themes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
let activeIndex = themes.findIndex((theme) => body.classList.contains(theme));

function nextTheme() {
	let nextIndex = activeIndex + 1;
	nextIndex = (nextIndex + themes.length) % themes.length;

	body.classList.replace(themes[activeIndex], themes[nextIndex]);
	activeIndex = nextIndex;
}

function previousTheme() {
	let previousIndex = activeIndex - 1;
	previousIndex = (previousIndex + themes.length) % themes.length;

	body.classList.replace(themes[activeIndex], themes[previousIndex]);
	activeIndex = previousIndex;
}

function randomTheme() {
	const randomTheme = Math.floor(Math.random() * themes.length);

	body.classList.replace(themes[activeIndex], themes[randomTheme]);
	activeIndex = randomTheme;
}