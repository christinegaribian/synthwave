class KeyboardAnimation{
  constructor(keyboard){
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    document.getElementsByClassName(e.key)[0]
    .classList.add('selected');
  }
}
module.exports = KeyboardAnimation;
