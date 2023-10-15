import React, { Component } from "react";
import Request from "../components/fetchGPT";
import TextBox from "../components/textBox";
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
    this.setState({ date: datep, input: "" });
  };

  handleClearDiary = () => {
    this.setState((prevState) => {
      const updatedDiaryData = { ...prevState.diary };
      updatedDiaryData[prevState.date.toDateString()] = "";
      return { diary: updatedDiaryData };
    });
  };

  today = new Date();

  render(): any {
    return (
      <div>
        <p>ReFlow</p>

        <DatePicker
          maxDate={this.today}
          selected={this.state.date}
          onChange={this.handleDateChange}
        />

        <div>
          <TextBox value={this.state.input} onChange={this.handleTextChange} />
          <button onClick={this.handleDiarySave}>Save</button>
        </div>

        <Request
          input={this.state.input}
          onChangeMood={this.handleMood}
          onChangeFeedback={this.handleFeedback}
          onChangeDiary={this.handleDiarySave}
        />

        <div>
          <p>Mood: {this.state.mood[this.state.date.toDateString()]}</p>
          <p>Feedback: {this.state.feedback[this.state.date.toDateString()]}</p>
          <p>Diary: {this.state.diary[this.state.date.toDateString()]}</p>
          <button onClick={this.handleClearDiary}>Clear Diary</button>
        </div>

        <MonthlyEval
          diary={this.state.diary}
          date={this.state.date}
        />
      </div>
    );
  }
}

export default App;
