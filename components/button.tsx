import React, { Component } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

class Button extends Component<ButtonProps> {
  render() {
    const { label, onClick, disabled } = this.props;

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={disabled ? "disabled-button" : "enabled-button"}
      >
        {label}
      </button>
    );
  }
}

export default Button;
