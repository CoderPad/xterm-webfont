# About

xterm-webfont is an [xterm.js](https://github.com/xtermjs/xterm.js) addon for ensuring that webfonts load correctly before attempting to draw characters in an xterm instance. It is only necessary when using xterm 3.0 and above. Prior to 3.0, xterm drew characters directly to the DOM. Now that xterm draws characters to a canvas element, you cannot rely on the browser to eventually load and redraw needed webfonts. xterm-webfont will attempt to delay opening the xterm instance until both the normal and bold variants of the selected font family become available. It does so using the [FontFaceObserver](https://github.com/bramstein/fontfaceobserver) library.

# Usage

The current (2.x) version of xterm-webfont is compatible with xterm.js 4.0 and later. Check the git history of this file for older usage.

xterm-webfont is a CommonJS module available on NPM or Yarn. Install it and import (or require) it like so:

```js
import { Terminal } from 'xterm'
import * as XtermWebfont from 'xterm-webfont'
// alternatively, var WebfontLoader = require('xterm-webfont')
const term = new Terminal({ fontFamily: 'Roboto Mono' })
term.loadAddon(new XtermWebfont())
```

Then, where you would normally initialize xterm like so:

```js
term.open(myElement)
```

do

```js
term.loadWebfontAndOpen(myElement)
```

# Details

The default timeout of 3 seconds from FontFaceObserver is used. If the font fails to load both variants within that time, the Courier font is used instead.

`loadWebfontAndOpen` returns a promise that resolves when the terminal opens. The resolution value of this promise is the instance of the terminal.
