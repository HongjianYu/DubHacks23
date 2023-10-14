import React, { Component } from "react";
import Request from "../components/fetchGPT";
import TextBox from "../components/textBox";
import Button from "../components/button";

interface AppState {
  message: string;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { message: "placeholder" };
  }

  handleTextChange = (value: string) => {
    this.setState({ message: value });
  };

  handleButtonClick = () => {
    console.log(`Button clicked with text: ${"hi"}`);
  };

  render(): any {
    return (
      <div>
        <Request
          message={this.state.message}
          onChangeMessage={(message: string) => {
            this.setState({ message: message });
          }}
        />
        <textarea value={this.state.message} />
        <TextBox value={this.state.message} onChange={this.handleTextChange} />
        <Button label="Submit" onClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default App;
