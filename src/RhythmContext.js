import { createContext, Component, createRef } from "react";
import * as Tone from "tone";

// import presetsData from "./presets";
import * as presetData from "./preset.json"
import { EncodeDecode } from "./utils/encode-decode";
import { getQueryString } from "./utils/getQueryString";

const RhythmContext = createContext();

class RhythmContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        presetName: "",
        volume: 60,
        volMin: 0,
        volMax: 100,
        volStep: 5,
        tempo: 90,
        tempoMin: 30,
        tempoMax: 210,
        tempoStep: 1
      },

      preset: {
        noOfNodes: 16,
        notes: {}
      },

      isPlaying: false,
      isLoading: true,

      audioPlayer: {
        audioLoader: null,
        volNode: null
      },
      currentposition: 0
    }
    this.notesRef = createRef({ ...this.state.preset.notes });
    this.presetsData = { ...presetData.default }
    this.query = null
  }

  getShareURL = (presetName, by, profile) => {
    return EncodeDecode.encodeStatetoQueryStr(presetName, by, profile, this.state)
  }

  loadSharedURL = (query) => {
    if (!query) return
    const decoded = EncodeDecode.decodeQueryStrtoState(query)
    this.presetsData[decoded.presetName] = {
      ...decoded
    }
    this.loadPreset(decoded.presetName)
  }

  // setup tonejs AudioPlayer
  toneSetUp = () => {
    const url =
      "https://raw.githubusercontent.com/Kuntal-Das/music-box-sounds/main/Drum%20Samples/Samples";
    // converting percentae to dB and setting the volume 
    const volNode = new Tone.Volume(this.state.options.volume / 5 - 20).toDestination();

    // declaring the audio nodes
    const audioLoader = new Tone.Players(
      {
        openHat: `${url}/openhat-808.wav`,
        closedHat: `${url}/hihat-808.wav`,
        clap: `${url}/clap-808.wav`,
        kick: `${url}/kick-808.wav`
      },
      () => {
        // onLoad Event
        this.setState({ isLoading: false });
        console.log("Player Loaded");
      }
      // plug in the player to volume node 
    ).connect(volNode);

    // set audioPlayer State
    this.setState({ audioPlayer: { audioLoader, volNode } });
  };

  // play using the the options and `audioPlayer` set by `toneSetup()` 
  play = async () => {
    // if player has not yet loaded
    if (!this.state.audioPlayer.audioLoader) return;

    // setting the tempo/bpm
    Tone.Transport.bpm.value = this.state.options.tempo;

    // playsequence logic
    const seq = new Tone.Sequence(
      (time, idx) => {
        if (this.notesRef.current["openHat"][idx] === 1) {
          this.state.audioPlayer.audioLoader.player("openHat").start(time, 0, "1n");
        }
        if (this.notesRef.current["closedHat"][idx] === 1) {
          this.state.audioPlayer.audioLoader.player("closedHat").start(time, 0, "1n");
        }
        if (this.notesRef.current["clap"][idx] === 1) {
          this.state.audioPlayer.audioLoader.player("clap").start(time, 0, "1n");
        }
        if (this.notesRef.current["kick"][idx] === 1) {
          this.state.audioPlayer.audioLoader.player("kick").start(time, 0, "1n");
        }
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "16n"
    );
    // delaying by 200ms the start after pressing the play button 
    // for smooth start without any error
    seq.start("+0.2");

    // await because js timing is shit let the tone.js/audio API handle for us
    await Tone.Transport.start("+0.2");
  };

  // play pause
  togglePlayState = () => {
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }))
  };

  // handelchange for select list and sliders
  handelChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox"
        ? event.target.isChecked
        : type === "range"
          ? parseFloat(event.target.value)
          : event.target.value;

    this.setState(prevState => ({ options: { ...prevState.options, [name]: value } }))
  };

  // loads Preset
  loadPreset = (key) => {
    if (key === "") {
      return;
    }
    // getting the presets declared in `./preset.json`
    const { tempo, ...rest } = this.presetsData[key];

    // and setting state
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        presetName: key,
        tempo,
      },
      preset: { ...rest }
    }))
  };

  // loads random preset
  loadRandomPreset = () => {
    const keysArr = Object.keys(this.presetsData);
    const rand = Math.floor(Math.random() * keysArr.length);
    this.loadPreset(keysArr[rand]);
  };

  // toggle node/note ?
  toggleNote = (ckey) => {
    const [ins, , j] = ckey.split("_");
    const newNotes = [...this.state.preset.notes[ins]];
    newNotes[j] = newNotes[j] ? 0 : 1;

    this.setState(prevState => ({
      preset: {
        ...prevState.preset,
        notes: {
          ...prevState.preset.notes,
          [ins]: newNotes
        }
      }
    }))
  };

  // On load
  componentDidMount = () => {
    this.toneSetUp();
    this.query = getQueryString("load")
    if (this.query) {
      this.loadSharedURL(this.query)
    } else {
      this.loadRandomPreset();
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    // update reference notes when note state changes
    if (prevState.preset.notes !== this.state.preset.notes) {
      this.notesRef.current = { ...this.state.preset.notes };
    }

    // load preset when `options.presetName` changes
    if (prevState.options.presetName !== this.state.options.presetName) {
      this.loadPreset(this.state.options.presetName)
    }

    // handle play pause based on isPlaying State
    if (prevState.isPlaying !== this.state.isPlaying) {
      if (this.state.isPlaying) {
        // if browser suspends the audio context resume it when the tab gets focus again
        if (Tone.context.state !== "running") {
          Tone.context.resume();
        }
        this.play();
      } else {
        Tone.Transport.stop();
        Tone.Transport.cancel(0);
      }
    }

    // change the bpm based on `options.tempo`
    if (prevState.options.tempo !== this.state.options.tempo) {
      Tone.Transport.bpm.value = this.state.options.tempo;
    }

    // change the volume based on `options.volume`
    if (prevState.options.volume !== this.state.options.volume) {
      // if volume node is not set by `toneSetup`
      if (!this.state.audioPlayer.volNode) return
      // when volume is zero mute it
      if (this.state.options.volume === 0) this.state.audioPlayer.volNode.set({ mute: true })
      // persentage to dB
      else this.state.audioPlayer.volNode.set({ volume: this.state.options.volume / 5 - 20 })
    }
  }

  componentWillUnmount = () => {
    // remove audio context generated by tone js and cleanup Tone object 
    Tone.Transport.stop();
  }

  render = () => (
    <RhythmContext.Provider
      value={{
        ...this.state.options,
        ...this.state.preset,
        presetsData: this.presetsData,
        isPlaying: this.state.isPlaying,
        isLoading: this.state.isLoading,
        currentposition: this.state.currentposition,
        handelChange: this.handelChange,
        togglePlayState: this.togglePlayState,
        toggleNote: this.toggleNote,
        getShareURL: this.getShareURL
      }}
    >
      {this.props.children}
    </RhythmContext.Provider>
  );
}
export { RhythmContextProvider, RhythmContext };
