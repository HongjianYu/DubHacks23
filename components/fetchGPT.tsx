import React, { Component } from "react";

interface RequestProps {
  input: string;
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
            const prompt1 = `Analyze the mood in the following diary: "${this.props.input}" and
            return a value between -10 as most negative mood and 10 as most positive mood.
            ONLY RETURN THE NUMBER WITHOUT ANY TEXT.`;

            const prompt2 = `Provide at least 100 words of feedback or interaction about the diary.
            Your feedback should only include the feedback itself without the first-line declaration.`
            this.requestGPT().then();
            this.requestGPTDaily(prompt1).then();
            this.requestGPTDaily(prompt2).then();
          }}
        >
          Test Chat
        </button>
      </div>
    );
  }

  async requestGPT() {
    console.log("Prompt: " + this.props.input);
    try {
      console.log((process.env.NEXT_PUBLIC_OPENAI_API_KEY as string));
      let resp: Response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          body: `{ "model": "gpt-4", "messages": [{"role": "user", "content": "\
                ${this.props.input}\
                "}], "temperature": 0.7 }`,
          headers: {
            Authorization:
              `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
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

  async requestGPTDaily(prompt: string) {
    console.log("Prompt: " + this.props.input);
    try {
      console.log((process.env.NEXT_PUBLIC_OPENAI_API_KEY as string));
      let resp: Response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          body: `{ "model": "gpt-4", "messages": [{"role": "user", "content": ${prompt}}], "temperature": 0.7 }`,
          headers: {
            Authorization:
              `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
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
