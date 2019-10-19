"use strict";

var FontFaceObserver = require("fontfaceobserver");

module.exports =
  /*#__PURE__*/
  (function() {
    function XtermWebfont() {}

    var _proto = XtermWebfont.prototype;

    _proto.activate = function activate(terminal) {
      this._terminal = terminal;

      terminal.loadWebfontAndOpen = function(element) {
        var _this = this;

        var fontFamily = this.getOption("fontFamily");
        var regular = new FontFaceObserver(fontFamily).load();
        var bold = new FontFaceObserver(fontFamily, {
          weight: "bold"
        }).load();
        return regular.constructor.all([regular, bold]).then(
          function() {
            _this.open(element);

            return _this;
          },
          function() {
            _this.setOption("fontFamily", "Courier");

            _this.open(element);

            return _this;
          }
        );
      };
    };

    _proto.dispose = function dispose() {
      delete this._terminal.loadWebfontAndOpen;
    };

    return XtermWebfont;
  })();
