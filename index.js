var FontFaceObserver = require('fontfaceobserver')

module.exports = {
  apply: function(terminalConstructor) {
    terminalConstructor.prototype.loadWebfontAndOpen = function(element) {
      var _this = this

      var regular = new FontFaceObserver(this.options.fontFamily).load()
      var bold = new FontFaceObserver(this.options.fontFamily, {
        weight: 'bold'
      }).load()

      return regular.constructor.all([regular, bold]).then(
        function() {
          _this.open(element)
          return _this
        },
        function() {
          _this.options.fontFamily = 'Courier'
          _this.open(element)
          return _this
        }
      )
    }
  }
}
