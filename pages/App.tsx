import React, { Component } from "react";
import Request from "../components/fetchGPT";
import TextBox from "../components/textBox";
import MoodColor from "../components/moodColor";
import MonthlyEval from "../components/monthlyEval";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AppState {
  input: string;
  diary: object;
  feedback: object;
  mood: object;
  date: Date;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: "",
      date: new Date(),
      diary: {},
      feedback: {},
      mood: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.date !== prevState.date) {
      this.setState({
        input:
          this.state.date.toDateString() in this.state.diary
            ? this.state.diary[this.state.date.toDateString()]
            : "",
      });
    }
  }

  handleTextChange = (value: string) => {
    this.setState({ input: value });
  };

  handleDiarySave = () => {
    this.setState((prevState) => {
      const updatedDiaryData = { ...prevState.diary };
      updatedDiaryData[prevState.date.toDateString()] = prevState.input;
      return { diary: updatedDiaryData };
    });
  };

  handleMood = (mood: string) => {
    this.setState((prevState) => {
      const updatedMoodData = { ...prevState.mood };
      updatedMoodData[prevState.date.toDateString()] = mood;
      return { mood: updatedMoodData };
    });
  };

  handleFeedback = (feedback: string) => {
    this.setState((prevState) => {
      const updatedFeedbackData = { ...prevState.feedback };
      updatedFeedbackData[prevState.date.toDateString()] = feedback;
      return { feedback: updatedFeedbackData };
    });
  };

  handleDateChange = (datep: Date) => {
    this.setState(() => {
      return {
        date: datep,
      };
    });
  };

  handleClearDiary = () => {
    this.setState((prevState) => {
      const updatedDiaryData = { ...prevState.diary };
      delete updatedDiaryData[prevState.date.toDateString()];
      return { diary: updatedDiaryData, input: "" };
    });
  };

  today = new Date();

  render(): any {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      height: "150vh",
      backgroundImage: "url(backdrop.png)",
      backgroundSize: "cover",
    };

    const pStyle: React.CSSProperties = {
      color: "white", // Set the text color to white
    };

    return (
      <div style={containerStyle}>
        <img src="header.png" height="12%" alt={"ReFlow"}/>

        <h2 style={pStyle}>Select a date to start</h2>

        <DatePicker
          maxDate={this.today}
          selected={this.state.date}
          onChange={this.handleDateChange}
        />

        <h2 style={pStyle}>Write your diary here</h2>

        <TextBox value={this.state.input} onChange={this.handleTextChange} />
        <span style={{ marginTop: "1%" }}>
          <Request
            input={this.state.input}
            onChangeMood={this.handleMood}
            onChangeFeedback={this.handleFeedback}
            onChangeDiary={this.handleDiarySave}
          />
          <button onClick={this.handleDiarySave}>Save</button>
          <button onClick={this.handleClearDiary}>Clear Diary</button>
        </span>

        <h2 style={pStyle}>Here is Your Feedback</h2>

        <MoodColor mood={this.state.mood} date={this.state.date}></MoodColor>

        <textarea
          style={{
            width: "50%",
            height: "10%",
          }}
          value={
            this.state.date.toDateString() in this.state.feedback
              ? this.state.feedback[this.state.date.toDateString()]
              : ""
          }
          readOnly
        />

        <MonthlyEval diary={this.state.diary} date={this.state.date} />
      </div>
    );
  }
}

export default App;
