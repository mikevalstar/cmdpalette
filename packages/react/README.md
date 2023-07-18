![logo](https://cmdpalette.dev/cmdPaletteLogo.png)

# CmdPalette React

A Command Palette Library for your Website or Webapp

## Installation

```bash
npm install @cmdpalette/core @cmdpalette/react
```

## Usage

See https://cmdpalette.dev/ for example usage.

## Properties

**commands**: _`Array<ICmdCommand> | () => Promise<Array<ICmdCommand>>`_ - An array of commands to be displayed in the palette. Each command is an object with the following properties:

- **command** - The name of the command to be displayed in the palette
- **action** - The function to be called when the command is selected, it will receive the command object back as a parameter
- **help** - The help text to be displayed in the palette as helper text for your search
- **subCommands** - add subcommands in the same format as commands above, they will lazy load when selected (tab)

**count**: _`number`_ - The number of commands to be displayed in the palette, defaults to 10

**open**: _`boolean`_ - To control the openeing and closing of the palette manually, defaults to false. The palette will self open and close using the key command check if this is not set.

**placeholder**: _`string`_ - The placeholder text to be displayed in the search input, defaults to ""

**keyCommandCheck**: _`(e: KeyboardEvent) => boolean`_ - To control if the palette should self open and close using a key command check, defaults checking for `ctrl+k || command+k`.

## License

MIT
