# Synthwave
## [LIVE](https://christinegaribian.github.io/synthwaves/)

Synthwave is a basic polyphonic synthesizer that generates sounds from the pentatonic scale, one of humanity's most [fascinatingly widespread](https://www.youtube.com/watch?v=ne6tB2KiZuk) musical constructs.

Users can play different notes by pressing different keys. Each keypress generates a unique mapping to a frequency, which is then
used to create an oscillator with Web Audio API. Different filters are applied
based on the setting chosen by the user, and are finally connected to the
user's speaker.

You can play one of two synthesizers, or even bird sounds!

Synthwave also generates real-time audio visualizations. By connecting an
AudioAnalyser node to the oscillator, I used Canvas to grab frequency and
wavelength data from the audio stream, and animate it with HTML5 Canvas.

### Technologies

- Object-oriented Vanilla `JavaScript` for overall structure,
- `HTML5 Canvas` for DOM manipulation and rendering,
- `Web Audio API` for sound manipulation.



### Features

#### Sound

I used the Web Audio API to play both loaded audio files and computer generated sounds. In the spirit of Object Oriented design, I created a modular setup in which the user's choice generates a Synth object, which generates Note objects on keypress, each of which create Visualization objects. Each class only handles tasks related to its functionality.

```javascript

playNote(code){
  const freq = this.mapKeycodeToFrequency(code);

  // Create the oscillator
  this.source = this.audioContext.createOscillator();

  // Set the note
  this.source.frequency.value = freq;

  // Set volume
  this.gain = this.audioContext.createGain();
  this.gain.gain.value = 0.3;
  if (this.isPluckySound){
    this.gain.gain.exponentialRampToValueAtTime(0.000001, this.audioContext.currentTime + 1);
  }

  // Set the reverb
  this.convolver = this.audioContext.createConvolver();

  // Set the lowpass
  this.biquad = this.audioContext.createBiquadFilter();
  this.biquad.type = "lowpass";
  this.biquad.q = 25;

  // Visualize frequency data
  this.analyser = this.audioContext.createAnalyser();
  this.visualization = new Visualization({
    analyser: this.analyser,
    visualizer: this.visualizer
  });
  this.visualization.draw();

  // Connect the source to the speaker
  this.source.connect(this.biquad);
  this.biquad.connect(this.gain);
  this.gain.connect(this.analyser);
  this.analyser.connect(this.audioContext.destination);
  this.source.start(0);
}

```


## Future Plans
- [ ] Add different sound sets, such human choir, hip hop beats, and dreamy 80s synth
- [ ] Allow users to save and share their samples
- [ ] Allow users to import sounds
- [ ] Add a drum sequencer
- [ ] Add controls for delay, tempo, cutoff, distortion, resonance, reverb, release, and attack
