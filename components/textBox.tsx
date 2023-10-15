import React, { Component } from "react";

interface TextBoxProps {
  value: string;
  onChange: (value: string) => void;
}

class TextBox extends Component<TextBoxProps> {
  render() {
    const { value, onChange } = this.props;

    return (
      <textarea
        style={{
          width: "50%",
          height: "25%",
          marginTop: "2%",
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your diary here"
      />
    );
  }
}

export default TextBox;
