function cycleTheme() {
	const currentTheme = document.body.className;
	
	if ('dark-theme' == currentTheme) {
		document.body.className = "light-theme";
	}
	else if ('light-theme' == currentTheme) {
		document.body.className = "pink-theme";
	}
	else if ('pink-theme' == currentTheme) {
		document.body.className = "blue-theme";
	}
	else {
		document.body.className = "dark-theme";
	}
}