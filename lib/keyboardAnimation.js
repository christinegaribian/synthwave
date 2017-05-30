class keyboardAnimation{
  constructor(keyboard){
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    console.log("hello2222!");
  }

  playNote(note){
    // synth.playNote
  }
}
module.exports = keyboardAnimation;
