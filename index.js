function changeTheme() {
	if ('dark-theme' == document.body.className) {
		document.body.className = "light-theme";
	}
	else if ('light-theme' == document.body.className) {
		document.body.className = "pink-theme";
	}
	else {
		document.body.className = "dark-theme";
	}
}
