class KeyboardAnimation{
  constructor(keyboard){
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // this.keyDown = false;

    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    // if (!this.keyDown){
    console.log(e);
      document.getElementsByClassName(e.key)[0]
      .classList.add('active');
      // this.keyDown = true;
    // }
  }

  handleKeyUp(e){
    // this.keyDown = false;
    document.getElementsByClassName(e.key)[0]
    .classList.remove('active');
  }
}
module.exports = KeyboardAnimation;
