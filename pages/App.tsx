import React, { Component } from 'react';
import Request from '../components/fetchGPT';

interface AppState {
  message: string;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { message: "placeholder" };
  }

  render(): any {
    return (
      <div>
        <Request
          message={ this.state.message }
          onChangeMessage={(message: string) => { this.setState({ message: message }) }}
        />
        <textarea value={ this.state.message }/>
      </div>
    )
  }
}

export default App;
