const body = document.body;
const themes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
let activeIndex = themes.findIndex((theme) => body.classList.contains(theme));
let themeButtons = document.querySelectorAll(".theme-buttons");

function nextTheme() {
	let nextIndex = activeIndex + 1;
	nextIndex = (nextIndex + themes.length) % themes.length;

	body.classList.replace(themes[activeIndex], themes[nextIndex]);
	activeIndex = nextIndex;

	themeButtons.forEach(button => button.classList.remove('active-theme'));
}

function previousTheme() {
	let previousIndex = activeIndex - 1;
	previousIndex = (previousIndex + themes.length) % themes.length;

	body.classList.replace(themes[activeIndex], themes[previousIndex]);
	activeIndex = previousIndex;

	themeButtons.forEach(button => button.classList.remove('active-theme'));
}

function randomTheme() {
	const randomTheme = Math.floor(Math.random() * themes.length);

	body.classList.replace(themes[activeIndex], themes[randomTheme]);
	activeIndex = randomTheme;

	themeButtons.forEach(button => button.classList.remove('active-theme'));
}

function selectTheme() {
	themeButtons.forEach((theme =>
		theme.addEventListener('click', () => {
			let selectedTheme = theme.getAttribute("data-theme");
			let selectedIndex = themes.findIndex((theme) => body.classList.contains(theme));

			body.classList.replace(themes[activeIndex], selectedTheme);
			activeIndex = selectedIndex;

			themeButtons.forEach(button => button.classList.remove('active-theme'));
			theme.classList.add("active-theme");
		})
	));
}
