const NOTES =  require("./notes");
class KeyboardAnimation{
  constructor(keyboard){
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // this.keyDown = false;

    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    // Handle notes outside of the keyboard displayed on screen
    if (!NOTES[e.keyCode]){
      return;
    }
      document.getElementsByClassName(e.key.toLowerCase())[0]
      .classList.add('active');
      // this.keyDown = true;
  }

  handleKeyUp(e){
    // this.keyDown = false;
    if (!NOTES[e.keyCode]){
      return;
    }
    document.getElementsByClassName(e.key.toLowerCase())[0]
    .classList.remove('active');
  }
}
module.exports = KeyboardAnimation;
