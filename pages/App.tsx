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
    this.setState({
      date: datep,
      input: "",
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

      height: "100vh",
      backgroundImage: "url(backdrop.png)",
      backgroundSize: "cover",
    };

    const pStyle: React.CSSProperties = {
      color: "white", // Set the text color to white
    };

    return (
      <div style={containerStyle}>
        <img src="header.png" height="15%" alt={"ReFlow"} />

        <DatePicker
          maxDate={this.today}
          selected={this.state.date}
          onChange={this.handleDateChange}
        />

        <TextBox value={this.state.input} onChange={this.handleTextChange} />
        <div style={pStyle}>
          Diary:
          {this.state.diary[this.state.date.toDateString()]}
        </div>
        <span style={{ marginTop: "4%" }}>
          <button onClick={this.handleDiarySave}>Save</button>
          <button onClick={this.handleClearDiary}>Clear Diary</button>
          <Request
            input={this.state.input}
            onChangeMood={this.handleMood}
            onChangeFeedback={this.handleFeedback}
            onChangeDiary={this.handleDiarySave}
          />
        </span>

        <div style={{ height: "30vh", marginTop: "4%" }}>
          <h1 style={pStyle}>
            Mood:
            {this.state.mood[this.state.date.toDateString()]}
          </h1>
          <MoodColor mood={this.state.mood} date={this.state.date}></MoodColor>
          <h1 style={pStyle}>
            Feedback:
            {this.state.feedback[this.state.date.toDateString()]}
          </h1>
        </div>

        <h1 style={{ marginTop: "4%" }}>
          <MonthlyEval diary={this.state.diary} date={this.state.date} />
        </h1>
      </div>
    );
  }
}

export default App;
