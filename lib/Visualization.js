class Visualization{
  constructor(analyser){
    this.analyser = analyser;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.draw = this.draw.bind(this);
  }

  draw(){
    canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    let drawVisual = requestAnimationFrame(this.draw);

    this.analyser.getByteTimeDomainData(this.dataArray);
    canvasContext.fillStyle = 'rgb(200, 200, 200)';
    canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(0, 0, 0)';

    canvasContext.beginPath();

    let sliceWidth = this.canvasWidth * 1.0 / this.bufferLength;
    let x = 0;

    for(let i = 0; i < this.bufferLength; i++) {

      let v = this.dataArray[i] / 128.0;
      let y = v * this.canvasHeight/2;

      if(i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasContext.lineTo(this.canvasWidth, this.canvasHeight/2);
    canvasContext.stroke();
  };

}

module.exports = Visualization;