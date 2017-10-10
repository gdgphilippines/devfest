import 'polymer/polymer.html';
import './devfest-speakers-section.html';
import app from '../../../../app';

class DevfestSpeakersSection extends Polymer.Element {
  static get is () { return 'devfest-speakers-section'; }

  static get properties () {
    return {
      speakers: {
        type: Object,
        value: {}
      },
      speakersArray: {
        type: Array,
        value: []
      },
      showAllSpeakers: {
        type: Boolean,
        value: false
      }
    };
  }

  static get observers () {
    return [
      'reload(speakers)',
      'reload(speakers.*)'
    ];
  }

  constructor () {
    super()
    this._app = app;
  }

  reload () {
    this.speakersArray = [];
    const speakers = Object.entries(this.speakers);
    speakers.forEach(speaker => {
      const obj = speaker[1];
      obj.id = speaker[0];
      this.speakersArray.push(obj);
    });
    // console.log()
  }
}

window.customElements.define(DevfestSpeakersSection.is, DevfestSpeakersSection);

export default DevfestSpeakersSection;
