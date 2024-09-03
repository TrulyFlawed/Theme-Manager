const body = document.body;
const themes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
let activeIndex = themes.findIndex((theme) => body.classList.contains(theme));
let themeButtons = document.querySelectorAll(".theme-buttons");

function nextTheme() {
	let nextIndex = activeIndex + 1;
	nextIndex = (nextIndex + themes.length) % themes.length;

	body.classList.replace(themes[activeIndex], themes[nextIndex]);
	activeIndex = nextIndex;

	updateThemeButtons()
}

function previousTheme() {
	let previousIndex = activeIndex - 1;
	previousIndex = (previousIndex + themes.length) % themes.length;

	body.classList.replace(themes[activeIndex], themes[previousIndex]);
	activeIndex = previousIndex;

	updateThemeButtons()
}

function randomTheme() {
	const randomTheme = Math.floor(Math.random() * themes.length);

	body.classList.replace(themes[activeIndex], themes[randomTheme]);
	activeIndex = randomTheme;

	updateThemeButtons()
}

function selectTheme() {
	themeButtons.forEach((button =>
		button.addEventListener('click', () => {
			let selectedTheme = button.getAttribute("data-theme");
			let selectedIndex = themes.findIndex((theme) => body.classList.contains(theme));

			body.classList.replace(themes[activeIndex], selectedTheme);
			activeIndex = selectedIndex;

			themeButtons.forEach(button => button.classList.remove('active-theme'));
			button.classList.add("active-theme");
		})
	));
}

function updateThemeButtons() {
	let activeThemeButton = document.querySelector(`.theme-buttons[data-theme=${themes[activeIndex]}]`);
	themeButtons.forEach(button => button.classList.remove('active-theme'));
	activeThemeButton.classList.add("active-theme");
}
