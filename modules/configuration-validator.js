class configurationValidationModule {
	constructor(configuration, instance) {
		this.errors = [];
		this.config = configuration;
		this.classInstance = instance;
	};
	
	// Check if the eventHandlerName is a method in the provided class instance
	validateEventHandler(eventHandlerName) {
		return (
			this.classInstance &&
			typeof this.classInstance[eventHandlerName] === 'function'
		);
	};
	
	validate() {
		// Validate `themes` array.
		if (!Array.isArray(this.config.themes) || !this.config.themes.every(theme => typeof theme === 'string')) {
			this.errors.push('`themes` must be an array of strings.');
		};
		
		// Validate `defaultThemeFallback` string.
		if (typeof this.config.defaultThemeFallback !== 'string') {
			this.errors.push('`defaultThemeFallback` must be a string.');
		};
		
		// Validate `activeThemeClass` string.
		if (typeof this.config.activeThemeClass !== 'string') {
			this.errors.push('`activeThemeClass` must be a string.');
		};
		
		// Validate `buttonWrappers` object array.
		if (!Array.isArray(this.config.buttonWrappers)) {
			this.errors.push('`buttonWrappers` must be an array.');
		} else {
			this.config.buttonWrappers.forEach((wrapper, index) => {
				if (typeof wrapper.wrapperSelector !== 'string') {
					this.errors.push(`buttonWrappers[${index}].wrapperSelector must be a string.`);
				}
				if (typeof wrapper.intendedButtonSelectors !== 'string') {
					this.errors.push(`buttonWrappers[${index}].intendedButtonSelectors must be a string.`);
				}
				if (typeof wrapper.eventHandler !== 'string') {
					this.errors.push(`buttonWrappers[${index}].eventHandler must be a string.`);
				} else if (!this.validateEventHandler(wrapper.eventHandler)) {
					this.errors.push(`buttonWrappers[${index}].eventHandler "${wrapper.eventHandler}" does not exist in the provided class.`);
				};
			});
		};
		
		// Validate `buttons` object array.
		if (!Array.isArray(this.config.buttons)) {
			this.errors.push('`buttons` must be an array.');
		} else {
			this.config.buttons.forEach((button, index) => {
				if (typeof button.selector !== 'string') {
					this.errors.push(`buttons[${index}].selector must be a string.`);
				}
				if (typeof button.eventHandler !== 'string') {
					this.errors.push(`buttons[${index}].eventHandler must be a string.`);
				} else if (!this.validateEventHandler(button.eventHandler)) {
					this.errors.push(`buttons[${index}].eventHandler "${button.eventHandler}" does not exist in the provided class.`);
				}
			});
		};
		
		// If there are errors, throw them.
		if (this.errors.length > 0) {
			throw new Error(`Configuration validation failed:\n${this.errors.join('\n')}`);
		}

		// If no errors, return true.
		return true;
	};
};

export { configurationValidationModule };