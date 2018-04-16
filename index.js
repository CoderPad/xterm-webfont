import FontFaceObserver from 'fontfaceobserver'

export function apply(terminalConstructor) {
  terminalConstructor.prototype.loadWebfontAndOpen = function(element) {
    const regular = new FontFaceObserver(this.options.fontFamily).load()
    const bold = new FontFaceObserver(this.options.fontFamily, { weight: 'bold' }).load()

    return regular.constructor.all([regular, bold]).then(
      () => {
        this.open(element)
        return this
      },
      () => {
        this.options.fontFamily = 'Courier'
        this.open(element)
        return this
      }
    )
  }
}
