class Visualization{
  constructor(options){
    this.analyser = options.analyser;
    this.canvasWidth = canvas.width;

    this.canvasHeight = canvas.height;
    this.visualizer = options.visualizer;

    this.draw = this.draw.bind(this);
    this.drawWavelength = this.drawWavelength.bind(this);
    this.drawFrequency = this.drawFrequency.bind(this);
    this.destroy = this.destroy.bind(this);

    this.gradient = canvasContext.createLinearGradient(0,0,0,300);
    this.gradient.addColorStop(1,'#000000');
    this.gradient.addColorStop(0.50,'#ff0000');
    this.gradient.addColorStop(0.20,'#ffff00');
    this.gradient.addColorStop(0,'#ffffff');
 
  }

  draw(){
    if (this.visualizer == 'wavelength'){
      this.drawWavelength();
    } else {
      this.drawFrequency();
    }
  };

  drawWavelength(){
    this.analyser.fftSize= 2048;
    let bufferLength = this.analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.requestId = requestAnimationFrame(this.drawWavelength);

    this.analyser.getByteTimeDomainData(dataArray);
    // canvasContext.fillStyle = this.gradient;
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = this.gradient;

    canvasContext.beginPath();

    let sliceWidth = this.canvasWidth / bufferLength;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = v * this.canvasHeight/2;
      if (i === 0){
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
    this.analyser.fftSize = 256;
    let bufferLength = this.analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.requestId = requestAnimationFrame(this.drawFrequency);

    this.analyser.getByteFrequencyData(dataArray);

    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);


    let barWidth = (this.canvasWidth / bufferLength)*5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      // canvasContext.fillStyle = 'white';
      canvasContext.fillStyle = 'rgb(0,' + (barHeight) + ',159)';
      canvasContext.fillRect(x,this.canvasHeight + 10 - barHeight,barWidth,barHeight);

      x += barWidth + 1;
    }
  }

  destroy(){
    setTimeout(() => {
      cancelAnimationFrame(this.requestId);
    }, 1000);
  }
}

module.exports = Visualization;
