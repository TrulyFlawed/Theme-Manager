# Theme Manager

> [!WARNING]
> This project is under active development! Configurations may not work properly after updating the module.

This is a small project to aims to make customizing site theming easier than ever, particularly for sites that want to have more than just a light & dark theme.

## Development Goals

It aims for customizability by letting developers configure it to their liking. There are certain caveats to customization, but I plan on improving it with time.

It is primarily intended for use when using more than just two themes, but can still be used for this purpose regardless.

## Usage

> [!NOTE]
> These instructions are extremely simplified, I need to write out further details later.

- Add the module to your site.
- Import it in a JavaScript file you're using on that site.
- Call the `ThemeManager.initializeThemeManager` function with a configuration Object.
  - NOTE: I will elaborate on what's possible in the configuration soon.
- Assuming you have the proper HTML and CSS setup according to your configuration, everything should work properly.

## Contributing

This project is open to contribution! I do not yet have any contribution guidelines, but setting the project up is really simple given that it's just plain HTML, CSS, and JavaScript, with nothing else special going on.

## License

This project is under an MIT license. The project likely won't be something I'll work on forever, so I figure I might as well just let people do what they would like with the code.

I would've used GPLv3, but that seems a bit extreme for this tiny project. If I do more serious work in making this something that's more widely used, I would probably consider it, but not now, as I just don't want to deal with licensing right now.

All I know is that I refuse to put this project under a proprietary license. It will always remain open source and free for all to use.

## Acknowledgements

I would like to thank the following projects, individuals, and/or groups/organizations for their contribution to this project, either directly or indirectly:

| Subject | Contributions |
| ------- | ------------- |
| Boxicons | Providing free icons for use on the web. |
| SnareChops | Providing help in displaying active theme indicators on buttons. |
| Max Böck | Wrote [this article on dynamic site theming](https://mxb.dev/blog/color-theme-switcher/). |
| Mike Foskett | Wrote [this article with CSS media query examples](https://codepen.io/2kool2/pen/abzgPzJ). |
| Kilian Valkhof | Wrote [this article about system theme preferences](https://kilianvalkhof.com/2020/design/your-dark-mode-toggle-is-broken/). |
| [Toby](https://tobot.dev/) | Helped me fix an issue where tapping too quickly would lead to zooming in on mobile. |