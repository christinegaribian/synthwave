const NOTES =  require("./notes");
class KeyboardAnimation{
  constructor(keyboard){
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    // Handle notes outside of the keyboard displayed on screen
    if (!NOTES[e.keyCode]){
      return;
    }

    let characterKey;
    if (e.keyCode === 32){
      characterKey = 'space';
    } else {
      characterKey = e.key.toLowerCase();
    }
      document.getElementsByClassName(characterKey)[0]
      .classList.add('active');
  }

  handleKeyUp(e){
    if (!NOTES[e.keyCode]){
      return;
    }

    let characterKey;
    if (e.keyCode === 32){
      characterKey = 'space';
    } else {
      characterKey = e.key.toLowerCase();
    }
    document.getElementsByClassName(characterKey)[0]
    .classList.remove('active');
  }
}
module.exports = KeyboardAnimation;
