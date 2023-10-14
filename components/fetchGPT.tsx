import React, { Component } from "react";

interface RequestProps {
  message: string;
  onChangeMessage(message: string): void;
}

interface RequestState {}

class Request extends Component<RequestProps, RequestState> {
  constructor(props) {
    super(props);
  }

  render(): any {
    return (
      <div>
        <button
          onClick={() => {
            this.requestGPT().then();
          }}
        >
          Test Chat
        </button>
      </div>
    );
  }

  async requestGPT() {
    console.log("Requesting");
    try {
      let resp: Response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          body: '{ "model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Say this is a test!"}], "temperature": 0.7 }',
          headers: {
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      if (!resp.ok) {
        alert("The status is wrong! Expected: 200, Was: " + resp.status);
        return;
      }
      let completion: any = await resp.json();
      console.log(completion["choices"][0]["message"]["content"]);
      this.props.onChangeMessage(
        completion["choices"][0]["message"]["content"]
      );
    } catch (e) {
      alert("There was an error contacting the server.");
      console.log(e);
    }
  }
}

export default Request;
