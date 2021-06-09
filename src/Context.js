import { createContext, useState, useEffect, useRef } from "react";
import * as Tone from "tone";

import presetsData from "./presets";

const Context = createContext();

const ContextProvider = ({ children }) => {
  // const [currentposition, setCurrentposition] = useState(0);
  const [options, setOptions] = useState({
    presetName: "",
    volume: 60,
    volMin: 0,
    volMax: 100,
    volStep: 5,
    tempo: 90,
    tempoMin: 30,
    tempoMax: 210,
    tempoStep: 1
  });
  const [preset, setPreset] = useState({
    noOfNodes: 16,
    notes: {}
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audioPlayer, setAudioPlayer] = useState({
    audioLoader: null,
    volNode: null
  });

  const notesRef = useRef({ ...preset.notes });
  useEffect(() => (notesRef.current = { ...preset.notes }), [preset.notes]);

  const toneSetUp = () => {
    const url =
      "https://raw.githubusercontent.com/Kuntal-Das/music-box-sounds/main/Drum%20Samples/Samples";
    const volNode = new Tone.Volume(options.volume / 5 - 20).toDestination();
    const audioLoader = new Tone.Players(
      {
        openHat: `${url}/openhat-808.wav`,
        closedHat: `${url}/hihat-808.wav`,
        clap: `${url}/clap-808.wav`,
        kick: `${url}/kick-808.wav`
      },
      () => {
        setIsLoading(false);
        console.log("Player Loaded");
      }
    ).connect(volNode);
    setAudioPlayer({ audioLoader, volNode });
  };

  const play = () => {
    if (!audioPlayer.audioLoader) return;
    // Tone.context.latencyHint = "interactive";
    Tone.Transport.bpm.value = options.tempo;
    const seq = new Tone.Sequence(
      (time, idx) => {
        if (notesRef.current["openHat"][idx] === 1) {
          audioPlayer.audioLoader.player("openHat").start(time, 0, "1n");
        }
        if (notesRef.current["closedHat"][idx] === 1) {
          audioPlayer.audioLoader.player("closedHat").start(time, 0, "1n");
        }
        if (notesRef.current["clap"][idx] === 1) {
          audioPlayer.audioLoader.player("clap").start(time, 0, "1n");
        }
        if (notesRef.current["kick"][idx] === 1) {
          audioPlayer.audioLoader.player("kick").start(time, 0, "1n");
        }
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "16n"
    );
    seq.start("+0.2");
    Tone.Transport.start("+0.2");
  };

  const togglePlayState = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handelChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox"
        ? event.target.isChecked
        : type === "range"
        ? parseFloat(event.target.value)
        : event.target.value;

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

  useEffect(() => {
    loadRandomPreset();
    toneSetUp();
  }, []);

  useEffect(() => {
    loadPreset(options.presetName);
    // if (isPlaying) togglePlayState();
    // setTimeout(togglePlayState,250)
  }, [options.presetName]);

  useEffect(() => {
    if (isPlaying) {
      if (Tone.context.state !== "running") {
        Tone.context.resume();
      }
      play();
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

  useEffect(() => {
    if (!audioPlayer.volNode) return;
    if (options.volume === 0) audioPlayer.volNode.mute = true;
    else audioPlayer.volNode.set({ volume: options.volume / 5 - 20 });
  }, [options.volume]);

  return (
    <Context.Provider
      value={{
        ...options,
        ...preset,
        isPlaying,
        isLoading,
        // currentposition,
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
