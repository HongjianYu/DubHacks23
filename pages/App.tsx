import React, { Component } from "react";
import Request from "../components/fetchGPT";
import TextBox from "../components/textBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AppState {
  input: string;
  diary: string[];
  mood: string[];
  feedback: string[];
  date: Date;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: "",
      mood: [],
      feedback: [],
      diary: [],
      date: new Date(),
    };
  }

  handleTextChange = (value: string) => {
    this.setState({ input: value });
  };

  handleDiarySave = () => {
    const updatedDiaryData = [...this.state.diary];
    updatedDiaryData[this.state.date.toDateString()] = this.state.input;
    this.setState({ diary: updatedDiaryData });
  };

  handleMood = (mood: string) => {
    const updatedMoodData = [...this.state.mood];
    updatedMoodData[this.state.date.toDateString()] = mood;
    this.setState({ mood: updatedMoodData });
  };

  handleFeedback = (feedback: string) => {
    const updatedFeedbackData = [...this.state.feedback];
    updatedFeedbackData[this.state.date.toDateString()] = feedback;
    this.setState({ feedback: updatedFeedbackData });
  };

  handleDateChange = (datep: Date) => {
    this.setState({ date: datep, input: "" });
  };

  handleClearDiary = () => {
    const updatedDiaryData = [...this.state.diary];
    updatedDiaryData[this.state.date.toDateString()] = "";
    this.setState({ diary: updatedDiaryData });
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
      </div>
    );
  }
}

export default App;
