function cycleTheme() {
	const body = document.body;
	const themes = ["dark-theme", "light-theme", "pink-theme", "blue-theme"];
	const activeIndex = themes.findIndex((theme) => body.classList.contains(theme));
	const nextIndex = (activeIndex + 1) % themes.length;

	body.classList.replace(themes[activeIndex], themes[nextIndex]);
}