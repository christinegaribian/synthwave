class Synth{
  constructor(keyboard){
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e){
      console.log("hello!");
  }
}

module.exports = Synth;
