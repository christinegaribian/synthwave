// Hat tip to http://middleearmedia.com/web-audio-api-bufferloader/

class BufferLoader{
  constructor(options){
    this.context = options.context;
    this.urlList = options.urlList;
    this.onload = options.onload;
    this.bufferList = new Array();
    this.loadCount = 0;

    this.loadBuffer = this.loadBuffer.bind(this);
    this.load = this.load.bind(this)();

  }

  loadBuffer(url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;
    request.onload = function() {
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
        }
      );
    }
    request.send();
  }

  load(){
    for (let i = 0; i < this.urlList.length; ++i){
      this.loadBuffer(this.urlList[i], i);
    }
  }
}

module.exports = BufferLoader;
