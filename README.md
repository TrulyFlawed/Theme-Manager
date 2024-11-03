# Theme Manager

> [!WARNING]
> This project is under active development! Configurations may not work properly after updating the module.

This is a small project to aims to make customizing site theming easier than ever, particularly for sites that want to have more than just a light & dark theme.

## Development Goals

It aims for customizability by letting developers configure it to their liking. There are certain caveats to customization, but I plan on improving it with time.

It is primarily intended for use when using more than just two themes, but can still be used for this purpose regardless.

## Personal Goals

This project was also something I've done as an attempt to help me understand JavaScript just a bit more. Perhaps this project may lead me into developing larger and more useful things, but this should suffice for now.

It was also a practice attempt at designing website themes, albeit, very cheaply for the sake of example. In the near future, this project may be used to create much more fleshed-out theming on any future sites or projects of mine.

## Usage

I still need to write this out in further detail, but essentially you do the following:

- Add the module to your site.
- Import it in a JavaScript file you're using on that site.
- Call the `ThemeManager.initializeThemeManager` function with a configuration Object.
  - NOTE: I will elaborate on what's possible in the configuration soon.
- Assuming you have the proper HTML and CSS setup according to your configuration, everything should work properly.

## Contributing

This project is open to contribution! I do not yet have any contribution guidelines, but setting the project up is really simple given that it's just plain HTML, CSS, and JavaScript, with nothing else special going on.

## License

This project currently has no license, as I haven't quite yet figured out what I want to set it as yet. However, I believe it will likely be under the MIT license.

## Acknowledgements

I would like to thank the following projects, individuals, and/or groups/organizations for their contribution to this project, either directly or indirectly:

| Subject    | Contributions                                                    |
| ---------- | ---------------------------------------------------------------- |
| Boxicons   | Providing free icons for use on the web.                         |
| SnareChops | Providing help in displaying active theme indicators on buttons. |