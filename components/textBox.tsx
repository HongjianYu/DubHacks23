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
          width: "370px",
          height: "370px",
          padding: "10px",
          marginLeft: "300px",
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your diary here"
      />
    );
  }
}

export default TextBox;
