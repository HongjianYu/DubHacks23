import React, { Component } from "react";

interface MonthlyEvalProps {
  diary: object;
  date: Date;
}

interface MonthlyEvalState {
  eval: string;
}

class MonthlyEval extends Component<MonthlyEvalProps, MonthlyEvalState> {
  constructor(props) {
    super(props);
    this.state = { eval: "" };
  }

  render(): any {
    return (
      <div>
        <button
          onClick={() => {
            this.requestGPTMonthly().then();
          }}
        >
          Evaluate your {this.props.date ? this.props.date.toLocaleString('en-us', { month: 'long' }) : "Month"}
        </button>
        <p>{this.state.eval}</p>
      </div>
    );
  }

  async requestGPTMonthly() {
    let diariesInAMonth: string[] = [];

    const month: number = this.props.date.getMonth();
    const loopDate: Date = new Date(this.props.date);
    loopDate.setDate(1);
    while (loopDate.getMonth() === month) {
      if (loopDate.toDateString() in this.props.diary) {
        diariesInAMonth.push("Day " + loopDate.getDate() + ": " +
          this.props.diary[loopDate.toDateString()] + "| ");
      }
      loopDate.setDate(loopDate.getDate() + 1);
    }

    let prompt: string =
      `The following text is someone's diaries in a month, separated by |. ${diariesInAMonth.join("")}` +
      `$This is the end of the text. Provide a monthly report/feedback. Use second person.` +
      `Your feedback should only include the feedback itself without the first-line declaration.`;

    console.log("Prompt: " + prompt);
    try {
      let resp: Response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          body: `{ "model": "gpt-4", "messages": [{"role": "user", "content": "${prompt}"}], "temperature": 0.7 }`,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
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
      console.log("Completion:\n" + completion["choices"][0]["message"]["content"]);
      this.setState({ eval: completion["choices"][0]["message"]["content"] });
    } catch (e) {
      alert("There was an error contacting the server.");
      console.log(e);
    }
  }
}

export default MonthlyEval;
