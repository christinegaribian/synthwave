// http://middleearmedia.com/web-audio-api-bufferloader/

class BufferLoader{
  constructor(options){
    this.context = options.context;
    this.urlList = options.urlList;
    this.onload = options.onload;
    console.log(this.onload);
    this.bufferList = new Array();
    this.loadCount = 0;
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

    // request.onerror() {
    //   alert('BufferLoader: XHR error');
    // }
    request.send();
  }

  load(){
    for (let i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
  }
}

module.exports = BufferLoader;
