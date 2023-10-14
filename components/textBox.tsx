import React, { Component } from "react";

interface TextBoxProps {
  value: string;
  onChange: (value: string) => void;
}

class TextBox extends Component<TextBoxProps> {
  render() {
    const { value, onChange } = this.props;

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="enter something"
      />
    );
  }
}

export default TextBox;
