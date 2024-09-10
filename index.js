const body = document.body;
const themes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
let activeIndex = themes.findIndex((theme) => body.classList.contains(theme));
let newIndex;
const themeButtonWrapper = document.querySelector(".main-theme-switches");
const themeButtons = document.querySelectorAll(".theme-buttons");

function nextTheme() {
	newIndex = activeIndex + 1;
	newIndex = (newIndex + themes.length) % themes.length;
	updateTheme();
}

function previousTheme() {
	newIndex = activeIndex - 1;
	newIndex = (newIndex + themes.length) % themes.length;
	updateTheme();
}

function randomTheme() {
	randomIndex = Math.floor(Math.random() * themes.length);
	if (randomIndex !== activeIndex) {
		newIndex = randomIndex;
		updateTheme();
	}
	else {
		return randomTheme();
	}
}

function selectTheme() {
	themeButtonWrapper.addEventListener("click", (event) => {
		if (event.target.tagName === "BUTTON") {
			let selectedTheme = event.target.getAttribute("data-theme");
			newIndex = themes.indexOf(selectedTheme);
			updateTheme();
		}
		else {
			return
		}
	})
}

function updateTheme() {
	body.classList.replace(themes[activeIndex], themes[newIndex]);
	activeIndex = newIndex;
	let activeThemeButton = document.querySelector(`.theme-buttons[data-theme=${themes[activeIndex]}]`);
	themeButtons.forEach(button => button.classList.remove('active-theme'));
	activeThemeButton.classList.add("active-theme");
}