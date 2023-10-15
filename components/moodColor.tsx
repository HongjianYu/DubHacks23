import React, { Component } from "react";

interface MoodColorProps {
  mood: object;
  date: Date;
}

interface MoodColorState {}

const colors = {
  "-10": "#3737CD",
  "-9": "#4B4BD2",
  "-8": "#5F5FD7",
  "-7": "#7373DC",
  "-6": "#8787E1",
  "-5": "#9B9BE6",
  "-4": "#AFAFEB",
  "-3": "#C3C3F0",
  "-2": "#D7D7F5",
  "-1": "#EBEBFA",
  "0": "#FFFFFF",
  "1": "#FAEBEB",
  "2": "#F5D7D7",
  "3": "#F0C3C3",
  "4": "#EBAFAF",
  "5": "#E69B9B",
  "6": "#E18787",
  "7": "#DC7373",
  "8": "#D75F5F",
  "9": "#D24B4B",
  "10": "#CD3737",
};

class MoodColor extends Component<MoodColorProps, MoodColorState> {
  constructor(props) {
    super(props);
  }

  render(): any {
    return (
      <div
        style={{
          width: "600px",
          height: "30px",
          background:
            this.props.date && this.props.date.toDateString() in this.props.mood
              ? colors[this.props.mood[this.props.date.toDateString()]]
              : "#FFFFFF",
          margin: "auto",
        }}
      >
        <div></div>
      </div>
    );
  }
}

export default MoodColor;
