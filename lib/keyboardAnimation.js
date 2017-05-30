class KeyboardAnimation{
  constructor(keyboard){
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    // console.log(e);
  }
}
module.exports = KeyboardAnimation;
