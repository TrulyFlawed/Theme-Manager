function changeTheme() {
	if ('dark-theme' == document.body.className) {
		document.body.className = "light-theme";
	}
	else if ('light-theme' == document.body.className) {
		document.body.className = "pink-theme";
	}
	else if ('pink-theme' == document.body.className) {
		document.body.className = "blue-theme";
	}
	else {
		document.body.className = "dark-theme";
	}
}
