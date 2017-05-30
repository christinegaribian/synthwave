// http://middleearmedia.com/web-audio-api-bufferloader/

class BufferLoader{
  constructor(context, urlList, callback){
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }

  loadBuffer(url, index) {
    var request = new XMLHttpRequest();
    console.log("getting request");
    request.open("GET", url, true);
    console.log("got request");
    console.log(request);
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
    console.log("still working");
    request.send();
  }

  load(){
    for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
  }
}

module.exports = BufferLoader;
