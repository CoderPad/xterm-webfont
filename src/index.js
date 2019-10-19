const FontFaceObserver = require("fontfaceobserver");

module.exports = class XtermWebfont {
  activate(terminal) {
    this._terminal = terminal;
    terminal.loadWebfontAndOpen = function(element) {
      const fontFamily = this.getOption("fontFamily");
      const regular = new FontFaceObserver(fontFamily).load();
      const bold = new FontFaceObserver(fontFamily, { weight: "bold" }).load();

      return regular.constructor.all([regular, bold]).then(
        () => {
          this.open(element);
          return this;
        },
        () => {
          this.setOption("fontFamily", "Courier");
          this.open(element);
          return this;
        }
      );
    };
  }
  dispose() {
    delete this._terminal.loadWebfontAndOpen;
  }
};
