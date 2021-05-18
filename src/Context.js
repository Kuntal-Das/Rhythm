import { createContext, Component } from "react";
import * as Tone from "tone";

const Context = createContext();

class ContextProvider extends Component {
  state = {
    tempo: 90,
    volume: 80,
    isPlaying: false,
    instruments: {},
    currentposition: 0
  };

  togglePlayState = () => {
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }));
  };

  handelChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "range" ? parseInt(event.target.value) : event.target.value;

    this.setState({
      [name]: value
    });
  };

  toneSetUp = () => {
    const url =
      "https://github.com/Kuntal-Das/music-box-sounds/blob/main/Drum%20Samples/Samples";

    const openhat = new Tone.Player(
      `${url}/openhat-808.wav?raw=true`
    ).toDestination();
    // const closehat = new Tone.Player(
    //   `${url}/closehat-808.wav?raw=true`
    // ).toDestination();
    const kick = new Tone.Player(
      `${url}/kick-808.wav?raw=true`
    ).toDestination();
    const clap = new Tone.Player(
      `${url}/clap-808.wav?raw=true`
    ).toDestination();

    let index = 0;
    const music = () => {
      if (this.state.instruments.kick[index] === 1) {
        kick.start();
      }
      index = (index + 1) % 16;
    };

    Tone.Transport.scheduleRepeat(music, "16n");
    // Tone.Transport.start()
  };

  render = () => (
    <Context.Provider
      value={{
        ...this.state,
        handelChange: this.handelChange,
        togglePlayState: this.togglePlayState
      }}
    >
      {this.props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
