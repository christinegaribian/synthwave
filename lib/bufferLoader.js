// http://middleearmedia.com/web-audio-api-bufferloader/

class BufferLoader{
  constructor(options){
    this.context = options.context;
    this.urlList = options.urlList;
    // console.log(this.urlList);
    this.onload = options.onload;
    this.bufferList = new Array();
    this.loadCount = 0;

    this.loadBuffer = this.loadBuffer.bind(this);
    console.log(options.urlList[2]);
    this.load = this.load.bind(this)();

  }

  loadBuffer(url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;
    // console.log(loader);

    request.onload = function() {
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          console.log(loader.bufferList[index]);
          if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
        }
      );
    }

    // request.onerror() {
    //   alert('BufferLoader: XHR error');
    // }
    request.send();
  }

  load(){
    // console.log(this.urlList[2]);
    for (let i = 0; i < this.urlList.length; ++i){
      console.log(this.urlList[i]);
      this.loadBuffer(this.urlList[i], i);
    }
  }
}

module.exports = BufferLoader;
