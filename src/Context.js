import { createContext, useState, useEffect } from "react";
// import * as Tone from "tone";

import presetsData from "./presets";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentposition, setCurrentposition] = useState(0);
  const [options, setOptions] = useState({
    presetName: "",
    volume: 80,
    tempo: 90
  });
  const [presets, setPreset] = useState({
    noOfNodes: 16,
    notes: {}
  });

  const togglePlayState = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handelChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "range" ? parseInt(event.target.value) : event.target.value;

    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const loadPreset = (key) => {
    if (key === "") return;
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

  useEffect(loadRandomPreset, []);
  useEffect(() => {
    loadPreset(options.presetName);
  }, [options.presetName]);

  // toneSetUp = () => {
  //   const url =
  //     "https://github.com/Kuntal-Das/music-box-sounds/blob/main/Drum%20Samples/Samples";

  //   const openhat = new Tone.Player(
  //     `${url}/openhat-808.wav?raw=true`
  //   ).toDestination();
  //   // const closehat = new Tone.Player(
  //   //   `${url}/closehat-808.wav?raw=true`
  //   // ).toDestination();
  //   const kick = new Tone.Player(
  //     `${url}/kick-808.wav?raw=true`
  //   ).toDestination();
  //   const clap = new Tone.Player(
  //     `${url}/clap-808.wav?raw=true`
  //   ).toDestination();

  //   let index = 0;
  //   const music = () => {
  //     if (this.state.notes.kick[index] === 1) {
  //       kick.start();
  //     }
  //     index = (index + 1) % this.state.notes.notes;
  //   };

  //   Tone.Transport.scheduleRepeat(music, "16n");
  //   // Tone.Transport.start()
  // };

  return (
    <Context.Provider
      value={{
        ...options,
        ...presets,
        isPlaying,
        currentposition,
        handelChange,
        togglePlayState
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
