import { createContext, Component } from "react";

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
