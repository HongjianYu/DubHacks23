import React, { Component } from "react";
import Request from "../components/fetchGPT";
import TextBox from "../components/textBox";

interface AppState {
  input: string
  output: string;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { input: "", output: "No reply yet" };
  }

  handleTextChange = (value: string) => {
    this.setState({ input: value });
  };

  handleButtonClick = (message: string) => {
    this.setState({ output: message });
  };

  render(): any {
    return (
      <div>
        <TextBox value={ this.state.input } onChange={ this.handleTextChange } />
        <Request
          input={ this.state.input }
          onChangeMessage={ this.handleButtonClick }
        />
        <p>{this.state.output}</p>
      </div>
    );
  }
}

export default App;
