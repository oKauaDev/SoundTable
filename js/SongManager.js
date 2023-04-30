export default class SongManager {
  constructor(songs, rec, ouvir) {
    this.songs = [...document.querySelectorAll(songs)];
    this.recButton = document.querySelector(rec);
    this.ouvirButton = document.querySelector(ouvir);

    this.recSettings = {};
  }

  rec() {
    this.recButton.classList.add("record");
    this.recSettings = {};
    this.recSettings.start = new Date().getTime();
    this.recSettings.records = [];
    this.recSettings.rate = true;
  }

  stop() {
    this.recButton.classList.remove("record");
    this.recSettings.rate = false;
  }

  play() {
    if (this.recSettings?.records) {
      this.recSettings.records.forEach((song) => {
        setTimeout(() => {
          this.playAudio(song.frequence);
        }, song.time);
      });
    }
  }

  playAudio(frequence) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequence;

    oscillator.connect(audioCtx.destination);

    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
    }, 400);
  }

  init() {
    this.songs.forEach((song) => {
      song.addEventListener("click", ({ target }) => {
        const frequence = +target.getAttribute("data-frequence");
        this.playAudio(frequence);
        if (this.recSettings?.records && this.recSettings.rate) {
          this.recSettings.records.push({
            time: new Date().getTime() - this.recSettings.start,
            frequence,
          });
        }
      });
    });

    this.recButton.addEventListener("click", () => {
      if (this.recButton.classList.contains("record")) {
        this.stop();
      } else {
        this.rec();
      }
    });

    this.ouvirButton.addEventListener("click", () => {
      this.play();
    });
  }
}
