class Visualization{
  constructor(options){
    this.analyser = options.analyser;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.visualizer = options.visualizer;

    this.draw = this.draw.bind(this);
    this.drawWavelength = this.drawWavelength.bind(this);
    this.drawFrequency = this.drawFrequency.bind(this);
  }

  draw(){
    // console.log(this.visualizer);
    canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    if (this.visualizer == 'wavelength'){
      this.drawWavelength();
    } else {
      this.drawFrequency();
    }
  };

  drawWavelength(){
    let drawVisual = requestAnimationFrame(this.drawWavelength);

    this.analyser.getByteTimeDomainData(this.dataArray);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'white';

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
  }

  drawFrequency(){
    console.log("ffff");
    let drawVisual = requestAnimationFrame(this.drawFrequency);

    this.analyser.getByteFrequencyData(this.dataArray);

    canvasContext.fillStyle = 'rgb(0, 0, 0)';
    canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    let barWidth = (this.canvasWidth / this.bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for(var i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i];

      canvasContext.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
      canvasContext.fillRect(x,this.canvasHeight-barHeight/2,barWidth,barHeight/2);

      x += barWidth + 1;
    }
  }
}

module.exports = Visualization;
