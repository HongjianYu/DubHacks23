import React, { Component } from "react";
import Request from "../components/fetchGPT";
import TextBox from "../components/textBox";

interface AppState {
  input: string;
  mood: string;
  feedback: string;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { input: "", mood: "No reply yet", feedback: "No reply yet" };
  }

  handleTextChange = (value: string) => {
    this.setState({ input: value });
  };

  handleMood = (mood: string) => {
    this.setState({ mood: mood });
  };

  handleFeedback = (feedback: string) => {
    this.setState({ feedback: feedback });
  };

  render(): any {
    return (
      <div>
        <p>ReFlow</p>
        <TextBox value={ this.state.input } onChange={ this.handleTextChange } />
        <Request
          input={ this.state.input }
          onChangeMood={ this.handleMood }
          onChangeFeedback={ this.handleFeedback }
        />
        <div>
          <p>Mood: {this.state.mood}</p>
          <p>Feedback:</p>
          <p>{this.state.feedback}</p>
        </div>
      </div>
    );
  }
}

export default App;
