import { createContext, useState, useEffect } from "react";
import * as Tone from "tone";

import presetsData from "./presets";

const Context = createContext();
const url =
  "https://raw.githubusercontent.com/Kuntal-Das/music-box-sounds/main/Drum%20Samples/Samples";

const openhatBuffer = new Tone.ToneAudioBuffer(`${url}/openhat-808.wav`, () =>
  console.log("openhat loaded")
);
const closedhatBuffer = new Tone.ToneAudioBuffer(`${url}/hihat-808.wav`, () =>
  console.log("closedhat loaded")
);
const clapBuffer = new Tone.ToneAudioBuffer(`${url}/clap-808.wav`, () =>
  console.log("clap loaded")
);
const kickBuffer = new Tone.ToneAudioBuffer(`${url}/kick-808.wav`, () =>
  console.log("kick loaded")
);

const ContextProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentposition, setCurrentposition] = useState(0);
  const [options, setOptions] = useState({
    presetName: "",
    volume: 80,
    tempo: 90
  });
  const [preset, setPreset] = useState({
    noOfNodes: 16,
    notes: {}
  });

  const togglePlayState = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handelChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.isChecked : event.target.value;

    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const loadPreset = (key) => {
    if (key === "") {
      // console.log(`key : "${key}" is not found in PresetData\n returning...`);
      return;
    }
    const { tempo, noOfNodes, notes } = presetsData[key];
    setOptions((prevOptions) => ({
      ...prevOptions,
      presetName: key,
      tempo
    }));
    setPreset((prevPreset) => ({
      noOfNodes,
      notes
    }));
  };

  const loadRandomPreset = () => {
    const keysArr = Object.keys(presetsData);
    const rand = Math.floor(Math.random() * keysArr.length);
    loadPreset(keysArr[rand]);
  };

  const toneSetUp = () => {
    // const url1 =
    //   "https://github.com/Kuntal-Das/music-box-sounds/blob/main/Drum%20Samples/Samples";

    // const vol = new Tone.Volume().toDestination();
    // const osc = new Tone.Oscillator().connect(vol).start();
    const openhatPlayer = new Tone.Player(openhatBuffer).toDestination();
    const closedhatPlayer = new Tone.Player(closedhatBuffer).toDestination();
    const clapPlayer = new Tone.Player(clapBuffer).toDestination();
    const kickPlayer = new Tone.Player(kickBuffer).toDestination();

    let index = 0;
    const music = (time) => {
      if (preset.notes["openHat"][index] === 1) {
        openhatPlayer.start(time, 0, "1n");
      }
      if (preset.notes["closedHat"][index] === 1) {
        closedhatPlayer.start(time, 0, "1n");
      }
      if (preset.notes["clap"][index] === 1) {
        clapPlayer.start(time, 0, "1n");
      }
      if (preset.notes["kick"][index] === 1) {
        kickPlayer.start(time, 0, "1n");
      }
      index = (index + 1) % preset.noOfNodes;
    };
    Tone.Transport.bpm.value = options.tempo;
    Tone.Transport.scheduleRepeat(music, "16n");
    Tone.Transport.start();
    // console.log("Tone.Transport.start()");
  };

  useEffect(loadRandomPreset, []);
  useEffect(() => {
    loadPreset(options.presetName);
    if (isPlaying) togglePlayState();
    // setTimeout(togglePlayState,250)
  }, [options.presetName]);

  useEffect(() => {
    if (isPlaying) {
      toneSetUp();
      Tone.start();
    } else {
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
    }
    // console.log(`isPlaying: ${isPlaying}`);
    return () => Tone.Transport.stop();
  }, [isPlaying]);

  useEffect(() => {
    Tone.Transport.bpm.value = options.tempo;
  }, [options.tempo]);

  // useEffect(() => {
  //   Tone.vol;
  // }, [options.volume]);

  const toggleNote = (ckey) => {
    const [ins, i, j] = ckey.split("_");
    // console.log(ins, i, j);
    const newNotes = [...preset.notes[ins]];
    newNotes[j] = newNotes[j] ? 0 : 1;
    // console.log(newNotes);
    setPreset((prevPreset) => ({
      ...prevPreset,
      notes: {
        ...prevPreset.notes,
        [ins]: newNotes
      }
    }));
  };
  return (
    <Context.Provider
      value={{
        ...options,
        ...preset,
        isPlaying,
        currentposition,
        handelChange,
        togglePlayState,
        toggleNote
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
