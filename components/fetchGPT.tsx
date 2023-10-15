import React, { Component } from "react";

interface RequestProps {
  input: string;
  onChangeMood(mood: string): void;
  onChangeFeedback(feedback: string): void;
}

interface RequestState {}

class Request extends Component<RequestProps, RequestState> {
  constructor(props) {
    super(props);
  }

  render(): any {
    let moodPrompt: string = `Analyze the mood in the following diary: '${this.props.input}' and ` +
                             `return a value between -10 as most negative mood and 10 as most positive mood. ` +
                             `ONLY RETURN THE NUMBER WITHOUT ANY TEXT.`;
    let feedbackPrompt: string = `Provide an interactive feedback of at least 50 words on the following diary: ` +
                                 `'${this.props.input}'. ` +
                                 `Only include the feedback itself without the first-line declaration.`

    return (
      <div>
        <button
          onClick={() => {
            this.requestGPTDaily(moodPrompt, this.props.onChangeMood).then();
            this.requestGPTDaily(feedbackPrompt, this.props.onChangeFeedback).then();
          }}
        >
          Test Chat
        </button>
      </div>
    );
  }

  async requestGPTDaily(prompt: string, onChange: Function) {
    console.log("Prompt: " + prompt);
    try {
      console.log((process.env.NEXT_PUBLIC_OPENAI_API_KEY as string));
      let resp: Response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          body: `{ "model": "gpt-4", "messages": [{"role": "user", "content": "${prompt}"}], "temperature": 0.7 }`,
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
      onChange(completion["choices"][0]["message"]["content"]);
    } catch (e) {
      alert("There was an error contacting the server.");
      console.log(e);
    }
  }
}

export default Request;
